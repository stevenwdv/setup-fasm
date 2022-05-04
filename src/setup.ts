import fs from 'fs';
import os from 'os';
import path from 'path';
import process from 'process';

import * as core from '@actions/core';

import {data, downloadVersion, FasmEdition, FasmEditionStr, getMatchingVersions, PlatformStr} from './lib';

async function main() {
	const requestedEdition: FasmEditionStr | string                 = core.getInput('edition').toLowerCase(),
	      requestedVersion: 'latest' | string                       = core.getInput('version').toLowerCase(),
	      downloadUnknown: 'never' | 'secure' | string | 'insecure' = core.getInput('download-unknown').toLowerCase(),
	      assumeDynamicUnchanged                                    = core.getBooleanInput('assume-dynamic-unchanged'),
	      setIncludeEnvvar                                          = core.getBooleanInput('set-include-envvar');

	// Get requested edition
	const edition = (data.editions as { [edition: string]: FasmEdition })[requestedEdition];
	if (!edition) {
		core.setFailed(`requested edition '${requestedEdition}' not found`);
		return;
	}
	const editionStr = requestedEdition as FasmEditionStr;

	// Get requested version candidates
	const tryVersions = getMatchingVersions(edition, requestedVersion, downloadUnknown);
	if (!tryVersions.length) {
		core.setFailed(`requested version '${requestedVersion}' not found for edition ${editionStr}`);
		return;
	}

	// Get current platform
	const nodePlatform = os.platform();
	if (nodePlatform === 'darwin') {
		core.setFailed('macOS does not support ELF binaries, so fasm is not available');
		return;
	}
	let platformStr = platformMap[nodePlatform];
	if (!platformStr) {
		core.warning(`unknown current platform ${nodePlatform}, trying unix`);
		platformStr = 'unix';
	}

	// Try version candidates
	let triesLeft = 10;
	for (const version of tryVersions) {
		core.startGroup(`using ${version.name}`);
		let extractPath = await downloadVersion(editionStr, version, platformStr, assumeDynamicUnchanged);
		if (!extractPath && platformStr === 'linux') {
			core.debug('no linux version found, trying unix instead');
			extractPath = await downloadVersion(editionStr, version, 'unix', assumeDynamicUnchanged);
			if (extractPath) platformStr = 'unix';
		}
		core.endGroup();

		if (extractPath) {
			returnVersion(editionStr, platformStr, version.name, extractPath, setIncludeEnvvar);
			return;
		}

		if (!--triesLeft) {
			core.setFailed('maximum number of versions to try exceeded');
			return;
		}
	}

	core.setFailed(`could not download ${requestedEdition} ${requestedVersion} for ${platformStr}`);
	return;
}


const platformMap: { [platform in NodeJS.Platform]?: PlatformStr } = {
	aix: 'unix',
	android: 'linux',
	cygwin: 'windows',
	freebsd: 'unix',
	haiku: 'unix',
	linux: 'linux',
	netbsd: 'unix',
	openbsd: 'unix',
	sunos: 'unix',
	win32: 'windows',
};

/** Install found version */
function returnVersion(edition: FasmEditionStr, platform: PlatformStr, versionName: string, extractPath: string,
                       setIncludeEnvvar: boolean) {
	const files = fs.readdirSync(extractPath).filter(name => !name.startsWith('.'));  // Filter out .download_date
	// If extracted directory contains a single directory, add that to PATH instead
	const binPath = files.length === 1 && fs.statSync(path.join(extractPath, files[0]!)).isDirectory()
		  ? path.join(extractPath, files[0]!)
		  : extractPath;
	core.addPath(binPath);

	{
		const executables = ['.x64', '', '.exe', '.o'].map(ext => `${{
			fasm1: 'fasm',
			fasmg: 'fasmg',
			fasmarm: 'fasmarm',
		}[edition]}${ext}`);
		for (const executable of executables) {
			const exePath = path.join(binPath, executable);
			const stat    = fs.statSync(exePath, {throwIfNoEntry: false});
			if (stat?.isFile()) fs.chmodSync(exePath, stat.mode | 0o111);  // Make executable
		}
	}

	if (setIncludeEnvvar) {
		const includePath = path.join(binPath, 'INCLUDE');
		if (fs.statSync(includePath, {throwIfNoEntry: false})?.isDirectory()) {
			let includeConcat = process.env['INCLUDE'] || '';
			if (includeConcat) includeConcat += ';';  // This is the only separator recognized by fasm
			includeConcat += includePath;
			core.exportVariable('INCLUDE', includeConcat);
		}
	}

	core.setOutput('path', binPath);
	core.setOutput('edition', edition);
	core.setOutput('version', versionName);
	core.setOutput('platform', platform);

	core.info(`successfully installed ${edition} ${versionName} for ${platform} to ${binPath}`);
}

void (async () => {
	try {
		await main();
	} catch (error) {
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		core.setFailed(error instanceof Error ? error : `${error}`);
	}
})();

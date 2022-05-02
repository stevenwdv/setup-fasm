import fs from 'fs';
import os from 'os';
import path from 'path';

import * as core from '@actions/core';

import {
	data,
	downloadVersion,
	FasmEdition,
	FasmEditionStr,
	getMatchingVersions,
	getVersionName,
	PlatformStr,
} from './lib';

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
function returnVersion(edition: FasmEditionStr, platform: PlatformStr, versionName: string, extractPath: string) {
	const files   = fs.readdirSync(extractPath);
	// If extracted directory contains a single directory, add that to PATH instead
	const binPath = files.length === 1 && fs.statSync(path.join(extractPath, files[0]!)).isDirectory()
		  ? path.join(extractPath, files[0]!)
		  : extractPath;
	core.addPath(binPath);

	const executables = ['.x64', '', '.exe', '.o'].map(ext => `${{
		fasm1: 'fasm',
		fasmg: 'fasmg',
		fasmarm: 'fasmarm',
	}[edition]}${ext}`);
	for (const executable of executables) {
		const exePath = path.join(binPath, executable);
		if (fs.existsSync(exePath)) {
			const stat = fs.statSync(exePath);
			if (stat.isFile()) fs.chmodSync(exePath, stat.mode | 0o111);  // Make executable
		}
	}

	core.setOutput('path', binPath);
	core.setOutput('edition', edition);
	core.setOutput('version', versionName);
	core.setOutput('platform', platform);

	core.info(`successfully installed ${edition} ${versionName} for ${platform} to ${binPath}`);
}

async function main() {
	const requestedEdition: FasmEditionStr | string                 = core.getInput('edition').toLowerCase(),
	      requestedVersion: 'latest' | string                       = core.getInput('version').toLowerCase(),
	      downloadUnknown: 'never' | 'secure' | string | 'insecure' = core.getInput('download-unknown').toLowerCase();

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
		const versionName = getVersionName(version);

		core.startGroup(`using ${versionName}`);
		const extractPath = await downloadVersion(editionStr, version, platformStr);
		core.endGroup();

		if (extractPath) {
			returnVersion(editionStr, platformStr, versionName, extractPath);
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

void (async () => {
	try {
		await main();
	} catch (error) {
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		core.setFailed(error instanceof Error ? error : `${error}`);
	}
})();

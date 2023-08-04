import {randomUUID} from 'node:crypto';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import https from 'node:https';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import consumers from 'node:stream/consumers';
import util from 'node:util';

import * as core from '@actions/core';
import simplegit from 'simple-git';

import {FasmData, FasmEdition, FasmEditionStr, PlatformStr} from 'fasm-versions';
import {downloadVersion, getMatchingVersions} from './lib';

const versionsUrl  = new URL('https://raw.githubusercontent.com/stevenwdv/fasm-versions/v1/fasm_versions.json');
const fasmgRepoUrl = new URL('https://github.com/tgrysztar/fasmg.git');

async function main() {
	const requestedEdition: FasmEditionStr | string                 = core.getInput('edition').toLowerCase(),
	      requestedVersion: 'latest' | string                       = core.getInput('version').toLowerCase(),
	      fallbackToPreviousCompatible                              = core.getBooleanInput('fallback-to-previous-compatible'),
	      ignoreOfficialHttpsHashMismatch                           = core.getBooleanInput('ignore-official-https-hash-mismatch'),
	      downloadUnknown: 'never' | 'secure' | string | 'insecure' = core.getInput('download-unknown').toLowerCase(),
	      customVersionList                                         = core.getInput('custom-version-list'),
	      assumeDynamicUnchanged                                    = core.getBooleanInput('assume-dynamic-unchanged'),
	      fasmgDownloadPackages                                     = core.getInput('fasmg-download-packages'),
	      fasmgIncludePackages                                      = core.getInput('fasmg-include-packages').toLowerCase().split(/,\s*/).filter(v => v),
	      setIncludeEnvvar                                          = core.getBooleanInput('set-include-envvar');

	if (requestedEdition !== 'fasmg' && (fasmgDownloadPackages.toLowerCase() !== 'false' || fasmgIncludePackages.length)) {
		core.setFailed('fasm g packages option set but requested edition is not fasmg');
		return;
	}
	if (fasmgIncludePackages.length && fasmgDownloadPackages.toLowerCase() === 'false') {
		core.setFailed('fasmg-include-packages set without fasmg-download-packages');
		return;
	}

	let data: FasmData;
	if (customVersionList) {
		core.info('reading version list');
		data = await consumers.json(fs.createReadStream(customVersionList)) as FasmData;
	} else {
		core.info('downloading version list');
		data = await new Promise<FasmData>((resolve, reject) =>
			  // eslint-disable-next-line no-promise-executor-return
			  void https.get(versionsUrl, res => {
				  if (res.statusCode !== 200)
					  reject(new Error(`failed to download ${versionsUrl.href}: HTTP ${res.statusCode!} ${res.statusMessage!}`));
				  else resolve(consumers.json(res) as Promise<FasmData>);
			  }).on('error', err => reject(new Error(`failed to download ${versionsUrl.href}`, {cause: err}))),
		);
	}

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
		let extractPath = await downloadVersion(editionStr, version, platformStr,
			  assumeDynamicUnchanged, ignoreOfficialHttpsHashMismatch);
		if (!extractPath && platformStr === 'linux') {
			core.info('no linux version found, trying unix instead');
			extractPath = await downloadVersion(editionStr, version, 'unix',
				  assumeDynamicUnchanged, ignoreOfficialHttpsHashMismatch);
			if (extractPath) platformStr = 'unix';
		}
		core.endGroup();

		if (extractPath) {
			await returnVersion(editionStr, platformStr, version.name, extractPath, setIncludeEnvvar);

			if (editionStr === 'fasmg' && fasmgDownloadPackages.toLowerCase() !== 'false')
				await downloadFasmgPackages(fasmgDownloadPackages.toLowerCase() === 'true' ? null : fasmgDownloadPackages,
					  fasmgIncludePackages, setIncludeEnvvar);
			return;
		}

		if (!fallbackToPreviousCompatible || !--triesLeft) {
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
async function returnVersion(edition: FasmEditionStr, platform: PlatformStr, versionName: string, extractPath: string,
	  setIncludeEnvvar: boolean,
) {
	const files   = await fsp.readdir(extractPath);
	// If extracted directory contains a single directory, add that to PATH instead
	const binPath = files.length === 1 && (await fsp.stat(path.join(extractPath, files[0]!))).isDirectory()
		  ? path.join(extractPath, files[0]!)
		  : extractPath;
	core.addPath(binPath);

	{
		const executables = ['.x64', '', '.exe', '.o'].map(ext => `${{
			fasm1: 'fasm',
			fasmg: 'fasmg',
			fasmarm: 'fasmarm',
		}[edition]}${ext}`);
		await Promise.all(executables.map(async executable => {
			const exePath = path.join(binPath, executable);
			const stat    = await fsp.stat(exePath).catch(() => null);
			if (stat?.isFile()) await fsp.chmod(exePath, stat.mode | 0o111);  // Make executable
		}));
	}

	if (setIncludeEnvvar)
		for (const includeName of ['INCLUDE', 'include' /*newer FASMARM*/]) {
			const includePath = path.join(binPath, includeName);
			if ((await fsp.stat(includePath).catch(() => null))?.isDirectory()) {
				addInclude(includePath);
				break;
			}
		}

	core.setOutput('path', binPath);
	core.setOutput('edition', edition);
	core.setOutput('version', versionName);
	core.setOutput('platform', platform);

	core.info(`successfully installed ${edition} ${versionName} for ${platform} to ${binPath}`);
}

async function downloadFasmgPackages(
	  checkoutRef: string | null, includePackages: string[], addDirToIncludeEnvvar: boolean) {
	core.startGroup('downloading fasm g packages');
	const packagesRepoDir = path.join(process.env['RUNNER_TEMP'] || os.tmpdir(), randomUUID());
	await simplegit()
		  .clone(fasmgRepoUrl.href, packagesRepoDir, ['--filter=blob:none', '--sparse', '--no-checkout'])
		  .cwd(packagesRepoDir)
		  .checkout(checkoutRef ?? 'HEAD')
		  .raw('sparse-checkout', 'add', '--cone', 'packages');
	core.info('checked out fasm g packages repository');

	const packagesDir = path.join(packagesRepoDir, 'packages');
	if (!(await fsp.stat(packagesDir).catch(() => null))?.isDirectory())
		throw new Error('cannot find fasm g packages directory');

	core.setOutput('fasmg-packages', packagesDir);
	if (addDirToIncludeEnvvar)
		addInclude(packagesDir);
	for (const packageName of includePackages) {
		const packageDir = path.join(packagesDir, packageName);
		if (!(await fsp.stat(packagesDir).catch(() => null))?.isDirectory())
			throw new Error(`fasm g package ${packageName} not found`);

		const includeDir = path.join(packageDir, 'include');
		if ((await fsp.stat(includeDir).catch(() => null))?.isDirectory())
			addInclude(includeDir);
		else addInclude(packageDir);
	}
	core.endGroup();
	core.info(`successfully installed fasm g packages to ${packagesDir}`);
}

function addInclude(path: string) {
	core.info(`adding to include: ${path}`);
	let includeConcat = process.env['INCLUDE'] ?? '';
	if (includeConcat) includeConcat += ';';  // This is the only separator recognized by fasm
	includeConcat += path;
	core.exportVariable('INCLUDE', includeConcat);
}

void (async () => {
	try {
		await main();
	} catch (error) {
		core.setFailed(util.inspect(error));
	}
})();

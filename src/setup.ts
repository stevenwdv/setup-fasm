import * as crypto from 'crypto';
import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';

import * as core from '@actions/core';
import * as toolCache from '@actions/tool-cache';
import * as dataRaw from '../fasm_versions.json';

/* For past versions, see:
WHATSNEW.TXT in releases
https://github.com/tgrysztar/fasm/commits
http://fasm.sourceforge.net/archive/recent/
http://comrade.ownz.com/docs/fasm.html#pastversions

Some releases do not have binaries online (for all OSs)
Some releases that are not in WHATSNEW.TXT do have binaries online
 */
const data: FasmData = dataRaw;

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

// Currently, all versions are at least 32-bit x86, although some may also contain x86-64 versions
const fasmArch: ReturnType<typeof os.arch> = 'ia32';

function getVersionName(version: FasmVersion) {
	return typeof version === 'string' ? version : version.name;
}

const getUrlsRaw: { [platform in keyof typeof dataRaw.editions]: (version: FasmVersion, platform: PlatformStr) => string[] } = {
	fasm1(version, platform) {
		const versionName = getVersionName(version);

		const names = (typeof version === 'object' && version.alt ? [versionName, version.alt] : [versionName]).map(name => {
			const versionNameDotless = name.replace(/\./g, '');
			return {
				windows: parseInt(versionNameDotless) < parseInt('1.54'.replace(/\./g, ''))
					  ? `fasmc${versionNameDotless}.zip`
					  : `fasmw${versionNameDotless}.zip`,
				linux: `fasm-${name}.tgz`,
				unix: `fasm-${name}.tar.gz`,
			}[platform];
		});

		const sites = [
			'https://flatassembler.net/',  // Only recent releases
			'http://fasm.sourceforge.net/archive/recent/',  // Older releases
			'http://comrade.ownz.com/fasm/',  // Even older releases
		];

		return sites.flatMap(site => names.map(name => site + name));
	},
	fasmg(version) {
		const versionName = getVersionName(version);

		const sites = ['https://flatassembler.net/'];
		const names = (typeof version === 'object' && version.alt ? [versionName, version.alt] : [versionName])
			  .map(name => `fasmg.${name}.zip`);
		return sites.flatMap(site => names.map(name => site + name));
	},
	fasmarm(_version, platform) {
		const sites = ['https://arm.flatassembler.net/'];
		const names = ['FASMARM_full.ZIP'];
		if (platform === 'windows') names.unshift('FASMARM_win32.ZIP');
		return sites.flatMap(site => names.map(name => site + name));
	},
};

const getUrls: { [edition: string]: (version: FasmVersion, platform: PlatformStr) => string[] } = getUrlsRaw;


/** Get matching versions according to semver */
function getMatchingVersions(edition: FasmEdition, requestedVersion: 'latest' | string,
                             downloadUnknown: 'never' | 'secure' | string | 'insecure'): FasmVersion[] {
	requestedVersion = requestedVersion.toLowerCase();
	if (['latest', '*'].includes(requestedVersion))
		return edition.versions;
	else if (requestedVersion.endsWith('.*')) {
		const requestedVersionBase = requestedVersion.slice(0, -2);
		return edition.versions
			  .filter(version => {
				  const name = getVersionName(version);
				  return name.toLowerCase().startsWith(requestedVersionBase)
						&& ['.', undefined].includes(name[requestedVersionBase.length]);
			  });
	} else {
		const version = edition.versions
			  .find(version => getVersionName(version).toLowerCase() === requestedVersion);
		if (!version) {
			if (downloadUnknown === 'never') return [];
			if (downloadUnknown === 'secure') return [{
				name: requestedVersion,
			}];
			if (downloadUnknown === 'insecure') return [{
				name: requestedVersion,
				allowInsecure: true,
			}];
			return [{
				name: requestedVersion,
				hashes: new Proxy({}, {
					get() {
						return downloadUnknown;
					},
				}),
			}];
		}
		return edition.versions
			  .filter(version => getVersionName(version) === requestedVersion);
	}
}

function hashFile(filePath: string): string {
	const packedStream = fs.createReadStream(filePath);
	const hasher       = crypto.createHash('BLAKE2b512').setEncoding('hex');
	packedStream.pipe(hasher);
	return hasher.read() as string;
}

/** Install found version */
function returnVersion(edition: string, platform: PlatformStr, versionName: string, extractPath: string) {
	const files   = fs.readdirSync(extractPath);
	// If extracted directory contains a single directory, add that to PATH instead
	const binPath = files.length === 1 && fs.statSync(path.join(extractPath, files[0]!)).isDirectory()
		  ? path.join(extractPath, files[0]!)
		  : extractPath;
	core.addPath(binPath);

	const executables = ['fasm.x64', 'fasm', 'fasm.o', 'fasm.exe'];
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
	const requestedEdition: FasmEdition | string                    = core.getInput('edition').toLowerCase(),
	      requestedVersion: 'latest' | string                       = core.getInput('version').toLowerCase(),
	      downloadUnknown: 'never' | 'secure' | string | 'insecure' = core.getInput('download-unknown').toLowerCase();

	// Get requested edition
	const edition = data.editions[requestedEdition];
	if (!edition) {
		core.setFailed(`requested edition '${requestedEdition}' not found`);
		return;
	}

	// Get requested version candidates
	const tryVersions = getMatchingVersions(edition, requestedVersion, downloadUnknown);
	if (!tryVersions.length) {
		core.setFailed(`requested version '${requestedVersion}' not found for edition ${requestedEdition}`);
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

	const cacheName = `${requestedEdition}-${platformStr}`;

	// Try version candidates
	let triesLeft = 10;
	for (const version of tryVersions) {
		const versionName = getVersionName(version);
		const fullVersion = `${requestedEdition} ${versionName} for ${platformStr}`;

		core.startGroup(`using ${versionName}`);

		const cachedPath = toolCache.find(cacheName, versionName, fasmArch);
		if (cachedPath) {
			// Use cached version
			core.debug('found cached');
			core.endGroup();
			returnVersion(requestedEdition, platformStr, versionName, cachedPath);
			return;
		}

		const expectedHash = (typeof version === 'object' && version.hashes || {})[platformStr];

		/** Non-404 status */
		let unexpectedError = false;
		let hashProblems    = false;

		const urls = getUrls[requestedEdition]!(version, platformStr);
		for (const url of urls) {
			core.debug(`trying ${url}`);
			try {
				const secure = new URL(url).protocol === 'https:';

				if (!secure && !expectedHash && !(typeof version === 'object' && version.allowInsecure)) {
					hashProblems = true;
					core.warning(`no hash found for insecure URL ${url} for ${fullVersion}; not using this file`);
					continue;
				}

				const packedPath = await toolCache.downloadTool(url);

				if (expectedHash) {
					const actualHash = hashFile(packedPath);
					if (actualHash !== expectedHash) {
						hashProblems = true;
						core.warning(`expected hash ${expectedHash} but got ${actualHash} for ${url}${
							  ['never', 'secure', 'insecure'].includes(downloadUnknown) ?
									'you may want to report this to the setup-fasm action maintainer' : ''
						}; not using this file`);
						fs.unlinkSync(packedPath);
						continue;
					}
				}

				const extract     = url.toLowerCase().endsWith('.zip') ? toolCache.extractZip : toolCache.extractTar;
				const extractPath = await extract(packedPath);
				fs.unlinkSync(packedPath);
				await toolCache.cacheDir(extractPath, cacheName, versionName, fasmArch);

				core.endGroup();
				returnVersion(requestedEdition, platformStr, versionName, extractPath);
				return;
			} catch (err) {
				if (err instanceof toolCache.HTTPError) {
					if (err.httpStatusCode !== undefined) unexpectedError ||= err.httpStatusCode !== 404;
					core.debug(`download failed${err.httpStatusCode !== undefined ? `, got ${err.httpStatusCode}` : ''}`);
				} else throw err;
			}
		}

		core.warning(`all attempts at downloading ${fullVersion} failed; ` + (
			  hashProblems ? 'some hash problems were encountered'
					: unexpectedError ? 'some servers seem to have problems with the requests'
						  : `${requestedEdition} ${versionName} not found for ${platformStr}`
		));

		core.endGroup();

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


type FasmData = {
	editions: { [edition: string]: FasmEdition }
};

type FasmEdition = {
	/** Ordered newest to oldest */
	versions: FasmVersion[],
};

type FasmVersion = string | {
	name: string,
	hashes?: { [platform in PlatformStr]?: string },
	allowInsecure?: boolean,
	alt?: string,
};

type PlatformStr = 'windows' | 'linux' | 'unix';

import crypto from 'crypto';
import fs from 'fs';
import os from 'os';

import * as core from '@actions/core';
import * as toolCache from '@actions/tool-cache';

import {equalsIgnoreCase} from './utils';

import dataRaw from '../fasm_versions.json';
import {pipeline} from 'stream/promises';

/* For past versions, see:
WHATSNEW.TXT in releases
https://github.com/tgrysztar/fasm/commits
http://fasm.sourceforge.net/archive/recent/
http://comrade.ownz.com/docs/fasm.html#pastversions

Some releases do not have binaries online (for all OSs)
Some releases that are not in WHATSNEW.TXT do have binaries online
 */
export const data: FasmData = dataRaw;

export function getVersionName(version: FasmVersion) {
	return typeof version === 'string' ? version : version.name;
}

export const getUrls: { [platform in FasmEditionStr]: (version: FasmVersion, platform: PlatformStr) => string[] } = {
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


/** Get matching versions according to semver */
export function getMatchingVersions(edition: FasmEdition, requestedVersion: 'latest' | string,
                                    downloadUnknown: 'never' | 'secure' | string | 'insecure'): FasmVersionEx[] {
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
			if (['secure', 'insecure'].includes(downloadUnknown)) return [{
				name: requestedVersion,
				allowInsecure: downloadUnknown === 'insecure',
				userProvided: true,
			}];
			return [{
				name: requestedVersion,
				hashes: new Proxy({}, {
					get() {
						return downloadUnknown;
					},
				}),
				userProvided: true,
			}];
		} else if (downloadUnknown !== 'secure') {
			if (downloadUnknown === 'insecure') return [{
				...(typeof version === 'object' ? version : {name: version}),
				allowInsecure: true,
			}];
			if (downloadUnknown) return [{
				...(typeof version === 'object' ? version : {name: version}),
				hashes: new Proxy({}, {
					get() {
						return downloadUnknown;
					},
				}),
				userProvided: true,
			}];
		}
		return [version];
	}
}

/** Hash file using BLAKE2b-512 */
export async function hashFile(filePath: string): Promise<string> {
	const packedStream = fs.createReadStream(filePath);
	const hasher       = crypto.createHash('BLAKE2b512').setEncoding('hex');
	await pipeline(packedStream, hasher);
	return hasher.read() as string;
}


/**
 * @param allowInsecure Allow downloading insecure URLs without hash
 * @return Path of raw downloaded file
 * @throws DownloadError
 */
export async function downloadUrl(url: URL, allowInsecure: boolean, expectedHash?: string, destinationFilePath?: string): Promise<string> {
	const secure = url.protocol === 'https:';

	if (!secure && !expectedHash && !allowInsecure) throw new MissingHashError(url);

	let packedPath;
	try {
		packedPath = await toolCache.downloadTool(url.href, destinationFilePath);
	} catch (err) {
		if (err instanceof toolCache.HTTPError)
			throw new HttpError(url, err.httpStatusCode, {cause: err});
		else throw err;
	}

	if (expectedHash) {
		const actualHash = await hashFile(packedPath);
		if (!equalsIgnoreCase(actualHash, expectedHash)) {
			fs.unlinkSync(packedPath);
			throw new HashMismatchError(url, expectedHash, actualHash);
		}
	}

	return packedPath;
}

export abstract class DownloadError extends Error {
	protected constructor(readonly url: URL, message?: string, options?: ErrorOptions) {
		super(message, options);
	}
}

export class MissingHashError extends DownloadError {
	constructor(url: URL, options?: ErrorOptions) {
		super(url, `no hash found for insecure URL ${url.href}`, options);
	}
}

export class HashMismatchError extends DownloadError {
	constructor(url: URL, expectedHash: string, actualHash: string, options?: ErrorOptions) {
		super(url, `expected hash ${expectedHash} but got ${actualHash} for ${url.href}`, options);
	}
}

export class HttpError extends DownloadError {
	constructor(url: URL, readonly httpStatusCode?: number, options?: ErrorOptions) {
		super(url, `HTTP error${httpStatusCode !== undefined ? ` (${httpStatusCode})` : ''} while downloading ${url.href}`, options);
	}
}


/**
 * @param userProvided If version is unknown and was provided by the user
 * @return Path to archive and downloaded URL
 */
export async function downloadVersionArchive(edition: FasmEditionStr, version: FasmVersionEx, platform: PlatformStr, destinationFilePath?: string): Promise<{ path: string, url: URL } | null> {
	const versionName = getVersionName(version);
	const fullVersion = `${edition} ${versionName} for ${platform}`;

	const expectedHash = (typeof version === 'object' && version.hashes || {})[platform];

	/** Non-404 status */
	let unexpectedError = false;
	let hashProblems    = false;

	const urls = getUrls[edition](version, platform).map(url => new URL(url));
	for (const url of urls) {
		core.debug(`trying ${url.href}`);

		try {
			return {
				path: await downloadUrl(url, typeof version === 'object' && !!version.allowInsecure, expectedHash, destinationFilePath),
				url,
			};
		} catch (err) {
			if (err instanceof MissingHashError) {
				hashProblems = true;
				core.warning(`${err.message} for ${fullVersion}; not using this file`);
				continue;
			}
			if (err instanceof HashMismatchError) {
				hashProblems = true;
				core.warning(`${err.message} for ${fullVersion}${
					  typeof version === 'object' && version.userProvided ? ''
							: 'you may want to report this to the setup-fasm action maintainer'
				}; not using this file`);
				continue;
			}
			if (err instanceof HttpError) {
				if (err.httpStatusCode !== undefined) unexpectedError ||= err.httpStatusCode !== 404;
				core.warning(`${err.message} for ${fullVersion}; not using this file`);
				continue;
			}
			throw err;
		}
	}

	core.warning(`all attempts at downloading ${fullVersion} failed; ` + (
		  hashProblems ? 'some hash problems were encountered'
				: unexpectedError ? 'some servers seem to have problems with the requests'
					  : `${edition} ${versionName} not found for ${platform}`
	));
	return null;
}


// Currently, all versions are at least 32-bit x86, although some may also contain x86-64 versions
const fasmArch: ReturnType<typeof os.arch> = 'ia32';

/**
 * @param userProvided If version is unknown and was provided by the user
 * @return Path to extracted directory
 */
export async function downloadVersion(edition: FasmEditionStr, version: FasmVersionEx, platform: PlatformStr): Promise<string | null> {
	const versionName = getVersionName(version);

	const cacheName  = `${edition}-${platform}`;
	const cachedPath = toolCache.find(cacheName, versionName, fasmArch);
	if (cachedPath) {
		// Use cached version
		core.debug('found cached');
		return cachedPath;
	}

	const result = await downloadVersionArchive(edition, version, platform);
	if (!result) return null;
	const {path: packedPath, url} = result;

	const extract     = url.pathname.toLowerCase().endsWith('.zip') ? toolCache.extractZip : toolCache.extractTar;
	const extractPath = await extract(packedPath);
	fs.unlinkSync(packedPath);
	await toolCache.cacheDir(extractPath, cacheName, versionName, fasmArch);
	return extractPath;
}


export type FasmData = {
	editions: { [edition in FasmEditionStr]: FasmEdition }
};

export type FasmEdition = {
	/** Ordered newest to oldest */
	versions: FasmVersion[],
};

export type FasmVersion = string | {
	name: string,
	hashes?: { [platform in PlatformStr]?: string },
	alt?: string,
};

export type FasmVersionEx = string | FasmVersion & {
	userProvided?: boolean,
	allowInsecure?: boolean,
};

export type FasmEditionStr = keyof typeof dataRaw.editions;
export type PlatformStr = 'windows' | 'linux' | 'unix';

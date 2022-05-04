import crypto from 'crypto';
import fs from 'fs';
import os from 'os';
import path from 'path';

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

export const getUrls: { [platform in FasmEditionStr]: (version: FasmVersion, platform: PlatformStr) => string[] } = {
	fasm1(version, platform) {
		const names = (version.alt ? [version.alt, version.name] : [version.name]).map(name => {
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
		const sites = ['https://flatassembler.net/'];
		const names = (version.alt ? [version.alt, version.name] : [version.name])
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
			  .filter(version => version.name.toLowerCase().startsWith(requestedVersionBase)
					&& ['.', undefined].includes(version.name[requestedVersionBase.length]));
	} else {
		const version = edition.versions
			  .find(version => version.name.toLowerCase() === requestedVersion);
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
				...version,
				allowInsecure: true,
			}];
			if (downloadUnknown) return [{
				...version,
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

/** File was not modified since last download */
export const NOT_MODIFIED = Symbol('not changed');

/**
 * @param allowInsecure Allow downloading insecure URLs without hash
 * @return Path of raw downloaded file or {@link NOT_MODIFIED}
 * @throws DownloadError
 */
export async function downloadUrl(url: URL, allowInsecure: boolean, expectedHash?: string, destinationFilePath?: string, ifModifiedSince?: Date)
	  : Promise<string | typeof NOT_MODIFIED> {
	const secure = url.protocol === 'https:';

	if (!secure && !expectedHash && !allowInsecure) throw new MissingHashError(url);

	const headers = ifModifiedSince ? {
		'If-Modified-Since': ifModifiedSince.toUTCString(),
	} : {};

	let packedPath;
	try {
		packedPath = await toolCache.downloadTool(url.href, destinationFilePath, undefined, headers);
	} catch (err) {
		if (err instanceof toolCache.HTTPError) {
			if (err.httpStatusCode === 304) return NOT_MODIFIED;
			throw new HttpError(url, err.httpStatusCode, {cause: err});
		} else throw err;
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
 * @return Path to archive and downloaded URL or {@link NOT_MODIFIED} or null on failure
 */
export async function downloadVersionArchive(edition: FasmEditionStr, version: FasmVersionEx, platform: PlatformStr,
                                             destinationFilePath?: string, ifModifiedSince?: Date)
	  : Promise<{ path: string, url: URL } | typeof NOT_MODIFIED | null> {
	const fullVersion = `${edition} ${version.name} for ${platform}`;

	const expectedHash = (version.hashes || {})[platform];

	/** Non-404 status */
	let unexpectedError = false;
	let hashProblems    = false;

	const urls = getUrls[edition](version, platform).map(url => new URL(url));
	for (const url of urls) {
		core.debug(`trying ${url.href}`);

		try {
			const downloadResult = await downloadUrl(url, !!version.allowInsecure, expectedHash, destinationFilePath, ifModifiedSince);
			if (downloadResult === NOT_MODIFIED) return NOT_MODIFIED;
			return {
				path: downloadResult,
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
					  version.userProvided ? '' : 'you may want to report this to the setup-fasm action maintainer'
				}; not using this file`);
				continue;
			}
			if (err instanceof HttpError) {
				if (err.httpStatusCode !== undefined) unexpectedError ||= err.httpStatusCode !== 404;
				(err.httpStatusCode === 404 ? core.debug : core.warning)(`${err.message} for ${fullVersion}`);
				continue;
			}
			throw err;
		}
	}

	core.warning(`all attempts at downloading ${fullVersion} failed; ` + (
		  hashProblems ? 'some hash problems were encountered'
				: unexpectedError ? 'some servers seem to have problems with the requests'
					  : `${edition} ${version.name} not found for ${platform}`
	));
	return null;
}


// Currently, all versions are at least 32-bit x86, although some may also contain x86-64 versions
const fasmArch: ReturnType<typeof os.arch> = 'ia32';

/**
 * @param userProvided If version is unknown and was provided by the user
 * @return Path to extracted directory or null on failure
 */
export async function downloadVersion(edition: FasmEditionStr, version: FasmVersionEx, platform: PlatformStr, assumeDynamicUnchanged = false)
	  : Promise<string | null> {

	const downloadDateFileName = '.download_date';
	let ifModifiedSince: Date | undefined;

	const cacheName  = `${edition}-${platform}`;
	const cachedPath = toolCache.find(cacheName, version.name, fasmArch);
	if (cachedPath) {
		core.debug('found cached');

		if (!version.dynamic || assumeDynamicUnchanged) {
			// Use cached version
			return cachedPath;
		} else {
			const dateFilePath = path.join(cachedPath, downloadDateFileName);
			if (fs.existsSync(dateFilePath)) ifModifiedSince = new Date(fs.readFileSync(dateFilePath, 'utf8'));
			core.debug(`but may be updated, last modified: ${ifModifiedSince?.toUTCString() || 'unknown'}`);
		}
	}

	const preDownloadDate = new Date();
	const result          = await downloadVersionArchive(edition, version, platform, undefined, ifModifiedSince);
	if (result === NOT_MODIFIED) {
		core.debug('server said not modified');
		return cachedPath;
	}
	if (!result) return null;
	const {path: packedPath, url} = result;

	const extract     = url.pathname.toLowerCase().endsWith('.zip') ? toolCache.extractZip : toolCache.extractTar;
	const extractPath = await extract(packedPath);
	fs.unlinkSync(packedPath);
	// Ideally, we would look at the date in the response, but tool-cache doesn't allow us
	// Even more ideally, we would use ETags -- same issue
	fs.writeFileSync(path.join(extractPath, downloadDateFileName), preDownloadDate.toUTCString(), 'utf8');
	await toolCache.cacheDir(extractPath, cacheName, version.name, fasmArch);
	return extractPath;
}


export type FasmData = {
	editions: { [edition in FasmEditionStr]: FasmEdition },
};

export type FasmEdition = {
	/** Ordered newest to oldest */
	versions: FasmVersion[],
};

export type FasmVersion = {
	/** Version number */
	name: string,
	/** Can the file for this version change? */
	dynamic?: boolean,
	hashes?: { [platform in PlatformStr]?: string },
	/** Alternative version number if file online is named differently */
	alt?: string,
};

export type FasmVersionEx = FasmVersion & {
	/** Version and/or hashes were provided by the user */
	userProvided?: boolean,
	/** Allow downloads using an insecure connection without hash */
	allowInsecure?: boolean,
};

export type FasmEditionStr = keyof typeof dataRaw.editions;
export type PlatformStr = 'windows' | 'linux' | 'unix';

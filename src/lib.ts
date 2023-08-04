import crypto from 'node:crypto';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import os from 'node:os';
import {pipeline} from 'node:stream/promises';

import * as core from '@actions/core';
import * as toolCache from '@actions/tool-cache';

import {FasmEdition, FasmEditionStr, FasmVersion, getUrls, PlatformStr} from 'fasm-versions';

import {equalsIgnoreCase} from './utils';

/** Get matching versions according to semver */
export function getMatchingVersions(edition: FasmEdition, requestedVersion: 'latest' | string,
	  downloadUnknown: 'never' | 'secure' | string | 'insecure',
): FasmVersionEx[] {
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

/**
 * @param allowInsecure Allow downloading insecure URLs without hash
 * @return Path of raw downloaded file
 * @throws DownloadError
 */
export async function downloadUrl(
	  url: URL, allowInsecure: boolean, expectedHash?: string, destinationFilePath?: string): Promise<string> {
	const secure = url.protocol === 'https:';

	if (!secure && !expectedHash && !allowInsecure) throw new MissingHashError(url);

	let packedPath;
	try {
		packedPath = await toolCache.downloadTool(url.href, destinationFilePath);
	} catch (err) {
		if (err instanceof toolCache.HTTPError) {
			throw new HttpError(url, err.httpStatusCode, {cause: err});
		} else throw err;
	}

	if (expectedHash) {
		const actualHash = await hashFile(packedPath);
		if (!equalsIgnoreCase(actualHash, expectedHash)) {
			await fsp.unlink(packedPath);
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


const officialOrigin = 'https://flatassembler.net';

/**
 * @param userProvided If version is unknown and was provided by the user
 * @return Path to archive and downloaded URL or null on failure
 */
export async function downloadVersionArchive(edition: FasmEditionStr, version: FasmVersionEx, platform: PlatformStr,
	  destinationFilePath?: string, ignoreOfficialHttpsHashMismatch = false,
): Promise<{ path: string, url: URL } | null> {
	const fullVersion = `${edition} ${version.name} for ${platform}`;

	const expectedHash = (version.hashes || {})[platform];

	/** Non-404 status */
	let unexpectedError = false;
	let hashProblems    = false;

	const urls = getUrls[edition](version, platform);
	for (const url of urls) {
		core.info(`trying ${url.href}`);

		try {
			return {
				path: await downloadUrl(url, !!version.allowInsecure,
					  ignoreOfficialHttpsHashMismatch && url.origin === officialOrigin
							? undefined : expectedHash,
					  destinationFilePath),
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
					  version.userProvided ? '' : ', you may want to report this to the setup-fasm action maintainer'
				}; not using this file`);
				continue;
			}
			if (err instanceof HttpError) {
				if (err.httpStatusCode !== undefined) unexpectedError ||= err.httpStatusCode !== 404;
				(err.httpStatusCode === 404 ? core.info : core.warning)(`${err.message} for ${fullVersion}`);
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
export async function downloadVersion(edition: FasmEditionStr, version: FasmVersionEx, platform: PlatformStr,
	  assumeDynamicUnchanged = false, ignoreOfficialHttpsHashMismatch = false,
)
	  : Promise<string | null> {

	// Don't use tool-cache version field as it only does semver x.x.x
	const cacheName  = `${edition}-${platform}-${version.name}`;
	const cachedPath = toolCache.find(cacheName, '0.0.0', fasmArch);
	if (cachedPath) {
		core.info('found cached');

		if (!version.dynamic || assumeDynamicUnchanged) {
			// Use cached version
			return cachedPath;
		} else {
			// Ideally, we would look at the date in the response and use If-Modified-Since, but tool-cache doesn't let us
			// Even more ideally, we would use ETags -- same issue
			// Using the download date for If-Modified-Since instead doesn't work,
			//   as HeavyThing rwasa replies with 200 to dates after the last modification date
			core.info('but may be updated');
		}
	}

	const result = await downloadVersionArchive(edition, version, platform,
		  undefined, ignoreOfficialHttpsHashMismatch);
	if (!result) return null;
	// eslint-disable-next-line prefer-const
	let {path: packedPath, url} = result;

	// Windows PowerShell Expand-Archive fix
	if (url.pathname.toLowerCase().endsWith('.zip') && !packedPath.endsWith('.zip'))
		await fsp.rename(packedPath, packedPath = `${packedPath}.zip`);
	const extract     = url.pathname.toLowerCase().endsWith('.zip') ? toolCache.extractZip : toolCache.extractTar;
	const extractPath = await extract(packedPath);
	await fsp.unlink(packedPath);
	await toolCache.cacheDir(extractPath, cacheName, '0.0.0', fasmArch);
	return extractPath;
}

export type FasmVersionEx = FasmVersion & {
	/** Version and/or hashes were provided by the user */
	userProvided?: boolean,
	/** Allow downloads using an insecure connection without hash */
	allowInsecure?: boolean,
};

import dataRaw from '../fasm_versions.json';

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

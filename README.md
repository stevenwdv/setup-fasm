setup-fasm
==========

This action downloads the specified edition and version of [flat assembler](https://flatassembler.net/) and adds it to PATH.

Available for Windows, Linux, and *nix.

Usage
-----

Use latest fasm 1 version:
```yaml
- uses: stevenwdv/setup-fasm@0.0.1

- name: Test fasm
  run: fasm
```
Note: Executable name may differ. `fasm.x64` may also be available on x86-64 Linux. Use `fasm.o` for macOS.

Use latest fasmg version:
```yaml
- uses: stevenwdv/setup-fasm@0.0.1
  with:
    edition: fasmg
```
FASMARM is also available.

Use specific version (accepts wildcard at the end):
```yaml
- uses: stevenwdv/setup-fasm@0.0.1
  with:
    edition: fasm1
    version: 1.71.*
```

Notes
-----

Not all versions are archived (for all platforms). This utility searches https://flatassembler.net/, http://fasm.sourceforge.net/archive/recent/, and http://comrade.ownz.com/docs/fasm.html#pastversions for archived versions, as long as the version number is found in [`fasm_version.json`](https://github.com/stevenwdv/setup-fasm/blob/main/fasm_version.json).

For FASMARM, only an unnamed latest version is available.

To download unknown versions, set `version` to a specific version number without wildcards and set the `download-unknown` input to one of the following values:

  - `secure`: Allow downloading unknown versions via a secure connection (not all archives support HTTPS).
  - _some [BLAKE2](https://www.blake2.net/)b-512 hash_: Allow downloading unknown versions via any connection, but verify that the hash corresponds to the given value.
  - `insecure`: Allow downloading unknown versions via any, possibly insecure, connection (not recommended except for testing).

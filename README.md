setup-fasm
==========

This action downloads the specified edition and version of [flat assembler](https://flatassembler.net/) and adds it to PATH.

Available for Windows, Linux, and \*nix systems supporting ELF binaries (not macOS).

Usage
-----

Use latest fasm 1 version:

```yaml
- uses: stevenwdv/setup-fasm@v1

- name: Test fasm
  run: fasm
```

Note: Executable name may differ. `fasm.x64` may also be available on x86-64 Linux. Use `fasm.o` for \*nix systems (none currently supported by GitHub).

Use latest fasm g version:

```yaml
- uses: stevenwdv/setup-fasm@v1
  with:
    edition: fasmg

- name: Test fasm g
  run: fasmg
```

FASMARM is also available.

Use specific version (accepts wildcard at the end):

```yaml
- uses: stevenwdv/setup-fasm@v1
  with:
    edition: fasm1
    version: 1.71.*
```

Additional notes
----------------

Not all versions are archived (for all platforms). This utility searches https://flatassembler.net/, http://fasm.sourceforge.net/archive/recent/, and http://comrade.ownz.com/docs/fasm.html#pastversions for archived versions, as long as the version number is found in [`fasm_versions.json`](https://github.com/stevenwdv/setup-fasm/blob/main/fasm_versions.json). Note that while some archives only support insecure HTTP, this script checks the hash of the downloaded file to make sure it has not been tampered with.

For FASMARM, only an unnamed latest version is available.

To download unknown versions, set `version` to a specific version number without wildcards and set the `download-unknown` input to one of the following values:

- `secure`: Allow downloading unknown versions via a secure connection (not all archives support HTTPS).
- _some [BLAKE2](https://www.blake2.net/)b-512 hash_: Allow downloading unknown versions via any connection, but verify that the hash corresponds to the given value.
- `insecure`: Allow downloading unknown versions via any, possibly insecure, connection (not recommended except for testing).

This script automatically sets the `INCLUDE` environment variable to the path of the `INCLUDE` folder in the fasm installation, if one exists, unless the `set-include-envvar` input is set to `false`.

See [`action.yml`](https://github.com/stevenwdv/setup-fasm/blob/main/action.yml) for all inputs and outputs of this action.

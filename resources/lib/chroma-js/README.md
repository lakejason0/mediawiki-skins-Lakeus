# chroma-js (vendored)

This directory contains an unmodified copy of the `chroma.js` browser build,
vendored so the Lakeus Theme Designer no longer has to fetch it from a CDN at
runtime.

## Provenance

| Field | Value |
| --- | --- |
| Package | [`chroma-js`](https://www.npmjs.com/package/chroma-js) |
| Version | `2.1.2` |
| File | `chroma.min.js` (from the published npm tarball, path `package/chroma.min.js`) |
| Licence | `(BSD-3-Clause AND Apache-2.0)` — see `LICENSE` |
| Upstream commit | `2.1.2` release tag |

Verification performed when vendoring (2026-10-14):

* The npm tarball `chroma-js-2.1.2.tgz` matches the registry-published
  `dist.integrity`
  (`sha512-ri/ouYDWuxfus3UcaMxC1Tfp3IE9K5iQzxc2hSxbBRVNQFut1UuGAsZmiAf2mOUubzGJwgMSv9lHg+XqLaz1QQ==`).
* `chroma.min.js` extracted from that tarball has SHA-256
  `09AA45937FF8645DC5E977923E5A6F1D6B45C3E5D56816400C60D3FEDC02A55F`,
  byte-identical to the file in this directory.
* `LICENSE` is byte-identical to `package/LICENSE` in the same tarball.

## Why 2.1.2 and not a newer release

`2.1.2` is the exact version the Theme Designer used to load from
jsDelivr, so the generated colours are unchanged by this migration. Bumping the
version is a separate, reviewable change: it can alter the output of every
`calculate()` rule in `themeDesigner.js`.

## How it is loaded

`skin.json` registers the `skins.lakeus.chroma` ResourceLoader module with this
file as a `packageFile`. ResourceLoader wraps package files with CommonJS-style
`require` / `module` / `exports`, so the file's UMD footer takes its
`module.exports = factory()` branch. Consumers therefore use:

```js
const chroma = require( 'skins.lakeus.chroma' );
```

and never touch a `window.chroma` global.

## Updating

1. Download the new tarball from the npm registry and verify `dist.integrity`.
2. Replace `chroma.min.js` and `LICENSE`.
3. Record the new version, hashes and date in the table above.
4. Bump the `version` of the `skins.lakeus.chroma` module in `skin.json` if
   ResourceLoader's cache needs invalidating (it hashes file contents, so this
   is normally unnecessary).

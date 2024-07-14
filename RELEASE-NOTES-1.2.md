# mediawiki-skins-Lakeus 1.2

## mediawiki-skins-Lakeus 1.2.1

This is a maintenance release of the mediawiki-skins-Lakeus 1.2 version.

This will be the last release support obsoleted MediaWiki version 1.40.x.

### Configuration changes for system administrators in 1.2.1

#### New configuration in 1.2.1

* `$wgLakeusCustomIndicators`: Makes it possible to set skin-wide page status
  indicators.
  Defaults to empty array (`[]`).

### Bug fixes in 1.2.1

* (issue #44) Fixed too-wide sidebar in narrow screen, causing cannot
  tap-to-close.
* (issue #44) Fixed the sidebar became too narrow if the texts in sidebar are
  too short.
* Fixed body height by changing `height` to `min-height`.

### Languages updated in 1.2.1

Lakeus skin now supports 27 languages. Many localisations are updated regularly.

### Other changes in 1.2.1

* (issue #45) Added `CONTRIBUTING.md`.
* (issue #46) Added GitHub issue templates.

## mediawiki-skins-Lakeus 1.2.0

This is the first release of the mediawiki-skins-Lakeus 1.2 version.

Obsoleted MediaWiki version 1.37.x, 1.38.x were no longer supported in this
release.

### Bug fixes in 1.2.0

* (issue #40, #41, #42, #43) Fixed content width changing when switching tabs in
  Special:Preferences, which was caused by `skin.less`.\
  This also contain fixes to the LESS `min()`, `max()` problem.

### Languages in 1.2.0

Lakeus skin now supports 27 languages. Many localisations are updated regularly.

### Deprecations in 1.2.0

* (issue #38) Support for obsoleted MediaWiki version 1.37.x, 1.38.x were
  dropped.
* (issue #38) Replaced deprecated PHP class alias `ResourceLoaderSkinModule`
  with namespaced `MediaWiki\ResourceLoader\SkinModule`.\
  The class was namespaced in MediaWiki 1.39
  (commit 3e2653f83bc096889d8b69d1e01a52d7de42b247,
  Change-Id Id08a220e1d6085e2b33f3f6c9d0e3935a4204659),\
  and the deprecated class alias was removed in MediaWiki 1.42
  (commit 21d8d9863b393e0bea608ac2f926b40bfecff9ad,
  Change-Id I5929a2f760c8d21c1cb2542a19220a91ac7240e4).

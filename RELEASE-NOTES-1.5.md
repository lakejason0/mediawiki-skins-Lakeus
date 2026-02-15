# mediawiki-skins-Lakeus 1.5

## mediawiki-skins-Lakeus 1.5.0

This is the first release of the mediawiki-skins-Lakeus 1.5 version.

### Configuration changes for system administrators

#### New configuration

* (#issue #47, #60) `$wgLakeusWikiDefaultColorScheme`: Makes it possible to set
  the default color scheme of the wiki when choosing \"Use wiki default\"
  preference option.
  This is especially useful when using shared user preferences instead of global
  user preferences.
  Default to `light`.
* (#21, #38) `$wgLakeusSearchModuleType`: Experimental, might not working.
  Only for MediaWiki 1.45+.
* (#21, #38) `$wgLakeusSearchOptions`: Whether to show thumbnail
  (`showThumbnail`) and description (`showDescription`) in search.
  Only for MediaWiki 1.45+.

### New user-facing features

* (#21, #38) Added Wikimedia Codex Vue search for MediaWiki 1.45+.

### Bug fixes

* Hide the icon of UniversalLanguageSelector.
* Fixed outdated PHP CI.

### Languages updated

Lakeus skin now supports 29 languages. Many localisations are updated regularly.

Below only new and removed languages are listed.

* Added localisations for Galician (gl).

### Deprecations

* Lakeus skin now require PHP 8.1, 8.2, 8.3; PHP 7.4, 8.0 are no longer
  supported.

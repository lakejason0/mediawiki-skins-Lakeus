# mediawiki-skins-Lakeus 1.5

## mediawiki-skins-Lakeus 1.5.0+REL1.44

This is the first release of the mediawiki-skins-Lakeus 1.5 version.

### Configuration changes for system administrators in 1.5.0+REL1.44

#### New configuration in 1.5.0+REL1.44

* (#issue #47, #60) `$wgLakeusWikiDefaultColorScheme`: Makes it possible to set
  the default color scheme of the wiki when choosing \"Use wiki default\"
  preference option.
  This is especially useful when using shared user preferences instead of global
  user preferences.
  Default to `light`.

### Bug fixes in 1.5.0+REL1.44

* Hide the icon of UniversalLanguageSelector.
* Fixed outdated PHP CI.

### Languages updated in 1.5.0+REL1.44

Lakeus skin now supports 29 languages. Many localisations are updated regularly.

Below only new and removed languages are listed.

* Added localisations for Galician (gl).

### Deprecations in 1.5.0+REL1.44

* Lakeus skin now require PHP 8.1, 8.2, 8.3; PHP 7.4, 8.0 are no longer
  supported.

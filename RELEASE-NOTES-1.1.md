# mediawiki-skins-Lakeus 1.1

## mediawiki-skins-Lakeus master branch

THIS IS NOT A RELEASE YET

The `master` branch is an alpha-quality development branch. Use it at your own
risk!

### Configuration changes for system administrators

#### New configuration

* …

#### Changed configuration

* …

#### Removed configuration

* …

### New user-facing features

* …

### New features for sysadmins

* …

### New developer features

* …

### Bug fixes

* Removed unnecessary modules.
* Fixed CodeMirror glitch.
* (issue #26) Removed unneeded `wp` prefix from `hide-if`.
* (issue #32) Fixed "access to private variable `$templateParser` of parent
  class" in `SkinLakeus.php` by dropping unneeded
  `BagOStuff $localServerObjectCache` dependency.
* …

### Action API changes

* …

### Action API internal changes

* …

### Languages updated

Lakeus skin now supports # languages. Many localisations are updated regularly.

Below only new and removed languages are listed.

* (issue #30) Added missing localisations for British English (tw).
* (issue #30) Added missing localisations for Cantonese (Traditional Han script)
  (yue-hant), which was moved from yue.
* (issue #35) Unified indentation for en.json by changing 2-whitespace
  indentation to tab-character indentation.
* …

### Breaking changes

* …

### Deprecations

* (issue #24) Converted to the new hook system.
* (T262067, issue #33) Migrated `templateDirectory` option to `skin.json`.
* …

### Other changes

* (issue #22) Fixed capitalization in README.
* Reordered skin.json based on mediawiki/core `docs/extension.schema.v2.json`
  (`6d71df9`).
* (issue #28, #29) Added documentations.
  * CODE_OF_CONDUCT
  * HISTORY
  * RELEASE-NOTES-1.1
  * SECURITY
* …

## mediawiki-skins-Lakeus 1.1.17

This is a maintenance release of the mediawiki-skins-Lakeus 1.1 version.

### New features for sysadmins in 1.1.17

* (issue #18) Added screenshot for installer.

### New developer features in 1.1.17

* (issue #18) Added PHP build tests, including PHPCS.

### Breaking changes in 1.1.17

* (issue #18) Moved `Lakeus` namespace under `MediaWiki\Skins` without keeping
  aliases.
* (issue #18) Namespaced `SkinLakeus` under `MediaWiki\Skins\Lakeus` without
  keeping aliases.

## mediawiki-skins-Lakeus 1.1.16

This is a maintenance release of the mediawiki-skins-Lakeus 1.1 version.

### New user-facing features in 1.1.16

* Optimized table overflowing.
* Adjusted icon opacity.
* Added use of OOUI icons.
* Moved sticky TOC position on mobile.
* Changed breakpoints.
* Hide sticky TOC when printing.
* Support smooth scroll through CSS3, enabled by default.
* Increased line height.
* Added `word-wrap` to `.mw-body`.

### Bug fixes in 1.1.16

* Fixed image overflowing.
* Fixed talk alert style issues.
* Fixed some `z-index` issues.

### Languages updated in 1.1.16

Lakeus skin now supports 26 languages. Many localisations are updated regularly.

Below only new and removed languages are listed.

* Added localisations for British English (en-gb).
* Added localisations for Hebrew (he).
* Added localisations for Interlingua (ia).
* Added localisations for Lithuanian (lt).
* Added localisations for Portuguese (pt).
* Added localisations for Slovenian (sl).

### Other changes in 1.1.16

* Added "Special thanks" in AUTHORS.

## mediawiki-skins-Lakeus 1.1.15

This is a maintenance release of the mediawiki-skins-Lakeus 1.1 version.

### Configuration changes for system administrators in 1.1.15

#### New configuration in 1.1.15

* `$wgLakeusShowStickyTOC`: Makes it possible to enable sticky TOC site-wide.
  Defaults to `false`.

### New user-facing features in 1.1.15

* Dropdowns are now labeled through HTML tags, instead of hardcoded CSS.
* Personal menu's position is tweaked.
* Some after content of portlets are now hidden.
* Added sticky TOC, with new variables and corresponding theme designer
  settings.
  * It is a bit buggy in MediaWiki 1.38, sometimes disappears.
  * Auto collapse behavior can be changed through user preferences.
  * To disable it site-wide, use `$wgLakeusShowStickyTOC`. To disable it
    user-side, use CSS.

## mediawiki-skins-Lakeus 1.1.14

This is a maintenance release of the mediawiki-skins-Lakeus 1.1 version.

### Configuration changes for system administrators in 1.1.14

#### New configuration in 1.1.14

* `$wgLakeusShouldAnimatePortlets`: Makes it possible to enable portlet
   animations. Defaults to `false`.

### New user-facing features in 1.1.14

* Added a toggle for portlet animations, `$wgLakeusShouldAnimatePortlets`.
  * Default to `false`, as it may cause visual artifacts.
  * The behavior before this version can be restored by setting it to `true`.

## mediawiki-skins-Lakeus 1.1.13

This is a maintenance release of the mediawiki-skins-Lakeus 1.1 version.

### New user-facing features in 1.1.13

* Added rules to `.mw-editsection-like`.

## mediawiki-skins-Lakeus 1.1.12

This is a maintenance release of the mediawiki-skins-Lakeus 1.1 version.

### Bug fixes in 1.1.12

* (issue #17) When a variant is selected, it is now not displaying.

## mediawiki-skins-Lakeus 1.1.11

This is a maintenance release of the mediawiki-skins-Lakeus 1.1 version.

### Bug fixes in 1.1.11

* Fixed "Jump to content" string wasn't included in `skin.json`.

## mediawiki-skins-Lakeus 1.1.10

This is a maintenance release of the mediawiki-skins-Lakeus 1.1 version.

### New user-facing features in 1.1.10

* Normalised Mustache templates.
* Added "Jump to content" link.
* Added styles for mw-prefixed message box classes.

## mediawiki-skins-Lakeus 1.1.9

This is a maintenance release of the mediawiki-skins-Lakeus 1.1 version.

### New user-facing features in 1.1.9

* Added printable version optimizations.

## mediawiki-skins-Lakeus 1.1.8

This is a maintenance release of the mediawiki-skins-Lakeus 1.1 version.

### Bug fixes in 1.1.8

* Changed dependencies from wrong `user.defaults` to `user.options`.

### Deprecations in 1.1.8

* Removed deprecated ResourceModule feature `content-thumbnails`.

## mediawiki-skins-Lakeus 1.1.7

This is a maintenance release of the mediawiki-skins-Lakeus 1.1 version.

### Bug fixes in 1.1.7

* Fixed some issues in `skin.less`.

## mediawiki-skins-Lakeus 1.1.6

This is a maintenance release of the mediawiki-skins-Lakeus 1.1 version.

### New user-facing features in 1.1.6

* ULS will not be shown under semi-mobile.

### Bug fixes in 1.1.6

* The site title now has a min-width, fixing the overflow issue.

## mediawiki-skins-Lakeus 1.1.5

This is a maintenance release of the mediawiki-skins-Lakeus 1.1 version.

### New user-facing features in 1.1.5

* Tweaked the Echo extension.
* Implemented support for the UniversalLanguageSelector extension (ULS) in
  MediaWiki 1.37.

## mediawiki-skins-Lakeus 1.1.4

This is a maintenance release of the mediawiki-skins-Lakeus 1.1 version.

### New user-facing features in 1.1.4

* Moved the page tools portlet to the action bar.

### Languages updated in 1.1.4

Lakeus skin now supports 20 languages. Many localisations are updated regularly.

Below only new and removed languages are listed.

* Added localisations for Korean (ko).

## mediawiki-skins-Lakeus 1.1.3

This is a maintenance release of the mediawiki-skins-Lakeus 1.1 version.

### Bug fixes in 1.1.3

* Fixed some settings position in the theme designer.

## mediawiki-skins-Lakeus 1.1.2

This is a maintenance release of the mediawiki-skins-Lakeus 1.1 version.

### Bug fixes in 1.1.2

* Fixed typos in i18n.

## mediawiki-skins-Lakeus 1.1.1

This is a maintenance release of the mediawiki-skins-Lakeus 1.1 version.

### Bug fixes in 1.1.1

* Fixed typos in i18n.

## mediawiki-skins-Lakeus 1.1.0

This is the first release of the mediawiki-skins-Lakeus 1.1 version.

### New user-facing features in 1.1.0

* Implemented theme designer.
* More variablization.
* Added user preference to enable theme designer.

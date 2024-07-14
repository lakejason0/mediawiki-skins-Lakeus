Change notes from older releases. For current info, see RELEASE-NOTES-1.2.

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

### Languages in 1.2.1

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

# mediawiki-skins-Lakeus 1.1

## mediawiki-skins-Lakeus 1.1.18

This is a maintenance release of the mediawiki-skins-Lakeus 1.1 version.

This will be the last release support obsoleted MediaWiki version 1.37.x,
1.38.x.

### Bug fixes in 1.1.18

* Removed unnecessary modules.
* Fixed CodeMirror glitch.
* (issue #26) Removed unneeded `wp` prefix from `hide-if`.
* (issue #32) Fixed "access to private variable `$templateParser` of parent
  class" in `SkinLakeus.php` by dropping unneeded
  `BagOStuff $localServerObjectCache` dependency.
* Fixed hexcolor.replace is not a function

### Languages updated in 1.1.18

Lakeus skin now supports 27 languages. Many localisations are updated regularly.

Below only new and removed languages are listed.

* (issue #30) Added missing localisations for Twi (tw).
* (issue #30) Added missing localisations for Cantonese (Traditional Han script)
  (yue-hant), which was moved from yue.
* (issue #35) Unified indentation for en.json by changing 2-whitespace
  indentation to tab-character indentation.

### Deprecations in 1.1.18

* (issue #24) Converted to the new hook system.
* (T262067, issue #33) Migrated `templateDirectory` option to `skin.json`.

### Other changes in 1.1.18

* (issue #22) Fixed capitalization in README.
* Reordered skin.json based on mediawiki/core `docs/extension.schema.v2.json`
  (`6d71df9`).
* (issue #28, #29) Added documentations.
  * CODE_OF_CONDUCT
  * HISTORY
  * RELEASE-NOTES-1.1
  * SECURITY

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

# mediawiki-skins-Lakeus 1.0

## mediawiki-skins-Lakeus 1.0.19

This is a maintenance release of the mediawiki-skins-Lakeus 1.0 version.

### New developer features in 1.0.19

* Localization for theme designer.
  * Theme designer is not implemented in this version.
* Variablization for theme designer.

### Bug fixes in 1.0.19

* Changed the directory for templates to remove warnings in MediaWiki 1.37.

## mediawiki-skins-Lakeus 1.0.18

This is a maintenance release of the mediawiki-skins-Lakeus 1.0 version.

### Configuration changes for system administrators in 1.0.18

#### New configuration in 1.0.18

* `$wgLakeusSiteNoticeHasBorder`: Makes it possible to restore the behavior of
  the border of site notice. Defaults to `false`.

### New user-facing features in 1.0.18

* Added a toggle for border of site notice, `$wgLakeusSiteNoticeHasBorder`.
  * Defaults to `false`.
  * The behavior before this version can be restored by setting it to `true`.

## mediawiki-skins-Lakeus 1.0.17

This is a maintenance release of the mediawiki-skins-Lakeus 1.0 version.

### New user-facing features in 1.0.17

* Several styles tweaks, including:
  * Made logo text (not the wordmark image, only the *text* in the same place)
    smaller. This is for long site names.

    You can restore the behavior before this version by adding CSS like this:

    ```css
    #logo-text {
        font-size: 160%;
    }
    ```

  * Removed the `max-width` of site notice.
  * Enlarged the title of each menu section in the sidebar menu.
  * Made footer be the same width as the content area in wide screens.
  * The footer icons will be vertically aligned in narrow screens.

### New developer features in 1.0.17

* Now uses `@noflip` for RTL tweaks part, making it semantically clearer.

### Languages updated in 1.0.17

Lakeus skin now supports 19 languages. Many localisations are updated regularly.

Below only new and removed languages are listed.

* Added localisations for Tarantino (roa-tara).

### Other changes in 1.0.17

* Improved the wording of `README.md`.

## mediawiki-skins-Lakeus 1.0.16

This is a maintenance release of the mediawiki-skins-Lakeus 1.0 version.

### New user-facing features in 1.0.16

* Improved the style of auto suggestion part of the search bar.

## mediawiki-skins-Lakeus 1.0.15

This is a maintenance release of the mediawiki-skins-Lakeus 1.0 version.

### New user-facing features in 1.0.15

* The container element of the repository link is now removed when
  `$wgLakeusShowRepositoryLink` is set to `false`.

## mediawiki-skins-Lakeus 1.0.14

This is a maintenance release of the mediawiki-skins-Lakeus 1.0 version.

### Changes in 1.0.14

* Updated `AUTHORS.txt`.

## mediawiki-skins-Lakeus 1.0.13

This is a maintenance release of the mediawiki-skins-Lakeus 1.0 version.

### New user-facing features in 1.0.13

* Added `margin-top` for `#mw-content-text`.

### Languages updated in 1.0.13

Lakeus skin now supports 18 languages. Many localisations are updated regularly.

Below only new and removed languages are listed.

* Added localisations for Persian (fa).
* Added localisations for Ukrainian (uk).
* Added localisations for Cantonese (yue).

## mediawiki-skins-Lakeus 1.0.12

This is a maintenance release of the mediawiki-skins-Lakeus 1.0 version.

### Bug fixes in 1.0.12

* Fixed a stupid bug caused by me who knows nothing about PHP.
  * **Warning**: The use statement with non-compound name 'SiteStats' has no
    effect in **skins/Lakeus/SkinLakeus.php** on line **3**.

## mediawiki-skins-Lakeus 1.0.11

This is a maintenance release of the mediawiki-skins-Lakeus 1.0 version.

### New user-facing features in 1.0.11

* Added `alt` for several `<img>` tags.

### Bug fixes in 1.0.11

* Fixed one `z-index` issue (again).

### Languages updated in 1.0.11

Lakeus skin now supports localisation updates from translatewiki.net.

Lakeus skin now supports 15 languages. Many localisations are updated regularly.

Below only new and removed languages are listed.

* Added localisations for Bangla (bn).
* Added localisations for Finnish (fi).
* Added localisations for French (fr).
* Added localisations for Hindi (hi).
* Added localisations for Japanese (ja).
* Added localisations for Luxembourgish (lb).
* Added localisations for Macedonian (mk).
* Added localisations for Dutch (nl).
* Added localisations for Brazilian Portuguese (pt-br).
* Added localisations for Swedish (sv).
* Added localisations for Turkish (tr).
* Added localisations for Chinese (Hong Kong) (zh-hk).

## mediawiki-skins-Lakeus 1.0.10

This is a maintenance release of the mediawiki-skins-Lakeus 1.0 version.

### New user-facing features in 1.0.10

* Enabled 2 features: `i18n-all-lists-margins` and `i18n-headings`.

### Bug fixes in 1.0.10

* Fixed several `z-index` issues.
  * Hope that it's the last time. 🙃
* Fixed style for anon users in personal menu.
* Fixed the issue when switching to VE from WikiEditor that the text may seem to
  be collided to each other by adding a background to the edit option panel.
* Some site may use `display: none;` to make site notice invisible, however this
  make search bar collide with the page title. Adjusted the margin setting and I
  hope that everything is still fine.

## mediawiki-skins-Lakeus 1.0.9

This is a maintenance release of the mediawiki-skins-Lakeus 1.0 version.

### New user-facing features in 1.0.9

* Colors of portlet items being focused & hovered can now be changed through
  these CSS variables:
  * `--background-color-toggle-list-item-hover`
  * `--background-color-toggle-list-item-focus`
  * `--background-color-portlet-item-hover`
  * `--background-color-portlet-item-focus`

## mediawiki-skins-Lakeus 1.0.8

This is a maintenance release of the mediawiki-skins-Lakeus 1.0 version.

### Configuration changes for system administrators in 1.0.8

#### New configuration in 1.0.8

* `$wgLakeusShowRepositoryLink`: Makes it possible to disable the added link to
  this repository in footer. Defaults to `true`.

### New user-facing features in 1.0.8

* Added a link to this repository to the footer.
  * You can disable it by setting `$wgLakeusShowRepositoryLink` to `false`.

## mediawiki-skins-Lakeus 1.0.7

This is a maintenance release of the mediawiki-skins-Lakeus 1.0 version.

### Bug fixes in 1.0.7

* If no logo presents, the space would still be kept.

## mediawiki-skins-Lakeus 1.0.6

This is a maintenance release of the mediawiki-skins-Lakeus 1.0 version.

### New user-facing features in 1.0.6

* Customization via CSS variables.
  * Media queries does not support native CSS variables; you can only modify
    the less file for now.
* New sidebar menu styles.
  * Added a card on the top of the menu.
    * A logo; should be set from `logo` of `$wgLogos`.
    * A wordmark or site title; from `wordmark` of `$wgLogos` or the system
      message `sitetitle`.
    * An article counter.

### New developer features in 1.0.6

* Linted the code.
* Separated variables to another file.
* Now uses PHP to fetch more data (e.g. the article count).

## mediawiki-skins-Lakeus 1.0.5

This is a maintenance release of the mediawiki-skins-Lakeus 1.0 version.

### New user-facing features in 1.0.5

* Added Basic RTL support.
* Added compatibility with the extension NoTitle.
* Localised one string of the sidebar menu button.
* Adjusted the style of subpage / redirect notice texts.

## mediawiki-skins-Lakeus 1.0.4

This is a maintenance release of the mediawiki-skins-Lakeus 1.0 version.

### New user-facing features in 1.0.4

* Portlets will automatically close when mouse clicks outside them.
  * You'll need to enable JavaScript to enable this feature; portlets are still
    able to use without JavaScript.
* Adjusted the style of site notice.
  * On narrower screens the site notice would be wider.
* Adjusted the style of portlet items.
  * `margin`s of the `<li>`s are now given to their `<a>` children, making the
    whole item clickable and easier for me adding `:hover` and `:focus` styles
    to the items.
* Adjusted the style of the categories section.

### Bug fixes in 1.0.4

* Empty portlets are no longer shown.
  * Thus when the site's language does not have any variants, the variant menu
    would now be invisible.
* Fixed several `z-index` issues.
  * If you are still experiencing issues of `z-index` (e.g. WikiEditor's toolbar
    shows above the sidebar modal), make sure to create an issue for those.
* Fixed a bug that the class `.skin-Lakeus` is applied to `<body>` instead of
  `.skin-lakeus`.

## mediawiki-skins-Lakeus 1.0.3

This is a maintenance release of the mediawiki-skins-Lakeus 1.0 version.

### Bug fixes in 1.0.3

* Fixed a typo.

## mediawiki-skins-Lakeus 1.0.2

This is a maintenance release of the mediawiki-skins-Lakeus 1.0 version.

### New user-facing features in 1.0.2

* Unified design.
  * Instead of using bare borders, shadows are applied to make things more
    consistent.
  * Applied several `border-radius` settings.
* Adjusted the design of content header.

## mediawiki-skins-Lakeus 1.0.1

This is a maintenance release of the mediawiki-skins-Lakeus 1.0 version.

### New user-facing features in 1.0.1

* (issue #3) Added missing strings for CSS & JS.

## mediawiki-skins-Lakeus 1.0.0

This is the first release of the mediawiki-skins-Lakeus 1.0 version.

### New user-facing features in 1.0.0

* Changed the style of the header.
* Moved languages and variants menus to the right of the action menu.
* (issue #2) Added animation to dropdown menus and the sidebar menu.
* Adjusted the style of the sidebar menu.
* Adjusted the style of the content box.

### Bug fixes in 1.0.0

* The content box and the site notice box are aligned.

### Languages updated in 1.0.0

Lakeus skin now supports 3 languages.

Below only new and removed languages are listed.

* Added localisations for English (en).
* Added localisations for Chinese (Simplified Han script) (zh-hans).
* Added localisations for Chinese (Traditional Han script) (zh-hant).

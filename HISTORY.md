Change notes from older releases. For current info, see RELEASE-NOTES-1.1.

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

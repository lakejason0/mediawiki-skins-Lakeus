# mediawiki-skins-Lakeus 1.6

## mediawiki-skins-Lakeus 1.6.0+REL1.43

This is the first release of the mediawiki-skins-Lakeus 1.6 version for
MediaWiki 1.43.

### New user-facing features

* Backported the Theme Designer refactor from 1.6.0: the panel is now rendered
  with Vue and Codex, and edits the light and dark colour schemes separately.
  The panel follows the skin's current scheme and stays readable while a theme
  is being tested.
* Generated themes now provide both the `-light` and `-dark` halves of every
  colour variable, so a theme is applied in the skin's dark-mode paths too.
* Added hover and active variants of the primary colour to the Theme Designer.
* Added a Lakeus-to-Codex design-token adapter, so Codex messages, form
  controls and other components pick up the wiki's theme colours.
* chroma.js is now shipped as a ResourceLoader module instead of being fetched
  from a CDN at runtime.

### New developer features

* The Theme Designer's variable table is now split into
  `themeDesigner.variables.js` (the table) and `themeDesigner.rules.js` (named
  derivation rules); the panel markup is built from Vue single-file components
  in `resources/skins.lakeus.theme.designer.vue`.
* Added a `skins.lakeus.chroma` ResourceLoader module for the vendored
  chroma.js 2.1.2.

### Bug fixes

* Fixed `LakeusHooks` not receiving `MainConfig`, which made the ResourceLoader
  startup module and the skin's preferences fail on MediaWiki 1.43.
* Fixed compatibility with the Codex 1.x design tokens shipped with MediaWiki
  1.43: the mode-reset tokens are imported from their pre-2.0 file name
  (`theme-wikimedia-ui-reset.less`).
* Fixed PHP CI (mediawiki-codesniffer 48.0.2).

### Languages updated

Lakeus skin now supports 30 languages. Many localisations are updated regularly.

Below only new and removed languages are listed.

* Added localisations for Somali (so).

### Breaking changes

* The skin's own CSS custom properties are now namespaced: bare names such as
  `--color-*`, `--background-color-*`, `--border-color-*` and `--text-color-*`
  are now `--lakeus-color-*`, `--lakeus-background-color-*`,
  `--lakeus-border-color-*` and `--lakeus-text-color-*`, and similarly for the
  other variables. Site and user stylesheets that reference the old names must
  be updated. The `-light` and `-dark` halves emitted by the Theme Designer
  keep their existing names.

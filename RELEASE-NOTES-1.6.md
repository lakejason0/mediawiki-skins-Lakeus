# mediawiki-skins-Lakeus 1.6

## mediawiki-skins-Lakeus 1.6.0

This is the first release of the mediawiki-skins-Lakeus 1.6 version.

### New user-facing features

* The Theme Designer is now rendered with Vue and Codex: every field, checkbox
  and radio button in the panel is a real Codex component.
* The Theme Designer edits the light and dark colour schemes separately. The
  panel follows the skin's current scheme and stays readable while a theme is
  being tested.
* Generated themes now provide both the `-light` and `-dark` halves of every
  colour variable, so a theme is applied in all of the skin's dark-mode paths
  instead of being ignored.
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

* Fixed several determinism and re-entrancy defects in the Theme Designer's
  derivation engine: derived colours no longer depend on list order,
  `initColorSchemes` is re-entrant, and the dark palette is no longer
  re-derived on every scheme switch.
* Fixed the panel overwriting the dark palette when switching colour schemes,
  and values of skipped fields leaking between schemes.
* Fixed the colour-picker fallback and the "auto calculate" checkbox state.
* Fixed the panel's input spacing and native control heights to match Codex.
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
* The `master` branch now requires MediaWiki 1.46.0 or later. Support for
  MediaWiki 1.44.x and 1.45.x has been dropped from `master`; use the
  `REL1_44` and `REL1_45` branches instead.
* The skin has been migrated to MediaWiki's modern menu system for MediaWiki
  1.46.

/**
 * The Theme Designer's variable table.
 *
 * One entry per CSS custom property the skin exposes as a `--<name>-light` /
 * `--<name>-dark` pair. Each entry says how the variable is presented
 * (`fieldset`, `input`, `allowAlpha`), how it behaves (`rule.autoCalculate`)
 * and, for derived variables, one named rule saying where its value comes from.
 *
 * The rules come from themeDesigner.rules.js, which is what makes them
 * readable. This used to be 99 anonymous closures full of expressions like
 *
 *     Lakeus.changeColorBrightnessByContrast(
 *         Lakeus.variablesList[ this.calculateFrom[ 0 ] ].value,
 *         Lakeus.calculateRGBAActualValue(
 *             Lakeus.variablesList[ this.calculateFrom[ 1 ] ].value,
 *             Lakeus.variablesList[ this.calculateFrom[ 2 ] ].value
 *         ),
 *         1, 1
 *     )
 *
 * where nothing said what the rule MEANT, and the variables were referred to by
 * position. The same rule now reads
 *
 *     derive.nudge(
 *         colour.of( 'color-link' ),
 *         colour.of( 'background-color-content' )
 *             .flattenOver( colour.of( 'background-color-body' ) ),
 *         { brightenIfDark: 1, darkenIfLight: 1 }
 *     )
 *
 * There is no `calculateFrom` any more: a rule carries its own source list,
 * which is what Lakeus.sourceFingerprint() reads, so the two cannot disagree.
 *
 * Values here are the designer's *light* defaults; dark defaults are read from
 * the skin's own `--<name>-dark` at runtime - see Lakeus.initColorSchemes().
 *
 * Generated from the previous table by tools/generate-table.mjs, which checks
 * for each entry that the variables the new rule reads are exactly the ones the
 * old `calculateFrom` listed.
 *
 * @param {Object} Lakeus The shared namespace, so rules can read other variables
 *   through `Lakeus.variablesList`.
 * @param {Function} chroma The vendored chroma.js factory.
 * @return {Object} Map of variable name to entry.
 */
module.exports = function ( Lakeus, chroma ) {
    const { colour, derive } = require( './themeDesigner.rules.js' )( Lakeus, chroma );

    return {
        "color-primary": {
            fieldset: "lakeus-theme-designer-basic",
            rule: {
                autoCalculate: "manual",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#36c"),
            value: chroma("#36c"),
            calculate: derive.manual(),
        },
        "color-primary--hover": {
            fieldset: "lakeus-theme-designer-basic",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#1e5bbf"),
            value: chroma("#1e5bbf"),
            calculate: derive.nudge(
                colour.of( 'color-primary' ),
                colour.of( 'background-color-content' ).flattenOver( colour.of( 'background-color-body' ) ),
                { brightenIfDark: 0.25, darkenIfLight: 0.25 }
            ),
        },
        "color-primary--active": {
            fieldset: "lakeus-theme-designer-basic",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#002a82"),
            value: chroma("#002a82"),
            calculate: derive.nudge(
                colour.of( 'color-primary' ),
                colour.of( 'background-color-content' ).flattenOver( colour.of( 'background-color-body' ) ),
                { brightenIfDark: 0.5, darkenIfLight: 1.5 }
            ),
        },
        "color-secondary": {
            fieldset: "lakeus-theme-designer-basic",
            rule: {
                autoCalculate: "manual",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#ffffff"),
            value: chroma("#ffffff"),
            calculate: derive.manual(),
        },
        "color-neutral": {
            fieldset: "lakeus-theme-designer-basic",
            rule: {
                autoCalculate: "manual",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#a2a9b1"),
            value: chroma("#a2a9b1"),
            calculate: derive.manual(),
        },
        "color-warning": {
            fieldset: "lakeus-theme-designer-basic",
            rule: {
                autoCalculate: "manual",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#ffcc33"),
            value: chroma("#ffcc33"),
            calculate: derive.manual(),
        },
        "color-error": {
            fieldset: "lakeus-theme-designer-basic",
            rule: {
                autoCalculate: "manual",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#dd3333"),
            value: chroma("#dd3333"),
            calculate: derive.manual(),
        },
        "color-success": {
            fieldset: "lakeus-theme-designer-basic",
            rule: {
                autoCalculate: "manual",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#14866d"),
            value: chroma("#14866d"),
            calculate: derive.manual(),
        },
        "color-header": {
            fieldset: "lakeus-theme-designer-basic",
            rule: {
                autoCalculate: "manual",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#ffffff"),
            value: chroma("#ffffff"),
            calculate: derive.manual(),
        },
        "color-link": {
            fieldset: "lakeus-theme-designer-basic",
            rule: {
                autoCalculate: "calculateWhenNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#0645ad"),
            value: chroma("#0645ad"),
            calculate: derive.inherit( 'color-primary' ),
        },
        "color-secondary--derived": {
            fieldset: "lakeus-theme-designer-basic-derived",
            rule: {
                autoCalculate: "calculateWhenNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#f8f9fa"),
            value: chroma("#f8f9fa"),
            calculate: derive.textOn(
                colour.of( 'color-secondary' ),
                {
                    onLight: colour.of( 'color-secondary' ).darken( 0.1 ),
                    onDark: colour.of( 'color-secondary' ).brighten( 0.1 )
                }
            ),
        },
        "border-color-secondary--derived": {
            fieldset: "lakeus-theme-designer-basic-derived",
            rule: {
                autoCalculate: "calculateWhenNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#a2a9b1"),
            value: chroma("#a2a9b1"),
            calculate: derive.textOn(
                colour.of( 'color-secondary' ),
                {
                    onLight: colour.of( 'color-secondary' ).darken( 1 ),
                    onDark: colour.of( 'color-secondary' ).brighten( 1.5 )
                }
            ),
        },
        "font-family": {
            fieldset: "lakeus-theme-designer-global",
            rule: {
                autoCalculate: "manual",
                generateByDefault: true,
            },
            input: "text",
            default: "'Roboto', -apple-system, blinkmacsystemfont, 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Helvetica Neue', sans-serif",
            value: "'Roboto', -apple-system, blinkmacsystemfont, 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Helvetica Neue', sans-serif",
            calculate: derive.manual(),
        },
        "font-family-serif": {
            fieldset: "lakeus-theme-designer-global",
            rule: {
                autoCalculate: "manual",
                generateByDefault: true,
            },
            input: "text",
            default: "'Linux Libertine', 'Times New Roman', 'Liberation Serif', 'Nimbus Roman', 'Noto Serif', 'Times', serif",
            value: "'Linux Libertine', 'Times New Roman', 'Liberation Serif', 'Nimbus Roman', 'Noto Serif', 'Times', serif",
            calculate: derive.manual(),
        },
        "elevation": {
            fieldset: "lakeus-theme-designer-global",
            rule: {
                autoCalculate: "manual",
                generateByDefault: true,
            },
            input: "text",
            default: "0 2px 2px rgba( 0, 0, 0, 10% )",
            value: "0 2px 2px rgba( 0, 0, 0, 10% )",
            calculate: derive.manual(),
        },
        "background-color-base": {
            fieldset: "lakeus-theme-designer-global",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#ffffff"),
            value: chroma("#ffffff"),
            calculate: derive.inherit( 'color-secondary' ),
        },
        "color-link--visited": {
            fieldset: "lakeus-theme-designer-global",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#0b0080"),
            value: chroma("#0b0080"),
            calculate: derive.nudge(
                colour.of( 'color-link' ),
                colour.of( 'background-color-content' ).flattenOver( colour.of( 'background-color-body' ) ),
                { brightenIfDark: 1, darkenIfLight: 1 }
            ),
        },
        "color-link--active": {
            fieldset: "lakeus-theme-designer-global",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#faa700"),
            value: chroma("#faa700"),
            calculate: derive.brighten( 'color-link', 1 ),
        },
        "color-link-new": {
            fieldset: "lakeus-theme-designer-global",
            rule: {
                autoCalculate: "calculateWhenNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#d33"),
            value: chroma("#d33"),
            calculate: derive.hueShift( 'color-primary', 180 ),
        },
        "color-link-new--visited": {
            fieldset: "lakeus-theme-designer-global",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#a55858"),
            value: chroma("#a55858"),
            calculate: derive.nudge(
                colour.of( 'color-link-new' ),
                colour.of( 'background-color-content' ).flattenOver( colour.of( 'background-color-body' ) ),
                { brightenIfDark: 1, darkenIfLight: 1 }
            ),
        },
        "color-link-new--active": {
            fieldset: "lakeus-theme-designer-global",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#faa700"),
            value: chroma("#faa700"),
            calculate: derive.brighten( 'color-link-new', 1 ),
        },
        "color-link-external": {
            fieldset: "lakeus-theme-designer-global",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#36b"),
            value: chroma("#36b"),
            calculate: derive.nudge(
                colour.of( 'color-link' ),
                colour.of( 'background-color-content' ).flattenOver( colour.of( 'background-color-body' ) ),
                { brightenIfDark: 0.2, darkenIfLight: 0.2 }
            ),
        },
        "color-link-external--visited": {
            fieldset: "lakeus-theme-designer-global",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#636"),
            value: chroma("#636"),
            calculate: derive.nudge(
                colour.of( 'color-link-external' ),
                colour.of( 'background-color-content' ).flattenOver( colour.of( 'background-color-body' ) ),
                { brightenIfDark: 1, darkenIfLight: 1 }
            ),
        },
        "color-link-external--active": {
            fieldset: "lakeus-theme-designer-global",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#b63"),
            value: chroma("#b63"),
            calculate: derive.brighten( 'color-link-external', 1 ),
        },
        "header-elevation": {
            fieldset: "lakeus-theme-designer-page-header",
            rule: {
                autoCalculate: "manual",
                generateByDefault: true,
            },
            input: "text",
            default: "var( --lakeus-elevation )",
            value: "var( --lakeus-elevation )",
            calculate: derive.manual(),
        },
        "text-color-header": {
            fieldset: "lakeus-theme-designer-page-header",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#000000"),
            value: chroma("#000000"),
            calculate: derive.textOn( colour.of( 'color-header' ).flattenOver( colour.of( 'background-color-body' ) ) ),
        },
        "icon-filter-header": {
            fieldset: "lakeus-theme-designer-page-header",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "text",
            default: "unset",
            value: "unset",
            calculate: derive.textOn(
                colour.of( 'color-header' ).flattenOver( colour.of( 'background-color-body' ) ),
                {
                    onLight: colour.text( "unset" ),
                    onDark: colour.text( "invert(1) hue-rotate(180deg)" )
                }
            ),
        },
        "background-color-search-suggestions": {
            fieldset: "lakeus-theme-designer-page-header",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#ffffff"),
            value: chroma("#ffffff"),
            calculate: derive.inherit( 'color-secondary' ),
        },
        "border-color-search-suggestions": {
            fieldset: "lakeus-theme-designer-page-header",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#c8ccd1"),
            value: chroma("#c8ccd1"),
            calculate: derive.nudge(
                colour.of( 'background-color-search-suggestions' ),
                colour.of( 'color-header' ).flattenOver( colour.of( 'background-color-body' ) ),
                { brightenIfDark: 2, darkenIfLight: 2 }
            ),
        },
        "background-color-search-suggestions-current": {
            fieldset: "lakeus-theme-designer-page-header",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#1d5492"),
            value: chroma("#1d5492"),
            calculate: derive.inherit( 'color-primary' ),
        },
        "color-search-suggestions-text": {
            fieldset: "lakeus-theme-designer-page-header",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#000000"),
            value: chroma("#000000"),
            calculate: derive.textOn( colour.of( 'background-color-search-suggestions' ) ),
        },
        "color-search-suggestions-text-current": {
            fieldset: "lakeus-theme-designer-page-header",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#ffffff"),
            value: chroma("#ffffff"),
            calculate: derive.textOn( colour.of( 'background-color-search-suggestions-current' ) ),
        },
        "background-color-search-input": {
            fieldset: "lakeus-theme-designer-page-header",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#ffffff"),
            value: chroma("#ffffff"),
            calculate: derive.inherit( 'color-secondary' ),
        },
        "border-color-search-bar": {
            fieldset: "lakeus-theme-designer-page-header",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#eaecf0"),
            value: chroma("#eaecf0"),
            calculate: derive.nudge(
                colour.of( 'background-color-search-input' ),
                colour.of( 'color-header' ).flattenOver( colour.of( 'background-color-body' ) ),
                { brightenIfDark: 2, darkenIfLight: 2 }
            ),
        },
        "box-shadow-search-input": {
            fieldset: "lakeus-theme-designer-page-header",
            rule: {
                autoCalculate: "manual",
                generateByDefault: true,
            },
            input: "text",
            default: "0 1px 1px var( --lakeus-box-shadow-color-search-input )",
            value: "0 1px 1px var( --lakeus-box-shadow-color-search-input )",
            calculate: derive.manual(),
        },
        "box-shadow-color-search-input": {
            fieldset: "lakeus-theme-designer-page-header",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#000000").alpha(0.05),
            value: chroma("#000000").alpha(0.05),
            calculate: derive.nudge(
                colour.of( 'background-color-search-input' ),
                colour.of( 'color-header' ).flattenOver( colour.of( 'background-color-body' ) ),
                { brightenIfDark: 2, darkenIfLight: 2 }
            ),
        },
        "background-color-toggle-list": {
            fieldset: "lakeus-theme-designer-toggle-list",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#ffffff"),
            value: chroma("#ffffff"),
            calculate: derive.inherit( 'color-secondary' ),
        },
        "background-color-toggle-list-card": {
            fieldset: "lakeus-theme-designer-toggle-list",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#eeeeee"),
            value: chroma("#eeeeee"),
            calculate: derive.inherit( 'color-primary' ),
        },
        "text-color-toggle-list-item": {
            fieldset: "lakeus-theme-designer-toggle-list",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#1c1c1c"),
            value: chroma("#1c1c1c"),
            calculate: derive.textOn( colour.of( 'background-color-toggle-list' ) ),
        },
        "background-color-toggle-list-item-hover": {
            fieldset: "lakeus-theme-designer-toggle-list",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#000000").alpha(0.1),
            value: chroma("#000000").alpha(0.1),
            calculate: derive.fade( 'color-primary', 0.1 ),
        },
        "text-color-toggle-list-item-hover": {
            fieldset: "lakeus-theme-designer-toggle-list",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#3a3a3a"),
            value: chroma("#3a3a3a"),
            calculate: derive.inherit( 'color-primary' ),
        },
        "background-color-toggle-list-item-focus": {
            fieldset: "lakeus-theme-designer-toggle-list",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#000000").alpha(0.2),
            value: chroma("#000000").alpha(0.2),
            calculate: derive.nudge(
                colour.of( 'background-color-toggle-list-item-hover' ),
                colour.of( 'background-color-toggle-list' ),
                { brightenIfDark: 0.2, darkenIfLight: 0.2, alpha: 0.2 }
            ),
        },
        "text-color-toggle-list-item-focus": {
            fieldset: "lakeus-theme-designer-toggle-list",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#3a3a3a"),
            value: chroma("#3a3a3a"),
            calculate: derive.inherit( 'text-color-toggle-list-item-hover' ),
        },
        "border-color-toggle-list": {
            fieldset: "lakeus-theme-designer-toggle-list",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#dddddd"),
            value: chroma("#dddddd"),
            calculate: derive.nudge(
                colour.of( 'background-color-toggle-list' ),
                colour.of( 'background-color-toggle-list' ),
                { brightenIfDark: 2, darkenIfLight: 2 }
            ),
        },
        "subheader-color-toggle-list": {
            fieldset: "lakeus-theme-designer-toggle-list",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#909aa1"),
            value: chroma("#909aa1"),
            calculate: derive.textOn(
                colour.of( 'background-color-toggle-list-card' ),
                {
                    onLight: colour.of( 'background-color-toggle-list-card' ).brighten( 0.4 ),
                    onDark: colour.of( 'background-color-toggle-list-card' ).darken( 0.4 )
                }
            ),
        },
        "logo-text-color-toggle-list": {
            fieldset: "lakeus-theme-designer-toggle-list",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#000000"),
            value: chroma("#000000"),
            calculate: derive.textOn( colour.of( 'background-color-toggle-list-card' ) ),
        },
        "mask-background": {
            fieldset: "lakeus-theme-designer-toggle-list",
            rule: {
                autoCalculate: "manual",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#000000").alpha(0.8),
            value: chroma("#000000").alpha(0.8),
            calculate: derive.manual(),
        },
        "background-color-content": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#ffffff"),
            value: chroma("#ffffff"),
            calculate: derive.inherit( 'color-secondary' ),
        },
        "text-color-content": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#000000"),
            value: chroma("#000000"),
            calculate: derive.textOn( colour.of( 'background-color-content' ) ),
        },
        "background-color-body": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#ffffff"),
            value: chroma("#ffffff"),
            calculate: derive.inherit( 'color-secondary' ),
        },
        "text-color-body": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#000000"),
            value: chroma("#000000"),
            calculate: derive.textOn( colour.of( 'background-color-body' ) ),
        },
        "border-color-content": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#cccccc"),
            value: chroma("#cccccc"),
            calculate: derive.nudge(
                colour.of( 'background-color-content' ),
                colour.of( 'background-color-content' ).flattenOver( colour.of( 'background-color-body' ) ),
                { brightenIfDark: 2, darkenIfLight: 1 }
            ),
        },
        "font-family-action-bar": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "manual",
                generateByDefault: true,
            },
            input: "text",
            default: "var( --lakeus-font-family )",
            value: "var( --lakeus-font-family )",
            calculate: derive.manual(),
        },
        "color-accent-header-tab": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#54595d"),
            value: chroma("#54595d"),
            calculate: derive.inherit( 'color-primary' ),
        },
        "color-accent-header-tab-selected": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#54595d"),
            value: chroma("#54595d"),
            calculate: derive.inherit( 'color-accent-header-tab' ),
        },
        "color-accent-header-tab-new": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#54595d"),
            value: chroma("#54595d"),
            calculate: derive.inherit( 'color-primary' ),
        },
        "border-color-header-tab": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "manual",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#eaecf0"),
            value: chroma("#eaecf0"),
            calculate: derive.manual(),
        },
        "color-tagline": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#000000").alpha(0.7),
            value: chroma("#000000").alpha(0.7),
            calculate: derive.textOn(
            colour.of( 'background-color-body' ),
            { alpha: 0.7 }
            ),
        },
        "font-family-headings": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "manual",
                generateByDefault: true,
            },
            input: "text",
            default: "var( --lakeus-font-family-serif )",
            value: "var( --lakeus-font-family-serif )",
            calculate: derive.manual(),
        },
        "background-color-edit-options": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "manual",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#eeeeee"),
            value: chroma("#eeeeee"),
            calculate: derive.manual(),
        },
        "border-color-edit-options": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "manual",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#c8ccd1"),
            value: chroma("#c8ccd1"),
            calculate: derive.manual(),
        },
        "background-color-toc": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#f8f9fa"),
            value: chroma("#f8f9fa"),
            calculate: derive.nudge(
                colour.of( 'background-color-body' ),
                colour.of( 'background-color-content' ),
                { brightenIfDark: 0.5, darkenIfLight: 0.2 }
            ),
        },
        "border-color-toc": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#a2a9b1"),
            value: chroma("#a2a9b1"),
            calculate: derive.nudge(
                colour.of( 'background-color-toc' ),
                colour.of( 'background-color-content' ),
                { brightenIfDark: 1, darkenIfLight: 1 }
            ),
        },
        "color-toc-number": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#202122"),
            value: chroma("#202122"),
            calculate: derive.textOn(
                colour.of( 'background-color-toc' ).flattenOver( colour.of( 'background-color-content' ) ),
                {
                    onLight: colour.constant( '#000000' ).brighten( 0.2 ),
                    onDark: colour.constant( '#ffffff' ).darken( 0.2 )
                }
            ),
        },
        "border-color-interface-message-box-neutral": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#a2a9b1"),
            value: chroma("#a2a9b1"),
            calculate: derive.alias( 'color-neutral' ),
        },
        "background-color-interface-message-box-neutral": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#eaecf0"),
            value: chroma("#eaecf0"),
            calculate: derive.textOn(
                colour.of( 'background-color-content' ).flattenOver( colour.of( 'background-color-body' ) ),
                {
                    onLight: colour.of( 'border-color-interface-message-box-neutral' ).luminance( 0.8 ),
                    onDark: colour.of( 'border-color-interface-message-box-neutral' ).luminance( 0.1 )
                }
            ),
        },
        "text-color-interface-message-box-neutral": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#000000"),
            value: chroma("#000000"),
            calculate: derive.textOn( colour.of( 'background-color-interface-message-box-neutral' ).flattenOver( colour.of( 'background-color-content' ).flattenOver() ) ),
        },
        "border-color-interface-message-box-warning": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#ffcc33"),
            value: chroma("#ffcc33"),
            calculate: derive.alias( 'color-warning' ),
        },
        "background-color-interface-message-box-warning": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#fef6e7"),
            value: chroma("#fef6e7"),
            calculate: derive.textOn(
                colour.of( 'background-color-content' ).flattenOver( colour.of( 'background-color-body' ) ),
                {
                    onLight: colour.of( 'border-color-interface-message-box-warning' ).luminance( 0.8 ),
                    onDark: colour.of( 'border-color-interface-message-box-warning' ).luminance( 0.1 )
                }
            ),
        },
        "text-color-interface-message-box-warning": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#000000"),
            value: chroma("#000000"),
            calculate: derive.textOn( colour.of( 'background-color-interface-message-box-warning' ).flattenOver( colour.of( 'background-color-content' ).flattenOver() ) ),
        },
        "border-color-interface-message-box-error": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#dd3333"),
            value: chroma("#dd3333"),
            calculate: derive.alias( 'color-error' ),
        },
        "background-color-interface-message-box-error": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#fee7e6"),
            value: chroma("#fee7e6"),
            calculate: derive.textOn(
                colour.of( 'background-color-content' ).flattenOver( colour.of( 'background-color-body' ) ),
                {
                    onLight: colour.of( 'border-color-interface-message-box-error' ).luminance( 0.8 ),
                    onDark: colour.of( 'border-color-interface-message-box-error' ).luminance( 0.1 )
                }
            ),
        },
        "text-color-interface-message-box-error": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#000000"),
            value: chroma("#000000"),
            calculate: derive.textOn( colour.of( 'background-color-interface-message-box-error' ).flattenOver( colour.of( 'background-color-content' ).flattenOver() ) ),
        },
        "border-color-interface-message-box-success": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#14866d"),
            value: chroma("#14866d"),
            calculate: derive.alias( 'color-success' ),
        },
        "background-color-interface-message-box-success": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#d5fdf4"),
            value: chroma("#d5fdf4"),
            calculate: derive.textOn(
                colour.of( 'background-color-content' ).flattenOver( colour.of( 'background-color-body' ) ),
                {
                    onLight: colour.of( 'border-color-interface-message-box-success' ).luminance( 0.8 ),
                    onDark: colour.of( 'border-color-interface-message-box-success' ).luminance( 0.1 )
                }
            ),
        },
        "text-color-interface-message-box-success": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#000000"),
            value: chroma("#000000"),
            calculate: derive.textOn( colour.of( 'background-color-interface-message-box-success' ).flattenOver( colour.of( 'background-color-content' ).flattenOver() ) ),
        },
        "border-color-user-message": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "manual",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#ffa500"),
            value: chroma("#ffa500"),
            calculate: derive.manual(),
        },
        "background-color-user-message": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#ffce7b"),
            value: chroma("#ffce7b"),
            calculate: derive.textOn(
                colour.of( 'background-color-content' ).flattenOver( colour.of( 'background-color-body' ) ),
                {
                    onLight: colour.of( 'border-color-user-message' ).luminance( 0.8 ),
                    onDark: colour.of( 'border-color-user-message' ).luminance( 0.1 )
                }
            ),
        },
        "text-color-user-message": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#000000"),
            value: chroma("#000000"),
            calculate: derive.textOn( colour.of( 'background-color-user-message' ).flattenOver( colour.of( 'background-color-content' ).flattenOver() ) ),
        },
        "background-color-wikitable": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#f8f9fa"),
            value: chroma("#f8f9fa"),
            calculate: derive.nudge(
                colour.of( 'background-color-content' ).flattenOver( colour.of( 'background-color-body' ).flattenOver() ),
                colour.of( 'background-color-content' ).flattenOver( colour.of( 'background-color-body' ).flattenOver() ),
                { brightenIfDark: 0.1, darkenIfLight: 0.1 }
            ),
        },
        "text-color-wikitable": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#202122"),
            value: chroma("#202122"),
            calculate: derive.textOn(
                colour.of( 'background-color-wikitable' ).flattenOver( colour.of( 'background-color-content' ).flattenOver( colour.of( 'background-color-body' ) ) ),
                {
                    onLight: colour.constant( '#000000' ).brighten( 0.05 ),
                    onDark: colour.constant( '#ffffff' ).darken( 0.05 )
                }
            ),
        },
        "border-color-wikitable": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#a2a9b1"),
            value: chroma("#a2a9b1"),
            calculate: derive.nudge(
                colour.of( 'background-color-wikitable' ),
                colour.of( 'background-color-content' ).flattenOver( colour.of( 'background-color-body' ) ),
                { brightenIfDark: 1, darkenIfLight: 1.5 }
            ),
        },
        "background-color-wikitable-table-head": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#eaecf0"),
            value: chroma("#eaecf0"),
            calculate: derive.nudge(
                colour.of( 'background-color-wikitable' ),
                colour.of( 'background-color-content' ).flattenOver( colour.of( 'background-color-body' ) ),
                { brightenIfDark: 1, darkenIfLight: 0.2 }
            ),
        },
        "background-color-portlet-body": {
            fieldset: "lakeus-theme-designer-portlet",
            rule: {
                autoCalculate: "manual",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#ffffff"),
            value: chroma("#ffffff"),
            calculate: derive.manual(),
        },
        "text-color-portlet-item": {
            fieldset: "lakeus-theme-designer-portlet",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#1c1c1c"),
            value: chroma("#1c1c1c"),
            calculate: derive.textOn( colour.of( 'background-color-portlet-body' ) ),
        },
        "background-color-portlet-item-hover": {
            fieldset: "lakeus-theme-designer-portlet",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#000000").alpha(0.1),
            value: chroma("#000000").alpha(0.1),
            calculate: derive.fade( 'color-primary', 0.1 ),
        },
        "text-color-portlet-item-hover": {
            fieldset: "lakeus-theme-designer-portlet",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#3a3a3a"),
            value: chroma("#3a3a3a"),
            calculate: derive.inherit( 'color-primary' ),
        },
        "background-color-portlet-item-focus": {
            fieldset: "lakeus-theme-designer-portlet",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#000000").alpha(0.2),
            value: chroma("#000000").alpha(0.2),
            calculate: derive.nudge(
                colour.of( 'background-color-portlet-item-hover' ),
                colour.pickFor( colour.of( 'background-color-portlet-body' ) ),
                { brightenIfDark: 0.2, darkenIfLight: 0.2 }
            ),
        },
        "text-color-portlet-item-focus": {
            fieldset: "lakeus-theme-designer-portlet",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#3a3a3a"),
            value: chroma("#3a3a3a"),
            calculate: derive.inherit( 'text-color-portlet-item-hover' ),
        },
        "border-color-portlet-body": {
            fieldset: "lakeus-theme-designer-portlet",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#a2a9b1"),
            value: chroma("#a2a9b1"),
            calculate: derive.nudge(
                colour.of( 'background-color-portlet-body' ),
                colour.pickFor( colour.of( 'background-color-content' ) ),
                { brightenIfDark: 1, darkenIfLight: 1 }
            ),
        },
        "box-shadow-portlet-body": {
            fieldset: "lakeus-theme-designer-portlet",
            rule: {
                autoCalculate: "manual",
                generateByDefault: true,
            },
            input: "text",
            default: "0 5px 17px 0 var( --lakeus-box-shadow-color-portlet-body )",
            value: "0 5px 17px 0 var( --lakeus-box-shadow-color-portlet-body )",
            calculate: derive.manual(),
        },
        "box-shadow-color-portlet-body": {
            fieldset: "lakeus-theme-designer-portlet",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#000000").alpha(0.24),
            value: chroma("#000000").alpha(0.24),
            calculate: derive.nudge(
                colour.of( 'background-color-portlet-body' ),
                colour.pickFor( colour.of( 'background-color-content' ) ),
                { brightenIfDark: 1, darkenIfLight: 1 }
            ),
        },
        "background-color-footer": {
            fieldset: "lakeus-theme-designer-footer",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#eeeeee"),
            value: chroma("#eeeeee"),
            calculate: derive.nudge(
                colour.of( 'background-color-body' ),
                colour.of( 'background-color-body' ),
                { brightenIfDark: 0.4, darkenIfLight: 0.4 }
            ),
        },
        "text-color-footer": {
            fieldset: "lakeus-theme-designer-footer",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#000000"),
            value: chroma("#000000"),
            calculate: derive.textOn( colour.of( 'background-color-footer' ).flattenOver( colour.of( 'background-color-body' ) ) ),
        },
        "color-footer-link": {
            fieldset: "lakeus-theme-designer-footer",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#0645ad"),
            value: chroma("#0645ad"),
            calculate: derive.alias( 'color-link' ),
        },
        "color-footer-link--visited": {
            fieldset: "lakeus-theme-designer-footer",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#0b0080"),
            value: chroma("#0b0080"),
            calculate: derive.nudge(
                colour.of( 'color-footer-link' ),
                colour.of( 'background-color-footer' ).flattenOver( colour.of( 'background-color-body' ) ),
                { brightenIfDark: 1, darkenIfLight: 1 }
            ),
        },
        "color-footer-link--active": {
            fieldset: "lakeus-theme-designer-footer",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#faa700"),
            value: chroma("#faa700"),
            calculate: derive.brighten( 'color-footer-link', 1 ),
        },
        "background-color-toc-button": {
            fieldset: "lakeus-theme-designer-sticky-toc",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: false,
            skipped: false,
            default: chroma("#ffffff"),
            value: chroma("#ffffff"),
            calculate: derive.inherit( 'color-secondary' ),
        },
        "border-color-toc-button": {
            fieldset: "lakeus-theme-designer-sticky-toc",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#000000").alpha(0.24),
            value: chroma("#000000").alpha(0.24),
            calculate: derive.nudge(
                colour.of( 'background-color-toc-button' ),
                colour.pickFor( colour.of( 'background-color-content' ) ),
                { brightenIfDark: 1, darkenIfLight: 1 }
            ),
        },
        "icon-filter-toc-button": {
            fieldset: "lakeus-theme-designer-sticky-toc",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "text",
            default: "unset",
            value: "unset",
            calculate: derive.textOn(
                colour.of( 'background-color-toc-button' ),
                {
                    onLight: colour.text( "unset" ),
                    onDark: colour.text( "invert(1) hue-rotate(180deg)" )
                }
            ),
        },
        "text-color-sticky-toc-number": {
            fieldset: "lakeus-theme-designer-sticky-toc",
            rule: {
                autoCalculate: "calculateWhenNotNeeded",
                generateByDefault: true,
            },
            input: "color",
            allowAlpha: true,
            skipped: false,
            default: chroma("#000000").alpha(0.7),
            value: chroma("#000000").alpha(0.7),
            calculate: derive.fade( 'text-color-portlet-item', 0.7 ),
        },
    };
};

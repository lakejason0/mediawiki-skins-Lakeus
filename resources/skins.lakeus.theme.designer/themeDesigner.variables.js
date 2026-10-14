/**
 * The Theme Designer's variable table.
 *
 * One entry per CSS custom property the skin exposes as a `--<name>-light` /
 * `--<name>-dark` pair. Each entry describes how the variable is presented
 * (`fieldset`, `input`, `allowAlpha`), how it behaves (`rule.autoCalculate`,
 * `rule.generateByDefault`) and, for derived variables, the `calculate()` rule
 * that produces its value from other variables.
 *
 * Split out of themeDesigner.js, which had grown past 2000 lines of one closure,
 * so the table can be read and reviewed on its own. The values here are the
 * designer's *light* defaults; dark defaults are read from the skin's own
 * `--<name>-dark` at runtime - see Lakeus.initColorSchemes().
 *
 * @param {Object} Lakeus The shared namespace, so calculate() rules can read
 *   other variables through `Lakeus.variablesList`.
 * @param {Function} chroma The vendored chroma.js factory.
 * @return {Object} Map of variable name to entry.
 */
module.exports = function ( Lakeus, chroma ) {
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
            calculate: function (i) {
                return i;
            },
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
            calculate: function (i) {
                return i;
            },
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
            calculate: function (i) {
                return i;
            },
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
            calculate: function (i) {
                return i;
            },
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
            calculate: function (i) {
                return i;
            },
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
            calculate: function (i) {
                return i;
            },
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
            calculate: function (i) {
                return i;
            },
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
            calculateFrom: [
                "color-primary",
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value || this.default;
            },
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
            calculateFrom: [
                "color-secondary",
            ],
            calculate: function (i) {
                return i || Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[0]].value.hex('rgb'), Lakeus.variablesList[this.calculateFrom[0]].value.darken(0.1), Lakeus.variablesList[this.calculateFrom[0]].value.brighten(0.1));
            },
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
            calculateFrom: [
                "color-secondary",
            ],
            calculate: function (i) {
                return i || Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[0]].value.hex('rgb'), Lakeus.variablesList[this.calculateFrom[0]].value.darken(1), Lakeus.variablesList[this.calculateFrom[0]].value.brighten(1.5));
            },
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
            calculate: function (i) {
                return i;
            },
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
            calculate: function (i) {
                return i;
            },
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
            calculate: function (i) {
                return i;
            },
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
            calculateFrom: [
                "color-secondary",
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value || this.default;
            },
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
            calculateFrom: [
                "color-link",
                "background-color-content",
                "background-color-body",
            ],
            calculate: function (i) {
                return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[1]].value, Lakeus.variablesList[this.calculateFrom[2]].value), 1, 1);
            },
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
            calculateFrom: [
                "color-link",
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value.brighten(1);
            },
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
            calculateFrom: [
                "color-primary",
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value.set('hsl.h', '+180') || this.default;
            },
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
            calculateFrom: [
                "color-link-new",
                "background-color-content",
                "background-color-body",
            ],
            calculate: function (i) {
                return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[1]].value, Lakeus.variablesList[this.calculateFrom[2]].value), 1, 1);
            },
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
            calculateFrom: [
                "color-link-new",
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value.brighten(1);
            },
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
            calculateFrom: [
                "color-link",
                "background-color-content",
                "background-color-body",
            ],
            calculate: function (i) {
                return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[1]].value, Lakeus.variablesList[this.calculateFrom[2]].value), 0.2, 0.2);
            },
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
            calculateFrom: [
                "color-link-external",
                "background-color-content",
                "background-color-body",
            ],
            calculate: function (i) {
                return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[1]].value, Lakeus.variablesList[this.calculateFrom[2]].value), 1, 1);
            },
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
            calculateFrom: [
                "color-link-external",
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value.brighten(1);
            },
        },
        "header-elevation": {
            fieldset: "lakeus-theme-designer-page-header",
            rule: {
                autoCalculate: "manual",
                generateByDefault: true,
            },
            input: "text",
            default: "var(--elevation)",
            value: "var(--elevation)",
            calculate: function (i) {
                return i;
            },
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
            calculateFrom: [
                "color-header",
                "background-color-body"
            ],
            calculate: function (i) {
                return i || chroma(Lakeus.getContrastYIQ(Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.variablesList[this.calculateFrom[1]].value).hex('rgb')));
            },
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
            calculateFrom: [
                "color-header",
                "background-color-body"
            ],
            calculate: function (i) {
                return i || Lakeus.getContrastYIQ(Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.variablesList[this.calculateFrom[1]].value).hex('rgb'), "unset", "invert(1) hue-rotate(180deg)");
            }
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
            calculateFrom: [
                "color-secondary",
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value || this.default;
            },
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
            calculateFrom: [
                "background-color-search-suggestions",
                "color-header",
                "background-color-body",
            ],
            calculate: function (i) {
                return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[1]].value, Lakeus.variablesList[this.calculateFrom[2]].value), 2, 2);
            },
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
            calculateFrom: [
                "color-primary",
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value || this.default;
            },
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
            calculateFrom: [
                "background-color-search-suggestions"
            ],
            calculate: function (i) {
                return i || chroma(Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[0]].value.hex('rgb')));
            },
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
            calculateFrom: [
                "background-color-search-suggestions-current"
            ],
            calculate: function (i) {
                return i || chroma(Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[0]].value.hex('rgb')));
            },
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
            calculateFrom: [
                "color-secondary",
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value || this.default;
            },
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
            calculateFrom: [
                "background-color-search-input",
                "color-header",
                "background-color-body"
            ],
            calculate: function (i) {
                return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[1]].value, Lakeus.variablesList[this.calculateFrom[2]].value), 2, 2);
            },
        },
        "box-shadow-search-input": {
            fieldset: "lakeus-theme-designer-page-header",
            rule: {
                autoCalculate: "manual",
                generateByDefault: true,
            },
            input: "text",
            default: "0 1px 1px var(--box-shadow-color-search-input)",
            value: "0 1px 1px var(--box-shadow-color-search-input)",
            calculate: function (i) {
                return i;
            },
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
            calculateFrom: [
                "background-color-search-input",
                "color-header",
                "background-color-body"
            ],
            calculate: function (i) {
                return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[1]].value, Lakeus.variablesList[this.calculateFrom[2]].value), 2, 2);
            },
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
            calculateFrom: [
                "color-secondary",
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value || this.default;
            },
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
            calculateFrom: [
                "color-primary",
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value || this.default;
            },
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
            calculateFrom: [
                "background-color-toggle-list",
            ],
            calculate: function (i) {
                return i || chroma(Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[0]].value.hex('rgb')));
            },
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
            calculateFrom: [
                "color-primary",
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value.alpha(0.1) || this.default;
            },
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
            calculateFrom: [
                "color-primary",
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value || this.default;
            },
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
            calculateFrom: [
                "background-color-toggle-list-item-hover",
                "background-color-toggle-list",
            ],
            calculate: function (i) {
                return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.variablesList[this.calculateFrom[1]].value, 0.2, 0.2).alpha(0.2);
            },
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
            calculateFrom: [
                "text-color-toggle-list-item-hover",
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value || this.default;
            },
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
            calculateFrom: [
                "background-color-toggle-list",
                "background-color-toggle-list",
            ],
            calculate: function (i) {
                return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.variablesList[this.calculateFrom[1]].value, 2, 2);
            },
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
            calculateFrom: [
                "background-color-toggle-list-card"
            ],
            calculate: function (i) {
                return i || chroma(Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[0]].value.hex('rgb'), Lakeus.variablesList[this.calculateFrom[0]].value.brighten(0.4), Lakeus.variablesList[this.calculateFrom[0]].value.darken(0.4)));
            },
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
            calculateFrom: [
                "background-color-toggle-list-card"
            ],
            calculate: function (i) {
                return i || chroma(Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[0]].value.hex('rgb')));
            },
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
            calculate: function (i) {
                return i;
            },
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
            calculateFrom: [
                "color-secondary",
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value || this.default;
            },
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
            calculateFrom: [
                "background-color-content"
            ],
            calculate: function (i) {
                return i || chroma(Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[0]].value.hex('rgb')));
            },
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
            calculateFrom: [
                "color-secondary",
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value || this.default;
            },
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
            calculateFrom: [
                "background-color-body"
            ],
            calculate: function (i) {
                return i || chroma(Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[0]].value.hex('rgb')));
            },
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
            calculateFrom: [
                "background-color-content",
                "background-color-content",
                "background-color-body"
            ],
            calculate: function (i) {
                return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[1]].value, Lakeus.variablesList[this.calculateFrom[2]].value), 2, 1);
            },
        },
        "font-family-action-bar": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "manual",
                generateByDefault: true,
            },
            input: "text",
            default: "var(--font-family)",
            value: "var(--font-family)",
            calculate: function (i) {
                return i;
            },
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
            calculateFrom: [
                "color-primary",
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value || this.default;
            },
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
            calculateFrom: [
                "color-accent-header-tab"
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value || this.default;
            },
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
            calculateFrom: [
                "color-primary",
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value || this.default;
            },
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
            calculate: function (i) {
                return i;
            },
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
            calculateFrom: [
                "background-color-body"
            ],
            calculate: function (i) {
                return i || chroma(Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[0]].value.hex('rgb'))).alpha(0.7);
            },
        },
        "font-family-headings": {
            fieldset: "lakeus-theme-designer-body",
            rule: {
                autoCalculate: "manual",
                generateByDefault: true,
            },
            input: "text",
            default: "var(--font-family-serif)",
            value: "var(--font-family-serif)",
            calculate: function (i) {
                return i;
            },
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
            calculate: function (i) {
                return i;
            },
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
            calculate: function (i) {
                return i;
            },
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
            calculateFrom: [
                "background-color-body",
                "background-color-content",
            ],
            calculate: function (i) {
                return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.variablesList[this.calculateFrom[1]].value, 0.5, 0.2);
            },
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
            calculateFrom: [
                "background-color-toc",
                "background-color-content",
            ],
            calculate: function (i) {
                return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.variablesList[this.calculateFrom[1]].value, 1, 1);
            },
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
            calculateFrom: [
                "background-color-toc",
                "background-color-content",
            ],
            calculate: function (i) {
                return i || Lakeus.getContrastYIQ(Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.variablesList[this.calculateFrom[1]].value).hex('rgb'), chroma("#000000").brighten(0.2), chroma("#ffffff").darken(0.2));
            },
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
            calculateFrom: [
                "color-neutral",
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value;
            },
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
            calculateFrom: [
                "border-color-interface-message-box-neutral",
                "background-color-content",
                "background-color-body"
            ],
            calculate: function (i) {
                return i || Lakeus.getContrastYIQ(Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[1]].value, Lakeus.variablesList[this.calculateFrom[2]].value).hex('rgb'), Lakeus.variablesList[this.calculateFrom[0]].value.luminance(0.8), Lakeus.variablesList[this.calculateFrom[0]].value.luminance(0.1));
            },
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
            calculateFrom: [
                "background-color-interface-message-box-neutral",
                "background-color-content",
                "background-color-body",
            ],
            calculate: function (i) {
                return i || chroma(Lakeus.getContrastYIQ(Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[1]].value), Lakeus.variablesList[this.calculateFrom[2]].value).hex('rgb')));
            },
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
            calculateFrom: [
                "color-warning",
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value;
            },
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
            calculateFrom: [
                "border-color-interface-message-box-warning",
                "background-color-content",
                "background-color-body"
            ],
            calculate: function (i) {
                return i || Lakeus.getContrastYIQ(Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[1]].value, Lakeus.variablesList[this.calculateFrom[2]].value).hex('rgb'), Lakeus.variablesList[this.calculateFrom[0]].value.luminance(0.8), Lakeus.variablesList[this.calculateFrom[0]].value.luminance(0.1));
            },
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
            calculateFrom: [
                "background-color-interface-message-box-warning",
                "background-color-content",
                "background-color-body",
            ],
            calculate: function (i) {
                return i || chroma(Lakeus.getContrastYIQ(Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[1]].value), Lakeus.variablesList[this.calculateFrom[2]].value).hex('rgb')));
            },
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
            calculateFrom: [
                "color-error",
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value;
            },
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
            calculateFrom: [
                "border-color-interface-message-box-error",
                "background-color-content",
                "background-color-body"
            ],
            calculate: function (i) {
                return i || Lakeus.getContrastYIQ(Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[1]].value, Lakeus.variablesList[this.calculateFrom[2]].value).hex('rgb'), Lakeus.variablesList[this.calculateFrom[0]].value.luminance(0.8), Lakeus.variablesList[this.calculateFrom[0]].value.luminance(0.1));
            },
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
            calculateFrom: [
                "background-color-interface-message-box-error",
                "background-color-content",
                "background-color-body",
            ],
            calculate: function (i) {
                return i || chroma(Lakeus.getContrastYIQ(Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[1]].value), Lakeus.variablesList[this.calculateFrom[2]].value).hex('rgb')));
            },
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
            calculateFrom: [
                "color-success",
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value;
            },
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
            calculateFrom: [
                "border-color-interface-message-box-success",
                "background-color-content",
                "background-color-body"
            ],
            calculate: function (i) {
                return i || Lakeus.getContrastYIQ(Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[1]].value, Lakeus.variablesList[this.calculateFrom[2]].value).hex('rgb'), Lakeus.variablesList[this.calculateFrom[0]].value.luminance(0.8), Lakeus.variablesList[this.calculateFrom[0]].value.luminance(0.1));
            },
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
            calculateFrom: [
                "background-color-interface-message-box-success",
                "background-color-content",
                "background-color-body",
            ],
            calculate: function (i) {
                return i || chroma(Lakeus.getContrastYIQ(Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[1]].value), Lakeus.variablesList[this.calculateFrom[2]].value).hex('rgb')));
            },
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
            calculate: function (i) {
                return i;
            },
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
            calculateFrom: [
                "border-color-user-message",
                "background-color-content",
                "background-color-body"
            ],
            calculate: function (i) {
                return i || Lakeus.getContrastYIQ(Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[1]].value, Lakeus.variablesList[this.calculateFrom[2]].value).hex('rgb'), Lakeus.variablesList[this.calculateFrom[0]].value.luminance(0.8), Lakeus.variablesList[this.calculateFrom[0]].value.luminance(0.1));
            },
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
            calculateFrom: [
                "background-color-user-message",
                "background-color-content",
                "background-color-body",
            ],
            calculate: function (i) {
                return i || chroma(Lakeus.getContrastYIQ(Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[1]].value), Lakeus.variablesList[this.calculateFrom[2]].value).hex('rgb')));
            },
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
            calculateFrom: [
                "background-color-content",
                "background-color-body",
            ],
            calculate: function (i) {
                return i || Lakeus.changeColorBrightnessByContrast(Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[1]].value)), Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[1]].value)), 0.1, 0.1);
            },
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
            calculateFrom: [
                "background-color-wikitable",
                "background-color-content",
                "background-color-body",
            ],
            calculate: function (i) {
                return i || Lakeus.getContrastYIQ(Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[1]].value, Lakeus.variablesList[this.calculateFrom[2]].value)).hex('rgb'), chroma("#000000").brighten(0.05), chroma("#ffffff").darken(0.05));
            },
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
            calculateFrom: [
                "background-color-wikitable",
                "background-color-content",
                "background-color-body",
            ],
            calculate: function (i) {
                return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[1]].value, Lakeus.variablesList[this.calculateFrom[2]].value), 1, 1.5);
            },
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
            calculateFrom: [
                "background-color-wikitable",
                "background-color-content",
                "background-color-body",
            ],
            calculate: function (i) {
                return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[1]].value, Lakeus.variablesList[this.calculateFrom[2]].value), 1, 0.2);
            },
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
            calculate: function (i) {
                return i;
            },
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
            calculateFrom: [
                "background-color-portlet-body",
            ],
            calculate: function (i) {
                return i || chroma(Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[0]].value.hex('rgb')));
            },
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
            calculateFrom: [
                "color-primary",
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value.alpha(0.1) || this.default;
            },
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
            calculateFrom: [
                "color-primary",
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value || this.default;
            },
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
            calculateFrom: [
                "background-color-portlet-item-hover",
                "background-color-portlet-body"
            ],
            calculate: function (i) {
                return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, chroma(Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[1]].value.hex('rgb'))), 0.2, 0.2);
            },
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
            calculateFrom: [
                "text-color-portlet-item-hover",
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value || this.default;
            },
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
            calculateFrom: [
                "background-color-portlet-body",
                "background-color-content"
            ],
            calculate: function (i) {
                return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, chroma(Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[1]].value.hex('rgb'))), 1, 1);
            },
        },
        "box-shadow-portlet-body": {
            fieldset: "lakeus-theme-designer-portlet",
            rule: {
                autoCalculate: "manual",
                generateByDefault: true,
            },
            input: "text",
            default: "0 5px 17px 0 var(--box-shadow-color-portlet-body)",
            value: "0 5px 17px 0 var(--box-shadow-color-portlet-body)",
            calculate: function (i) {
                return i;
            },
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
            calculateFrom: [
                "background-color-portlet-body",
                "background-color-content"
            ],
            calculate: function (i) {
                return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, chroma(Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[1]].value.hex('rgb'))), 1, 1);
            },
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
            calculateFrom: [
                "background-color-body",
            ],
            calculate: function (i) {
                return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.variablesList[this.calculateFrom[0]].value, 0.4, 0.4);
            }
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
            calculateFrom: [
                "background-color-footer",
                "background-color-body",
            ],
            calculate: function (i) {
                return i || chroma(Lakeus.getContrastYIQ(Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.variablesList[this.calculateFrom[1]].value).hex('rgb')));
            },
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
            calculateFrom: [
                "color-link",
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value;
            },
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
            calculateFrom: [
                "color-footer-link",
                "background-color-footer",
                "background-color-body",
            ],
            calculate: function (i) {
                return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.calculateRGBAActualValue(Lakeus.variablesList[this.calculateFrom[1]].value, Lakeus.variablesList[this.calculateFrom[2]].value), 1, 1);
            },
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
            calculateFrom: [
                "color-footer-link",
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value.brighten(1);
            },
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
            calculateFrom: [
                "color-secondary",
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value || this.default;
            },
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
            calculateFrom: [
                "background-color-toc-button",
                "background-color-content"
            ],
            calculate: function (i) {
                return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, chroma(Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[1]].value.hex('rgb'))), 1, 1);
            },
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
            calculateFrom: [
                "background-color-toc-button"
            ],
            calculate: function (i) {
                return i || Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[0]].value.hex('rgb'), "unset", "invert(1) hue-rotate(180deg)");
            }
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
            calculateFrom: [
                "text-color-portlet-item"
            ],
            calculate: function (i) {
                return i || Lakeus.variablesList[this.calculateFrom[0]].value.alpha(0.7);
            },
        },
    };
};

window.Lakeus = window.Lakeus || {};

/*
    TODO List:
    1. ~~ Use chroma("color") in Lakeus.variablesList for default and value ~~;
    2. Use function.prototype.bind to replace each calculate property in Lakeus.variablesList;
    3. Remove deprecated functions and their calls;
    4. ~~ Add a "reset" button to the form; ~~
    5. ~~ Implement Alpha channel next to the color input; ~~
        5.1. ~~ This also requires to implement a field in the variables list for the alpha channel; ~~
    6. Test it out.
*/

Lakeus.initThemeDesigner = function () {

    console.log("[Lakeus] Theme Designer is loading...");
    $.when(mw.loader.using(['mediawiki.api', 'mediawiki.jqueryMsg']), $.ready).then(function () {
        return new mw.Api().loadMessagesIfMissing([
            "lakeus-theme-designer",
            "lakeus-theme-designer-system-messages-loaded",
            "lakeus-theme-designer-all-loaded",
            "lakeus-theme-designer-auto-calculate",
            "lakeus-theme-designer-copy-theme",
            "lakeus-theme-designer-paste-theme",
            "lakeus-theme-designer-test-theme",
            "lakeus-theme-designer-clear-theme",
            "lakeus-theme-designer-reset-theme",
            "lakeus-theme-designer-copied",
            "lakeus-theme-designer-copy-failed",
            "lakeus-theme-designer-reload",
            "lakeus-theme-designer-alpha-channel",
            "lakeus-theme-designer-global",
            "lakeus-theme-designer-background-color-base",
            "lakeus-theme-designer-color-link",
            "lakeus-theme-designer-color-link--visited",
            "lakeus-theme-designer-elevation",
            "lakeus-theme-designer-font-family",
            "lakeus-theme-designer-font-family-serif",
            "lakeus-theme-designer-page-header",
            "lakeus-theme-designer-color-header",
            "lakeus-theme-designer-background-color-search-suggestions",
            "lakeus-theme-designer-border-color-search-suggestions",
            "lakeus-theme-designer-color-search-suggestions-text",
            "lakeus-theme-designer-background-color-search-suggestions-current",
            "lakeus-theme-designer-color-search-suggestions-text-current",
            "lakeus-theme-designer-background-color-search-input",
            "lakeus-theme-designer-border-color-search-bar",
            "lakeus-theme-designer-toggle-list",
            "lakeus-theme-designer-background-color-toggle-list",
            "lakeus-theme-designer-background-color-toggle-list-card",
            "lakeus-theme-designer-logo-text-color-toggle-list",
            "lakeus-theme-designer-background-color-toggle-list-item-hover",
            "lakeus-theme-designer-background-color-toggle-list-item-focus",
            "lakeus-theme-designer-border-color-toggle-list",
            "lakeus-theme-designer-subheader-color-toggle-list",
            "lakeus-theme-designer-mask-background",
            "lakeus-theme-designer-body",
            "lakeus-theme-designer-background-color-content",
            "lakeus-theme-designer-background-color-body",
            "lakeus-theme-designer-border-color-content",
            "lakeus-theme-designer-color-accent-header-tab",
            "lakeus-theme-designer-border-color-header-tab",
            "lakeus-theme-designer-color-tagline",
            "lakeus-theme-designer-font-family-headings",
            "lakeus-theme-designer-background-color-edit-options",
            "lakeus-theme-designer-border-color-edit-options",
            "lakeus-theme-designer-portlet",
            "lakeus-theme-designer-background-color-portlet-body",
            "lakeus-theme-designer-background-color-portlet-item-hover",
            "lakeus-theme-designer-background-color-portlet-item-focus",
            "lakeus-theme-designer-border-color-portlet-body",
            "lakeus-theme-designer-footer",
            "lakeus-theme-designer-background-color-footer",
            "lakeus-theme-designer-text-color-toggle-list-item",
            "lakeus-theme-designer-text-color-toggle-list-item-hover",
            "lakeus-theme-designer-text-color-toggle-list-item-focus",
            "lakeus-theme-designer-text-color-content",
            "lakeus-theme-designer-text-color-header",
            "lakeus-theme-designer-text-color-body",
            "lakeus-theme-designer-color-accent-header-tab-selected",
            "lakeus-theme-designer-color-accent-header-tab-new",
            "lakeus-theme-designer-danger-zone"
        ]);
    }).then(function () {
        console.log("[Lakeus] " + mw.message('lakeus-theme-designer-system-messages-loaded'));
        $.getScript("https://cdn.jsdelivr.net/npm/chroma-js@2.1.2/chroma.min.js", function () {

            /* Deprecated; use chroma(color).darken and chroma(color).brighten */
            Lakeus.calculateColorByLuminance = function (hex, lum) {
                // validate hex string
                hex = String(hex).replace(/[^0-9a-f]/gi, '');
                if (hex.length < 6) {
                    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
                }
                lum = lum || 0;

                // convert to decimal and change luminosity
                var rgb = "#", c, i;
                for (i = 0; i < 3; i++) {
                    c = parseInt(hex.substr(i * 2, 2), 16);
                    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
                    rgb += ("00" + c).substr(c.length);
                }

                return rgb;
            }

            /* Leaving it as-is since 50% contrast method works differently */
            Lakeus.getContrastYIQ = function (hexcolor, black, white) {
                hexcolor = hexcolor.replace("#", "");
                var r = parseInt(hexcolor.substr(0, 2), 16);
                var g = parseInt(hexcolor.substr(2, 2), 16);
                var b = parseInt(hexcolor.substr(4, 2), 16);
                var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
                return (yiq >= 128) ? (black ? black : '#000000') : (white ? white : '#ffffff');
            }

            Lakeus.changeColorBrightnessByContrast = function (foregroundColor, backgroundColor, brightenCoefficient, darkenCoefficient) {
                return (Lakeus.getContrastYIQ(backgroundColor.hex(), "black", "white") === "white" ? foregroundColor.brighten(brightenCoefficient) : foregroundColor.darken(darkenCoefficient));
            }

            /* CSS Variables List */
            Lakeus.variablesList = {
                "background-color-base": {
                    fieldset: "lakeus-theme-designer-global",
                    rule: "manual",
                    input: "color",
                    default: chroma("#ffffff"),
                    value: chroma("#ffffff"),
                    calculate: function (i) {
                        return i;
                    },
                },
                "color-link": {
                    fieldset: "lakeus-theme-designer-global",
                    rule: "manual",
                    input: "color",
                    default: chroma("#0645ad"),
                    value: chroma("#0645ad"),
                    calculate: function (i) {
                        return i;
                    },
                },
                "color-link--visited": {
                    fieldset: "lakeus-theme-designer-global",
                    rule: "calculateWhenNotNeeded",
                    input: "color",
                    default: chroma("#0b0080"),
                    value: chroma("#0b0080"),
                    calculateFrom: [
                        "color-link",
                        "background-color-content",
                    ],
                    calculate: function (i) {
                        return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.variablesList[this.calculateFrom[1]].value, 0.2, 0.2);
                    },
                },
                "elevation": {
                    fieldset: "lakeus-theme-designer-global",
                    rule: "manual",
                    input: "text",
                    default: "0 2px 2px rgba( 0, 0, 0, 10% )",
                    value: "0 2px 2px rgba( 0, 0, 0, 10% )",
                    calculate: function (i) {
                        return i;
                    },
                },
                "font-family": {
                    fieldset: "lakeus-theme-designer-global",
                    rule: "manual",
                    input: "text",
                    default: "'Roboto', -apple-system, blinkmacsystemfont, 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Helvetica Neue', sans-serif",
                    value: "'Roboto', -apple-system, blinkmacsystemfont, 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Helvetica Neue', sans-serif",
                    calculate: function (i) {
                        return i;
                    },
                },
                "font-family-serif": {
                    fieldset: "lakeus-theme-designer-global",
                    rule: "manual",
                    input: "text",
                    default: "'Linux Libertine', 'Times New Roman', 'Liberation Serif', 'Nimbus Roman', 'Noto Serif', 'Times', serif",
                    value: "'Linux Libertine', 'Times New Roman', 'Liberation Serif', 'Nimbus Roman', 'Noto Serif', 'Times', serif",
                    calculate: function (i) {
                        return i;
                    },
                },
                "color-header": {
                    fieldset: "lakeus-theme-designer-page-header",
                    rule: "manual",
                    input: "color",
                    default: chroma("#ffffff"),
                    value: chroma("#ffffff"),
                    calculate: function (i) {
                        return i;
                    },
                },
                "text-color-header": {
                    fieldset: "lakeus-theme-designer-page-header",
                    rule: "calculateWhenNotNeeded",
                    input: "color",
                    default: chroma("#000000"),
                    value: chroma("#000000"),
                    calculateFrom: [
                        "color-header"
                    ],
                    calculate: function (i) {
                        return i || chroma(Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[0]].value.hex('rgb')));
                    },
                },
                "background-color-search-suggestions": {
                    fieldset: "lakeus-theme-designer-page-header",
                    rule: "manual",
                    input: "color",
                    default: chroma("#ffffff"),
                    value: chroma("#ffffff"),
                    calculate: function (i) {
                        return i;
                    },
                },
                "border-color-search-suggestions": {
                    fieldset: "lakeus-theme-designer-page-header",
                    rule: "calculateWhenNotNeeded",
                    input: "color",
                    default: chroma("#c8ccd1"),
                    value: chroma("#c8ccd1"),
                    calculateFrom: [
                        "background-color-search-suggestions",
                        "color-header"
                    ],
                    calculate: function (i) {
                        return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.variablesList[this.calculateFrom[1]].value, 0.2, 0.2);
                    },
                },
                "background-color-search-suggestions-current": {
                    fieldset: "lakeus-theme-designer-page-header",
                    rule: "manual",
                    input: "color",
                    default: chroma("#1d5492"),
                    value: chroma("#1d5492"),
                    calculate: function (i) {
                        return i;
                    },
                },
                "color-search-suggestions-text": {
                    fieldset: "lakeus-theme-designer-page-header",
                    rule: "calculateWhenNotNeeded",
                    input: "color",
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
                    rule: "calculateWhenNotNeeded",
                    input: "color",
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
                    rule: "manual",
                    input: "color",
                    default: chroma("#ffffff"),
                    value: chroma("#ffffff"),
                    calculate: function (i) {
                        return i;
                    },
                },
                "border-color-search-bar": {
                    fieldset: "lakeus-theme-designer-page-header",
                    rule: "calculateWhenNotNeeded",
                    input: "color",
                    default: chroma("#eaecf0"),
                    value: chroma("#eaecf0"),
                    calculateFrom: [
                        "background-color-search-input",
                        "color-header",
                    ],
                    calculate: function (i) {
                        return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.variablesList[this.calculateFrom[1]].value, 0.05, 0.05);
                    },
                },
                "background-color-toggle-list": {
                    fieldset: "lakeus-theme-designer-toggle-list",
                    rule: "manual",
                    input: "color",
                    default: chroma("#ffffff"),
                    value: chroma("#ffffff"),
                    calculate: function (i) {
                        return i;
                    },
                },
                "background-color-toggle-list-card": {
                    fieldset: "lakeus-theme-designer-toggle-list",
                    rule: "manual",
                    input: "color",
                    default: chroma("#eeeeee"),
                    value: chroma("#eeeeee"),
                    calculate: function (i) {
                        return i;
                    },
                },
                "text-color-toggle-list-item": {
                    fieldset: "lakeus-theme-designer-toggle-list",
                    rule: "calculateWhenNotNeeded",
                    input: "color",
                    default: chroma("#1c1c1c"),
                    value: chroma("#1c1c1c"),
                    calculateFrom: [
                        "background-color-toggle-list"
                    ],
                    calculate: function (i) {
                        return i || chroma(Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[0]].value.hex('rgb')));
                    },
                },
                "background-color-toggle-list-item-hover": {
                    fieldset: "lakeus-theme-designer-toggle-list",
                    rule: "manual",
                    input: "color",
                    default: chroma("#000000").alpha(0.1),
                    value: chroma("#000000").alpha(0.1),
                    calculate: function (i) {
                        return i;
                    },
                },
                "text-color-toggle-list-item-hover": {
                    fieldset: "lakeus-theme-designer-toggle-list",
                    rule: "calculateWhenNotNeeded",
                    input: "color",
                    default: chroma("#3a3a3a"),
                    value: chroma("#3a3a3a"),
                    calculateFrom: [
                        "background-color-toggle-list-item-hover"
                    ],
                    calculate: function (i) {
                        return i || chroma(Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[0]].value.hex('rgb')));
                    },
                },
                "background-color-toggle-list-item-focus": {
                    fieldset: "lakeus-theme-designer-toggle-list",
                    rule: "calculateWhenNotNeeded",
                    input: "color",
                    default: chroma("#000000").alpha(0.2),
                    value: chroma("#000000").alpha(0.2),
                    calculateFrom: [
                        "background-color-toggle-list-item-hover",
                        "background-color-toggle-list",
                    ],
                    calculate: function (i) {
                        return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.variablesList[this.calculateFrom[1]].value, 0.2, 0.2);
                    },
                },
                "text-color-toggle-list-item-focus": {
                    fieldset: "lakeus-theme-designer-toggle-list",
                    rule: "calculateWhenNotNeeded",
                    input: "color",
                    default: chroma("#3a3a3a"),
                    value: chroma("#3a3a3a"),
                    calculateFrom: [
                        "background-color-toggle-list-item-focus"
                    ],
                    calculate: function (i) {
                        return i || chroma(Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[0]].value.hex('rgb')));
                    },
                },
                "border-color-toggle-list": {
                    fieldset: "lakeus-theme-designer-toggle-list",
                    rule: "calculateWhenNotNeeded",
                    input: "color",
                    default: chroma("#dddddd"),
                    value: chroma("#dddddd"),
                    calculateFrom: [
                        "background-color-toggle-list",
                        "background-color-toggle-list",
                    ],
                    calculate: function (i) {
                        return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.variablesList[this.calculateFrom[1]].value, 0.2, 0.2);
                    },
                },
                "subheader-color-toggle-list": {
                    fieldset: "lakeus-theme-designer-toggle-list",
                    rule: "calculateWhenNotNeeded",
                    input: "color",
                    default: chroma("#909aa1"),
                    value: chroma("#909aa1"),
                    calculateFrom: [
                        "background-color-toggle-list-card"
                    ],
                    calculate: function (i) {
                        return i || chroma(Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[0]].value.hex('rgb'), "#6a6a6a", "#c3c3c3"));
                    },
                },
                "logo-text-color-toggle-list": {
                    fieldset: "lakeus-theme-designer-toggle-list",
                    rule: "calculateWhenNotNeeded",
                    input: "color",
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
                    rule: "manual",
                    input: "color",
                    default: chroma("#000000").alpha(0.8),
                    value: chroma("#000000").alpha(0.8),
                    calculate: function (i) {
                        return i;
                    },
                },
                "background-color-content": {
                    fieldset: "lakeus-theme-designer-body",
                    rule: "manual",
                    input: "color",
                    default: chroma("#ffffff"),
                    value: chroma("#ffffff"),
                    calculate: function (i) {
                        return i;
                    },
                },
                "text-color-content": {
                    fieldset: "lakeus-theme-designer-body",
                    rule: "calculateWhenNotNeeded",
                    input: "color",
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
                    rule: "manual",
                    input: "color",
                    default: chroma("#ffffff"),
                    value: chroma("#ffffff"),
                    calculate: function (i) {
                        return i;
                    },
                },
                "text-color-body": {
                    fieldset: "lakeus-theme-designer-body",
                    rule: "calculateWhenNotNeeded",
                    input: "color",
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
                    rule: "calculateWhenNotNeeded",
                    input: "color",
                    default: chroma("#cccccc"),
                    value: chroma("#cccccc"),
                    calculateFrom: [
                        "background-color-content",
                    ],
                    calculate: function (i) {
                        return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.variablesList[this.calculateFrom[1]].value, 0.4, 0.4);
                    },
                },
                "color-accent-header-tab": {
                    fieldset: "lakeus-theme-designer-body",
                    rule: "manual",
                    input: "color",
                    default: chroma("#54595d"),
                    value: chroma("#54595d"),
                    calculate: function (i) {
                        return i;
                    },
                },
                "color-accent-header-tab-selected": {
                    fieldset: "lakeus-theme-designer-body",
                    rule: "calculateWhenNotNeeded",
                    input: "color",
                    default: chroma("#0b0080"),
                    value: chroma("#0b0080"),
                    calculateFrom: [
                        "color-accent-header-tab",
                        "background-color-content"
                    ],
                    calculate: function (i) {
                        return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[1]].value.hex('rgb'), 0.4, 0.4));
                    },
                },
                "color-accent-header-tab-new": {
                    fieldset: "lakeus-theme-designer-body",
                    rule: "calculateWhenNotNeeded",
                    input: "color",
                    default: chroma("#54595d"),
                    value: chroma("#54595d"),
                    calculateFrom: [
                        "color-accent-header-tab",
                        "background-color-content"
                    ],
                    calculate: function (i) {
                        return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[1]].value.hex('rgb'), 0.4, 0.4));
                    },
                },
                "border-color-header-tab": {
                    fieldset: "lakeus-theme-designer-body",
                    rule: "manual",
                    input: "color",
                    default: chroma("#eaecf0"),
                    value: chroma("#eaecf0"),
                    calculate: function (i) {
                        return i;
                    },
                },
                "color-tagline": {
                    fieldset: "lakeus-theme-designer-body",
                    rule: "manual",
                    input: "color",
                    default: chroma("#54595d"),
                    value: chroma("#54595d"),
                    calculate: function (i) {
                        return i;
                    },
                },
                "font-family-headings": {
                    fieldset: "lakeus-theme-designer-body",
                    rule: "manual",
                    input: "text",
                    default: "var(--font-family-serif)",
                    value: "var(--font-family-serif)",
                    calculate: function (i) {
                        return i;
                    },
                },
                "background-color-edit-options": {
                    fieldset: "lakeus-theme-designer-body",
                    rule: "manual",
                    input: "color",
                    default: chroma("#eeeeee"),
                    value: chroma("#eeeeee"),
                    calculate: function (i) {
                        return i;
                    },
                },
                "border-color-edit-options": {
                    fieldset: "lakeus-theme-designer-body",
                    rule: "manual",
                    input: "color",
                    default: chroma("#c8ccd1"),
                    value: chroma("#c8ccd1"),
                    calculate: function (i) {
                        return i;
                    },
                },
                "background-color-portlet-body": {
                    fieldset: "lakeus-theme-designer-portlet",
                    rule: "manual",
                    input: "color",
                    default: chroma("#ffffff"),
                    value: chroma("#ffffff"),
                    calculate: function (i) {
                        return i;
                    },
                },
                "background-color-portlet-item-hover": {
                    fieldset: "lakeus-theme-designer-portlet",
                    rule: "manual",
                    input: "color",
                    default: chroma("#000000").alpha(0.1),
                    value: chroma("#000000").alpha(0.1),
                    calculate: function (i) {
                        return i;
                    },
                },
                "background-color-portlet-item-focus": {
                    fieldset: "lakeus-theme-designer-portlet",
                    rule: "calculateWhenNotNeeded",
                    input: "color",
                    default: chroma("#000000").alpha(0.2),
                    value: chroma("#000000").alpha(0.2),
                    calculateFrom: [
                        "background-color-portlet-item-hover",
                        "background-color-portlet"
                    ],
                    calculate: function (i) {
                        return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[1]].value.hex('rgb'), 0.2, 0.2));
                    },
                },
                "border-color-portlet-body": {
                    fieldset: "lakeus-theme-designer-portlet",
                    rule: "calculateWhenNotNeeded",
                    input: "color",
                    default: chroma("#a2a9b1"),
                    value: chroma("#a2a9b1"),
                    calculateFrom: [
                        "background-color-portlet-body",
                        "background-color-content"
                    ],
                    calculate: function (i) {
                        return i || Lakeus.changeColorBrightnessByContrast(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[1]].value.hex('rgb'), 0.2, 0.2));
                    },
                },
                "background-color-footer": {
                    fieldset: "lakeus-theme-designer-footer",
                    rule: "manual",
                    input: "color",
                    default: chroma("#eeeeee"),
                    value: chroma("#eeeeee"),
                    calculate: function (i) {
                        return i;
                    }
                }
            };

            function constructThemeDesignerBody() {
                var fieldsetList = [];
                var result = '';
                $.each(Lakeus.variablesList, function (k, v) {
                    console.log(v);
                    if (!(fieldsetList.includes(v.fieldset))) {
                        fieldsetList.push(v.fieldset);
                    }
                })
                for (fieldset of fieldsetList) {
                    var fieldsetElement = '<fieldset class="lakeus-theme-designer-fieldset" id="lakeus-theme-designer-fieldset-' + fieldset + '">';
                    var legendElement = '<legend class="lakeus-theme-designer-title">' + mw.message(fieldset) + '</legend>';
                    var settingsElement = '';
                    $.each(Lakeus.variablesList, function (k, v) {
                        if (v.fieldset === fieldset) {
                            settingsElement += constructVariableItem(k, v);
                        }
                    });
                    fieldsetElement += legendElement + settingsElement + '</fieldset>';
                    result += fieldsetElement;
                }
                return result;
            }

            function constructVariableItem(variableName, variableContent) {
                var settingElement = '<p class="lakeus-theme-designer-variable-section" id="lakeus-theme-designer-variable-section-' + variableName + '">';
                if (variableContent.input === 'color') {
                    settingElement +=
                        '<label>' +
                            mw.message('lakeus-theme-designer-' + variableName) +
                            '<input type="color" name="' + variableName + '" id="lakeus-theme-designer-input-' + variableName + '" value="' + variableContent.default.hex('rgb') + '" />' +
                            '<input type="number" placeholder="' + mw.message("") + '" class="lakeus-theme-designer-input-alpha" step="0.01" min="0" max="1" name="' + variableName + '-alpha" id="lakeus-theme-designer-input-' + variableName + '-alpha" value="' + variableContent.default.alpha() + '" />' +
                        '</label>';
                } else if (variableContent.input === 'text') {
                    settingElement +=
                        '<label>' +
                            mw.message('lakeus-theme-designer-' + variableName) +
                            '<input type="text" name="' + variableName + '" id="lakeus-theme-designer-input-' + variableName + '" value="' + variableContent.default + '" />' +
                        '</label>';
                } else if (variableContent.input === 'textarea') {
                    settingElement +=
                        '<label>' +
                            mw.message('lakeus-theme-designer-' + variableName) +
                            '<input type="textarea" name="' + variableName + '" id="lakeus-theme-designer-input-' + variableName + '" value="' + variableContent.default + '" />' +
                        '</label>';
                }

                if (variableContent.rule === 'calculateWhenNotNeeded') {
                    settingElement +=
                        '<label>' +
                            '<input checked type="checkbox" class="lakeus-theme-designer-auto-calculate-checkbox" name="' + 'auto-calculate-' + variableName + '" id="lakeus-theme-designer-input-auto-calculate-' + variableName + '">' +
                            mw.message('lakeus-theme-designer-auto-calculate') +
                        '</label>';
                } else if (variableContent.rule === 'calculateWhenNeeded') {
                    settingElement +=
                        '<label>' +
                            '<input type="checkbox" class="lakeus-theme-designer-auto-calculate-checkbox" name="' + 'auto-calculate-' + variableName + '" id="lakeus-theme-designer-input-auto-calculate-' + variableName + '">' +
                            mw.message('lakeus-theme-designer-auto-calculate') +
                        '</label>';
                }

                settingElement += '</p>'
                return settingElement;
            }

            function constructThemeDesigner() {
                $("body").append(
                    '<div id="lakeus-theme-designer">' +
                        '<div id="lakeus-theme-designer-portlet" aria-labelledby="lakeus-theme-designer-modal-button">' +
                            '<input type="checkbox" id="lakeus-theme-designer-modal-checkbox-hack" aria-labelledby="lakeus-theme-designer-modal-button">' +
                            '<button id="lakeus-theme-designer-modal-button">🖌️</button>' +
                            '<form id="lakeus-theme-designer-portlet-body">' +
                                '<div id="lakeus-theme-designer-portlet-body-container">' +
                                    '<h1 id="lakeus-theme-designer-title">' + mw.message("lakeus-theme-designer") + '</h1>' +
                                    constructThemeDesignerBody() +
                                    '<fieldset class="lakeus-theme-designer-fieldset" id="lakeus-theme-designer-fieldset-danger-zone">' +
                                        '<legend class="lakeus-theme-designer-title">' + mw.message("lakeus-theme-designer-danger-zone") + '</legend>' +
                                        '<button type="button" id="lakeus-theme-designer-reset-theme-button" class="lakeus-theme-designer-action-button lakeus-theme-designer-action-button-danger">' + mw.message("lakeus-theme-designer-reset-theme") +
                                        '</button>' +
                                        '<button type="button" id="lakeus-theme-designer-reload-button" class="lakeus-theme-designer-action-button lakeus-theme-designer-action-button-danger">' + mw.message("lakeus-theme-designer-reload") +
                                        '</button>' +
                                    '</fieldset>' +
                                    '<div id="lakeus-theme-designer-result">' +
                                    '</div>' +
                                    '<div id="lakeus-theme-designer-action-buttons">' +
                                        '<button type="button" id="lakeus-theme-designer-copy-theme-button" class="lakeus-theme-designer-action-button">' + mw.message("lakeus-theme-designer-copy-theme") +
                                        '</button>' +
                                        '<button type="button" id="lakeus-theme-designer-test-theme-button" class="lakeus-theme-designer-action-button">' + mw.message("lakeus-theme-designer-test-theme") +
                                        '</button>' +
                                        '<button type="button" id="lakeus-theme-designer-paste-theme-button" class="lakeus-theme-designer-action-button">' + mw.message("lakeus-theme-designer-paste-theme") +
                                        '</button>' +
                                        '<button type="button" disabled id="lakeus-theme-designer-clear-theme-button" class="lakeus-theme-designer-action-button">' + mw.message("lakeus-theme-designer-clear-theme") +
                                        '</button>' +
                                    '</div>' +
                                '</div>' +
                            '</form>' +
                        '</div>' +
                    '</div>'
                );
                $(".lakeus-theme-designer-auto-calculate-checkbox").on('change', function () {
                    var checked = $(this).prop('checked');
                    $("#" + $(this).attr("name").replace("auto-calculate-", "lakeus-theme-designer-input-")).prop('disabled', checked);
                    $("#" + $(this).attr("name").replace("auto-calculate-", "lakeus-theme-designer-input-") + "-alpha").prop('disabled', checked);
                });
                $(".lakeus-theme-designer-auto-calculate-checkbox:checked").each(function () {
                    $("#" + $(this).attr("name").replace("auto-calculate-", "lakeus-theme-designer-input-")).prop('disabled', true);
                    $("#" + $(this).attr("name").replace("auto-calculate-", "lakeus-theme-designer-input-") + "-alpha").prop('disabled', true);
                });
                $("#lakeus-theme-designer-copy-theme-button").click(function (e) { e.preventDefault; Lakeus.copyTheme(); });
                $("#lakeus-theme-designer-paste-theme-button").click(function (e) { e.preventDefault; Lakeus.pasteThemeFromCurrentSettings(); });
                $("#lakeus-theme-designer-test-theme-button").click(function (e) { e.preventDefault; Lakeus.testTheme(); });
                $("#lakeus-theme-designer-clear-theme-button").click(function (e) { e.preventDefault; Lakeus.clearTheme(); });
                $("#lakeus-theme-designer-reset-theme-button").click(function (e) { e.preventDefault; Lakeus.resetFormFromVariablesList(); });
                $("#lakeus-theme-designer-reload-button").click(function (e) { e.preventDefault; Lakeus.reloadThemeDesigner(); });
                $("#lakeus-theme-designer-portlet-body").submit(function (e) { e.preventDefault; });
                Lakeus.updateVariablesListFromForm();
            }
            var stylePath = mw.config.get('stylepath');
            $('head').append('<link id="lakeus-theme-designer-style" rel="stylesheet" href="' + stylePath + '/Lakeus/resources/themeDesigner.css' + '" type="text/css" />');
            constructThemeDesigner();
            console.log("[Lakeus] " + mw.message('lakeus-theme-designer-all-loaded'));
        });
    });
};

/* Moving these functions into the init function */

Lakeus.updateVariablesListFromForm = function () {
    $.each(Lakeus.variablesList, function (k, v) {
        var inputElement = $("#lakeus-theme-designer-input-" + k);
        console.log("Disabled: ", inputElement.prop('disabled'));
        if (!(inputElement.prop('disabled'))) {
            if (inputElement.attr('type') === 'color') {
                var inputElementAlpha = $("#lakeus-theme-designer-input-" + k + "-alpha");
                console.log(inputElementAlpha.val());
                Lakeus.variablesList[k].value = chroma(inputElement.val()).alpha((Number(inputElementAlpha.val()) <= 1 && Number(inputElementAlpha.val()) >= 0) ? Number(inputElementAlpha.val()) : 1);
            } else {
                Lakeus.variablesList[k].value = inputElement.val();
            }
        } else {
            Lakeus.variablesList[k].value = Lakeus.variablesList[k].calculate(undefined);
        }
    });
};

Lakeus.updateFormFromVariablesList = function () {
    $.each(Lakeus.variablesList, function (k, v) {
        var inputElement = $("#lakeus-theme-designer-input-" + k);
        if (v.value) {
            if (v.input === 'color') {
                inputElement.val(v.value.hex('rgb'));
                $("#lakeus-theme-designer-input-" + k + "-alpha").val(v.value.alpha());
            } else {
                inputElement.val(v.value);
            }
        }
    })
}

Lakeus.resetFormFromVariablesList = function () {
    $.each(Lakeus.variablesList, function (k, v) {
        var inputElement = $("#lakeus-theme-designer-input-" + k);
        if (v.input === 'color') {
            inputElement.val(v.default.hex('rgb'));
            $("#lakeus-theme-designer-input-" + k + "-alpha").val(v.default.alpha());
        } else {
            inputElement.val(v.default);
        }
    })
}

Lakeus.generateTheme = function () {
    var result = ':root {\n';
    $.each(Lakeus.variablesList, function (k, v) {
        if (v.input === 'color') {
            if (v.value.alpha() < 1) {
                result += '    ' + k + ': ' + v.value.css() + ';\n';
            } else {
                result += '    ' + k + ': ' + v.value.hex() + ';\n';
            }
        } else {
            result += '    ' + '--' + k + ': ' + v.value + ';\n';
        }
    });
    result += '}\n';
    return result;
}

Lakeus.copyTheme = function () {
    if (!($("body").attr("testing") === 'true')) {
        Lakeus.updateVariablesListFromForm();
    }

    generatedCode = Lakeus.generateTheme();
    if (navigator.clipboard) {
        navigator.clipboard.writeText(generatedCode).then(function () {
            mw.notify(mw.message("lakeus-theme-designer-copied"));
        }, function () {
            mw.notify(mw.message("lakeus-theme-designer-copy-failed"));
            $("lakeus-theme-designer-result").empty().append(
                '<pre id="lakeus-theme-designer-result-pre-element">' +
                generatedCode +
                '</pre>'
            );
        });
    } else {
        mw.notify(mw.message("lakeus-theme-designer-copy-failed"));
        $("lakeus-theme-designer-result").empty().append(
            '<pre id="lakeus-theme-designer-result-pre-element">' +
            generatedCode +
            '</pre>'
        );
    }
}

Lakeus.pasteThemeFromCurrentSettings = function () {
    $.each(Lakeus.variablesList, function (k, v) {
        console.log(k, v);
        console.log(window.getComputedStyle(document.querySelector('html')).getPropertyValue("--" + k));
        if (v.input === 'color') {
            Lakeus.variablesList[k].value = chroma(window.getComputedStyle(document.querySelector('html')).getPropertyValue("--" + k)) || v.default;
        } else {
            Lakeus.variablesList[k].value = window.getComputedStyle(document.querySelector('html')).getPropertyValue("--" + k) || v.default;
        }
    })
    Lakeus.updateFormFromVariablesList();
}

Lakeus.testTheme = function () {
    Lakeus.updateVariablesListFromForm();
    Lakeus.updateFormFromVariablesList();
    $("body").attr("testing", "true");
    $("#lakeus-theme-designer-test-theme-button").prop('disabled', true);
    $("#lakeus-theme-designer-clear-theme-button").prop('disabled', false);
    $(".lakeus-theme-designer-fieldset").prop('disabled', true);
    $.each(Lakeus.variablesList, function (k, v) {
        console.log(v);
        if (v.input === 'color') {
            if (v.value.alpha() < 1) {
                document.querySelector('html').style.setProperty('--' + k, v.value.css());
            } else {
                document.querySelector('html').style.setProperty("--" + k, v.value.hex());
            }
        } else {
            document.querySelector('html').style.setProperty("--" + k, v.value);
        }
    });
}

Lakeus.clearTheme = function () {
    $("body").attr("testing", "false");
    $("#lakeus-theme-designer-test-theme-button").prop('disabled', false);
    $("#lakeus-theme-designer-clear-theme-button").prop('disabled', true);
    $(".lakeus-theme-designer-fieldset").prop('disabled', false);
    $.each(Lakeus.variablesList, function (k, v) {
        document.querySelector('html').style.removeProperty("--" + k);
    });
}

Lakeus.reloadThemeDesigner = function () {
    $("#lakeus-theme-designer").remove();
    $("#lakeus-theme-designer-style").remove();
    Lakeus.initThemeDesigner();
}

Lakeus.validateContrast = function (color1, color2, contrast) {
    return (chroma.contrast(color1, color2) >= (contrast || 4.5) ? true : false)
}

/* Load Theme Designer when enabled in user's preferences */

$.when(mw.loader.using(['mediawiki.api', 'mediawiki.jqueryMsg', 'user.defaults']), $.ready).then(function () {
    if (mw.user.options.get('lakeus-enable-theme-designer')) {
        Lakeus.initThemeDesigner();
    }
});
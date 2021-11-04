window.Lakeus = window.Lakeus || {};

/*
    TODO List:
    1. Use chroma("color") in Lakeus.variablesList for default and value;
    2. Use function.prototype.bind to replace each calculate property in Lakeus.variablesList;
    3. Remove deprecated functions and their calls;
    4. Add a "reset" button to the form;
    5. Implement Alpha channel next to the color input;
        5.1. This also requires to implement a field in the variables list for the alpha channel;
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
            "lakeus-theme-designer-copied",
            "lakeus-theme-designer-copy-failed",
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
        ]);
    }).then(function () {
        console.log("[Lakeus] " + mw.message('lakeus-theme-designer-system-messages-loaded'));
        $.getScript("https://cdn.jsdelivr.net/npm/chroma-js@2.1.2/chroma.min.js", function(){

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

        /* CSS Variables List */
        Lakeus.variablesList = {
            "background-color-base": {
                fieldset: "lakeus-theme-designer-global",
                rule: "manual",
                input: "color",
                default: chroma("#ffffff"),
                calculate: function (i) {
                    return i;
                },
            },
            "color-link": {
                fieldset: "lakeus-theme-designer-global",
                rule: "manual",
                input: "color",
                default: chroma("#0645ad"),
                calculate: function (i) {
                    return i;
                },
            },
            "color-link--visited": {
                fieldset: "lakeus-theme-designer-global",
                rule: "calculateWhenNotNeeded",
                input: "color",
                default: chroma("#0b0080"),
                calculateFrom: [
                    "color-link",
                    "background-color-content",
                ],
                calculate: function (i) {
                    return i || chroma(Lakeus.variablesList[this.calculateFrom[0]].value).hex('rgb');
                },
            },
            "elevation": {
                fieldset: "lakeus-theme-designer-global",
                rule: "manual",
                input: "text",
                default: "0 2px 2px rgba( 0, 0, 0, 10% )",
                calculate: function (i) {
                    return i;
                },
            },
            "font-family": {
                fieldset: "lakeus-theme-designer-global",
                rule: "manual",
                input: "text",
                default: "'Roboto', -apple-system, blinkmacsystemfont, 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Helvetica Neue', sans-serif",
                calculate: function (i) {
                    return i;
                },
            },
            "font-family-serif": {
                fieldset: "lakeus-theme-designer-global",
                rule: "manual",
                input: "text",
                default: "'Linux Libertine', 'Times New Roman', 'Liberation Serif', 'Nimbus Roman', 'Noto Serif', 'Times', serif",
                calculate: function (i) {
                    return i;
                },
            },
            "color-header": {
                fieldset: "lakeus-theme-designer-page-header",
                rule: "manual",
                input: "color",
                default: chroma("#ffffff"),
                calculate: function (i) {
                    return i;
                },
            },
            "text-color-header": {
                fieldset: "lakeus-theme-designer-page-header",
                rule: "calculateWhenNotNeeded",
                input: "color",
                default: chroma("#000000"),
                calculateFrom: [
                    "color-header"
                ],
                calculate: function (i) {
                    return i || Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[0]].value);
                },
            },
            "background-color-search-suggestions": {
                fieldset: "lakeus-theme-designer-page-header",
                rule: "manual",
                input: "color",
                default: chroma("#ffffff"),
                calculate: function (i) {
                    return i;
                },
            },
            "border-color-search-suggestions": {
                fieldset: "lakeus-theme-designer-page-header",
                rule: "calculateWhenNotNeeded",
                input: "color",
                default: chroma("#c8ccd1"),
                calculateFrom: [
                    "background-color-search-suggestions",
                    "color-header"
                ],
                calculate: function (i) {
                    return i || Lakeus.calculateColorByLuminance(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[1]].value,0.8,1.2));
                },
            },
            "background-color-search-suggestions-current": {
                fieldset: "lakeus-theme-designer-page-header",
                rule: "manual",
                input: "color",
                default: chroma("#1d5492"),
                calculate: function (i) {
                    return i;
                },
            },
            "color-search-suggestions-text": {
                fieldset: "lakeus-theme-designer-page-header",
                rule: "calculateWhenNotNeeded",
                input: "color",
                default: chroma("#000000"),
                calculateFrom: [
                    "background-color-search-suggestions"
                ],
                calculate: function (i) {
                    return i || Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[0]].value);
                },
            },
            "color-search-suggestions-text-current": {
                fieldset: "lakeus-theme-designer-page-header",
                rule: "calculateWhenNotNeeded",
                input: "color",
                default: chroma("#ffffff"),
                calculateFrom: [
                    "background-color-search-suggestions-current"
                ],
                calculate: function (i) {
                    return i || Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[0]].value);
                },
            },
            "background-color-search-input": {
                fieldset: "lakeus-theme-designer-page-header",
                rule: "manual",
                input: "color",
                default: chroma("#ffffff"),
                calculate: function (i) {
                    return i;
                },
            },
            "border-color-search-bar": {
                fieldset: "lakeus-theme-designer-page-header",
                rule: "manual",
                input: "color",
                default: chroma("#eaecf0"),
                calculateFrom: [
                    "background-color-search-input",
                    "color-header",
                ],
                calculate: function (i) {
                    return i || Lakeus.calculateColorByLuminance(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[1]].value,0.95,1.05));
                },
            },
            "background-color-toggle-list": {
                fieldset: "lakeus-theme-designer-toggle-list",
                rule: "manual",
                input: "color",
                default: chroma("#ffffff"),
                calculate: function (i) {
                    return i;
                },
            },
            "background-color-toggle-list-card": {
                fieldset: "lakeus-theme-designer-toggle-list",
                rule: "manual",
                input: "color",
                default: chroma("#eeeeee"),
                calculate: function (i) {
                    return i;
                },
            },
            "text-color-toggle-list-item": {
                fieldset: "lakeus-theme-designer-toggle-list",
                rule: "calculateWhenNotNeeded",
                input: "color",
                default: chroma("#1c1c1c"),
                calculateFrom: [
                    "background-color-toggle-list"
                ],
                calculate: function (i) {
                    return i || Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[0]].value);
                },
            },
            "background-color-toggle-list-item-hover": {
                fieldset: "lakeus-theme-designer-toggle-list",
                rule: "manual",
                input: "color",
                default: chroma("#eeeeee"),
                calculate: function (i) {
                    return i;
                },
            },
            "text-color-toggle-list-item-hover": {
                fieldset: "lakeus-theme-designer-toggle-list",
                rule: "calculateWhenNotNeeded",
                input: "color",
                default: chroma("#3a3a3a"),
                calculateFrom: [
                    "background-color-toggle-list-item-hover"
                ],
                calculate: function (i) {
                    return i || Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[0]].value);
                },
            },
            "background-color-toggle-list-item-focus": {
                fieldset: "lakeus-theme-designer-toggle-list",
                rule: "calculateWhenNotNeeded",
                input: "color",
                default: chroma("#cccccc"),
                calculateFrom: [
                    "background-color-toggle-list-item-hover",
                    "background-color-toggle-list",
                ],
                calculate: function (i) {
                    return i || Lakeus.calculateColorByLuminance(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[1]].value,0.8,1.2));
                },
            },
            "text-color-toggle-list-item-focus": {
                fieldset: "lakeus-theme-designer-toggle-list",
                rule: "calculateWhenNotNeeded",
                input: "color",
                default: chroma("#3a3a3a"),
                calculateFrom: [
                    "background-color-toggle-list-item-focus"
                ],
                calculate: function (i) {
                    return i || Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[0]].value);
                },
            },
            "border-color-toggle-list": {
                fieldset: "lakeus-theme-designer-toggle-list",
                rule: "calculateWhenNotNeeded",
                input: "color",
                default: chroma("#dddddd"),
                calculateFrom: [
                    "background-color-toggle-list",
                    "background-color-toggle-list",
                ],
                calculate: function (i) {
                    return i || Lakeus.calculateColorByLuminance(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[1]].value,0.8,1.2));
                },
            },
            "subheader-color-toggle-list": {
                fieldset: "lakeus-theme-designer-toggle-list",
                rule: "manual",
                input: "color",
                default: chroma("#909aa1"),
                calculateFrom: [
                    "background-color-toggle-list-card"
                ],
                calculate: function (i) {
                    return i || Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[0]].value,"#6a6a6a","#c3c3c3");
                },
            },
            "logo-text-color-toggle-list": {
                fieldset: "lakeus-theme-designer-toggle-list",
                rule: "calculateWhenNotNeeded",
                input: "color",
                default: chroma("#000000"),
                calculateFrom: [
                    "background-color-toggle-list-card"
                ],
                calculate: function (i) {
                    return i || Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[0]].value);
                },
            },
            "mask-background": {
                fieldset: "lakeus-theme-designer-toggle-list",
                rule: "manual",
                input: "color",
                default: chroma("rgba( 0, 0, 0, 0.8 )"),
                calculate: function (i) {
                    return i;
                },
            },
            "background-color-content": {
                fieldset: "lakeus-theme-designer-body",
                rule: "manual",
                input: "color",
                default: chroma("#ffffff"),
                calculate: function (i) {
                    return i;
                },
            },
            "text-color-content": {
                fieldset: "lakeus-theme-designer-body",
                rule: "calculateWhenNotNeeded",
                input: "color",
                default: chroma("#000000"),
                calculateFrom: [
                    "background-color-content"
                ],
                calculate: function (i) {
                    return i || Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[0]].value);
                },
            },
            "background-color-body": {
                fieldset: "lakeus-theme-designer-body",
                rule: "manual",
                input: "color",
                default: chroma("#ffffff"),
                calculate: function (i) {
                    return i;
                },
            },
            "text-color-body": {
                fieldset: "lakeus-theme-designer-body",
                rule: "calculateWhenNeeded",
                input: "color",
                default: chroma("#000000"),
                calculateFrom: [
                    "background-color-body"
                ],
                calculate: function (i) {
                    return i || Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[0]].value);
                },
            },
            "border-color-content": {
                fieldset: "lakeus-theme-designer-body",
                rule: "calculateWhenNotNeeded",
                input: "color",
                default: chroma("#cccccc"),
                calculateFrom: [
                    "background-color-content",
                    "background-color-content",
                ],
                calculate: function (i) {
                    return i || Lakeus.calculateColorByLuminance(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[1]].value,0.6,1.4));
                },
            },
            "color-accent-header-tab": {
                fieldset: "lakeus-theme-designer-body",
                rule: "manual",
                input: "color",
                default: chroma("#54595d"),
                calculate: function (i) {
                    return i;
                },
            },
            "color-accent-header-tab-selected": {
                fieldset: "lakeus-theme-designer-body",
                rule: "calculateWhenNotNeeded",
                input: "color",
                default: chroma("#0b0080"),
                calculateFrom: [
                    "color-accent-header-tab",
                    "background-color-content"
                ],
                calculate: function (i) {
                    return i || Lakeus.calculateColorByLuminance(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[1]].value,0.6,1.4));
                },
            },
            "color-accent-header-tab-new": {
                fieldset: "lakeus-theme-designer-body",
                rule: "calculateWhenNotNeeded",
                input: "color",
                default: chroma("#54595d"),
                calculateFrom: [
                    "color-accent-header-tab",
                    "background-color-content"
                ],
                calculate: function (i) {
                    return i || Lakeus.calculateColorByLuminance(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[1]].value,0.6,1.4));
                },
            },
            "border-color-header-tab": {
                fieldset: "lakeus-theme-designer-body",
                rule: "manual",
                input: "color",
                default: chroma("#eaecf0"),
                calculate: function (i) {
                    return i;
                },
            },
            "color-tagline": {
                fieldset: "lakeus-theme-designer-body",
                rule: "manual",
                input: "color",
                default: chroma("#54595d"),
                calculate: function (i) {
                    return i;
                },
            },
            "font-family-headings": {
                fieldset: "lakeus-theme-designer-body",
                rule: "manual",
                input: "text",
                default: "var(--font-family-serif)",
                calculate: function (i) {
                    return i;
                },
            },
            "background-color-edit-options": {
                fieldset: "lakeus-theme-designer-body",
                rule: "manual",
                input: "color",
                default: chroma("#eeeeee"),
                calculate: function (i) {
                    return i;
                },
            },
            "border-color-edit-options": {
                fieldset: "lakeus-theme-designer-body",
                rule: "manual",
                input: "color",
                default: chroma("#c8ccd1"),
                calculate: function (i) {
                    return i;
                },
            },
            "background-color-portlet-body": {
                fieldset: "lakeus-theme-designer-portlet",
                rule: "manual",
                input: "color",
                default: chroma("#ffffff"),
                calculate: function (i) {
                    return i;
                },
            },
            "background-color-portlet-item-hover": {
                fieldset: "lakeus-theme-designer-portlet",
                rule: "manual",
                input: "color",
                default: chroma("#eeeeee"),
                calculate: function (i) {
                    return i;
                },
            },
            "background-color-portlet-item-focus": {
                fieldset: "lakeus-theme-designer-portlet",
                rule: "calculateWhenNotNeeded",
                input: "color",
                default: chroma("#cccccc"),
                calculateFrom: [
                    "background-color-portlet-item-hover",
                    "background-color-portlet"
                ],
                calculate: function (i) {
                    return i || Lakeus.calculateColorByLuminance(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[1]].value,0.8,1.2));
                },
            },
            "border-color-portlet-body": {
                fieldset: "lakeus-theme-designer-portlet",
                rule: "manual",
                input: "color",
                default: chroma("#a2a9b1"),
                calculateFrom: [
                    "background-color-portlet-body",
                    "background-color-content"
                ],
                calculate: function (i) {
                    return i || Lakeus.calculateColorByLuminance(Lakeus.variablesList[this.calculateFrom[0]].value, Lakeus.getContrastYIQ(Lakeus.variablesList[this.calculateFrom[1]].value,0.8,1.2));
                },
            },
            "background-color-footer": {
                fieldset: "lakeus-theme-designer-footer",
                rule: "manual",
                input: "color",
                default: chroma("#eeeeee"),
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
                        '<input type="color" name="' + variableName + '" id="lakeus-theme-designer-input-' + variableName + '" value="' + variableContent.default + '" />' +
                        '<input type="number" step="0.01" min="0" max="1" name="' + variableName + '-alpha" id="lakeus-theme-designer-input-' + variableName + '-alpha" value="' + variableContent.alpha() + '" />' +
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
                        '<input type="checkbox" class="lakeus-theme-designer-auto-calculate-checkbox" name="' + 'auto-calculate-' + variableName + '" id="lakeus-theme-designer-input-auto-calculate-' + variableName + '">' +
                        mw.message('lakeus-theme-designer-auto-calculate') +
                    '</label>';
            } else if (variableContent.rule === 'calculateWhenNeeded') {
                settingElement +=
                    '<label>' +
                        '<input checked type="checkbox" class="lakeus-theme-designer-auto-calculate-checkbox" name="' + 'auto-calculate-' + variableName + '" id="lakeus-theme-designer-input-auto-calculate-' + variableName + '">' +
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
                                '<div id="lakeus-theme-designer-result">' +
                                '</div>' +
                                '<div id="lakeus-theme-designer-action-buttons">' +
                                    '<button type="button" id="lakeus-theme-designer-copy-theme-button" class="lakeus-theme-designer-action-button">' + mw.message("lakeus-theme-designer-copy-theme") +
                                    '</button>'+
                                    '<button type="button" id="lakeus-theme-designer-test-theme-button" class="lakeus-theme-designer-action-button">' + mw.message("lakeus-theme-designer-test-theme") +
                                    '</button>'+
                                    '<button type="button" id="lakeus-theme-designer-paste-theme-button" class="lakeus-theme-designer-action-button">' + mw.message("lakeus-theme-designer-paste-theme") +
                                    '</button>'+
                                    '<button type="button" disabled id="lakeus-theme-designer-clear-theme-button" class="lakeus-theme-designer-action-button">' + mw.message("lakeus-theme-designer-clear-theme") +
                                    '</button>'+
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
            $("#lakeus-theme-designer-copy-theme-button").click( function(e) { e.preventDefault; Lakeus.copyTheme();  });
            $("#lakeus-theme-designer-paste-theme-button").click( function(e) { e.preventDefault; Lakeus.pasteThemeFromCurrentSettings();  });
            $("#lakeus-theme-designer-test-theme-button").click( function(e) { e.preventDefault; Lakeus.testTheme();  });
            $("#lakeus-theme-designer-clear-theme-button").click( function(e) { e.preventDefault; Lakeus.clearTheme();  });
            Lakeus.updateVariablesListFromForm();
        }
            var stylePath = mw.config.get('stylepath');
            $('head').append('<link rel="stylesheet" href="' + stylePath + '/Lakeus/resources/themeDesigner.css' + '" type="text/css" />');
            constructThemeDesigner();
            console.log("[Lakeus] " + mw.message('lakeus-theme-designer-all-loaded'));
        });
    });
};

/* Moving these functions into the init function */

Lakeus.updateVariablesListFromForm = function () {
    $.each(Lakeus.variablesList, function (k, v) {
        var inputElement = $("#lakeus-theme-designer-input-" + k);
        if (!(inputElement.prop('disable'))) {
            if(inputElement.attr('type') === 'color') {
                var inputElementAlpha = $("#lakeus-theme-designer-input-" + k + "-alpha");
                Lakeus.variablesList[k].value = chroma(inputElement.val()).alpha(inputElementAlpha.val());
            } else {
                Lakeus.variablesList[k].value = inputElement.val();
            }
        } else {
            Lakeus.variablesList[k].value = v.calculate(undefined);
        }
    });
};

Lakeus.updateFormFromVariablesList = function () {
    $.each(Lakeus.variablesList, function (k, v) {
        var inputElement = $("#lakeus-theme-designer-input-" + k);
        if (v.value) {
            if (v.input === 'color') {
                inputElement.val(v.value.hex());
                $("#lakeus-theme-designer-input-" + k + "-alpha").val(v.value.alpha());
            } else {
                inputElement.val(v.value);
            }
        }
    })
}

Lakeus.generateTheme = function () {
    var result = ':root {\n';
    $.each(Lakeus.variablesList, function (k, v) {
        if (v.input === 'color') {
            if (v.value.alpha() < 1) {
                result += '    ' + '--' + k + '-hex' + ': ' + v.value.hex() + ';\n';
                result += '    ' + '--' + k + '-alpha' + ': ' + v.value.alpha() + ';\n';
                result += '    ' + '--' + k + ': ' + ': ' + 'rgba( var( --' + k + '-hex' + ' ), var( --' + k + '-alpha' + ' ) )' + ';\n';
            } else {
                result += '    ' + '--' + k + ': ' + v.value.hex() + ';\n';
            }
            
        } else {
            result += '    ' + '--' + k + ': ' + v.value + ';\n';
        }
    });
    result += '}\n';
    return result;
}

Lakeus.copyTheme = function () {
    Lakeus.updateVariablesListFromForm();
    generatedCode = Lakeus.generateTheme();
    if (navigator.clipboard) {
        navigator.clipboard.writeText(generatedCode).then(function() {
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
        if (v.input === 'color') {
            Lakeus.variablesList[k].value = chroma(window.getComputedStyle(document.querySelector('html')).getPropertyValue("--" + k) || v.default);
        } else {
            Lakeus.variablesList[k].value = window.getComputedStyle(document.querySelector('html')).getPropertyValue("--" + k) || v.default;
        }
    })
    Lakeus.updateFormFromVariablesList();
}

Lakeus.testTheme = function () {
    Lakeus.updateVariablesListFromForm();
    $("body").attr("testing", "true");
    $("#lakeus-theme-designer-test-theme-button").prop('disabled', true);
    $("#lakeus-theme-designer-clear-theme-button").prop('disabled', false);
    $.each(Lakeus.variablesList, function (k, v) {
        document.querySelector('html').style.setProperty("--" + k, v.value);
    });
}

Lakeus.clearTheme = function () {
    $("body").attr("testing", "false");
    $("#lakeus-theme-designer-test-theme-button").prop('disabled', false);
    $("#lakeus-theme-designer-clear-theme-button").prop('disabled', true);
    $.each(Lakeus.variablesList, function (k, v) {
        document.querySelector('html').style.removeProperty("--" + k);
    });
}

Lakeus.validateContrast = function(color1, color2, contrast) {
    return (chroma.contrast(color1,color2) >= (contrast || 4.5) ? true : false)
}

/* Deprecated */
Lakeus.colorNameToHex = function(color) {
    var colors = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
    "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
    "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
    "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
    "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
    "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
    "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
    "honeydew":"#f0fff0","hotpink":"#ff69b4",
    "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
    "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
    "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
    "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
    "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
    "navajowhite":"#ffdead","navy":"#000080",
    "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
    "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
    "rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
    "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
    "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
    "violet":"#ee82ee",
    "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
    "yellow":"#ffff00","yellowgreen":"#9acd32"};

    console.log(color);

    if (typeof colors[color.toLowerCase()] != 'undefined') {
        return colors[color.toLowerCase()];
    } else if (String(color).replace(/[^0-9a-f]/gi, '').length < 6) {
        hex = String(color).replace(/[^0-9a-f]/gi, '');
        color = "#" + hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    return color;
}

/* Load Theme Designer when enabled in user's preferences */

$.when(mw.loader.using(['mediawiki.api', 'mediawiki.jqueryMsg', 'user.defaults']), $.ready).then( function (){
    if (mw.user.options.get( 'lakeus-enable-theme-designer' )) {
        Lakeus.initThemeDesigner();
    }
});
window.Lakeus = window.Lakeus || {};

Lakeus.initThemeDesigner = function () {

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

    Lakeus.getContrastYIQ = function (hexcolor) {
        hexcolor = hexcolor.replace("#", "");
        var r = parseInt(hexcolor.substr(0, 2), 16);
        var g = parseInt(hexcolor.substr(2, 2), 16);
        var b = parseInt(hexcolor.substr(4, 2), 16);
        var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? 'black' : 'white';
    }

    Lakeus.variablesList = {
        "background-color-base": {
            fieldset: "lakeus-theme-designer-global",
            rule: "manual",
            input: "color",
            default: "#ffffff",
            calculate: function (i) {
                return i;
            },
        },
        "color-link": {
            fieldset: "lakeus-theme-designer-global",
            rule: "manual",
            input: "color",
            default: "#0645ad",
            calculate: function (i) {
                return i;
            },
        },
        "color-link--visited": {
            fieldset: "lakeus-theme-designer-global",
            rule: "calculateWhenNotNeeded",
            input: "color",
            default: "#0b0080",
            calculateFrom: [
                "color-link"
            ],
            calculate: function (i) {
                return i || Lakeus.calculateColorByLuminance(Lakeus.variablesList[this.calculateFrom[0]].value, 0.8);
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
            default: "#ffffff",
            calculate: function (i) {
                return i;
            },
        },
        "background-color-search-suggestions": {
            fieldset: "lakeus-theme-designer-page-header",
            rule: "manual",
            input: "color",
            default: "#ffffff",
            calculate: function (i) {
                return i;
            },
        },
        "border-color-search-suggestions": {
            fieldset: "lakeus-theme-designer-page-header",
            rule: "calculateWhenNotNeeded",
            input: "color",
            default: "#c8ccd1",
            calculateFrom: [
                "background-color-search-suggestions"
            ],
            calculate: function (i) {
                return i || Lakeus.calculateColorByLuminance(Lakeus.variablesList[this.calculateFrom[0]].value, 0.8);
            },
        },
        "background-color-search-suggestions-current": {
            fieldset: "lakeus-theme-designer-page-header",
            rule: "manual",
            input: "color",
            default: "#1d5492",
            calculate: function (i) {
                return i;
            },
        },
        "color-search-suggestions-text": {
            fieldset: "lakeus-theme-designer-page-header",
            rule: "calculateWhenNotNeeded",
            input: "color",
            default: "#000000",
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
            default: "#ffffff",
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
            default: "#ffffff",
            calculate: function (i) {
                return i;
            },
        },
        "background-color-toggle-list": {
            fieldset: "lakeus-theme-designer-toggle-list",
            rule: "manual",
            input: "color",
            default: "#ffffff",
            calculate: function (i) {
                return i;
            },
        },
        "background-color-toggle-list-card": {
            fieldset: "lakeus-theme-designer-toggle-list",
            rule: "manual",
            input: "color",
            default: "#eeeeee",
            calculate: function (i) {
                return i;
            },
        },
        "background-color-toggle-list-item-hover": {
            fieldset: "lakeus-theme-designer-toggle-list",
            rule: "manual",
            input: "color",
            default: "#eeeeee",
            calculate: function (i) {
                return i;
            },
        },
        "background-color-toggle-list-item-focus": {
            fieldset: "lakeus-theme-designer-toggle-list",
            rule: "calculateWhenNotNeeded",
            input: "color",
            default: "#cccccc",
            calculateFrom: [
                "background-color-toggle-list-item-hover"
            ],
            calculate: function (i) {
                return i || Lakeus.calculateColorByLuminance(Lakeus.variablesList[this.calculateFrom[0]].value, 0.8);
            },
        },
        "border-color-toggle-list": {
            fieldset: "lakeus-theme-designer-toggle-list",
            rule: "calculateWhenNotNeeded",
            input: "color",
            default: "#dddddd",
            calculateFrom: [
                "background-color-toggle-list"
            ],
            calculate: function (i) {
                return i || Lakeus.calculateColorByLuminance(Lakeus.variablesList[this.calculateFrom[0]].value, 0.8);
            },
        },
        "subheader-color-toggle-list": {
            fieldset: "lakeus-theme-designer-toggle-list",
            rule: "manual",
            input: "text",
            default: "rgba( 0, 0, 0, 0.6 )",
            calculate: function (i) {
                return i;
            },
        },
        "logo-text-color-toggle-list": {
            fieldset: "lakeus-theme-designer-toggle-list",
            rule: "calculateWhenNotNeeded",
            input: "color",
            default: "#000000",
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
            input: "text",
            default: "rgba( 0, 0, 0, 0.8 )",
            calculate: function (i) {
                return i;
            },
        },
        "background-color-content": {
            fieldset: "lakeus-theme-designer-body",
            rule: "manual",
            input: "color",
            default: "#ffffff",
            calculate: function (i) {
                return i;
            },
        },
        "background-color-article": {
            fieldset: "lakeus-theme-designer-body",
            rule: "manual",
            input: "color",
            default: "#ffffff",
            calculate: function (i) {
                return i;
            },
        },
        "border-color-content": {
            fieldset: "lakeus-theme-designer-body",
            rule: "calculateWhenNotNeeded",
            input: "color",
            default: "#cccccc",
            calculateFrom: [
                "background-color-content"
            ],
            calculate: function (i) {
                return i || Lakeus.calculateColorByLuminance(Lakeus.variablesList[this.calculateFrom[0]].value, 0.6);
            },
        },
        "color-accent-header-tab": {
            fieldset: "lakeus-theme-designer-body",
            rule: "manual",
            input: "color",
            default: "#54595d",
            calculate: function (i) {
                return i;
            },
        },
        "border-color-header-tab": {
            fieldset: "lakeus-theme-designer-body",
            rule: "manual",
            input: "color",
            default: "#eaecf0",
            calculate: function (i) {
                return i;
            },
        },
        "color-tagline": {
            fieldset: "lakeus-theme-designer-body",
            rule: "manual",
            input: "color",
            default: "#54595d",
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
            default: "#eeeeee",
            calculate: function (i) {
                return i;
            },
        },
        "border-color-edit-options": {
            fieldset: "lakeus-theme-designer-body",
            rule: "manual",
            input: "color",
            default: "#c8ccd1",
            calculate: function (i) {
                return i;
            },
        },
        "background-color-portlet-body": {
            fieldset: "lakeus-theme-designer-portlet",
            rule: "manual",
            input: "color",
            default: "#ffffff",
            calculate: function (i) {
                return i;
            },
        },
        "background-color-portlet-item-hover": {
            fieldset: "lakeus-theme-designer-portlet",
            rule: "manual",
            input: "color",
            default: "#eeeeee",
            calculate: function (i) {
                return i;
            },
        },
        "background-color-portlet-item-focus": {
            fieldset: "lakeus-theme-designer-portlet",
            rule: "calculateWhenNotNeeded",
            input: "color",
            default: "#cccccc",
            calculateFrom: [
                "background-color-portlet-item-hover"
            ],
            calculate: function (i) {
                return i || Lakeus.calculateColorByLuminance(Lakeus.variablesList[this.calculateFrom[0]].value, 0.8);
            },
        },
        "border-color-portlet-body": {
            fieldset: "lakeus-theme-designer-portlet",
            rule: "manual",
            input: "color",
            default: "#a2a9b1",
            calculateFrom: [
                "background-color-portlet-body"
            ],
            calculate: function (i) {
                return i || Lakeus.calculateColorByLuminance(Lakeus.variablesList[this.calculateFrom[0]].value, 0.8);
            },
        },
        "background-color-footer": {
            fieldset: "lakeus-theme-designer-footer",
            rule: "manual",
            input: "color",
            default: "#eeeeee",
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
                            '<div id="lakeus-theme-designer-action-buttons">' +
                                '<button id="lakeus-theme-designer-copy-theme-button" class="lakeus-theme-designer-action-button">' + mw.message("lakeus-theme-designer-copy-theme") +
                                '<button id="lakeus-theme-designer-test-theme-button" class="lakeus-theme-designer-action-button">' + mw.message("lakeus-theme-designer-test-theme") +
                                '<button id="lakeus-theme-designer-paste-theme-button" class="lakeus-theme-designer-action-button">' + mw.message("lakeus-theme-designer-paste-theme") +
                            '</div>' +
                        '</div>' +
                    '</form>' +
                '</div>' +
            '</div>'
        );
        $(".lakeus-theme-designer-auto-calculate-checkbox").on('change', function () {
            var checked = $(this).prop('checked');
            $("#" + $(this).attr("name").replace("auto-calculate-", "lakeus-theme-designer-input-")).prop('disabled', checked);
        });
        $("#lakeus-theme-designer-copy-theme-button").click( function(e) { e.preventDefault; Lakeus.copyTheme();  });
        $("#lakeus-theme-designer-paste-theme-button").click( function(e) { e.preventDefault; Lakeus.pasteThemeFromCurrentSettings();  });
        $("#lakeus-theme-designer-test-theme-button").click( function(e) { e.preventDefault; Lakeus.testTheme();  });
        Lakeus.updateVariablesListFromForm();
    }

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
            "lakeus-theme-designer-background-color-article",
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
        var stylePath = mw.config.get('stylepath');
        // $('head').append('<link rel="stylesheet" href="' + stylePath + '/Lakeus/resources/themeDesigner.css' + '" type="text/css" />');
        constructThemeDesigner();
        console.log("[Lakeus] " + mw.message('lakeus-theme-designer-all-loaded'));
    });
};

Lakeus.updateVariablesListFromForm = function () {
    $.each(Lakeus.variablesList, function (k, v) {
        var inputElement = $("#lakeus-theme-designer-input-" + k);
        if (!(inputElement.prop('disable'))) {
            Lakeus.variablesList[k].value = inputElement.val();
        }
    });
};

Lakeus.generateTheme = function () {

}

Lakeus.copyTheme = function () {

}

Lakeus.pasteThemeFromCurrentSettings = function () {

}

Lakeus.testTheme = function () {

}
const chroma = require( 'skins.lakeus.chroma' );

window.Lakeus = window.Lakeus || {};

/*
    TODO List:
    1. [X] Use chroma("color") in Lakeus.variablesList for default and value;
    2. [X] Use function.prototype.bind to replace each calculate property in Lakeus.variablesList;
    3. Remove deprecated functions and their calls;
    4. [X] Add a "reset" button to the form;
    5. [X] Implement Alpha channel next to the color input;
        5.1. [X] This also requires to implement a field in the variables list for the alpha channel;
    6. [ ] Reimplement the function of calculating actual values of the RGBA colors into the variables list;
    7. [X] Implement variables for TOC;
    8. [X] Implement variables for feature `interface-message-box`;
    9. [X] Implement variables for feature `content-table`;
    10. [ ] Implement variables for <code> and its alike;
    11. [ ] Implement variables for OOUI;
    12. [ ] Complete variables for texts (portlets, toggle list);
        12.1. Lack in `variables.less`: ["color-neutral","color-warning","color-error","color-success","color-secondary--derived","border-color-secondary--derived"]
        12.2. Lack in here: ["icon-filter-ooui-icon","color-gray","color-gray-2"]
    13. Test it out.
*/

Lakeus.initThemeDesigner = function () {
    if (!$('body').hasClass('skin-lakeus')) {
        console.log("[Lakeus] Do not load Lakeus Theme Designer when not using Lakeus skin.");
        return;
    }
    console.log("[Lakeus] Theme Designer is loading...");
    $.when(mw.loader.using(['mediawiki.api', 'mediawiki.jqueryMsg']), $.ready).then(function () {
        return new mw.Api().loadMessagesIfMissing([
            "lakeus-theme-designer",
            "lakeus-theme-designer-color-scheme",
            "lakeus-theme-designer-color-scheme-light",
            "lakeus-theme-designer-color-scheme-dark",
            "lakeus-theme-designer-system-messages-loaded",
            "lakeus-theme-designer-all-loaded",
            "lakeus-theme-designer-auto-calculate",
            "lakeus-theme-designer-do-not-generate",
            "lakeus-theme-designer-copy-theme",
            "lakeus-theme-designer-paste-theme",
            "lakeus-theme-designer-test-theme",
            "lakeus-theme-designer-clear-theme",
            "lakeus-theme-designer-reset-theme",
            "lakeus-theme-designer-invert-auto-calculate-selection",
            "lakeus-theme-designer-unselect-do-not-generate-selection",
            "lakeus-theme-designer-copied",
            "lakeus-theme-designer-copy-failed",
            "lakeus-theme-designer-reload",
            "lakeus-theme-designer-color-picker-fallback",
            "lakeus-theme-designer-alpha-channel",
            "lakeus-theme-designer-basic",
            "lakeus-theme-designer-color-primary",
            "lakeus-theme-designer-color-secondary",
            "lakeus-theme-designer-color-neutral",
            "lakeus-theme-designer-color-warning",
            "lakeus-theme-designer-color-error",
            "lakeus-theme-designer-color-success",
            "lakeus-theme-designer-basic-derived",
            "lakeus-theme-designer-color-secondary--derived",
            "lakeus-theme-designer-border-color-secondary--derived",
            "lakeus-theme-designer-global",
            "lakeus-theme-designer-background-color-base",
            "lakeus-theme-designer-color-link",
            "lakeus-theme-designer-color-link--visited",
            "lakeus-theme-designer-color-link--active",
            "lakeus-theme-designer-color-link-new",
            "lakeus-theme-designer-color-link-new--visited",
            "lakeus-theme-designer-color-link-new--active",
            "lakeus-theme-designer-color-footer-link",
            "lakeus-theme-designer-color-footer-link--visited",
            "lakeus-theme-designer-color-footer-link--active",
            "lakeus-theme-designer-color-link-external",
            "lakeus-theme-designer-color-link-external--visited",
            "lakeus-theme-designer-color-link-external--active",
            "lakeus-theme-designer-elevation",
            "lakeus-theme-designer-font-family",
            "lakeus-theme-designer-font-family-serif",
            "lakeus-theme-designer-font-family-action-bar",
            "lakeus-theme-designer-page-header",
            "lakeus-theme-designer-color-header",
            "lakeus-theme-designer-header-elevation",
            "lakeus-theme-designer-icon-filter-header",
            "lakeus-theme-designer-background-color-search-suggestions",
            "lakeus-theme-designer-border-color-search-suggestions",
            "lakeus-theme-designer-color-search-suggestions-text",
            "lakeus-theme-designer-background-color-search-suggestions-current",
            "lakeus-theme-designer-color-search-suggestions-text-current",
            "lakeus-theme-designer-background-color-search-input",
            "lakeus-theme-designer-border-color-search-bar",
            "lakeus-theme-designer-box-shadow-search-input",
            "lakeus-theme-designer-box-shadow-color-search-input",
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
            "lakeus-theme-designer-background-color-toc",
            "lakeus-theme-designer-border-color-toc",
            "lakeus-theme-designer-color-toc-number",
            "lakeus-theme-designer-border-color-interface-message-box-neutral",
            "lakeus-theme-designer-background-color-interface-message-box-neutral",
            "lakeus-theme-designer-text-color-interface-message-box-neutral",
            "lakeus-theme-designer-border-color-interface-message-box-warning",
            "lakeus-theme-designer-background-color-interface-message-box-warning",
            "lakeus-theme-designer-text-color-interface-message-box-warning",
            "lakeus-theme-designer-border-color-interface-message-box-error",
            "lakeus-theme-designer-background-color-interface-message-box-error",
            "lakeus-theme-designer-text-color-interface-message-box-error",
            "lakeus-theme-designer-border-color-interface-message-box-success",
            "lakeus-theme-designer-background-color-interface-message-box-success",
            "lakeus-theme-designer-text-color-interface-message-box-success",
            "lakeus-theme-designer-border-color-user-message",
            "lakeus-theme-designer-background-color-user-message",
            "lakeus-theme-designer-text-color-user-message",
            "lakeus-theme-designer-background-color-wikitable",
            "lakeus-theme-designer-border-color-wikitable",
            "lakeus-theme-designer-background-color-wikitable-table-head",
            "lakeus-theme-designer-text-color-wikitable",
            "lakeus-theme-designer-portlet",
            "lakeus-theme-designer-background-color-portlet-body",
            "lakeus-theme-designer-text-color-portlet-item",
            "lakeus-theme-designer-background-color-portlet-item-hover",
            "lakeus-theme-designer-text-color-portlet-item-hover",
            "lakeus-theme-designer-background-color-portlet-item-focus",
            "lakeus-theme-designer-text-color-portlet-item-focus",
            "lakeus-theme-designer-border-color-portlet-body",
            "lakeus-theme-designer-box-shadow-portlet-body",
            "lakeus-theme-designer-box-shadow-color-portlet-body",
            "lakeus-theme-designer-footer",
            "lakeus-theme-designer-background-color-footer",
            "lakeus-theme-designer-text-color-footer",
            "lakeus-theme-designer-text-color-toggle-list-item",
            "lakeus-theme-designer-text-color-toggle-list-item-hover",
            "lakeus-theme-designer-text-color-toggle-list-item-focus",
            "lakeus-theme-designer-text-color-content",
            "lakeus-theme-designer-text-color-header",
            "lakeus-theme-designer-text-color-body",
            "lakeus-theme-designer-color-accent-header-tab-selected",
            "lakeus-theme-designer-color-accent-header-tab-new",
            "lakeus-theme-designer-sticky-toc",
            "lakeus-theme-designer-background-color-toc-button",
            "lakeus-theme-designer-border-color-toc-button",
            "lakeus-theme-designer-icon-filter-toc-button",
            "lakeus-theme-designer-text-color-sticky-toc-number",
            "lakeus-theme-designer-danger-zone",
        ]);
    }).then(function () {
        console.log("[Lakeus] " + mw.message('lakeus-theme-designer-system-messages-loaded'));
        // chroma.js used to be pulled from jsDelivr right here with $.getScript().
        // It is now vendored as the ResourceLoader module "skins.lakeus.chroma" and
        // required at the top of this file, so initialisation no longer depends on a
        // third-party CDN being reachable. The IIFE keeps the original scoping of
        // this block; it gets flattened when the file is restructured.
        (function () {

            /* Leaving it as-is since 50% contrast method works differently */
            Lakeus.getContrastYIQ = function (hexcolor, black, white) {
                hexcolor = hexcolor.replace("#", "");
                var r = parseInt(hexcolor.substr(0, 2), 16);
                var g = parseInt(hexcolor.substr(2, 2), 16);
                var b = parseInt(hexcolor.substr(4, 2), 16);
                var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
                return (yiq >= 128) ? (black ? black : '#000000') : (white ? white : '#ffffff');
            }

            Lakeus.calculateRGBAActualValue = function (frontRGBA, backgroundRGB){

                var rtrn = {};
                //allows the function to just accept a front colour and assume the background is a plain white.
                backgroundRGB = backgroundRGB || chroma([255, 255, 255]);
                
                //allows a RGB value to be passed in assuming full alpha channel.
                frontRGBA.alpha(frontRGBA.alpha() || 1);
                
                //normalise the alpha channel across the foreground and background.
                rtrn.r = ((1 - frontRGBA.alpha()) * backgroundRGB.get("rgb.r")) + (frontRGBA.alpha() * frontRGBA.get("rgb.r"));
                rtrn.g = ((1 - frontRGBA.alpha()) * backgroundRGB.get("rgb.g")) + (frontRGBA.alpha() * frontRGBA.get("rgb.g"));
                rtrn.b = ((1 - frontRGBA.alpha()) * backgroundRGB.get("rgb.b")) + (frontRGBA.alpha() * frontRGBA.get("rgb.b"));
                
                //just check that we don't end up with a value greater than 255 for any channel.
                rtrn.r = (rtrn.r > 255) ? 255 : rtrn.r;
                rtrn.g = (rtrn.g > 255) ? 255 : rtrn.g;
                rtrn.b = (rtrn.b > 255) ? 255 : rtrn.b;
                
                return chroma(rtrn);
                
            }

            Lakeus.changeColorBrightnessByContrast = function (foregroundColor, backgroundColor, brightenCoefficient, darkenCoefficient) {
                return (Lakeus.getContrastYIQ(backgroundColor.hex(), "black", "white") === "white" ? foregroundColor.brighten(brightenCoefficient) : foregroundColor.darken(darkenCoefficient));
            }

            /* CSS Variables List */
            Lakeus.variablesList = require( './themeDesigner.variables.js' )( Lakeus, chroma );

            /* Light/dark colour scheme support
             *
             * The skin declares every themeable variable twice - as `--<name>-light`
             * and `--<name>-dark`, both in an unconditional `:root` block - and its own
             * `.theme-light()` / `.theme-dark()` mixins map `--<name>` onto whichever
             * half the active colour scheme needs.
             *
             * A stylesheet loaded after the skin (site CSS, or a user's common.css)
             * therefore only has to supply both halves, and the skin resolves every
             * scheme by itself. That means no `light-dark()` - which MediaWiki's CSS
             * sanitiser rejects - and no duplicated dark-mode block either.
             *
             * The designer mirrors that shape: each variable keeps one value per
             * scheme, `value` / `default` become accessors resolving against the scheme
             * currently being edited (so all existing calculate() rules keep working
             * untouched), and generateTheme() emits `<name>-light` / `<name>-dark` pairs.
             */

            /** Colour scheme currently being edited: 'light' or 'dark'. */
            Lakeus.colorSchemeMode = 'light';

            /** Colour schemes the designer edits, in UI order. */
            Lakeus.colorSchemes = [ 'light', 'dark' ];

            /**
             * Read a themeable value out of the skin's own stylesheet.
             *
             * Because the skin declares both halves in an unconditional `:root`
             * block, both are readable no matter which scheme is in effect. Returns
             * null when the skin does not define the variable, so callers can fall
             * back to their built-in default rather than inventing a value.
             *
             * @param {string} variableName Variable name without the scheme suffix.
             * @param {string} scheme 'light' or 'dark'.
             * @return {?string} Raw CSS value, or null when undefined.
             */
            Lakeus.getSkinVariableValue = function (variableName, scheme) {
                var raw = window.getComputedStyle(document.documentElement)
                    .getPropertyValue('--' + variableName + '-' + scheme)
                    .trim();
                return raw === '' ? null : raw;
            };

            /**
             * Coerce a raw CSS value into what the variable's input type expects.
             *
             * @param {?string} raw
             * @param {Object} variable Entry from Lakeus.variablesList.
             * @param {*} fallback Used when the raw value cannot be interpreted.
             * @return {*}
             */
            Lakeus.parseVariableValue = function (raw, variable, fallback) {
                if (raw === null || raw === undefined) {
                    return fallback;
                }
                if (variable.input !== 'color') {
                    return raw;
                }
                return chroma.valid(raw) ? chroma(raw) : fallback;
            };

            /**
             * Give every variable a value and a default for each colour scheme.
             *
             * Light keeps the literal defaults declared in `variablesList`, so light
             * output is unchanged by this feature. Dark is seeded from the skin's own
             * `--<name>-dark`, which means a generated theme inherits the skin's dark
             * design instead of asking the author to re-pick a hundred colours.
             *
             * Must run before constructThemeDesigner(), which reads these values.
             */
            Lakeus.initColorSchemes = function () {
                var missingDark = [];
                $.each(Lakeus.variablesList, function (k, v) {
                    var lightDefault = v.default;
                    var darkRaw = Lakeus.getSkinVariableValue(k, 'dark');
                    if (darkRaw === null) {
                        missingDark.push(k);
                    }
                    var darkDefault = Lakeus.parseVariableValue(darkRaw, v, lightDefault);

                    v.defaults = { light: lightDefault, dark: darkDefault };
                    v.values = { light: v.value, dark: darkDefault };

                    // `value` and `default` become views onto the scheme being edited.
                    Object.defineProperty(v, 'default', {
                        get: function () {
                            return this.defaults[Lakeus.colorSchemeMode];
                        },
                        configurable: true,
                    });
                    Object.defineProperty(v, 'value', {
                        get: function () {
                            return this.values[Lakeus.colorSchemeMode];
                        },
                        set: function (newValue) {
                            this.values[Lakeus.colorSchemeMode] = newValue;
                        },
                        configurable: true,
                    });
                });
                if (missingDark.length) {
                    console.warn('[Lakeus] The skin defines no --<name>-dark for: ' +
                        missingDark.join(', ') + '. Those fall back to the light default.');
                }
            };

            /**
             * Whether a variable's value is derived instead of user-entered.
             *
             * Prefers the checkbox in the form, because the user can invert the
             * selection; falls back to the declared rule before the form exists.
             *
             * @param {string} k Variable name.
             * @param {Object} v Entry from Lakeus.variablesList.
             * @return {boolean}
             */
            Lakeus.isAutoCalculated = function (k, v) {
                var checkbox = $("#lakeus-theme-designer-input-auto-calculate-" + k);
                if (checkbox.length) {
                    return checkbox.prop('checked');
                }
                return (v.rule || {}).autoCalculate === 'calculateWhenNotNeeded';
            };

            /**
             * Recompute every auto-calculated variable for the scheme being edited.
             *
             * calculate() rules read other variables through `value`, which resolves
             * against the active scheme, so a pass is needed after switching schemes.
             * A rule may depend on variables that are themselves auto-calculated and
             * the list order does not always put dependencies first, so the pass is
             * repeated to let the values settle.
             */
            Lakeus.recalculateAutoVariables = function () {
                for (var pass = 0; pass < 2; pass++) {
                    $.each(Lakeus.variablesList, function (k, v) {
                        if (Lakeus.isAutoCalculated(k, v)) {
                            v.value = v.calculate(undefined);
                        }
                    });
                }
            };

            /**
             * Switch which scheme's values the form edits.
             *
             * @param {string} scheme 'light' or 'dark'.
             */
            Lakeus.switchColorScheme = function (scheme) {
                if (Lakeus.colorSchemes.indexOf(scheme) === -1 || scheme === Lakeus.colorSchemeMode) {
                    return;
                }
                // Flush the form into the scheme being left behind before moving on.
                Lakeus.updateVariablesListFromForm();
                Lakeus.colorSchemeMode = scheme;
                Lakeus.recalculateAutoVariables();
                Lakeus.updateFormFromVariablesList();
            };

            /**
             * Radio pair choosing which colour scheme's values the form edits.
             *
             * The skin always renders both schemes from the same stylesheet, so the
             * designer has to let the author pick which one they are filling in.
             *
             * @return {string} HTML.
             */
            function constructColorSchemeSelector() {
                var result = '<fieldset class="lakeus-theme-designer-fieldset ' +
                    'lakeus-theme-designer-color-scheme-fieldset" ' +
                    'id="lakeus-theme-designer-fieldset-color-scheme">' +
                    '<legend class="lakeus-theme-designer-title">' +
                    mw.message("lakeus-theme-designer-color-scheme").escaped() +
                    '</legend>';
                Lakeus.colorSchemes.forEach(function (scheme) {
                    result +=
                        '<label>' +
                            '<input type="radio" class="lakeus-theme-designer-color-scheme-radio" ' +
                                'name="lakeus-theme-designer-color-scheme" value="' + scheme + '"' +
                                (scheme === Lakeus.colorSchemeMode ? ' checked' : '') + '>' +
                            mw.message("lakeus-theme-designer-color-scheme-" + scheme).escaped() +
                        '</label>';
                });
                return result + '</fieldset>';
            }

            function constructThemeDesignerBody() {
                var fieldsetList = [];
                var result = '';
                $.each(Lakeus.variablesList, function (k, v) {
                    if (!(fieldsetList.includes(v.fieldset))) {
                        fieldsetList.push(v.fieldset);
                    }
                })
                fieldsetList.forEach(function (fieldset) {
                    var fieldsetElement = '<fieldset class="lakeus-theme-designer-fieldset" id="lakeus-theme-designer-fieldset-' + fieldset + '">';
                    var legendElement = '<legend class="lakeus-theme-designer-title">' + mw.message(fieldset).escaped() + '</legend>';
                    var settingsElement = '';
                    $.each(Lakeus.variablesList, function (k, v) {
                        if (v.fieldset === fieldset) {
                            settingsElement += constructVariableItem(k, v);
                        }
                    });
                    fieldsetElement += legendElement + settingsElement + '</fieldset>';
                    result += fieldsetElement;
                });
                return result;
            }

            /**
             * Escape a value for a double-quoted HTML attribute or element body.
             *
             * The text variables hold arbitrary CSS - font stacks with quotes in
             * them, filter chains - so their defaults must not be concatenated raw.
             *
             * @param {*} value
             * @return {string}
             */
            function escapeAttribute(value) {
                return mw.html.escape(String(value));
            }

            function constructVariableItem(variableName, variableContent) {
                var settingElement = '<p class="lakeus-theme-designer-variable-section" id="lakeus-theme-designer-variable-section-' + variableName + '">';
                if (variableContent.input === 'color') {
                    settingElement +=
                        '<label>' +
                            mw.message('lakeus-theme-designer-' + variableName).escaped() +
                            '<input type="color" class="lakeus-theme-designer-input-color" list="'+ (variableContent.datalist ? variableContent.datalist : "lakeus-theme-designer-preset-colors") +'" name="' + variableName + '" id="lakeus-theme-designer-input-' + variableName + '" value="' + variableContent.default.hex('rgb') + '" />' +
                            (variableContent.allowAlpha ? '<input type="number" placeholder="' + mw.message("lakeus-theme-designer-alpha-channel").escaped() + '" class="lakeus-theme-designer-input-alpha" step="0.01" min="0" max="1" name="' + variableName + '-alpha" id="lakeus-theme-designer-input-' + variableName + '-alpha" value="' + variableContent.default.alpha() + '" />' : "") +
                        '</label>';
                } else if (variableContent.input === 'text') {
                    settingElement +=
                        '<label>' +
                            mw.message('lakeus-theme-designer-' + variableName).escaped() +
                            '<input type="text" class="lakeus-theme-designer-input-text" name="' + variableName + '" id="lakeus-theme-designer-input-' + variableName + '" value="' + escapeAttribute(variableContent.default) + '" />' +
                        '</label>';
                } else if (variableContent.input === 'textarea') {
                    // Nothing uses this yet, but <input type="textarea"> is not a real
                    // input type; a proper <textarea> is what the stylesheet and the
                    // form-reading code both expect.
                    settingElement +=
                        '<label>' +
                            mw.message('lakeus-theme-designer-' + variableName).escaped() +
                            '<textarea class="lakeus-theme-designer-input-textarea" name="' + variableName + '" id="lakeus-theme-designer-input-' + variableName + '">' + escapeAttribute(variableContent.default) + '</textarea>' +
                        '</label>';
                }

                if (variableContent.rule["autoCalculate"] === 'calculateWhenNotNeeded') {
                    settingElement +=
                        '<label>' +
                            '<input checked type="checkbox" class="lakeus-theme-designer-auto-calculate-checkbox" name="' + 'auto-calculate-' + variableName + '" id="lakeus-theme-designer-input-auto-calculate-' + variableName + '">' +
                            mw.message('lakeus-theme-designer-auto-calculate').escaped() +
                        '</label>';
                } else if (variableContent.rule["autoCalculate"] === 'calculateWhenNeeded') {
                    settingElement +=
                        '<label>' +
                            '<input type="checkbox" class="lakeus-theme-designer-auto-calculate-checkbox" name="' + 'auto-calculate-' + variableName + '" id="lakeus-theme-designer-input-auto-calculate-' + variableName + '">' +
                            mw.message('lakeus-theme-designer-auto-calculate').escaped() +
                        '</label>';
                }

                if (!variableContent.rule["generateByDefault"]) {
                    settingElement +=
                        '<label>' +
                            '<input checked type="checkbox" class="lakeus-theme-designer-do-not-generate-checkbox" name="' + 'do-not-generate-' + variableName + '" id="lakeus-theme-designer-input-do-not-generate-' + variableName + '">' +
                            mw.message('lakeus-theme-designer-do-not-generate').escaped() +
                        '</label>';
                } else if (variableContent.rule["generateByDefault"]) {
                    settingElement +=
                        '<label>' +
                            '<input type="checkbox" class="lakeus-theme-designer-do-not-generate-checkbox" name="' + 'do-not-generate-' + variableName + '" id="lakeus-theme-designer-input-do-not-generate-' + variableName + '">' +
                            mw.message('lakeus-theme-designer-do-not-generate').escaped() +
                        '</label>';
                }

                settingElement += '</p>'
                return settingElement;
            }

            Lakeus.constructColorDatalist = function (id, presetColors) {
                id = id || 'lakeus-theme-designer-preset-colors';
                // community-background-color (27)
                presetColors = presetColors || ["#9cd6cc","#1b2a34","#1e5aa8","#1c58a7","#58ab41","#9dc3f7","#fcac00","#ffec6c","#ff9ecd","#8a12a8","#543324","#645a4c","#6c96bf","#dfc176","#3cb371","#aa4d8e","#cecece","#764d3b","#ff6d77","#469bc3","#19325a","#0e3e9a","#646464","#352100","#ad6140","#00451a","#545955","#91501c","#d3359d","#720012","#897d62","#069d9f","#d86d2c","#7f7f7f","#d0d0d0","#ae7a59","#d27744","#cf8a47","#78fc78","#ff8014","#ff94c2","#83724f","#898788","#bb805a","#ffffff","#923978","#8c00ff","#e0ffb0","#bdc6ad","#f5f3d7","#00852b","#cda4de","#d3f2ea","#97cbd9","#969696","#ffc995","#add9a8","#8a928d","#deea92","#f9a777","#fa9c1c","#fecccf","#f9b7a5","#00aaa4","#afbed6","#ffd67f","#564e9d","#a5ca18","#abd9ff","#901f76","#656761","#ffff80","#68c3e2","#7396c8","#aa7d55","#f785b1","#7fc475","#a06eb9","#441a91","#b7d425","#f58624","#4861ac","#5b7590","#0a1327","#d60026","#c27f53","#008e3c","#6d6e5c","#dbac34","#6a7944","#767676","#eeeeee","#77774e","#d67923","#484d48","#aa7f2e","#deac66","#a0a0a0","#989b99","#f6f2df","#f6a9bb","#671f81","#b40000","#5f3109","#ac8247","#8e5597","#fcfcfc","#f5cd2f","#f4f4f4","#fac80a","#872b17","#f06d61","#70819a","#708e7c","#75657d","#88605e","#77c9d8","#ab6038","#b0a06f","#635f52","#000000","#56e646","#fcb76d","#96709f","#0020a0","#df6695","#fbe890","#237841","#aee9ef","#6babe4","#7dc291","#559ab7","#c0ff00","#ff800d","#dab000","#f08f1c","#fc97ac","#a5a5cb","#c91a09","#c281a5","#c1dff0","#c8c8c8","#bcb4a5","#fdc383","#26469a","#e2f99a",];
                var result = '<datalist id="'+ id +'">';
                for (var i = 0; i < presetColors.length; i++) {
                    result += '<option value="' + presetColors[i] + '">';
                }
                result += '</datalist>';
                return result;
            }

            function constructThemeDesigner() {
                $("body").append(
                    '<div id="lakeus-theme-designer">' +
                        '<div id="lakeus-theme-designer-portlet" aria-labelledby="lakeus-theme-designer-modal-button">' +
                            '<input type="checkbox" id="lakeus-theme-designer-modal-checkbox-hack" aria-labelledby="lakeus-theme-designer-modal-button">' +
                            '<button id="lakeus-theme-designer-modal-button">🖌️</button>' +
                            '<form id="lakeus-theme-designer-portlet-body">' +
                                '<div id="lakeus-theme-designer-portlet-body-container">' +
                                    '<h1 id="lakeus-theme-designer-title">' + mw.message("lakeus-theme-designer").escaped() + '</h1>' +
                                    constructColorSchemeSelector() +
                                    Lakeus.constructColorDatalist() +
                                    constructThemeDesignerBody() +
                                    '<fieldset class="lakeus-theme-designer-fieldset" id="lakeus-theme-designer-fieldset-danger-zone">' +
                                        '<legend class="lakeus-theme-designer-title">' + mw.message("lakeus-theme-designer-danger-zone").escaped() + '</legend>' +
                                        '<button type="button" id="lakeus-theme-designer-reset-theme-button" class="lakeus-theme-designer-action-button lakeus-theme-designer-action-button-danger">' + mw.message("lakeus-theme-designer-reset-theme").escaped() +
                                        '</button>' +
                                        '<button type="button" id="lakeus-theme-designer-reload-button" class="lakeus-theme-designer-action-button lakeus-theme-designer-action-button-danger">' + mw.message("lakeus-theme-designer-reload").escaped() +
                                        '</button>' +
                                        '<button type="button" id="lakeus-theme-designer-invert-auto-calculate-selection-button" class="lakeus-theme-designer-action-button lakeus-theme-designer-action-button-danger">' + mw.message("lakeus-theme-designer-invert-auto-calculate-selection").escaped() +
                                        '</button>' +
                                        '<button type="button" id="lakeus-theme-designer-unselect-do-not-generate-selection-button" class="lakeus-theme-designer-action-button lakeus-theme-designer-action-button-danger">' + mw.message("lakeus-theme-designer-unselect-do-not-generate-selection").escaped() +
                                        '</button>' +
                                        '<label>' +
                                            '<input type="checkbox" id="lakeus-theme-designer-color-picker-fallback-checkbox">' +
                                            mw.message("lakeus-theme-designer-color-picker-fallback").escaped() +
                                        '</label>' +
                                    '</fieldset>' +
                                    '<div id="lakeus-theme-designer-result">' +
                                    '</div>' +
                                    '<div id="lakeus-theme-designer-action-buttons">' +
                                        '<button type="button" id="lakeus-theme-designer-copy-theme-button" class="lakeus-theme-designer-action-button">' + mw.message("lakeus-theme-designer-copy-theme").escaped() +
                                        '</button>' +
                                        '<button type="button" id="lakeus-theme-designer-test-theme-button" class="lakeus-theme-designer-action-button">' + mw.message("lakeus-theme-designer-test-theme").escaped() +
                                        '</button>' +
                                        '<button type="button" id="lakeus-theme-designer-paste-theme-button" class="lakeus-theme-designer-action-button">' + mw.message("lakeus-theme-designer-paste-theme").escaped() +
                                        '</button>' +
                                        '<button type="button" disabled id="lakeus-theme-designer-clear-theme-button" class="lakeus-theme-designer-action-button">' + mw.message("lakeus-theme-designer-clear-theme").escaped() +
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
                $(".lakeus-theme-designer-do-not-generate-checkbox").on('change', function() {
                    var checked = $(this).prop('checked');
                    $("#" + $(this).attr("name").replace("do-not-generate-", "lakeus-theme-designer-input-")).data('skipped', checked);
                    $("#" + $(this).attr("name").replace("do-not-generate-", "lakeus-theme-designer-input-") + "-alpha").data('skipped', checked);
                    $("#" + $(this).attr("name").replace("do-not-generate-", "lakeus-theme-designer-input-auto-calculate-")).data('skipped', checked);
                });
                $(".lakeus-theme-designer-do-not-generate-checkbox:checked").each(function () {
                    $("#" + $(this).attr("name").replace("do-not-generate-", "lakeus-theme-designer-input-")).data('skipped', true);
                    $("#" + $(this).attr("name").replace("do-not-generate-", "lakeus-theme-designer-input-") + "-alpha").data('skipped', true);
                    $("#" + $(this).attr("name").replace("do-not-generate-", "lakeus-theme-designer-input-auto-calculate-")).data('skipped', true);
                });
                $("#lakeus-theme-designer-color-picker-fallback-checkbox").on('change', function () {
                    var checked = $(this).prop('checked');
                    $(".lakeus-theme-designer-input-color").attr("type", (checked ? "text" : "color"));
                });
                $("#lakeus-theme-designer-copy-theme-button").click(function (e) { e.preventDefault(); Lakeus.copyTheme(); });
                $("#lakeus-theme-designer-paste-theme-button").click(function (e) { e.preventDefault(); Lakeus.pasteThemeFromCurrentSettings(); });
                $("#lakeus-theme-designer-test-theme-button").click(function (e) { e.preventDefault(); Lakeus.testTheme(); });
                $("#lakeus-theme-designer-clear-theme-button").click(function (e) { e.preventDefault(); Lakeus.clearTheme(); });
                $("#lakeus-theme-designer-reset-theme-button").click(function (e) { e.preventDefault(); Lakeus.resetFormFromVariablesList(); });
                $("#lakeus-theme-designer-reload-button").click(function (e) { e.preventDefault(); Lakeus.reloadThemeDesigner(); });
                $("#lakeus-theme-designer-invert-auto-calculate-selection-button").click(function (e) { e.preventDefault(); Lakeus.invertAutoCalculateSelection(); });
                $("#lakeus-theme-designer-unselect-do-not-generate-selection-button").click(function (e) { e.preventDefault(); Lakeus.unselectDoNotGenerateSelection(); });
                // Without this, pressing Enter in a text field would submit the form
                // and reload the page, throwing away the theme being edited.
                $("#lakeus-theme-designer-portlet-body").submit(function (e) { e.preventDefault(); });
                $(".lakeus-theme-designer-color-scheme-radio").on('change', function () {
                    Lakeus.switchColorScheme($(this).val());
                });
                Lakeus.updateVariablesListFromForm();
            }
            // themeDesigner.css ships with this module as a ResourceLoader style,
            // so it is versioned and cached with the script. It used to be injected
            // here as a <link> built from mw.config.get('stylepath') + '/Lakeus/...',
            // which hard-coded the skin's directory name.
            //
            // Must run before the form is built: the form reads each variable's
            // per-scheme value.
            Lakeus.initColorSchemes();
            constructThemeDesigner();
            console.log("[Lakeus] " + mw.message('lakeus-theme-designer-all-loaded'));
        }());
    });
};

/* Moving these functions into the init function */

Lakeus.updateVariablesListFromForm = function () {
    $.each(Lakeus.variablesList, function (k, v) {
        var inputElement = $("#lakeus-theme-designer-input-" + k);
        if (!(inputElement.data('skipped'))) {
            if (!(inputElement.prop('disabled'))) {
                if (inputElement.attr('type') === 'color') {
                    var inputElementAlpha = $("#lakeus-theme-designer-input-" + k + "-alpha");
                    Lakeus.variablesList[k].value = chroma(inputElement.val()).alpha((Number(inputElementAlpha.val()) <= 1 && Number(inputElementAlpha.val()) >= 0) ? Number(inputElementAlpha.val()) : 1);
                } else {
                    Lakeus.variablesList[k].value = inputElement.val();
                }
            } else {
                Lakeus.variablesList[k].value = Lakeus.variablesList[k].calculate(undefined);
            }
            Lakeus.variablesList[k].skipped = false;
        } else {
            Lakeus.variablesList[k].skipped = true;
        }
    });
};

Lakeus.updateFormFromVariablesList = function () {
    $.each(Lakeus.variablesList, function (k, v) {
        var inputElement = $("#lakeus-theme-designer-input-" + k);
        if (!v.skipped) {
            if (v.value) {
                if (v.input === 'color') {
                    inputElement.val(v.value.hex('rgb'));
                    $("#lakeus-theme-designer-input-" + k + "-alpha").val(v.value.alpha());
                } else {
                    inputElement.val(v.value);
                }
            }
        }
    })
}

/**
 * Restore every variable, in every colour scheme, to the skin default.
 *
 * The danger-zone button resets the whole theme rather than only the scheme on
 * screen, so a half-edited dark palette cannot survive a reset invisibly.
 */
Lakeus.resetFormFromVariablesList = function () {
    $.each(Lakeus.variablesList, function (k, v) {
        Lakeus.colorSchemes.forEach(function (scheme) {
            v.values[scheme] = v.defaults[scheme];
        });
    });
    Lakeus.recalculateAutoVariables();
    Lakeus.updateFormFromVariablesList();
}

/**
 * Render one `--<name>-<scheme>: value;` declaration.
 *
 * @param {string} name Variable name.
 * @param {string} scheme 'light' or 'dark'.
 * @param {Object} variable Entry from Lakeus.variablesList.
 * @return {string} Declaration including trailing newline, or '' if valueless.
 */
Lakeus.formatThemeDeclaration = function (name, scheme, variable) {
    var value = variable.values[scheme];
    if (value === undefined || value === null || value === '') {
        return '';
    }
    if (variable.input === 'color') {
        return '    --' + name + '-' + scheme + ': ' +
            (value.alpha() < 1 ? value.css() : value.hex()) + ';\n';
    }
    return '    --' + name + '-' + scheme + ': ' + value + ';\n';
};

/**
 * Build the stylesheet the user copies into their CSS page.
 *
 * Output is a single `:root` block declaring both halves of every variable, e.g.
 *
 *     :root {
 *         --color-primary-light: #3366cc;
 *         --color-primary-dark: #9dc3f7;
 *     }
 *
 * The skin's own `.theme-light()` / `.theme-dark()` mixins do the rest, so this
 * covers the explicit-dark scheme, the wiki-default-dark scheme and automatic
 * `prefers-color-scheme` at once - the dark values do not have to be repeated
 * under each of those selectors.
 *
 * @return {string}
 */
Lakeus.generateTheme = function () {
    var result = ':root {\n';
    $.each(Lakeus.variablesList, function (k, v) {
        if (!v.skipped) {
            Lakeus.colorSchemes.forEach(function (scheme) {
                result += Lakeus.formatThemeDeclaration(k, scheme, v);
            });
        }
    });
    result += '}\n';
    return result;
}

/**
 * Show the generated stylesheet in the panel.
 *
 * Used when the clipboard is unavailable or the write was refused, so the user
 * can still select and copy the CSS by hand.
 *
 * @param {string} generatedCode
 */
Lakeus.showGeneratedTheme = function (generatedCode) {
    var $pre = $("<pre>");
    $pre.attr("id", "lakeus-theme-designer-result-pre-element");
    $pre.text(generatedCode);
    $("#lakeus-theme-designer-result").empty().append($pre);
};

Lakeus.copyTheme = function () {
    if (!($("body").attr("testing") === 'true')) {
        Lakeus.updateVariablesListFromForm();
    }

    var generatedCode = Lakeus.generateTheme();
    if (navigator.clipboard) {
        navigator.clipboard.writeText(generatedCode).then(function () {
            mw.notify(mw.message("lakeus-theme-designer-copied"));
        }, function () {
            mw.notify(mw.message("lakeus-theme-designer-copy-failed"));
            Lakeus.showGeneratedTheme(generatedCode);
        });
    } else {
        mw.notify(mw.message("lakeus-theme-designer-copy-failed"));
        Lakeus.showGeneratedTheme(generatedCode);
    }
}

/**
 * Load the values the page is currently rendering with into the form.
 *
 * Reads the scheme-specific half the skin declares, falling back to the resolved
 * `--<name>` for anything the skin does not split per scheme.
 */
Lakeus.pasteThemeFromCurrentSettings = function () {
    var scheme = Lakeus.colorSchemeMode;
    $.each(Lakeus.variablesList, function (k, v) {
        var raw = Lakeus.getSkinVariableValue(k, scheme);
        if (raw === null) {
            raw = window.getComputedStyle(document.documentElement)
                .getPropertyValue('--' + k).trim() || null;
        }
        v.value = Lakeus.parseVariableValue(raw, v, v.default);
    })
    Lakeus.updateFormFromVariablesList();
}

/**
 * Paint both colour schemes onto <html> as inline custom properties.
 *
 * Inline declarations outrank every stylesheet, so the skin's own
 * `.theme-light()` / `.theme-dark()` mixins immediately resolve against the
 * previewed values in whichever scheme is active - including when the reader
 * switches scheme while the preview is up. Skipped variables are explicitly
 * removed rather than set, so the preview matches what generateTheme() emits.
 */
Lakeus.applyThemeToDocument = function () {
    var html = document.documentElement;
    $.each(Lakeus.variablesList, function (k, v) {
        Lakeus.colorSchemes.forEach(function (scheme) {
            var property = '--' + k + '-' + scheme;
            var value = v.values[scheme];
            if (v.skipped || value === undefined || value === null || value === '') {
                html.style.removeProperty(property);
                return;
            }
            html.style.setProperty(property, v.input === 'color'
                ? (value.alpha() < 1 ? value.css() : value.hex())
                : value);
        });
    });
};

Lakeus.testTheme = function () {
    Lakeus.updateVariablesListFromForm();
    Lakeus.updateFormFromVariablesList();
    $("body").attr("testing", "true");
    $("#lakeus-theme-designer-test-theme-button").prop('disabled', true);
    $("#lakeus-theme-designer-clear-theme-button").prop('disabled', false);
    // The colour scheme selector stays live so both schemes can be previewed.
    $(".lakeus-theme-designer-fieldset").not(".lakeus-theme-designer-color-scheme-fieldset")
        .prop('disabled', true);
    Lakeus.applyThemeToDocument();
}

Lakeus.clearTheme = function () {
    $("body").attr("testing", "false");
    $("#lakeus-theme-designer-test-theme-button").prop('disabled', false);
    $("#lakeus-theme-designer-clear-theme-button").prop('disabled', true);
    $(".lakeus-theme-designer-fieldset").prop('disabled', false);
    var html = document.documentElement;
    $.each(Lakeus.variablesList, function (k, v) {
        Lakeus.colorSchemes.forEach(function (scheme) {
            html.style.removeProperty('--' + k + '-' + scheme);
        });
    });
}

Lakeus.invertAutoCalculateSelection = function () {
    $(".lakeus-theme-designer-auto-calculate-checkbox").each(function () {
        var checked = $(this).prop('checked');
        $(this).prop('checked', !checked).trigger('change');
    });
}

Lakeus.unselectDoNotGenerateSelection = function () {
    $(".lakeus-theme-designer-do-not-generate-checkbox").each(function () {
        var checked = $(this).prop('checked');
        if (checked) {
            $(this).prop('checked', false).trigger('change');
        }
    });
}

/**
 * Tear the panel down. The stylesheet is part of this ResourceLoader module and
 * is deliberately left alone; it is scoped to the panel's own ids, so it costs
 * nothing once the markup is gone.
 */
Lakeus.unloadThemeDesigner = function () {
    $("#lakeus-theme-designer").remove();
}

Lakeus.reloadThemeDesigner = function () {
    Lakeus.unloadThemeDesigner();
    Lakeus.initThemeDesigner();
}

Lakeus.validateContrast = function (color1, color2, contrast) {
    return (chroma.contrast(color1, color2) >= (contrast || 4.5) ? true : false)
}

/* Load Theme Designer when enabled in user's preferences */

$.when(mw.loader.using(['mediawiki.api', 'mediawiki.jqueryMsg', 'user.options']), $.ready).then(function () {
    if (mw.user.options.get('lakeus-enable-theme-designer')) {
        Lakeus.initThemeDesigner();
    }
});

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
            "lakeus-theme-designer-color-primary--hover",
            "lakeus-theme-designer-color-primary--active",
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
        Lakeus.setupThemeDesigner();
    });
};

/**
 * Assemble the Theme Designer panel, once the system messages have loaded
 * and the vendored chroma.js module is ready.
 */
Lakeus.setupThemeDesigner = function () {

        /**
         * Pick the value that contrasts with `background`.
         *
         * Named after what it does rather than after the two default arguments:
         * the parameters used to be called `black` / `white`, but callers pass CSS
         * filter strings such as `'invert(1) hue-rotate(180deg)'` and chroma
         * luminance numbers through them just as often, so the old names described
         * the common case rather than the parameter.
         *
         * Returns `onLightBackground` when the background is light (YIQ >= 128) and
         * `onDarkBackground` when it is dark; omitted, those are `#000000` and
         * `#ffffff`. The built-in pair is a plain hex string, while explicit
         * candidates are returned as given, which is what lets the icon filters
         * work.
         *
         * The YIQ formula is left as it was - the 50% contrast method behaves
         * differently enough that switching would change every derived colour.
         *
         * @param {Object} background A chroma colour.
         * @param {*} [onLightBackground]
         * @param {*} [onDarkBackground]
         * @return {*}
         */
        Lakeus.pickForBackground = function (background, onLightBackground, onDarkBackground) {
            var hexcolor = background.hex("rgb").replace("#", "");
            var r = parseInt(hexcolor.substr(0, 2), 16);
            var g = parseInt(hexcolor.substr(2, 2), 16);
            var b = parseInt(hexcolor.substr(4, 2), 16);
            var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
            return (yiq >= 128) ?
                (onLightBackground !== undefined ? onLightBackground : '#000000') :
                (onDarkBackground !== undefined ? onDarkBackground : '#ffffff');
        }

        /**
         * Composite a translucent colour onto a background, the way the browser
         * will, and return the resulting opaque colour.
         *
         * `over` may be omitted, in which case plain white is assumed.
         *
         * @param {Object} front A chroma colour, possibly with alpha.
         * @param {Object} [over] A chroma colour.
         * @return {Object} A chroma colour.
         */
        Lakeus.flattenColor = function (front, over){

            var rtrn = {};
            //allows the function to just accept a front colour and assume the background is a plain white.
            over = over || chroma([255, 255, 255]);

            //allows a RGB value to be passed in assuming full alpha channel.
            front.alpha(front.alpha() || 1);

            //normalise the alpha channel across the foreground and background.
            rtrn.r = ((1 - front.alpha()) * over.get("rgb.r")) + (front.alpha() * front.get("rgb.r"));
            rtrn.g = ((1 - front.alpha()) * over.get("rgb.g")) + (front.alpha() * front.get("rgb.g"));
            rtrn.b = ((1 - front.alpha()) * over.get("rgb.b")) + (front.alpha() * front.get("rgb.b"));

            //just check that we don't end up with a value greater than 255 for any channel.
            rtrn.r = (rtrn.r > 255) ? 255 : rtrn.r;
            rtrn.g = (rtrn.g > 255) ? 255 : rtrn.g;
            rtrn.b = (rtrn.b > 255) ? 255 : rtrn.b;

            return chroma(rtrn);

        }

        /**
         * Move a colour away from a background's brightness, so it keeps contrasting
         * with it: brighten when the background is dark, darken when it is light.
         *
         * The two amounts are separate parameters because they are separately
         * meaningful. Most rules in the table pass the same number for both, but
         * that is a property of the current palette rather than of the rule, and
         * four of them do not.
         *
         * @param {Object} colour A chroma colour.
         * @param {Object} background A chroma colour.
         * @param {number} brightenIfDark
         * @param {number} darkenIfLight
         * @return {Object} A chroma colour.
         */
        Lakeus.nudgeForContrast = function (colour, background, brightenIfDark, darkenIfLight) {
            var backgroundIsDark = Lakeus.pickForBackground(background, "black", "white") === "white";
            return backgroundIsDark ? colour.brighten(brightenIfDark) : colour.darken(darkenIfLight);
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
         * Record, per scheme, the source values a variable was last derived from.
         *
         * This is what makes derivation dependency-scoped rather than wholesale:
         * a variable is recomputed only when one of the values its `calculate()`
         * rule reads has actually moved. Two earlier approaches were worse -
         * recomputing every rule on every scheme visit overwrote the skin's
         * authored dark palette, and gating on "the author touched this scheme"
         * meant un-ticking one "auto calculate" box recomputed all 74 of them.
         *
         * `null` means "never derived in this scheme", so the rule runs once.
         * Populated for dark by initColorSchemes(), because the skin hands over a
         * finished dark palette that is already self-consistent.
         */

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
         *
         * Re-entrant: setupThemeDesigner() runs again when the reader presses
         * reload, so this runs more than once over the same table. On the second
         * pass `default` and `value` are already accessors that resolve against
         * whichever scheme is being edited, so reading them would copy the dark
         * palette into the light slot. The stored slots are read directly instead,
         * and re-seeding `values` from `defaults` is exactly what the first pass
         * did - every entry's literal `value` and `default` are the same
         * expression.
         */
        Lakeus.initColorSchemes = function () {
            var missingDark = [];
            $.each(Lakeus.variablesList, function (k, v) {
                // Per-variable UI state lives on the variable, not in the DOM. It is
                // initialised here because this runs before the form exists; a
                // reload runs it again, which is right, since a reload starts over.
                v.skipped = false;
                v.autoCalculateOn = (v.rule || {}).autoCalculate === 'calculateWhenNotNeeded';

                var lightDefault = v.defaults ? v.defaults.light : v.default;
                var darkRaw = Lakeus.getSkinVariableValue(k, 'dark');
                if (darkRaw === null) {
                    missingDark.push(k);
                }
                var darkDefault = Lakeus.parseVariableValue(darkRaw, v, lightDefault);

                v.defaults = { light: lightDefault, dark: darkDefault };
                v.values = { light: lightDefault, dark: darkDefault };
                // Light is left unrecorded so the rules run over this table's own
                // literals, exactly as they always did; dark is recorded below.
                v.derivedFrom = { light: null, dark: null };

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
            // The skin hands over a finished dark palette, so treat it as already
            // consistent: nothing there is recomputed until a source moves.
            Lakeus.markSchemeInSync('dark');
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
            return !!v.autoCalculateOn;
        };

        /**
         * Whether a variable's "do not generate" box is ticked, i.e. whether it is
         * left out of the generated stylesheet.
         *
         * Kept on the variable rather than read from the DOM for the same reason as
         * `autoCalculateOn`: the panel is a view over Lakeus.variablesList, and
         * state that only exists in the markup disappears whenever the markup is
         * rebuilt.
         *
         * @param {Object} v Entry from Lakeus.variablesList.
         * @return {boolean}
         */
        Lakeus.isSkipped = function (v) {
            return !!v.skipped;
        };

        /**
         * Push every variable's UI state onto the form.
         *
         * The direction matters: the variables hold the state and the markup
         * follows. Everything that used to read a checkbox or a `data()` flag now
         * reads the variable, so the two can no longer disagree, and replacing the
         * markup no longer loses anything.
         */
        Lakeus.syncVariableUiState = function () {
            $.each(Lakeus.variablesList, function (k, v) {
                // Disabled only mirrors the auto-calculate box; it is presentation,
                // never read back. Reading it back is what once let a disabled
                // fieldset turn a user value into a derived one.
                //
                // The checkboxes are not written here. They are controlled Codex
                // components rendering from the variable, and this function used to
                // set their `checked` by id - which stopped working the moment the
                // markup became components, and which was the thing that once left
                // all 78 auto-calculate boxes unticked.
                $("#lakeus-theme-designer-input-" + k).prop('disabled', !!v.autoCalculateOn);
                $("#lakeus-theme-designer-input-" + k + "-alpha").prop('disabled', !!v.autoCalculateOn);
            });
        };

        /**
         * A fingerprint of the values a variable's calculate() rule reads.
         *
         * The sources come from the rule itself: every rule built through
         * themeDesigner.rules.js carries a `.sources` list naming the variables it
         * reads, so there is no parallel `calculateFrom` array to keep in step and
         * no positional coupling to get wrong. A rule that declares no sources is
         * never treated as up to date, so it keeps being recomputed - the safe
         * default for a rule whose inputs cannot be enumerated.
         *
         * @param {Object} v Entry from Lakeus.variablesList.
         * @param {string} scheme Which scheme's values to fingerprint.
         * @return {?string} Null when the variable declares no sources.
         */
        Lakeus.sourceFingerprint = function (v, scheme) {
            var names = (v.calculate && v.calculate.sources) || v.calculateFrom || [];
            if (names.length === 0) {
                return null;
            }
            return names.map(function (name) {
                var source = Lakeus.variablesList[name];
                return name + '=' + (source ? String(source.values[scheme]) : '?');
            }).join('|');
        };

        /**
         * Declare a scheme's derived values to be in step with their sources.
         *
         * Used for the skin-seeded dark palette, which arrives already internally
         * consistent, and after a reset that restores it. Without this the first
         * pass would run every rule over the skin's palette and replace good
         * authored colours with the heuristics' opaque approximations.
         *
         * @param {string} scheme
         */
        Lakeus.markSchemeInSync = function (scheme) {
            $.each(Lakeus.variablesList, function (k, v) {
                v.derivedFrom[scheme] = Lakeus.isAutoCalculated(k, v)
                    ? Lakeus.sourceFingerprint(v, scheme)
                    : null;
            });
        };

        /**
         * Bring the derived variables in the scheme being edited up to date.
         *
         * Two order concerns are handled here. First, only variables whose sources
         * have actually moved are recomputed, so editing one value cannot churn a
         * palette - and in dark it cannot replace the skin's authored colours with
         * the heuristics' approximations. Second, the rules are order-dependent:
         * 13 of them read a source that appears LATER in the list -
         * color-link--visited and friends (index 14-33) read background-color-body
         * at index 47 - so the pass repeats until the values stop moving rather
         * than trusting list order.
         */
        Lakeus.recalculateAutoVariables = function () {
            var scheme = Lakeus.colorSchemeMode;
            // Generous cap; real chains are three deep (color-secondary ->
            // background-color-body -> color-link--visited).
            var maxPasses = 10;
            for (var pass = 0; pass < maxPasses; pass++) {
                var changed = false;
                $.each(Lakeus.variablesList, function (k, v) {
                    if (!Lakeus.isAutoCalculated(k, v)) {
                        return;
                    }
                    var fingerprint = Lakeus.sourceFingerprint(v, scheme);
                    if (fingerprint !== null && v.derivedFrom[scheme] === fingerprint) {
                        // Sources unchanged since the last derivation.
                        return;
                    }
                    var next = v.calculate(undefined);
                    // String comparison is enough to detect convergence: if two
                    // values render identically they produce identical CSS anyway.
                    if (String(next) !== String(v.value)) {
                        changed = true;
                    }
                    v.value = next;
                    v.derivedFrom[scheme] = fingerprint;
                });
                if (!changed) {
                    break;
                }
            }
        };

        /**
         * Bring a specific scheme's derived values up to date, whichever scheme
         * the author happens to be editing.
         *
         * calculate() rules read their sources through `value`, which resolves
         * against the scheme being edited, so the mode is switched for the
         * duration and restored afterwards.
         *
         * @param {string} scheme
         */
        Lakeus.recalculateScheme = function (scheme) {
            var previous = Lakeus.colorSchemeMode;
            Lakeus.colorSchemeMode = scheme;
            Lakeus.recalculateAutoVariables();
            Lakeus.colorSchemeMode = previous;
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

        /**
         * The empty fieldsets the Vue components mount into.
         *
         * This used to build every variable's markup as a string, and the Vue
         * module would replace a fieldset's contents after the fact. That left two
         * renderers to keep in step, so the markup is gone and only the hosts
         * remain: Vue renders the legend and the items into each one.
         *
         * There is deliberately no fallback to the generated markup. This module
         * depends on `skins.lakeus.theme.designer.vue`, and ResourceLoader treats
         * dependencies as hard, so a Vue failure means this module never runs
         * either - a fallback could not be reached to save anything.
         *
         * @return {string}
         */
        function constructThemeDesignerBody() {
            var fieldsetList = [];
            var result = '';
            $.each(Lakeus.variablesList, function (k, v) {
                // ES2016; the browsers this skin supports do not all have it.
                if (fieldsetList.indexOf(v.fieldset) === -1) {
                    fieldsetList.push(v.fieldset);
                }
            })
            fieldsetList.forEach(function (fieldset) {
                result += '<fieldset class="lakeus-theme-designer-fieldset" id="lakeus-theme-designer-fieldset-' + fieldset + '"></fieldset>';
            });
            return result;
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
            // Delegated, bound once on the panel rather than per element at
            // construction time. The panel's state lives on the variables now, and
            // the handlers only move it between the two; binding per element meant
            // that anything which replaces the markup - a re-render, or the Vue
            // fieldset the rewrite is heading towards - silently lost the handlers
            // along with the elements they were attached to.
            var panelElement = $("#lakeus-theme-designer");
            // The two checkboxes need no handler here any more. They are controlled
            // Codex components: the component reports the new value, vue.js writes
            // it to the variable, and the input's disabled state is bound from the
            // same variable, so nothing has to read the DOM back.
            Lakeus.syncVariableUiState();
            // Everything below is delegated on the panel root too, for the same
            // reason. These used to be bound per element with `.click()` and
            // `$().on()`, which meant any element Vue re-rendered silently lost its
            // handler - the buttons would simply stop working.
            panelElement.on('change', '#lakeus-theme-designer-color-picker-fallback-checkbox', function () {
                var checked = $(this).prop('checked');
                $(".lakeus-theme-designer-input-color").attr("type", (checked ? "text" : "color"));
            });
            var actions = {
                'lakeus-theme-designer-copy-theme-button': Lakeus.copyTheme,
                'lakeus-theme-designer-paste-theme-button': Lakeus.pasteThemeFromCurrentSettings,
                'lakeus-theme-designer-test-theme-button': Lakeus.testTheme,
                'lakeus-theme-designer-clear-theme-button': Lakeus.clearTheme,
                'lakeus-theme-designer-reset-theme-button': Lakeus.resetFormFromVariablesList,
                'lakeus-theme-designer-reload-button': Lakeus.reloadThemeDesigner,
                'lakeus-theme-designer-invert-auto-calculate-selection-button': Lakeus.invertAutoCalculateSelection,
                'lakeus-theme-designer-unselect-do-not-generate-selection-button': Lakeus.unselectDoNotGenerateSelection
            };
            Object.keys(actions).forEach(function (id) {
                panelElement.on('click', '#' + id, function (e) {
                    e.preventDefault();
                    actions[id]();
                });
            });
            // Without this, pressing Enter in a text field would submit the form
            // and reload the page, throwing away the theme being edited. Submit
            // bubbles, so the delegated form of this still cancels it.
            panelElement.on('submit', '#lakeus-theme-designer-portlet-body', function (e) { e.preventDefault(); });
            // The colour-scheme radios need no handler here either: they are
            // controlled CdxRadio components, and vue.js calls switchColorScheme()
            // when one reports a selection.
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
        Lakeus.mountVueFieldsets();
        console.log("[Lakeus] " + mw.message('lakeus-theme-designer-all-loaded'));
};

/**
 * The fieldsets rendered by Vue instead of by the generated markup.
 *
 * One, for now. Moving exactly one establishes whether a Codex-based fieldset
 * renders acceptably inside the existing panel and what it costs, before the other
 * eight follow; the components reproduce the same DOM contract, which is what makes
 * moving one at a time possible at all.
 *
 * Listed by fieldset id only - the variables belonging to it are read from the
 * table. An earlier version hardcoded them and got the list wrong, so Vue replaced
 * a fieldset's contents with only some of its variables and the rest silently
 * disappeared from the panel.
 */
Lakeus.vueFieldsets = [
    'lakeus-theme-designer-basic',
    'lakeus-theme-designer-basic-derived',
    'lakeus-theme-designer-global',
    'lakeus-theme-designer-page-header',
    'lakeus-theme-designer-toggle-list',
    'lakeus-theme-designer-body',
    'lakeus-theme-designer-portlet',
    'lakeus-theme-designer-footer',
    'lakeus-theme-designer-sticky-toc'
];

/** @type {?Object} */
Lakeus.vueModule = null;

/**
 * The variables belonging to a fieldset, in table order.
 *
 * @param {string} fieldset
 * @return {string[]}
 */
Lakeus.fieldsetVariables = function (fieldset) {
    return Object.keys(Lakeus.variablesList).filter(function (k) {
        return Lakeus.variablesList[k].fieldset === fieldset;
    });
};

/**
 * Hand the configured fieldsets to Vue.
 *
 * Deliberately failure-tolerant: if the Vue module cannot be loaded, the string
 * builder's markup is still in the DOM and the panel keeps working exactly as
 * before, so a broken rewrite degrades to the old renderer rather than to nothing.
 *
 * Order does not matter relative to the panel's handlers: they are delegated on the
 * panel root, so they apply to whatever markup ends up there.
 */
Lakeus.mountVueFieldsets = function () {
    try {
        Lakeus.vueModule = require('skins.lakeus.theme.designer.vue')(Lakeus);
    } catch (e) {
        mw.log.warn('[Lakeus] Theme Designer: Vue fieldsets unavailable, keeping the generated markup. ' + e);
        return;
    }
    Lakeus.vueFieldsets.forEach(function (fieldset) {
        var host = document.getElementById('lakeus-theme-designer-fieldset-' + fieldset);
        if (host) {
            Lakeus.vueModule.mountFieldset(fieldset, Lakeus.fieldsetVariables(fieldset), host);
        }
    });
    Lakeus.vueModule.mountStatic();
    // The Vue-rendered inputs are new elements, so the state has to be written onto
    // them; they are not covered by whatever the string builder set up.
    Lakeus.syncVariableUiState();
};

/* Moving these functions into the init function */

/**
 * Read the form into the variable table.
 *
 * User-entered values are collected first and the derived ones are computed
 * afterwards by recalculateAutoVariables(). Deriving inline inside this loop is
 * order-dependent - the list does not put every dependency first - and used to
 * give different results when the same unchanged form was flushed twice.
 *
 * Whether a variable is derived is taken from its "auto calculate" checkbox
 * rather than from the input's `disabled` property, so that unrelated disabling
 * (a disabled fieldset, for instance) cannot turn a user value into a derived one.
 */
Lakeus.updateVariablesListFromForm = function () {
    $.each(Lakeus.variablesList, function (k, v) {
        var inputElement = $("#lakeus-theme-designer-input-" + k);
        // No input means nothing has been rendered for this variable yet, so there
        // is nothing to read and the stored value must be left alone. Without this
        // guard `$().val()` is undefined and the flush wrote the literal string
        // "undefined" into every text variable. That went unnoticed while the
        // fieldsets still carried generated markup, because the inputs were always
        // there by then; the fieldsets are empty hosts that Vue fills in, and the
        // flush inside constructThemeDesigner runs before the mount.
        if (!inputElement.length) {
            return;
        }
        // `skipped` is the variable's own state now, kept up to date by the
        // delegated handler below. It used to live in jQuery `.data()` on three
        // separate DOM nodes, which meant the flag vanished whenever the markup
        // was replaced - including by the form refresh.
        if (v.skipped) {
            return;
        }
        if (Lakeus.isAutoCalculated(k, v)) {
            // Derived below, once every user-entered value has been read.
            return;
        }
        if (v.input === 'color') {
            // Keyed on the variable's declared input type, NOT on the <input>'s
            // `type` attribute. The "colour picker fallback" checkbox flips that
            // attribute to `text` for readers whose browser has no native colour
            // picker; branching on it made colour variables collapse to raw
            // strings, after which generateTheme() threw on value.alpha(), the
            // form refresh threw on value.hex() and calculate() rules threw on
            // .darken(). The fallback changes how a colour is entered, not what
            // it means.
            var inputElementAlpha = $("#lakeus-theme-designer-input-" + k + "-alpha");
            var alpha = Number(inputElementAlpha.val());
            var raw = inputElement.val();
            // Leave the previous value alone rather than storing something that
            // cannot be parsed back into a colour.
            if (chroma.valid(raw)) {
                v.value = chroma(raw).alpha(alpha <= 1 && alpha >= 0 ? alpha : 1);
            }
        } else {
            v.value = inputElement.val();
        }
    });
    Lakeus.recalculateAutoVariables();
};

/**
 * Load the scheme being edited into the form.
 *
 * Every variable is refreshed, including ones marked "do not generate".
 * `skipped` only means the variable is left out of the generated stylesheet; it
 * must not stop the field from following the scheme switch. Leaving skipped
 * fields alone made them keep the *previous* scheme's value, and clearing the
 * checkbox afterwards flushed that stale value into the scheme now on screen -
 * a light value silently overwriting the dark default.
 */
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
    // The writes above go straight to the DOM, so the Vue-rendered fieldsets have
    // to be told, or the two renderers would drift apart.
    if (Lakeus.vueModule) {
        Lakeus.vueModule.refresh();
    }
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
        // A variable's own value just moved without any of its sources moving, so
        // a recorded fingerprint would wrongly claim it was already derived.
        v.derivedFrom = { light: null, dark: null };
    });
    // Dark is back to the skin's palette, which is internally consistent, so it
    // stays as authored until one of its own sources moves.
    Lakeus.markSchemeInSync('dark');
    // Light must be re-derived now, whichever scheme is on screen, so the stored
    // theme is complete even if the author resets and copies without tabbing back.
    Lakeus.recalculateScheme('light');
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
                .getPropertyValue('--lakeus-' + k).trim() || null;
        }
        v.value = Lakeus.parseVariableValue(raw, v, v.default);
        // Values were replaced wholesale, so any recorded fingerprint for this
        // scheme no longer describes them.
        v.derivedFrom[scheme] = null;
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

/**
 * Every custom property the panel might be drawn in.
 *
 * Two sources, because the panel is drawn from both: the designer's own variables
 * (both halves - variables.less declares -light and -dark unconditionally on :root,
 * so both are readable even while only one of them is in use), and whatever else
 * the page declares, which is where the Codex components' tokens come from.
 *
 * @return {string[]}
 */
Lakeus.panelPaletteTokens = function () {
    var tokens = {};
    Object.keys(Lakeus.variablesList).forEach(function (k) {
        Lakeus.colorSchemes.forEach(function (scheme) {
            tokens['--' + k + '-' + scheme] = true;
        });
        tokens['--lakeus-' + k] = true;
    });
    Array.prototype.forEach.call(document.styleSheets, function (sheet) {
        var rules;
        try {
            rules = sheet.cssRules;
        } catch (e) {
            return; // another origin; nothing readable there
        }
        Array.prototype.forEach.call(rules || [], function (rule) {
            Array.prototype.forEach.call((rule.style || []), function (property) {
                if (/^--/.test(property)) {
                    tokens[property] = true;
                }
            });
        });
    });
    return Object.keys(tokens);
};

/**
 * Pin the palette the panel is currently drawn in onto the panel.
 *
 * Testing a theme writes the generated variables as inline styles on <html>, and
 * inline styles beat the skin's :root. The panel lives in the same page, so without
 * this it is tinted by whatever theme is being previewed - and a theme with white
 * text on a white background makes the panel vanish while you are still trying to
 * edit it. The hardcoded colours in themeDesigner.css are the older, blunter form of
 * the same protection and are deliberate, not debt.
 *
 * Inline styles on the panel root are nearer than inline styles on <html>, so
 * everything inside - the Codex components included - resolves to the snapshot.
 *
 * MUST be called before applyThemeToDocument(): afterwards the values read back are
 * the theme's, not the skin's, and the snapshot would be worthless.
 *
 * Nothing is pinned while no theme is being tested, so the panel follows the skin's
 * light/dark exactly as it always did.
 */
Lakeus.freezePanelPalette = function () {
    var panel = document.getElementById('lakeus-theme-designer');
    if (!panel) {
        return;
    }
    var computed = getComputedStyle(document.documentElement);
    Lakeus.panelPalette = {};
    Lakeus.panelPaletteTokens().forEach(function (token) {
        var value = computed.getPropertyValue(token).trim();
        if (value) {
            Lakeus.panelPalette[token] = value;
            panel.style.setProperty(token, value);
        }
    });
};

Lakeus.unfreezePanelPalette = function () {
    var panel = document.getElementById('lakeus-theme-designer');
    if (!panel || !Lakeus.panelPalette) {
        return;
    }
    Object.keys(Lakeus.panelPalette).forEach(function (token) {
        panel.style.removeProperty(token);
    });
    Lakeus.panelPalette = null;
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
    Lakeus.freezePanelPalette();
    Lakeus.applyThemeToDocument();
}

Lakeus.clearTheme = function () {
    $("body").attr("testing", "false");
    Lakeus.unfreezePanelPalette();
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

/**
 * Tick the opposite of every auto-calculate box.
 *
 * These two used to walk the checkboxes and toggle them, relying on the change
 * event to write the model. The boxes are controlled Codex components now, so
 * there is nothing sensible to toggle: the model is what they render from, and
 * refresh() is what makes them show it.
 *
 * The flush comes first so that whatever has been typed into the value fields is
 * captured before the re-render writes the model back over them.
 */
Lakeus.invertAutoCalculateSelection = function () {
    Object.keys(Lakeus.variablesList).forEach(function (k) {
        var v = Lakeus.variablesList[k];
        // A variable only has the box at all when its rule is not manual.
        if ((v.rule || {}).autoCalculate !== 'manual') {
            v.autoCalculateOn = !v.autoCalculateOn;
        }
    });
    Lakeus.updateVariablesListFromForm();
    if (Lakeus.vueModule) {
        Lakeus.vueModule.refresh();
    }
}

Lakeus.unselectDoNotGenerateSelection = function () {
    Object.keys(Lakeus.variablesList).forEach(function (k) {
        Lakeus.variablesList[k].skipped = false;
    });
    Lakeus.updateVariablesListFromForm();
    if (Lakeus.vueModule) {
        Lakeus.vueModule.refresh();
    }
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

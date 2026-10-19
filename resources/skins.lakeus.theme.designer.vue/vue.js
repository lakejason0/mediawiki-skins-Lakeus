/**
 * The Vue half of the Theme Designer's panel.
 *
 * The panel's fieldsets are rendered by Vue with real Codex instead of by the
 * hand-written markup themeDesigner.js builds as a string.
 *
 * The components reproduce the SAME DOM contract as the markup they replace - the
 * same `lakeus-theme-designer-input-<name>` ids, the same
 * `lakeus-theme-designer-input-color` / `-input-alpha` / `-input-text` /
 * `-auto-calculate-checkbox` / `-do-not-generate-checkbox` classes. That is what
 * lets the swap happen without touching the form flush, the refresh or the scheme
 * switch: none of them know or care who rendered the inputs.
 *
 * Nothing here keeps its own copy of the state. It renders what
 * Lakeus.variablesList holds and, when the designer refreshes the form, renders it
 * again. The panel's handlers are delegated on the panel root, so they keep working
 * on markup they never saw bound, and the checkbox states are written by
 * Lakeus.syncVariableUiState() rather than bound here.
 *
 * @param {Object} Lakeus The shared namespace, injected by the designer.
 * @return {Object}
 */
module.exports = function ( Lakeus ) {
	const Vue = require( 'vue' );
	const Fieldset = require( './Fieldset.vue' );
	const ColorSchemeFieldset = require( './ColorSchemeFieldset.vue' );
	const DangerZoneFieldset = require( './DangerZoneFieldset.vue' );

	const mounted = [];

	/**
	 * The values a fieldset's variables currently hold, in table order.
	 *
	 * @param {string[]} variables
	 * @return {Array<Object>}
	 */
	function itemsFor( variables ) {
		return variables.map( ( name ) => {
			const entry = Lakeus.variablesList[ name ];
			const value = entry && entry.value;
			const isColour = value && typeof value.hex === 'function';
			const rule = ( entry && entry.rule ) || {};
			return {
				name,
				kind: ( entry && entry.input ) || 'color',
				allowAlpha: !!( entry && entry.allowAlpha ),
				// The rule decides whether the variable HAS an auto-calculate box;
				// whether it is ticked is model state (v.autoCalculateOn).
				hasAutoBox: rule.autoCalculate !== 'manual',
				// Bound onto the inputs; see VariableItem.vue.
				autoOn: !!( entry && entry.autoCalculateOn ),
				// Whether the author has excluded this variable from the generated stylesheet.
				skipped: !!( entry && entry.skipped ),
				value: isColour ? value.hex( 'rgb' ) : String( value ),
				alpha: isColour ? value.alpha() : 1
			};
		} );
	}

	/**
	 * Render a fieldset into its (already present) fieldset element, replacing
	 * whatever the string builder put there.
	 *
	 * @param {string} fieldset The fieldset id suffix, e.g. 'lakeus-theme-designer-basic'.
	 * @param {string[]} variables Variable names belonging to it.
	 * @param {HTMLElement} host The element to mount into.
	 * @return {?Object} The Vue instance, or null if the host is missing.
	 */
	function mountFieldset( fieldset, variables, host ) {
		if ( !host ) {
			return null;
		}
		// `onUpdateFlag` is how a Vue 3 root component receives an event: $on was
		// removed in Vue 3, and calling it threw - which aborted the mount loop and
		// left every fieldset after the first one unrendered.
		const app = Vue.createMwApp( Fieldset, {
			fieldset,
			variables,
			onUpdateFlag: ( name, field, value ) => {
				// The checkboxes are controlled Codex components, so their state
				// arrives as an event rather than being read back out of the DOM.
				// That is the direction this panel has been moving in since the state
				// came off the markup: the variable is the truth and the DOM follows.
				Lakeus.variablesList[ name ][ field ] = value;
			}
		} );
		// mount() returns the root instance proxy. Reading app._instance instead is
		// not the same thing and silently produced a component with no items, i.e.
		// an empty fieldset.
		const instance = app.mount( host );
		if ( instance ) {
			instance.applyItems( itemsFor( variables ) );
			mounted.push( { instance, variables } );
		}
		return app;
	}

	/**
	 * Re-render every mounted fieldset from Lakeus.variablesList.
	 *
	 * Called after the designer refreshes the form, so the two renderers cannot
	 * drift apart.
	 */
	function refresh() {
		if ( chrome.colorScheme ) {
			// The scheme switch writes it imperatively elsewhere; keep the radios bound
			// to the model rather than letting them go stale.
			chrome.colorScheme.current = Lakeus.colorSchemeMode;
		}
		mounted.forEach( ( entry ) => {
			entry.instance.applyItems( itemsFor( entry.variables ) );
		} );
	}

	/**
	 * Render the panel's two non-variable fieldsets: the colour-scheme selector and
	 * the dangerous one. Their click handlers are delegated on the panel root and
	 * match by id, so rendering them here binds nothing.
	 *
	 * @return {void}
	 */
	function mountStatic() {
		const scheme = document.getElementById( 'lakeus-theme-designer-fieldset-color-scheme' );
		if ( scheme ) {
			chrome.colorScheme = Vue.createMwApp( ColorSchemeFieldset, {
				schemes: Lakeus.colorSchemes,
				current: Lakeus.colorSchemeMode,
				// A controlled component reports the selection; the panel's old
				// delegated handler read the radio's value out of the DOM instead.
				onSelect: ( chosen ) => {
					Lakeus.switchColorScheme( chosen );
				}
			} ).mount( scheme );
		}
		const danger = document.getElementById( 'lakeus-theme-designer-fieldset-danger-zone' );
		if ( danger ) {
			Vue.createMwApp( DangerZoneFieldset ).mount( danger );
		}
	}

	/** @type {Object} */
	const chrome = { colorScheme: null };

	return { mountFieldset, mountStatic, refresh, mounted };
};

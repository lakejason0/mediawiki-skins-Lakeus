/**
 * The Vue half of the Theme Designer's panel.
 *
 * One fieldset is rendered by Vue instead of by the hand-written markup
 * themeDesigner.js builds as a string, as the first step of moving the panel over.
 * Doing exactly one answers the two questions that decide whether the rest should
 * follow: does a Codex-based fieldset render acceptably inside the existing panel,
 * and what does it cost in ResourceLoader payload?
 *
 * The component reproduces the SAME DOM contract as the markup it replaces - the
 * same `lakeus-theme-designer-input-<name>` ids, the same
 * `lakeus-theme-designer-input-color` / `-do-not-generate-checkbox` classes. That
 * is what lets one fieldset move at a time: the designer reads its state out of the
 * DOM, so the markup is the seam.
 *
 * Nothing here keeps its own copy of the state. It renders what
 * Lakeus.variablesList holds and, when the designer refreshes the form, renders it
 * again. The delegated handlers on the panel root keep working across the swap,
 * which is why this does not need to re-implement any of them.
 *
 * @param {Object} Lakeus The shared namespace, injected by the designer.
 * @return {Object}
 */
module.exports = function ( Lakeus ) {
	const Vue = require( 'vue' );
	const Fieldset = require( './Fieldset.vue' );

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
			return {
				name,
				allowAlpha: !!( entry && entry.allowAlpha ),
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
		const app = Vue.createMwApp( Fieldset, { fieldset, variables } );
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
		mounted.forEach( ( entry ) => {
			entry.instance.applyItems( itemsFor( entry.variables ) );
		} );
	}

	return { mountFieldset, refresh, mounted };
};

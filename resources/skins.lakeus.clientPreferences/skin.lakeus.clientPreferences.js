/**
 * Load client preferences based on the existence of '#p-client-preferences' element.
 */
function loadClientPreferences() {
	const clientPreferenceId = 'p-client-preferences';
	const clientPreferenceElement = document.getElementById( clientPreferenceId );
	const clientPreferenceExists = clientPreferenceElement !== null;
	if ( clientPreferenceExists ) {
		const clientPreferences = require( /** @type {string} */( './clientPreferences.js' ) );
		const clientPreferenceConfig = ( require( './clientPreferences.json' ) );

		clientPreferences.render( `#${ clientPreferenceId } > .mw-portlet-body > ul`, clientPreferenceConfig );
		clientPreferenceElement.classList.remove( 'emptyPortlet' );
	}
}

loadClientPreferences();
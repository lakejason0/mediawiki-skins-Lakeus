/**
 * Define callback functions.
 */
function onLakeusUpdateColorScheme( featureName, value ) {
	const prefix = 'skin-theme-clientpref-';

	[ 'os', 'day', 'night' ].forEach( ( possibleValue ) => {
		document.documentElement.classList.remove( `${ prefix }${ possibleValue }` );
	} );

	if ( value === 'wiki' ) {
		value = mw.config.get( 'wgLakeusWikiDefaultColorScheme' );
	}

	switch ( value ) {
		case 'os':
			break;
		case 'dark':
			value = 'night';

			break;
		default:
			value = 'day';
	}

	document.documentElement.classList.add( `${ prefix }${ value }` );
}

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

		/**
		 * Setup callback functions
		 */
		clientPreferenceConfig['lakeus-color-scheme']['callbacks'] = {
			'ClientPrefsUpdateClassList': onLakeusUpdateColorScheme
		};

		clientPreferences.render( `#${ clientPreferenceId } > .mw-portlet-body > ul`, clientPreferenceConfig );
		clientPreferenceElement.classList.remove( 'emptyPortlet' );
	}
}

loadClientPreferences();

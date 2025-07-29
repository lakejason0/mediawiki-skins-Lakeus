/** @module search */

const Vue = require( 'vue' ),
	{
		App,
		restSearchClient,
		urlGenerator
	} = require( /** @type {string} */ ( 'mediawiki.skinning.typeaheadSearch' ) ),
	config = require( './config.json' );

const searchApiUrl = mw.config.get( 'wgScriptPath' ) + '/rest.php';

const showEmptySearchRecommendations = false;

/**
 * @param {Element} searchBox
 * @return {void}
 */
function initApp( searchBox ) {
	urlGeneratorInstance = urlGenerator( mw.config.get( 'wgScript' ) );

	restClient = restSearchClient(
		searchApiUrl,
		urlGeneratorInstance
	);

	const searchForm = searchBox.querySelector( '.cdx-search-input' ),
		searchContainer = searchBox.querySelector( '.lakeus-typeahead-search-container' ),
		search = /** @type {HTMLInputElement|null} */ (
			searchBox.querySelector( 'input[name=search]' )
		),
		titleInput = /** @type {HTMLInputElement|null} */ (
			searchBox.querySelector( 'input[name=title]' )
		),
		searchPageTitle = titleInput && titleInput.value;

	if ( !searchForm || !search || !titleInput ) {
		throw new Error( 'Attempted to create Vue search element from an incompatible element.' );
	}

	// @ts-ignore MediaWiki-specific function
	Vue.createMwApp(
		App,
		Object.assign(
			{
				prefixClass: 'lakeus-',
				id: searchForm.id,
				autocapitalizeValue: search.getAttribute( 'autocapitalize' ),
				autofocusInput: search === document.activeElement,
				action: searchForm.getAttribute( 'action' ),
				searchAccessKey: search.getAttribute( 'accessKey' ),
				searchPageTitle,
				restClient,
				urlGenerator: urlGeneratorInstance,
				searchTitle: search.getAttribute( 'title' ),
				searchPlaceholder: search.getAttribute( 'placeholder' ),
				searchQuery: search.value,
				searchButtonLabel: '',
				autoExpandWidth: true,
				showEmptySearchRecommendations
			},
			config
		)
	)
		.mount( searchContainer );
}

/**
 * @param {Document} document
 * @return {void}
 */
function main( document ) {
	document.querySelectorAll( '.lakeus-search-box' )
		.forEach(
			function ( node ) {
				initApp( node );
			}
		);
}

/**
 * @param {Document} document
 * @return {void}
 */
function init() {
	main( document );
}

module.exports = {
	init
};

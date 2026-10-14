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
	// These two were assigned without a declaration, so they became implicit
	// globals that leaked out of this function and were shared by every search box
	// on the page.
	const urlGeneratorInstance = urlGenerator( mw.config.get( 'wgScript' ) );

	const restClient = restSearchClient(
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
	// NodeList.prototype.forEach does not exist in the browsers this skin still
	// supports, so the array method is applied to the NodeList explicitly.
	Array.prototype.forEach.call(
		document.querySelectorAll( '.lakeus-search-box' ),
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

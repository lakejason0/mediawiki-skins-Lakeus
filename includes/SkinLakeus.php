<?php

namespace MediaWiki\Skins\Lakeus;

use MediaWiki\Config\Config;
use MediaWiki\Html\Html;
use MediaWiki\SiteStats\SiteStats;
use MediaWiki\User\Options\UserOptionsLookup;
use SkinMustache;

class SkinLakeus extends SkinMustache {

	private UserOptionsLookup $userOptionsLookup;

	public function __construct(
		UserOptionsLookup $userOptionsLookup,
		array $options
	) {
		parent::__construct( $options );

		$this->userOptionsLookup = $userOptionsLookup;
	}

	/**
	 * Gets user's preference value
	 *
	 * If user preference is not set or did not appear in config
	 * set it to default value
	 *
	 * @param string $preferenceKey User preference key
	 * @return string
	 */
	public function getUserPreferenceValue( $preferenceKey ) {
		return $this->userOptionsLookup->getOption(
			$this->getUser(),
			$preferenceKey
			// For client preferences, this should be the same as `preferenceKey`
			// in 'resources/skins.vector.js/clientPreferences.json'
		);
	}

	/**
	 * Gets the wiki default color scheme
	 *
	 * @return string
	 */
	public static function getWikiDefaultColorScheme( Config $config ): string {
		$wikiDefaultColorScheme = $config->get( 'LakeusWikiDefaultColorScheme' );

		if ( !in_array( $wikiDefaultColorScheme, [ 'os', 'light', 'dark' ] ) ) {
			$wikiDefaultColorScheme = 'light';
		}

		return $wikiDefaultColorScheme;
	}

	/**
	 * Gets the value of HTML class prefix "skin-theme-clientpref-"
	 *
	 * @param string $colorScheme Lakeus color scheme
	 * @return string
	 */
	private function getSkinThemeClientPrefValue( $colorScheme ): string {
		if ( $colorScheme === 'wiki' ) {
			$colorScheme = self::getWikiDefaultColorScheme( $this->getConfig() );
		}

		switch ( $colorScheme ) {
			case 'light':
				$colorScheme = 'day';

				break;
			case 'dark':
				$colorScheme = 'night';

				break;
		}

		return $colorScheme;
	}

	/**
	 * @inheritDoc
	 */
	public function getHtmlElementAttributes() {
		$wikiDefaultColorScheme = self::getWikiDefaultColorScheme( $this->getConfig() );
		$colorScheme = $this->getUserPreferenceValue( 'lakeus-color-scheme' );
		$skinThemeClientPrefValue = $this->getSkinThemeClientPrefValue( $colorScheme );

		$original = parent::getHtmlElementAttributes();
		$original['class'] .=
			' ' . 'lakeus-color-scheme-wiki-default-' . $wikiDefaultColorScheme .
			' ' . 'lakeus-color-scheme-clientpref-' . $colorScheme .
			' ' . 'skin-theme-clientpref-' . $skinThemeClientPrefValue;

		return $original;
	}

	/**
	 * Extends the getTemplateData function.
	 * For example, we can add a template key 'html-myskin-hello-world'
	 * which can be rendered in skin.mustache using {{{html-myskin-hello-world}}}.
	 *
	 * For this skin:
	 * 1. All configs provided by this skin are actually implemented here.
	 * 2. Messages that are used by the skin but need parsing are handled.
	 * 3. Essential template data are handled to meet the layout of the skin.
	 * 4. Custom indicators are injected into template data.
	 * 5. The data of Client Preferences portlet is added.
	 *
	 * @return array
	 */
	public function getTemplateData(): array {
		$data = parent::getTemplateData();
		// this is a Config object
		$config = $this->getConfig();

		/**
		 * Parse the article count message, providing values to the variable
		 * Implement config
		 */
		$data['html-articlecount'] = SiteStats::articles();
		// trying to overwrite
		$data['msg-lakeus-articlecount'] = $this->msg( 'lakeus-articlecount' )
			->numParams( SiteStats::articles() )->parse();
		$show_repository_link = $config->get( 'LakeusShowRepositoryLink' );

		if ( $show_repository_link ) {
			$data['html-repository-link'] = '<a href="https://github.com/lakejason0/mediawiki-skins-Lakeus">' .
				$this->msg( 'lakeus-footermessage' )->escaped() . '</a>';
			$data['is-repository-link-shown'] = true;
		}

		$data['is-notice-with-border'] = $config->get( 'LakeusSiteNoticeHasBorder' );
		$data['is-portlet-animated'] = $config->get( 'LakeusShouldAnimatePortlets' );
		$data['is-sticky-toc-shown'] = $config->get( 'LakeusShowStickyTOC' );

		/**
		 * Move Toolbox to a separate portlet
		 */
		$page_tools_key = array_search(
			'p-tb',
			array_column( $data['data-portlets-sidebar']['array-portlets-rest'], 'id' )
		);
		$data['data-portlets']['data-page-tools'] =
			$data['data-portlets-sidebar']['array-portlets-rest'][$page_tools_key];
		unset( $data['data-portlets-sidebar']['array-portlets-rest'][$page_tools_key] );
		$data['data-portlets-sidebar']['array-portlets-rest'] = array_values(
			$data['data-portlets-sidebar']['array-portlets-rest']
		);

		/**
		 * Add dropdown classes to applicable menus
		 */
		$dropdown_portlet_keys = [
			'data-user-menu',
			'data-actions',
			'data-page-tools',
			'data-variants',
			'data-languages',
		];

		foreach ( $dropdown_portlet_keys as $portlet_key ) {
			if ( isset( $data['data-portlets'][$portlet_key] ) ) {
				$data['data-portlets'][$portlet_key]['class'] = str_replace(
					'mw-portlet mw-portlet-',
					'mw-portlet mw-portlet-dropdown mw-portlet-',
					$data['data-portlets'][$portlet_key]['class']
				);
			}
		}

		/**
		 * There was a bug in 1.38 where `data-toc` could be empty
		 * In this case unset it so as to remove the sticky ToC
		 */
		if ( empty( $data['data-toc']['array-sections'] ) ) {
			unset( $data['data-toc'] );
		}

		/**
		 * The experimental custom indicators
		 * Currently only used for gh@travellings-link/travellings
		 */
		$custom_indicators = $config->get( 'LakeusCustomIndicators' );
		$id_tracker = [];

		foreach ( $data['array-indicators'] as $item ) {
			$id_tracker[$item['id']] = true;
		}

		foreach ( $custom_indicators as $indicator ) {
			if ( !isset( $id_tracker[ $indicator['id'] ] ) ) {
				$data['array-indicators'][] = $indicator;
				$id_tracker[ $indicator['id'] ] = true;
			}
		}

		/**
		 * Inject Client Preferences Portlet to Mustache
		 * Only an empty portlet is created here; JavaScript handles
		 * the actual initialization here.
		 */
		$data['data-portlets']['data-client-preferences'] = [
			'array-items' => [],
			'class' => 'mw-portlet mw-portlet-dropdown mw-portlet-client-preferences emptyPortlet',
			'html-after-portal' => '',
			'html-before-portal' => '',
			'html-items' => '',
			'html-tooltip' => Html::expandAttributes( [
				'title' => $this->msg( 'lakeus-client-preferences-tooltip' )->text(),
			] ),
			'id' => 'p-client-preferences',
			'is-empty' => true,
			'label' => $this->msg( 'lakeus-client-preferences-label' )->text(),
		];

		return $data;
	}
}

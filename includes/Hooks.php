<?php

namespace MediaWiki\Skins\Lakeus;

use MediaWiki\Config\Config;
use MediaWiki\Preferences\Hook\GetPreferencesHook;
use MediaWiki\ResourceLoader\Context as ResourceLoaderContext;

class Hooks implements GetPreferencesHook {
	/**
	 * @param ResourceLoaderContext $context
	 * @param Config $config
	 * @return $wgLakeusWvuiSearchOptions
	 */
	public function getLakeusWvuiSearchResourceLoaderConfig(
		ResourceLoaderContext $context,
		Config $config
	) {
		return $config->get( 'LakeusWvuiSearchOptions' );
	}

	/**
	 * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Hooks/GetPreferences
	 * @param User $user
	 * @param array &$preferences
	 */
	public function onGetPreferences( $user, &$preferences ) {
		$lakeusPreferences = [];

		$lakeusPreferences['lakeus-enable-theme-designer'] = [
			'section' => 'rendering/skin/skin-prefs',
			'type' => 'check',
			'label-message' => 'lakeus-preferences-enable-theme-designer',
			'help-message' => 'lakeus-preferences-enable-theme-designer-desc',
			'hide-if' => [ '!==', 'skin', 'lakeus' ],
		];

		$lakeusPreferences['lakeus-sticky-toc-donot-auto-collapse'] = [
			'section' => 'rendering/skin/skin-prefs',
			'type' => 'check',
			'label-message' => 'lakeus-preferences-sticky-toc-donot-auto-collapse',
			'help-message' => 'lakeus-preferences-sticky-toc-donot-auto-collapse-desc',
			'hide-if' => [ '!==', 'skin', 'lakeus' ],
		];

		$lakeusPreferences['lakeus-smooth-scroll-behavior'] = [
			'section' => 'rendering/skin/skin-prefs',
			'type' => 'check',
			'label-message' => 'lakeus-preferences-smooth-scroll-behavior',
			'help-message' => 'lakeus-preferences-smooth-scroll-behavior-desc',
			'hide-if' => [ '!==', 'skin', 'lakeus' ],
		];

		// Prevent override core preferences
		$preferences += $lakeusPreferences;
	}
}

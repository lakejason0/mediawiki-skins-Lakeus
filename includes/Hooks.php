<?php

namespace MediaWiki\Skins\Lakeus;

use Config;
# use MediaWiki\Config\Config; // Namespaced in 1.41.0
use MediaWiki\Preferences\Hook\GetPreferencesHook;
use MediaWiki\ResourceLoader\Context as ResourceLoaderContext;

class Hooks implements GetPreferencesHook {
	/**
	 * @param ResourceLoaderContext $context
	 * @param Config $config
	 * @return $wgLakeusSearchOptions
	 */
	public function getLakeusSearchResourceLoaderConfig(
		ResourceLoaderContext $context,
		Config $config
	) {
		return $config->get( 'LakeusSearchOptions' );
	}

	/**
	 * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Hooks/GetPreferences
	 * @param User $user
	 * @param array &$preferences
	 */
	public function onGetPreferences( $user, &$preferences ) {
		// A checkbox
		$preferences['lakeus-enable-theme-designer'] = [
			'type' => 'check',
			// a system message
			'label-message' => 'lakeus-preferences-enable-theme-designer',
			'help-message' => 'lakeus-preferences-enable-theme-designer-desc',
			'section' => 'rendering/skin/skin-prefs',
			'hide-if' => [ '!==', 'skin', 'lakeus' ],
		];

		$preferences['lakeus-sticky-toc-donot-auto-collapse'] = [
			'type' => 'check',
			'label-message' => 'lakeus-preferences-sticky-toc-donot-auto-collapse',
			'help-message' => 'lakeus-preferences-sticky-toc-donot-auto-collapse-desc',
			'section' => 'rendering/skin/skin-prefs',
			'hide-if' => [ '!==', 'skin', 'lakeus' ],
		];

		$preferences['lakeus-smooth-scroll-behavior'] = [
			'type' => 'check',
			'label-message' => 'lakeus-preferences-smooth-scroll-behavior',
			'help-message' => 'lakeus-preferences-smooth-scroll-behavior-desc',
			'section' => 'rendering/skin/skin-prefs',
			'hide-if' => [ '!==', 'skin', 'lakeus' ],
		];
	}
}

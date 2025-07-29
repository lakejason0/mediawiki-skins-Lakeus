<?php

namespace MediaWiki\Skins\Lakeus;

use MediaWiki\Config\Config;
use MediaWiki\Preferences\Hook\GetPreferencesHook;
use MediaWiki\ResourceLoader\Context as ResourceLoaderContext;
use MediaWiki\Skins\Hook\SkinPageReadyConfigHook;

class Hooks implements
	GetPreferencesHook,
	SkinPageReadyConfigHook
{
	private Config $config;

	public function __construct(
		Config $config
	) {
		$this->config = $config;
	}

	/**
	 * @param ResourceLoaderContext $context
	 * @param Config $config
	 * @return array $wgLakeusSearchOptions
	 */
	public static function getLakeusSearchResourceLoaderConfig(
		ResourceLoaderContext $context,
		Config $config
	): array {
		return $config->get( 'LakeusSearchOptions' );
	}

	/**
	 * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Hooks/GetPreferences
	 * @param User $user
	 * @param array &$preferences
	 * @return bool|void True or no return value to continue or false to abort
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

	/**
	 * SkinPageReadyConfig hook handler
	 *
	 * Replace searchModule provided by skin.
	 *
	 * @since 1.35
	 * @param ResourceLoaderContext $context
	 * @param mixed[] &$config Associative array of configurable options
	 * @return void This hook must not abort, it must return no value
	 */
	public function onSkinPageReadyConfig(
		ResourceLoaderContext $context,
		array &$config
	): void {
		if ( $context->getSkin() !== 'lakeus' ) {
			return;
		}

		if ( $this->config->get( 'LakeusSearchModuleType' ) === 'codex' ) {
			$config['searchModule'] = 'skins.lakeus.search';
		}
	}
}

<?php

namespace MediaWiki\Skins\Lakeus;

use MediaWiki\Config\Config;
use MediaWiki\Preferences\Hook\GetPreferencesHook;
use MediaWiki\ResourceLoader\Hook\ResourceLoaderGetConfigVarsHook;
use MediaWiki\ResourceLoader\Context as ResourceLoaderContext;
use MediaWiki\Skins\Hook\SkinPageReadyConfigHook;

class Hooks implements
	GetPreferencesHook,
	SkinPageReadyConfigHook,
	ResourceLoaderGetConfigVarsHook
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

		$lakeusPreferences['lakeus-color-scheme'] = [
			'section' => 'rendering/skin/skin-prefs',
			'type' => 'radio',
			'label-message' => 'lakeus-preferences-color-scheme',
			'help-message' => 'lakeus-preferences-color-scheme-desc',
			'options-messages' => [
				'lakeus-preferences-color-scheme-option-os-label' => 'os',
				'lakeus-preferences-color-scheme-option-wiki-label' => 'wiki',
				'lakeus-preferences-color-scheme-option-light-label' => 'light',
				'lakeus-preferences-color-scheme-option-dark-label' => 'dark',
			],
			'hide-if' => [ '!==', 'skin', 'lakeus' ],
		];

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

	/**
	 * Export static site-wide `mw.config` variables to JavaScript.
	 *
	 * @param array &$vars `[ variable name => value ]`
	 * @param string $skin
	 * @param Config $config since 1.34
	 * @return void This hook must not abort, it must return no value
	 */
	public function onResourceLoaderGetConfigVars( array &$vars, $skin, Config $config ): void {
		if ( $skin !== 'lakeus' ) {
			return;
		}

		$vars['wgLakeusWikiDefaultColorScheme'] = SkinLakeus::getWikiDefaultColorScheme( $config );
	}
}

<?php

namespace MediaWiki\Skins\Lakeus;

# use MediaWiki\SiteStats\SiteStats; // Namespaced in 1.41.0
use SiteStats;
use SkinMustache;

class SkinLakeus extends SkinMustache {
	/**
	 * Extends the getTemplateData function to add a template key 'html-myskin-hello-world'
	 * which can be rendered in skin.mustache using {{{html-myskin-hello-world}}}
	 *
	 * @return array
	 */
	public function getTemplateData(): array {
		$data = parent::getTemplateData();
		// this is a Config object
		$config = $this->getConfig();

		$data['html-articlecount'] = SiteStats::articles();
		// trying to overwrite
		$data['msg-lakeus-articlecount'] = $this->msg( 'lakeus-articlecount' )
			->numParams( SiteStats::articles() )->parse();
		$show_repository_link = $config->get( 'LakeusShowRepositoryLink' );
		if ( $show_repository_link ) {
			$data['html-repository-link'] = '<a href="https://github.com/lakejason0/mediawiki-skins-Lakeus">' .
				$this->msg( 'lakeus-footermessage' )->plain() . '</a>';
			$data['is-repository-link-shown'] = true;
		}
		$data['is-notice-with-border'] = $config->get( 'LakeusSiteNoticeHasBorder' );
		$data['is-portlet-animated'] = $config->get( 'LakeusShouldAnimatePortlets' );
		$data['is-sticky-toc-shown'] = $config->get( 'LakeusShowStickyTOC' );

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

		if ( empty( $data['data-toc']['array-sections'] ) ) {
			unset( $data['data-toc'] );
		}

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

		return $data;
	}
}

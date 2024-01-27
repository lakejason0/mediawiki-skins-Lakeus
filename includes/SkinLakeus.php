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

		$data["html-articlecount"] = SiteStats::articles();
		// trying to overwrite
		$data["msg-lakeus-articlecount"] = $this->msg( 'lakeus-articlecount' )
			->numParams( SiteStats::articles() )->parse();
		$showRepositoryLink = $config->get( 'LakeusShowRepositoryLink' );
		if ( $showRepositoryLink ) {
			$data["html-repository-link"] = '<a href="https://github.com/lakejason0/mediawiki-skins-Lakeus">' .
				$this->msg( 'lakeus-footermessage' )->plain() . '</a>';
			$data["is-repository-link-shown"] = true;
		}
		$data["is-notice-with-border"] = $config->get( 'LakeusSiteNoticeHasBorder' );
		$data["is-portlet-animated"] = $config->get( 'LakeusShouldAnimatePortlets' );
		$data["is-sticky-toc-shown"] = $config->get( 'LakeusShowStickyTOC' );

		$pageToolsKey = array_search(
			'p-tb',
			array_column( $data["data-portlets-sidebar"]["array-portlets-rest"], 'id' )
		);
		$data["data-portlets"]["data-page-tools"] =
			$data["data-portlets-sidebar"]["array-portlets-rest"][$pageToolsKey];
		unset( $data["data-portlets-sidebar"]["array-portlets-rest"][$pageToolsKey] );
		$data["data-portlets-sidebar"]["array-portlets-rest"] = array_values(
			$data["data-portlets-sidebar"]["array-portlets-rest"]
		);

		if ( empty( $data["data-toc"]["array-sections"] ) ) {
			unset( $data["data-toc"] );
		}

		return $data;
	}
}

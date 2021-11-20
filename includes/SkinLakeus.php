<?php

// use SiteStats;

class SkinLakeus extends SkinMustache {

    public const TEMPLATE_DIR = __DIR__ . '/templates';

    /**
     * @param BagOStuff $localServerObjectCache
     * @param array $options
     */
    public function __construct( BagOStuff $localServerObjectCache, array $options ) {
        $options['templateDirectory'] = self::TEMPLATE_DIR;
        parent::__construct( $options );

        $this->templateParser = new TemplateParser( $this->options['templateDirectory'], $localServerObjectCache );
    }

    /**
     * Extends the getTemplateData function to add a template key 'html-myskin-hello-world'
     * which can be rendered in skin.mustache using {{{html-myskin-hello-world}}}
     */
    public function getTemplateData() {
        $data = parent::getTemplateData();
        $config = $this->getConfig(); // this is a Config object

        $data["html-articlecount"] = SiteStats::articles();
        // trying to overwrite
        $data["msg-lakeus-articlecount"] = wfMessage( 'lakeus-articlecount' )->numParams( SiteStats::articles() )->parse();
        $wgLakeusShowRepositoryLink = $config->get( 'LakeusShowRepositoryLink' );
        if ($wgLakeusShowRepositoryLink) {
            $data["html-repository-link"] = '<a href="https://github.com/lakejason0/mediawiki-skins-Lakeus">' . wfMessage( 'lakeus-footermessage' )->plain() . '</a>'; 
            $data["is-repository-link-shown"] = true;
        }
        $data["is-notice-with-border"] = $config->get( 'LakeusSiteNoticeHasBorder' );
        return $data;
    }
}
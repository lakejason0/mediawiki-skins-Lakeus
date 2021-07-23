<?php

use SiteStats;

class SkinLakeus extends SkinMustache {
    /**
     * Extends the getTemplateData function to add a template key 'html-myskin-hello-world'
     * which can be rendered in skin.mustache using {{html-myskin-hello-world}}
     */
    public function getTemplateData() {
        $data = parent::getTemplateData();

        $data["html-articlecount"] = SiteStats::articles();
        // trying to overwrite
        $data["msg-lakeus-articlecount"] = wfMessage( 'lakeus-articlecount' )->numParams( SiteStats::articles() )->parse();

        return $data;
    }
}
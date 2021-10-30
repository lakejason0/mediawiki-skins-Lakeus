<?php

namespace Lakeus;

class Hooks
{
    /**
     * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Hooks/GetPreferences
     * @param User $user
     * @param array $preferences
     */
    public static function onGetPreferences($user, &$preferences)
    {
        // A checkbox
        $preferences['lakeus-enable-theme-designer'] = [
            'type' => 'check',
            'label-message' => 'lakeus-preferences-enable-theme-designer', // a system message
            'help-message' => 'lakeus-preferences-enable-theme-designer-desc',
            'section' => 'rendering/skin/skin-prefs',
            'hide-if' => [ '!==', 'wpskin', 'lakeus' ],
        ];
    }
}

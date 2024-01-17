# mediawiki-skins-Lakeus

*For the description on MediaWiki.org, see [here](https://mediawiki.org/wiki/Skin:Lakeus).*

My first MediaWiki skin.

## Description

Lakeus is a simple skin made for MediaWiki by Lakejason0 and other contributors, which is named after a character in Lakejason0's novels. It's based on the skin template provided by [The skins lab tool](https://skins.wmflabs.org/#/add).

The skin covers most of the basic functions of MediaWiki, esp. for `zh` users that I added a separate variant menu.

You can customize this skin through CSS variables; see [Skin:Lakeus on MediaWiki](https://mediawiki.org/wiki/Skin:Lakeus#Customization) for details.

Unfortunately I know nothing of PHP, so the result might not be that amazing to you.

## Requirements

* A running instance of MediaWiki 1.36 or higher
  * This is because to use the Mustache templates in 1.35 I need to extend the `SkinMustache` class in PHP, but it's out of my ability.

## Installation

To install the skin,

* Download the repository;
* Create a folder called `Lakeus` in `skins` directory of your MediaWiki;
* Extract the archive file contents in the `Lakeus` folder;
* Put this in your `LocalSettings.php`:
```php
wfLoadSkin( 'Lakeus' );
```

## Live Preview

For a live preview, check it on my own wiki [Project Archive](https://lakeus.xyz/wiki/首页?useskin=lakeus) or [MediaWiki Skins Wiki](https://skins.toolforge.org/index.php?useskin=lakeus).

## Localization

Translate the skin on [translatewiki.net](https://translatewiki.net/wiki/Special:Translate?action=translate&group=mwgithub-lakeus)!

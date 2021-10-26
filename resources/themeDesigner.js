window.Lakeus = window.Lakeus || {};

Lakeus.initThemeDesigner = function () {
    console.log("[Lakeus] Theme Designer is loading...");
    var stylePath = mw.config.get('stylepath');
    $('head').append('<link rel="stylesheet" href="' + stylePath + '/Lakeus/resources/themeDesigner.css' + '" type="text/css" />');
    $("body").append('<div id="lakeus-theme-designer"><button id="lakeus-theme-designer-modal-button">🖌️</button></div>');
    console.log("[Lakeus] Theme Designer is loaded.");
};
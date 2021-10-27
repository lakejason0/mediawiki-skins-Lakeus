window.Lakeus = window.Lakeus || {};

Lakeus.initThemeDesigner = function() {

    Lakeus.calculateColorByLuminance = function(hex, lum) {
        // validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        }
        lum = lum || 0;
    
        // convert to decimal and change luminosity
        var rgb = "#", c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i*2,2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00"+c).substr(c.length);
        }
    
        return rgb;
    }

    Lakeus.getContrastYIQ = function(hexcolor){
        hexcolor = hexcolor.replace("#", "");
        var r = parseInt(hexcolor.substr(0,2),16);
        var g = parseInt(hexcolor.substr(2,2),16);
        var b = parseInt(hexcolor.substr(4,2),16);
        var yiq = ((r*299)+(g*587)+(b*114))/1000;
        return (yiq >= 128) ? 'black' : 'white';
    }

    Lakeus.variablesList = [
        {
            title: "lakeus-theme-designer-global",
            variables: {
                "background-color-base": {
                    rule: "manual",
                    input: "color",
                    default: "white",
                },
                "color-link": {
                    rule: "manual",
                    input: "color",
                    default: "#0645ad",
                },
                "color-link--visited": {
                    rule: "calculateWhenNeeded",
                    input: "color",
                    default: "#0b0080",
                    calculate: function(i) {
                        return Lakeus.calculateColorByLuminance(i, 0.8);
                    },
                },
                "font-family": {
                    rule: "manual",
                    input: "text",
                    default: "'Roboto', -apple-system, blinkmacsystemfont, 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Helvetica Neue', sans-serif",
                },
                "font-family-serif": {
                    rule: "manual",
                    input: "text",
                    default: "'Linux Libertine', 'Times New Roman', 'Liberation Serif', 'Nimbus Roman', 'Noto Serif', 'Times', serif",
                },
            }
        },
        {
            title: "lakeus-theme-designer-page-header",
            variables: {
                "color-header": {
                    rule: "manual",
                    input: "color",
                    default: "white",
                },
                "background-color-search-suggestions": {
                    rule: "manual",
                    input: "color",
                    default: "#fff"
                },
                "background-color-search-suggestions-current": {
                    rule: "manual",
                    input: "color",
                    default: "#1d5492",
                },
                "color-search-suggestions-text": {
                    rule: "calculateWhenNeeded",
                    input: "color",
                    default: "#000",
                    calculate: function(i) {
                        return Lakeus.getContrastYIQ(i);
                    },
                },
                "color-search-suggestions-text-current": {
                    rule: "calculateWhenNeeded",
                    input: "color",
                    default: "#fff",
                    calculate: function(i) {
                        return Lakeus.getContrastYIQ(i);
                    },
                },
            },
        },
    ];

    function constructThemeDesignerBody() {
        for (section in Lakeus.variablesList) {
            var titleElement = '<h3 class="lakeus-theme-designer-title">' + section.title + '</h3>';
            var settingsElement = constructVariables(section.variables);
            result += '<div class="lakeus-theme-designer-section">' + titleElement + settingsElement + '</div>';
        }
        return result;
    }

    function constructVariables(variables) {
        for (variable in variables.keys()) {
            result += constructVariableItem(variables.variable);
        }
        return result;
    }

    function constructVariableItem(item) {
        var inputElement = '';
        if (item.input === 'color') {
            inputElement = '<input type="color" value="' + item.default + '" />';
        } else if (item.input === 'text') {
            inputElement = '<input type="text" value="' + item.default + '" />';
        }
        return inputElement;
    }

    function constructThemeDesigner() {
        $("body").append(
            '<div id="lakeus-theme-designer">' + 
                '<div id="lakeus-theme-designer-portlet" aria-labelledby="lakeus-theme-designer-modal-button">' +
                    '<input type="checkbox" aria-labelledby="lakeus-theme-designer-modal-button">' +
                    '<button id="lakeus-theme-designer-modal-button">🖌️</button>' + 
                    '<form id="lakeus-theme-designer-portlet-body">' +
                        constructThemeDesignerBody() +
                    '<form>' +
                '</div>' +
            '</div>'
        );
    }

    console.log("[Lakeus] Theme Designer is loading...");
    $.when( mw.loader.using( [ 'mediawiki.api', 'mediawiki.jqueryMsg' ] ), $.ready ).then( function() {
        return new mw.Api().loadMessagesIfMissing( [
            'lakeus-theme-designer-system-message-loaded', 
            'lakeus-theme-designer-all-loaded',
            'lakeus-theme-designer-page-header',
        ] );
    }).then( function() {
        console.log("[Lakeus] " + mw.message( 'lakeus-theme-designer-system-messages-loaded' ) );
        var stylePath = mw.config.get('stylepath');
        $('head').append('<link rel="stylesheet" href="' + stylePath + '/Lakeus/resources/themeDesigner.css' + '" type="text/css" />');
        constructThemeDesigner();
        console.log("[Lakeus] " + mw.message( 'lakeus-theme-designer-all-loaded' ) );
    });
};
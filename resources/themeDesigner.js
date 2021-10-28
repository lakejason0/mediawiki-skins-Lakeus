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

    Lakeus.variablesList = {
        "background-color-base": {
            fieldset: "lakeus-theme-designer-global",
            rule: "manual",
            input: "color",
            default: "white",
            calculate: function(i) {
                return i;
            },
        },
        "color-link": {
            fieldset: "lakeus-theme-designer-global",
            rule: "manual",
            input: "color",
            default: "#0645ad",
            calculate: function(i) {
                return i;
            },
        },
        "color-link--visited": {
            fieldset: "lakeus-theme-designer-global",
            rule: "calculateWhenNotNeeded",
            input: "color",
            default: "#0b0080",
            calculate: function(i) {
                return Lakeus.calculateColorByLuminance(i, 0.8);
            },
        },
        "font-family": {
            fieldset: "lakeus-theme-designer-global",
            rule: "manual",
            input: "text",
            default: "'Roboto', -apple-system, blinkmacsystemfont, 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Helvetica Neue', sans-serif",
            calculate: function(i) {
                return i;
            },
        },
        "font-family-serif": {
            fieldset: "lakeus-theme-designer-global",
            rule: "manual",
            input: "text",
            default: "'Linux Libertine', 'Times New Roman', 'Liberation Serif', 'Nimbus Roman', 'Noto Serif', 'Times', serif",
            calculate: function(i) {
                return i;
            },
        },
        "color-header": {
            fieldset: "lakeus-theme-designer-page-header",
            rule: "manual",
            input: "color",
            default: "white",
            calculate: function(i) {
                return i;
            },
        },
        "background-color-search-suggestions": {
            fieldset: "lakeus-theme-designer-page-header",
            rule: "manual",
            input: "color",
            default: "#ffffff",
            calculate: function(i) {
                return i;
            },
        },
        "background-color-search-suggestions-current": {
            fieldset: "lakeus-theme-designer-page-header",
            rule: "manual",
            input: "color",
            default: "#1d5492",
            calculate: function(i) {
                return i;
            },
        },
        "color-search-suggestions-text": {
            fieldset: "lakeus-theme-designer-page-header",
            rule: "calculateWhenNotNeeded",
            input: "color",
            default: "#000000",
            calculate: function(i) {
                return Lakeus.getContrastYIQ(i);
            },
        },
        "color-search-suggestions-text-current": {
            fieldset: "lakeus-theme-designer-page-header",
            rule: "calculateWhenNotNeeded",
            input: "color",
            default: "#ffffff",
            calculate: function(i) {
                return Lakeus.getContrastYIQ(i);
            },
        },
        "background-color-search-input": {
            fieldset: "lakeus-theme-designer-page-header",
            rule: "manual",
            input: "color",
            default: "#ffffff",
            calculate: function(i) {
                return i;
            },
        },
        "background-color-toggle-list": {
            fieldset: "lakeus-theme-designer-toggle-list",
            rule: "manual",
            input: "color",
            default: "#ffffff",
            calculate: function(i){
                return i;
            },
        },
    };

    function constructThemeDesignerBody() {
        var fieldsetList = [];
        var result = '';
        $.each(Lakeus.variablesList, function(k,v){
            console.log(v);
            if ( !(fieldsetList.includes(v.fieldset)) ) {
                fieldsetList.push(v.fieldset);
            }
        })
        for (fieldset of fieldsetList) {
            var fieldsetElement = '<fieldset class="lakeus-theme-designer-fieldset" id="lakeus-theme-designer-fieldset-' + fieldset + '">';
            var legendElement = '<legend class="lakeus-theme-designer-title">' + mw.message( fieldset ) + '</legend>';
            var settingsElement = '';
            $.each(Lakeus.variablesList, function(k,v) {
                if (v.fieldset === fieldset) {
                    settingsElement += constructVariableItem(k, v);
                } 
            });
            fieldsetElement += legendElement + settingsElement + '</fieldset>';
            result += fieldsetElement;
        }
        return result;
    }

    function constructVariableItem(variableName, variableContent) {
        var settingElement = '<p class="lakeus-theme-designer-variable-section" id="lakeus-theme-designer-variable-section-' + variableName + '">';
        if (variableContent.input === 'color') {
            settingElement += 
                '<label>' +
                    mw.message( 'lakeus-theme-designer-' + variableName ) + 
                    '<input type="color" name="' + variableName + '" id="lakeus-theme-designer-input-' + variableName + '" value="' + variableContent.default + '" />' + 
                '</label>';
        } else if (variableContent.input === 'text') {
            settingElement += 
                '<label>' + 
                    mw.message( 'lakeus-theme-designer-' + variableName ) + 
                    '<input type="text" name="' + variableName + '" id="lakeus-theme-designer-input-' + variableName + '" value="' + variableContent.default + '" />' + 
                '</label>';
        } else if (variableContent.input === 'textarea') {
            settingElement += 
                '<label>' + 
                    mw.message( 'lakeus-theme-designer-' + variableName ) + 
                    '<input type="textarea" name="' + variableName + '" id="lakeus-theme-designer-input-' + variableName + '" value="' + variableContent.default + '" />' + 
                '</label>';
        }

        if (variableContent.rule === 'calculateWhenNotNeeded') {
            settingElement += 
                '<label>' + 
                    mw.message( 'lakeus-theme-designer-auto-calculate' ) + 
                    '<input type="checkbox" name="' + 'auto-calculate-' + variableName + '" id="lakeus-theme-designer-input-auto-calculate-' + variableName + '">' + 
                '</label>';
        } else if (variableContent.rule === 'calculateWhenNeeded') {
            settingElement += 
                '<label>' + 
                    mw.message( 'lakeus-theme-designer-auto-calculate' ) + 
                    '<input checked type="checkbox" name="' + 'auto-calculate-' + variableName + '" id="lakeus-theme-designer-input-auto-calculate-' + variableName + '">' + 
                '</label>';
        }

        settingElement += '</p>'
        return settingElement;
    }

    function constructThemeDesigner() {
        $("body").append(
            '<div id="lakeus-theme-designer">' + 
                '<div id="lakeus-theme-designer-portlet" aria-labelledby="lakeus-theme-designer-modal-button">' +
                    '<input type="checkbox" id="lakeus-theme-designer-modal-checkbox-hack" aria-labelledby="lakeus-theme-designer-modal-button">' +
                    '<button id="lakeus-theme-designer-modal-button">🖌️</button>' + 
                    '<form id="lakeus-theme-designer-portlet-body">' +
                        '<div id="lakeus-theme-designer-portlet-body-container">' +
                            constructThemeDesignerBody() +
                        '</div>' +
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
            'lakeus-theme-designer-global',
        ] );
    }).then( function() {
        console.log("[Lakeus] " + mw.message( 'lakeus-theme-designer-system-messages-loaded' ) );
        var stylePath = mw.config.get('stylepath');
        // $('head').append('<link rel="stylesheet" href="' + stylePath + '/Lakeus/resources/themeDesigner.css' + '" type="text/css" />');
        constructThemeDesigner();
        console.log("[Lakeus] " + mw.message( 'lakeus-theme-designer-all-loaded' ) );
    });
};
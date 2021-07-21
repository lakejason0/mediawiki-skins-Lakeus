/* scripts can go here */
$( function (){
    $(document).on('click', function(e) {
        var portletMenuList = $(".mw-portlet-body ul");
        if (!$(e.target).closest(portletMenuList).length) {
            $(".mw-portlet input[type=checkbox]").prop('checked', false);
        }
    });
} );
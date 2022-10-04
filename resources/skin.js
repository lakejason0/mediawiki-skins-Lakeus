/* scripts can go here */
window.Lakeus = window.Lakeus || {};
Lakeus.portletOutsideClose = function (id) {
    $(document).on('click', function (event) {
        var container = document.getElementById(id);
        if (container) {
            if (container !== event.target && !container.contains(event.target)) {
                $('#' + id + ' input[type="checkbox"]').prop('checked', false);
            }
        }
    })
}
Lakeus.stickyTOCAutoCollapse = function () {
    $(document).on('click', function (event) {
        var container = document.getElementById('lakeus-sticky-toc');
        if (container) {
            if ( Lakeus.isStickyTOCAutoCollapse ) {
                if ( $(event.target).is('.lakeus-sticky-toc-anchor') || $(event.target).is('.lakeus-sticky-toc-tocnumber') || $(event.target).is('.lakeus-sticky-toc-toctext') ) {
                    $('#lakeus-sticky-toc input[type="checkbox"]').prop('checked', false);
                }
            }
            if ( !$(event.target).closest('#lakeus-sticky-toc').length && !$(event.target).is('#lakeus-sticky-toc') ) {
                $('#lakeus-sticky-toc input[type="checkbox"]').prop('checked', false);
            }
        }
    })
    if(!$('#lakeus-sticky-toc-portlet-body-container > ul').find("*").length) {
        $('#lakeus-sticky-toc').remove();
    }
}
$(function () {
    Lakeus.portletOutsideClose('p-personal');
    Lakeus.portletOutsideClose('p-cactions');
    Lakeus.portletOutsideClose('p-lang');
    Lakeus.portletOutsideClose('p-variants');
    Lakeus.portletOutsideClose('p-tb');
    Lakeus.stickyTOCAutoCollapse();
});
$.when(mw.loader.using(['user.options']), $.ready).then(function () {
    Lakeus.isStickyTOCAutoCollapse = !mw.user.options.get('lakeus-sticky-toc-donot-auto-collapse');
});
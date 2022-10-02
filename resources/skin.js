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
Lakeus.stickyTOCOutsideClose = function () {
    $(document).on('click', function (event) {
        var container = document.getElementById('#lakeus-sticky-toc');
        if (container) {
            if(!$(event.target).closest('#lakeus-sticky-toc').length && !$(event.target).is('#lakeus-sticky-toc') || $(event.target).is('.lakeus-sticky-toc-anchor') ) {
                $('#lakeus-sticky-toc input[type="checkbox"]').prop('checked', false);
            }
        }
    })
}
$(function () {
    Lakeus.portletOutsideClose('p-personal');
    Lakeus.portletOutsideClose('p-cactions');
    Lakeus.portletOutsideClose('p-lang');
    Lakeus.portletOutsideClose('p-variants');
    Lakeus.portletOutsideClose('p-tb');
    Lakeus.stickyTOCOutsideClose();
});

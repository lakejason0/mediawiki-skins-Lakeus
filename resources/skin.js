/* scripts can go here */
window.Lakeus = window.Lakeus || {};
Lakeus.portletOutsideClose = function (id) {
    $(document).on('click', function (event) {
        var $target = $(event.target);
        if ((!$target.closest(id + ' .mw-portlet-body ul').length ||
            !$target.closest(id + ' .mw-portlet input[type="checkbox"]').length) &&
            ($(id + ' .mw-portlet-body').css("opacity") == 1)) {
            $(id + ' input[type="checkbox"]').prop('checked', false);
        }
    })
}
$(function () {
    Lakeus.portletOutsideClose('#p-personal');
    Lakeus.portletOutsideClose('#p-cactions');
    Lakeus.portletOutsideClose('#p-lang');
    Lakeus.portletOutsideClose('#p-variants');
});
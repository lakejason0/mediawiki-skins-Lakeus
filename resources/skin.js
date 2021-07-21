/* scripts can go here */
$(function () {
    function portletOutsideClose(id) {
        $(document).on('click', function (event) {
            var $target = $(event.target);
            if ((!$target.closest(id + ' .mw-portlet-body ul').length ||
                !$target.closest(id + ' .mw-portlet input[type="checkbox"]').length) &&
                ($(id + ' .mw-portlet-body').css("opacity") == 1)) {
                $(id + ' input[type="checkbox"]').prop('checked', false);
            }
        })
    }
    portletOutsideClose('#p-personal');
    portletOutsideClose('#p-cactions');
    portletOutsideClose('#p-lang');
    portletOutsideClose('#p-variants');
});
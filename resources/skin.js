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
$(function () {
    Lakeus.portletOutsideClose('p-personal');
    Lakeus.portletOutsideClose('p-cactions');
    Lakeus.portletOutsideClose('p-lang');
    Lakeus.portletOutsideClose('p-variants');
    Lakeus.portletOutsideClose('p-tb');
});
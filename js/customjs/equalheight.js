
function equal_height() { 
    // Equal Card Height, Text Height and Title Height
    $('.jQueryEqualHeightD').jQueryEqualHeight('.card .card-body .card-title');
    $('.jQueryEqualHeightD').jQueryEqualHeight('.card .card-body .list-unstyled');
    $('.jQueryEqualHeightD').jQueryEqualHeight('.card');
}
$(window).on('load', function(event) {
    equal_height();
});
$(window).resize(function(event) {
    equal_height();
});
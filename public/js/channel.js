$(function () {

    var category = $("#category").val();

    $("#leftNavbar li").each(function (index) {
        if (index == 0) {
            $(this).removeClass("active");
        }

        if (category == 1 && index == 1) {
            $(this).addClass("active");
        }

        if (category == 2 && index == 2) {
            $(this).addClass("active");
        }
    })
});

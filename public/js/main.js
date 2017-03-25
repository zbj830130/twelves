$(function () {
    $("body").css("margin-top", $("nav").height());

    $("#leftNavbar a").click(function () {
        $(this).parent().parent().children("li").each(function () {
            $(this).removeClass("active");
        })

        $(this).parent().addClass("active");
    })

    $(window).resize(function () {
        $("body").css("margin-top", $("nav").height());
    })
});

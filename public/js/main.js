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

    $('#miniCartDiv').on('show.bs.modal', function () {
        $.get("/miniCart?r=" + Math.random(),
            function (result) {
                $("#miniCartDivBody").html("");
                $("#miniCartDivBody").html(result);
                $.each($("#miniCartDivBody").children(), function () {
                    sku = $(this).find("input").eq(0).val();
                    initEachItem(sku);
                });
            });
    });

    getMiniCartItemAmount();

});

function getShoppingCartCookie() {
    var sCartInfo = $.cookie(shoppingCartCookieName);
    if (typeof (sCartInfo) == "undefined") {
        return jQuery.parseJSON('[]');
    } else {
        return jQuery.parseJSON(sCartInfo);
    }
}

function getMiniCartItemAmount() {
    var cartData = getShoppingCartCookie();

    var totalCount = 0;

    $.each(cartData, function (index, content) {
        totalCount += content.qty;
    });

    $("#miniCartAmount").text(totalCount);
}

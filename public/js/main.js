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

    $("#userLogout").click(function () {
        $("#loginButton").show();
        $("#loginUserName").text("");
        $("#userLogout").text("");
        $.cookie(userLoginCookieName, "");
    });

    getMiniCartItemAmount();
    getUsernameCookie();

});

function getShoppingCartCookie() {
    var sCartInfo = $.cookie(shoppingCartCookieName);
    if (typeof (sCartInfo) == "undefined") {
        return jQuery.parseJSON('[]');
    } else {
        return jQuery.parseJSON(sCartInfo);
    }
}

function getUsernameCookie() {
    var userlogin = $.cookie(userLoginCookieName);
    if (typeof (userlogin) == "undefined" || userlogin.length == 0) {
        $("#loginButton").show();
        $("#loginUserName").text("");
        $("#userLogout").text("");
        $.cookie(userLoginCookieName, "");
        return
    } else {
        var loginUserInfo = jQuery.parseJSON(userlogin);
        $("#loginButton").hide();
        $("#loginUserName").text(loginUserInfo.username);
        $("#userLogout").text("Logout");
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

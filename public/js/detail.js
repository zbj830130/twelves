$(function () {

    $("#leftNavbar li").each(function (index) {
        if (index == 0) {
            $(this).removeClass("active");
        }

        if (index == 1 || index == 2) {
            $(this).hide();
        }
    })

    $("#minusQty").addClass("disabled");

    $("#minusQty").click(function () {
        minusQty();
    });

    $("#plusQty").click(function () {
        plusQty();
    });

    $("#addtoCartBut").click(function () {
        addToCart();
    });
});

function addToCart() {
    var size = $("#sizeSelcted").find("option:selected").text();
    var sku = $("#sizeSelcted").val();
    var qty = getCurPageQty();
    var name = $("#productName").text();
    var picurl = $("#picUrl").val();

    var cartData = getShoppingCartCookie();
    var isContent = false;

    $.each(cartData, function (index, content) {
        if (content.sku == sku) {
            content.qty = qty;
            isContent = true;
        }
    });

    if (isContent == false) {
        var item = {};
        item['sku'] = sku;
        item['qty'] = qty;
        item['size'] = size;
        item['name'] = name;
        item['picurl'] = picurl;
        cartData.push(item);
    }

    $.cookie('chZodiacShoppingCart', JSON.stringify(cartData), {
        expires: 7,
        path: '/'
    });
}

function minusQty() {
    if (getCurPageQty() > 1) {
        $("#minusQty").removeClass("disabled");
        $("#plusQty").removeClass("disabled");

        $("#qty").text(getCurPageQty() - 1);
    } else {
        $("#minusQty").addClass("disabled");
    }
}

function plusQty() {
    if (getCurPageQty() < 10) {
        $("#minusQty").removeClass("disabled");
        $("#plusQty").removeClass("disabled");

        $("#qty").text(getCurPageQty() + 1);

        if (getCurPageQty() >= 10) {
            $("#plusQty").addClass("disabled");
        }
    } else {
        $("#plusQty").addClass("disabled");
    }
}

function getCurPageQty() {
    return parseInt($("#qty").text());
}

function getShoppingCartCookie() {
    return jQuery.parseJSON($.cookie('chZodiacShoppingCart'));
}

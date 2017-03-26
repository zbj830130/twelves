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
    });
    
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
    var color = $("#color").val();

    var cartData = getShoppingCartCookie();
    var isContent = false;

    var totalCount = 0;

    $.each(cartData, function (index, content) {
        if (content.sku == sku) {
            content.qty = qty;
            isContent = true;
        }

        totalCount += content.qty;
    });

    if (isContent == false) {
        var item = {};
        item['sku'] = sku;
        item['qty'] = qty;
        item['size'] = size;
        item['name'] = name;
        item['picurl'] = picurl;
        item['color'] = color;
        cartData.push(item);

        totalCount += qty;
    }

    $.cookie(shoppingCartCookieName, JSON.stringify(cartData), {
        expires: 7,
        path: '/'
    });

    $("#miniCartAmount").text(totalCount);
}

function minusQty() {
    var qty = getCurPageQty();

    if (qty > minQtyForEachProduct) {
        $("#minusQty").removeClass("disabled");
        $("#plusQty").removeClass("disabled");

        qty--;
        $("#qty").text(qty);
        if (qty == 1) {
            $("#minusQty").addClass("disabled");
        }
    } else {
        $("#minusQty").addClass("disabled");
    }
}

function plusQty() {
    var qty = getCurPageQty();

    if (qty < maxQtyForEachProduct) {
        $("#minusQty").removeClass("disabled");
        $("#plusQty").removeClass("disabled");

        qty++;
        $("#qty").text(qty);

        if (qty >= maxQtyForEachProduct) {
            $("#plusQty").addClass("disabled");
        }
    } else {
        $("#plusQty").addClass("disabled");
    }
}

function getCurPageQty() {
    return parseInt($("#qty").text());
}

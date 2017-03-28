$(function () {
    $.each($("#shoppingBody").children(), function () {
        sku = $(this).find("input").eq(0).val();
        sIndexInitEachItem(sku);
    });
});

function sIndexInitEachItem(sku) {
    var qty = sIndexCurrentItemQty(sku);
    if (qty == minQtyForEachProduct) {
        $("#sIndex_Minus_" + sku).addClass("disabled");
    }

    if (qty == maxQtyForEachProduct) {
        $("#sIndex_Plus_" + sku).addClass("disabled");
    }
}

function sCartMinusQty(sku) {
    var qty = sIndexCurrentItemQty(sku);
    if (qty == 1) {
        return;
    }

    qty--;

    if (qty == minQtyForEachProduct) {
        $("#sIndex_Minus_" + sku).addClass("disabled");
        $("#sIndex_Plus_" + sku).removeClass("disabled");
    } else {
        $("#sIndex_Minus_" + sku).removeClass("disabled");
        $("#sIndex_Plus_" + sku).removeClass("disabled");
    }

    updateSCartData(qty, sku);
}

function sCartPlusQty(sku) {
    var qty = sIndexCurrentItemQty(sku);
    if (qty == maxQtyForEachProduct) {
        return;
    }

    qty++;
    if (qty == maxQtyForEachProduct) {
        $("#sIndex_Plus_" + sku).addClass("disabled");
        $("#minus_" + sku).removeClass("disabled");
    } else {
        $("#sIndex_Plus_" + sku).removeClass("disabled");
        $("#sIndex_Minus_" + sku).removeClass("disabled");
    }

    updateSCartData(qty, sku);

}

function sCartDeleItem(sku) {
    var cartData = getShoppingCartCookie();
    var newCartData = jQuery.parseJSON('[]');
    var totalCount = 0;
    var totalPrice = 0;

    $.each(cartData, function (index, content) {
        if (content.sku !== sku) {
            newCartData.push(content);
            totalCount += content.qty;
            totalPrice += content.qty * content.price;
        }
    });

    $.cookie(shoppingCartCookieName, JSON.stringify(newCartData), {
        expires: 7,
        path: '/'
    });

    $("#shopping_item_" + sku).remove();
    $("#miniCartAmount").text(totalCount);
    $("#sIndexTotalPrice").text(totalPrice.toFixed(2));

    if ($("#shoppingBody").children().length == 0) {
        $("#shoppingBody").html("<div class=\"div-width-95 noData\">You have no items in shopping cart.</div>");
        $(".shoppingFooter").remove();
    }

}

function updateSCartData(qty, sku) {
    var cartData = getShoppingCartCookie();
    var totalCount = 0;
    var totalPrice = 0;

    $.each(cartData, function (index, content) {
        if (content.sku == sku) {
            content.qty = qty;
        }

        totalCount += content.qty;
        totalPrice += content.qty * content.price;
    });

    $("#sIndex_Qty_" + sku).text(qty);
    $("#miniCartAmount").text(totalCount);
    $("#sIndexTotalPrice").text(totalPrice.toFixed(2));

    $.cookie(shoppingCartCookieName, JSON.stringify(cartData), {
        expires: 7,
        path: '/'
    });
}

function sIndexCurrentItemQty(sku) {
    return parseInt($("#sIndex_Qty_" + sku).text());
}

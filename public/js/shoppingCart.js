function initEachItem(sku) {
    var qty = getCurrentItemAmount(sku);
    if (qty == minQtyForEachProduct) {
        $("#minus_" + sku).addClass("disabled");
    }

    if (qty == maxQtyForEachProduct) {
        $("#plus_" + sku).addClass("disabled");
    }
}

function miniCartMinusQty(sku) {
    var qty = getCurrentItemAmount(sku);
    if (qty == 1) {
        return;
    }

    qty--;

    if (qty == minQtyForEachProduct) {
        $("#minus_" + sku).addClass("disabled");
        $("#plus_" + sku).removeClass("disabled");
    } else {
        $("#minus_" + sku).removeClass("disabled");
        $("#plus_" + sku).removeClass("disabled");
    }

    updatecartData(qty, sku);
}

function miniCartPlusQty(sku) {
    var qty = getCurrentItemAmount(sku);
    if (qty == maxQtyForEachProduct) {
        return;
    }

    qty++;
    if (qty == maxQtyForEachProduct) {
        $("#plus_" + sku).addClass("disabled");
        $("#minus_" + sku).removeClass("disabled");
    } else {
        $("#plus_" + sku).removeClass("disabled");
        $("#minus_" + sku).removeClass("disabled");
    }

    updatecartData(qty, sku);

}

function miniCartDeleItem(sku) {
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

    $("#minisCart_item_" + sku).remove();
    $("#miniCartAmount").text(totalCount);
    if ($("#miniCartDivBody").children().length == 0) {
        $("#miniCartDivBody").html("<div class=\"div-width-95 noData\">You have no items in shopping cart.</div>");
        $("#shoppingFooter").remove();
    }

}

function updatecartData(qty, sku) {
    var cartData = getShoppingCartCookie();
    var totalCount = 0;

    $.each(cartData, function (index, content) {
        if (content.sku == sku) {
            content.qty = qty;
        }

        totalCount += content.qty;
    });

    $("#qty_" + sku).text(qty);
    $("#miniCartAmount").text(totalCount);

    $.cookie(shoppingCartCookieName, JSON.stringify(cartData), {
        expires: 7,
        path: '/'
    });
}

function getCurrentItemAmount(sku) {
    return parseInt($("#qty_" + sku).text());
}

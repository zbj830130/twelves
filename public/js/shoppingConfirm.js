$(function () {
    getAddressList();

    $.get('/shoppingConfirmProductes', function (data) {
        $("#productList").html("");
        $("#productList").html(data);
        $("#sumitOrder").click(function () {
            $(this).attr("href", "/saveOrder?userId=" + $("#address_userId").val() + "&addressId=" + $("#currentAddress").val());
        });
    });

    $("#address_submit").click(function () {
        createAddress();
    });
});

function getAddressList() {
    var userlogin = $.cookie(userLoginCookieName);
    if (typeof (userlogin) == "undefined" || userlogin.length == 0) {
        $.cookie(userLoginCookieName, "");
        location.href = "/";
        return
    } else {
        var loginUserInfo = jQuery.parseJSON(userlogin);
        $("#address_userId").val(loginUserInfo.id);
        $.get('queryAddress', {
            userId: loginUserInfo.id
        }, function (data) {
            $("#addressListDiv").html("");
            $("#addressListDiv").html(data);
            $(".addressItem").click(function () {
                $("#currentAddress").val($(this).find("input").val());
                $(".addressItem").removeClass("addressItemSelected");
                $(this).addClass("addressItemSelected");
            });
        });
    }
}

function createAddress() {
    var name = $("#address_name").val();
    var mobile = $("#address_mobile").val();
    var name = $("#address_address").val();

    if (name.length == 0) {
        showError("address_name", "Name is Empty");
        return;
    }

    if (name.length == 0) {
        showError("address_mobile", "Mobile is Empty");
        return;
    }

    if (name.length == 0) {
        showError("address_address", "Address is Empty");
        return;
    }

    $.ajax({
        type: 'get',
        url: '/addAddress',
        data: $("#new_address_form").serialize(),
        success: function (data) {
            if (data == true) {
                $(".close").click();
                getAddressList();
            } else {
                alert("Create address failed");
            }
        }
    });
}

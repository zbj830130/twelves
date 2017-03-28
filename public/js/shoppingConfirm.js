$(function () {
    getAddressList();
    
    $.get('/shoppingConfirmProductes',function(data){
        $("#productList").html("");
        $("#productList").html(data);
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
        $.get('queryAddress', {
            userId: loginUserInfo.id
        }, function (data) {
            $("#addressListDiv").html("");
            $("#addressListDiv").html(data);
        });
    }
}

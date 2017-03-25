$(function () {
    getCategoryProduct(1, "T-Shirts");
    getCategoryProduct(2, "Puzzles");
});

function getCategoryProduct(categoryID, categoryTitle) {
    $.get("/productlist?r=" + Math.random() + "&category=" + categoryID + "&title=" + categoryTitle,
        function (result) {
            if (categoryID == 1) {
                $("#category1").html(result);
            } else if (categoryID == 2) {
                $("#category2").html(result);
            }
        });
};

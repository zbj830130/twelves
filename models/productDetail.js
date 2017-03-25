var mongoose = require('mongoose');

var productDetailScheme = mongoose.Schema({
    pId: {
        Number
    },
    SPU: {
        type: String
    },
    SKU: {
        type: String
    },
    name: {
        type: String
    },
    size: {
        type: String
    },
    price: {
        type: Number
    },
    qty: {
        type: Number
    }
});

var ProductDetail = mongoose.model('ProductDetail', productDetailScheme);
module.exports = ProductDetail;

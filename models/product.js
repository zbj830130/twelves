var mongoose = require('mongoose');

var productScheme = mongoose.Schema({
    pId: {
        Number
    },
    name: {
        type: String
    },
    picUrl: {
        type: String
    },
    price: {
        type: Number
    },
    cUnit: {
        type: String
    },
    SPU: {
        type: String
    },
    category: {
        type: String
    },
    Color:{
        type:String
    }
});

var Product = mongoose.model('Product', productScheme);
module.exports = Product;

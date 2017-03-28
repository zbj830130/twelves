var mongoose = require('mongoose');

var orderDetailInfoScheme = mongoose.Schema({
    sku: {
        type: String
    },
    qty: {
        type: String
    },
    size: {
        type: String
    },
    name: {
        type: String
    },
    picurl: {
        type: String
    },
    color: {
        type: String
    },
    price: {
        type: Number
    },
    createdate: {
        type: Date
    }
});

var OrderDetaiInfo = mongoose.model('OrderDetaiInfo', orderDetailInfoScheme);
module.exports = OrderDetaiInfo;

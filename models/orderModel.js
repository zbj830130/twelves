var mongoose = require('mongoose');

var OrderInfoScheme = mongoose.Schema({
    userId: {
        type: String
    },
    address: {
        type: Array
    },
    Details: {
        type: Array
    },
    createdate: {
        type: Date
    }
});

var OrderInfo = mongoose.model('OrderInfo', OrderInfoScheme);
module.exports = OrderInfo;

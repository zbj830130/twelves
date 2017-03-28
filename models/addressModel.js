var mongoose = require('mongoose');

var AddressScheme = mongoose.Schema({
    reveivername: {
        type: String
    },
    mobile: {
        type: String
    },
    address: {
        type: String
    },
    userId:{
        type:String
    },
    createdate: {
        type: Date
    }
});

var AddressInfo = mongoose.model('AddressInfo', AddressScheme);
module.exports = AddressInfo;

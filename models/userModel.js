var mongoose = require('mongoose');

var UserInfoScheme = mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    level: {
        type: Number
    },
    createdate: {
        type: Date
    }
});

var UserInfo = mongoose.model('UserInfo', UserInfoScheme);
module.exports = UserInfo;

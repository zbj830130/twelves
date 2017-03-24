var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

exports.openConnection = function () {
    try {
        db = mongoose.connect('mongodb://root:mike1234@ds141490.mlab.com:41490/heroku_5c9zcgst'); //- starting a db connection
    } catch (err) {
        db = mongoose.createConnection('mongodb://root:mike1234@ds141490.mlab.com:41490/heroku_5c9zcgst'); //- starting another db connection
    }

    return db;
};

exports.closeConnection = function (db) {
    db.connection.close();
};

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

exports.openConnection = function () {
    try {
        db = mongoose.connect('mongodb://root:mike123@ds141490.mlab.com:41490/chzodiacs'); //- starting a db connection
    } catch (err) {
        db = mongoose.createConnection('mongodb://root:mike123@ds141490.mlab.com:41490/chzodiacs'); //- starting another db connection
    }

    return db;
};

exports.closeConnection = function (db) {
    db.connection.close();
};

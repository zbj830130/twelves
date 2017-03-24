var mongoose = require('mongoose');
mongoose.Promise = global.Promise;


exports.getProducts = function () {
    var db;

    try {
        db = mongoose.connect('mongodb://root:mike123@ds141490.mlab.com:41490/chzodiacs'); //- starting a db connection
    } catch (err) {
        db = mongoose.createConnection('mongodb://root:mike123@ds141490.mlab.com:41490/chzodiacs'); //- starting another db connection
    }

    var productScheme = mongoose.Schema({
        _id: String,
        name: String,
        picUrl: String,
        price: Number,
        cUnit: String,
        sKU: String
    });

    var products = mongoose.model("Product", {

    });

    products.find({}, function (err, docs) {
        //        console.log(docs.toString());
        products = docs;
    });

    db.connection.close();

    return products;
};

var express = require('express');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Product = require('./models/product.js');
var app = express();
var handlebars = require('express3-handlebars')
    .create({
        defaultLayout: 'main',
        helpers: {
            section: function (name, options) {
                if (!this._sections) this._sections = {};
                this._sections[name] = options.fn(this);
                return null;
            }
        }
    });

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

try {
    mongoose.connect('mongodb://root:mike123@ds141490.mlab.com:41490/chzodiacs'); //- starting a db connection
} catch (err) {
    mongoose.createConnection('mongodb://root:mike123@ds141490.mlab.com:41490/chzodiacs'); //- starting another db connection
}

app.get('/', function (request, response) {
    Product.find({}, function (err, docs) {
        response.render('pages/index', {
            products: docs
        });
        dHelper.closeConnection(db);
    });
});

app.get('/cool', function (request, response) {
    response.send(cool());
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

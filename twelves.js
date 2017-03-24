var express = require('express');
var dHelper = require('./dao/daohelper.js');
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

app.get('/', function (request, response) {
    var db = dHelper.openConnection();
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

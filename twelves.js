var express = require('express');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Product = require('./models/product.js');
var ProductDetail = require('./models/productDetail.js');
var UserInfo = require('./models/userModel.js');

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
app.use(require('cookie-parser')('key'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var db;

try {
    db = mongoose.connect('mongodb://root:mike123@ds141490.mlab.com:41490/chzodiacs'); //- starting a db connection
} catch (err) {
    db = mongoose.createConnection('mongodb://root:mike123@ds141490.mlab.com:41490/chzodiacs'); //- starting another db connection
}

app.get('/', function (request, response) {
    Product.find({}, function (err, docs) {
        response.render('pages/index', {
            products: docs
        });
    });
});

app.get('/productList', function (request, response) {
    var category = request.query.category;
    var title = request.query.title;
    Product.find({
        'category': category
    }, function (err, docs) {
        response.render('pages/productList', {
            products: docs,
            title: title,
            category: category,
            layout: false
        });
    }).limit(6);
});

app.get('/channel', function (request, response) {
    var category = request.query.category;
    var title = request.query.title;
    Product.find({
        'category': category
    }, function (err, docs) {
        response.render('pages/channel', {
            products: docs,
            title: title,
            category: category
        });
    });
});

app.get('/detail', function (request, response) {
    var spu = request.query.SPU;
    Product.find({
            'SPU': spu
        },
        function (err, productInfo) {
            ProductDetail.find({
                'SPU': spu
            }, function (err, productDetail) {
                response.render('pages/detail', {
                    product: productInfo,
                    productDetails: productDetail
                });
            });
        });
});

//get mini shopping cart html
app.get('/miniCart', function (request, response) {
    var miniCart = request.cookies.chZodiacShoppingCart;

    if (typeof (miniCart) == "undefined") {
        response.render('pages/shoppingCartEmpty', {
            layout: false
        });
    } else {
        var miniCartJson = JSON.parse(miniCart);
        if (miniCartJson.length == 0) {
            response.render('pages/shoppingCartEmpty', {
                layout: false
            });
        } else {
            response.render('pages/shoppingCart', {
                items: miniCartJson,
                layout: false
            });
        }
    }

});

app.get('/ShoppingCart', function (request, response) {
    var shoppingCart = request.cookies.chZodiacShoppingCart;

    if (typeof (shoppingCart) == "undefined") {
        response.render('pages/shoppingCartEmpty', {});
    } else {
        var shoppingCartInfp = JSON.parse(shoppingCart);
        if (shoppingCartInfp.length == 0) {
            response.render('pages/shoppingCartEmpty', {});
        } else {
            var totalPrice = 0;
            shoppingCartInfp.forEach(function (item) {
                totalPrice += (item.price * item.qty);
            });

            response.render('pages/shoppingIndex', {
                items: shoppingCartInfp,
                totalPrice: totalPrice.toFixed(2),
                layout: 'shopping'
            });
        }
    }
});

app.get("/regist", function (request, response) {
    var uName = request.query.reg_username;
    var pwd = request.query.reg_password;
    var cPwd = request.query.reg_confirm_password;
    var isContinue = true;

    reg = /^[a-zA-Z]\w{5,15}$/;
    if (!reg.test(uName)) {
        isContinue = false;
    }

    if (!reg.test(pwd)) {
        isContinue = false;
    }

    if (pwd !== cPwd) {
        isContinue = false;
    }

    if (isContinue == true) {
        UserInfo.count({
            username: uName
        }, function (err, total) {
            if (total > 0) {
                response.send(false);
            } else {
                var userInfo = new UserInfo({
                    username: uName,
                    password: pwd,
                    level: 1,
                    createdate: new Date()
                });

                userInfo.save(function (err, res) {
                    var item = {};
                    item['id'] = userInfo.get("_id");
                    item['username'] = uName;

                    response.cookie('userlogin', JSON.stringify(item));
                    response.send(true);
                });
            }
        });
    }
});

app.get("/login", function (request, response) {
    var uName = request.query.log_username;
    var pwd = request.query.log_password;
    var isContinue = true;

    reg = /^[a-zA-Z]\w{5,15}$/;
    if (!reg.test(uName)) {
        isContinue = false;
    }

    if (!reg.test(pwd)) {
        isContinue = false;
    }

    if (isContinue == true) {
        UserInfo.findOne({
            username: uName,
            password: pwd
        }, function (err, docs) {
            if (docs.id) {
                var item = {};
                item['id'] = docs.id;
                item['username'] = uName;

                response.cookie('userlogin', JSON.stringify(item));
                response.send(true);
            } else {
                response.send(false);
            }
        });
    }
});

app.get("/isUsernameExisted", function (request, response) {
    var username = request.query.username;
    UserInfo.count({
        username: username
    }, function (err, total) {
        if (total > 0) {
            response.send(true);
        } else {
            response.send(false);
        }
    });
});

app.get('/cool', function (request, response) {
    response.send(cool());
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

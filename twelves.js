var express = require('express');
var app = express();
var handlebars = require('express3-handlebars')
    .create({
        defaultLayout: 'main'
    });

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get('/', function (request, response) {
    response.render('pages/index')
});

app.get('/cool', function (request, response) {
    response.send(cool());
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

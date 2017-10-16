var express = require('express');
var path = require('path');
var morgan = require('morgan');

var app = express();

app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, 'app')));
app.use(express.static(path.join(__dirname, 'admin')));


app.get('/admin*', function (req, res, next) {
    res.sendfile(path.join(__dirname, 'admin', 'index.html'));
});

app.get('/*', function (req, res, next) {
    res.sendfile(path.join(__dirname, 'app', 'index.html'));
});

app.listen(5002, function () {
    console.log('application is listening in 5002 port');
});
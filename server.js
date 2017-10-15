var express = require('express');
var path = require('path');

var app = express();

app.use('/', express.static(path.join(__dirname, 'app')));

app.get('/*', function (req, res, next) {
    res.sendfile(path.join(__dirname, 'app', 'index.html'));
});

app.listen(5002, function () {
    console.log('application is listening in 5002 port');
});
var express = require('express');
var _ = require('lodash'),
    gen = require('./generator');

var app = express();

app.get('/api/people', function (req, res) {
    var data = _.times(100, (x)=> gen.person());
    res.send(data);
});

app.get('/api/projects', function (req, res) {
    var data = _.times(50, (x)=> gen.project());
    res.send(data);
});

var server = app.listen(3000, function () {
    var port = server.address().port;

    console.log('API Server on http://localhost:%s', port);
});
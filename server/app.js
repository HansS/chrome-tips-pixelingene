var express = require('express');
var _ = require('lodash'),
    faker = require('faker');

var app = express();

app.get('/api', function (req, res) {
    var data = _.times(100, (x)=> {
        return {
            firstName: faker.name.firstName()
        };
    });

    res.send(data);
});

var server = app.listen(3000, function () {
    var port = server.address().port;

    console.log('Example app listening at http://localhost:%s', port);
});
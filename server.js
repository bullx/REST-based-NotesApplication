var express = require('express');
var client = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var app = express();
var db = require('./db');
var port = 3000;
app.use(bodyParser.urlencoded({extended: true}));


client.connect(db.url, function (err, database) {
    if (err) {
        return console.log(err);
    }

    require('./routes')(app, database);
    app.listen(port, function () {
        console.log('Server running on port ' + port);
    });
});


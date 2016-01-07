var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var router = express.Router();
//var router = require(./routers/router.js);

var app = express();
var port = process.env.PORT || 8080;

app.use(express.static(__dirname+'/../public'));
//app.use(express.static(path.join(__dirname, "../client")));


app.listen(port);
console.log('Listening on ' + port);

// module.exports = app; 


//SEQUELIZE
var express = require('express');
var path = require('path');

var bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    passport = require('passport')

    db = require('./models/dbconnect')
var geoip = require('geoip-lite');

var app = express();
var port = process.env.PORT || 8080;

// require('./models/dbroutes.js')(app, express);

app.use(bodyParser());
app.use(require('connect-multiparty')())
app.use(cookieParser())
app.use(session({secret: '1234567890QWERTY'}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(db.User.createStrategy())

passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());


/////////it's only callback


//Need to switch this out

app.use(express.static(__dirname+'/../public'));

app.listen(port);
console.log('Listening on ' + port);

require('./routers/router.js')(app, express);

module.exports = app; 


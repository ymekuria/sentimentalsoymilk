// var User = require('../models/users.js');
// var Trips = require('../models/trips.js');
// var TripItem = require('../models/tripItems.js');
var request = require('request');
var key = require('../env/config')


module.exports = {
  //users
  login: function(req, res, next) {
    console.log("post-login server hit");
    res.send("/sign up says: hello its me");
    // var username = req.body.username;
    // var password = req.body.password;
  }, 
  signup: function(req, res, next) {
    console.log("post-signup server hit");
    res.send("/sign up says: hello its me");
    // var username = req.body.username;
    // var password = req.body.password;
  }, 
  checkAuth: function(req, res, next){
  }, 
  //trips
  fetchTripData: function(req, res, next) {
    request('https://api.foursquare.com/v2/venues/search?client_id=' +key.API+'&client_secret='+key.SECRET+'&v=20130815&near=chicago,il', function(err, response, body) {
      if (!err && res.statusCode == 200) { 
      } else {
        console.log(err);
      } 
      res.send(body);
      });    
  },
  createTrip: function(req, res, next) {

  },
  editTrip: function(req, res, next) {

  },
  deleteTrip: function(req, res, next) {

  },
  //apiData
  fetchData: function(req, res, next) {

  }
};
// var User = require('../models/users.js');

module.exports = {
  //users
  login: function(req, res, next) {
    console.log("post-login server hit")
    res.send("/sign up says: hello its me")
    // var username = req.body.username;
    // var password = req.body.password;
  }, 
  signup: function(req, res, next) {
    console.log("post-signup server hit")
    res.send("/sign up says: hello its me")
    // var username = req.body.username;
    // var password = req.body.password;
  }, 
  checkAuth: function(req, res, next){
  }, 
  //trips
  accessTrips: function(req, res, next) {

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
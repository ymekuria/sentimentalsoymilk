// var User = require('../models/users.js');
// var Trips = require('../models/trips.js');
// var TripItem = require('../models/tripItems.js');
var db = require('../models/dbconnect.js');
var User = require('../models/users.js');
var Trips = require('../models/trips.js');
var TripItems = require('../models/tripItem.js');
var request = require('request');
var key = require('../env/config');
var bluebird = require('bluebird');


var  filterTripData = function(responseObj) {
  // console.log("WHOLE FILTERED DATA", responseObj);
    var filteredItems = responseObj.reduce(function(totalData, item) { 
      var location = item.venue.location;
      var photoURL = item.venue.featuredPhotos.items[0];
      var tripItem = {
        name: item.venue.name,
        address: location.address + ',' + location.city + ',' + location.cc,
        notes: item.tips[0].text,
        category: item.venue.categories.name,
        rating: item.venue.rating,
        photo: photoURL.prefix + '300x300' + photoURL.suffix,
         url: item.venue.url
      };
      totalData.push(tripItem); 
      return totalData;
    }, []);
    return filteredItems;
};

module.exports = {

  fetchCityData: function(req, res, next) {
    var cityState = req.url.split('/')[2];
    request('https://api.foursquare.com/v2/venues/explore?client_id='+key.API+'&client_secret='+key.SECRET+'&v=20130815&near='+cityState+'&venuePhotos=1', function(err, response, body) {
      if (!err && res.statusCode == 200) { 
      } else {
        console.log(err);
      }
      var filteredResults = filterTripData(JSON.parse(body).response.groups[0].items); 
      res.send(filteredResults);
      });    
  },
  createTrip: function(req, res, next) {
    console.log(req.body);
    var playlist = {
      name: req.body.name,
      destination: [req.body.city, req.body.state],
      activities: req.body.activities
    };
    Trips.create(playlist, function(err, results) {
      if (err) {
        console.log(err);
      }
      res.json(results);
    });
  },
  getTrips: function(req, res, next) {
    Trips.find(function(err, results) {
      if (err) {
        console.log(err);
      }
      res.json(results);
    });
  },
  deleteTrip: function(req, res, next) {

  }
};


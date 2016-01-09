// var User = require('../models/users.js');
// var Trips = require('../models/trips.js');
// var TripItem = require('../models/tripItems.js');
var db = require('./dbconnect.js');
var User = require('./users.js');
var Trips = require('./trips.js');
var TripItems = require('./tripItem.js');
var request = require('request');
var key = require('../env/config')

var  filterTripData = function(responseObj) {
  // console.log("WHOLE FILTERED DATA", responseObj);
    var filteredItems = responseObj.reduce(function(totalData, item) { 
      console.log(item.categories);
      var category = item.categories.length > 0 ? item.categories[0].name : '';
      var tripItem = {
        name: item.name,
        address: item.location.formattedAddress,
        notes: '',
        category: category,
        rating: item.stats.checkinsCountT
      };
      totalData.push(tripItem); 
      return totalData;
    }, []);
    console.log(filteredItems.length);
    return filteredItems;
};

module.exports = {
  fetchCityData: function(req, res, next) {
      console.log('FETCH  City DATA');
    console.log(req.url.split('/'));
    var cityState = req.url.split('/')[2];
    request('https://api.foursquare.com/v2/venues/search?client_id=' +key.API+'&client_secret='+key.SECRET+'&v=20130815&near='+cityState, function(err, response, body) {
      if (err) { 
        console.log(err);
      } else {
        var filteredResults = filterTripData(JSON.parse(body).response.venues); 
        //call filter func
        res.send(JSON.stringify(filteredResults));
      }
    });    
  }, 
  createTrip: function(req, res, next) {
    Trips.create(req.body, function(err, results) {
      if (err) {
        console.log(err);
      }
      res.json(results);
    });
  },
  editTrip: function(req, res, next) {

  },
  deleteTrip: function(req, res, next) {

  }
};


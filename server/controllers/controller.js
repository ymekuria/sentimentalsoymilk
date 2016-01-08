// var User = require('../models/users.js');
// var Trips = require('../models/trips.js');
// var TripItem = require('../models/tripItems.js');
var request = require('request');
var key = require('../env/config')


var  filterTripData = function(responseObj) {
    var filteredItems = responseObj.reduce(function(totalData, item) { 
      var tripItem = {
        name: item.name,
        address: item.location.formattedAddress,
        notes: '',
        category: item.categories[0].shortName,
        rating: item.stats.checkinsCount
      };
      totalData.push(tripItem); 
      return totalData;
    }, []);
    console.log(filteredItems.length);
    return filteredItems;
};

module.exports = {

  fetchTripData: function(req, res, next) {
    request('https://api.foursquare.com/v2/venues/search?client_id=' +key.API+'&client_secret='+key.SECRET+'&v=20130815&near=chicago,il', function(err, response, body) {
      if (!err && res.statusCode == 200) { 
      } else {
        console.log(err);
      }
      var filteredResults = filterTripData(JSON.parse(body).response.venues); 
      //call filter func

      res.send(filteredResults);
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
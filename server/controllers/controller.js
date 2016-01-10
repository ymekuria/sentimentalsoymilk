// var User = require('../models/users.js');
// var Trips = require('../models/trips.js');
// var TripItem = require('../models/tripItems.js');
var request = require('request');
var key = require('../env/config')

var filterTripData = function(responseObj) {
  // prevents server crashing when responseObj is undefined
  if (!responseObj) {
    return;
  }
  var filteredItems = responseObj.reduce(function(totalData, item) { 
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
  return filteredItems;
};

module.exports = {

  fetchCityData: function(req, res, next) {
    var cityState = req.url.split('/')[2];
    request('https://api.foursquare.com/v2/venues/explore?client_id='+key.API+'&client_secret='+key.SECRET+'&v=20130815&near='+cityState+'&venuePhotos=1', function(err, response, body) {
      if (!err && res.statusCode == 200) { 
      } else {
        var filteredResults = filterTripData(JSON.parse(body).response.venues); 
        module.exports.saveCityData(filteredResults).then(function(results){
          res.send(JSON.stringify(results));
        }); //arr of resutls  
        //call filter functions
      }
    });
  }, 
  saveCityData: function(results, next) {
    return TripItems.create(results, function(err, results) {
      if (err) {
        console.log(err);
      }
      var filteredResults = filterTripData(JSON.parse(body).response.groups[0].items); 
      res.send(filteredResults);
      });    
  },

  createTrip: function(req, res, next) {
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
  editTrip: function(req, res, next) {

  },
  deleteTrip: function(req, res, next) {

  },
  //apiData
  fetchData: function(req, res, next) {

  }
};
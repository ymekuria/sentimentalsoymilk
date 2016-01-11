// var User = require('../models/users.js');
var Trips = require('../models/trips.js');
var TripItems = require('../models/tripItem.js');
var request = require('request');
var key = require('../env/config')

var filterTripData = function(responseObj) {
  // prevents server crashing when responseObj is undefined
  if (!responseObj) {
    return;
  }
  var filteredItems = responseObj.reduce(function(totalData, item) { 
    var location = item.venue.location;
    var photoURL = item.venue.featuredPhotos.items[0];
    var tripItem = {
      name: item.venue.name,
      address: location.address + ', ' + location.city + ', ' + location.state + ' ' + location.cc,
      city: location.city,
      notes: item.tips[0].text,
      category: item.venue.categories[0].name,
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
  //search through cached data before making api request
  searchStoredData: function(req, res, next) {
    var cityState = req.url.split('/')[2];
    var cityLowerCase = cityState.split(',')[0];
    var city = cityLowerCase[0].toUpperCase() + cityLowerCase.slice(1);
    console.log("CITY NAME", city);
    TripItems.find({ city: city }, function(err, list) {
      if (list.length < 1) {
        console.log("City not cached; fetching data");
        module.exports.fetchCityData(cityState).then(function(results) {
          res.send(JSON.stringify(results));
        })
      }
      else if (!err) {
        console.log("LIST FROM DB:",list[0]);
        res.send(list);
      } else {
        res.send(err);
      }
    });
  },
  fetchCityData: function(dataToCache) {
    console.log('REACHED fetchCityData', dataToCache);
    return request('https://api.foursquare.com/v2/venues/explore?client_id='+key.API+'&client_secret='+key.SECRET+'&v=20130815&near='+dataToCache+'&venuePhotos=1', function(err, response, body) {
      if (!err && res.statusCode == 200) { 
        var filteredResults = filterTripData(JSON.parse(body).response.groups[0].items);
        module.exports.saveCityData(filteredResults);
      } else {
        res.send(err);
      }
    });
  }, 
  saveCityData: function(results, next) {
    return TripItems.create(results, function(err, results) {
      if (err) {
        console.log(err);
      }
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

  }
};
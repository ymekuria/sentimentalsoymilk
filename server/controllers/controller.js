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
    var notes = item.tips === undefined ? '' : item.tips[0].text; 
    var tripItem = {
      name: item.venue.name,
      address: location.address + ', ' + location.city + ', ' + location.state + ' ' + location.cc,
      city: location.city,
      notes: notes,
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

var parseCityName = function(cityRequest) {
    var cityLowercase = cityRequest.split(',')[0];
    var city = '';
    if (cityLowercase.indexOf(' ') > 0) {
      var splitCity = cityLowercase.split(' ');
      var firstCityHalf = splitCity[0][0].toUpperCase() + splitCity[0].slice(1);
      var secondCityHalf = splitCity[1][0].toUpperCase() + splitCity[1].slice(1);
      city += firstCityHalf + ' ' + secondCityHalf;
    } else {
      city += cityLowercase[0].toUpperCase() + cityLowercase.slice(1);
    }
    return city;
}

module.exports = {
  //search through cached data before making api request
  searchStoredData: function(req, res, next) {
    var city = parseCityName(decodeURI(req.url.split('/')[2]));
    console.log(city);
    TripItems.find({ city: city }, function(err, list) {
      if (list.length < 1) {
        // City not cached; fetching data
        console.log("City not cached; fetching data");
        next();
      }
      else if (!err) {
        // Pulling list from DB
        console.log("Pulling list from DB");
        res.send(list);
      } else {
        res.send(err);
      }
    });
  },
  fetchCityData: function(req, res, next) {
    var cityState = req.url.split('/')[2];
    return request('https://api.foursquare.com/v2/venues/explore?client_id='+key.API+'&client_secret='+key.SECRET+'&v=20130815&near='+cityState+'&venuePhotos=1', function(err, response, body) {
      if (!err && res.statusCode == 200) { 
        var filteredResults = filterTripData(JSON.parse(body).response.groups[0].items);
        module.exports.saveCityData(filteredResults).then(function(results, err) {
        res.send(JSON.stringify(results));
        });
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
      image: req.body.image,
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
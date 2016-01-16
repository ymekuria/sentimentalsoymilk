// var User = require('../models/users.js');
var db = require('../models/dbconnect.js');
var Sequelize = require('sequelize');
var Promise = require('bluebird');
var request = require('request');
var key = require('../env/config')
var async = require('async');


var filterTripData = function(responseObj) {
  return responseObj.reduce(function(totalData, item) { 
    var location = item.venue.location;
    var photoURL = item.venue.featuredPhotos.items[0];
    var notes = item.tips === undefined ? '' : item.tips[0].text; 
    var Activity = {
      name: item.venue.name,
      address: location.address + ', ' + location.city + ', ' + location.state + ' - ' + location.cc,
      city: location.city,
      notes: item.notes,
      lat: location.lat,
      lng: location.lng,
      category: item.venue.categories[0].name,
      rating: item.venue.rating,
      photo: photoURL.prefix + '300x300' + photoURL.suffix,
      url: item.venue.url
    };
    totalData.push(Activity); 
    return totalData;
  }, []);
};


// <h4> parseCityName </h4>
// Accepts the decoded request url, reformats it and 
// returns a string of the city name 
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
  //<h4> searchStoredData </h4> 
  // Parses the city name from the request url param and 
  // checks to see if our database containss that city.
  // If we have a record for that city that is sent in the response, 
  // otherwise fetch directly from the foursquare API using <h4> fetchCityData </h4> 
  // and response with the API data
  // Method: GET
  // Route : /activities/*'

  searchStoredData: function(req, res, next) {
    var city = parseCityName(decodeURI(req.url.split('/')[2]));
    db.Activity.findAll({where: { city: city }})
    .then(function(result, err) {
      if (result.length === 0) {
        console.log('fetching data')
        next();
      } else if (!err) {
        console.log("Pulling list from DB", result);
        res.send(200, result);
      } else {
        res.send(404, err)
      }
    })
  },


  //<h4> fetchCityData </h4> 
  // Fetches data from the Foursquare API if the data is not 
  // already stored in our database
  // Method: GET
  // Route : /activities/*'
  fetchCityData: function(req, res, next) {
    var cityState = req.url.split('/')[2];
    var city = parseCityName(decodeURI(req.url.split('/')[2]));
    return request('https://api.foursquare.com/v2/venues/explore?client_id='+key.API+'&client_secret='+key.SECRET+'&v=20130815&near='+cityState+'&venuePhotos=1', function(err, response, body) {
      // prevent server crashing when responseObj is undefined
      if (!err && JSON.parse(body).meta.code === 200) { 
        var filteredResults = filterTripData(JSON.parse(body).response.groups[0].items);
        module.exports.saveCityData(filteredResults).then(function(results, err) {
          if (err) {
            res.send(err);
          } else {
        //search data for city you just stored. give them stored city data
        //so that way we can access the id of each
        db.Activity.findAll({where: {city: results[0].city }})
        .then(function(data) {
          res.send(data)
        })
      }
    })
      } else {
        res.status(400).send(err);
      }
    });
  }, 


  //<h4>  saveCityData </h4> 
  // Adds the searched city to the database
  // Model: Activitys
  saveCityData: function(results, next) { 
    return db.Activity.bulkCreate(results, function(err, results) {
      if (err) {
        console.log(err);
      }
    });    
  },

  //<h4> createTrip </h4> 
  // Accepts a JSON object to be stored.
  // Example : tripObj = {
    //   name: name,
    //   city: city,
    //   state: state,
    //   activities: activities,
    //   image: image
    // };
  // Method: PUT
  // Route : /trips

  createTrip: function(req, res, next) {
    var playlist = {
      creator: req.body.creator, // added this field to test

      name: req.body.name, 
      area: req.body.city + ", " + req.body.state,
      timeReq: req.body.duration,
      activities: req.body.activities, // [2,3,5]
      image: req.body.image
    };
    
    db.Playlist.create(playlist)
    .then(function(result) {
      result.setActivities(playlist.activities)
    })
    res.send(200);

  },

  //<h3> GetAllTrips </h3> 
  // Returns a JSON of all the data present in the database
  // Method: Get
  // Route : /trips
  getAllTrips: function (req, res, next) {
    db.Playlist.findAll()
    .then(function (results) {
      res.json(results)
    });
  },

  //<h3> accessTrip </h3> 
    // Returns a trip object with name, destination, and actitivites properties
    // Acitivties is an array
    // Method: Get
    // Route : /trips/*
    accessTrip: function(req, res, next) {
    //ID not getting passed correctly from front end
    var tripId = req.params.id;

    var fullActivities = {};
    fullActivities.list = [];
    
    db.Playlist.find({where: {id: tripId}})
    .then(function(found) {
      fullActivities.name = found.dataValues.name
      fullActivities.destination = found.dataValues.area
      fullActivities.time = found.dataValues.timeReq
      return found.id
    })

    .then(function(id) {
      db.ActiveJoin.findAll({where: {PlaylistId: id}})
      .then(function(joinId) {
        //loop through array async style
        var allID=[];
        Sequelize.Utils._.each(joinId, function(item) {
          allID.push(item.ActivityId)
        })
        return allID
      })
      .then(function(arrayIDs) {
        db.Activity.findAll({where: {id: arrayIDs}})
        .then(function(foundItems){
          fullActivities.list.push(foundItems)
          res.send(fullActivities)
        })
      }         
      )}
      )
    },

    submitRating: function(req, res, next) {
      var rating = req.body.rating
      var playlistid = req.body.playlistid

      db.Rating.create({rating: rating, PlaylistId: playlistid})
        .then(function() {   
          res.send(200)
      })
    },

    getRating: function(req, res, next) {
      var trips = req.params.ids.split(',').map(function(element) {
        return parseInt(element)
      });
  
      db.Rating.findAll({where: {PlaylistId: trips}})
        .then(function(results) {
          console.log('results are ', results.length)        

          var ratingObj = results.reduce(function(acc, memo) {
            acc[memo.PlaylistId] = acc[memo.PlaylistId] || []
            acc[memo.PlaylistId].push(memo.rating)
            return acc;

          }, {})

          res.send(200, ratingObj)
        })
    },

    getTimeTrips: function(req,res,next) {
      console.log(">>>>>>>>>>>>", req.params)
      
      res.send(200)

    }
    


      
      // db.Playlist.find({where:{id: playlistid}})
      // .then(function(found) {
      //   found.addRatings(rating)
      // })
      // .then(function(done) { 
      //   res.send(200, done)
      // })
  }
  

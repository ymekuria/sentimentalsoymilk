//MONGO

var controller = require('../controllers/controller.js');
var userController = require('../controllers/userController.js');
var geoip = require('geoip-lite');
var request = require('request');

//MONGO

// var dbController = require('../models/dbroutes.js');

module.exports = function(app, express) {

  //####### Documentation in Controller 

  //These routes work
  app.post('/api/signup', userController.signup);
  app.post('/api/login', userController.login);
  app.get('/logout', userController.logout);
  
  app.get('/activities/*', controller.searchStoredData, controller.fetchCityData);
  
  app.post('/trips', controller.createTrip);
  app.get('/trips', controller.getAllTrips);
  app.get('/trips/:id', controller.accessTrip);


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

var requestCallback = function (query, callback){
  console.log('IN CALLBACK, IN CALLBACK ');
  request(query, function (error, response, body) {
    if (!error && response.statusCode == 200) {
       callback(body);
    }
  });
}
//////////
app.get('/getip', function(req, res){
  var ip = req.headers['x-forwarded-for'] ||
       req.connection.remoteAddress ||
       req.socket.remoteAddress ||
       req.connection.socket.remoteAddress;

  var geo = geoip.lookup(ip);
  console.log(ip)
  console.log('your ip is : ' + ip + "your location is : " + geo.city + ' your latitude and longitude is: '+ geo.ll);
  var query = "https://api.foursquare.com/v2/venues/explore?client_id=LGXX1L30LXIDOASWF4XWHQANZ5PBFUKZ2KZRGUVVTKP2RGJ2&client_secret=EEZFC1FAL0WB2MYDTPGVQLMRGNEHT0ZKQCIVFLY4Z4Z5HY21&v=20130815&ll="+geo.ll+"&venuePhotos=1";

  requestCallback(query, function(result){
    console.log("4S QUERY ==> " + result);
    res.send({api:result, geo: geo});
  });
});

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  //Routes remaining
  app.post('/api/ratings/:id', controller.submitRating);
  app.get('/api/ratings/:ids', controller.getRating);



 //###### Live but not used in production############
  app.get('/api/user/*', userController.findUser);
  app.put('/api/user/*', userController.addTrips);
  app.get('/api/user/trips/*', userController.findAllUserTrips);

  
  //############Pending Routes#####################
  // app.get('/api/user/*/*', userController.findOneUserTrip);
  //app.get('/user', controller.checkAuth);
  // app.get('/activities/*', controller.fetchCityData);
  // app.get('/db/activities', dbController.retrieveActivities);
  // app.post('/db/activities', dbController.storeActivities);
  // app.delete('/trips', controller.deleteTrip);

}
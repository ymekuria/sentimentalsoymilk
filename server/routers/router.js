
var controller = require('../controllers/controller.js');

module.exports = function(app, express) {
  app.post('/login', controller.login);
  app.post('/signup', controller.signup);
  //app.get('/user', controller.checkAuth);

  //app.get('/trips', controller.accessTrips);
  // app.post('/create', controller.createTrip);
  // app.put('/create', controller.editTrip);
  //app.delete('/trips', controller.deleteTrip);

}

var controller = require('../controllers/controller.js');

module.exports = function(app, express) {

  app.post('/login', controller.login);
  app.post('/signup', controller.signup);
  //app.get('/user', controller.checkAuth);

  app.get('/activities', controller.accessTripData);
  app.post('/trips', controller.createTrip);
  app.put('/trips', controller.editTrip);
  //app.delete('/trips', controller.deleteTrip);

}
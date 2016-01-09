var mongoose = require('mongoose');

var tripsItemsSchema = mongoose.Schema({
  name: String,
  address: String,
  // notes: String,
  category: String,
  rating: String
  //link?
});

var TripItem = mongoose.model('TripItem', tripsItemsSchema);
module.exports = TripItem;




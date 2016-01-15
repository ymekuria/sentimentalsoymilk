var mongoose = require('mongoose');

var tripsSchema = mongoose.Schema({
  creator: String,
  name: String,
  duration: String,
  destination: Array,
  image: String,
  

  //keyword: drinking, bars
  //users
  activities : [{ type: mongoose.Schema.ObjectId,
    ref: 'tripItem' }]
});

var Trip = mongoose.model('Trip', tripsSchema);
module.exports = Trip;


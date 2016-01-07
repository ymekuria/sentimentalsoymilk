var mongoose = require('mongoose');

var tripsSchema = mongoose.Schema({
  name: String,
  destination: String,
  purpose: String,
  link: String,
  activities = [{ type: mongoose.Schema.ObjectId,
    ref: 'tripItem' }]
});

var Trip = mongoose.model('Trip', commentSchema);
module.exports = Trip;


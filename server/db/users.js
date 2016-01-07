var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var bluebird = require('bluebird');

var userSchema = mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    trips : { type: Array , default: [] }
});

var User = mongoose.model('User', userSchema);

module.exports = User;
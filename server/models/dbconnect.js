var Sequelize = require('sequelize');
var bcrypt = require('bcrypt-nodejs');

var database = process.env.DATABASE || 'soymilk'
var dbUser = process.env.DBUSER || 'user'
var dbPass = process.env.DBPASS || 'user'
var dbHost = process.env.DBHOST

var db = new Sequelize("soymilk", "root", "", {
    host: dbHost,
});

var User = db.define('User', {
        username: Sequelize.STRING,
        password: Sequelize.STRING,
    });

var Playlist = db.define('Playlist', {
    name: Sequelize.STRING,
    area: Sequelize.STRING,
    timeReq: Sequelize.STRING,
    dateCreate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
    }
  });

var Activity = db.define('Activity', {
    name: Sequelize.STRING,
    address: Sequelize.STRING,
    notes: Sequelize.STRING,
    city: Sequelize.STRING,
    rating: Sequelize.STRING,
    photo: Sequelize.STRING,
    latitude: Sequelize.STRING,
    url: Sequelize.STRING
})

var Rating = db.define('Rating', {
    rating: Sequelize.INTEGER
})

var Favorite = db.define('Favorite', {
    type: Sequelize.BOOLEAN
})

// User.hasMany(Playlist)

Playlist.belongsTo(User)
Playlist.belongsTo(Rating)
Playlist.belongsTo(Favorite)

// Activity.hasMany(Playlist)
// Activity.belongsTo(Playlist)



User.hasMany(Rating)
Rating.belongsTo(User) 



User.hasMany(Favorite)
Favorite.belongsTo(User)


User.sync()
    .then(function() {
        return Activity.sync();
    })
    .then(function() {
        return Playlist.sync();
    })
    .then(function() {
        return Rating.sync();
    })
    .then(function() {
        return Favorite.sync();
    })

exports.User = User;
exports.Playlist = Playlist;
exports.Activity = Activity;

exports.Rating = Rating;
exports.Favorite = Favorite;

 
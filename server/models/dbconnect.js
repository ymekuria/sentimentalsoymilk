var Sequelize = require('sequelize');
var bcrypt = require('bcrypt-nodejs');

var database = process.env.DATABASE || 'soymilk'
var dbUser = process.env.DBUSER || 'user'
var dbPass = process.env.DBPASS || 'user'
var dbHost = process.env.DBHOST,
    
    passportLocalSequelize = require('passport-local-sequelize');


var db = new Sequelize("soymilk", "root", "", {
    host: dbHost,
});

var User = db.define('User', {
    name: Sequelize.STRING,
    password: Sequelize.STRING,
    myhash: Sequelize.STRING,
    mysalt: Sequelize.STRING
    }, {
        instanceMethods: {
            comparePasswords: function(pw, cb) {
                bcrypt.compare(pw, this.getDataValue('password'), function(err, isMatch) {
                    if (err) {
                        return cb(err)
                    } else {
                        cb(null, isMatch)
                    }
                })
            }
        }
    });

passportLocalSequelize.attachToUser(User, {
    usernameField: 'name',
    hashField: 'myhash',
    saltField: 'mysalt'
});


var Playlist = db.define('Playlist', {
    name: Sequelize.STRING,
    area: Sequelize.STRING,
    timeReq: Sequelize.STRING,
    image: Sequelize.STRING,
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
}, {
    name: {
        singular: 'Activity',
        plural: 'Activities'
    }
})


var ActiveJoin = db.define('ActiveJoin', {}, {
    timestamps: false
})

var Rating = db.define('Rating', {
    rating: Sequelize.INTEGER
})

var Favorite = db.define('Favorite', {
    type: Sequelize.BOOLEAN
})

//This works...NOT. ActiveJoin is not getting populated
Activity.belongsToMany(Playlist, {through: 'ActiveJoin'});
Playlist.belongsToMany(Activity, {through: 'ActiveJoin'});


// Rating.hasOne('User')



//Refactor relations
User.hasMany(Playlist, {as: 'Traveler'});

Playlist.belongsToMany(User, {through: 'Favorite'});
User.belongsToMany(Playlist, {through: 'Favorite'});

// Playlist.hasOne(User)

Playlist.belongsToMany(User, {through: 'Rating'});
User.belongsToMany(Playlist, {through: 'Rating'});


// User.belongsToMany(Favorite, {as: 'Favoriter'})
// Favorite.hasOne(User)


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
    .then(function() {
        return ActiveJoin.sync();
    })




exports.User = User;
exports.Playlist = Playlist;
exports.Activity = Activity;
exports.Rating = Rating;

exports.Favorite = Favorite;
exports.ActiveJoin = ActiveJoin;
exports.Rating = Rating;

 
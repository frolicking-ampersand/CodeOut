// load all the things we need
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load up the user model from Postgres Database
var User = require('../db/db').User;

// load the auth variables from Facebook and Google
var configAuth = require('./auth');

// expose this function to our app using module.exports
module.exports = function(passport) {

  // =========================================================================
  // Passport Session Setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id)
      .then(function(err, user) {
        done(err, user);
      });
  });

  // =========================================================================
  // FACEBOOK ================================================================
  // =========================================================================
  passport.use(new FacebookStrategy({

    // pull in our app id and secret from our auth.js file
    clientID        : configAuth.facebookAuth.clientID,
    clientSecret    : configAuth.facebookAuth.clientSecret,
    callbackURL     : configAuth.facebookAuth.callbackURL,
    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

  },

  // facebook will send back the token and profile
  function(req, token, refreshToken, profile, done) {
    console.log(profile);
    // asynchronous
    process.nextTick(function() {
      // find the user in the database based on their facebook id
      User.findOne({where: {facebook_id: profile.id}})
        .then(function(user) {
          // console.log('The Facebook login has found an existing user and its user is: ' + user.facebook_id);
          // console.log('The callback function is ' + done);
          if (user) {
            // console.log("THE FACEBOOK USER IS " + user.facebook_id);
            return done(null, user);
          } else {
            return User.create({
              facebook_id: profile.id,
              facebook_token: token,
              facebook_name: profile.displayName
            })
            .then(function (user) {
              return done(null, user);
            });
          }
        })
        .catch(function(err) {
          done(err);
        });
    });

  }));

  // =========================================================================
  // GOOGLE ==================================================================
  // =========================================================================
  passport.use(new GoogleStrategy({

    clientID        : configAuth.googleAuth.clientID,
    clientSecret    : configAuth.googleAuth.clientSecret,
    callbackURL     : configAuth.googleAuth.callbackURL,

  },
  function(token, refreshToken, profile, done) {

    process.nextTick(function() {
      console.log(profile);
      // try to find the user based on their google id
      User.findOne({where: {google_id: profile.id}})
        .then(function(user) {
          if (user) {
            // console.log("THE GOOGLE USER IS " + user.google_id);
            return done(null, user);
          } else {
            return User.create({
              google_id: profile.id,
              google_token: token,
              google_name: profile.displayName
            })
            .then(function (user) {
              return done(null, user);
            });
          }
        })
        .catch(function(err) {
          done(err);
        });
    });

  }));

};



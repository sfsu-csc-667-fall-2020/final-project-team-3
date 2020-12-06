const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Load user Model
const User = require('../models/User');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({
      usernameField: 'username'
    }, (username, password, done) => {
      //Match User
      User.findOne({username: username})
        .then(user => {
          // if username not found:
          if (!user) {
            return done(null, false, {message: 'username does not exist'});
          }

          // Match Password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, {message: 'incorrect password'});
            }
          });
        })
        .catch(err => console.log(err))
    })
  );

  // serialize & deserialize user for session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
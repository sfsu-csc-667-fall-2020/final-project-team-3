const express = require('express');
const router = express.Router();
//mongoose models
const User = require('../models/User');
// other imports
const bcrypt = require('bcrypt');
const passport = require('passport');

/****************************
 *  register endpoint
 *  //TODO
 *  - send the correct json response so react and understand it XD
 *  - send session back to user once register so user does not need to login again
 *  - add on additional password strength checker?
 ***************************/
router.post('/register', (req, res) => {
  console.log(req.body);
  // when registration form is submited, pull value from the form
  const {username, email, password} = req.body;

  let errors = [];

  // if any of the fields are empty
  if (!username || !email || !password) {
    errors.push({'message': 'please fill in all fields'});
  }

  // if password is not lomg enough
  if (password.length < 6) {
    errors.push({message: 'password should be at least 6 charaters'});
  }

  // if there are no error
  if (errors.length === 0) {
    User.findOne({username: username})
      .then(user => {
        // if username already exists
        if (user) {
          errors.push({message: 'username taken'});
          console.log('dumb fuck username taken');
          res.json({message: 'username is taken', errors: errors});
        } else {
          const newUser = new User({
            username,
            email,
            password
          });

          // generate salt value
          bcrypt.genSalt(10, (err, salt) => {
            // generate hashed password with salt
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err;
              // set password to hashed password
              newUser.password = hash;
              // save user into db
              newUser.save()
                .then(user => {
                  res.json({message: 'registration completed'});
                })
                .catch(err => console.log(err));
            })
          });
        }
      });
  }
  console.log(errors);
});

/****************************
 *  register endpoint using passport
 *  //TODO
 *  - send the correct json response so react and understand it XD
 *  - send user the session once login
 ***************************/
router.post('/login', (req, res, next) => {
  console.log(req.body);
  passport.authenticate('local', {
    successRedirect: '/', // once frontend React routes are set up change these values
    failureRedirect: '/'
  })(req, res, next);
});

module.exports = router;
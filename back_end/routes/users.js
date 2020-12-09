const express = require("express");
const router = express.Router();
//mongoose models
const User = require("../models/User");
// other imports
const bcrypt = require("bcryptjs");
const passport = require("passport");
const {forwardAuthenticated} = require("../config/auth");

/****************************
 *  register endpoint
 *  //TODO
 *  - send the correct json response so react and understand it XD
 *  - send session back to user once register so user does not need to login again
 *  - add on additional password strength checker?
 ***************************/
// Login Page
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

// Register Page
router.get("/register", forwardAuthenticated, (req, res) =>
  res.render("register")
);

// Register
router.post("/register", (req, res) => {
  const {username, email, password, password2} = req.body;
  let errors = [];

  if (!username || !email || !password || !password2) {
    errors.push({msg: "Please enter all fields"});
  }

  if (password !== password2) {
    errors.push({msg: "Passwords do not match"});
  }

  if (password.length < 6) {
    errors.push({msg: "Password must be at least 6 characters"});
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      username,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({email: email}).then((user) => {
      if (user) {
        errors.push({msg: "Email already exists"});
        res.render("register", {
          errors,
          username,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          username,
          email,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err), console.log(newUser));
          });
        });
      }
    });
  }
});

/****************************
 *  login endpoint using passport
 *  //TODO
 *  - send the correct json response so react and understand it XD
 *  - send user the session once login
 ***************************/
// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = router;

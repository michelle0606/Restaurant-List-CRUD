const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, {
            message: "That email is not registered"
          });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: "Email and Password incorrect"
            });
          }
        });
      });
    })
  );
  passport.use(
    new FacebookStrategy(
      {
        clientID: "2455992964412406",
        clientSecret: "024e45bfa1a78f68de6c19e6adca8ff9",
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ["email", "displayName"]
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({
          email: profile._json.email
        }).then(user => {
          if (!user) {
            var randomPassword = Math.random()
              .toString(36)
              .slice(-8);
            bcrypt.genSalt(10, (err, salt) =>
              bcrypt.hash(randomPassword, salt, (err, hash) => {
                var newUser = User({
                  name: profile._json.name,
                  email: profile._json.email,
                  password: hash
                });
                newUser
                  .save()
                  .then(user => {
                    return done(null, user);
                  })
                  .catch(err => {
                    console.log(err);
                  });
              })
            );
          } else {
            return done(null, user);
          }
        });
      }
    )
  );
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "1020769602169-1v5vj9i2a77ck0mna7ih5q9g7epd4coj.apps.googleusercontent.com",
        clientSecret: "lh8ddCE2pOOlUOWKlGe22crL",
        callbackURL: "http://localhost:3000/auth/google/callback",
        profileFields: ["email", "displayName"]
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({
          email: profile.id
        }).then(user => {
          if (!user) {
            var randomPassword = Math.random()
              .toString(36)
              .slice(-8);
            bcrypt.genSalt(10, (err, salt) =>
              bcrypt.hash(randomPassword, salt, (err, hash) => {
                var newUser = User({
                  name: profile._json.name,
                  email: profile.id,
                  password: hash
                });
                newUser
                  .save()
                  .then(user => {
                    return done(null, user);
                  })
                  .catch(err => {
                    console.log(err);
                  });
              })
            );
          } else {
            return done(null, user);
          }
        });
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

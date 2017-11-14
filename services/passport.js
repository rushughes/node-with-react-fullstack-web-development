const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // we already have a record with the given profile.id
          console.log('User already exists with googleId:', profile.id);
          // we tell passport that we are done and pass in the User object
          done(null, existingUser);
        } else {
          // we don't have a user record with this id so make a new record
          console.log('Creating new User googleId:', profile.id);
          new User({ googleId: profile.id })
            // we save the user
            .save()
            // we tell passport that we are done and pass in the User object
            .then(user => done(null, user));
        }
      });
    }
  )
);

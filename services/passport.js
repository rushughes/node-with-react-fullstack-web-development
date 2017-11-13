const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // we already have a record with the given profile.id
          console.log('User already exists with googleId:', profile.id);
        } else {
          // we don't have a user record with this id so make a new record
          console.log('Creating new User googleId:', profile.id);
          new User({ googleId: profile.id }).save();
        }
      });
    }
  )
);

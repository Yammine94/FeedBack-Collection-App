const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const config = require('../config/config');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    //mongo assigned id
    done(null, user.id);
});

passport.deserializeUser((tokenId, done) => {
    User.findById(tokenId)
     .then(user => done(null, user));
});

passport.use(new googleStrategy({
    clientID: config.googleClientID,
    clientSecret: config.goolgleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
    console.log(profile);
    User.findOne({userId: profile.id})
     .then((user) => {
         if(user) {
             done(null, user);
         } else {
             new User({ userId: profile.id }).save()
              .then(savedUser => done(null, savedUser));
         }
     })
} )
);
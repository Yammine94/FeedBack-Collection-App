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
    callbackURL: '/auth/google/callback',
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {
    
    const user = await User.findOne({userId: profile.id});
     
         if(user) {
            return done(null, user);
         } 
        const newUser = await new User({ userId: profile.id }).save();
        done(null, newUser);
         
     
} )
);
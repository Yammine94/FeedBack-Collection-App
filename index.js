const express = require('express');
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const config = require('./config/config');
const app = express();

passport.use(new googleStrategy({
    clientID: config.googleClientID,
    clientSecret: config.goolgleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    console.log(accessToken, 'accessToken');
    console.log(refreshToken, 'refreshToken');
    console.log(profile, 'profile');
} )
);

app.get('/', (req, res) => {
 res.send({test: "Succesfully Deployed"});
});

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

app.get('/auth/google/callback', passport.authenticate('google',));


const PORT = process.env.PORT || 5000;

app.listen(PORT);
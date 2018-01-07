const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const config = require('./config/config');
const auth = require('./routes/auth');

require('./models/User');
require('./services/passport');

mongoose.connect(config.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [config.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
 res.send({test: "Succesfully Deployed"});
});

auth(app);


const PORT = process.env.PORT || 5000;

app.listen(PORT);
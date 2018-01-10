const keys = require('../config/devConfig');
const stripe = require('stripe')(keys.stripeSecretKey);
const isLoggedIn = require('../middleware/isLoggedIn');

module.exports = (app) => {
    
    app.post('/api/stripe', isLoggedIn, async (req, res) => {

        const chargeObject = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '5$ for 100 credits',
            source: req.body.id
        });
        req.user.credits += 100;
       const user = await req.user.save();
       
       res.send(user);

    });

}
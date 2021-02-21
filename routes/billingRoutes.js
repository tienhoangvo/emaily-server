const express = require('express');
const keys = require('../config/keys');

const User = require('../models/userModel');
const requireLoggedIn = require('./../middlewares/requireLogin');
const stripe = require('stripe')(
  keys.STRIPE_SECRET_KEY
);
const billingRouter = express.Router();

billingRouter.get(
  '/get-checkout-session',
  requireLoggedIn,
  async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create(
        {
          payment_method_types: ['card'],
          customer_email: req.user.email,
          line_items: [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: 'Email credits',
                },
                unit_amount: 100,
              },
              quantity: 5,
            },
          ],
          mode: 'payment',
          success_url: keys.STRIPE_SUCCESS_URL,
          cancel_url: keys.STRIPE_CANCEL_URL,
        }
      );

      await User.findByIdAndUpdate(req.user._id, {
        $inc: { credits: +5 },
      });
      res.json({ id: session.id });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: 'error', error });
    }
  }
);

// billingRouter.post(
//   '/webhook',
//   express.raw({ type: 'application/json' }),
//   (req, res) => {
//     (req, res) => {
//       let event;

//       try {
//         event = JSON.parse(req.body);
//       } catch (err) {
//         res
//           .status(400)
//           .send(`Webhook error: ${err.message}`);
//       }

//       // Handle the event
//       switch (event.type) {
//         case 'checkout_'
//       }
//     };
//   }
// );

module.exports = billingRouter;

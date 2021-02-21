import React from 'react';
import axios from 'axios';
import { useStripe } from '@stripe/react-stripe-js';

const Payments = () => {
  // Get Stripe.js instance
  const stripe = useStripe();
  const handleClick = async (event) => {
    // Call your backend to create the Checkout Session
    const response = await axios.get(
      '/api/billings/get-checkout-session'
    );

    const session = response.data;

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout(
      {
        sessionId: session.id,
      }
    );

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };
  return (
    <button
      role="link"
      onClick={handleClick}
      className="btn"
    >
      Add credits
    </button>
  );
};

export default Payments;

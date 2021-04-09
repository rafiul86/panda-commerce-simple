import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import StylishPayment from '../StylishPayment/StylishPayment';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51Ie1oiF0gzIyf9pTzHAOPS0Ra3kQHhZ41rRpTKaivQizJJPzVyPLFpPgPPmV1s0F3RzkNdUjY9WyI0FpilzpKa7U009f3hId4T');

const PaymentProcess = () => {
  return (
    <Elements stripe={stripePromise}>
      <StylishPayment />
    </Elements>
  );
};

export default PaymentProcess;
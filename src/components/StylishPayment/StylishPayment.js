import React, { useContext, useState } from 'react';
import {GlobalContext} from '../Shipment/Shipment'

    import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
    
    const StylishPayment = () => {
        const handleOrderData = useContext(GlobalContext)
        const [paymentError , setPaymentError] = useState(null)
        const [paymentSuccess , setPaymentSuccess] = useState(null)
      const stripe = useStripe();
      const elements = useElements();
    
      const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js has not loaded yet. Make sure to disable
          // form submission until Stripe.js has loaded.
          return;
        }
    
        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);
    
        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });
    
        if (error) {
            setPaymentError(error.message)
            setPaymentSuccess(null)
        } else {
            setPaymentSuccess(paymentMethod.id)
            setPaymentError(null)
            handleOrderData(paymentMethod.id)
        }
      };
    
      return (
        <div>
            <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit" disabled={!stripe}>
            Pay Now
          </button>
        </form>
        {
            paymentError && <p style={{color : 'red'}}>{paymentError}</p>
        }
            {
                paymentSuccess && <p style={{color : 'green'}}>Thank you ! Your payment is Successful !</p>
            }

        </div>
      );
    };

export default StylishPayment;
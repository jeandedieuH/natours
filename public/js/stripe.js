/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const stripe = Stripe(process.env.STRIPE_KEY);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios({
      method: 'POST',
      url: `/api/v1/bookings/checkout-session/${tourId}`,
    });
    // console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};

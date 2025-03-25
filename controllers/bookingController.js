/* eslint-disable import/extensions */
import Stripe from 'stripe';
import dotenv from 'dotenv';
import Tour from '../Models/tourModel.js';
import Booking from '../Models/bookingModel.js';
import * as factory from './handlerFactory.js';

import { showAlert } from '../public/js/alerts.js';
import User from '../Models/userModel.js';

// Load environment variables
dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET);

export const getCheckoutSession = async (req, res) => {
  try {
    // 1) Get tour with id
    const tour = await Tour.findById(req.params.tourId);
    // 2) Get checkout session from API
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      success_url: `${req.protocol}://${req.get('host')}/`,
      cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
      customer_email: req.user.email,
      client_reference_id: req.params.tourId,
      line_items: [
        {
          name: `${tour.name} Tour`,
          description: tour.summary,
          images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
          amount: tour.price * 100,
          currency: 'usd',
          quantity: 1,
        },
      ],
    });
    // 3) Send session as response
    res.status(200).json({
      status: 'success',
      session,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};

const createBookingCheckout = async (session) => {
  const tour = session.client_reference_id;
  const user = (await User.findOne({ email: session.customer_email })).id;
  const price = session.display_items[0].amount / 100;
  await Booking.create({ tour, user, price });
};

export const webhookCheckout = (req, res, next) => {
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed')
    createBookingCheckout(event.data.object);

  res.status(200).json({ received: true });
};

export const createBooking = factory.createOne(Booking);
export const getBooking = factory.getOne(Booking);
export const getAllBookings = factory.getAll(Booking);
export const updateBooking = factory.updateOne(Booking);
export const deleteBooking = factory.deleteOne(Booking);

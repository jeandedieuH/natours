/* eslint-disable import/extensions */
import Review from '../Models/reviewModel.js';
import * as factory from './handlerFactory.js';

const setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

const getAllReviews = factory.getAll(Review);
const getReview = factory.getOne(Review);
const createReview = factory.createOne(Review);
const deleteReview = factory.deleteOne(Review);
const updateReview = factory.updateOne(Review);

export {
  setTourUserIds,
  getAllReviews,
  getReview,
  createReview,
  deleteReview,
  updateReview,
};

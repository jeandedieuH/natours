/* eslint-disable import/extensions */

import { Router } from 'express';

import {
  createUser,
  deleteMe,
  deleteUser,
  getAllUsers,
  getMe,
  getUser,
  resizeUserPhoto,
  updateMe,
  updateUser,
  uploadUserPhoto,
} from '../controllers/userController.js';
import {
  forgetPassword,
  protect,
  resetPassword,
  restrictTo,
  signup,
  login,
  logout,
  updatePassword,
} from '../controllers/authController.js';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgetPassword', forgetPassword);
router.patch('/resetPassword/:token', resetPassword);

router.use(protect);
router.patch('/updateMyPassword', updatePassword);

router.get('/me', getMe, getUser);
router.patch('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe);
router.delete('/deleteMe', protect, deleteMe);

router.use(restrictTo('admin'));
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;

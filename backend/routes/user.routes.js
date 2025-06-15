import express from 'express';
import {
  createUser,
  getAllUsers,
  getCurrentUserProfile,
  loginUser,
  logoutUser,
  updateUserProfile,
} from '../controllers/user.controller.js';

import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/register').post(createUser).get(authenticate, authorizeAdmin, getAllUsers);
router.route('/login').post(loginUser);
router.route("/logout").get(logoutUser);

router.route('/profile').get(authenticate, getCurrentUserProfile).put(authenticate, updateUserProfile);
export default router;

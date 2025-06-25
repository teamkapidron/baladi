import express, { Router } from 'express';

import { isAdmin, isAuthenticated } from '@/middlewares/auth.middleware';
import validate from '@/middlewares/validate.middleware';

import {
  getAllUsers,
  getUserDetails,
  updateUser,
  updateUserProfile,
  getUserRegistrationGraphData,
  getUserStats,
  getTopUsers,
  getAllAdmins,
  updateAdminPassword,
} from '@/controllers/user.controller';

import {
  getAllUsersSchema,
  getUserDetailsSchema,
  updateUserSchema,
  getUserRegistrationGraphDataSchema,
  getUserStatsSchema,
  topUsersSchema,
  updateAdminPasswordSchema,
  updateUserProfileSchema,
} from '@/validators/user.validator';

const router: Router = express.Router();

router.post(
  '/update/profile',
  isAuthenticated,
  validate(updateUserProfileSchema),
  updateUserProfile,
);

router.get('/all', isAdmin, validate(getAllUsersSchema), getAllUsers);
router.get(
  '/details/:userId',
  isAdmin,
  validate(getUserDetailsSchema),
  getUserDetails,
);
router.put('/update', isAdmin, validate(updateUserSchema), updateUser);
router.get(
  '/graph/registration',
  isAdmin,
  validate(getUserRegistrationGraphDataSchema),
  getUserRegistrationGraphData,
);
router.get('/stats', isAdmin, validate(getUserStatsSchema), getUserStats);
router.get('/top', isAdmin, validate(topUsersSchema), getTopUsers);

router.get('/admin/all', isAdmin, getAllAdmins);
router.put(
  '/admin/password',
  isAdmin,
  validate(updateAdminPasswordSchema),
  updateAdminPassword,
);

export default router;

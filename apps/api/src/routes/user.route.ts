import express, { Router } from 'express';

import { isAdmin } from '@/middlewares/auth.middleware';
import validate from '@/middlewares/validate.middleware';

import {
  getAllUsers,
  getUserDetails,
  updateUser,
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
} from '@/validators/user.validator';
import { createAdminSchema } from '@/validators/auth.validator';
import { createAdmin } from '@/controllers/auth.controller';

const router: Router = express.Router();

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

// Admin routes
router.get('/admin/all', isAdmin, getAllAdmins);
router.put(
  '/admin/password',
  isAdmin,
  validate(updateAdminPasswordSchema),
  updateAdminPassword,
);

export default router;

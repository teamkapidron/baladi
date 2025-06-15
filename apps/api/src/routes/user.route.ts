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
} from '@/controllers/user.controller';

import {
  getAllUsersSchema,
  getUserDetailsSchema,
  updateUserSchema,
  getUserRegistrationGraphDataSchema,
  getUserStatsSchema,
  topUsersSchema,
} from '@/validators/user.validator';

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

export default router;

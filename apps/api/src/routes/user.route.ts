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
  createCustomer,
} from '@/controllers/user.controller';

import {
  getAllUsersSchema,
  getUserDetailsSchema,
  updateUserSchema,
  getUserRegistrationGraphDataSchema,
  getUserStatsSchema,
  topUsersSchema,
  createCustomerSchema,
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
router.post('/create', isAdmin, validate(createCustomerSchema), createCustomer);

export default router;

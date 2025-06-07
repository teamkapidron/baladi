import express, { Router } from 'express';

import { isAdmin } from '@/middlewares/auth.middleware';
import validate from '@/middlewares/validate.middleware';

import {
  getAllUsers,
  getUserDetails,
  approveUser,
  getUserRegistrationGraphData,
  getUserStats,
} from '@/controllers/user.controller';

import {
  getAllUsersSchema,
  getUserDetailsSchema,
  approveUserSchema,
  getUserRegistrationGraphDataSchema,
  getUserStatsSchema,
} from '@/validators/user.validator';

const router: Router = express.Router();

router.get('/all', isAdmin, validate(getAllUsersSchema), getAllUsers);
router.get(
  '/details/:userId',
  isAdmin,
  validate(getUserDetailsSchema),
  getUserDetails,
);
router.put('/approve', isAdmin, validate(approveUserSchema), approveUser);
router.get(
  '/graph/registration',
  isAdmin,
  validate(getUserRegistrationGraphDataSchema),
  getUserRegistrationGraphData,
);
router.get('/stats', isAdmin, validate(getUserStatsSchema), getUserStats);

export default router;

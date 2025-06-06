import express, { Router } from 'express';

import validate from '@/middlewares/validate.middleware';
import {
  isAdmin,
  isVerified,
  isSuperAdmin,
  isAuthenticated,
} from '@/middlewares/auth.middleware';

import {
  signup,
  verifyOTP,
  resendOTP,
  onboarding,
  login,
  forgotPassword,
  resetPassword,
  logout,
  createAdmin,
  adminLogin,
  getUserData,
  getAdminData,
} from '@/controllers/auth.controller';
import {
  signupSchema,
  verifyOTPSchema,
  resendOTPSchema,
  onboardingSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  createAdminSchema,
  adminLoginSchema,
} from '@/validators/auth.validator';

const router: Router = express.Router();

router.get('/me', isAuthenticated, getUserData);

router.post('/signup', validate(signupSchema), signup);
router.post('/verify-otp', validate(verifyOTPSchema), verifyOTP);
router.post('/resend-otp', validate(resendOTPSchema), resendOTP);
router.post('/onboarding', isVerified, validate(onboardingSchema), onboarding);

router.post('/login', validate(loginSchema), login);
router.post('/logout', logout);

router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), resetPassword);

router.get('/admin/me', isAdmin, getAdminData);
router.post(
  '/admin/create',
  isSuperAdmin,
  validate(createAdminSchema),
  createAdmin,
);
router.post('/admin/login', validate(adminLoginSchema), adminLogin);

export default router;

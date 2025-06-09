import express, { Router } from 'express';

import { isAdmin } from '@/middlewares/auth.middleware';
import validate from '@/middlewares/validate.middleware';

import {
  getDiscounts,
  createDiscount,
  updateDiscount,
  makeDiscountInactive,
} from '@/controllers/discount.controller';

import {
  getDiscountsSchema,
  createDiscountSchema,
  updateDiscountSchema,
  makeDiscountInactiveSchema,
} from '@/validators/discount.validator';

const router: Router = express.Router();

router.get('/all', isAdmin, validate(getDiscountsSchema), getDiscounts);
router.post('/', isAdmin, validate(createDiscountSchema), createDiscount);
router.put(
  '/:discountId',
  isAdmin,
  validate(updateDiscountSchema),
  updateDiscount,
);
router.delete(
  '/:discountId',
  isAdmin,
  validate(makeDiscountInactiveSchema),
  makeDiscountInactive,
);

export default router;

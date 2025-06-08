import express, { Router } from 'express';

import validate from '@/middlewares/validate.middleware';
import { isAdmin } from '@/middlewares/auth.middleware';

import {
  getAllInventory,
  getProductInventory,
  createInventory,
} from '@/controllers/inventory.controller';

import {
  getAllInventorySchema,
  getProductInventorySchema,
  createInventorySchema,
} from '@/validators/inventory.validator';

const router: Router = express.Router();

router.get('/', isAdmin, validate(getAllInventorySchema), getAllInventory);
router.get(
  '/:productId',
  isAdmin,
  validate(getProductInventorySchema),
  getProductInventory,
);
router.post('/', isAdmin, validate(createInventorySchema), createInventory);

export default router;

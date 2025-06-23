import express, { Router } from 'express';

import validate from '@/middlewares/validate.middleware';
import { isAdmin } from '@/middlewares/auth.middleware';

import {
  getAllInventory,
  getProductInventory,
  createInventory,
  getInventoryStats,
  bulkAddInventory,
} from '@/controllers/inventory.controller';

import {
  getAllInventorySchema,
  getProductInventorySchema,
  createInventorySchema,
  inventoryStatsSchema,
  bulkAddInventorySchema,
} from '@/validators/inventory.validator';

const router: Router = express.Router();

router.get('/', isAdmin, validate(getAllInventorySchema), getAllInventory);
router.get(
  '/product/:productId',
  isAdmin,
  validate(getProductInventorySchema),
  getProductInventory,
);
router.post('/', isAdmin, validate(createInventorySchema), createInventory);
router.get(
  '/stats',
  isAdmin,
  validate(inventoryStatsSchema),
  getInventoryStats,
);
router.post(
  '/bulk',
  isAdmin,
  validate(bulkAddInventorySchema),
  bulkAddInventory,
);
export default router;

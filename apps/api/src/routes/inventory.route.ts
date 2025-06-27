import express, { Router } from 'express';

import validate from '@/middlewares/validate.middleware';
import { isAdmin } from '@/middlewares/auth.middleware';

import {
  getAllInventory,
  getProductInventory,
  createInventory,
  getInventoryStats,
  updateInventory,
  deleteInventory,
  createInventoryWastage,
  updateInventoryWastage,
} from '@/controllers/inventory.controller';

import {
  getAllInventorySchema,
  getProductInventorySchema,
  createInventorySchema,
  inventoryStatsSchema,
  updateInventorySchema,
  deleteInventorySchema,
  createInventoryWastageSchema,
  updateInventoryWastageSchema,
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
router.put(
  '/:inventoryId',
  isAdmin,
  validate(updateInventorySchema),
  updateInventory,
);
router.delete(
  '/:inventoryId',
  isAdmin,
  validate(deleteInventorySchema),
  deleteInventory,
);

router.post(
  '/wastage/:inventoryId',
  isAdmin,
  validate(createInventoryWastageSchema),
  createInventoryWastage,
);
router.put(
  '/wastage/:inventoryWastageId',
  isAdmin,
  validate(updateInventoryWastageSchema),
  updateInventoryWastage,
);

export default router;

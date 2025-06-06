import express, { Router } from 'express';

import { isAdmin, isAuthenticated } from '@/middlewares/auth.middleware';
import validate from '@/middlewares/validate.middleware';

import {
  placeOrder,
  getUserOrders,
  getOrderDetails,
  cancelOrder,
  getAllOrders,
  getOrderDetailsAdmin,
  getOrderStats,
  getOrderRevenueStats,
  getOrderStatusGraphData,
} from '@/controllers/order.controller';

import {
  placeOrderSchema,
  getUserOrdersSchema,
  getUserOrderDetailsSchema,
  cancelOrderSchema,
  getAllOrdersSchema,
  getOrderDetailsAdminSchema,
  getOrderStatsSchema,
  getOrderRevenueStatsSchema,
  getOrderStatusGraphDataSchema,
} from '@/validators/order.validator';

const router: Router = express.Router();

router.post('/place', isAuthenticated, validate(placeOrderSchema), placeOrder);
router.get(
  '/my',
  isAuthenticated,
  validate(getUserOrdersSchema),
  getUserOrders,
);
router.get(
  '/:orderId',
  isAuthenticated,
  validate(getUserOrderDetailsSchema),
  getOrderDetails,
);
router.post(
  '/:orderId/cancel',
  isAuthenticated,
  validate(cancelOrderSchema),
  cancelOrder,
);

router.get('/all', isAdmin, validate(getAllOrdersSchema), getAllOrders);
router.get(
  '/:orderId',
  isAdmin,
  validate(getOrderDetailsAdminSchema),
  getOrderDetailsAdmin,
);
router.get('/stats', isAdmin, validate(getOrderStatsSchema), getOrderStats);
router.get(
  '/revenue-stats',
  isAdmin,
  validate(getOrderRevenueStatsSchema),
  getOrderRevenueStats,
);
router.get(
  '/graph/status',
  isAdmin,
  validate(getOrderStatusGraphDataSchema),
  getOrderStatusGraphData,
);

export default router;

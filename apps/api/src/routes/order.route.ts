import express, { Router } from 'express';

import { isAdmin, isAuthenticated } from '@/middlewares/auth.middleware';
import validate from '@/middlewares/validate.middleware';

import {
  // User
  placeOrder,
  getUserOrders,
  getOrderDetails,
  cancelOrder,

  // Admin
  getAllOrders,
  getOrderDetailsAdmin,
  updateOrderStatus,
  getOrderStats,
  getOrderRevenueStats,
  getOrderStatusGraphData,
  getOrderRevenueGraphData,
  getRecentOrders,
  previewPickingList,
  previewFreightLabel,
  updateOrderItem,
} from '@/controllers/order.controller';

import {
  // User
  placeOrderSchema,
  getUserOrdersSchema,
  getUserOrderDetailsSchema,
  cancelOrderSchema,

  // Admin
  getAllOrdersSchema,
  getOrderDetailsAdminSchema,
  updateOrderStatusSchema,
  getOrderStatsSchema,
  getOrderRevenueStatsSchema,
  getOrderStatusGraphDataSchema,
  getOrderRevenueGraphDataSchema,
  getRecentOrdersSchema,
  previewPickingListSchema,
  previewFreightLabelSchema,
  updateOrderItemSchema,
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
  '/details/:orderId',
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
  '/details/admin/:orderId',
  isAdmin,
  validate(getOrderDetailsAdminSchema),
  getOrderDetailsAdmin,
);
router.patch(
  '/status/:orderId',
  isAdmin,
  validate(updateOrderStatusSchema),
  updateOrderStatus,
);
router.get('/stats', isAdmin, validate(getOrderStatsSchema), getOrderStats);
router.get(
  '/stats/revenue',
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
router.get(
  '/graph/revenue',
  isAdmin,
  validate(getOrderRevenueGraphDataSchema),
  getOrderRevenueGraphData,
);
router.get(
  '/recent',
  isAdmin,
  validate(getRecentOrdersSchema),
  getRecentOrders,
);
router.get(
  '/preview/picking-list/:orderId',
  isAdmin,
  validate(previewPickingListSchema),
  previewPickingList,
);
router.get(
  '/preview/freight-label/:orderId',
  isAdmin,
  validate(previewFreightLabelSchema),
  previewFreightLabel,
);
router.patch(
  '/:orderId/item/:itemId',
  isAdmin,
  validate(updateOrderItemSchema),
  updateOrderItem,
);

export default router;

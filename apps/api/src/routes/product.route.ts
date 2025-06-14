import express, { Router } from 'express';

import validate from '@/middlewares/validate.middleware';
import { addUserToRequest, isAdmin } from '@/middlewares/auth.middleware';

import {
  getProducts,
  getProductById,
  getProductBySlug,
  quickSearchProducts,
  fullSearchProducts,
  getAllProducts,
  getProductImageUploadUrl,
  createProduct,
  updateProduct,
  deleteProduct,
  lowStockProducts,
  topProducts,
  productStats,
  getConfig,
  updateConfig,
  createConfig,
} from '@/controllers/product.controller';

import {
  getProductsSchema,
  getProductByIdSchema,
  getProductBySlugSchema,
  quickSearchProductsSchema,
  fullSearchProductsSchema,
  getAllProductsSchema,
  getProductImageUploadUrlSchema,
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
  lowStockProductsSchema,
  topProductsSchema,
  productStatsSchema,
  updateConfigSchema,
} from '@/validators/product.validator';

const router: Router = express.Router();

router.get('/list', addUserToRequest, validate(getProductsSchema), getProducts);
router.get(
  '/details/:productId',
  addUserToRequest,
  validate(getProductByIdSchema),
  getProductById,
);
router.get(
  '/slug/:slug',
  addUserToRequest,
  validate(getProductBySlugSchema),
  getProductBySlug,
);
router.get(
  '/search/quick',
  validate(quickSearchProductsSchema),
  quickSearchProducts,
);
router.get('/search', validate(fullSearchProductsSchema), fullSearchProducts);

router.get('/all', isAdmin, validate(getAllProductsSchema), getAllProducts);
router.post(
  '/image-upload-url',
  isAdmin,
  validate(getProductImageUploadUrlSchema),
  getProductImageUploadUrl,
);
router.post('/', isAdmin, validate(createProductSchema), createProduct);
router.put(
  '/:productId',
  isAdmin,
  validate(updateProductSchema),
  updateProduct,
);
router.delete(
  '/:productId',
  isAdmin,
  validate(deleteProductSchema),
  deleteProduct,
);
router.get(
  '/low-stock',
  isAdmin,
  validate(lowStockProductsSchema),
  lowStockProducts,
);
router.get('/top', isAdmin, validate(topProductsSchema), topProducts);
router.get('/stats', isAdmin, validate(productStatsSchema), productStats);

router.get('/config', getConfig);
router.put(
  '/update/config',
  isAdmin,
  validate(updateConfigSchema),
  updateConfig,
);
router.post('/config/create', isAdmin, createConfig);

export default router;

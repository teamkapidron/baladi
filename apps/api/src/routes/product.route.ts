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
  createProduct,
  updateProduct,
  deleteProduct,
} from '@/controllers/product.controller';

import {
  getProductsSchema,
  getProductByIdSchema,
  getProductBySlugSchema,
  quickSearchProductsSchema,
  fullSearchProductsSchema,
  getAllProductsSchema,
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
} from '@/validators/product.validator';

const router: Router = express.Router();

router.get('/list', addUserToRequest, validate(getProductsSchema), getProducts);
router.get('/:productId', validate(getProductByIdSchema), getProductById);
router.get('/slug/:slug', validate(getProductBySlugSchema), getProductBySlug);
router.get(
  '/search/quick',
  validate(quickSearchProductsSchema),
  quickSearchProducts,
);
router.get('/search', validate(fullSearchProductsSchema), fullSearchProducts);

router.get('/all', isAdmin, validate(getAllProductsSchema), getAllProducts);
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

export default router;

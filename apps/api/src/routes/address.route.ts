import express, { Router } from 'express';

import validate from '@/middlewares/validate.middleware';
import { isAdmin, isAuthenticated } from '@/middlewares/auth.middleware';

import {
  getAddresses,
  getAddressDetails,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
  getAddressesAdmin,
  addAddressAdmin,
} from '@/controllers/address.controller';
import {
  getAddressesSchema,
  getAddressByIdSchema,
  addAddressSchema,
  updateAddressSchema,
  deleteAddressSchema,
  setDefaultAddressSchema,
  getAddressesSchemaAdmin,
  addAddressSchemaAdmin,
} from '@/validators/address.validator';

const router: Router = express.Router();

router.get(
  '/list',
  isAuthenticated,
  validate(getAddressesSchema),
  getAddresses,
);
router.get(
  '/:addressId',
  isAuthenticated,
  validate(getAddressByIdSchema),
  getAddressDetails,
);
router.post('/', isAuthenticated, validate(addAddressSchema), addAddress);
router.put(
  '/:addressId',
  isAuthenticated,
  validate(updateAddressSchema),
  updateAddress,
);
router.delete(
  '/:addressId',
  isAuthenticated,
  validate(deleteAddressSchema),
  deleteAddress,
);
router.patch(
  '/:addressId/default',
  isAuthenticated,
  validate(setDefaultAddressSchema),
  setDefaultAddress,
);

router.get(
  '/admin/list/:userId',
  isAdmin,
  validate(getAddressesSchemaAdmin),
  getAddressesAdmin,
);
router.post(
  '/admin/add/:userId',
  isAdmin,
  validate(addAddressSchemaAdmin),
  addAddressAdmin,
);

export default router;

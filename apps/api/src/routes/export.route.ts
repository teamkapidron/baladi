// Node Modules
import { Router } from 'express';

// Controllers
import {
  exportOrders,
  exportProducts,
  exportUsers,
  productsForInventory,
} from '@/controllers/export.controller';
import { isAdmin } from '@/middlewares/auth.middleware';

const router: Router = Router();

router.get('/users', isAdmin, exportUsers);
router.get('/products', isAdmin, exportProducts);
router.get('/orders', isAdmin, exportOrders);
router.get('/products-for-inventory', isAdmin, productsForInventory);
export default router;

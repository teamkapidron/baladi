// Node Modules
import { Router } from 'express';

// Controllers
import {
  exportOrders,
  exportProducts,
  exportUsers,
} from '@/controllers/export.controller';

const router: Router = Router();

router.get('/users', exportUsers);
router.get('/products', exportProducts);
router.get('/orders', exportOrders);
export default router;

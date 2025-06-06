import { Product } from '@repo/types/product';

export const CART_STORAGE_KEY = 'baladi-cart';

export enum TOAST_MESSAGES {
  LOGIN_REQUIRED = 'Please login to add items to your cart',
  ITEM_ADDED = 'Item added to cart successfully',
  ITEM_UPDATED = 'Cart updated successfully',
  INVALID_QUANTITY = 'Please enter a valid quantity',
  ITEM_REMOVED = 'Item removed from cart',
  CART_CLEARED = 'Cart cleared successfully',
}

export interface CartItem {
  userId: string;
  product: Product;
  quantity: number;
  totalPrice: number;
  addedAt: Date;
  updatedAt: Date;
}

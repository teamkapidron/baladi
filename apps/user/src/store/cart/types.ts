import { ProductResponse } from '@/hooks/useProduct/types';

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
  product: ProductResponse;
  quantity: number;
  totalPrice: number;
  addedAt: Date;
  updatedAt: Date;
}

export interface CartSummary {
  totalItems: number;
  totalPrice: number;
  uniqueItems: number;
  isEmpty: boolean;
}

export interface CartState {
  cart: CartItem[];
  cartSummary: CartSummary;
  userCartItems: CartItem[];
}

export interface CartActions {
  addToCart: (
    userId: string,
    product: ProductResponse,
    quantity: number,
  ) => void;
  removeFromCart: (userId: string, productId: string) => void;
  clearCart: (userId: string) => void;
  updateQuantity: (
    userId: string,
    productId: string,
    newQuantity: number,
  ) => void;
  getItemQuantity: (userId: string, productId: string) => number;
  isInCart: (userId: string, productId: string) => boolean;
  setUserId: (userId: string | null) => void;
  _hydrate: () => void;
}

export type CartStore = CartState & CartActions;

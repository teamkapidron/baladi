import { ProductResponse } from '@/hooks/useProduct/types';
import { BulkDiscount } from '@repo/types/bulkDiscount';

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
  totalItems: number; // Total number of (products * quantity) in the cart (not unique)
  totalPrice: number; // Total price of the cart (including vat)
  totalPriceWithoutVat: number; // Total price of the cart (excluding vat)
  totalVat: number; // Total vat of the cart
  totalDiscount: number; // Total discount of the cart
  netPrice: number; // Total price of the cart (excluding vat and discount)
  totalPriceWithDiscount: number;
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
    bulkDiscounts: BulkDiscount[],
  ) => void;
  removeFromCart: (
    userId: string,
    productId: string,
    bulkDiscounts: BulkDiscount[],
  ) => void;
  clearCart: (userId: string, bulkDiscounts: BulkDiscount[]) => void;
  updateQuantity: (
    userId: string,
    productId: string,
    newQuantity: number,
    bulkDiscounts: BulkDiscount[],
  ) => void;
  getItemQuantity: (
    userId: string,
    productId: string,
    bulkDiscounts: BulkDiscount[],
  ) => number;
  isInCart: (
    userId: string,
    productId: string,
    bulkDiscounts: BulkDiscount[],
  ) => boolean;
  getBulkDiscountAmountForProduct: (
    userId: string,
    productId: string,
    bulkDiscounts: BulkDiscount[],
  ) => number;
  setUserId: (userId: string | null, bulkDiscounts: BulkDiscount[]) => void;
  _hydrate: () => void;
}

export type CartStore = CartState & CartActions;

import { ProductResponse } from '@/hooks/useProduct/types';
import { CartItem, CartSummary } from './types';
import { BulkDiscount } from '@repo/types/bulkDiscount';

export function calculateItemTotal(
  quantity: number,
  unitPrice: number,
): number {
  return Math.round(quantity * unitPrice * 100) / 100;
}

export function createCartItem(
  userId: string,
  product: ProductResponse,
  quantity: number,
): CartItem {
  return {
    userId,
    product,
    quantity,
    totalPrice: calculateItemTotal(quantity, product.salePrice),
    addedAt: new Date(),
    updatedAt: new Date(),
  };
}

export function updateCartItem(
  item: CartItem,
  additionalQuantity: number,
): CartItem {
  const newQuantity = item.quantity + additionalQuantity;

  return {
    ...item,
    quantity: newQuantity,
    totalPrice: calculateItemTotal(newQuantity, item.product.salePrice),
    updatedAt: new Date(),
  };
}

export function calculateCartSummary(
  cart: CartItem[],
  bulkDiscounts: BulkDiscount[],
  userId: string,
): CartSummary {
  const userCart = cart.filter((item) => item.userId === userId);

  const totalItems = userCart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = userCart.reduce((sum, item) => sum + item.totalPrice, 0);
  const uniqueItems = userCart.length;

  const totalVat = userCart.reduce(
    (sum, item) => sum + item.totalPrice * item.product.vat,
    0,
  );

  const totalDiscount =
    bulkDiscounts?.reduce((sum, discount) => {
      const item = userCart.find(
        (item) =>
          item.product.hasVolumeDiscount &&
          item.quantity >= discount.minQuantity,
      );
      if (!item) return sum;
      return sum + (item.totalPrice * discount.discountPercentage) / 100;
    }, 0) || 0;

  const netPrice = totalPrice - totalDiscount;

  return {
    totalItems,
    totalPrice: Math.round(totalPrice * 100) / 100,
    totalVat,
    totalDiscount,
    netPrice,
    totalPriceWithDiscount: Math.round(totalPrice * 100) / 100,
    uniqueItems,
    isEmpty: userCart.length === 0,
  };
}

export function getUserCartItems(cart: CartItem[], userId: string): CartItem[] {
  return cart.filter((item) => item.userId === userId);
}

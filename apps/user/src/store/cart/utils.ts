import { ProductResponse } from '@/hooks/useProduct/types';
import { CartItem, CartSummary } from './types';
import { BulkDiscount } from '@repo/types/bulkDiscount';

export function calculateItemTotal(
  quantity: number,
  unitPrice: number,
): number {
  return quantity * unitPrice;
}

export function createCartItem(
  userId: string,
  product: ProductResponse,
  quantity: number,
): CartItem {
  const price = product.price * (1 + product.vat / 100);

  return {
    userId,
    product,
    quantity,
    totalPrice: calculateItemTotal(quantity, price),
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
    totalPrice: calculateItemTotal(newQuantity, item.product.price),
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
  const totalPrice = userCart.reduce(
    (sum, item) => sum + item.product.price,
    0,
  );
  const uniqueItems = userCart.length;

  const totalPriceWithoutVat = userCart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const totalVat = userCart.reduce(
    (sum, item) =>
      sum + (item.product.price * item.quantity * item.product.vat) / 100,
    0,
  );

  const totalDiscount = userCart.reduce((sum, item) => {
    const bulkDiscount = bulkDiscounts
      .filter((d) => d.isActive && d.minQuantity <= item.quantity)
      .sort((a, b) => b.discountPercentage - a.discountPercentage)[0];

    if (bulkDiscount && item.product.hasVolumeDiscount) {
      return (
        sum +
        (item.product.price *
          item.quantity *
          bulkDiscount.discountPercentage) /
          100
      );
    }
    return sum;
  }, 0);

  const netPrice = totalPriceWithoutVat + totalVat - totalDiscount;

  return {
    totalItems,
    totalPrice: Math.round(totalPrice * 100) / 100,
    totalPriceWithoutVat,
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

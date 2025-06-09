import { CartItem } from './type';
import { Product } from '@repo/types/product';

export function calculateItemTotal(quantity: number, unitPrice: number) {
  return Math.round(quantity * unitPrice * 100) / 100;
}

export function createCartItem(
  userId: string,
  product: Product,
  quantity: number,
) {
  return {
    userId,
    product,
    quantity,
    totalPrice: calculateItemTotal(quantity, product.salePrice),
    addedAt: new Date(),
    updatedAt: new Date(),
  };
}

export function updateCartItem(item: CartItem, additionalQuantity: number) {
  const newQuantity = item.quantity + additionalQuantity;

  return {
    ...item,
    quantity: newQuantity,
    totalPrice: calculateItemTotal(newQuantity, item.product.salePrice),
    updatedAt: new Date(),
  };
}

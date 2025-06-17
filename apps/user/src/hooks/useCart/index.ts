import { useShallow } from 'zustand/shallow';
import { useCallback, useEffect, useMemo } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { useDiscount } from '@/hooks/useDiscount';
import { useCartStore } from '@/store/cart';

import { ProductResponse } from '../useProduct/types';

export function useCart() {
  const { user, isAuthenticated } = useAuth();
  const {
    cart,
    cartSummary,
    userCartItems,
    addToCart: addToCartStore,
    removeFromCart: removeFromCartStore,
    clearCart: clearCartStore,
    updateQuantity: updateQuantityStore,
    getItemQuantity: getItemQuantityStore,
    isInCart: isInCartStore,
    getBulkDiscountAmountForProduct: getBulkDiscountAmountForProductStore,
    setUserId,
  } = useCartStore(
    useShallow((state) => ({
      cart: state.cart,
      cartSummary: state.cartSummary,
      userCartItems: state.userCartItems,
      addToCart: state.addToCart,
      removeFromCart: state.removeFromCart,
      clearCart: state.clearCart,
      updateQuantity: state.updateQuantity,
      getItemQuantity: state.getItemQuantity,
      isInCart: state.isInCart,
      setUserId: state.setUserId,
      getBulkDiscountAmountForProduct: state.getBulkDiscountAmountForProduct,
    })),
  );
  const { bulkDiscountQuery } = useDiscount();
  const bulkDiscounts = useMemo(() => {
    return bulkDiscountQuery.data?.bulkDiscounts || [];
  }, [bulkDiscountQuery.data]);

  useEffect(() => {
    setUserId(user?._id || null, bulkDiscounts);
  }, [user?._id, setUserId, bulkDiscounts, bulkDiscountQuery.data]);

  const addToCart = useCallback(
    (product: ProductResponse, quantity: number) => {
      if (!isAuthenticated || !user) return;
      addToCartStore(user._id, product, quantity, bulkDiscounts);
    },
    [addToCartStore, user, isAuthenticated, bulkDiscounts],
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      if (!isAuthenticated || !user) return;
      removeFromCartStore(user._id, productId, bulkDiscounts);
    },
    [removeFromCartStore, user, isAuthenticated, bulkDiscounts],
  );

  const clearCart = useCallback(() => {
    if (!isAuthenticated || !user) return;
    clearCartStore(user._id, bulkDiscounts);
  }, [clearCartStore, user, isAuthenticated, bulkDiscounts]);

  const getItemQuantity = useCallback(
    (productId: string): number => {
      if (!user) return 0;
      return getItemQuantityStore(user._id, productId, bulkDiscounts);
    },
    [getItemQuantityStore, user, bulkDiscounts],
  );

  const isInCart = useCallback(
    (productId: string): boolean => {
      if (!user) return false;
      return isInCartStore(user._id, productId, bulkDiscounts);
    },
    [isInCartStore, user, bulkDiscounts],
  );

  const updateQuantity = useCallback(
    (productId: string, newQuantity: number) => {
      if (!isAuthenticated || !user) return;
      updateQuantityStore(user._id, productId, newQuantity, bulkDiscounts);
    },
    [updateQuantityStore, user, isAuthenticated, bulkDiscounts],
  );

  const getBulkDiscountAmountForProduct = useCallback(
    (productId: string): number => {
      if (!user) return 0;
      return getBulkDiscountAmountForProductStore(
        user._id,
        productId,
        bulkDiscounts,
      );
    },
    [getBulkDiscountAmountForProductStore, user, bulkDiscounts],
  );

  return {
    cart,
    addToCart,
    cartSummary,
    removeFromCart,
    clearCart,
    updateQuantity,
    userCartItems,
    isInCart,
    getItemQuantity,
    getBulkDiscountAmountForProduct,
  };
}

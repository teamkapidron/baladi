import { useShallow } from 'zustand/shallow';
import { useCallback, useEffect } from 'react';

import { useAuth } from '@/hooks/useAuth';
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
    })),
  );

  useEffect(() => {
    setUserId(user?._id || null);
  }, [user?._id, setUserId]);

  const addToCart = useCallback(
    (product: ProductResponse, quantity: number) => {
      if (!isAuthenticated || !user) return;
      addToCartStore(user._id, product, quantity);
    },
    [addToCartStore, user, isAuthenticated],
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      if (!isAuthenticated || !user) return;
      removeFromCartStore(user._id, productId);
    },
    [removeFromCartStore, user, isAuthenticated],
  );

  const clearCart = useCallback(() => {
    if (!isAuthenticated || !user) return;
    clearCartStore(user._id);
  }, [clearCartStore, user, isAuthenticated]);

  const getItemQuantity = useCallback(
    (productId: string): number => {
      if (!user) return 0;
      return getItemQuantityStore(user._id, productId);
    },
    [getItemQuantityStore, user],
  );

  const isInCart = useCallback(
    (productId: string): boolean => {
      if (!user) return false;
      return isInCartStore(user._id, productId);
    },
    [isInCartStore, user],
  );

  const updateQuantity = useCallback(
    (productId: string, newQuantity: number) => {
      if (!isAuthenticated || !user) return;
      updateQuantityStore(user._id, productId, newQuantity);
    },
    [updateQuantityStore, user, isAuthenticated],
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
  };
}

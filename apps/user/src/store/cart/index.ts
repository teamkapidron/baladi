import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from '@repo/ui/lib/sonner';

import { CartStore, CartItem, CART_STORAGE_KEY, TOAST_MESSAGES } from './types';
import {
  createCartItem,
  updateCartItem,
  calculateItemTotal,
  calculateCartSummary,
  getUserCartItems,
} from './utils';

import { ProductResponse } from '@/hooks/useProduct/types';
import { BulkDiscount } from '@repo/types/bulkDiscount';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      cartSummary: {
        totalItems: 0,
        totalPrice: 0,
        totalPriceWithoutVat: 0,
        totalVat: 0,
        totalDiscount: 0,
        netPrice: 0,
        totalPriceWithDiscount: 0,
        uniqueItems: 0,
        isEmpty: true,
      },
      userCartItems: [],

      addToCart: (
        userId: string,
        product: ProductResponse,
        quantity: number,
        bulkDiscounts: BulkDiscount[],
      ) => {
        if (quantity <= 0) {
          toast.error(TOAST_MESSAGES.INVALID_QUANTITY);
          return;
        }

        if (!userId) {
          toast.error(TOAST_MESSAGES.LOGIN_REQUIRED);
          return;
        }

        set((state) => {
          const userCart = state.cart.filter((item) => item.userId === userId);
          const otherUsersCart = state.cart.filter(
            (item) => item.userId !== userId,
          );

          const existingItemIndex = userCart.findIndex(
            (item) => item.product._id === product._id,
          );

          let updatedUserCart: CartItem[];

          if (existingItemIndex !== -1) {
            updatedUserCart = userCart.map((item, index) =>
              index === existingItemIndex
                ? updateCartItem(item, quantity)
                : item,
            );
            toast.success(TOAST_MESSAGES.ITEM_UPDATED);
          } else {
            const newItem = createCartItem(userId, product, quantity);
            updatedUserCart = [...userCart, newItem];
            toast.success(TOAST_MESSAGES.ITEM_ADDED);
          }

          const newCart = [...otherUsersCart, ...updatedUserCart];
          const newCartSummary = calculateCartSummary(
            newCart,
            bulkDiscounts,
            userId,
          );
          const newUserCartItems = getUserCartItems(newCart, userId);

          return {
            cart: newCart,
            cartSummary: newCartSummary,
            userCartItems: newUserCartItems,
          };
        });
      },

      removeFromCart: (
        userId: string,
        productId: string,
        bulkDiscounts: BulkDiscount[],
      ) => {
        if (!userId) {
          toast.error(TOAST_MESSAGES.LOGIN_REQUIRED);
          return;
        }

        set((state) => {
          const newCart = state.cart.filter(
            (item) =>
              !(item.product._id === productId && item.userId === userId),
          );
          const newCartSummary = calculateCartSummary(
            newCart,
            bulkDiscounts,
            userId,
          );
          const newUserCartItems = getUserCartItems(newCart, userId);

          toast.success(TOAST_MESSAGES.ITEM_REMOVED);

          return {
            cart: newCart,
            cartSummary: newCartSummary,
            userCartItems: newUserCartItems,
          };
        });
      },

      clearCart: (userId: string, bulkDiscounts: BulkDiscount[]) => {
        if (!userId) {
          toast.error(TOAST_MESSAGES.LOGIN_REQUIRED);
          return;
        }

        set((state) => {
          const newCart = state.cart.filter((item) => item.userId !== userId);
          const newCartSummary = calculateCartSummary(
            newCart,
            bulkDiscounts,
            userId,
          );
          const newUserCartItems = getUserCartItems(newCart, userId);

          toast.success(TOAST_MESSAGES.CART_CLEARED);

          return {
            cart: newCart,
            cartSummary: newCartSummary,
            userCartItems: newUserCartItems,
          };
        });
      },

      updateQuantity: (
        userId: string,
        productId: string,
        newQuantity: number,
        bulkDiscounts: BulkDiscount[],
      ) => {
        if (!userId) {
          toast.error(TOAST_MESSAGES.LOGIN_REQUIRED);
          return;
        }

        if (newQuantity <= 0) {
          get().removeFromCart(userId, productId, bulkDiscounts);
          return;
        }

        set((state) => {
          const newCart = state.cart.map((item) =>
            item.product._id === productId && item.userId === userId
              ? {
                  ...item,
                  quantity: newQuantity,
                  totalPrice: calculateItemTotal(
                    newQuantity,
                    item.product.salePrice,
                  ),
                  updatedAt: new Date(),
                }
              : item,
          );
          const newCartSummary = calculateCartSummary(
            newCart,
            bulkDiscounts,
            userId,
          );
          const newUserCartItems = getUserCartItems(newCart, userId);

          toast.success(TOAST_MESSAGES.ITEM_UPDATED);

          return {
            cart: newCart,
            cartSummary: newCartSummary,
            userCartItems: newUserCartItems,
          };
        });
      },

      getItemQuantity: (userId: string, productId: string): number => {
        if (!userId) return 0;

        const item = get().cart.find(
          (item) => item.product._id === productId && item.userId === userId,
        );
        return item?.quantity || 0;
      },

      isInCart: (
        userId: string,
        productId: string,
        bulkDiscounts: BulkDiscount[],
      ): boolean => {
        return get().getItemQuantity(userId, productId, bulkDiscounts) > 0;
      },

      setUserId: (userId: string | null, bulkDiscounts: BulkDiscount[]) => {
        const state = get();
        if (userId) {
          const newCartSummary = calculateCartSummary(
            state.cart,
            bulkDiscounts,
            userId,
          );
          const newUserCartItems = getUserCartItems(state.cart, userId);

          set({
            cartSummary: newCartSummary,
            userCartItems: newUserCartItems,
          });
        } else {
          set({
            cartSummary: {
              totalItems: 0,
              totalPrice: 0,
              totalPriceWithoutVat: 0,
              totalVat: 0,
              totalDiscount: 0,
              netPrice: 0,
              totalPriceWithDiscount: 0,
              uniqueItems: 0,
              isEmpty: true,
            },
            userCartItems: [],
          });
        }
      },

      _hydrate: () => {},
    }),
    {
      name: CART_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cart: state.cart,
      }),
      onRehydrateStorage: () => (state) => {
        state?._hydrate();
      },
    },
  ),
);

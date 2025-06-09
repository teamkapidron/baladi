// Node Modules
import { useCallback, useMemo } from 'react';
import { toast } from '@repo/ui/lib/sonner';

// Hooks
import { useAuth } from '@/hooks/useAuth';
import { useLocalStorage } from '@repo/ui/hooks/useLocalStorage';

// Utils
import { calculateItemTotal, createCartItem, updateCartItem } from './utils';

// Types
import { type Product } from '@repo/types/product';
import { CartItem, CART_STORAGE_KEY, TOAST_MESSAGES } from './type';

export function useCart() {
  const { user, isAuthenticated } = useAuth();
  const [cart, setCart] = useLocalStorage<CartItem[]>(CART_STORAGE_KEY, []);

  const cartSummary = useMemo(() => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const uniqueItems = cart.length;

    return {
      totalItems,
      totalPrice: Math.round(totalPrice * 100) / 100,
      uniqueItems,
      isEmpty: cart.length === 0,
    };
  }, [cart]);

  const requireAuth = useCallback(() => {
    if (!isAuthenticated || !user) {
      toast.error(TOAST_MESSAGES.LOGIN_REQUIRED);
      return false;
    }
    return true;
  }, [isAuthenticated, user]);

  const addToCart = useCallback(
    (product: Product, quantity: number) => {
      if (!quantity || quantity <= 0) {
        toast.error(TOAST_MESSAGES.INVALID_QUANTITY);
        return;
      }

      if (!requireAuth()) return;

      setCart((prevCart) => {
        const userCart = prevCart.filter((item) => item.userId === user!._id);
        const otherUsersCart = prevCart.filter(
          (item) => item.userId !== user!._id,
        );

        const existingItemIndex = userCart.findIndex(
          (item) => item.product._id === product._id,
        );

        let updatedUserCart: CartItem[];

        if (existingItemIndex !== -1) {
          updatedUserCart = userCart.map((item, index) =>
            index === existingItemIndex ? updateCartItem(item, quantity) : item,
          );
          toast.success(TOAST_MESSAGES.ITEM_UPDATED);
        } else {
          const newItem = createCartItem(user!._id, product, quantity);
          updatedUserCart = [...userCart, newItem];
          toast.success(TOAST_MESSAGES.ITEM_ADDED);
        }

        return [...otherUsersCart, ...updatedUserCart];
      });
    },
    [setCart, user, requireAuth],
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      if (!requireAuth()) return;

      setCart((prevCart) =>
        prevCart.filter(
          (item) =>
            !(item.product._id === productId && item.userId === user!._id),
        ),
      );
      toast.success(TOAST_MESSAGES.ITEM_REMOVED);
    },
    [setCart, user, requireAuth],
  );

  const clearCart = useCallback(() => {
    if (!requireAuth()) return;

    setCart((prevCart) => prevCart.filter((item) => item.userId !== user!._id));
    toast.success(TOAST_MESSAGES.CART_CLEARED);
  }, [setCart, user, requireAuth]);

  const getItemQuantity = useCallback(
    (productId: string): number => {
      if (!user) return 0;

      const item = cart.find(
        (item) => item.product._id === productId && item.userId === user._id,
      );
      return item?.quantity || 0;
    },
    [cart, user],
  );

  const isInCart = useCallback(
    (productId: string): boolean => {
      return getItemQuantity(productId) > 0;
    },
    [getItemQuantity],
  );

  const updateQuantity = useCallback(
    (productId: string, newQuantity: number) => {
      if (!requireAuth()) return;

      if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
      }

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product._id === productId && item.userId === user!._id
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
        ),
      );
      toast.success(TOAST_MESSAGES.ITEM_UPDATED);
    },
    [requireAuth, setCart, removeFromCart, user],
  );

  const userCartItems = useMemo(() => {
    if (!user) return [];
    return cart.filter((item) => item.userId === user._id);
  }, [cart, user]);

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

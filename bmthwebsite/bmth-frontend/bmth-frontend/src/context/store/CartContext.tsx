import React, { createContext, useState, useEffect, useMemo, useCallback } from "react";
import type { CartItem } from "../../types/Store/Cart";


type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (key: { productId: number; color: string; size: string; variantId: number }) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((item: CartItem) => {
    setCart((prev) => {
      const index = prev.findIndex(
        (i) =>
          i.productId === item.productId &&
          i.color === item.color &&
          i.size === item.size &&
          i.variantId === item.variantId
      );

      if (index >= 0) {
        const next = [...prev];
        next[index] = {
          ...next[index],
          quantity: item.quantity,
        };
        return next;
      }

      return [...prev, item];
    });
  }, []);

  const removeFromCart = useCallback((key: { productId: number; color: string; size: string; variantId: number }) => {
    setCart((prev) =>
      prev.filter(
        (i) =>
          !(i.productId === key.productId && i.color === key.color && i.size === key.size && i.variantId === key.variantId)
      )
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const value = useMemo(
    () => ({ cart, addToCart, removeFromCart, clearCart }),
    [cart, addToCart, removeFromCart, clearCart]
  );

  return (
    <CartContext.Provider value={value}>
      {children}l
    </CartContext.Provider>
  );
};

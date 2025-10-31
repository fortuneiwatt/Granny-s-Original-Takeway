import React, { createContext, useContext, useState } from "react";

// 🛒 Cart Item Type
export type CartItem = {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string; // optional for displaying thumbnails
};

// 🛒 Context Type
type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string | number) => void;
  clearCart: () => void;
  increaseQuantity: (id: string | number) => void;
  decreaseQuantity: (id: string | number) => void;
};

// ✅ Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// ✅ Provider Props
type CartProviderProps = {
  children: React.ReactNode;
};

// ✅ Provider Component
export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add or increase quantity
  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // Remove item completely
  const removeFromCart = (id: string | number) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  // Clear all
  const clearCart = () => setCart([]);

  // Increase quantity
  const increaseQuantity = (id: string | number) => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  // Decrease quantity (auto-remove if 0)
  const decreaseQuantity = (id: string | number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

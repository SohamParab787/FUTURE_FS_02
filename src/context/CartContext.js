import React, { createContext, useContext, useEffect, useState } from "react";

const KEY = "electromart_cart_v1";
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const s = localStorage.getItem(KEY);
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  function addToCart(product, qty = 1) {
    setCart(prev => {
      const found = prev.find(item => item.id === product.id);
      if (found) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        ).filter(item => item.qty > 0); 
      }
      if (qty <= 0) return prev; 
      return [...prev, { id: product.id, title: product.title, price: product.price, thumbnail: product.thumbnail, qty }];
    });
  }

  function updateQty(id, qty) {
    setCart(prev => {
      if (qty <= 0) return prev.filter(i => i.id !== id);
      return prev.map(item => item.id === id ? { ...item, qty } : item);
    });
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(item => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  const subtotal = cart.reduce((s, i) => s + (i.price || 0) * (i.qty || 0), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeFromCart, clearCart, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

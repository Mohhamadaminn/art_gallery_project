import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getCart, addToCart as apiAddToCart, removeFromCart as apiRemoveFromCart } from "../api/orders";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], total_price: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCart();
      setCart(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("access")) {
      refreshCart();
    }
  }, [refreshCart]);

  const addToCart = async (itemType, objectId) => {
    await apiAddToCart(itemType, objectId);
    await refreshCart();
  };

  const removeFromCart = async (itemId) => {
    await apiRemoveFromCart(itemId);
    await refreshCart();
  };

  const clearCartLocally = () => setCart({ items: [], total_price: 0 });

  return (
    <CartContext.Provider
      value={{ cart, loading, error, addToCart, removeFromCart, refreshCart, clearCartLocally }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside a <CartProvider>");
  }
  return context;
}
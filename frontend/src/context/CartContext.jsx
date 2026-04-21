import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

const getProductId = (product) => product._id || product.id || product.title;

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const productId = getProductId(product);
    setCartItems((prev) => {
      const existing = prev.find((item) => getProductId(item.product) === productId);
      if (existing) {
        return prev.map((item) =>
          getProductId(item.product) === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => getProductId(item.product) !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        getProductId(item.product) === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + Number(item.product.price || 0) * Number(item.quantity || 0),
        0
      ),
    [cartItems]
  );

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        totalItems,
        getProductId
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('vsm_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem('vsm_cart', JSON.stringify(items));
  }, [items]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const addToCart = (product, quantity = 1) => {
    setItems(prevItems => {
      const existing = prevItems.find(item => item.product.code === product.code);
      const currentQty = existing ? existing.quantity : 0;
      const requestedQty = currentQty + quantity;

      if (requestedQty > product.stock) {
        showNotification(`No puedes agregar más de ${product.stock} unidades en stock.`);
        return prevItems;
      }

      if (existing) {
        showNotification(`Se actualizó la cantidad de "${product.name}" en el carrito.`);
        return prevItems.map(item =>
          item.product.code === product.code
            ? { ...item, quantity: requestedQty }
            : item
        );
      } else {
        showNotification(`¡"${product.name}" agregado al carrito!`);
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const updateQuantity = (code, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(code);
      return;
    }
    setItems(prev =>
      prev.map(item => {
        if (item.product.code === code) {
          const maxStock = item.product.stock;
          const qty = Math.min(newQuantity, maxStock);
          return { ...item, quantity: qty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (code) => {
    setItems(prev => prev.filter(item => item.product.code !== code));
    showNotification('Producto eliminado del carrito.');
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => {
    const unitPrice = item.product.offerPrice || item.product.price;
    return sum + unitPrice * item.quantity;
  }, 0);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        total,
        itemCount,
        notification
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

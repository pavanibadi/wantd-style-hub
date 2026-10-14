import { createContext, useContext, useEffect, useState } from "react";

// Keep one context instance across hot reloads so the provider and consumers always match.
const StoreContext = globalThis.__wantdStoreContext || (globalThis.__wantdStoreContext = createContext(null));
const KEY = "wantd-store-v1";
const ORDERS_KEY = "wantd-orders-v1";

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]); // [{ id, qty }]
  const [wishlist, setWishlist] = useState([]); // [id]
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
      if (Array.isArray(saved.cart)) setCart(saved.cart);
      if (Array.isArray(saved.wishlist)) setWishlist(saved.wishlist);
      const savedOrders = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
      if (Array.isArray(savedOrders)) setOrders(savedOrders);
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify({ cart, wishlist }));
  }, [cart, wishlist, loaded]);

  useEffect(() => {
    if (loaded) localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders, loaded]);

  const placeOrder = (order) => {
    setOrders((o) => [order, ...o]);
    setCart([]);
  };
  const getOrder = (id) => orders.find((o) => o.id === id);

  const addToCart = (id, qty = 1) =>
    setCart((c) => {
      const found = c.find((i) => i.id === id);
      if (found) return c.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      return [...c, { id, qty }];
    });
  const updateQty = (id, qty) =>
    setCart((c) => (qty <= 0 ? c.filter((i) => i.id !== id) : c.map((i) => (i.id === id ? { ...i, qty } : i))));
  const removeFromCart = (id) => setCart((c) => c.filter((i) => i.id !== id));
  const toggleWishlist = (id) =>
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
  const isWished = (id) => wishlist.includes(id);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <StoreContext.Provider
      value={{ cart, wishlist, orders, loaded, addToCart, updateQty, removeFromCart, toggleWishlist, isWished, cartCount, placeOrder, getOrder }}
    >
      {children}
    </StoreContext.Provider>
  );
}

const fallback = {
  cart: [], wishlist: [], orders: [], loaded: false, cartCount: 0,
  addToCart() {}, updateQty() {}, removeFromCart() {}, toggleWishlist() {},
  isWished: () => false, placeOrder() {}, getOrder: () => undefined,
};

export const useStore = () => useContext(StoreContext) || fallback;

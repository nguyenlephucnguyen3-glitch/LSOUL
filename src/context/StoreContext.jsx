import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { getProduct } from '../data/products.js';

const StoreContext = createContext(null);

function load(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}
function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* bỏ qua khi trình duyệt chặn storage */
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => load('lsoul-cart', []));
  const [wishlist, setWishlist] = useState(() => load('lsoul-wish', []));
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [orders, setOrders] = useState(() => load('lsoul-orders', []));
  const [toast, setToast] = useState(null);
  const timer = useRef();

  useEffect(() => save('lsoul-cart', cart), [cart]);
  useEffect(() => save('lsoul-wish', wishlist), [wishlist]);
  useEffect(() => save('lsoul-orders', orders), [orders]);

  const notify = useCallback((msg) => {
    clearTimeout(timer.current);
    setToast({ msg, key: Date.now() });
    timer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const addToCart = useCallback(
    (id, size = 'S', color, qty = 1) => {
      const p = getProduct(id);
      const c = color || p.colors[0].name;
      setCart((items) => {
        const key = `${id}-${size}-${c}`;
        const found = items.find((i) => i.key === key);
        if (found) return items.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
        return [...items, { key, id, size, color: c, qty }];
      });
      notify(`${p.name} — size ${size} đã vào giỏ`);
      setCartOpen(true);
    },
    [notify],
  );

  const updateQty = (key, qty) =>
    setCart((items) => (qty <= 0 ? items.filter((i) => i.key !== key) : items.map((i) => (i.key === key ? { ...i, qty } : i))));

  const clearCart = () => setCart([]);

  const toggleWish = (id) => {
    const p = getProduct(id);
    const has = wishlist.includes(id);
    notify(has ? `Đã bỏ ${p.name} khỏi Wishlist` : `Đã lưu ${p.name} vào Wishlist`);
    setWishlist((list) => (has ? list.filter((x) => x !== id) : [...list, id]));
  };

  // Mock đặt hàng: lưu đơn vào localStorage, xóa giỏ, trả về mã đơn.
  const placeOrder = (data) => {
    const now = new Date();
    const code = `LS${String(now.getFullYear()).slice(2)}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const items = cart.map((i) => {
      const p = getProduct(i.id);
      return { ...i, name: p.name, price: p.price, image: p.images[0] };
    });
    setOrders((list) => [{ ...data, id: code, items, createdAt: now.getTime() }, ...list]);
    setCart([]);
    return code;
  };

  const cancelOrder = (id) => {
    setOrders((list) => list.map((o) => (o.id === id ? { ...o, cancelled: true } : o)));
    notify(`Đã hủy đơn ${id}`);
  };

  const value = useMemo(() => {
    const lines = cart.map((i) => ({ ...i, product: getProduct(i.id) })).filter((i) => i.product);
    const count = lines.reduce((s, i) => s + i.qty, 0);
    const subtotal = lines.reduce((s, i) => s + i.qty * i.product.price, 0);
    return {
      lines, count, subtotal, wishlist, toast, orders,
      cartOpen, setCartOpen, searchOpen, setSearchOpen,
      addToCart, updateQty, clearCart, toggleWish, notify, placeOrder, cancelOrder,
    };
  });

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);

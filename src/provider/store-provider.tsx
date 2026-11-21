'use client';
import { COUPONS, calcTotals, type Totals } from '@/lib/pricing';
import type { Product } from '@/lib/products';
import { usePathname, useRouter } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

/*
 * Client-side demo store persisted in localStorage.
 * Cart, wishlist, accounts and orders live in the browser only. When you add a backend,
 * keep this context's API and replace the bodies of register/login/placeOrder/etc. with fetch calls.
 */

export type CartItem = {
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  color: string;
  quantity: number;
  category: string;
};
export type Address = {
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};
export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  address?: Address;
};
export type CheckoutDraft = { email: string; address: Address };
export type Payment = {
  method: 'card' | 'cod';
  brand?: string;
  last4?: string;
};
export type Order = {
  id: string;
  userEmail: string | null;
  email: string;
  createdAt: string;
  items: CartItem[];
  totals: Totals;
  coupon: string | null;
  address: Address;
  payment: Payment;
};
type StoredUser = User & { passwordHash: string };
type Result = { ok: true } | { ok: false; error: string };

type Persisted = {
  cart: CartItem[];
  wishlist: Product[];
  coupon: string | null;
  checkout: CheckoutDraft | null;
  session: string | null;
  orders: Order[];
};
const KEY = 'morrow:store:v1';
const USERS_KEY = 'morrow:users:v1';
const empty: Persisted = {
  cart: [],
  wishlist: [],
  coupon: null,
  checkout: null,
  session: null,
  orders: [],
};

async function sha256(value: string) {
  const buffer = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(value),
  );
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function orderStatus(
  order: Order,
): 'Processing' | 'Shipped' | 'Delivered' {
  const days = (Date.now() - new Date(order.createdAt).getTime()) / 86_400_000;
  return days > 5 ? 'Delivered' : days > 2 ? 'Shipped' : 'Processing';
}

type Store = {
  ready: boolean;
  cart: CartItem[];
  cartCount: number;
  totals: Totals;
  coupon: string | null;
  addToCart: (product: Product, color?: string, quantity?: number) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => Result;
  removeCoupon: () => void;
  wishlist: Product[];
  isWished: (id: string) => boolean;
  toggleWishlist: (product: Product) => void;
  clearWishlist: () => void;
  user: User | null;
  register: (name: string, email: string, password: string) => Promise<Result>;
  login: (email: string, password: string) => Promise<Result>;
  logout: () => void;
  updateProfile: (
    patch: Partial<Pick<User, 'name' | 'phone' | 'address'>>,
  ) => void;
  changePassword: (current: string, next: string) => Promise<Result>;
  checkout: CheckoutDraft | null;
  setCheckout: (draft: CheckoutDraft) => void;
  placeOrder: (payment: Payment) => Order | null;
  orders: Order[];
  allOrders: Order[];
};

const StoreContext = createContext<Store | null>(null);

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>');
  return ctx;
}

/** Redirects to /login (with ?next=) when signed out. */
export function useRequireAuth() {
  const { ready, user } = useStore();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (ready && !user)
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
  }, [ready, user, router, pathname]);
  return { ready, user };
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(empty);
  const [users, setUsers] = useState<StoredUser[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...empty, ...JSON.parse(raw) });
      const rawUsers = localStorage.getItem(USERS_KEY);
      if (rawUsers) setUsers(JSON.parse(rawUsers));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch {}
  }, [state, users, ready]);

  const storedUser = users.find((u) => u.id === state.session) ?? null;
  const user = useMemo<User | null>(() => {
    if (!storedUser) return null;
    const { passwordHash: _hash, ...rest } = storedUser;
    return rest;
  }, [storedUser]);

  const totals = useMemo(
    () => calcTotals(state.cart, state.coupon),
    [state.cart, state.coupon],
  );
  const wishIds = useMemo(
    () => new Set(state.wishlist.map((p) => p.id)),
    [state.wishlist],
  );

  const addToCart = useCallback(
    (product: Product, color = product.colors[0], quantity = 1) => {
      const key = `${product.id}:${color}`;
      setState((s) => {
        const existing = s.cart.find((i) => i.key === key);
        if (existing)
          return {
            ...s,
            cart: s.cart.map((i) =>
              i.key === key
                ? { ...i, quantity: Math.min(10, i.quantity + quantity) }
                : i,
            ),
          };
        const item: CartItem = {
          key,
          productId: product.id,
          slug: product.slug,
          name: product.name,
          image: product.image,
          price: product.price,
          color,
          quantity: Math.min(10, quantity),
          category: product.category,
        };
        return { ...s, cart: [...s.cart, item] };
      });
    },
    [],
  );
  const updateQuantity = useCallback((key: string, quantity: number) => {
    setState((s) => ({
      ...s,
      cart: s.cart.map((i) =>
        i.key === key
          ? { ...i, quantity: Math.max(1, Math.min(10, quantity)) }
          : i,
      ),
    }));
  }, []);
  const removeFromCart = useCallback(
    (key: string) =>
      setState((s) => ({ ...s, cart: s.cart.filter((i) => i.key !== key) })),
    [],
  );
  const clearCart = useCallback(
    () => setState((s) => ({ ...s, cart: [], coupon: null })),
    [],
  );

  const applyCoupon = useCallback((code: string): Result => {
    const normalized = code.trim().toUpperCase();
    if (!COUPONS[normalized])
      return { ok: false, error: "That code isn't valid." };
    setState((s) => ({ ...s, coupon: normalized }));
    return { ok: true };
  }, []);
  const removeCoupon = useCallback(
    () => setState((s) => ({ ...s, coupon: null })),
    [],
  );

  const toggleWishlist = useCallback((product: Product) => {
    setState((s) => ({
      ...s,
      wishlist: s.wishlist.some((p) => p.id === product.id)
        ? s.wishlist.filter((p) => p.id !== product.id)
        : [...s.wishlist, product],
    }));
  }, []);
  const clearWishlist = useCallback(
    () => setState((s) => ({ ...s, wishlist: [] })),
    [],
  );
  const isWished = useCallback((id: string) => wishIds.has(id), [wishIds]);

  const register = useCallback(
    async (name: string, email: string, password: string): Promise<Result> => {
      const e = email.trim().toLowerCase();
      if (users.some((u) => u.email === e))
        return {
          ok: false,
          error: 'An account with this email already exists.',
        };
      const created: StoredUser = {
        id: crypto.randomUUID(),
        name: name.trim(),
        email: e,
        createdAt: new Date().toISOString(),
        passwordHash: await sha256(password),
      };
      setUsers((prev) => [...prev, created]);
      setState((s) => ({ ...s, session: created.id }));
      return { ok: true };
    },
    [users],
  );

  const login = useCallback(
    async (email: string, password: string): Promise<Result> => {
      const found = users.find((u) => u.email === email.trim().toLowerCase());
      if (!found || found.passwordHash !== (await sha256(password)))
        return { ok: false, error: 'Incorrect email or password.' };
      setState((s) => ({ ...s, session: found.id }));
      return { ok: true };
    },
    [users],
  );

  const logout = useCallback(
    () => setState((s) => ({ ...s, session: null })),
    [],
  );

  const updateProfile = useCallback(
    (patch: Partial<Pick<User, 'name' | 'phone' | 'address'>>) => {
      setUsers((prev) =>
        prev.map((u) => (u.id === state.session ? { ...u, ...patch } : u)),
      );
    },
    [state.session],
  );

  const changePassword = useCallback(
    async (current: string, next: string): Promise<Result> => {
      if (!storedUser) return { ok: false, error: 'You need to be signed in.' };
      if (storedUser.passwordHash !== (await sha256(current)))
        return { ok: false, error: 'Your current password is incorrect.' };
      const passwordHash = await sha256(next);
      setUsers((prev) =>
        prev.map((u) => (u.id === storedUser.id ? { ...u, passwordHash } : u)),
      );
      return { ok: true };
    },
    [storedUser],
  );

  const setCheckout = useCallback(
    (draft: CheckoutDraft) => setState((s) => ({ ...s, checkout: draft })),
    [],
  );

  const placeOrder = useCallback(
    (payment: Payment): Order | null => {
      if (!state.cart.length || !state.checkout) return null;
      const order: Order = {
        id: `MRW-${Date.now().toString(36).toUpperCase()}`,
        userEmail: user?.email ?? null,
        email: state.checkout.email,
        createdAt: new Date().toISOString(),
        items: state.cart,
        totals,
        coupon: state.coupon,
        address: state.checkout.address,
        payment,
      };
      setState((s) => ({
        ...s,
        orders: [order, ...s.orders],
        cart: [],
        coupon: null,
      }));
      return order;
    },
    [state.cart, state.checkout, state.coupon, totals, user],
  );

  const orders = useMemo(
    () => (user ? state.orders.filter((o) => o.userEmail === user.email) : []),
    [state.orders, user],
  );

  const value: Store = {
    ready,
    cart: state.cart,
    cartCount: totals.itemCount,
    totals,
    coupon: state.coupon,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    wishlist: state.wishlist,
    isWished,
    toggleWishlist,
    clearWishlist,
    user,
    register,
    login,
    logout,
    updateProfile,
    changePassword,
    checkout: state.checkout,
    setCheckout,
    placeOrder,
    orders,
    allOrders: state.orders,
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

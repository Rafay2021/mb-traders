export const FREE_SHIPPING_THRESHOLD = 75;
export const SHIPPING_FEE = 8;

export const COUPONS: Record<string, { label: string; percent: number }> = {
  WELCOME15: { label: "15% off your first order", percent: 15 },
};

export type Totals = { subtotal: number; discount: number; shipping: number; total: number; itemCount: number };

const round = (n: number) => Math.round(n * 100) / 100;

export function calcTotals(items: { price: number; quantity: number }[], coupon: string | null): Totals {
  const subtotal = round(items.reduce((sum, i) => sum + i.price * i.quantity, 0));
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const percent = coupon ? COUPONS[coupon]?.percent ?? 0 : 0;
  const discount = round((subtotal * percent) / 100);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  return { subtotal, discount, shipping, total: round(subtotal - discount + shipping), itemCount };
}

export const formatMoney = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

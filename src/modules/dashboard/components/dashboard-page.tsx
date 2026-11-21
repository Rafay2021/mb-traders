'use client';
import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  Heart,
  Package,
  Settings,
  ShoppingBag,
  Wallet,
} from 'lucide-react';

import { products, formatPrice } from '@/lib/products';
import { formatMoney } from '@/lib/pricing';
import {
  orderStatus,
  useRequireAuth,
  useStore,
} from '@/provider/store-provider';
import { secondaryBtn } from '@/modules/auth/components/form-ui';

const STATUS_STYLE = {
  Processing: 'bg-amber-50 text-amber-700',
  Shipped: 'bg-sky-50 text-sky-700',
  Delivered: 'bg-emerald-50 text-emerald-700',
} as const;

export function DashboardPage() {
  const { ready, user } = useRequireAuth();
  const { orders, wishlist, cartCount } = useStore();

  const spent = useMemo(
    () => orders.reduce((sum, o) => sum + o.totals.total, 0),
    [orders],
  );
  const months = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      const total = orders
        .filter((o) => {
          const c = new Date(o.createdAt);
          return (
            c.getFullYear() === d.getFullYear() && c.getMonth() === d.getMonth()
          );
        })
        .reduce((sum, o) => sum + o.totals.total, 0);
      return {
        label: d.toLocaleDateString('en-US', { month: 'short' }),
        total,
      };
    });
  }, [orders]);
  const maxMonth = Math.max(1, ...months.map((m) => m.total));
  const suggestions = useMemo(() => {
    const wished = new Set(wishlist.map((p) => p.id));
    return products.filter((p) => p.featured && !wished.has(p.id)).slice(0, 4);
  }, [wishlist]);

  if (!ready || !user)
    return (
      <div className='container-shell py-24 text-center text-sm text-slate-500'>
        Loading your dashboard…
      </div>
    );

  const stats = [
    { label: 'Orders', value: String(orders.length), icon: Package },
    { label: 'Total spent', value: formatMoney(spent), icon: Wallet },
    { label: 'Wishlist', value: String(wishlist.length), icon: Heart },
    { label: 'In your bag', value: String(cartCount), icon: ShoppingBag },
  ];

  return (
    <div className='container-shell py-10'>
      <div className='mb-8 flex flex-wrap items-end justify-between gap-4'>
        <div>
          <p className='text-[10px] font-bold uppercase tracking-[.2em] text-violet-600'>
            Dashboard
          </p>
          <h1 className='mt-2 text-3xl font-black tracking-tight'>
            Hi {user.name.split(' ')[0]}, here&apos;s your overview.
          </h1>
        </div>
        <Link
          href='/account'
          className={secondaryBtn}>
          <Settings size={16} /> Profile & account
        </Link>
      </div>

      <div className='grid grid-cols-2 gap-3 lg:grid-cols-4'>
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className='rounded-2xl border border-slate-100 bg-white p-5'>
            <div className='mb-4 grid h-9 w-9 place-items-center rounded-xl bg-violet-50 text-violet-700'>
              <Icon size={17} />
            </div>
            <p className='text-2xl font-black tracking-tight'>{value}</p>
            <p className='mt-1 text-xs text-slate-500'>{label}</p>
          </div>
        ))}
      </div>

      <div className='mt-6 grid gap-6 lg:grid-cols-[1fr_340px]'>
        <section className='rounded-2xl border border-slate-100 bg-white p-6'>
          <h2 className='font-bold'>Recent orders</h2>
          {orders.length ? (
            <ul className='mt-4 divide-y divide-slate-100'>
              {orders.slice(0, 8).map((order) => {
                const status = orderStatus(order);
                return (
                  <li key={order.id}>
                    <details className='group py-3'>
                      <summary className='flex cursor-pointer list-none flex-wrap items-center gap-x-4 gap-y-1 text-sm'>
                        <span className='font-semibold'>{order.id}</span>
                        <span className='text-slate-400'>
                          {new Date(order.createdAt).toLocaleDateString(
                            'en-US',
                            { day: 'numeric', month: 'short', year: 'numeric' },
                          )}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLE[status]}`}>
                          {status}
                        </span>
                        <span className='ml-auto font-bold'>
                          {formatMoney(order.totals.total)}
                        </span>
                      </summary>
                      <ul className='mt-3 space-y-3 rounded-xl bg-slate-50 p-4'>
                        {order.items.map((item) => (
                          <li
                            key={item.key}
                            className='flex items-center gap-3'>
                            <Link
                              href={`/products/${item.slug}`}
                              className='relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-200'>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes='48px'
                                className='object-cover'
                              />
                            </Link>
                            <div className='min-w-0 flex-1'>
                              <Link
                                href={`/products/${item.slug}`}
                                className='block truncate text-sm font-medium hover:text-violet-700'>
                                {item.name}
                              </Link>
                              <p className='text-xs text-slate-400'>
                                {item.color} · Qty {item.quantity}
                              </p>
                            </div>
                            <span className='text-sm font-semibold'>
                              {formatMoney(item.price * item.quantity)}
                            </span>
                          </li>
                        ))}
                        <li className='border-t border-slate-200 pt-3 text-xs text-slate-500'>
                          Shipped to {order.address.city},{' '}
                          {order.address.country} ·{' '}
                          {order.payment.method === 'card'
                            ? `${order.payment.brand} ••${order.payment.last4}`
                            : 'Cash on delivery'}
                        </li>
                      </ul>
                    </details>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className='mt-4 rounded-xl border border-dashed border-slate-200 py-12 text-center text-sm text-slate-500'>
              No orders yet.{' '}
              <Link
                href='/products'
                className='font-semibold text-violet-700 hover:underline'>
                Start shopping
              </Link>
            </div>
          )}
        </section>

        <section className='rounded-2xl border border-slate-100 bg-white p-6'>
          <h2 className='font-bold'>Spending, last 6 months</h2>
          <div
            className='mt-6 flex h-44 items-end gap-3'
            role='img'
            aria-label={`Monthly spending: ${months.map((m) => `${m.label} ${formatMoney(m.total)}`).join(', ')}`}>
            {months.map((m) => (
              <div
                key={m.label}
                className='flex h-full flex-1 flex-col items-center justify-end gap-2'>
                <div
                  className='w-full rounded-t-lg bg-violet-500/90 transition-all'
                  style={{
                    height: `${(m.total / maxMonth) * 100}%`,
                    minHeight: m.total ? 4 : 2,
                    opacity: m.total ? 1 : 0.2,
                  }}
                  title={formatMoney(m.total)}
                />
                <span className='text-[10px] text-slate-400'>{m.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className='mt-6 rounded-2xl border border-slate-100 bg-white p-6'>
        <div className='flex items-center justify-between'>
          <h2 className='font-bold'>
            {wishlist.length ? 'From your wishlist' : 'You might like'}
          </h2>
          <Link
            href={wishlist.length ? '/wishlist' : '/products'}
            className='flex items-center gap-1 text-xs font-semibold text-violet-700'>
            View all <ArrowUpRight size={14} />
          </Link>
        </div>
        <ul className='mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4'>
          {(wishlist.length ? wishlist.slice(0, 4) : suggestions).map((p) => (
            <li key={p.id}>
              <Link
                href={`/products/${p.slug}`}
                className='group block'>
                <span className='relative block aspect-square overflow-hidden rounded-xl bg-slate-100'>
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes='(min-width:640px) 20vw, 45vw'
                    className='object-cover transition duration-500 group-hover:scale-105'
                  />
                </span>
                <span className='mt-2 block truncate text-sm font-semibold'>
                  {p.name}
                </span>
                <span className='text-xs text-slate-500'>
                  {formatPrice(p.price)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

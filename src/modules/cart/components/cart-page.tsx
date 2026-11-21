'use client';
import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, ShoppingBag, Tag, Trash2, X } from 'lucide-react';

import { FREE_SHIPPING_THRESHOLD, formatMoney } from '@/lib/pricing';

import { useStore } from '@/provider/store-provider';
import { CheckoutSteps, EmptyState, OrderSummary } from './checkout-ui';
import { inputCls, primaryBtn } from '@/modules/auth/components/form-ui';

export function CartPage() {
  const {
    ready,
    cart,
    totals,
    coupon,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
  } = useStore();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!ready)
    return (
      <div className='container-shell py-24 text-center text-sm text-slate-500'>
        Loading your bag…
      </div>
    );
  if (!cart.length)
    return (
      <div className='container-shell py-20'>
        <EmptyState
          icon={<ShoppingBag size={24} />}
          title='Your bag is empty'
          text="Looks like you haven't added anything yet."
          href='/products'
          cta='Start shopping'
        />
      </div>
    );

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - totals.subtotal);
  const submitCoupon = (e: FormEvent) => {
    e.preventDefault();
    const result = applyCoupon(code);
    setError(result.ok ? null : result.error);
    if (result.ok) setCode('');
  };

  return (
    <div className='container-shell py-10'>
      <CheckoutSteps current={0} />
      <div className='mb-6 flex items-end justify-between'>
        <h1 className='text-3xl font-black tracking-tight'>
          Your bag{' '}
          <span className='text-lg font-semibold text-slate-400'>
            ({totals.itemCount})
          </span>
        </h1>
        <button
          onClick={clearCart}
          className='text-xs font-semibold text-slate-500 hover:text-rose-600'>
          Clear bag
        </button>
      </div>
      <div className='grid gap-8 lg:grid-cols-[1fr_380px]'>
        <div>
          <div className='mb-5 rounded-2xl bg-violet-50 px-5 py-4 text-sm'>
            {remaining > 0 ? (
              <p>
                Add <strong>{formatMoney(remaining)}</strong> more for free
                shipping.
              </p>
            ) : (
              <p className='font-semibold text-violet-800'>
                You&apos;ve unlocked free shipping 🎉
              </p>
            )}
            <div className='mt-2.5 h-1.5 overflow-hidden rounded-full bg-white'>
              <div
                className='h-full rounded-full bg-violet-600 transition-all'
                style={{
                  width: `${Math.min(100, (totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                }}
              />
            </div>
          </div>
          <ul className='divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white'>
            {cart.map((item) => (
              <li
                key={item.key}
                className='flex gap-4 p-4 sm:p-5'>
                <Link
                  href={`/products/${item.slug}`}
                  className='relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-28 sm:w-28'>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes='112px'
                    className='object-cover'
                  />
                </Link>
                <div className='flex min-w-0 flex-1 flex-col'>
                  <div className='flex items-start justify-between gap-3'>
                    <div className='min-w-0'>
                      <p className='text-[10px] font-bold uppercase tracking-[.14em] text-slate-400'>
                        {item.category}
                      </p>
                      <Link
                        href={`/products/${item.slug}`}
                        className='block truncate text-sm font-semibold hover:text-violet-700'>
                        {item.name}
                      </Link>
                      <p className='mt-1 text-xs text-slate-400'>
                        Option: {item.color}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.key)}
                      aria-label={`Remove ${item.name}`}
                      className='rounded-full p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600'>
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className='mt-auto flex items-center justify-between pt-3'>
                    <div className='flex items-center rounded-full border border-slate-200'>
                      <button
                        aria-label='Decrease quantity'
                        onClick={() =>
                          updateQuantity(item.key, item.quantity - 1)
                        }
                        className='px-3 py-2 text-slate-500 disabled:opacity-40'
                        disabled={item.quantity <= 1}>
                        <Minus size={13} />
                      </button>
                      <span className='min-w-6 text-center text-sm font-semibold'>
                        {item.quantity}
                      </span>
                      <button
                        aria-label='Increase quantity'
                        onClick={() =>
                          updateQuantity(item.key, item.quantity + 1)
                        }
                        className='px-3 py-2 text-slate-500 disabled:opacity-40'
                        disabled={item.quantity >= 10}>
                        <Plus size={13} />
                      </button>
                    </div>
                    <span className='text-sm font-bold'>
                      {formatMoney(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href='/products'
            className='mt-5 inline-block text-xs font-semibold text-violet-700 hover:underline'>
            ← Continue shopping
          </Link>
        </div>
        <div className='space-y-4'>
          <div className='rounded-2xl border border-slate-100 bg-white p-6'>
            <h2 className='flex items-center gap-2 text-sm font-bold'>
              <Tag size={15} /> Promo code
            </h2>
            {coupon ? (
              <div className='mt-3 flex items-center justify-between rounded-xl bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700'>
                <span>
                  <strong>{coupon}</strong> applied
                </span>
                <button
                  onClick={removeCoupon}
                  aria-label='Remove code'>
                  <X size={15} />
                </button>
              </div>
            ) : (
              <form
                onSubmit={submitCoupon}
                className='mt-3 flex gap-2'>
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder='WELCOME15'
                  aria-label='Promo code'
                  className={inputCls}
                />
                <button className='rounded-xl bg-slate-100 px-4 text-xs font-semibold hover:bg-slate-200'>
                  Apply
                </button>
              </form>
            )}
            {error && (
              <p
                role='alert'
                className='mt-2 text-xs text-rose-600'>
                {error}
              </p>
            )}
          </div>
          <OrderSummary
            items={cart}
            totals={totals}
            coupon={coupon}
            showItems={false}
          />
          <Link
            href='/checkout'
            className={`${primaryBtn} w-full`}>
            Checkout · {formatMoney(totals.total)}
          </Link>
        </div>
      </div>
    </div>
  );
}

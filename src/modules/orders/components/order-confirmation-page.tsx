'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { primaryBtn, secondaryBtn } from '@/modules/auth/components/form-ui';
import { useStore } from '@/provider/store-provider';
import { OrderSummary } from '@/modules/cart/components/checkout-ui';

export function OrderConfirmationPage() {
  const id = useSearchParams().get('id');
  const { ready, allOrders, user } = useStore();
  if (!ready)
    return (
      <div className='container-shell py-24 text-center text-sm text-slate-500'>
        Loading…
      </div>
    );
  const order = allOrders.find((o) => o.id === id);
  if (!order) {
    return (
      <div className='container-shell py-24 text-center'>
        <h1 className='text-2xl font-bold'>We couldn&apos;t find that order</h1>
        <Link
          href='/products'
          className={`${primaryBtn} mt-6`}>
          Continue shopping
        </Link>
      </div>
    );
  }
  const { address, payment } = order;
  return (
    <div className='container-shell max-w-4xl py-14'>
      <div className='text-center'>
        <CheckCircle2
          size={52}
          className='mx-auto text-emerald-500'
        />
        <h1 className='mt-5 text-3xl font-black tracking-tight'>
          Thank you, {address.fullName.split(' ')[0]}!
        </h1>
        <p className='mt-2 text-sm text-slate-500'>
          Order <strong className='text-slate-800'>{order.id}</strong> is
          confirmed. We sent the details to {order.email}.
        </p>
      </div>
      <div className='mt-10 grid gap-6 md:grid-cols-[1fr_380px]'>
        <div className='space-y-4 rounded-2xl border border-slate-100 bg-white p-6 text-sm'>
          <div>
            <p className='text-xs font-semibold text-slate-400'>
              Delivering to
            </p>
            <p className='mt-1 font-medium'>{address.fullName}</p>
            <p className='text-slate-500'>
              {address.line1}
              {address.line2 ? `, ${address.line2}` : ''}
              <br />
              {address.city}, {address.state} {address.postalCode}
              <br />
              {address.country}
            </p>
          </div>
          <div className='border-t border-slate-100 pt-4'>
            <p className='text-xs font-semibold text-slate-400'>Payment</p>
            <p className='mt-1 font-medium'>
              {payment.method === 'card'
                ? `${payment.brand} ending in ${payment.last4}`
                : 'Cash on delivery'}
            </p>
          </div>
          <div className='border-t border-slate-100 pt-4'>
            <p className='text-xs font-semibold text-slate-400'>
              Estimated delivery
            </p>
            <p className='mt-1 font-medium'>3–5 business days</p>
          </div>
        </div>
        <OrderSummary
          items={order.items}
          totals={order.totals}
          coupon={order.coupon}
        />
      </div>
      <div className='mt-10 flex flex-wrap justify-center gap-3'>
        {user && (
          <Link
            href='/dashboard'
            className={secondaryBtn}>
            View my orders
          </Link>
        )}
        <Link
          href='/products'
          className={primaryBtn}>
          Continue shopping
        </Link>
      </div>
    </div>
  );
}

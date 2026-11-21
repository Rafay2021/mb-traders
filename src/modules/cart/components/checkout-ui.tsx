import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';

import { formatMoney, type Totals } from '@/lib/pricing';
import { CartItem } from '@/provider/store-provider';

const STEPS = ['Bag', 'Details', 'Payment'];

export function CheckoutSteps({ current }: { current: 0 | 1 | 2 }) {
  return (
    <ol className='mb-8 flex items-center gap-3 text-xs font-semibold'>
      {STEPS.map((label, i) => (
        <li
          key={label}
          className='flex items-center gap-3'>
          <span
            className={`flex items-center gap-2 ${i <= current ? 'text-violet-700' : 'text-slate-400'}`}>
            <span
              className={`grid h-6 w-6 place-items-center rounded-full text-[11px] ${i < current ? 'bg-violet-600 text-white' : i === current ? 'border-2 border-violet-600' : 'border border-slate-300'}`}>
              {i < current ? <Check size={13} /> : i + 1}
            </span>
            {label}
          </span>
          {i < STEPS.length - 1 && (
            <span className='h-px w-8 bg-slate-300 sm:w-14' />
          )}
        </li>
      ))}
    </ol>
  );
}

export function OrderSummary({
  items,
  totals,
  coupon,
  showItems = true,
}: {
  items: CartItem[];
  totals: Totals;
  coupon?: string | null;
  showItems?: boolean;
}) {
  return (
    <aside className='rounded-2xl border border-slate-100 bg-white p-6'>
      <h2 className='text-base font-bold'>Order summary</h2>
      {showItems && (
        <ul className='mt-5 max-h-72 space-y-4 overflow-y-auto pr-1'>
          {items.map((item) => (
            <li
              key={item.key}
              className='flex items-center gap-3'>
              <Link
                href={`/products/${item.slug}`}
                className='relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100'>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes='64px'
                  className='object-cover'
                />
                <span className='absolute -right-0 -top-0 grid h-5 min-w-5 place-items-center rounded-bl-lg bg-slate-800 px-1 text-[10px] font-bold text-white'>
                  {item.quantity}
                </span>
              </Link>
              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-semibold text-slate-800'>
                  {item.name}
                </p>
                <p className='text-xs text-slate-400'>{item.color}</p>
              </div>
              <span className='text-sm font-semibold'>
                {formatMoney(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
      )}
      <dl className='mt-5 space-y-2.5 border-t border-slate-100 pt-5 text-sm'>
        <div className='flex justify-between'>
          <dt className='text-slate-500'>Subtotal</dt>
          <dd className='font-medium'>{formatMoney(totals.subtotal)}</dd>
        </div>
        {totals.discount > 0 && (
          <div className='flex justify-between text-emerald-600'>
            <dt>Discount{coupon ? ` (${coupon})` : ''}</dt>
            <dd>−{formatMoney(totals.discount)}</dd>
          </div>
        )}
        <div className='flex justify-between'>
          <dt className='text-slate-500'>Shipping</dt>
          <dd className='font-medium'>
            {totals.shipping === 0 ? 'Free' : formatMoney(totals.shipping)}
          </dd>
        </div>
        <div className='flex justify-between border-t border-slate-100 pt-4 text-base font-bold'>
          <dt>Total</dt>
          <dd>{formatMoney(totals.total)}</dd>
        </div>
      </dl>
    </aside>
  );
}

export function EmptyState({
  icon,
  title,
  text,
  href,
  cta,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  href: string;
  cta: string;
}) {
  return (
    <div className='mx-auto max-w-md rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center'>
      <div className='mx-auto grid h-14 w-14 place-items-center rounded-full bg-violet-50 text-violet-600'>
        {icon}
      </div>
      <h2 className='mt-5 text-lg font-bold'>{title}</h2>
      <p className='mt-2 text-sm text-slate-500'>{text}</p>
      <Link
        href={href}
        className='mt-6 inline-flex rounded-full bg-[#24233a] px-6 py-3 text-sm font-semibold text-white hover:bg-violet-700'>
        {cta}
      </Link>
    </div>
  );
}

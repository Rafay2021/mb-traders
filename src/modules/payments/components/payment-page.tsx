'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Banknote, CreditCard, Loader2, Lock } from 'lucide-react';

import { formatMoney } from '@/lib/pricing';
import { useStore } from '@/provider/store-provider';
import {
  CheckoutSteps,
  OrderSummary,
} from '@/modules/cart/components/checkout-ui';
import { Field, primaryBtn } from '@/modules/auth/components/form-ui';

const luhn = (n: string) => {
  let sum = 0,
    alt = false;
  for (let i = n.length - 1; i >= 0; i--) {
    let d = Number(n[i]);
    if (alt) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    alt = !alt;
  }
  return n.length >= 13 && sum % 10 === 0;
};
const brandOf = (n: string) =>
  n.startsWith('4')
    ? 'Visa'
    : /^5[1-5]|^2[2-7]/.test(n)
      ? 'Mastercard'
      : /^3[47]/.test(n)
        ? 'Amex'
        : 'Card';

export function PaymentPage() {
  const router = useRouter();
  const { ready, cart, totals, coupon, checkout, placeOrder } = useStore();
  const [method, setMethod] = useState<'card' | 'cod'>('card');
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);
  const placed = useRef(false);

  useEffect(() => {
    if (!ready || placed.current) return;
    if (cart.length === 0) router.replace('/cart');
    else if (!checkout) router.replace('/checkout');
  }, [ready, cart.length, checkout, router]);

  if (!ready || !checkout || cart.length === 0)
    return (
      <div className='container-shell py-24 text-center text-sm text-slate-500'>
        Loading…
      </div>
    );

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const digits = number.replace(/\D/g, '');
    const next: Record<string, string> = {};
    if (method === 'card') {
      if (!luhn(digits)) next.number = 'Enter a valid card number.';
      if (name.trim().length < 2) next.name = 'Enter the name on the card.';
      const [mm, yy] = expiry.split('/').map(Number);
      if (
        !mm ||
        mm < 1 ||
        mm > 12 ||
        !yy ||
        new Date(2000 + yy, mm, 1) <= new Date()
      )
        next.expiry = 'Enter a valid expiry date.';
      if (cvc.length < 3) next.cvc = 'Enter the security code.';
    }
    setErrors(next);
    if (Object.keys(next).length) return;

    setProcessing(true);
    // Demo only: replace with your payment provider (e.g. Stripe PaymentIntent) before going live.
    await new Promise((r) => setTimeout(r, 1200));
    const order = placeOrder(
      method === 'card'
        ? { method, brand: brandOf(digits), last4: digits.slice(-4) }
        : { method },
    );
    if (order) {
      placed.current = true;
      router.replace(`/order-confirmation?id=${order.id}`);
    } else setProcessing(false);
  };

  const option = (
    value: 'card' | 'cod',
    icon: React.ReactNode,
    title: string,
    sub: string,
  ) => (
    <button
      type='button'
      onClick={() => setMethod(value)}
      aria-pressed={method === value}
      className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${method === value ? 'border-violet-600 bg-violet-50' : 'border-slate-200 hover:border-slate-300'}`}>
      <span className='text-violet-700'>{icon}</span>
      <span>
        <span className='block text-sm font-semibold'>{title}</span>
        <span className='block text-xs text-slate-500'>{sub}</span>
      </span>
    </button>
  );

  return (
    <div className='container-shell py-10'>
      <CheckoutSteps current={2} />
      <div className='grid gap-8 lg:grid-cols-[1fr_380px]'>
        <form
          onSubmit={submit}
          noValidate
          className='space-y-6'>
          <section className='rounded-2xl border border-slate-100 bg-white p-6'>
            <div className='flex items-start justify-between gap-4 text-sm'>
              <div>
                <p className='text-xs font-semibold text-slate-400'>Ship to</p>
                <p className='mt-1 font-medium'>{checkout.address.fullName}</p>
                <p className='text-slate-500'>
                  {checkout.address.line1}
                  {checkout.address.line2
                    ? `, ${checkout.address.line2}`
                    : ''}, {checkout.address.city}, {checkout.address.state}{' '}
                  {checkout.address.postalCode}, {checkout.address.country}
                </p>
                <p className='mt-1 text-slate-500'>{checkout.email}</p>
              </div>
              <Link
                href='/checkout'
                className='shrink-0 text-xs font-semibold text-violet-700 hover:underline'>
                Change
              </Link>
            </div>
          </section>
          <section className='rounded-2xl border border-slate-100 bg-white p-6'>
            <h2 className='mb-4 text-base font-bold'>Payment method</h2>
            <div className='grid gap-3 sm:grid-cols-2'>
              {option(
                'card',
                <CreditCard size={20} />,
                'Credit / debit card',
                'Visa, Mastercard, Amex',
              )}
              {option(
                'cod',
                <Banknote size={20} />,
                'Cash on delivery',
                'Pay when your order arrives',
              )}
            </div>
            {method === 'card' ? (
              <div className='mt-6 grid gap-4 sm:grid-cols-2'>
                <Field
                  className='sm:col-span-2'
                  label='Card number'
                  inputMode='numeric'
                  autoComplete='cc-number'
                  placeholder='4242 4242 4242 4242'
                  value={number}
                  onChange={(e) =>
                    setNumber(
                      e.target.value
                        .replace(/\D/g, '')
                        .slice(0, 16)
                        .replace(/(.{4})/g, '$1 ')
                        .trim(),
                    )
                  }
                  error={errors.number}
                  hint='Demo: 4242 4242 4242 4242 passes validation. No payment is taken.'
                />
                <Field
                  className='sm:col-span-2'
                  label='Name on card'
                  autoComplete='cc-name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={errors.name}
                />
                <Field
                  label='Expiry (MM/YY)'
                  inputMode='numeric'
                  autoComplete='cc-exp'
                  placeholder='MM/YY'
                  value={expiry}
                  onChange={(e) => {
                    const d = e.target.value.replace(/\D/g, '').slice(0, 4);
                    setExpiry(
                      d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d,
                    );
                  }}
                  error={errors.expiry}
                />
                <Field
                  label='Security code'
                  inputMode='numeric'
                  autoComplete='cc-csc'
                  placeholder='CVC'
                  value={cvc}
                  onChange={(e) =>
                    setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))
                  }
                  error={errors.cvc}
                />
              </div>
            ) : (
              <p className='mt-5 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600'>
                You&apos;ll pay {formatMoney(totals.total)} in cash to the
                courier when your order is delivered.
              </p>
            )}
          </section>
          <div className='flex items-center justify-between'>
            <Link
              href='/checkout'
              className='text-xs font-semibold text-slate-500 hover:text-violet-700'>
              ← Back to details
            </Link>
            <button
              disabled={processing}
              className={primaryBtn}>
              {processing ? (
                <>
                  <Loader2
                    size={16}
                    className='animate-spin'
                  />{' '}
                  Processing…
                </>
              ) : (
                <>
                  <Lock size={15} />{' '}
                  {method === 'card'
                    ? `Pay ${formatMoney(totals.total)}`
                    : 'Place order'}
                </>
              )}
            </button>
          </div>
        </form>
        <OrderSummary
          items={cart}
          totals={totals}
          coupon={coupon}
        />
      </div>
    </div>
  );
}

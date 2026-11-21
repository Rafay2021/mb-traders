'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type FormEvent } from 'react';

import {
  Field,
  FieldShell,
  inputCls,
  primaryBtn,
} from '@/modules/auth/components/form-ui';
import { Address, useStore } from '@/provider/store-provider';
import { CheckoutSteps, OrderSummary } from './checkout-ui';

const COUNTRIES = [
  'Pakistan',
  'United States',
  'United Kingdom',
  'Canada',
  'United Arab Emirates',
  'Australia',
  'Germany',
];
const blank: Address = {
  fullName: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'Pakistan',
};

export function CheckoutPage() {
  const router = useRouter();
  const { ready, cart, totals, coupon, user, checkout, setCheckout } =
    useStore();
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState<Address>(blank);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const prefilled = useRef(false);

  useEffect(() => {
    if (!ready || prefilled.current) return;
    prefilled.current = true;
    if (checkout) {
      setEmail(checkout.email);
      setAddress(checkout.address);
    } else if (user) {
      setEmail(user.email);
      setAddress(
        user.address ?? {
          ...blank,
          fullName: user.name,
          phone: user.phone ?? '',
        },
      );
    }
  }, [ready, checkout, user]);

  useEffect(() => {
    if (ready && cart.length === 0) router.replace('/cart');
  }, [ready, cart.length, router]);

  if (!ready || cart.length === 0)
    return (
      <div className='container-shell py-24 text-center text-sm text-slate-500'>
        Loading checkout…
      </div>
    );

  const set = (key: keyof Address) => (e: { target: { value: string } }) =>
    setAddress((a) => ({ ...a, [key]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!/^\S+@\S+\.\S+$/.test(email))
      next.email = 'Enter a valid email address.';
    if (address.fullName.trim().length < 2)
      next.fullName = 'Enter your full name.';
    if (address.phone.replace(/\D/g, '').length < 7)
      next.phone = 'Enter a valid phone number.';
    if (address.line1.trim().length < 4)
      next.line1 = 'Enter your street address.';
    if (!address.city.trim()) next.city = 'Enter your city.';
    if (!address.state.trim()) next.state = 'Enter your state or province.';
    if (!address.postalCode.trim()) next.postalCode = 'Enter a postal code.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setCheckout({ email: email.trim(), address });
    router.push('/payment');
  };

  return (
    <div className='container-shell py-10'>
      <CheckoutSteps current={1} />
      <div className='grid gap-8 lg:grid-cols-[1fr_380px]'>
        <form
          onSubmit={submit}
          noValidate
          className='space-y-6'>
          <section className='rounded-2xl border border-slate-100 bg-white p-6'>
            <div className='mb-4 flex items-center justify-between'>
              <h2 className='text-base font-bold'>Contact</h2>
              {!user && (
                <Link
                  href='/login?next=/checkout'
                  className='text-xs font-semibold text-violet-700 hover:underline'>
                  Have an account? Sign in
                </Link>
              )}
            </div>
            <Field
              label='Email'
              type='email'
              autoComplete='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              placeholder='you@example.com'
            />
          </section>
          <section className='rounded-2xl border border-slate-100 bg-white p-6'>
            <h2 className='mb-4 text-base font-bold'>Shipping address</h2>
            <div className='grid gap-4 sm:grid-cols-2'>
              <Field
                label='Full name'
                autoComplete='name'
                value={address.fullName}
                onChange={set('fullName')}
                error={errors.fullName}
              />
              <Field
                label='Phone'
                type='tel'
                autoComplete='tel'
                value={address.phone}
                onChange={set('phone')}
                error={errors.phone}
              />
              <Field
                className='sm:col-span-2'
                label='Address'
                autoComplete='address-line1'
                value={address.line1}
                onChange={set('line1')}
                error={errors.line1}
              />
              <Field
                className='sm:col-span-2'
                label='Apartment, suite, etc. (optional)'
                autoComplete='address-line2'
                value={address.line2 ?? ''}
                onChange={set('line2')}
              />
              <Field
                label='City'
                autoComplete='address-level2'
                value={address.city}
                onChange={set('city')}
                error={errors.city}
              />
              <Field
                label='State / Province'
                autoComplete='address-level1'
                value={address.state}
                onChange={set('state')}
                error={errors.state}
              />
              <Field
                label='Postal code'
                autoComplete='postal-code'
                value={address.postalCode}
                onChange={set('postalCode')}
                error={errors.postalCode}
              />
              <FieldShell label='Country'>
                <select
                  value={address.country}
                  onChange={set('country')}
                  autoComplete='country-name'
                  className={inputCls}>
                  {COUNTRIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </FieldShell>
            </div>
          </section>
          <div className='flex items-center justify-between'>
            <Link
              href='/cart'
              className='text-xs font-semibold text-slate-500 hover:text-violet-700'>
              ← Back to bag
            </Link>
            <button className={primaryBtn}>Continue to payment</button>
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

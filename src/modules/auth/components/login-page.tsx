'use client';
import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { AuthShell } from './auth-shell';
import { Field, primaryBtn } from './form-ui';
import { useStore } from '@/provider/store-provider';

// Only allow same-site relative redirects.
const safeNext = (value: string | null) =>
  value && value.startsWith('/') && !value.startsWith('//')
    ? value
    : '/dashboard';

export function LoginPage() {
  const router = useRouter();
  const next = safeNext(useSearchParams().get('next'));
  const { ready, user, login } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (ready && user) router.replace(next);
  }, [ready, user, next, router]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const result = await login(email, password);
    if (!result.ok) {
      setError(result.error);
      setBusy(false);
    }
  };

  return (
    <AuthShell
      title='Welcome back'
      subtitle='Sign in to see your orders, wishlist and saved details.'
      footer={
        <>
          New to Morrow?{' '}
          <Link
            href={`/register?next=${encodeURIComponent(next)}`}
            className='font-semibold text-violet-700 hover:underline'>
            Create an account
          </Link>
        </>
      }>
      <form
        onSubmit={submit}
        className='space-y-4'>
        <Field
          label='Email'
          type='email'
          required
          autoComplete='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Field
          label='Password'
          type={show ? 'text' : 'password'}
          required
          autoComplete='current-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='flex items-center justify-between text-xs'>
          <label className='flex items-center gap-2 text-slate-600'>
            <input
              type='checkbox'
              checked={show}
              onChange={(e) => setShow(e.target.checked)}
              className='accent-violet-600'
            />{' '}
            Show password
          </label>
          <Link
            href='/forgot-password'
            className='font-semibold text-violet-700 hover:underline'>
            Forgot password?
          </Link>
        </div>
        {error && (
          <p
            role='alert'
            className='rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700'>
            {error}
          </p>
        )}
        <button
          disabled={busy}
          className={`${primaryBtn} w-full`}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </AuthShell>
  );
}

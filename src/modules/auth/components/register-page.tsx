'use client';
import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { Field, primaryBtn } from './form-ui';
import { useStore } from '@/provider/store-provider';
import { AuthShell } from './auth-shell';

const safeNext = (value: string | null) =>
  value && value.startsWith('/') && !value.startsWith('//')
    ? value
    : '/dashboard';

export function RegisterPage() {
  const router = useRouter();
  const next = safeNext(useSearchParams().get('next'));
  const { ready, user, register } = useStore();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (ready && user) router.replace(next);
  }, [ready, user, next, router]);

  const set = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = 'Enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      next.email = 'Enter a valid email address.';
    if (form.password.length < 8) next.password = 'Use at least 8 characters.';
    else if (!/\d/.test(form.password) || !/[a-zA-Z]/.test(form.password))
      next.password = 'Include both letters and numbers.';
    if (form.confirm !== form.password) next.confirm = "Passwords don't match.";
    if (!agree) next.agree = 'Please accept the terms to continue.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setBusy(true);
    const result = await register(form.name, form.email, form.password);
    if (!result.ok) {
      setErrors({ email: result.error });
      setBusy(false);
    }
  };

  return (
    <AuthShell
      title='Create your account'
      subtitle='Save your details and keep track of every order.'
      footer={
        <>
          Already have an account?{' '}
          <Link
            href={`/login?next=${encodeURIComponent(next)}`}
            className='font-semibold text-violet-700 hover:underline'>
            Sign in
          </Link>
        </>
      }>
      <form
        onSubmit={submit}
        noValidate
        className='space-y-4'>
        <Field
          label='Full name'
          autoComplete='name'
          value={form.name}
          onChange={set('name')}
          error={errors.name}
        />
        <Field
          label='Email'
          type='email'
          autoComplete='email'
          value={form.email}
          onChange={set('email')}
          error={errors.email}
        />
        <Field
          label='Password'
          type='password'
          autoComplete='new-password'
          value={form.password}
          onChange={set('password')}
          error={errors.password}
          hint='At least 8 characters, with letters and numbers.'
        />
        <Field
          label='Confirm password'
          type='password'
          autoComplete='new-password'
          value={form.confirm}
          onChange={set('confirm')}
          error={errors.confirm}
        />
        <div>
          <label className='flex items-start gap-2 text-xs text-slate-600'>
            <input
              type='checkbox'
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className='mt-0.5 accent-violet-600'
            />{' '}
            I agree to the Terms and Privacy Policy.
          </label>
          {errors.agree && (
            <p
              role='alert'
              className='mt-1.5 text-xs text-rose-600'>
              {errors.agree}
            </p>
          )}
        </div>
        <button
          disabled={busy}
          className={`${primaryBtn} w-full`}>
          {busy ? 'Creating account…' : 'Create account'}
        </button>
      </form>
    </AuthShell>
  );
}

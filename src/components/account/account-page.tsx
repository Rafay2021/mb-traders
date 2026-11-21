'use client';
import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  LogOut,
  MapPin,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import { Address, useRequireAuth, useStore } from '@/provider/store-provider';
import {
  Field,
  FieldShell,
  inputCls,
  primaryBtn,
  secondaryBtn,
} from '../../modules/auth/components/form-ui';

type Tab = 'profile' | 'address' | 'security';
const TABS: { id: Tab; label: string; icon: typeof UserRound }[] = [
  { id: 'profile', label: 'Profile', icon: UserRound },
  { id: 'address', label: 'Address', icon: MapPin },
  { id: 'security', label: 'Security', icon: ShieldCheck },
];
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

export function AccountPage() {
  const router = useRouter();
  const { ready, user } = useRequireAuth();
  const { updateProfile, changePassword, logout } = useStore();
  const [tab, setTab] = useState<Tab>('profile');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState<Address>(blank);
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' });
  const [notice, setNotice] = useState<{
    tone: 'ok' | 'error';
    text: string;
  } | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!user || loaded) return;
    setName(user.name);
    setPhone(user.phone ?? '');
    setAddress(
      user.address ?? {
        ...blank,
        fullName: user.name,
        phone: user.phone ?? '',
      },
    );
    setLoaded(true);
  }, [user, loaded]);

  if (!ready || !user)
    return (
      <div className='container-shell py-24 text-center text-sm text-slate-500'>
        Loading your account…
      </div>
    );

  const flash = (tone: 'ok' | 'error', text: string) => {
    setNotice({ tone, text });
    setTimeout(() => setNotice(null), 3500);
  };
  const setAddr = (key: keyof Address) => (e: { target: { value: string } }) =>
    setAddress((a) => ({ ...a, [key]: e.target.value }));

  const saveProfile = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2)
      return flash('error', 'Please enter your name.');
    updateProfile({ name: name.trim(), phone: phone.trim() });
    flash('ok', 'Profile updated.');
  };
  const saveAddress = (e: FormEvent) => {
    e.preventDefault();
    if (!address.line1.trim() || !address.city.trim())
      return flash('error', 'Address and city are required.');
    updateProfile({ address });
    flash('ok', 'Address saved. It will be pre-filled at checkout.');
  };
  const savePassword = async (e: FormEvent) => {
    e.preventDefault();
    if (pw.next.length < 8 || !/\d/.test(pw.next) || !/[a-zA-Z]/.test(pw.next))
      return flash(
        'error',
        'New password needs 8+ characters with letters and numbers.',
      );
    if (pw.next !== pw.confirm)
      return flash('error', "New passwords don't match.");
    const result = await changePassword(pw.current, pw.next);
    if (result.ok) {
      setPw({ current: '', next: '', confirm: '' });
      flash('ok', 'Password changed.');
    } else flash('error', result.error);
  };

  return (
    <div className='container-shell py-10'>
      <div className='mb-8 flex flex-wrap items-center justify-between gap-4'>
        <div className='flex items-center gap-4'>
          <span className='grid h-14 w-14 place-items-center rounded-full bg-violet-600 text-xl font-bold text-white'>
            {user.name.charAt(0).toUpperCase()}
          </span>
          <div>
            <h1 className='text-2xl font-black tracking-tight'>{user.name}</h1>
            <p className='text-sm text-slate-500'>
              {user.email} · Member since{' '}
              {new Date(user.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
        <div className='flex gap-2'>
          <Link
            href='/dashboard'
            className={secondaryBtn}>
            <LayoutDashboard size={16} /> Dashboard
          </Link>
          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
            className={secondaryBtn}>
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </div>

      <div className='grid gap-8 lg:grid-cols-[220px_1fr]'>
        <nav
          aria-label='Account sections'
          className='flex gap-2 overflow-x-auto lg:flex-col'>
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              aria-current={tab === id}
              className={`flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-semibold transition ${tab === id ? 'bg-violet-50 text-violet-700' : 'text-slate-600 hover:bg-white'}`}>
              <Icon size={17} /> {label}
            </button>
          ))}
        </nav>

        <div className='rounded-2xl border border-slate-100 bg-white p-6 sm:p-8'>
          {notice && (
            <p
              role='status'
              className={`mb-6 rounded-xl px-4 py-3 text-sm ${notice.tone === 'ok' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
              {notice.text}
            </p>
          )}

          {tab === 'profile' && (
            <form
              onSubmit={saveProfile}
              className='max-w-lg space-y-4'>
              <h2 className='text-lg font-bold'>Personal details</h2>
              <Field
                label='Full name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete='name'
              />
              <Field
                label='Email'
                value={user.email}
                readOnly
                disabled
                hint="Email can't be changed in this demo."
              />
              <Field
                label='Phone'
                type='tel'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete='tel'
              />
              <button className={primaryBtn}>Save changes</button>
            </form>
          )}

          {tab === 'address' && (
            <form
              onSubmit={saveAddress}
              className='max-w-xl space-y-4'>
              <h2 className='text-lg font-bold'>Default shipping address</h2>
              <div className='grid gap-4 sm:grid-cols-2'>
                <Field
                  label='Full name'
                  value={address.fullName}
                  onChange={setAddr('fullName')}
                />
                <Field
                  label='Phone'
                  type='tel'
                  value={address.phone}
                  onChange={setAddr('phone')}
                />
                <Field
                  className='sm:col-span-2'
                  label='Address'
                  value={address.line1}
                  onChange={setAddr('line1')}
                />
                <Field
                  className='sm:col-span-2'
                  label='Apartment, suite, etc. (optional)'
                  value={address.line2 ?? ''}
                  onChange={setAddr('line2')}
                />
                <Field
                  label='City'
                  value={address.city}
                  onChange={setAddr('city')}
                />
                <Field
                  label='State / Province'
                  value={address.state}
                  onChange={setAddr('state')}
                />
                <Field
                  label='Postal code'
                  value={address.postalCode}
                  onChange={setAddr('postalCode')}
                />
                <FieldShell label='Country'>
                  <select
                    value={address.country}
                    onChange={setAddr('country')}
                    className={inputCls}>
                    {COUNTRIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </FieldShell>
              </div>
              <button className={primaryBtn}>Save address</button>
            </form>
          )}

          {tab === 'security' && (
            <form
              onSubmit={savePassword}
              className='max-w-lg space-y-4'>
              <h2 className='text-lg font-bold'>Change password</h2>
              <Field
                label='Current password'
                type='password'
                autoComplete='current-password'
                value={pw.current}
                onChange={(e) => setPw({ ...pw, current: e.target.value })}
                required
              />
              <Field
                label='New password'
                type='password'
                autoComplete='new-password'
                value={pw.next}
                onChange={(e) => setPw({ ...pw, next: e.target.value })}
                required
                hint='At least 8 characters, with letters and numbers.'
              />
              <Field
                label='Confirm new password'
                type='password'
                autoComplete='new-password'
                value={pw.confirm}
                onChange={(e) => setPw({ ...pw, confirm: e.target.value })}
                required
              />
              <button className={primaryBtn}>Update password</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

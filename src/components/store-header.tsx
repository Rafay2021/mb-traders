'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  ShoppingBag,
  UserRound,
  Menu,
  X,
  Heart,
  LayoutDashboard,
  Settings,
  LogOut,
} from 'lucide-react';

import { SearchBox } from './search-box';
import { useStore } from '@/provider/store-provider';

export function StoreHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const { cartCount, wishlist, user, logout } = useStore();

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!accountRef.current?.contains(e.target as Node))
        setAccountOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const badge = (n: number) =>
    n > 0 && (
      <span className='absolute right-1 top-1 h-4 min-w-4 rounded-full bg-violet-600 px-1 text-center text-[9px] leading-4 text-white'>
        {n > 99 ? '99+' : n}
      </span>
    );
  const menuItem =
    'flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50';

  return (
    <>
      <div className='bg-[#24233a] text-white text-center text-xs py-2 tracking-wide'>
        A little something extra — enjoy 15% off your first order with WELCOME15
      </div>
      <header className='sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl'>
        <div className='container-shell flex h-[76px] items-center gap-8'>
          <button
            className='md:hidden p-2'
            aria-label='Open menu'
            onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <Link
            href='/'
            className='text-[27px] font-black tracking-[-1.8px] text-slate-900'>
            morrow<span className='text-violet-600'>.</span>
          </Link>
          <nav className='hidden md:flex items-center gap-7 text-sm font-medium text-slate-600'>
            <Link
              className='hover:text-violet-600 transition'
              href='/products'>
              Shop all
            </Link>
            <Link
              className='hover:text-violet-600 transition'
              href='/products?category=Electronics'>
              Tech
            </Link>
            <Link
              className='hover:text-violet-600 transition'
              href='/products?category=Fashion'>
              Style
            </Link>
            <Link
              className='hover:text-violet-600 transition'
              href='/products?category=Home%20%26%20Living'>
              Home
            </Link>
            <Link
              className='text-violet-600 hover:text-violet-700 transition'
              href='/products?sort=newest'>
              New arrivals
            </Link>
          </nav>
          <SearchBox className='ml-auto hidden w-full max-w-[340px] lg:block' />
          <div className='ml-auto lg:ml-0 flex items-center gap-2 text-slate-700'>
            <Link
              href='/wishlist'
              className='relative hidden rounded-full p-2.5 hover:bg-slate-100 sm:block'
              aria-label='Wishlist'>
              <Heart size={19} />
              {badge(wishlist.length)}
            </Link>
            <div
              ref={accountRef}
              className='relative hidden sm:block'>
              <button
                onClick={() => setAccountOpen((o) => !o)}
                className='rounded-full p-2.5 hover:bg-slate-100'
                aria-label='Account'
                aria-expanded={accountOpen}>
                {user ? (
                  <span className='grid h-[19px] w-[19px] place-items-center rounded-full bg-violet-600 text-[10px] font-bold text-white'>
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <UserRound size={19} />
                )}
              </button>
              {accountOpen && (
                <div
                  className='absolute right-0 top-[calc(100%+8px)] w-56 overflow-hidden rounded-2xl border border-slate-100 bg-white py-1 shadow-2xl'
                  onClick={() => setAccountOpen(false)}>
                  {user ? (
                    <>
                      <div className='border-b border-slate-100 px-4 py-3'>
                        <p className='truncate text-sm font-semibold'>
                          {user.name}
                        </p>
                        <p className='truncate text-xs text-slate-400'>
                          {user.email}
                        </p>
                      </div>
                      <Link
                        href='/dashboard'
                        className={menuItem}>
                        <LayoutDashboard size={16} /> Dashboard
                      </Link>
                      <Link
                        href='/account'
                        className={menuItem}>
                        <Settings size={16} /> Profile & account
                      </Link>
                      <Link
                        href='/wishlist'
                        className={menuItem}>
                        <Heart size={16} /> Wishlist
                      </Link>
                      <button
                        onClick={logout}
                        className={`${menuItem} w-full text-left`}>
                        <LogOut size={16} /> Sign out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href='/login'
                        className={menuItem}>
                        Sign in
                      </Link>
                      <Link
                        href='/register'
                        className={menuItem}>
                        Create account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
            <Link
              href='/cart'
              className='relative rounded-full p-2.5 hover:bg-slate-100'
              aria-label={`Shopping bag, ${cartCount} items`}>
              <ShoppingBag size={20} />
              {badge(cartCount)}
            </Link>
          </div>
        </div>
        {menuOpen && (
          <div className='md:hidden flex flex-col gap-4 border-t bg-white px-5 py-4 text-sm'>
            <SearchBox
              placeholder='Search products'
              onNavigate={() => setMenuOpen(false)}
            />
            <Link
              onClick={() => setMenuOpen(false)}
              href='/products'>
              Shop all
            </Link>
            <Link
              onClick={() => setMenuOpen(false)}
              href='/products?category=Electronics'>
              Tech
            </Link>
            <Link
              onClick={() => setMenuOpen(false)}
              href='/products?category=Fashion'>
              Style
            </Link>
            <Link
              onClick={() => setMenuOpen(false)}
              href='/products?category=Home%20%26%20Living'>
              Home
            </Link>
            <Link
              onClick={() => setMenuOpen(false)}
              href='/wishlist'>
              Wishlist{wishlist.length ? ` (${wishlist.length})` : ''}
            </Link>
            {user ? (
              <>
                <Link
                  onClick={() => setMenuOpen(false)}
                  href='/dashboard'>
                  Dashboard
                </Link>
                <Link
                  onClick={() => setMenuOpen(false)}
                  href='/account'>
                  Profile & account
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className='text-left'>
                  Sign out
                </button>
              </>
            ) : (
              <Link
                onClick={() => setMenuOpen(false)}
                href='/login'>
                Sign in / Register
              </Link>
            )}
          </div>
        )}
      </header>
    </>
  );
}

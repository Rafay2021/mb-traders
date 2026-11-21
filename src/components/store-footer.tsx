import Link from 'next/link';
import { BsTwitter } from 'react-icons/bs';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { ArrowUpRight } from 'lucide-react';
export function StoreFooter() {
  return (
    <footer className='mt-24 bg-[#222238] text-white'>
      <div className='container-shell grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]'>
        <div>
          <Link
            href='/'
            className='text-3xl font-black tracking-tight'>
            morrow<span className='text-violet-400'>.</span>
          </Link>
          <p className='mt-4 max-w-xs text-sm leading-6 text-slate-300'>
            Good things for everyday living. Thoughtfully selected, made to be
            loved and used.
          </p>
          <div className='mt-6 flex gap-3 text-slate-300'>
            <FaInstagram size={18} />
            <FaFacebook size={18} />
            <BsTwitter size={18} />
          </div>
        </div>
        <div>
          <h3 className='font-semibold'>Explore</h3>
          <div className='mt-5 flex flex-col gap-3 text-sm text-slate-300'>
            <Link href='/products'>Shop all</Link>
            <Link href='/products?sort=newest'>New arrivals</Link>
            <Link href='/products?category=Fashion'>Style</Link>
            <Link href='/products?category=Home%20%26%20Living'>Home</Link>
          </div>
        </div>
        <div>
          <h3 className='font-semibold'>Help</h3>
          <div className='mt-5 flex flex-col gap-3 text-sm text-slate-300'>
            <a href='#'>Contact us</a>
            <a href='#'>Shipping & returns</a>
            <a href='#'>FAQs</a>
            <a href='#'>Track an order</a>
          </div>
        </div>
        <div>
          <h3 className='font-semibold'>Stay in the loop</h3>
          <p className='mt-3 text-sm leading-6 text-slate-300'>
            Fresh finds and thoughtful updates, straight to your inbox.
          </p>
          <form className='mt-4 flex border-b border-slate-500 pb-2'>
            <input
              type='email'
              required
              placeholder='Your email address'
              className='min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400'
            />
            <button aria-label='Subscribe'>
              <ArrowUpRight size={19} />
            </button>
          </form>
        </div>
      </div>
      <div className='container-shell flex flex-col justify-between gap-3 border-t border-white/10 py-5 text-xs text-slate-400 sm:flex-row'>
        <span>© 2026 Morrow Store. All rights reserved.</span>
        <span>Privacy · Terms · Cookies</span>
      </div>
    </footer>
  );
}

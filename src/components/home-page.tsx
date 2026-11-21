'use client';
import { categories, products } from '@/lib/products';
import { ProductCarousel } from '@/modules/products/components/product-carousel';
import {
  ArrowRight,
  ArrowUpRight,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Truck,
} from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

const categoryImages: Record<string, string> = {
  Electronics: 'photo-1498049794561-7780e7231661',
  Fashion: 'photo-1483985988355-763728e1935b',
  'Home & Living': 'photo-1600210492486-724fe5c67fb0',
  Beauty: 'photo-1596462502278-27bfdc403348',
  Accessories: 'photo-1523275335684-37898b6baf30',
  Sports: 'photo-1517836357463-d25dfeac3438',
};
export function HomePage() {
  const featured = products.filter((p) => p.featured);
  return (
    <div>
      <section className='container-shell pt-6'>
        <div className='relative min-h-[490px] overflow-hidden rounded-[30px] bg-[#e8e7ff] sm:min-h-[540px]'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(255,255,255,.85),transparent_38%),linear-gradient(115deg,#e8e7ff_0%,#f4e9f2_55%,#fbe9dd_100%)]' />
          <div className='absolute -right-8 top-8 h-[420px] w-[420px] rounded-full border border-white/70 sm:right-16 sm:top-12 sm:h-[470px] sm:w-[470px]' />
          <div className='absolute right-5 top-10 h-[360px] w-[360px] overflow-hidden rounded-full bg-white/50 sm:right-28 sm:top-20 sm:h-[390px] sm:w-[390px]'>
            <Image
              src='https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=90'
              alt='Curated lifestyle collection'
              fill
              priority
              sizes='(min-width:640px) 390px, 360px'
              className='object-cover mix-blend-multiply opacity-90'
            />
          </div>
          <div className='relative z-10 flex min-h-[490px] max-w-xl flex-col justify-center px-7 py-14 sm:min-h-[540px] sm:px-16'>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='mb-5 flex w-fit items-center gap-2 rounded-full border border-white/80 bg-white/65 px-3 py-2 text-[10px] font-bold uppercase tracking-[.17em] text-violet-800'>
              <Sparkles size={13} /> The good things edit
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className='max-w-[520px] text-5xl font-black leading-[.99] tracking-[-.055em] text-[#22213b] sm:text-7xl'>
              Make room for <span className='text-violet-600'>better</span>{' '}
              things.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className='mt-6 max-w-sm text-sm leading-6 text-slate-600 sm:text-base'>
              Everyday essentials, standout details and little upgrades that
              make a difference.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className='mt-8 flex flex-wrap gap-3'>
              <Link
                href='/products'
                className='inline-flex items-center gap-3 rounded-full bg-[#24233a] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-700'>
                Explore collection <ArrowRight size={16} />
              </Link>
              <Link
                href='/products?sort=newest'
                className='inline-flex items-center gap-2 rounded-full border border-white bg-white/65 px-6 py-3.5 text-sm font-semibold text-slate-800 hover:bg-white'>
                What's new
              </Link>
            </motion.div>
            <p className='mt-10 text-[10px] font-semibold uppercase tracking-[.16em] text-slate-500'>
              Thoughtful finds. Everyday joy.
            </p>
          </div>
          <div className='absolute bottom-7 right-8 hidden rounded-2xl border border-white/80 bg-white/70 p-4 shadow-lg backdrop-blur sm:block'>
            <p className='text-[10px] font-bold uppercase tracking-widest text-violet-700'>
              Curated for you
            </p>
            <p className='mt-1 text-sm font-semibold text-slate-800'>
              The everyday edit · 2026
            </p>
          </div>
        </div>
      </section>
      <section className='container-shell grid grid-cols-2 gap-3 py-8 sm:grid-cols-4'>
        {[
          { icon: Truck, title: 'Free shipping', sub: 'On orders over $75' },
          {
            icon: ShieldCheck,
            title: 'Secure checkout',
            sub: 'Protected payments',
          },
          {
            icon: RefreshCw,
            title: 'Easy returns',
            sub: '30-day return window',
          },
          {
            icon: Sparkles,
            title: 'Curated quality',
            sub: 'Picked with purpose',
          },
        ].map(({ icon: Icon, title, sub }) => (
          <div
            key={title}
            className='flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3.5 sm:p-4'>
            <div className='grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet-700'>
              <Icon size={17} />
            </div>
            <div>
              <p className='text-xs font-bold text-slate-800'>{title}</p>
              <p className='mt-1 text-[10px] text-slate-500'>{sub}</p>
            </div>
          </div>
        ))}
      </section>
      <section className='container-shell py-10'>
        <div className='mb-6 flex items-end justify-between'>
          <div>
            <p className='text-[10px] font-bold uppercase tracking-[.2em] text-violet-600'>
              A world of good things
            </p>
            <h2 className='mt-2 text-2xl font-bold tracking-tight sm:text-3xl'>
              Find your kind of thing.
            </h2>
          </div>
          <Link
            href='/products'
            className='hidden items-center gap-1 text-xs font-semibold sm:flex'>
            All categories <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6'>
          {categories.map((category, i) => (
            <Link
              key={category}
              href={`/products?category=${encodeURIComponent(category)}`}
              className='group relative aspect-[1/1.08] overflow-hidden rounded-2xl bg-slate-200'>
              <Image
                src={`https://images.unsplash.com/${categoryImages[category]}?auto=format&fit=crop&w=500&q=80`}
                alt={category}
                fill
                sizes='(min-width:1024px) 16vw, (min-width:640px) 33vw, 50vw'
                className='object-cover transition duration-700 group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent' />
              <div className='absolute inset-x-3 bottom-3 flex items-center justify-between text-white'>
                <span className='text-sm font-semibold'>{category}</span>
                <span className='grid h-7 w-7 place-items-center rounded-full bg-white/20 backdrop-blur'>
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <div className='mt-8 bg-[#eeedff] py-4'>
        <ProductCarousel
          title="A few things you'll love"
          subtitle='The current favorites'
          items={featured}
          href='/products?sort=featured'
        />
      </div>
      {categories.map((category, i) => (
        <ProductCarousel
          key={category}
          title={category}
          subtitle={
            [
              'Explore the latest',
              'A little style inspiration',
              'Make home feel like you',
              'Your daily essentials',
              'The finishing touches',
              'Move your way',
            ][i]
          }
          items={products.filter((p) => p.category === category)}
          href={`/products?category=${encodeURIComponent(category)}`}
        />
      ))}
      <section className='container-shell mt-6'>
        <div className='relative overflow-hidden rounded-[28px] bg-[#24233a] px-7 py-12 text-white sm:px-14 sm:py-16'>
          <div className='absolute -right-10 -top-28 h-80 w-80 rounded-full border-[50px] border-violet-400/20' />
          <div className='relative max-w-xl'>
            <p className='text-[10px] font-bold uppercase tracking-[.2em] text-violet-300'>
              A better kind of inbox
            </p>
            <h2 className='mt-3 text-3xl font-bold tracking-tight sm:text-4xl'>
              Good finds, good timing.
            </h2>
            <p className='mt-3 text-sm leading-6 text-slate-300'>
              Sign up for first looks, fresh arrivals and a little treat on your
              first order.
            </p>
            <form className='mt-6 flex max-w-md rounded-full bg-white p-1.5'>
              <input
                type='email'
                required
                placeholder='Email address'
                className='min-w-0 flex-1 bg-transparent px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400'
              />
              <button className='rounded-full bg-violet-600 px-5 py-3 text-xs font-semibold text-white hover:bg-violet-500'>
                Sign me up
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

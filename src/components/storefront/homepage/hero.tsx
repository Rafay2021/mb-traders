import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className='container-shell pt-6'>
      <div className='relative min-h-122.5 overflow-hidden rounded-4xl sm:min-h-135'>
        <div
          className={
            'absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(255,255,255,.85),transparent_38%),linear-gradient(115deg,#e8e7ff_0%,#f4e9f2_55%,#fbe9dd_100%)]'
          }
        />
        <div className='absolute -right-8 top-8 h-105 w-105 rounded-full border border-white/70 sm:right-16 sm:top-12 sm:h-117.5 sm:w-117.5' />
        <div className='absolute right-5 top-10 h-90 w-90 overflow-hidden rounded-full bg-white/50 sm:right-28 sm:top-20 sm:h-97.5 sm:w-97.5'>
          <Image
            src='https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=90'
            alt='Curated lifestyle collection'
            className='h-full w-full object-cover mix-blend-multiply opacity-90'
            width={1000}
            height={1000}
          />
        </div>
        <div className='relative z-10 flex min-h-122.5 max-w-xl flex-col justify-center px-7 py-14 sm:min-h-135 sm:px-16'>
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
            className='max-w-130 text-5xl font-black leading-[.99] tracking-[-.055em] text-black sm:text-7xl'>
            Make room for <span className='text-violet-600'>better</span>{' '}
            things.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className='mt-6 max-w-sm text-sm leading-6 text-slate-600 sm:text-base'>
            Everyday essentials, standout details and little upgrades that make
            a difference.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className='mt-8 flex flex-wrap gap-3'>
            <motion.span
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}>
              <Button
                className='p-6'
                nativeButton={false}
                size='default'
                render={
                  <Link
                    href='/all-products'
                    className=' '>
                    Explore collection <ArrowRight size={16} />
                  </Link>
                }
              />
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}>
              <Button
                className='p-6'
                nativeButton={false}
                size='default'
                variant='secondary'
                render={
                  <Link
                    href='/products?sort=newest'
                    className=' '>
                    What&apos;s new
                  </Link>
                }
              />
            </motion.span>
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
    </motion.section>
  );
}

'use client';
import type { Product } from '@/lib/products';
import { formatPrice, products } from '@/lib/products';
import {
  ArrowLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { ProductCarousel } from './product-carousel';
import { useStore } from '@/provider/store-provider';

export function ProductDetailPage({ product }: { product: Product }) {
  const { addToCart, isWished, toggleWishlist } = useStore();
  const [image, setImage] = useState(0),
    [color, setColor] = useState(product.colors[0]),
    [quantity, setQuantity] = useState(1),
    [added, setAdded] = useState(false);
  const liked = isWished(product.id);
  const related = products.filter(
    (p) => p.category === product.category && p.id !== product.id,
  );
  return (
    <div className='container-shell py-8'>
      <div className='mb-7 flex items-center gap-2 text-xs text-slate-400'>
        <Link
          href='/'
          className='hover:text-violet-700'>
          Home
        </Link>
        <ChevronRight size={13} />
        <Link
          href='/products'
          className='hover:text-violet-700'>
          Products
        </Link>
        <ChevronRight size={13} />
        <span className='text-slate-700'>{product.name}</span>
      </div>
      <div className='grid gap-10 lg:grid-cols-2 lg:gap-16'>
        <div className='grid gap-3 sm:grid-cols-[82px_1fr]'>
          <div className='order-2 flex gap-3 overflow-x-auto sm:order-1 sm:flex-col'>
            {product.images.map((src, i) => (
              <button
                key={src + i}
                onClick={() => setImage(i)}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 ${image === i ? 'border-violet-600' : 'border-transparent'}`}>
                <Image
                  src={src}
                  alt={`${product.name} view ${i + 1}`}
                  fill
                  sizes='80px'
                  className='object-cover'
                />
              </button>
            ))}
          </div>
          <motion.div
            key={image}
            initial={{ opacity: 0.65, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className='relative order-1 aspect-[4/4.6] overflow-hidden rounded-[26px] bg-slate-100 sm:order-2'>
            <Image
              src={product.images[image]}
              alt={product.name}
              fill
              priority
              sizes='(min-width:1024px) 45vw, 100vw'
              className='object-cover'
            />
          </motion.div>
        </div>
        <div className='flex flex-col py-2'>
          <Link
            href='/products'
            className='mb-7 flex w-fit items-center gap-2 text-xs font-medium text-slate-400 hover:text-violet-700'>
            <ArrowLeft size={14} /> Back to collection
          </Link>
          <p className='text-[10px] font-bold uppercase tracking-[.2em] text-violet-600'>
            {product.brand} · {product.category}
          </p>
          <h1 className='mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl'>
            {product.name}
          </h1>
          <div className='mt-4 flex items-center gap-3'>
            <span className='flex items-center gap-1 text-sm font-semibold'>
              <Star
                size={15}
                className='fill-amber-400 text-amber-400'
              />
              {product.rating}
            </span>
            <span className='text-xs text-slate-400'>
              {product.reviews} reviews
            </span>
            <span className='h-1 w-1 rounded-full bg-slate-300' />
            <span
              className={`text-xs font-medium ${product.stock > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              {product.stock > 0 ? 'In stock' : 'Out of stock'}
            </span>
          </div>
          <div className='mt-6 flex items-baseline gap-3'>
            <span className='text-3xl font-bold'>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <>
                <span className='text-base text-slate-400 line-through'>
                  {formatPrice(product.originalPrice)}
                </span>
                <span className='rounded-full bg-rose-50 px-2.5 py-1 text-[10px] font-bold text-rose-600'>
                  SAVE{' '}
                  {Math.round(
                    (1 - product.price / product.originalPrice) * 100,
                  )}
                  %
                </span>
              </>
            )}
          </div>
          <p className='mt-6 max-w-lg text-sm leading-7 text-slate-500'>
            {product.description}
          </p>
          <div className='mt-8 border-t border-slate-100 pt-6'>
            <div className='flex items-center justify-between'>
              <h3 className='text-sm font-bold'>Choose option</h3>
              <span className='text-xs text-slate-400'>{color}</span>
            </div>
            <div className='mt-3 flex flex-wrap gap-2'>
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition ${color === c ? 'border-violet-600 bg-violet-50 text-violet-700' : 'border-slate-200 text-slate-600 hover:border-slate-400'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className='mt-7 flex flex-wrap gap-3'>
            <div className='flex items-center rounded-full border border-slate-200'>
              <button
                aria-label='Decrease quantity'
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className='px-4 py-3 text-slate-500'>
                <Minus size={14} />
              </button>
              <span className='min-w-7 text-center text-sm font-semibold'>
                {quantity}
              </span>
              <button
                aria-label='Increase quantity'
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className='px-4 py-3 text-slate-500'>
                <Plus size={14} />
              </button>
            </div>
            <button
              disabled={product.stock === 0}
              onClick={() => {
                addToCart(product, color, quantity);
                setAdded(true);
                setTimeout(() => setAdded(false), 1600);
              }}
              className='flex flex-1 items-center justify-center gap-2 rounded-full bg-[#24233a] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:opacity-50'>
              <ShoppingBag size={17} />
              {added
                ? 'Added to bag'
                : `Add to bag · ${formatPrice(product.price * quantity)}`}
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              aria-pressed={liked}
              aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
              className={`grid h-12 w-12 place-items-center rounded-full border border-slate-200 ${liked ? 'text-rose-500' : 'text-slate-600'}`}>
              <Heart
                size={19}
                fill={liked ? 'currentColor' : 'none'}
              />
            </button>
          </div>
          {added && (
            <Link
              href='/cart'
              className='mt-3 w-fit text-xs font-semibold text-violet-700 hover:underline'>
              View bag →
            </Link>
          )}
          <div className='mt-8 space-y-4 rounded-2xl bg-white p-5'>
            <div className='flex items-center gap-3'>
              <Truck
                size={18}
                className='text-violet-600'
              />
              <div>
                <p className='text-xs font-semibold'>Complimentary shipping</p>
                <p className='mt-1 text-[11px] text-slate-400'>
                  On orders over $75 · Delivery in 3–5 business days
                </p>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <ShieldCheck
                size={18}
                className='text-violet-600'
              />
              <div>
                <p className='text-xs font-semibold'>Shopping made simple</p>
                <p className='mt-1 text-[11px] text-slate-400'>
                  Secure checkout and easy 30-day returns
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className='mt-20 border-t border-slate-200 pt-10'>
        <p className='text-[10px] font-bold uppercase tracking-[.2em] text-violet-600'>
          Product details
        </p>
        <h2 className='mt-2 text-2xl font-bold'>Made for everyday.</h2>
        <p className='mt-4 max-w-2xl text-sm leading-7 text-slate-500'>
          {product.description} Designed with versatility and long-term use in
          mind. Select your preferred option and add it to your bag.
        </p>
      </section>
      {related.length > 0 && (
        <ProductCarousel
          title='More to explore'
          subtitle='You might also like'
          items={related}
        />
      )}
    </div>
  );
}

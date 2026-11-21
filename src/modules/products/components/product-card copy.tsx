'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, Star, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/lib/products';
import { formatPrice } from '@/lib/products';
import { useStore } from '@/provider/store-provider';

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { isWished, toggleWishlist, addToCart } = useStore();
  const liked = isWished(product.id);
  const [added, setAdded] = useState(false);
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.42, delay: Math.min(index * 0.045, 0.2) }}
      whileHover={{ y: -5 }}
      className='product-card group min-w-0'>
      <div className='relative overflow-hidden rounded-[20px] bg-[#edf0f6]'>
        <Link
          href={`/products/${product.slug}`}
          className='relative block aspect-[4/4.55] overflow-hidden'>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes='(min-width:1280px) 22vw, (min-width:640px) 30vw, 50vw'
            className='product-image object-cover'
          />
        </Link>
        {product.badge && (
          <span className='absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-700 shadow-sm'>
            {product.badge}
          </span>
        )}
        <button
          onClick={() => toggleWishlist(product)}
          aria-pressed={liked}
          aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-sm transition hover:scale-110 ${liked ? 'text-rose-500' : 'text-slate-600'}`}>
          <Heart
            size={17}
            fill={liked ? 'currentColor' : 'none'}
          />
        </button>
        <div className='absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'>
          <button
            disabled={product.stock === 0}
            onClick={() => {
              addToCart(product);
              setAdded(true);
              setTimeout(() => setAdded(false), 1300);
            }}
            className='flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 py-3 text-xs font-semibold text-white shadow-lg transition hover:bg-violet-700 disabled:opacity-50'>
            <ShoppingBag size={15} />
            {added ? 'Added to bag' : 'Add to bag'}
          </button>
        </div>
        <Link
          href={`/products/${product.slug}`}
          aria-label={`View ${product.name}`}
          className='absolute bottom-3 right-3 hidden h-9 w-9 items-center justify-center rounded-full bg-white text-slate-800 shadow group-hover:hidden'>
          <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className='pt-3.5'>
        <div className='flex items-center justify-between gap-2'>
          <span className='text-[10px] font-bold uppercase tracking-[.14em] text-slate-400'>
            {product.category}
          </span>
          <span className='flex items-center gap-1 text-[11px] text-slate-500'>
            <Star
              size={12}
              className='fill-amber-400 text-amber-400'
            />
            {product.rating}
          </span>
        </div>
        <Link
          href={`/products/${product.slug}`}
          className='mt-1.5 block truncate text-sm font-semibold text-slate-800 transition hover:text-violet-700'>
          {product.name}
        </Link>
        <div className='mt-2 flex items-center gap-2'>
          <span className='text-sm font-bold'>
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className='text-xs text-slate-400 line-through'>
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

'use client';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '@/provider/store-provider';
import { EmptyState } from '@/modules/cart/components/checkout-ui';
import { ProductCard } from '@/modules/products/components/product-card';
import { primaryBtn, secondaryBtn } from '@/modules/auth/components/form-ui';

export function WishlistPage() {
  const { ready, wishlist, addToCart, clearWishlist } = useStore();
  if (!ready)
    return (
      <div className='container-shell py-24 text-center text-sm text-slate-500'>
        Loading your wishlist…
      </div>
    );
  return (
    <div className='container-shell py-10'>
      <div className='mb-8 flex flex-wrap items-end justify-between gap-4'>
        <div>
          <p className='text-[10px] font-bold uppercase tracking-[.2em] text-violet-600'>
            Saved for later
          </p>
          <h1 className='mt-2 text-3xl font-black tracking-tight'>
            Wishlist{' '}
            <span className='text-lg font-semibold text-slate-400'>
              ({wishlist.length})
            </span>
          </h1>
        </div>
        {wishlist.length > 0 && (
          <div className='flex gap-2'>
            <button
              onClick={() =>
                wishlist.filter((p) => p.stock > 0).forEach((p) => addToCart(p))
              }
              className={primaryBtn}>
              <ShoppingBag size={16} /> Add all to bag
            </button>
            <button
              onClick={clearWishlist}
              className={secondaryBtn}>
              Clear
            </button>
          </div>
        )}
      </div>
      {wishlist.length ? (
        <div className='grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 xl:grid-cols-4'>
          {wishlist.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Heart size={24} />}
          title='Nothing saved yet'
          text='Tap the heart on any product to keep it here.'
          href='/products'
          cta='Browse products'
        />
      )}
      {wishlist.length > 0 && (
        <Link
          href='/cart'
          className='mt-10 inline-block text-xs font-semibold text-violet-700 hover:underline'>
          Go to bag →
        </Link>
      )}
    </div>
  );
}

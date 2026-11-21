'use client';
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader2, Search } from 'lucide-react';
import { formatPrice } from '@/lib/products';
import { useProductSearch } from '@/hooks/use-product-search';

export function SearchBox({
  className = '',
  placeholder = 'Search for anything...',
  onNavigate,
}: {
  className?: string;
  placeholder?: string;
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { results, loading } = useProductSearch(query, { limit: 6 });
  const trimmed = query.trim();

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const done = () => {
    setOpen(false);
    setActive(-1);
    onNavigate?.();
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (active >= 0 && results[active])
      router.push(`/products/${results[active].slug}`);
    else if (trimmed) router.push(`/products?q=${encodeURIComponent(trimmed)}`);
    done();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(results.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(-1, i - 1));
    } else if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div
      ref={wrapRef}
      className={`relative ${className}`}>
      <form
        onSubmit={submit}
        role='search'
        className='flex items-center rounded-full bg-slate-100 px-4 py-2.5 focus-within:ring-4 focus-within:ring-violet-100'>
        <Search
          size={17}
          className='shrink-0 text-slate-400'
        />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-label='Search products'
          autoComplete='off'
          className='ml-2 w-full bg-transparent text-sm outline-none placeholder:text-slate-400'
        />
        <button
          aria-label='Search'
          type='submit'>
          {loading ? (
            <Loader2
              size={16}
              className='animate-spin text-slate-400'
            />
          ) : (
            <ArrowRight
              size={16}
              className='text-slate-400'
            />
          )}
        </button>
      </form>

      {open && trimmed && (
        <div className='absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl'>
          {results.length ? (
            <>
              <ul>
                {results.map((p, i) => (
                  <li key={p.id}>
                    <Link
                      href={`/products/${p.slug}`}
                      onClick={done}
                      className={`flex items-center gap-3 px-3 py-2.5 transition hover:bg-slate-50 ${i === active ? 'bg-slate-50' : ''}`}>
                      <span className='relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-slate-100'>
                        <Image
                          src={p.image}
                          alt=''
                          fill
                          sizes='44px'
                          className='object-cover'
                        />
                      </span>
                      <span className='min-w-0 flex-1'>
                        <span className='block truncate text-sm font-semibold text-slate-800'>
                          {p.name}
                        </span>
                        <span className='block text-[11px] text-slate-400'>
                          {p.brand} · {p.category}
                        </span>
                      </span>
                      <span className='text-sm font-bold text-slate-800'>
                        {formatPrice(p.price)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`/products?q=${encodeURIComponent(trimmed)}`}
                onClick={done}
                className='flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs font-semibold text-violet-700 hover:bg-violet-50'>
                See all results for “{trimmed}” <ArrowRight size={14} />
              </Link>
            </>
          ) : (
            <p className='px-4 py-6 text-center text-sm text-slate-500'>
              {loading ? 'Searching…' : `No products match “${trimmed}”.`}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

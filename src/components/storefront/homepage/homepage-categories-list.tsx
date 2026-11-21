import { categories } from '@/lib/products';
import { ArrowUpRight } from 'lucide-react';
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
export default function HomepageCategoryList() {
  return (
    <section className='container-shell py-10'>
      <CategoryHeader />
      <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6'>
        {categories.map((category) => (
          <Link
            key={category}
            href={`${encodeURIComponent(category)}`}
            className='group relative aspect-[1/1.08] overflow-hidden rounded-2xl bg-slate-200'>
            <Image
              src={`https://images.unsplash.com/${categoryImages[category]}?auto=format&fit=crop&w=500&q=80`}
              alt={category}
              className='h-full w-full object-cover transition duration-700 group-hover:scale-110'
              width={500}
              height={500}
            />
            <div className='absolute inset-0 bg-linear-to-t from-black/65 via-black/5 to-transparent' />
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
  );
}

function CategoryHeader() {
  return (
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
        href='/all-products'
        className='hidden items-center gap-1 text-xs font-semibold sm:flex'>
        All categories <ArrowUpRight size={14} />
      </Link>
    </div>
  );
}

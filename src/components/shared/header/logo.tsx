import Link from 'next/link';

export default function Logo() {
  return (
    <Link
      href='/'
      className='text-[27px] font-black tracking-[-1.8px] text-slate-900 dark:text-slate-50'>
      store<span className='text-violet-600'>.</span>
    </Link>
  );
}

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

import { ThemeToggle } from '@/components/shared/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import CategoriesMenu from './categories-menu';
import Logo from './logo';
import MobileSidebar from './mobile-sidebar';
import { ProfileDropdown } from './profile-dropdown';
import SearchForm from './search-form';

export default async function Header() {
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-white/80 dark:bg-black/10 backdrop-blur-xl'>
      <div className='container'>
        <div className='flex flex-col gap-4 py-4 lg:hidden'>
          <div className='flex w-full items-center gap-3'>
            <Logo />
            <SearchForm />
            <MobileSidebar />
            <ProfileDropdown />
          </div>
        </div>

        <div className='hidden items-center justify-between gap-6 py-7 lg:flex'>
          <div className='flex shrink-0 items-center gap-6'>
            <Logo />
            <CategoriesMenu />
          </div>
          <div className='min-w-0 flex-1'>
            <SearchForm />
          </div>
          <div className='flex shrink-0 items-center gap-3'>
            <ThemeToggle />
            <CartButton />
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}

function CartButton() {
  return (
    <Button
      nativeButton={false}
      variant='outline'
      size='icon-lg'
      className='shrink-0'
      render={
        <Link
          href='/'
          aria-label='Shopping cart'
          className=''>
          <ShoppingCart className='size-5' />
        </Link>
      }
    />
  );
}

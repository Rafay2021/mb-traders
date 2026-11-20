import { FaMagnifyingGlass } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SearchForm() {
  return (
    <form className='w-full min-w-0'>
      <div className='relative w-full'>
        <Input
          type='search'
          placeholder='Search products...'
          className='h-10 w-full bg-white pl-4 pr-14 border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary'
        />

        <Button
          type='submit'
          size='icon'
          className='text-muted h-10 absolute right-0 top-0 rounded-l-none'
          aria-label='Search'>
          <FaMagnifyingGlass />
        </Button>
      </div>
    </form>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './theme-provider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  const Icon =
    theme === 'light' ? (
      <Moon className='transition transition:rotate-90 size-5' />
    ) : (
      <Sun className='transition -rotate-90 size-5 ' />
    );
  return (
    <Button
      variant='outline'
      size='icon-lg'
      className={''}
      onClick={handleClick}>
      {Icon}
    </Button>
  );
}

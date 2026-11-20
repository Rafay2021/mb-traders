'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

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
      <Sun className='transition -rotate-90 size-5' />
    );
  return (
    <Button
      variant='outline'
      size='icon-lg'
      onClick={handleClick}>
      {Icon}
    </Button>
  );
}

//  className={cn(
//         'transition-colors',
//         theme === 'light' ? 'text-slate-50' : 'text-slate-900',
//       )}

// className={cn(
//         'space-x-3 from-zinc-500 from-50% to-slate-50 to-50%',
//         theme === 'light' ? 'bg-linear-to-l' : 'bg-linear-to-r',
//       )}

/* <Moon
        className={cn(
          'transition-colors',
          theme === 'light' ? 'text-slate-900' : 'text-slate-50',
        )}
      /> */

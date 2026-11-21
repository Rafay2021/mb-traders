import { ThemeProvider } from '@/components/shared/theme/theme-provider';
import { cn } from '@/lib/utils';
import { StoreProvider } from '@/provider/store-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'MB Traders',
  description: 'Buys Products',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      suppressHydrationWarning={true}
      lang='en'
      className={cn('antialiased', 'font-sans', inter.variable)}>
      <body className='bg-muted/10'>
        <ThemeProvider>
          <StoreProvider>{children}</StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

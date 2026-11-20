import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const shopLink = [
  { path: '/', name: 'New In' },
  { path: '/', name: 'Trend' },
  { path: '/', name: 'Shoes' },
  { path: '/', name: 'Bags & Accessories' },
  { path: '/', name: 'Top Brands' },
  { path: '/', name: 'Sale & Special' },
  { path: '/', name: 'Offers' },
  { path: '/', name: 'Lookbook' },
];

const topBrandLink = [
  { path: '/', name: 'Coo Lee' },
  { path: '/', name: 'Anna' },
  { path: '/', name: 'Samsung' },
  { path: '/', name: 'Apple' },
  { path: '/', name: 'JellyCat' },
  { path: '/', name: 'Jimmy' },
  { path: '/', name: 'View All' },
];

const about = [
  { path: '/', name: 'About' },
  { path: '/', name: 'Customer Service' },
  { path: '/', name: 'Reward Program' },
  { path: '/', name: 'Privacy Policy' },
  { path: '/', name: 'Terms & Conditions' },
  { path: '/', name: 'Blog' },
];

const info = [
  { path: '/', name: 'Search Terms' },
  { path: '/', name: 'Advanced Search' },
  { path: '/', name: 'Orders and Returns' },
  { path: '/', name: 'Contact Us' },
  { path: '/', name: 'Theme FAQs' },
  { path: '/', name: 'Consultant' },
  { path: '/', name: 'Store Locations' },
];

const navLink = [
  { path: '/terms-of-service', name: 'Terms of Service' },
  { path: '/privacy-policy', name: 'Privacy Policy' },
  { path: '/store-refund-policy', name: 'Store Refund Policy' },
];

export default function Footer() {
  return (
    <footer className='mt-auto bg-primary'>
      <div className='container'>
        <FooterTop />

        {/* Footer bottom */}
        <div className='flex flex-col items-center justify-between gap-4 border-t border-black/10 py-6 text-center md:flex-row md:text-left'>
          <small>&copy; {2026} Store. All rights reserved.</small>

          <div className='flex flex-wrap justify-center gap-x-4 gap-y-2'>
            {navLink.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className='text-xs hover:underline'>
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterTop() {
  return (
    <div className='py-8'>
      {/* Navigation columns */}
      <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6'>
        <FooterColumn
          title='Shop'
          links={shopLink}
        />

        <FooterColumn
          title='Top Brands'
          links={topBrandLink}
        />

        <FooterColumn
          title='About'
          links={about}
        />

        <FooterColumn
          title='Information'
          links={info}
        />
      </div>

      {/* Newsletter */}
      <div className='mt-10'>
        <NewsLetter />
      </div>
    </div>
  );
}

interface FooterColumnProps {
  title: string;
  links: { path: string; name: string }[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className='flex min-w-0 flex-col items-center justify-center gap-3 text-center sm:items-start sm:text-left'>
      <h3 className='mb-2 text-xl font-bold text-black'>{title}</h3>

      {links.map((link) => (
        <Link
          key={link.name}
          href={link.path}
          className='text-sm transition-colors hover:text-black/60'>
          {link.name}
        </Link>
      ))}
    </div>
  );
}

function NewsLetter() {
  return (
    <Card className='flex flex-col gap-8 rounded-xl bg-black/10 px-5 py-8 sm:px-8 md:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12'>
      {/* Store information */}
      <div className='flex min-w-0 flex-1 flex-col items-center gap-3 text-center lg:items-start lg:text-left'>
        <h3 className='text-2xl font-bold text-black sm:text-3xl'>Store</h3>

        <p className='max-w-md text-sm leading-6 text-black/70'>
          Discover the latest trends, explore quality products, and enjoy a
          seamless shopping experience. We bring everything you need together in
          one place.
        </p>
      </div>

      {/* Newsletter information and form */}
      <div className='flex min-w-0 flex-1 flex-col gap-4'>
        <div className='flex flex-col gap-2 text-center lg:text-left'>
          <h4 className='text-xl font-bold text-black sm:text-2xl'>
            Sign Up To Our Newsletter
          </h4>

          <p className='text-sm text-black/70'>
            Be the first to know. Subscribe to our newsletter today.
          </p>
        </div>

        <form className='flex w-full flex-col gap-3 sm:flex-row'>
          <Input
            type='email'
            required
            placeholder='Your email address'
            className='h-11 w-full bg-white'
          />

          <Button
            type='submit'
            variant='secondary'
            className='h-11 w-full shrink-0 sm:w-auto'>
            Sign Up
          </Button>
        </form>
      </div>
    </Card>
  );
}

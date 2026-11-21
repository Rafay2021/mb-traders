'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import Image from 'next/image';

// Types
type Category = {
  id: string;
  name: string;
  href: string;
  products: Product[];
};

type Product = {
  id: string;
  name: string;
  href: string;
  image: string;
};

// Categories data
const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    href: '/categories/electronics',
    products: [
      {
        id: 'smartphones',
        name: 'Smartphones',
        href: '/categories/electronics/smartphones',
        image: '/images/smartphones.jpg',
      },
      {
        id: 'laptops',
        name: 'Laptops',
        href: '/categories/electronics/laptops',
        image: '/images/laptops.jpg',
      },
      {
        id: 'headphones',
        name: 'Headphones',
        href: '/categories/electronics/headphones',
        image: '/images/headphones.jpg',
      },
      {
        id: 'smart-watches',
        name: 'Smart Watches',
        href: '/categories/electronics/smart-watches',
        image: '/images/smart-watches.jpg',
      },
    ],
  },
  {
    id: 'fashion',
    name: 'Fashion',
    href: '/categories/fashion',
    products: [
      {
        id: 'mens-clothing',
        name: "Men's Clothing",
        href: '/fashion/mens-clothing',
        image: '/images/mens-clothing.jpg',
      },
      {
        id: 'womens-clothing',
        name: "Women's Clothing",
        href: '/fashion/womens-clothing',
        image: '/images/womens-clothing.jpg',
      },
    ],
  },
  {
    id: 'home-lifestyle',
    name: 'Home & Lifestyle',
    href: '/home-lifestyle',
    products: [
      {
        id: 'furniture',
        name: 'Furniture',
        href: '/categories/home-lifestyle/furniture',
        image: '/images/furniture.jpg',
      },
      {
        id: 'kitchen',
        name: 'Kitchen Accessories',
        href: '/categories/home-lifestyle/kitchen',
        image: '/images/kitchen.jpg',
      },
    ],
  },
];

type CategoriesProps = {
  setState?: (open: boolean) => void;
};
export function Categories({ setState }: CategoriesProps) {
  const [activeCategory, setActiveCategory] = React.useState<string>(
    categories[0].id,
  );

  const selectedCategory = categories.find(
    (category) => category.id === activeCategory,
  );
  function handleClick() {
    setState?.(false);
  }
  return (
    <div
      onClick={handleClick}
      className='grid md:w-150 md:grid-cols-[220px_1fr] '>
      {/* Categories List */}
      <div className='border-r p-2'>
        {categories.map((category) => {
          const isActive = activeCategory === category.id;

          return (
            <Link
              key={category.id}
              href={category.href}
              className='block'>
              <Button
                type='button'
                variant='ghost'
                onMouseEnter={() => setActiveCategory(category.id)}
                onFocus={() => setActiveCategory(category.id)}
                className={`my-1 flex w-full items-center justify-between rounded-md px-3 py-3 text-sm ${
                  isActive
                    ? 'bg-accent font-medium text-accent-foreground'
                    : 'hover:bg-accent'
                }`}>
                {category.name}
                <ChevronRight className='size-4' />
              </Button>
            </Link>
          );
        })}
      </div>

      {/* Products Panel */}
      <div className='min-h-full p-3'>
        {selectedCategory && (
          <>
            <div className='mb-3 flex items-center justify-between'>
              <h3 className='text-sm font-semibold'>{selectedCategory.name}</h3>

              <Link
                href={selectedCategory.href}
                className='text-xs text-muted-foreground hover:text-primary'>
                View all
              </Link>
            </div>

            <div className='grid grid-cols-2 gap-3'>
              {selectedCategory.products.map((product) => (
                <Link
                  key={product.id}
                  href={product.href}
                  className='group flex flex-col items-center gap-2 rounded-lg p-2 transition-colors hover:bg-accent'>
                  <div className='flex aspect-square w-full items-center justify-center overflow-hidden rounded-md bg-muted'>
                    <Image
                      width={100}
                      height={100}
                      src={product.image}
                      alt={product.name}
                      loading='lazy'
                      className='h-full w-full object-cover transition-transform group-hover:scale-105'
                    />
                  </div>
                  <span className='text-center text-xs font-medium'>
                    {product.name}
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function CategoriesMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            render={<Button variant={'secondary'}>Categories</Button>}
          />
          <NavigationMenuContent>
            <Categories />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

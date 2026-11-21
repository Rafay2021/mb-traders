'use client';
import FeaturedProducts from '@/components/storefront/homepage/featured-products';
import Features from '@/components/storefront/homepage/features';
import Hero from '@/components/storefront/homepage/hero';
import HomepageCategoryList from '@/components/storefront/homepage/homepage-categories-list';
import ProductByCategory from '@/components/storefront/homepage/product-by-category';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Features />
      <HomepageCategoryList />
      <FeaturedProducts />
      <ProductByCategory />
    </div>
  );
}

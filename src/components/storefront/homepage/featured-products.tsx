import { products } from '@/lib/products';
import { ProductCarousel } from '@/modules/products/components/product-carousel';

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.featured);
  return (
    <div className='mt-8 bg-[#eeedff] py-4'>
      <ProductCarousel
        title="A few things you'll love"
        subtitle='The current favorites'
        items={featured}
        href='/products?sort=featured'
      />
    </div>
  );
}

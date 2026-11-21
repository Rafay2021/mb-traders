import { categories, products } from '@/lib/products';
import { ProductCarousel } from '@/modules/products/components/product-carousel';
export default function ProductByCategory() {
  return (
    <>
      {categories.map((category, i) => (
        <ProductCarousel
          key={category}
          title={category}
          subtitle={
            [
              'Explore the latest',
              'A little style inspiration',
              'Make home feel like you',
              'Your daily essentials',
              'The finishing touches',
              'Move your way',
            ][i]
          }
          items={products.filter((p) => p.category === category)}
          href={`/products?category=${encodeURIComponent(category)}`}
        />
      ))}
    </>
  );
}

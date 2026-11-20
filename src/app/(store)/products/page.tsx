import { Suspense } from 'react';
import { ProductsPage } from '@/components/storefront/products-page';

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className='container-shell py-24 text-center text-sm text-slate-500'>
          Loading products…
        </div>
      }>
      <ProductsPage />
    </Suspense>
  );
}

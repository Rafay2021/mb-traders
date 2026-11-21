import { ProductsPage } from '@/modules/products/components/products-page';
import { Suspense } from 'react';

export default async function Page({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  return (
    <Suspense
      fallback={
        <div className='container-shell py-24 text-center text-sm text-slate-500'>
          Loading products…
        </div>
      }>
      <ProductsPage slug={categorySlug} />
    </Suspense>
  );
}

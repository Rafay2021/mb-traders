import { getProductBySlug } from '@/lib/products';
import { ProductDetailPage } from '@/modules/products/components/product-detail-page';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return <ProductDetailPage product={product} />;
}

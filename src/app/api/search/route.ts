import { NextResponse } from 'next/server';
import { products } from '@/lib/products';
import { searchProducts } from '@/lib/search';

export const dynamic = 'force-dynamic';

/*
 * Swap the body of this handler for your database query when you connect Mongoose.
 * An un-anchored, case-insensitive regex gives the same "starts with / ends with / contains" behaviour:
 *
 *   const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
 *   const rx = new RegExp(escape(q), "i");
 *   const docs = await Product.find({ $or: [{ name: rx }, { brand: rx }, { category: rx }] }).limit(40).lean();
 *   return NextResponse.json({ products: docs });
 */
export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get('q')?.trim() ?? '';
  if (!q || q.length > 80) return NextResponse.json({ products: [] });
  return NextResponse.json({
    products: searchProducts(q, products).slice(0, 40),
  });
}

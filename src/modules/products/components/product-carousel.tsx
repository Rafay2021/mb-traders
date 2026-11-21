"use client";
import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { ProductCard } from "./product-card";

export function ProductCarousel({ title, subtitle, items, href="/products" }: {title:string;subtitle:string;items:Product[];href?:string}) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (direction:number) => ref.current?.scrollBy({left:direction*ref.current.clientWidth*.78,behavior:"smooth"});
  return <section className="container-shell py-12">
    <div className="mb-6 flex items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-violet-600">{subtitle}</p><h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h2></div>
      <div className="flex items-center gap-3"><Link href={href} className="hidden items-center gap-1 text-xs font-semibold text-slate-600 hover:text-violet-700 sm:flex">View all <ArrowUpRight size={14}/></Link><button onClick={()=>scroll(-1)} aria-label="Scroll left" className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white hover:border-violet-300 hover:text-violet-700"><ChevronLeft size={18}/></button><button onClick={()=>scroll(1)} aria-label="Scroll right" className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white hover:border-violet-300 hover:text-violet-700"><ChevronRight size={18}/></button></div>
    </div>
    <div ref={ref} className="hide-scrollbar grid grid-flow-col auto-cols-[72%] gap-4 overflow-x-auto scroll-smooth pb-3 sm:auto-cols-[40%] lg:auto-cols-[23%]">{items.slice(0,15).map((product,index)=><ProductCard key={product.id} product={product} index={index}/>)}</div>
    <Link href={href} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-violet-700 sm:hidden">View all {title} <ArrowUpRight size={14}/></Link>
  </section>;
}

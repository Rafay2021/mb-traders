"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SlidersHorizontal, X, Search, ChevronDown, Star, Check } from "lucide-react";
import { categories, products, formatPrice } from "@/lib/products";
import { ProductCard } from "./product-card";

export function ProductsPage() {
  const params=useSearchParams();
  const [category,setCategory]=useState(params.get("category")||"All");
  const [brand,setBrand]=useState("All");
  const [maxPrice,setMaxPrice]=useState(250);
  const [minRating,setMinRating]=useState(0);
  const [sort,setSort]=useState(params.get("sort")||"featured");
  const [search,setSearch]=useState(params.get("q")||"");
  const [inStock,setInStock]=useState(false);
  const [mobileFilters,setMobileFilters]=useState(false);
  const brands=Array.from(new Set(products.map(p=>p.brand)));
  const filtered=useMemo(()=>{
    let result=products.filter(p=>(category==="All"||p.category===category)&&(brand==="All"||p.brand===brand)&&p.price<=maxPrice&&p.rating>=minRating&&(!inStock||p.stock>0)&&(`${p.name} ${p.brand} ${p.category}`).toLowerCase().includes(search.toLowerCase()));
    if(sort==="price-low") result=[...result].sort((a,b)=>a.price-b.price);
    if(sort==="price-high") result=[...result].sort((a,b)=>b.price-a.price);
    if(sort==="rating") result=[...result].sort((a,b)=>b.rating-a.rating);
    if(sort==="newest") result=[...result].reverse();
    if(sort==="featured") result=[...result].sort((a,b)=>Number(!!b.featured)-Number(!!a.featured));
    return result;
  },[category,brand,maxPrice,minRating,inStock,search,sort]);
  const clear=()=>{setCategory("All");setBrand("All");setMaxPrice(250);setMinRating(0);setInStock(false);setSearch("");setSort("featured")};
  const filters=<div className="space-y-7">
    <div><div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-bold">Categories</h3><span className="text-xs text-slate-400">{categories.length}</span></div><div className="space-y-2.5">{["All",...categories].map(c=><button key={c} onClick={()=>setCategory(c)} className={`flex w-full items-center justify-between text-left text-sm transition ${category===c?"font-semibold text-violet-700":"text-slate-500 hover:text-slate-900"}`}><span>{c==="All"?"All products":c}</span>{category===c&&<Check size={15}/>}</button>)}</div></div>
    <div className="border-t border-slate-100 pt-6"><h3 className="mb-4 text-sm font-bold">Price range</h3><input type="range" min="20" max="250" step="5" value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value))} className="range-slider w-full"/><div className="mt-3 flex justify-between text-xs text-slate-500"><span>$20</span><span className="font-semibold text-slate-800">Up to {formatPrice(maxPrice)}</span></div></div>
    <div className="border-t border-slate-100 pt-6"><h3 className="mb-3 text-sm font-bold">Brand</h3><div className="space-y-2.5">{["All",...brands].map(b=><button key={b} onClick={()=>setBrand(b)} className="flex w-full items-center gap-2.5 text-sm text-slate-600"><span className={`grid h-4 w-4 place-items-center rounded border ${brand===b?"border-violet-600 bg-violet-600 text-white":"border-slate-300"}`}>{brand===b&&<Check size={11}/>}</span>{b}</button>)}</div></div>
    <div className="border-t border-slate-100 pt-6"><h3 className="mb-3 text-sm font-bold">Customer rating</h3>{[4.5,4,3].map(r=><button key={r} onClick={()=>setMinRating(minRating===r?0:r)} className={`mb-2 flex w-full items-center gap-2 text-sm ${minRating===r?"text-violet-700":"text-slate-600"}`}><span className={`grid h-4 w-4 place-items-center rounded-full border ${minRating===r?"border-violet-600":"border-slate-300"}`}>{minRating===r&&<span className="h-2 w-2 rounded-full bg-violet-600"/>}</span><span className="flex items-center">{r}+ <Star size={12} className="ml-1 fill-amber-400 text-amber-400"/></span></button>)}</div>
    <div className="border-t border-slate-100 pt-5"><label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600"><input type="checkbox" checked={inStock} onChange={e=>setInStock(e.target.checked)} className="accent-violet-600"/> In stock only</label></div>
    <button onClick={clear} className="w-full rounded-full border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 hover:border-violet-300 hover:text-violet-700">Clear all filters</button>
  </div>;
  return <div className="container-shell py-8">
    <div className="mb-8 rounded-[26px] bg-gradient-to-r from-[#e9e7ff] via-[#f3eafa] to-[#fce9e0] px-7 py-9 sm:px-12 sm:py-12"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-violet-700">The complete collection</p><h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">Find your next favorite.</h1><p className="mt-3 max-w-lg text-sm leading-6 text-slate-600">A considered collection of everyday essentials, standout details and thoughtful upgrades.</p></div>
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="text-sm text-slate-500"><span className="font-bold text-slate-900">{filtered.length}</span> products to explore</p></div><div className="flex flex-wrap gap-2"><div className="flex min-w-[220px] flex-1 items-center rounded-full border border-slate-200 bg-white px-4 py-2.5 sm:flex-none"><Search size={16} className="text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..." className="ml-2 w-full bg-transparent text-sm outline-none"/></div><button onClick={()=>setMobileFilters(true)} className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium lg:hidden"><SlidersHorizontal size={15}/> Filters</button><label className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm"><span className="text-slate-500">Sort:</span><select value={sort} onChange={e=>setSort(e.target.value)} className="bg-transparent font-semibold outline-none"><option value="featured">Featured</option><option value="newest">Newest</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option></select></label></div></div>
    <div className="grid gap-8 lg:grid-cols-[220px_1fr]"><aside className="hidden lg:block"><div className="sticky top-28 rounded-2xl border border-slate-100 bg-white p-5"><div className="mb-6 flex items-center justify-between"><h2 className="font-bold">Filters</h2><SlidersHorizontal size={17} className="text-slate-400"/></div>{filters}</div></aside>
      <div>{(category!=="All"||brand!=="All"||minRating>0||inStock||search)&&<div className="mb-5 flex flex-wrap items-center gap-2"><span className="text-xs text-slate-400">Active:</span>{[category!=="All"?category:"",brand!=="All"?brand:"",minRating?`${minRating}+ stars`:"",inStock?"In stock":"",search?`Search: ${search}`:""].filter(Boolean).map(t=><button key={t} onClick={()=>{if(t===category)setCategory("All");else if(t===brand)setBrand("All");else if(t.includes("stars"))setMinRating(0);else if(t==="In stock")setInStock(false);else setSearch("")}} className="flex items-center gap-1 rounded-full bg-violet-50 px-3 py-1.5 text-[11px] font-medium text-violet-700">{t}<X size={12}/></button>)}</div>}
      {filtered.length?<div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 xl:grid-cols-4">{filtered.map((p,i)=><ProductCard key={p.id} product={p} index={i}/>)}</div>:<div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center"><Search size={30} className="mx-auto text-slate-300"/><h3 className="mt-4 font-bold">No products found</h3><p className="mt-2 text-sm text-slate-500">Try adjusting your filters or search terms.</p><button onClick={clear} className="mt-5 rounded-full bg-violet-600 px-5 py-2.5 text-xs font-semibold text-white">Clear filters</button></div>}</div>
    </div>
    {mobileFilters&&<div className="fixed inset-0 z-50 lg:hidden"><button aria-label="Close filters" onClick={()=>setMobileFilters(false)} className="absolute inset-0 bg-slate-950/40"/><div className="absolute right-0 top-0 h-full w-[min(88%,380px)] overflow-y-auto bg-white p-6 shadow-2xl"><div className="mb-7 flex items-center justify-between"><h2 className="text-lg font-bold">Filters</h2><button onClick={()=>setMobileFilters(false)} className="rounded-full bg-slate-100 p-2"><X size={18}/></button></div>{filters}<button onClick={()=>setMobileFilters(false)} className="mt-5 w-full rounded-full bg-violet-600 py-3 text-sm font-semibold text-white">Show {filtered.length} products</button></div></div>}
  </div>;
}

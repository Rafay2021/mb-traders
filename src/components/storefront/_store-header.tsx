"use client";
import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingBag, UserRound, Menu, X, Heart, ArrowRight } from "lucide-react";

export function StoreHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  return (
    <>
      <div className="bg-[#24233a] text-white text-center text-xs py-2 tracking-wide">A little something extra — enjoy 15% off your first order with WELCOME15</div>
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="container-shell flex h-[76px] items-center gap-8">
          <button className="md:hidden p-2" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21}/> : <Menu size={21}/>}</button>
          <Link href="/" className="text-[27px] font-black tracking-[-1.8px] text-slate-900">morrow<span className="text-violet-600">.</span></Link>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <Link className="hover:text-violet-600 transition" href="/products">Shop all</Link>
            <Link className="hover:text-violet-600 transition" href="/products?category=Electronics">Tech</Link>
            <Link className="hover:text-violet-600 transition" href="/products?category=Fashion">Style</Link>
            <Link className="hover:text-violet-600 transition" href="/products?category=Home%20%26%20Living">Home</Link>
            <Link className="text-violet-600 hover:text-violet-700 transition" href="/products?sort=newest">New arrivals</Link>
          </nav>
          <form action="/products" className="hidden lg:flex ml-auto w-full max-w-[340px] items-center rounded-full bg-slate-100 px-4 py-2.5">
            <Search size={17} className="text-slate-400"/>
            <input name="q" placeholder="Search for anything..." className="ml-2 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"/>
            <button aria-label="Search"><ArrowRight size={16} className="text-slate-400"/></button>
          </form>
          <div className="ml-auto lg:ml-0 flex items-center gap-2 text-slate-700">
            <Link href="/products" className="rounded-full p-2.5 hover:bg-slate-100 hidden sm:block" aria-label="Wishlist"><Heart size={19}/></Link>
            <button className="rounded-full p-2.5 hover:bg-slate-100 hidden sm:block" aria-label="Account"><UserRound size={19}/></button>
            <button className="relative rounded-full p-2.5 hover:bg-slate-100" aria-label="Shopping bag"><ShoppingBag size={20}/><span className="absolute right-1 top-1 h-4 min-w-4 rounded-full bg-violet-600 px-1 text-[9px] leading-4 text-white">0</span></button>
          </div>
        </div>
        {menuOpen && <div className="md:hidden border-t bg-white px-5 py-4 flex flex-col gap-4 text-sm"><Link onClick={()=>setMenuOpen(false)} href="/products">Shop all</Link><Link onClick={()=>setMenuOpen(false)} href="/products?category=Electronics">Tech</Link><Link onClick={()=>setMenuOpen(false)} href="/products?category=Fashion">Style</Link><Link onClick={()=>setMenuOpen(false)} href="/products?category=Home%20%26%20Living">Home</Link><form action="/products" className="flex rounded-lg bg-slate-100 px-3 py-2"><Search size={16}/><input name="q" placeholder="Search products" className="ml-2 bg-transparent outline-none"/></form></div>}
      </header>
    </>
  );
}

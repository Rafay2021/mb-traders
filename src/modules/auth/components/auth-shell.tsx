import type { ReactNode } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export function AuthShell({ title, subtitle, children, footer }: { title: string; subtitle: string; children: ReactNode; footer: ReactNode }) {
  return (
    <div className="container-shell grid items-stretch gap-6 py-10 lg:grid-cols-2">
      <div className="relative hidden overflow-hidden rounded-[30px] bg-[#e8e7ff] lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,.85),transparent_40%),linear-gradient(115deg,#e8e7ff_0%,#f4e9f2_55%,#fbe9dd_100%)]" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full border-[48px] border-white/50" />
        <div className="relative flex h-full flex-col justify-between p-14">
          <Link href="/" className="text-3xl font-black tracking-tight text-slate-900">morrow<span className="text-violet-600">.</span></Link>
          <div>
            <p className="mb-4 flex w-fit items-center gap-2 rounded-full bg-white/65 px-3 py-2 text-[10px] font-bold uppercase tracking-[.17em] text-violet-800"><Sparkles size={13} /> Members get more</p>
            <h2 className="max-w-sm text-5xl font-black leading-[1.02] tracking-[-.04em] text-[#22213b]">Make room for <span className="text-violet-600">better</span> things.</h2>
            <p className="mt-5 max-w-xs text-sm leading-6 text-slate-600">Track orders, save favorites and check out faster.</p>
          </div>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-md flex-col justify-center py-6">
        <h1 className="text-3xl font-black tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
        <div className="mt-8">{children}</div>
        <div className="mt-6 text-center text-sm text-slate-500">{footer}</div>
      </div>
    </div>
  );
}

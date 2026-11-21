import type { InputHTMLAttributes, ReactNode } from "react";

export const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100";
export const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-full bg-[#24233a] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50";
export const secondaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:text-violet-700";

export function FieldShell({ label, error, hint, className = "", children }: { label: string; error?: string; hint?: string; className?: string; children: ReactNode }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-semibold text-slate-700">{label}</span>
      {children}
      {error ? <span role="alert" className="mt-1.5 block text-xs text-rose-600">{error}</span> : hint ? <span className="mt-1.5 block text-xs text-slate-400">{hint}</span> : null}
    </label>
  );
}

export function Field({ label, error, hint, className, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; hint?: string }) {
  return (
    <FieldShell label={label} error={error} hint={hint} className={className}>
      <input {...props} aria-invalid={!!error} className={`${inputCls} ${error ? "border-rose-400" : ""}`} />
    </FieldShell>
  );
}

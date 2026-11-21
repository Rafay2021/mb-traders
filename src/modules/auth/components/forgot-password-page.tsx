"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { MailCheck } from "lucide-react";
import { AuthShell } from "./auth-shell";
import { Field, primaryBtn, secondaryBtn } from "./form-ui";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email address.");
    setError(null);
    setBusy(true);
    // Demo only: call your "send reset email" endpoint here. Show the same message whether or not the
    // account exists, so the form can't be used to discover which emails are registered.
    await new Promise((r) => setTimeout(r, 800));
    setBusy(false);
    setSent(true);
  };

  return (
    <AuthShell title="Forgot your password?" subtitle="Enter your email and we'll send a link to reset it." footer={<>Remembered it? <Link href="/login" className="font-semibold text-violet-700 hover:underline">Back to sign in</Link></>}>
      {sent ? (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 text-center">
          <MailCheck size={36} className="mx-auto text-violet-600" />
          <h2 className="mt-4 font-bold">Check your inbox</h2>
          <p className="mt-2 text-sm text-slate-500">If an account exists for <strong>{email}</strong>, a reset link is on its way.</p>
          <button onClick={() => setSent(false)} className={`${secondaryBtn} mt-5`}>Use a different email</button>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="space-y-4">
          <Field label="Email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={error ?? undefined} />
          <button disabled={busy} className={`${primaryBtn} w-full`}>{busy ? "Sending…" : "Send reset link"}</button>
        </form>
      )}
    </AuthShell>
  );
}

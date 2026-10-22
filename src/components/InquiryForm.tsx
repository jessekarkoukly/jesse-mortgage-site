"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import { B, serif, sans } from "@/components/home/brand";

export const HELP_OPTIONS = [
  "Buying my first home",
  "Getting pre-approved",
  "Renewing my mortgage",
  "Refinancing",
  "I'm self-employed",
  "Something else",
];

const input =
  "w-full rounded-xl border-[1.5px] border-[#E3D9CD] bg-white px-4 py-3.5 min-h-[52px] text-[1rem] text-[#352B26] placeholder:text-[#8C7A6E] focus:outline-none focus:border-[#4F6B7A] transition-colors duration-150";

/** The four-field inquiry form. Used in the pop-up and on /contact. */
export function InquiryFields({ onDone, autoFocus = true }: { onDone?: () => void; autoFocus?: boolean }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [help, setHelp] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!autoFocus) return;
    const t = window.setTimeout(() => firstRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, [autoFocus]);

  const valid = name.trim() && /\S+@\S+\.\S+/.test(email.trim()) && phone.trim() && help;

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!valid || status === "sending") return;
    setStatus("sending");
    const [first, ...rest] = name.trim().split(/\s+/);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: first,
          last_name: rest.join(" "),
          email: email.trim(),
          phone: phone.trim(),
          inquiry_type: help,
          source: `inquiry_form ${window.location.pathname}`,
          website,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      trackEvent("inquiry_submit");
      onDone?.();
      // Hand the name and email to the thank-you page without putting them in the URL.
      try { sessionStorage.setItem("jk_inquiry", JSON.stringify({ name: name.trim(), email: email.trim() })); } catch {}
      router.push("/thank-you");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4" style={sans}>
      <label className="flex flex-col gap-1.5">
        <span className="text-[0.9375rem] font-semibold" style={{ color: B.espresso }}>Name</span>
        <input ref={firstRef} required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} className={input} />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-[0.9375rem] font-semibold" style={{ color: B.espresso }}>Email</span>
        <input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={200} className={input} />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-[0.9375rem] font-semibold" style={{ color: B.espresso }}>Phone</span>
        <input required type="tel" autoComplete="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={30} className={input} />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-[0.9375rem] font-semibold" style={{ color: B.espresso }}>What can I help with?</span>
        <span className="relative">
          <select required value={help} onChange={(e) => setHelp(e.target.value)} className={`${input} appearance-none pr-10 cursor-pointer ${help ? "" : "text-[#8C7A6E]"}`}>
            <option value="" disabled>Choose one</option>
            {HELP_OPTIONS.map((o) => <option key={o} value={o} style={{ color: B.espresso }}>{o}</option>)}
          </select>
          <svg aria-hidden="true" className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="8" viewBox="0 0 12 8"><path d="M1 1l5 5 5-5" fill="none" stroke={B.espresso} strokeWidth="2" /></svg>
        </span>
      </label>

      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="inq-website">Website</label>
        <input id="inq-website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      {status === "error" && (
        <p role="alert" className="m-0 text-[0.9375rem]" style={{ color: B.clayDeep }}>
          That didn’t send. You can call me at <a href="tel:4162762666" className="underline">416-276-2666</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={!valid || status === "sending"}
        className="mt-1 cursor-pointer disabled:cursor-not-allowed w-full rounded-full px-7 py-4 min-h-[52px] text-[1rem] font-semibold transition-colors duration-150 bg-[#352B26] text-[#F5EFE8] hover:bg-[#4F6B7A] disabled:bg-[#B8AA9F]"
      >
        {status === "sending" ? "Sending…" : "See available times"}
      </button>
    </form>
  );
}

/** Pop-up version, opened by every "Schedule a call" button. */
export default function InquiryForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="inq-title">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-[rgba(30,24,21,0.6)] cursor-default" />
      <div className="relative w-full sm:max-w-[520px] max-h-[94vh] overflow-y-auto rounded-t-[24px] sm:rounded-[24px] px-6 sm:px-9 pt-6 pb-8" style={{ background: B.linen }}>
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex flex-col gap-1.5">
            <h2 id="inq-title" className="m-0 text-[1.875rem] leading-[1.15]" style={{ ...serif, fontWeight: 500, color: B.espresso }}>Schedule a call</h2>
            <p className="m-0 text-[0.9375rem] leading-relaxed" style={{ ...sans, color: B.body }}>Share a little about you, then pick a time that suits you.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="cursor-pointer w-11 h-11 -mr-2 -mt-1 shrink-0 flex items-center justify-center hover:text-[#4F6B7A]" style={{ color: B.espresso }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>
        <InquiryFields onDone={onClose} />
      </div>
    </div>
  );
}

// Shared pieces for the first-time buyer ad landing pages (/lp/first-time-buyers/*).
// Everything here renders on the server with no JavaScript in the browser. Interactive pieces live in kit-client.tsx.

import Image from "next/image";
import type { ReactNode } from "react";
import JesseFooter from "@/components/JesseFooter";
import { B, GOOGLE_PROFILE_URL, serif, sans } from "@/components/home/brand";
import type { GoogleReviews } from "@/lib/googleReviews";
import { FAMILY_PHOTO, FAMILY_WIDE, FAQ, PHONE_DISPLAY, PHONE_TEL, PLAN, PROGRAMS, QUICK_PROOF, type Review } from "@/data/landing/fthb";

export { FAMILY_PHOTO, FAMILY_WIDE };

export const STAR_LIGHT = "#A6741E";
export const STAR_DARK = "#F2C66D";

export function Stars({ colour = STAR_LIGHT, size = 16 }: { colour?: string; size?: number }) {
  return (
    <span className="inline-flex gap-0.5 shrink-0" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill={colour}><path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" /></svg>
      ))}
    </span>
  );
}

export function reviewSummary(google: GoogleReviews) {
  return google.rating >= 4.95 ? `${google.count} five-star reviews on Google` : `${google.rating.toFixed(1)} stars from ${google.count} Google reviews`;
}

/** Stars plus the review count, linking to Jesse's Google profile. */
export function GoogleSummary({ google, dark = false, className = "" }: { google: GoogleReviews; dark?: boolean; className?: string }) {
  return (
    <a
      href={GOOGLE_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`self-start inline-flex items-center gap-2.5 min-h-[48px] text-[0.9375rem] font-semibold underline-offset-4 hover:underline ${className}`}
      style={{ ...sans, color: dark ? B.linen : B.espresso }}
    >
      <Stars colour={dark ? STAR_DARK : STAR_LIGHT} />
      <span>{reviewSummary(google)}</span>
    </a>
  );
}

export function PhoneIcon({ size = 18 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>
  );
}

export function LockIcon({ colour = B.skyDeep }: { colour?: string }) {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colour} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
  );
}

export function CheckDot({ dark = false }: { dark?: boolean }) {
  return (
    <span aria-hidden="true" className="mt-[3px] w-[22px] h-[22px] shrink-0 rounded-full flex items-center justify-center" style={{ background: dark ? B.skyLight : B.skyDeep }}>
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke={dark ? B.espresso : "white"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 6.2 5 8.5l4.5-5" /></svg>
    </span>
  );
}

/** "Your credit stays untouched until you give the OK." Jesse's consent rule, from his client emails. */
export function LockLine({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <p className={`m-0 flex items-center gap-2 text-[0.9375rem] ${className}`} style={{ ...sans, color: dark ? B.onDark : B.body }}>
      <LockIcon colour={dark ? B.skyLight : B.skyDeep} />
      Your credit stays untouched until you give the OK.
    </p>
  );
}

/**
 * Minimal header: logo and phone only, so nothing pulls people away from the page.
 * Fixed rather than sticky: the layout wraps every page in an overflow-x-hidden div, which stops sticky from working.
 */
export function LandingHeader() {
  return (
    <>
    <div aria-hidden="true" className="h-[68px]" />
    <header className="fixed top-0 inset-x-0 z-40 h-[68px] flex items-center px-5 sm:px-6 bg-white/95 backdrop-blur border-b" style={{ borderColor: B.line }}>
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between gap-4">
        <Image src="/jesse-logo.png" alt="Jesse Karkoukly, Mortgage Agent" width={224} height={48} className="h-9 sm:h-10 w-auto" priority />
        <a href={PHONE_TEL} className="flex items-center gap-2 min-h-[48px] px-1 text-[0.9375rem] font-semibold hover:text-[#4F6B7A]" style={{ ...sans, color: B.espresso }}>
          <PhoneIcon />
          <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
          <span className="sm:hidden">Call</span>
        </a>
      </div>
    </header>
    </>
  );
}

/** Page frame: fixed header, the page, then the footer with the compliance disclaimer and Sherwood logo. */
export function LandingFrame({ children, extras }: { children: ReactNode; extras?: ReactNode }) {
  return (
    <div style={{ background: B.linen }}>
      <LandingHeader />
      <main>{children}</main>
      <JesseFooter />
      {extras}
    </div>
  );
}

/** Three short review sentences under a hero: Guzzi, Marshello, Syed. */
export function ProofStrip({ className = "" }: { className?: string }) {
  return (
    <ul className={`m-0 p-0 list-none grid gap-3 md:grid-cols-3 ${className}`} aria-label="What clients say on Google">
      {QUICK_PROOF.map((p) => (
        <li key={p.name} className="rounded-2xl px-5 py-4 flex flex-col gap-2" style={{ background: B.sand }}>
          <Stars size={14} />
          <span className="text-[1.0625rem] leading-snug" style={{ ...serif, color: B.espresso }}>“{p.text}”</span>
          <span className="text-[0.875rem]" style={{ ...sans, color: B.body }}>{p.name}</span>
        </li>
      ))}
    </ul>
  );
}

/** One review as a quote. Highlight on top, the reviewer below, link to the full review on Google. */
export function QuoteCard({ review, big = false, className = "" }: { review: Review; big?: boolean; className?: string }) {
  return (
    <figure className={`m-0 rounded-[20px] bg-white flex flex-col gap-4 ${big ? "p-7 sm:p-9" : "p-6 sm:p-7"} ${className}`}>
      <span role="img" aria-label="5 out of 5 stars"><Stars size={big ? 18 : 15} /></span>
      <blockquote className={`m-0 ${big ? "text-[1.375rem] sm:text-[1.625rem] leading-[1.32]" : "text-[1.125rem] sm:text-[1.1875rem] leading-snug"}`} style={{ ...serif, color: B.espresso }}>
        “{review.highlight}”
      </blockquote>
      <figcaption className="mt-auto flex flex-col gap-0.5" style={sans}>
        <span className="text-[1rem] font-semibold" style={{ color: B.espresso }}>{review.name}</span>
        {review.tag && <span className="text-[0.9375rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>{review.tag}</span>}
        <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="mt-1.5 self-start text-[0.875rem] underline underline-offset-2 hover:text-[#4F6B7A]" style={{ color: B.body }}>
          Read the full review on Google
        </a>
      </figcaption>
    </figure>
  );
}

/** The five things in the plan, as a checklist. */
export function PlanChecklist({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
  return (
    <ul className={`m-0 p-0 list-none flex flex-col ${compact ? "gap-3" : "gap-4"}`}>
      {PLAN.map((p) => (
        <li key={p.title} className="flex gap-3.5">
          <CheckDot dark={dark} />
          <span className="flex flex-col gap-0.5">
            <span className={`${compact ? "text-[1.0625rem]" : "text-[1.125rem]"} font-semibold`} style={{ ...sans, color: dark ? B.linen : B.espresso }}>{p.title}</span>
            <span className="text-[1rem] leading-relaxed" style={{ ...sans, color: dark ? B.onDark : B.body }}>{p.body}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/** First-time buyer programs as three ruled columns. */
export function ProgramRow() {
  return (
    <>
      <ul className="m-0 p-0 list-none grid md:grid-cols-3">
        {PROGRAMS.map((p, i) => (
          <li key={p.t} className={`py-6 md:py-2 flex flex-col gap-2 ${i > 0 ? "border-t md:border-t-0 md:border-l md:pl-8" : ""} ${i < PROGRAMS.length - 1 ? "md:pr-8" : ""}`} style={{ borderColor: B.line }}>
            <span className="text-[2.75rem] sm:text-[3.25rem] leading-none" style={{ ...serif, color: B.espresso }}>{p.n}</span>
            <h3 className="m-0 text-[1.125rem] font-semibold" style={{ ...sans, color: B.skyDeep }}>{p.t}</h3>
            <p className="m-0 text-[1rem] leading-relaxed" style={{ ...sans, color: B.body }}>{p.b}</p>
          </li>
        ))}
      </ul>
      <p className="m-0 text-[0.9375rem] leading-relaxed" style={{ ...sans, color: B.body }}>
        FHSA and Home Buyers’ Plan limits are per person. Buying with a partner? Each of you can use them.
      </p>
    </>
  );
}

/** FAQ, fully expanded (site rule). */
export function FaqList({ items = FAQ }: { items?: { q: string; a: string }[] }) {
  return (
    <dl className="m-0 flex flex-col">
      {items.map((f) => (
        <div key={f.q} className="py-5 border-t first:border-t-0" style={{ borderColor: B.line }}>
          <dt className="text-[1.125rem] font-semibold" style={{ ...sans, color: B.espresso }}>{f.q}</dt>
          <dd className="m-0 mt-2 text-[1rem] leading-relaxed" style={{ ...sans, color: B.body }}>{f.a}</dd>
        </div>
      ))}
    </dl>
  );
}

export const LICENCE_LINE = "Mortgage Agent Lic. M25003068, Sherwood Mortgage Group";

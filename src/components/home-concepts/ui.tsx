// Server-rendered sections for the homepage concepts. Interactive pieces live in client.tsx.
// Shape spec (anti AI slop review): bands and ruled rows are square, paper and photos 2px,
// buttons 4px, the arch only for Jesse's portrait and the P4 door, circles only for timeline markers and faces.

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { B, GOOGLE_PROFILE_URL, JESSE_EMAIL, serif, sans } from "@/components/home/brand";
import { Stars, STAR_DARK, reviewSummary } from "@/components/landing/kit";
import { FAMILY_WIDE } from "@/data/landing/fthb";
import type { GoogleReviews } from "@/lib/googleReviews";
import { calculateOntarioLTT, calculateTorontoMLTT, formatDollars, getCMHCInsurance, getMinDownPayment } from "@/lib/mortgageFormulas";
import {
  ADDRESS, ANNEX_LINE, CLOSE_LINE, COMPARE, COMPARE_LEAD, CONNECTOR_LINE, CREDENTIALS, DESCRIPTOR, FACTS, PHONE, PROMISES,
  SERVICES, SITUATIONS, STORY, TECH_LINE, TOOLS, type QA, type Quote,
} from "./content";
import { NoteButton, NoteLink, ScheduleButton } from "./client";

/* Layout and type */

export type Tone = "linen" | "white" | "sand" | "sky" | "espresso" | "clay";
const BG: Record<Tone, string> = { linen: B.linen, white: "#FFFFFF", sand: B.sand, sky: B.skyDeep, espresso: B.espresso, clay: B.clay };

/** Standard section padding. */
export const PAD = "py-16 sm:py-20 lg:py-28";

export function Band({ tone = "linen", id, label, labelledBy, className = "", children }: {
  tone?: Tone; id?: string; label?: string; labelledBy?: string; className?: string; children: ReactNode;
}) {
  return (
    <section id={id} aria-label={label} aria-labelledby={labelledBy} className={`px-5 sm:px-8 ${className}`} style={{ background: BG[tone] }}>
      {children}
    </section>
  );
}

export function Wrap({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl ${className}`}>{children}</div>;
}

/** The big line in each hero. A <p>: the H1 carries who, where and for whom (SEO review). */
export function Display({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`m-0 text-[2.625rem] sm:text-[3.5rem] lg:text-[4.5rem] leading-[1.04] ${className}`} style={{ ...serif, fontWeight: 400, color: B.espresso, letterSpacing: "-0.8px" }}>
      {children}
    </p>
  );
}

/** The H1: who, where and for whom, in plain words under the display line. */
export function HeroH1({ children }: { children: ReactNode }) {
  return (
    <h1 className="m-0 text-[1.125rem] sm:text-[1.25rem] leading-[1.55] max-w-xl" style={{ ...sans, fontWeight: 400, color: B.bodyDark }}>
      {children}
    </h1>
  );
}

export function H2({ children, dark = false, id, className = "" }: { children: ReactNode; dark?: boolean; id?: string; className?: string }) {
  return (
    <h2 id={id} className={`m-0 text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] leading-[1.1] ${className}`} style={{ ...serif, fontWeight: 400, color: dark ? B.linen : B.espresso, letterSpacing: "-0.3px" }}>
      {children}
    </h2>
  );
}

export function Body({ children, dark = false, strong = false, className = "" }: { children: ReactNode; dark?: boolean; strong?: boolean; className?: string }) {
  return (
    <p className={`m-0 text-[1.0625rem] leading-[1.65] max-w-[620px] ${className}`} style={{ ...sans, color: dark ? B.onDark : strong ? B.espresso : B.body, fontWeight: strong ? 600 : 400 }}>
      {children}
    </p>
  );
}

export function Caption({ children, dark = false, className = "" }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <p className={`m-0 text-[1rem] leading-snug ${className}`} style={{ ...serif, fontStyle: "italic", color: dark ? B.onDark : B.clayDeep }}>
      {children}
    </p>
  );
}

export function TextLink({ href, children, dark = false }: { href: string; children: ReactNode; dark?: boolean }) {
  return (
    <Link
      href={href}
      className={`self-start inline-flex items-center min-h-[48px] text-[1rem] font-semibold underline underline-offset-4 decoration-[1.5px] transition-colors duration-150 ${dark ? "text-[#F5EFE8] hover:text-[#9DB6C3]" : "text-[#352B26] hover:text-[#4F6B7A]"}`}
      style={sans}
    >
      {children}
    </Link>
  );
}

/** Stars and the live review count, linking to Jesse's Google profile. */
export function GoogleLine({ google, dark = false }: { google: GoogleReviews; dark?: boolean }) {
  return (
    <a
      href={GOOGLE_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="self-start inline-flex items-center gap-2.5 min-h-[48px] text-[0.9375rem] font-semibold underline-offset-4 hover:underline"
      style={{ ...sans, color: dark ? "#FFFFFF" : B.espresso }}
    >
      <Stars colour={dark ? STAR_DARK : undefined} />
      <span>{reviewSummary(google)}</span>
    </a>
  );
}

function LockIcon({ dark = false }: { dark?: boolean }) {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={dark ? B.skyLight : B.skyDeep} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-[3px]">
      <rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

/** Cost and consent, Jesse's two reassurances (approved landing page wording). */
export function Reassure({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <p className={`m-0 flex gap-2 text-[0.9375rem] leading-snug max-w-md ${className}`} style={{ ...sans, color: dark ? B.onDark : B.body }}>
      <LockIcon dark={dark} />
      <span>On most mortgages there is no cost to you, and your credit stays untouched until you give the OK.</span>
    </p>
  );
}

/** Primary button, then "Start the conversation" as a quiet link. */
export function CtaPair({ id, dark = false, help }: { id?: string; dark?: boolean; help?: string }) {
  return (
    <div id={id} className="flex flex-col sm:items-start gap-1">
      <ScheduleButton tone={dark ? "clay" : "espresso"} help={help} />
      <p className="m-0 flex flex-wrap items-center gap-x-1.5 text-[1rem]" style={{ ...sans, color: dark ? B.onDark : B.body }}>
        Not ready for a call? <NoteLink dark={dark} />
      </p>
    </div>
  );
}

/** Jesse's sunlit headshot in the arch (the only arch on the page besides the P4 door), standing on a threshold line. */
export function ArchPortrait({ priority = false, className = "", imgClass = "w-[220px] h-[275px] sm:w-[280px] sm:h-[350px] lg:w-[360px] lg:h-[450px]", sizes = "(min-width: 1024px) 360px, (min-width: 640px) 280px, 220px", caption }: {
  priority?: boolean; className?: string; imgClass?: string; sizes?: string; caption?: ReactNode;
}) {
  return (
    <figure className={`m-0 flex flex-col items-center ${className}`}>
      <Image
        src="/jesse-hero-arch.jpg"
        alt="Jesse Karkoukly, Toronto mortgage agent"
        width={1000}
        height={1250}
        priority={priority}
        sizes={sizes}
        className={`${imgClass} object-cover`}
        style={{ borderRadius: "999px 999px 0 0" }}
      />
      <span aria-hidden="true" className="block h-px w-[calc(100%+3rem)] max-w-full" style={{ background: B.espresso }} />
      {caption && <figcaption className="mt-3 text-center text-[0.9375rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>{caption}</figcaption>}
    </figure>
  );
}

/* The P4 door, drawn from the logo: six slats, sky to espresso on light, clay to linen on dark. */

const P4_LIGHT = ["#BAC5C9", "#9FA6A8", "#858788", "#6A6967", "#504A47", "#352B26"];
const P4_DARK = ["#BAA294", "#C7B2A5", "#D1C0B6", "#DED1C6", "#E8E0D7", "#F5EFE8"];
const P4_X = [4, 9.75, 15.5, 21.25, 27, 32.75];

export function P4Door({ width = 44, dark = false }: { width?: number; dark?: boolean }) {
  const id = dark ? "jkc-p4-dark" : "jkc-p4-light";
  const colours = dark ? P4_DARK : P4_LIGHT;
  return (
    <svg width={width} height={(width * 64) / 40} viewBox="0 0 40 64" aria-hidden="true">
      <defs><clipPath id={id}><path d="M4 62V20a16 16 0 0 1 32 0v42z" /></clipPath></defs>
      <g clipPath={`url(#${id})`}>
        {P4_X.map((x, k) => <rect key={x} x={x} y="0" width="3.25" height="64" fill={colours[k]} />)}
      </g>
    </svg>
  );
}

/* Reviews */

function GoogleG({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11.8c-.5 2.8-2.1 5.1-4.4 6.7v5.5h7.1c4.2-3.8 6.6-9.5 6.6-16.2z" />
      <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-7.1-5.5c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-9H4.5v5.7C8.1 41.1 15.5 46 24 46z" />
      <path fill="#FBBC05" d="M11.8 28.3c-.4-1.3-.7-2.8-.7-4.3s.3-3 .7-4.3V14H4.5C3 17 2.2 20.4 2.2 24s.8 7 2.3 10l7.3-5.7z" />
      <path fill="#EA4335" d="M24 10.7c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.2 29.9 2 24 2 15.5 2 8.1 6.9 4.5 14l7.3 5.7c1.7-5.2 6.5-9 12.2-9z" />
    </svg>
  );
}

/** A review as a paper note: the exact sentence in Newsreader, the reviewer, a link to the full review on Google. */
export function ReviewNote({ q, big = false }: { q: Quote; big?: boolean }) {
  const tag = q.tag ?? q.review.tag;
  return (
    <figure className="m-0 h-full rounded-[2px] bg-white px-6 py-6 sm:px-7 sm:py-7 flex flex-col gap-4">
      <span role="img" aria-label="5 out of 5 stars" className="self-start"><Stars size={14} /></span>
      <blockquote className={`m-0 ${big ? "text-[1.375rem] sm:text-[1.625rem] leading-[1.32]" : "text-[1.1875rem] sm:text-[1.25rem] leading-[1.4]"}`} style={{ ...serif, color: B.espresso }}>
        “{q.text}”
      </blockquote>
      <figcaption className="mt-auto flex flex-col pt-1" style={sans}>
        <span className="text-[0.9375rem] font-semibold" style={{ color: B.espresso }}>{q.review.name}</span>
        {tag && <span className="text-[0.9375rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>{tag}</span>}
        <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="self-start inline-flex items-center min-h-[48px] -mb-3 text-[0.875rem] underline underline-offset-2 hover:text-[#4F6B7A]" style={{ color: B.body }}>
          Read the full review on Google
        </a>
      </figcaption>
    </figure>
  );
}

/** The sky deep band: other people's words. A swipe row on phones (CLAUDE.md mobile rule), four across on desktop. */
export function ReviewsBand({ google, quotes, heading = "What clients say", id = "reviews" }: { google: GoogleReviews; quotes: Quote[]; heading?: string; id?: string }) {
  return (
    <Band tone="sky" id={id} labelledBy={`${id}-h`} className={PAD}>
      <Wrap className="flex flex-col gap-8 lg:gap-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div className="flex flex-col gap-2">
            <H2 dark id={`${id}-h`}>{heading}</H2>
            <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="self-start inline-flex items-center gap-2.5 min-h-[48px] text-[0.9375rem] font-semibold text-white hover:underline underline-offset-4" style={sans}>
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center"><GoogleG size={18} /></span>
              <Stars colour={STAR_DARK} />
              {reviewSummary(google)}
            </a>
          </div>
          <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="self-start sm:self-auto inline-flex items-center min-h-[48px] text-[0.9375rem] font-semibold text-white underline underline-offset-4 hover:text-[#F5EFE8]" style={sans}>
            See all reviews on Google
          </a>
        </div>
        <ul className="m-0 p-0 list-none flex lg:grid lg:grid-cols-4 gap-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory -mx-5 px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 pb-2 lg:pb-0 [scrollbar-width:thin]">
          {quotes.map((q) => (
            <li key={q.text} className="snap-start shrink-0 w-[84%] sm:w-[46%] lg:w-auto">
              <ReviewNote q={q} />
            </li>
          ))}
        </ul>
      </Wrap>
    </Band>
  );
}

/* Broker vs bank */

export function BankVsBroker({ tone = "white" }: { tone?: Tone }) {
  const cols = "sm:grid-cols-[minmax(0,4fr)_minmax(0,4fr)_minmax(0,5fr)]";
  return (
    <Band tone={tone} labelledBy="compare-h" className={PAD}>
      <Wrap className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 items-start">
        <div className="flex flex-col gap-5">
          <H2 id="compare-h">Why work with a broker instead of your bank?</H2>
          <Body>{COMPARE_LEAD}</Body>
          <Caption>I’m a licensed mortgage agent with Sherwood Mortgage Group, a mortgage brokerage.</Caption>
        </div>
        <div role="table" aria-labelledby="compare-h" className="flex flex-col">
          <div role="row" className={`hidden sm:grid ${cols} gap-6 pb-3 border-b`} style={{ borderColor: B.espresso }}>
            <span role="columnheader"><span className="sr-only">What changes</span></span>
            <span role="columnheader" className="text-[1rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>Your bank</span>
            <span role="columnheader" className="text-[1rem]" style={{ ...serif, fontStyle: "italic", color: B.espresso }}>Working with me</span>
          </div>
          {COMPARE.map((r) => (
            <div role="row" key={r.label} className={`grid grid-cols-2 ${cols} gap-x-6 gap-y-2 py-5 sm:py-6 border-b items-baseline`} style={{ borderColor: B.line }}>
              <span role="rowheader" className="col-span-2 sm:col-span-1 text-[1.25rem] leading-snug" style={{ ...serif, color: B.espresso }}>{r.label}</span>
              <span role="cell" className="flex flex-col gap-0.5">
                <span aria-hidden="true" className="sm:hidden text-[0.875rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>Your bank</span>
                <span className="text-[1rem] leading-snug" style={{ ...sans, color: B.body }}>{r.bank}</span>
              </span>
              <span role="cell" className="flex flex-col gap-0.5">
                <span aria-hidden="true" className="sm:hidden text-[0.875rem]" style={{ ...serif, fontStyle: "italic", color: B.espresso }}>Working with me</span>
                {r.figure && <span className="text-[2.5rem] sm:text-[3rem] leading-none tabular-nums" style={{ ...serif, color: B.espresso }}>{r.figure}</span>}
                <span className="text-[1rem] leading-snug font-semibold" style={{ ...sans, color: B.espresso }}>{r.me}</span>
              </span>
            </div>
          ))}
        </div>
      </Wrap>
    </Band>
  );
}

/* Questions */

/** Fully expanded (site rule), questions as real headings, schema built from the same text (AEO review). */
export function QuestionList({ items, heading = "Common questions", tone = "white" }: { items: QA[]; heading?: string; tone?: Tone }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://jessekarkoukly.com/#faq",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
  return (
    <Band tone={tone} id="faq" labelledBy="faq-h" className={`${PAD} scroll-mt-24`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Wrap className="flex flex-col gap-8 lg:gap-12">
        <div className="flex flex-col gap-2">
          <H2 id="faq-h">{heading}</H2>
          <Caption>Numbers checked October 2026.</Caption>
        </div>
        <div className="flex flex-col border-t" style={{ borderColor: B.line }}>
          {items.map((it) => (
            <div key={it.q} className="grid gap-3 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 py-7 sm:py-8 border-b" style={{ borderColor: B.line }}>
              <h3 className="m-0 text-[1.375rem] sm:text-[1.5rem] leading-[1.3]" style={{ ...serif, fontWeight: 500, color: B.espresso }}>{it.q}</h3>
              <div className="flex flex-col gap-1">
                <Body>{it.a}</Body>
                {it.link && <TextLink href={it.link.href}>{it.link.label}</TextLink>}
              </div>
            </div>
          ))}
        </div>
      </Wrap>
    </Band>
  );
}

/* The short version (concept A) */

export function ShortVersion({ tone = "linen" }: { tone?: Tone }) {
  return (
    <Band tone={tone} labelledBy="short-h" className={PAD}>
      <Wrap className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="flex flex-col gap-4">
          <H2 id="short-h">The short version</H2>
          <Body>What people usually want to know before they call, in one place.</Body>
        </div>
        <dl className="m-0 flex flex-col border-t" style={{ borderColor: B.line }}>
          {FACTS.map((f) => (
            <div key={f.k} className="grid gap-1 sm:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] sm:gap-6 py-5 border-b" style={{ borderColor: B.line }}>
              <dt className="text-[1.0625rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>{f.k}</dt>
              <dd className="m-0 text-[1.0625rem] leading-[1.6]" style={{ ...sans, color: B.espresso }}>{f.v}</dd>
            </div>
          ))}
        </dl>
      </Wrap>
    </Band>
  );
}

/* About: the 2021 story */

function Credentials({ className = "" }: { className?: string }) {
  return (
    <ul className={`m-0 p-0 list-none grid grid-cols-2 gap-x-6 gap-y-4 ${className}`} style={sans}>
      {CREDENTIALS.map((c) => (
        <li key={c.k} className="flex flex-col border-t pt-3" style={{ borderColor: B.line }}>
          <span className="text-[0.9375rem] font-semibold" style={{ color: B.espresso }}>{c.k}</span>
          <span className="text-[0.9375rem]" style={{ color: B.body }}>{c.v}</span>
        </li>
      ))}
    </ul>
  );
}

/** Jesse's real story, word for word from the approved landing page, with the family walk or the arch portrait. */
export function StoryBlock({ tone = "linen", photo = "family", full = true }: { tone?: Tone; photo?: "family" | "arch"; full?: boolean }) {
  return (
    <Band tone={tone} id="about" labelledBy="about-h" className={PAD}>
      {/* Phones read photo, story, credentials. Desktop: photo and credentials on the left, the story on the right. */}
      <Wrap className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:grid-rows-[auto_1fr] items-start">
        <div className="lg:col-start-1 lg:row-start-1">
          {photo === "family" ? (
            <figure className="m-0 flex flex-col gap-3">
              <div className="relative overflow-hidden rounded-[2px] aspect-[16/10]">
                <Image src={FAMILY_WIDE.src} alt={FAMILY_WIDE.alt} fill sizes="(min-width: 1024px) 620px, 100vw" className="object-cover" />
              </div>
              <figcaption className="text-[1rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>Out for a walk with my family.</figcaption>
            </figure>
          ) : (
            <ArchPortrait caption="Jesse Karkoukly, Sherwood Mortgage Group" />
          )}
        </div>
        <div className="flex flex-col gap-5 lg:col-start-2 lg:row-start-1 lg:row-span-2">
          <H2 id="about-h">I learned this the expensive way.</H2>
          {STORY.map((p, i) => <Body key={p} strong={i === 2}>{p}</Body>)}
          {full && <Body>{TECH_LINE}</Body>}
          {full && <Body>{ANNEX_LINE}</Body>}
          <Body>{CONNECTOR_LINE}</Body>
          <div className="flex flex-wrap items-center gap-x-7">
            <TextLink href="/about">More about me</TextLink>
            <NoteLink />
          </div>
        </div>
        <Credentials className="lg:col-start-1 lg:row-start-2" />
      </Wrap>
    </Band>
  );
}

/* Where are you at? (concept A): the visitor's words, Jesse's one-line answer, and every service as a plain link */

export function ServiceIndex({ tone = "white" }: { tone?: Tone }) {
  return (
    <Band tone={tone} labelledBy="where-h" className={PAD}>
      <Wrap className="flex flex-col gap-10">
        <H2 id="where-h">Where are you at?</H2>
        <ul className="m-0 p-0 list-none flex flex-col border-t" style={{ borderColor: B.line }}>
          {SITUATIONS.map((s) => (
            <li key={s.says} className="border-b" style={{ borderColor: B.line }}>
              <Link href={s.href} className="group grid gap-2 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 py-6 sm:py-7">
                <span className="text-[1.375rem] sm:text-[1.625rem] leading-snug transition-colors duration-150 group-hover:text-[#4F6B7A]" style={{ ...serif, color: B.espresso }}>{s.says}</span>
                <span className="flex flex-col gap-2">
                  <span className="text-[1.0625rem] leading-[1.6] max-w-[620px]" style={{ ...sans, color: B.body }}>{s.reply}</span>
                  <span className="text-[0.9375rem] font-semibold underline underline-offset-4 transition-colors duration-150 group-hover:text-[#4F6B7A]" style={{ ...sans, color: B.espresso }}>{s.link}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <AllServices />
      </Wrap>
    </Band>
  );
}

/** Every service page and the main calculators, as plain links. */
export function AllServices() {
  const link = "inline-flex items-center min-h-[44px] text-[0.9375rem] underline-offset-4 hover:underline hover:text-[#4F6B7A] transition-colors duration-150";
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      <p className="m-0 text-[1.125rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>Everything I help with</p>
      <div className="grid gap-x-6 grid-cols-2">
        <ul className="m-0 p-0 list-none flex flex-col" style={sans}>
          {SERVICES.map(([label, href]) => (
            <li key={href}><Link href={href} className={link} style={{ color: B.espresso }}>{label}</Link></li>
          ))}
          <li><Link href="/services" className={`${link} font-semibold`} style={{ color: B.espresso }}>All mortgage services</Link></li>
        </ul>
        <ul className="m-0 p-0 list-none flex flex-col" style={sans}>
          {TOOLS.map(([label, href]) => (
            <li key={href}><Link href={href} className={link} style={{ color: B.espresso }}>{label}</Link></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* Concept B pieces */

// The worked example: a $600,000 home in Toronto, minimum down payment (same math as the approved landing page).
const PRICE = 600000;
const DOWN = getMinDownPayment(PRICE);
const LTT = calculateOntarioLTT(PRICE) + calculateTorontoMLTT(PRICE);
const REBATES = Math.min(calculateOntarioLTT(PRICE), 4000) + Math.min(calculateTorontoMLTT(PRICE), 4475);
const PST = getCMHCInsurance(PRICE, DOWN).pst;
const OTHER = 5000;
export const CASH = DOWN + LTT - REBATES + PST + OTHER;

/** The plan Jesse writes after the first call, as a paper sheet with real Toronto math. The page's one shadow. */
export function PlanSheet({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  const rows: [string, string][] = [
    ["Down payment, the minimum", formatDollars(DOWN)],
    ["Land transfer tax, Ontario and Toronto", formatDollars(LTT)],
    ["First-time buyer rebates", `−${formatDollars(REBATES)}`],
    ["Tax on mortgage insurance", formatDollars(PST)],
    ["Legal fees and other costs, about", formatDollars(OTHER)],
  ];
  const row = "py-3.5 border-b flex items-baseline justify-between gap-4";
  return (
    <figure className={`m-0 rounded-[2px] bg-white border px-6 py-7 sm:px-8 sm:py-8 shadow-[0_24px_60px_-28px_rgba(53,43,38,0.45)] ${className}`} style={{ ...sans, borderColor: B.line }}>
      <div className="flex items-start justify-between gap-4 pb-5 border-b" style={{ borderColor: B.line }}>
        <span className="flex flex-col gap-1">
          <span className={`${compact ? "text-[1.25rem]" : "text-[1.5rem]"} leading-tight`} style={{ ...serif, fontWeight: 500, color: B.espresso }}>Your mortgage plan</span>
          <span className="text-[0.9375rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>Sample: a {formatDollars(PRICE)} home in Toronto</span>
        </span>
        <P4Door width={compact ? 20 : 24} />
      </div>
      <ol className="m-0 p-0 list-none flex flex-col">
        <li className={row} style={{ borderColor: B.line }}>
          <span className="text-[1rem] font-semibold" style={{ color: B.espresso }}>Your number</span>
          <span className="text-[0.9375rem] text-right" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>Worked out on your call</span>
        </li>
        {!compact && (
          <li className={row} style={{ borderColor: B.line }}>
            <span className="text-[1rem] font-semibold" style={{ color: B.espresso }}>Your monthly payment</span>
            <span className="text-[0.9375rem] text-right" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>Options side by side</span>
          </li>
        )}
        <li className="py-3.5 border-b" style={{ borderColor: B.line }}>
          <span className="text-[1rem] font-semibold" style={{ color: B.espresso }}>Your cash for closing day</span>
          {!compact && (
            <dl className="m-0 mt-2.5 flex flex-col gap-1.5">
              {rows.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4">
                  <dt className="text-[0.9375rem]" style={{ color: B.body }}>{k}</dt>
                  <dd className="m-0 text-[0.9375rem] tabular-nums" style={{ color: B.espresso }}>{v}</dd>
                </div>
              ))}
            </dl>
          )}
          <div className={`${compact ? "mt-1.5" : "mt-2 pt-2 border-t"} flex items-baseline justify-between gap-4`} style={{ borderColor: B.line }}>
            <span className="text-[0.9375rem]" style={{ color: B.body }}>Cash you need</span>
            <span className="text-[1.25rem] font-bold tabular-nums" style={{ color: B.espresso }}>{formatDollars(CASH)}</span>
          </div>
        </li>
        <li className="py-3.5 border-b" style={{ borderColor: B.line }}>
          <span className="text-[1rem] font-semibold" style={{ color: B.espresso }}>Your programs</span>
          <span className="mt-2.5 flex flex-wrap gap-2">
            {["FHSA", "Home Buyers’ Plan", "Land transfer tax rebates", "30-year amortization"].slice(0, compact ? 3 : 4).map((t) => (
              <span key={t} className="rounded-full px-3 py-1 text-[0.8125rem]" style={{ background: B.linen, color: B.espresso }}>{t}</span>
            ))}
          </span>
        </li>
        {!compact && (
          <li className="pt-3.5">
            <span className="text-[1rem] font-semibold" style={{ color: B.espresso }}>Your next steps</span>
            <ul className="m-0 mt-2.5 p-0 list-none flex flex-col gap-1.5 text-[0.9375rem]" style={{ color: B.body }}>
              <li>Open your FHSA this year, so the room starts building.</li>
              <li>Get pre-approved before you book showings.</li>
            </ul>
          </li>
        )}
      </ol>
      <figcaption className="mt-5 text-[1.125rem]" style={{ ...serif, fontStyle: "italic", color: B.espresso }}>Jesse</figcaption>
    </figure>
  );
}

/** "What brings you here?" (concept B): the two niches as large tiles, everything else as plain links. */
export function NicheTiles({ tone = "white" }: { tone?: Tone }) {
  const tiles = [
    {
      t: "Buying your first home",
      b: "What you can afford, the cash you need on closing day and the programs you can use, worked out before you fall for a home.",
      links: [["First-time buyers", "/services/first-time-buyers"], ["What will my closing costs be?", "/calculators/closing-costs"]],
    },
    {
      t: "Self-employed",
      b: "Lenders read self-employed income differently, and some read it far better than others. I’ll tell you honestly where you stand before asking for a single document.",
      links: [["Self-employed mortgages", "/services/self-employed"], ["Mortgages on dividend income", "/blog/self-employed-dividends-mortgage"]],
    },
  ];
  return (
    <Band tone={tone} labelledBy="niche-h" className={PAD}>
      <Wrap className="flex flex-col gap-10">
        <H2 id="niche-h">What brings you here?</H2>
        <div className="grid gap-4 md:grid-cols-2">
          {tiles.map((x) => (
            <div key={x.t} className="rounded-[2px] p-7 sm:p-10 flex flex-col gap-4" style={{ background: B.linen }}>
              <h3 className="m-0 text-[1.75rem] sm:text-[2rem] leading-[1.15]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>{x.t}</h3>
              <p className="m-0 text-[1.0625rem] leading-[1.65]" style={{ ...sans, color: B.body }}>{x.b}</p>
              <div className="flex flex-wrap gap-x-7 mt-auto">
                {x.links.map(([l, h]) => <TextLink key={h} href={h}>{l}</TextLink>)}
              </div>
            </div>
          ))}
        </div>
        <AllServices />
      </Wrap>
    </Band>
  );
}

function Tick({ dark = false }: { dark?: boolean }) {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={dark ? B.skyLight : B.skyDeep} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-[5px]">
      <path d="M3 9.5 7 13l8-8.5" />
    </svg>
  );
}

/** Jesse's promises, as a ruled list. */
export function PromiseList({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <p className="m-0 pb-3 text-[1.25rem]" style={{ ...serif, color: B.espresso }}>My promises to you</p>
      <ul className="m-0 p-0 list-none flex flex-col border-t" style={{ borderColor: B.espresso }}>
        {PROMISES.map((p) => (
          <li key={p} className="flex gap-3 py-4 border-b text-[1.0625rem] leading-snug" style={{ ...sans, color: B.espresso, borderColor: "#D9CCBF" }}><Tick />{p}</li>
        ))}
      </ul>
    </div>
  );
}

/** One dark band mid-page (concept B): self-employed, with Syed's story in his own words. */
export function SelfEmployedBand({ quote }: { quote: Quote }) {
  return (
    <Band tone="espresso" labelledBy="se-h" className={PAD}>
      <Wrap className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
        <div className="flex flex-col gap-5">
          <H2 dark id="se-h">Self-employed doesn’t mean unqualified.</H2>
          <Body dark>Lenders look at your personal tax returns from the last two years, not your company’s books. Most average the two years, and money left in your company doesn’t count at most banks.</Body>
          <Body dark>Some lenders read self-employed income differently, and matching you with the right one is a big part of what I do.</Body>
          <div className="flex flex-col sm:flex-row sm:items-center gap-x-7 gap-y-1 pt-1">
            <ScheduleButton tone="clay" help="I'm self-employed" />
            <TextLink href="/blog/self-employed-dividends-mortgage" dark>How lenders read dividend income</TextLink>
          </div>
        </div>
        <figure className="m-0 rounded-[2px] p-7 sm:p-9 flex flex-col gap-4" style={{ background: B.linen }}>
          <p className="m-0 text-[1rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>When the bank says no</p>
          <blockquote className="m-0 text-[1.375rem] sm:text-[1.5rem] leading-[1.35]" style={{ ...serif, color: B.espresso }}>“{quote.text}”</blockquote>
          <figcaption className="flex flex-col gap-0.5" style={sans}>
            <span className="text-[0.9375rem] font-semibold" style={{ color: B.espresso }}>{quote.review.name}</span>
            <span className="text-[0.9375rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>{quote.tag ?? quote.review.tag}, on Google</span>
          </figcaption>
        </figure>
      </Wrap>
    </Band>
  );
}

/* Concept C pieces */

/** For realtors: Ephy's words, and how to reach Jesse. */
export function RealtorBlock({ quote, tone = "white" }: { quote: Quote; tone?: Tone }) {
  return (
    <Band tone={tone} labelledBy="realtor-h" className={PAD}>
      <Wrap className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 items-start">
        <div className="flex flex-col gap-4">
          <H2 id="realtor-h">Working with a buyer who needs a mortgage?</H2>
          <Body>Call or text me at {PHONE.display}, or email {JESSE_EMAIL}.</Body>
          <div className="flex flex-wrap gap-x-7">
            <a href={PHONE.tel} className="inline-flex items-center min-h-[48px] text-[1rem] font-semibold underline underline-offset-4 hover:text-[#4F6B7A]" style={{ ...sans, color: B.espresso }}>Call or text</a>
            <a href={`mailto:${JESSE_EMAIL}`} className="inline-flex items-center min-h-[48px] text-[1rem] font-semibold underline underline-offset-4 hover:text-[#4F6B7A]" style={{ ...sans, color: B.espresso }}>Email me</a>
          </div>
        </div>
        <figure className="m-0 flex flex-col gap-4 border-l-2 pl-6 sm:pl-8" style={{ borderColor: B.skyDeep }}>
          <blockquote className="m-0 text-[1.5rem] sm:text-[1.875rem] leading-[1.3]" style={{ ...serif, color: B.espresso }}>“{quote.text}”</blockquote>
          <figcaption className="flex flex-col gap-0.5" style={sans}>
            <span className="text-[0.9375rem] font-semibold" style={{ color: B.espresso }}>{quote.review.name}</span>
            <span className="text-[0.9375rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>{quote.review.tag}, on Google</span>
          </figcaption>
        </figure>
      </Wrap>
    </Band>
  );
}

/* The close and the footer facts */

/** One ending: "Every door, walked through together." Espresso joins the footer; clay is the current band. */
export function CloseBand({ tone = "espresso" }: { tone?: "espresso" | "clay" }) {
  const dark = tone === "espresso";
  return (
    <Band tone={tone} label="Get in touch" className="py-20 sm:py-28 lg:py-32">
      <Wrap className="flex flex-col items-center text-center gap-7">
        {dark ? <P4Door width={56} dark /> : <Image src="/brand/p4-on-clay.png" alt="" width={186} height={200} className="w-[72px] h-auto" />}
        <p className="m-0 max-w-3xl text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: dark ? B.linen : "#FFFFFF" }}>
          Every door, walked through together.
        </p>
        {dark && <p className="m-0 max-w-xl text-[1.0625rem] leading-[1.65]" style={{ ...sans, color: B.onDark }}>{CLOSE_LINE}</p>}
        <div id="close-cta" className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 w-full sm:w-auto">
          <ScheduleButton tone={dark ? "clay" : "espresso"} />
          {dark ? <NoteLink dark /> : <NoteButton tone="linen" />}
        </div>
        {dark && (
          <a href={PHONE.tel} className="inline-flex items-center min-h-[48px] text-[0.9375rem] underline underline-offset-4 hover:text-[#9DB6C3]" style={{ ...sans, color: B.onDark }}>
            Call or text {PHONE.display}
          </a>
        )}
      </Wrap>
    </Band>
  );
}

/** The descriptor and address above the footer, on every page (SEO and GEO reviews). */
export function FooterFacts() {
  return (
    <div className="px-6 pt-12" style={{ background: B.espresso }}>
      <div className="max-w-7xl mx-auto flex flex-col gap-2 pb-8 border-b" style={{ borderColor: "#4A3E37" }}>
        <p className="m-0 max-w-3xl text-[1.0625rem] leading-relaxed" style={{ ...serif, color: B.linen }}>{DESCRIPTOR}</p>
        <p className="m-0 text-[0.875rem] leading-relaxed" style={{ ...sans, color: B.onDark }}>
          {ADDRESS}
          <span aria-hidden="true"> · </span>
          <a href={PHONE.tel} className="hover:text-white">{PHONE.display}</a>
          <span aria-hidden="true"> · </span>
          <a href={`mailto:${JESSE_EMAIL}`} className="hover:text-white">{JESSE_EMAIL}</a>
        </p>
      </div>
    </div>
  );
}

/** Corrected schema (SEO review): no dropped affiliation, no "free" price, the real headshot, linked by @id. */
export function ConceptJsonLd() {
  const sameAs = ["https://www.linkedin.com/in/jessekarkoukly", "https://www.instagram.com/jkarkoukly/", "https://medium.com/@jessekarkoukly"];
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://jessekarkoukly.com/#website",
        url: "https://jessekarkoukly.com/",
        name: "Jesse Karkoukly",
        alternateName: ["Jesse Karkoukly, Mortgage Agent", "jessekarkoukly.com"],
        inLanguage: "en-CA",
        publisher: { "@id": "https://jessekarkoukly.com/#jesse" },
      },
      {
        "@type": "FinancialService",
        "@id": "https://jessekarkoukly.com/#business",
        name: "Jesse Karkoukly, Mortgage Agent",
        description: DESCRIPTOR,
        url: "https://jessekarkoukly.com/",
        telephone: "+1-416-276-2666",
        email: JESSE_EMAIL,
        image: "https://jessekarkoukly.com/jesse-hero-arch.jpg",
        logo: "https://jessekarkoukly.com/icon-512.png",
        address: { "@type": "PostalAddress", streetAddress: "390 Dupont St Ste 201", addressLocality: "Toronto", addressRegion: "ON", postalCode: "M5R 1V9", addressCountry: "CA" },
        geo: { "@type": "GeoCoordinates", latitude: 43.6697, longitude: -79.4043 },
        areaServed: [{ "@type": "City", name: "Toronto" }, { "@type": "State", name: "Ontario" }],
        founder: { "@id": "https://jessekarkoukly.com/#jesse" },
        parentOrganization: { "@id": "https://jessekarkoukly.com/#sherwood" },
        sameAs: [GOOGLE_PROFILE_URL, ...sameAs],
      },
      {
        "@type": "Person",
        "@id": "https://jessekarkoukly.com/#jesse",
        name: "Jesse Karkoukly",
        jobTitle: "Mortgage Agent",
        description: DESCRIPTOR,
        image: "https://jessekarkoukly.com/jesse-hero-arch.jpg",
        worksFor: { "@id": "https://jessekarkoukly.com/#sherwood" },
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "license",
          name: "Mortgage Agent Level 1, Lic. M25003068",
          recognizedBy: { "@type": "Organization", name: "Financial Services Regulatory Authority of Ontario", url: "https://www.fsrao.ca" },
        },
        knowsAbout: ["First-time home buyer mortgages", "Self-employed mortgages", "Mortgage pre-approval", "Mortgage renewal and refinancing", "Toronto real estate"],
        areaServed: { "@type": "State", name: "Ontario" },
        url: "https://jessekarkoukly.com",
        telephone: "+1-416-276-2666",
        email: JESSE_EMAIL,
        sameAs,
      },
      {
        "@type": "Organization",
        "@id": "https://jessekarkoukly.com/#sherwood",
        name: "Sherwood Mortgage Group",
        url: "https://sherwoodmortgagegroup.com",
        identifier: { "@type": "PropertyValue", propertyID: "FSRA brokerage licence", value: "12176" },
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}

/** Preview only: which concept this is, and the way back to all three. */
export function PreviewTag({ letter, name }: { letter: string; name: string }) {
  return (
    <Link
      href="/preview/home"
      className="hidden lg:inline-flex fixed left-5 bottom-5 z-40 items-center gap-2 rounded-[4px] border px-3.5 min-h-[40px] text-[0.8125rem] font-semibold bg-white/95 backdrop-blur hover:text-[#4F6B7A]"
      style={{ ...sans, color: B.espresso, borderColor: B.line }}
    >
      Concept {letter}: {name}. See all three
    </Link>
  );
}

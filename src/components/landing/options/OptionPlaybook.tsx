// The Playbook opt-in (/lp/first-time-buyers/playbook), published October 25, 2026 for separate ads. Sabri Suby's high-value content offer for the 97% who aren't ready to talk yet:
// a genuinely useful Ontario playbook for first name and email, opened right away, with the plan form at the end.
// Lower-intent leads than the plan page, so it fires its own Meta event instead of landing on /thank-you.

import Image from "next/image";
import { B, serif, sans } from "@/components/home/brand";
import PlaybookCover from "@/components/landing/PlaybookCover";
import PlaybookOptin from "@/components/landing/PlaybookOptin";
import { CheckDot, GoogleSummary, LandingFrame, QuoteCard } from "@/components/landing/kit";
import { LandingExtras, ScrollButton } from "@/components/landing/kit-client";
import { REVIEWS } from "@/data/landing/fthb";
import type { GoogleReviews } from "@/lib/googleReviews";
import { calculateOntarioLTT, calculateTorontoMLTT, formatDollars, getMinDownPayment } from "@/lib/mortgageFormulas";

export const CHAPTERS = [
  { id: "costs", t: "What your first home really costs", b: "Every dollar of cash you need on closing day, worked out on a $600,000 Toronto home." },
  { id: "programs", t: "The programs that stretch your savings", b: "FHSA, Home Buyers’ Plan, land transfer tax refunds, and how couples double them." },
  { id: "pre-approval", t: "Getting pre-approved", b: "The four documents to start with, and what lenders look at." },
  { id: "offer-to-keys", t: "From offer to keys", b: "What happens between a signed offer and closing day, step by step." },
  { id: "mistakes", t: "The mistakes that cost money", b: "Including the one I made on my first home." },
];

const FOR_YOU = [
  "You’re a year or two out and want to start right.",
  "You’ve started saving and wonder if it’s enough.",
  "You’re self-employed and not sure how lenders see your income.",
  "You want to understand the process before you talk to anyone.",
];

function PagePreview() {
  const price = 600000;
  const ontario = calculateOntarioLTT(price);
  const toronto = calculateTorontoMLTT(price);
  const rows: [string, string][] = [
    ["Down payment", formatDollars(getMinDownPayment(price))],
    ["Ontario land transfer tax", formatDollars(ontario)],
    ["Ontario first-time buyer refund", `−${formatDollars(Math.min(ontario, 4000))}`],
    ["Toronto land transfer tax", formatDollars(toronto)],
    ["Toronto first-time buyer rebate", `−${formatDollars(Math.min(toronto, 4475))}`],
  ];
  return (
    <div className="relative">
      <div className="relative rounded-[10px] bg-white px-6 pt-7 pb-24 sm:px-9 sm:pt-9 shadow-[0_24px_60px_-30px_rgba(53,43,38,0.45)] overflow-hidden" aria-hidden="true">
        <p className="m-0 text-[0.9375rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>Chapter 1</p>
        <p className="m-0 mt-1 text-[1.625rem] leading-tight" style={{ ...serif, fontWeight: 500, color: B.espresso }}>What your first home really costs</p>
        <p className="m-0 mt-4 text-[1.0625rem] leading-relaxed" style={{ ...serif, color: B.bodyDark }}>Take a $600,000 home in Toronto, bought with the minimum down payment. Here’s every dollar of cash you need on closing day.</p>
        <dl className="m-0 mt-5 flex flex-col gap-2" style={sans}>
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4 pb-2 border-b" style={{ borderColor: B.line }}>
              <dt className="text-[0.9375rem]" style={{ color: B.body }}>{k}</dt>
              <dd className="m-0 text-[0.9375rem] tabular-nums font-semibold" style={{ color: B.espresso }}>{v}</dd>
            </div>
          ))}
        </dl>
        <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0), #FFFFFF 70%)" }} />
      </div>
      <div className="absolute inset-x-0 bottom-6 flex justify-center">
        <ScrollButton target="playbook-hero" compact>Keep reading</ScrollButton>
      </div>
    </div>
  );
}

export default function OptionPlaybook({ google }: { google: GoogleReviews }) {
  const [guzzi, marshello, syed] = REVIEWS;
  const paola = REVIEWS.find((r) => r.name === "Paola Santiago")!;
  return (
    <LandingFrame extras={<LandingExtras sticky={{ label: "Get the playbook", target: "playbook-hero", hideWhen: ["playbook-hero", "playbook-final"] }} />}>
      {/* 1. Hero: the offer, two fields, and the playbook itself */}
      <section className="px-5 sm:px-6 pt-6 sm:pt-10 lg:pt-16 pb-12 lg:pb-20 overflow-hidden">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 items-center">
          <div className="flex flex-col gap-4 sm:gap-5">
            <p className="m-0 text-[1rem] sm:text-[1.0625rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>For first-time buyers in Ontario</p>
            <h1 className="m-0 text-[2.25rem] sm:text-[3.25rem] lg:text-[3.875rem] leading-[1.04]" style={{ ...serif, fontWeight: 400, color: B.espresso, letterSpacing: "-0.5px" }}>
              The first-time buyer playbook I wish I’d had.
            </h1>
            <p className="m-0 text-[1.0625rem] sm:text-[1.25rem] leading-relaxed max-w-xl" style={{ ...sans, color: B.body }}>
              Every cost, every program and every step from savings to keys, written for Ontario buyers in 2026. Read it tonight. Call me when you’re ready.
            </p>
            <div className="mt-1 max-w-xl">
              <PlaybookOptin id="playbook-hero" />
            </div>
            <GoogleSummary google={google} />
          </div>
          <div className="flex justify-center lg:justify-end pr-3">
            <div className="hidden sm:block"><PlaybookCover width={340} priority /></div>
            <div className="sm:hidden"><PlaybookCover width={230} tilt={false} /></div>
          </div>
        </div>
      </section>

      {/* 2. What's inside */}
      <section className="bg-white px-5 sm:px-6 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          <div className="flex flex-col gap-7">
            <h2 className="m-0 text-[2.125rem] sm:text-[2.75rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>What’s inside</h2>
            <ol className="m-0 p-0 list-none flex flex-col">
              {CHAPTERS.map((c, i) => (
                <li key={c.id} className="py-5 border-t first:border-t-0 first:pt-0 grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3" style={{ borderColor: B.line }}>
                  <span className="text-[1.75rem] leading-none pt-0.5" style={{ ...serif, color: B.skyDeep }}>{i + 1}</span>
                  <span className="flex flex-col gap-1">
                    <span className="text-[1.25rem] sm:text-[1.375rem] leading-snug" style={{ ...serif, fontWeight: 500, color: B.espresso }}>{c.t}</span>
                    <span className="text-[1rem] leading-relaxed" style={{ ...sans, color: B.body }}>{c.b}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col gap-4 lg:pt-16">
            <p className="m-0 text-[1rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>A look at the first page</p>
            <PagePreview />
          </div>
        </div>
      </section>

      {/* 3. Who it's for */}
      <section className="px-5 sm:px-6 py-16 lg:py-20" style={{ background: B.linen }}>
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 items-start">
          <h2 className="m-0 text-[2.125rem] sm:text-[2.75rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>It’s for you if…</h2>
          <div className="flex flex-col gap-7">
            <ul className="m-0 p-0 list-none flex flex-col gap-4">
              {FOR_YOU.map((t) => (
                <li key={t} className="flex gap-3.5 text-[1.125rem] sm:text-[1.25rem] leading-snug" style={{ ...sans, color: B.espresso }}><CheckDot />{t}</li>
              ))}
            </ul>
            <div><ScrollButton target="playbook-hero">Get the playbook</ScrollButton></div>
          </div>
        </div>
      </section>

      {/* 4. Reviews: Guzzi and Marshello big, then Syed and Paola */}
      <section className="px-5 sm:px-6 py-16 lg:py-20" style={{ background: B.skyDeep }}>
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="m-0 text-[2rem] sm:text-[2.5rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: B.white }}>In their words</h2>
            <GoogleSummary google={google} dark />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <QuoteCard review={guzzi} big />
            <QuoteCard review={marshello} big />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <QuoteCard review={syed} />
            <QuoteCard review={paola} />
          </div>
        </div>
      </section>

      {/* 5. The author */}
      <section className="bg-white px-5 sm:px-6 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-14 items-center">
          <div className="relative overflow-hidden rounded-[22px] aspect-[3/4] w-full max-w-[340px] mx-auto">
            <Image src="/blog/self-employed-dividends-mortgage/jesse-family-walk.jpg" alt="Jesse out for a walk with his baby" fill sizes="(min-width: 768px) 340px, 90vw" className="object-cover" />
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="m-0 text-[2rem] sm:text-[2.5rem] leading-[1.12]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>Written by Jesse Karkoukly</h2>
            <p className="m-0 text-[1.0625rem] leading-relaxed" style={{ ...sans, color: B.body }}>
              I’m a Toronto mortgage agent with Sherwood Mortgage Group. I came to mortgages after a decade in tech, and I work mostly with first-time buyers and self-employed people across Ontario.
            </p>
            <p className="m-0 text-[1.0625rem] leading-relaxed" style={{ ...sans, color: B.body }}>
              I wrote this because my own first purchase was a blur. You deserve to walk in prepared.
            </p>
            <p className="m-0 text-[0.9375rem]" style={{ ...sans, color: B.body }}>Mortgage Agent Lic. M25003068, Sherwood Mortgage Group</p>
          </div>
        </div>
      </section>

      {/* 6. Close: the form again */}
      <section className="px-5 sm:px-6 py-16 lg:py-24" style={{ background: B.espresso }}>
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col gap-5">
            <h2 className="m-0 text-[2.25rem] sm:text-[3rem] leading-[1.08]" style={{ ...serif, fontWeight: 400, color: B.linen }}>Read it tonight.</h2>
            <p className="m-0 text-[1.125rem] leading-relaxed" style={{ ...sans, color: B.onDark }}>Five short chapters. Real numbers, plain words, written for Ontario in 2026.</p>
            <GoogleSummary google={google} dark />
          </div>
          <div className="rounded-[22px] p-5 sm:p-7" style={{ background: "#3E332D" }}>
            <PlaybookOptin id="playbook-final" dark />
          </div>
        </div>
      </section>
    </LandingFrame>
  );
}

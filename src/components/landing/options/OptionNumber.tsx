"use client";

// Option B: "See how far your savings go". Value first: a real number in seconds, before any form.
// Cash side only (down payment, land transfer tax after rebates, tax on mortgage insurance, closing costs),
// so there are no rates on the page. The full number (what a lender will lend) is the offer.

import Image from "next/image";
import { useState } from "react";
import { B, GOOGLE_PROFILE_URL, serif, sans } from "@/components/home/brand";
import SavingsCalculator, { priceLabel, startFullNumber } from "@/components/landing/SavingsCalculator";
import { CheckDot, FAMILY_PHOTO, FAMILY_WIDE, FaqList, GoogleSummary, LockLine, ProofStrip, QuoteCard } from "@/components/landing/kit";
import { CtaButton, LandingExtras, TalkFirst, scrollToId } from "@/components/landing/kit-client";
import { cashNeeded, maxPrice } from "@/components/landing/savingsMath";
import { FAQ, REVIEWS } from "@/data/landing/fthb";
import type { GoogleReviews } from "@/lib/googleReviews";
import { formatDollars } from "@/lib/mortgageFormulas";

const ADDS = [
  { t: "What a lender will lend you", b: "Your income, debts and credit decide this half. I check it against 50+ lenders." },
  { t: "Your monthly payment", b: "A few options side by side, so you can pick what feels comfortable." },
  { t: "Programs that stretch your savings", b: "FHSA, Home Buyers’ Plan and the rebates, and how to stack them." },
  { t: "Your next steps", b: "What to do now, and when pre-approval makes sense." },
];

const FAQ_B = [FAQ[0], FAQ[1], FAQ[4], FAQ[2]];

export default function OptionNumber({ google }: { google: GoogleReviews }) {
  const [savings, setSavings] = useState(50000);
  const [toronto, setToronto] = useState(true);
  const [step, setStep] = useState(-1);

  const open = () => {
    if (step === -1) startFullNumber(setStep);
    scrollToId("calc");
  };

  const price = maxPrice(savings, toronto);
  const c = cashNeeded(price, toronto);
  const showMath = savings > 0 && price >= 100000;
  const insured = c.insurancePremium > 0;

  return (
    <>
      <LandingExtras sticky={{ label: "Get my full number", target: "calc", hideWhen: ["calc"], onClick: open }} />
      {/* 1. Hero: the calculator is the first thing to do */}
      <section className="px-5 sm:px-6 pt-6 sm:pt-10 lg:pt-14 pb-10 lg:pb-14">
        <div className="max-w-6xl mx-auto grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14 items-start">
          <div className="flex flex-col gap-3.5 sm:gap-5 lg:pt-4">
            <p className="m-0 text-[1rem] sm:text-[1.0625rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>For first-time buyers in Ontario</p>
            <h1 className="m-0 text-[2.25rem] sm:text-[3.25rem] lg:text-[3.875rem] leading-[1.04]" style={{ ...serif, fontWeight: 400, color: B.espresso, letterSpacing: "-0.5px" }}>
              See how far your savings go.
            </h1>
            <p className="m-0 sm:hidden text-[1.0625rem] leading-relaxed" style={{ ...sans, color: B.body }}>
              Type in what you’ve saved. See the most home it can cover on closing day.
            </p>
            <p className="m-0 hidden sm:block text-[1.25rem] leading-relaxed max-w-xl" style={{ ...sans, color: B.body }}>
              I’m Jesse, a Toronto mortgage agent. Type in what you’ve saved and see the most home it can cover once the down payment, land transfer tax and closing costs are paid.
            </p>
            <div className="hidden lg:block"><GoogleSummary google={google} /></div>
            <div className="hidden lg:block relative overflow-hidden rounded-[22px] aspect-[4/3] mt-3">
              <Image src={FAMILY_WIDE.src} alt={FAMILY_WIDE.alt} fill sizes="(min-width: 1024px) 540px, 1px" className="object-cover" />
            </div>
          </div>
          <div id="calc" className="scroll-mt-24 rounded-[24px] bg-white p-5 sm:p-8 shadow-[0_18px_50px_-24px_rgba(53,43,38,0.35)]">
            <SavingsCalculator savings={savings} setSavings={setSavings} toronto={toronto} setToronto={setToronto} step={step} setStep={setStep} openFlow={open} />
          </div>
          <div className="lg:hidden"><GoogleSummary google={google} /></div>
        </div>
      </section>

      {/* 2. Proof */}
      <section className="px-5 sm:px-6 pb-14 lg:pb-16">
        <ProofStrip className="max-w-6xl mx-auto" />
      </section>

      {/* 3. Show the math, for the numbers on screen */}
      {showMath && (
        <section className="bg-white px-5 sm:px-6 py-16 lg:py-20">
          <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <div className="flex flex-col gap-4">
              <h2 className="m-0 text-[2.125rem] sm:text-[2.75rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>How I worked that out</h2>
              <p className="m-0 text-[1.0625rem] leading-relaxed" style={{ ...sans, color: B.body }}>
                The same math I walk clients through, for a {priceLabel(price)} home {toronto ? "in Toronto" : "in Ontario, outside Toronto"}.
              </p>
            </div>
            <div className="flex flex-col" style={sans}>
              {[
                {
                  t: "Down payment",
                  v: formatDollars(c.down),
                  b: price >= 1500000
                    ? "Homes priced at $1.5 million or more need 20% down."
                    : "The minimum is 5% of the first $500,000 and 10% of the part above it. Homes priced at $1.5 million or more need 20%.",
                },
                {
                  t: "Land transfer tax, after rebates",
                  v: formatDollars(c.lttNet),
                  b: `${formatDollars(c.lttGross)} in tax, minus ${formatDollars(c.rebates)} in first-time buyer rebates. ${toronto ? "Toronto charges its own tax on top of Ontario’s. First-time buyers get up to $4,000 back from Ontario and up to $4,475 from Toronto." : "First-time buyers get up to $4,000 back from Ontario."}`,
                },
                {
                  t: "Tax on mortgage insurance",
                  v: formatDollars(c.insuranceTax),
                  b: insured
                    ? `With less than 20% down, your mortgage needs insurance. The ${formatDollars(c.insurancePremium)} premium is added to your mortgage, but Ontario’s 8% tax on it is paid in cash on closing day.`
                    : "With 20% down, your mortgage doesn’t need insurance, so there’s no tax to pay.",
                },
                { t: "Legal fees and other costs", v: `About ${formatDollars(c.other)}`, b: "Your lawyer, title insurance and the usual closing adjustments." },
              ].map((r) => (
                <div key={r.t} className="py-5 border-t first:border-t-0 first:pt-0 flex flex-col gap-1.5" style={{ borderColor: B.line }}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[1.125rem] font-semibold" style={{ color: B.espresso }}>{r.t}</span>
                    <span className="text-[1.125rem] font-semibold tabular-nums" style={{ color: B.espresso }}>{r.v}</span>
                  </div>
                  <p className="m-0 text-[1rem] leading-relaxed" style={{ color: B.body }}>{r.b}</p>
                </div>
              ))}
              <div className="pt-5 border-t-2 flex items-baseline justify-between gap-4" style={{ borderColor: B.espresso }}>
                <span className="text-[1.125rem] font-bold" style={{ color: B.espresso }}>Cash you need</span>
                <span className="text-[1.25rem] font-bold tabular-nums" style={{ color: B.espresso }}>{formatDollars(c.total)} of your {formatDollars(savings)}</span>
              </div>
              <p className="m-0 mt-5 text-[0.875rem] leading-relaxed" style={{ color: B.body }}>
                An estimate. It assumes the minimum down payment, a 25-year amortization and that you qualify as a first-time buyer. Your lender, your lawyer and the final price decide the exact numbers.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 4. What the full plan adds */}
      <section className="px-5 sm:px-6 py-16 lg:py-20" style={{ background: B.linen }}>
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
          <div className="flex flex-col gap-5">
            <h2 className="m-0 text-[2.125rem] sm:text-[2.75rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>Your savings are half the answer.</h2>
            <p className="m-0 text-[1.125rem] leading-relaxed" style={{ ...sans, color: B.body }}>
              The other half is what a lender will lend you. On one call, I work out your full number and write it all down for you.
            </p>
            <div className="flex flex-col gap-3 pt-1">
              <CtaButton onClick={open}>Get my full number</CtaButton>
              <LockLine />
            </div>
          </div>
          <ul className="m-0 p-0 list-none flex flex-col gap-5">
            {ADDS.map((a) => (
              <li key={a.t} className="flex gap-3.5">
                <CheckDot />
                <span className="flex flex-col gap-0.5">
                  <span className="text-[1.125rem] font-semibold" style={{ ...sans, color: B.espresso }}>{a.t}</span>
                  <span className="text-[1rem] leading-relaxed" style={{ ...sans, color: B.body }}>{a.b}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Reviews: Guzzi, Marshello, Syed */}
      <section className="px-5 sm:px-6 py-16 lg:py-20" style={{ background: B.skyDeep }}>
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="m-0 text-[2rem] sm:text-[2.5rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: B.white }}>In their words</h2>
            <GoogleSummary google={google} dark />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {REVIEWS.slice(0, 3).map((r) => <QuoteCard key={r.name} review={r} />)}
          </div>
          <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="self-start min-h-[48px] flex items-center text-[1rem] font-semibold underline underline-offset-4 hover:text-[#9DB6C3]" style={{ ...sans, color: B.white }}>
            Read all {google.count} reviews on Google
          </a>
        </div>
      </section>

      {/* 6. Meet Jesse, with the family photo */}
      <section className="bg-white px-5 sm:px-6 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-14 items-center">
          <div className="relative overflow-hidden rounded-[22px] aspect-[4/5] w-full max-w-[380px] mx-auto">
            <Image src={FAMILY_PHOTO.src} alt={FAMILY_PHOTO.alt} fill sizes="(min-width: 768px) 380px, 90vw" className="object-cover object-[50%_78%]" />
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="m-0 text-[2rem] sm:text-[2.5rem] leading-[1.12]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>You should understand exactly what you are signing, and I make sure you do.</h2>
            <p className="m-0 text-[1.0625rem] leading-relaxed" style={{ ...sans, color: B.body }}>
              I’m Jesse. I came to mortgages after a decade in tech, and I work with first-time buyers and self-employed people across Ontario.
            </p>
            <p className="m-0 text-[1.0625rem] leading-relaxed" style={{ ...sans, color: B.body }}>
              I’m a dad, I live in the Annex, and you can reach me directly by call or text, start to finish.
            </p>
            <p className="m-0 text-[0.9375rem]" style={{ ...sans, color: B.body }}>Mortgage Agent Lic. M25003068, Sherwood Mortgage Group</p>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="px-5 sm:px-6 py-16 lg:py-20" style={{ background: B.linen }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <h2 className="m-0 text-[2rem] sm:text-[2.5rem] leading-[1.12]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>Before you reach out</h2>
          <FaqList items={FAQ_B} />
        </div>
      </section>

      {/* 8. Close */}
      <section className="px-5 sm:px-6 py-16 lg:py-20" style={{ background: B.espresso }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          <h2 className="m-0 text-[2.25rem] sm:text-[3rem] leading-[1.08]" style={{ ...serif, fontWeight: 400, color: B.linen }}>Know your full number before you book a showing.</h2>
          <p className="m-0 text-[1.125rem] leading-relaxed" style={{ ...sans, color: B.onDark }}>
            Three quick questions, then pick a time to talk. There is no cost to you, and your credit stays untouched until you give the OK.
          </p>
          <div><CtaButton onClick={open} dark>Get my full number</CtaButton></div>
          <TalkFirst dark />
        </div>
      </section>
    </>
  );
}

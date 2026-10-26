// The First Home Plan (/lp/first-time-buyers). Jesse picked this one on October 25, 2026. Long-form page built on Sabri Suby's King Kong structure:
// call out the reader, a big clear promise, proof early, agitate, story, the offer in detail,
// everything that comes with it, honest promises in place of a guarantee, a warning, a P.S.
// The plan quiz sits in the hero and again at the close.

import Image from "next/image";
import { B, serif, sans } from "@/components/home/brand";
import PlanQuiz from "@/components/landing/PlanQuiz";
import ReviewCarousel from "@/components/landing/ReviewCarousel";
import {
  CheckDot, FAMILY_WIDE, FaqList, GoogleSummary, LandingFrame, LockLine, PlanChecklist, ProgramRow, ProofStrip,
} from "@/components/landing/kit";
import { LandingExtras, ScrollButton, TalkFirst } from "@/components/landing/kit-client";
import { QUESTIONS, REVIEWS } from "@/data/landing/fthb";
import type { GoogleReviews } from "@/lib/googleReviews";
import { calculateOntarioLTT, calculateTorontoMLTT, formatDollars, getCMHCInsurance, getMinDownPayment } from "@/lib/mortgageFormulas";

const SOURCE = "fthb_lp_plan";
const FORM = "fthb_plan_quiz";

// The worked example on the sample plan: a $600,000 home in Toronto, minimum down payment.
const PRICE = 600000;
const DOWN = getMinDownPayment(PRICE);
const LTT = calculateOntarioLTT(PRICE) + calculateTorontoMLTT(PRICE);
const REBATES = Math.min(calculateOntarioLTT(PRICE), 4000) + Math.min(calculateTorontoMLTT(PRICE), 4475);
const PST = getCMHCInsurance(PRICE, DOWN).pst;
const OTHER = 5000;
const CASH = DOWN + LTT - REBATES + PST + OTHER;

const EVERYTHING = [
  "A real conversation about your situation, by phone or video",
  "Your First Home Plan, in writing",
  "Rates compared across 50+ lenders, not just one bank",
  "Help with every document, and your file put together the way lenders want to see it",
  "Pre-approval when you’re ready to shop",
  "Lawyers, home inspectors and realtors I trust",
  "A direct line to me by call or text, until the keys are in your hand",
];

const PROMISES = [
  "Your credit stays untouched until you give the OK.",
  "Nothing goes to a lender without your say-so.",
  "If your bank has the best deal, I’ll tell you.",
  "If now isn’t the right time, I’ll say so, and tell you what to work on first.",
];

const STEPS = [
  { t: "Answer 4 quick questions", b: "About 2 minutes. It tells me where you’re at before the call." },
  { t: "Talk it through with me", b: "By phone or video. I walk through your income, savings, debts and goals with you, and answer every question you have." },
  { t: "Get your plan in writing", b: "What you qualify for, your payment options, your cash for closing day and the programs you can use." },
];

function SamplePlan() {
  const rows: [string, string][] = [
    ["Down payment, the minimum", formatDollars(DOWN)],
    ["Land transfer tax, Ontario and Toronto", formatDollars(LTT)],
    ["First-time buyer rebates", `−${formatDollars(REBATES)}`],
    ["Tax on mortgage insurance", formatDollars(PST)],
    ["Legal fees and other costs, about", formatDollars(OTHER)],
  ];
  return (
    <div className="relative w-full max-w-[470px] mx-auto">
      <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 lg:rotate-2 rounded-[10px]" style={{ background: B.sand }} />
      <figure className="relative m-0 rounded-[10px] bg-white px-6 py-7 sm:px-8 sm:py-9 shadow-[0_24px_60px_-28px_rgba(53,43,38,0.45)] lg:-rotate-1" style={sans}>
        <div className="flex items-start justify-between gap-4 pb-5 border-b" style={{ borderColor: B.line }}>
          <span className="flex flex-col gap-1">
            <span className="text-[1.5rem] leading-tight" style={{ ...serif, fontWeight: 500, color: B.espresso }}>First Home Plan</span>
            <span className="text-[0.9375rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>Sample: a {formatDollars(PRICE)} home in Toronto</span>
          </span>
          <Image src="/brand/p4-on-clay.png" alt="" width={186} height={200} className="w-8 h-auto shrink-0" />
        </div>

        <ol className="m-0 p-0 list-none flex flex-col">
          {[
            { t: "Your number", v: "Worked out on your call" },
            { t: "Your monthly payment", v: "Options side by side" },
          ].map((r, i) => (
            <li key={r.t} className="py-3.5 flex items-baseline justify-between gap-4 border-b" style={{ borderColor: B.line }}>
              <span className="text-[1rem] font-semibold" style={{ color: B.espresso }}><span style={{ color: B.skyDeep }}>{i + 1}</span>&nbsp;&nbsp;{r.t}</span>
              <span className="text-[0.9375rem] text-right" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>{r.v}</span>
            </li>
          ))}
          <li className="py-3.5 border-b" style={{ borderColor: B.line }}>
            <span className="text-[1rem] font-semibold" style={{ color: B.espresso }}><span style={{ color: B.skyDeep }}>3</span>&nbsp;&nbsp;Your cash for closing day</span>
            <dl className="m-0 mt-2.5 flex flex-col gap-1.5">
              {rows.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4">
                  <dt className="text-[0.9375rem]" style={{ color: B.body }}>{k}</dt>
                  <dd className="m-0 text-[0.9375rem] tabular-nums" style={{ color: B.espresso }}>{v}</dd>
                </div>
              ))}
              <div className="mt-1.5 pt-2 border-t flex items-baseline justify-between gap-4" style={{ borderColor: B.line }}>
                <dt className="text-[1rem] font-semibold" style={{ color: B.espresso }}>Cash you need</dt>
                <dd className="m-0 text-[1.125rem] font-bold tabular-nums" style={{ color: B.espresso }}>{formatDollars(CASH)}</dd>
              </div>
            </dl>
          </li>
          <li className="py-3.5 border-b" style={{ borderColor: B.line }}>
            <span className="text-[1rem] font-semibold" style={{ color: B.espresso }}><span style={{ color: B.skyDeep }}>4</span>&nbsp;&nbsp;Your programs</span>
            <span className="mt-2.5 flex flex-wrap gap-2">
              {["FHSA", "Home Buyers’ Plan", "Land transfer tax rebates", "30-year amortization"].map((t) => (
                <span key={t} className="rounded-full px-3 py-1 text-[0.8125rem]" style={{ background: B.linen, color: B.espresso }}>{t}</span>
              ))}
            </span>
          </li>
          <li className="pt-3.5">
            <span className="text-[1rem] font-semibold" style={{ color: B.espresso }}><span style={{ color: B.skyDeep }}>5</span>&nbsp;&nbsp;Your next steps</span>
            <ul className="m-0 mt-2.5 p-0 list-none flex flex-col gap-1.5 text-[0.9375rem]" style={{ color: B.body }}>
              <li>Open your FHSA this year, so the room starts building.</li>
              <li>Get pre-approved before you book showings.</li>
            </ul>
          </li>
        </ol>
        <figcaption className="mt-6 text-[1.125rem]" style={{ ...serif, fontStyle: "italic", color: B.espresso }}>Jesse</figcaption>
      </figure>
      <p className="relative mt-6 text-center text-[0.875rem] leading-relaxed" style={{ ...serif, fontStyle: "italic", color: B.body }}>
        A sample. Yours is built on your own numbers.
      </p>
    </div>
  );
}

export default function OptionPlan({ google }: { google: GoogleReviews }) {
  return (
    <LandingFrame extras={<LandingExtras sticky={{ label: "Start my plan", target: "plan-final", hideWhen: ["plan-hero", "plan-final"] }} />}>
      {/* 1. Hero: who it's for, the promise, proof, and the first question right away */}
      <section className="px-5 sm:px-6 pt-4 sm:pt-10 lg:pt-14 pb-10 lg:pb-14">
        <div className="max-w-6xl mx-auto grid gap-5 sm:gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-x-12 lg:gap-y-6 items-start">
          <div className="relative overflow-hidden rounded-[18px] lg:rounded-[22px] aspect-[2/1] lg:aspect-[3/2] lg:col-start-2 lg:row-start-1">
            <Image src={FAMILY_WIDE.src} alt={FAMILY_WIDE.alt} fill priority sizes="(min-width: 1024px) 520px, 100vw" className="object-cover object-[50%_73%] lg:object-center" />
          </div>
          <div className="flex flex-col gap-3.5 sm:gap-5 lg:pt-2 lg:col-start-1 lg:row-start-1 lg:row-span-2">
            <p className="m-0 text-[1rem] sm:text-[1.0625rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>For first-time buyers in Ontario</p>
            <h1 className="m-0 text-[2.125rem] sm:text-[3.25rem] lg:text-[3.875rem] leading-[1.04]" style={{ ...serif, fontWeight: 400, color: B.espresso, letterSpacing: "-0.5px" }}>
              Know your number before you fall for a home.
            </h1>
            <p className="m-0 sm:hidden text-[1.0625rem] leading-relaxed" style={{ ...sans, color: B.body }}>
              I’m Jesse, a Toronto mortgage agent. One call, then your whole plan in writing.
            </p>
            <p className="m-0 hidden sm:block text-[1.25rem] leading-relaxed max-w-xl" style={{ ...sans, color: B.body }}>
              I’m Jesse, a Toronto mortgage agent. In one call, I’ll work out what you can afford, the cash you’ll need on closing day and every first-time buyer program you can use. Then you get it all in writing.
            </p>
            <GoogleSummary google={google} />
            <ul className="hidden lg:flex m-0 mt-2 p-0 list-none flex-col gap-3">
              {["What you can afford, from your real numbers", "Every dollar you need on closing day", "The programs you can use, and how to stack them"].map((t) => (
                <li key={t} className="flex gap-3 text-[1.0625rem]" style={{ ...sans, color: B.espresso }}><CheckDot />{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[22px] bg-white p-4 sm:p-7 shadow-[0_18px_50px_-24px_rgba(53,43,38,0.35)] lg:col-start-2 lg:row-start-2">
            <p className="m-0 mb-3 text-[0.9375rem] font-semibold" style={{ ...sans, color: B.skyDeep }}>Start your First Home Plan. About 2 minutes, and there is no cost to you.</p>
            <PlanQuiz id="plan-hero" compact source={SOURCE} form={FORM} />
            <LockLine className="mt-4" />
          </div>
        </div>
      </section>

      {/* 2. Proof, right under the hero */}
      <section className="px-5 sm:px-6 pb-14 lg:pb-16">
        <ProofStrip className="max-w-6xl mx-auto" />
      </section>

      {/* 3. What you get: the plan, with a real worked example */}
      <section className="bg-white px-5 sm:px-6 py-16 lg:py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col gap-6">
            <h2 className="m-0 text-[2.125rem] sm:text-[2.75rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>Your First Home Plan, in writing.</h2>
            <p className="m-0 text-[1.125rem] leading-relaxed" style={{ ...sans, color: B.body }}>
              One conversation. Then I write it all down for you, so you can come back to it, share it with your partner and plan with real numbers.
            </p>
            <PlanChecklist />
            <p className="m-0 text-[1.0625rem] leading-relaxed rounded-2xl px-5 py-4" style={{ ...sans, color: B.espresso, background: B.linen }}>
              <span className="font-semibold">Plus the people I trust.</span> Need a lawyer, home inspector or realtor? I’ll introduce you.
            </p>
            <div className="flex flex-col gap-3 pt-1">
              <ScrollButton target="plan-final">Start my plan</ScrollButton>
              <LockLine />
            </div>
          </div>
          <SamplePlan />
        </div>
      </section>

      {/* 4. The problem, in their words */}
      <section className="px-5 sm:px-6 py-16 lg:py-20" style={{ background: B.linen }}>
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <div className="flex flex-col gap-5">
            <h2 className="m-0 text-[2.125rem] sm:text-[2.75rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>Sound familiar?</h2>
            <p className="m-0 text-[1.125rem] leading-relaxed" style={{ ...sans, color: B.body }}>These are the questions first-time buyers send me every week.</p>
            <div className="mt-2 rounded-2xl p-6 flex flex-col gap-2 bg-white">
              <span className="text-[3.25rem] leading-none" style={{ ...serif, color: B.skyDeep }}>92%</span>
              <span className="text-[1.0625rem] leading-snug" style={{ ...sans, color: B.espresso }}>of first-time buyers in Canada say buying a home is confusing.</span>
              <span className="text-[0.8125rem]" style={{ ...sans, color: B.body }}>Harris Poll survey, released December 2025</span>
            </div>
            <p className="m-0 text-[1.125rem] leading-relaxed" style={{ ...sans, color: B.espresso }}>You’re not behind. Nobody hands you the playbook. That’s my job.</p>
          </div>
          <div className="flex flex-col gap-8">
            <ul className="m-0 p-0 list-none flex flex-col">
              {QUESTIONS.map((q) => (
                <li key={q} className="py-4 border-b text-[1.25rem] sm:text-[1.375rem] leading-snug" style={{ ...serif, color: B.espresso, borderColor: "#DCCFC1" }}>{q}</li>
              ))}
            </ul>
            <figure className="m-0 rounded-2xl p-6 sm:p-7 flex flex-col gap-4" style={{ background: B.espresso }}>
              <p className="m-0 text-[0.9375rem]" style={{ ...serif, fontStyle: "italic", color: "#D2B8A6" }}>When the bank says no</p>
              <blockquote className="m-0 text-[1.25rem] sm:text-[1.375rem] leading-[1.35]" style={{ ...serif, color: B.linen }}>
                “At that point, we had almost lost hope of purchasing our first home. We were then referred to Jesse, and that completely changed our experience.”
              </blockquote>
              <figcaption className="text-[0.9375rem]" style={{ ...sans, color: B.onDark }}>Syed Aklakur Rahman, first-time buyer, on Google</figcaption>
              <p className="m-0 pt-1 text-[1rem] leading-relaxed" style={{ ...sans, color: B.onDark }}>
                A bank works with one lender. I work with 50+. Self-employed, new to your job or already turned down? There’s often still a path.
              </p>
            </figure>
          </div>
        </div>
      </section>

      {/* 5. Why I do this: Jesse's own first-home story (from his welcome email) */}
      <section className="bg-white px-5 sm:px-6 py-16 lg:py-24">
        <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-14 items-center">
          <div className="relative overflow-hidden rounded-[22px] aspect-[3/4] w-full max-w-[340px] mx-auto md:order-1 order-2">
            <Image src="/blog/self-employed-dividends-mortgage/jesse-family-walk.jpg" alt="Jesse out for a walk with his baby" fill sizes="(min-width: 768px) 340px, 90vw" className="object-cover" />
          </div>
          <div className="flex flex-col gap-5 md:order-2 order-1">
            <h2 className="m-0 text-[2.125rem] sm:text-[2.75rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>I learned this the expensive way.</h2>
            <div className="flex flex-col gap-4 text-[1.0625rem] sm:text-[1.125rem] leading-relaxed" style={{ ...sans, color: B.body }}>
              <p className="m-0">In 2021, my wife and I bought a home for the first time. Like most first-time buyers, the first stop was the bank.</p>
              <p className="m-0">It was a blur. The process moved fast, the language was foreign, and I signed off on decisions I didn’t fully understand.</p>
              <p className="m-0 font-semibold" style={{ color: B.espresso }}>Those decisions cost my family thousands of dollars.</p>
              <p className="m-0">So that’s how I work now. Every number explained before you sign anything. Skip the banker talk.</p>
            </div>
            <p className="m-0 text-[1.375rem] sm:text-[1.5rem] leading-snug" style={{ ...serif, fontStyle: "italic", color: B.espresso }}>The most prepared people make the best decisions.</p>
            <ul className="m-0 p-0 list-none grid grid-cols-2 gap-x-6 gap-y-3 pt-2 text-[0.9375rem]" style={{ ...sans, color: B.body }}>
              <li><span className="block font-semibold" style={{ color: B.espresso }}>Mortgage Agent</span>Lic. M25003068</li>
              <li><span className="block font-semibold" style={{ color: B.espresso }}>Sherwood Mortgage Group</span>Brokerage Lic. 12176</li>
              <li><span className="block font-semibold" style={{ color: B.espresso }}>50+ lenders</span>compared for you</li>
              <li><span className="block font-semibold" style={{ color: B.espresso }}>A decade in tech</span>before mortgages</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Reviews, Guzzi and Marshello first */}
      <ReviewCarousel heading="In their words" reviews={REVIEWS} google={google}>
        <figure className="m-0 max-w-3xl rounded-[20px] bg-white p-6 sm:p-8 flex flex-col gap-3">
          <p className="m-0 text-[0.9375rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>The note I sent a first-time buyer couple on closing day</p>
          <blockquote className="m-0 text-[1.25rem] sm:text-[1.375rem] leading-[1.4]" style={{ ...serif, color: B.espresso }}>
            “Happy closing day! Your mortgage has funded and the lawyers have everything they need. If anything comes up today, call or text me.”
          </blockquote>
          <figcaption className="text-[1rem] font-semibold" style={{ ...sans, color: B.espresso }}>Jesse</figcaption>
        </figure>
      </ReviewCarousel>

      {/* 7. Everything that comes with it, and the promises */}
      <section className="px-5 sm:px-6 py-16 lg:py-24" style={{ background: B.linen }}>
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14 items-start">
          <div className="flex flex-col gap-7">
            <h2 className="m-0 text-[2.125rem] sm:text-[2.75rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>Everything that comes with it.</h2>
            <ul className="m-0 p-0 list-none flex flex-col gap-4">
              {EVERYTHING.map((t) => (
                <li key={t} className="flex gap-3.5 text-[1.0625rem] sm:text-[1.125rem] leading-snug" style={{ ...sans, color: B.espresso }}><CheckDot />{t}</li>
              ))}
            </ul>
            <div className="rounded-2xl bg-white p-6 flex flex-col gap-2">
              <p className="m-0 text-[1.125rem] font-semibold" style={{ ...sans, color: B.espresso }}>What it costs you</p>
              <p className="m-0 text-[1.0625rem] leading-relaxed" style={{ ...sans, color: B.body }}>
                On most residential mortgages, nothing. The lender pays me a finder’s fee when your mortgage closes. If a mortgage ever needs a fee, you’ll know upfront.
              </p>
            </div>
            <div><ScrollButton target="plan-final">Start my plan</ScrollButton></div>
          </div>
          <div className="rounded-[22px] p-7 sm:p-9 flex flex-col gap-6" style={{ background: B.espresso }}>
            <h2 className="m-0 text-[1.875rem] sm:text-[2.125rem] leading-[1.15]" style={{ ...serif, fontWeight: 400, color: B.linen }}>My promises to you</h2>
            <ul className="m-0 p-0 list-none flex flex-col gap-5">
              {PROMISES.map((p) => (
                <li key={p} className="flex gap-3.5 text-[1.0625rem] sm:text-[1.125rem] leading-snug" style={{ ...sans, color: B.linen }}><CheckDot dark />{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 8. Programs, in plain numbers */}
      <section className="bg-white px-5 sm:px-6 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-3 max-w-2xl">
            <h2 className="m-0 text-[2.125rem] sm:text-[2.75rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>Money set aside for first-time buyers.</h2>
            <p className="m-0 text-[1.0625rem] leading-relaxed" style={{ ...sans, color: B.body }}>Most people know these exist. Few know how to stack them. Your plan shows which ones you can use.</p>
          </div>
          <ProgramRow />
        </div>
      </section>

      {/* 9. How it works */}
      <section className="px-5 sm:px-6 py-16 lg:py-20" style={{ background: B.linen }}>
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          <h2 className="m-0 max-w-2xl text-[2.125rem] sm:text-[2.75rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>From “where do I start?” to a plan you trust.</h2>
          <ol className="m-0 p-0 list-none grid gap-4 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.t} className="rounded-2xl bg-white p-6 sm:p-7 flex flex-col gap-3">
                <span className="text-[2.5rem] leading-none" style={{ ...serif, color: B.skyDeep }}>{i + 1}</span>
                <h3 className="m-0 text-[1.5rem] leading-snug" style={{ ...serif, fontWeight: 500, color: B.espresso }}>{s.t}</h3>
                <p className="m-0 text-[1rem] leading-relaxed" style={{ ...sans, color: B.body }}>{s.b}</p>
              </li>
            ))}
          </ol>
          <p className="m-0 max-w-3xl text-[1.0625rem] leading-relaxed" style={{ ...sans, color: B.body }}>
            When you’re ready to shop, I get you pre-approved, which holds a rate while you look. From there, I’m with you until the keys are in your hand.
          </p>
        </div>
      </section>

      {/* 10. The warning */}
      <section className="px-5 sm:px-6 py-16 lg:py-20" style={{ background: B.espresso }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          <h2 className="m-0 text-[2rem] sm:text-[2.5rem] leading-[1.15]" style={{ ...serif, fontWeight: 400, color: B.linen }}>
            A lot of first-time buyers start the mortgage part after they find a home.
          </h2>
          <p className="m-0 text-[1.125rem] leading-relaxed" style={{ ...sans, color: B.onDark }}>
            That’s when financing gets rushed, and rushed is when mistakes cost money. Start now, and walk into every showing knowing your number.
          </p>
          <div><ScrollButton target="plan-final" dark>Start my plan</ScrollButton></div>
        </div>
      </section>

      {/* 11. Questions people ask before reaching out */}
      <section className="bg-white px-5 sm:px-6 py-16 lg:py-20">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <h2 className="m-0 text-[2rem] sm:text-[2.5rem] leading-[1.12]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>Before you reach out</h2>
          <FaqList />
        </div>
      </section>

      {/* 12. The close: the quiz again */}
      <section className="px-5 sm:px-6 py-16 lg:py-24" style={{ background: B.espresso }}>
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col gap-5">
            <h2 className="m-0 text-[2.25rem] sm:text-[3rem] leading-[1.08]" style={{ ...serif, fontWeight: 400, color: B.linen }}>Ready to trade the overwhelm for a plan?</h2>
            <p className="m-0 text-[1.125rem] leading-relaxed" style={{ ...sans, color: B.onDark }}>Four quick questions, then pick a time to talk. There is no cost to you, and your credit stays untouched until you give the OK.</p>
            <GoogleSummary google={google} dark />
            <TalkFirst dark />
          </div>
          <div className="rounded-[22px] p-5 sm:p-7" style={{ background: "#3E332D" }}>
            <PlanQuiz id="plan-final" dark source={SOURCE} form={FORM} />
          </div>
        </div>
      </section>

      {/* 13. P.S. */}
      <section className="px-5 sm:px-6 py-14" style={{ background: B.linen }}>
        <div className="max-w-2xl mx-auto flex gap-4 sm:gap-5 items-start">
          <Image src="/blog/jesse-face.jpg" alt="" width={56} height={56} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shrink-0" />
          <div className="flex flex-col gap-2">
            <p className="m-0 text-[1.1875rem] sm:text-[1.3125rem] leading-[1.45]" style={{ ...serif, color: B.espresso }}>
              P.S. You don’t need a home picked out to start. The earlier you know your number, the calmer the whole thing feels.
            </p>
            <p className="m-0 text-[0.9375rem]" style={{ ...sans, color: B.body }}>Jesse Karkoukly, Toronto mortgage agent</p>
          </div>
        </div>
      </section>
    </LandingFrame>
  );
}

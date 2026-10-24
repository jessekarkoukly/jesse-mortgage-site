"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import JesseFooter from "@/components/JesseFooter";
import StoryForm from "@/components/home/StoryForm";
import PlanQuiz from "@/components/landing/PlanQuiz";
import ReviewCarousel, { type Review } from "@/components/landing/ReviewCarousel";
import { B, GOOGLE_PROFILE_URL, serif, sans } from "@/components/home/brand";
import type { GoogleReviews } from "@/lib/googleReviews";

// Every review below is word for word from Jesse's Google Business Profile (checked October 24, 2026).
// Highlights are exact excerpts. Never edit or paraphrase a review.
const REVIEWS: Review[] = [
  {
    name: "Syed Aklakur Rahman",
    tag: "First-time buyer",
    highlight: "His advice and assistance made a very stressful and complicated process much easier for us.",
    full: "As a first-time homebuyer, I was extremely fortunate to have Mr. Jesse guide us through the mortgage process. His advice and assistance made a very stressful and complicated process much easier for us.\n\nWe initially approached one of Canada’s major banks, where we already had our savings and accounts. However, due to the complexity of documenting the income of a self-employed applicant, we were unable to move forward with the mortgage application. At that point, we had almost lost hope of purchasing our first home.\n\nWe were then referred to Jesse, and that completely changed our experience. He identified the right lender for our situation, advised us on the necessary documentation, and organized everything in a way that made the process straightforward for both us and the lender, another major bank of Canada.\n\nJesse was proactive, responsive, and professional throughout the entire process. His guidance and attention to detail helped us secure our mortgage within a very short period of time. Without his expertise and support, I honestly don't think we would have been able to navigate the process successfully.\n\nI am sincerely grateful to Jesse for helping us achieve our dream of owning our first home. We had faith on him since the beginning and we got the result for that.",
  },
  {
    name: "Rebecca Marshello",
    tag: "First-time buyer",
    highlight: "Thank you for everything and thank you for helping us get into our first home.",
    full: "Jesse was and is fantastic to work with. Coming as a first time homeowner he had his hands full with having to explain in detail every step of the process and looked into every question or requirement that I sent his way. He is so knowledgeable and kept me updated every step of the way. I am very happy to have worked with him and excited to continue to work with him in the future.\n\nThank you for everything and thank you for helping us get into our first home.",
  },
  {
    name: "Sparsh Sethi",
    highlight: "Not only does he walk you through the process but also hold your hand through every stage.",
    full: "Amazing to work with, not only does he walk you through the process but also hold your hand through every stage. Truly a standout mortgage agent and makes the process incredibly smooth",
  },
  {
    name: "Paola Santiago",
    tag: "Getting ready to buy",
    highlight: "He made the whole process easy to understand. He was knowledgeable, patient, and gave me confidence about the next steps.",
    full: "I met with Jesse to learn about getting ready for a mortgage, and he made the whole process easy to understand. He was knowledgeable, patient, and gave me confidence about the next steps.",
  },
  {
    name: "Ephy Bookbinder",
    tag: "Realtor, for first-time buyer clients",
    highlight: "Within roughly 24 to 48 hours of getting involved, he had secured the financing my clients needed and put the deal firmly back on track.",
    full: "I recently had the opportunity to work with Jesse on a deal involving my first-time home buyer clients, and I can genuinely say he was instrumental in getting the deal across the finish line.\n\nMy clients had been working directly with their bank, but as we got further into the transaction, some financing issues came up and suddenly we were in a very difficult spot with time running out. That’s when we reached out to Jesse.\n\nEven though he was brought in at the last minute, he immediately jumped in, got himself fully up to speed, reviewed everything thoroughly, and started working on a solution right away.\n\nWhat impressed me most was how calm and responsive he remained throughout. There was a lot of stress, understandably, but Jesse was clear, steady, and solutions focused. We even went ahead and arranged an extension on the financing condition to create some breathing room, but Jesse worked so quickly that we didn’t even need the extra time.\n\nWithin roughly 24 to 48 hours of getting involved, he had secured the financing my clients needed and put the deal firmly back on track. As an Realtor, moments like this really show you the value of having the right professionals around you.\n\nI’m extremely grateful for the effort he put in and would absolutely recommend Jesse to any buyer or real estate professional looking for a mortgage agent who is knowledgeable, responsive, and willing to step up when it matters most.",
  },
  {
    name: "David Stern",
    highlight: "Giving me honest advice that you wouldn't expect from most brokers.",
    full: "Jesse was a pleasure to work with. He went above and beyond the role of mortgage advisor, painting a thorough picture of the housing market and giving me honest advice that you wouldn't expect from most brokers. Highly recommend for anyone looking to make an intelligent home buying decision",
  },
  {
    name: "Daniella Guzzi",
    highlight: "He made what could have been a stressful and complicated process feel straightforward and manageable.",
    full: "We had an excellent experience working with Jesse Karkoukly and would highly recommend him to anyone looking for a mortgage broker. Jesse was incredibly knowledgeable, responsive, and genuinely invested in helping us find the right mortgage for our needs.\n\nHe made what could have been a stressful and complicated process feel straightforward and manageable. He was always available to answer our questions, explain our options clearly, and make sure we understood everything before making any decisions. We also really appreciated how proactive Jesse was throughout the entire process — he consistently went above and beyond to make sure everything stayed on track.\n\nWe felt completely confident having Jesse in our corner and couldn’t be happier with the outcome. If you’re looking for a mortgage broker who is professional, trustworthy, and truly cares about his clients, we would absolutely recommend Jesse!",
  },
];

// Short excerpts for the strip under the hero. Exact words from the reviews above.
const QUICK_PROOF = [
  { text: "made a very stressful and complicated process much easier", name: "Syed, first-time buyer" },
  { text: "hold your hand through every stage", name: "Sparsh" },
  { text: "thank you for helping us get into our first home", name: "Rebecca, first-time buyer" },
];

// The questions first-time buyers actually send Jesse, in their words.
const QUESTIONS = [
  "Can I actually afford a home right now?",
  "How much do I really need saved?",
  "What does pre-approval mean, and when do I get one?",
  "Which first-time buyer programs can I use?",
  "What will closing day cost me?",
  "My bank said no. Is that the end of it?",
];

// What's in the plan Jesse writes up after the first call (the same breakdown he sends clients today).
const PLAN = [
  { title: "What you qualify for", body: "Based on your income, down payment, debts and credit." },
  { title: "Your monthly payment", body: "A few options side by side, so you can pick what feels comfortable." },
  { title: "Cash needed on closing day", body: "Your down payment, land transfer tax and legal fees, worked out for your price." },
  { title: "Every program you can use", body: "FHSA, Home Buyers’ Plan, land transfer tax rebates." },
  { title: "Your next steps", body: "What to do now, and when pre-approval makes sense." },
];

const FAQ = [
  { q: "Does this cost me anything?", a: "Typically, no. On most residential mortgages the lender pays me a finder’s fee when your mortgage closes, so there is no cost to you." },
  { q: "Will you check my credit?", a: "Not to start. Your first call and your plan don’t need a credit check. I only pull credit or send anything to a lender with your clear OK." },
  { q: "I’m not buying for a year. Is it too early?", a: "A year out is a great time. It gives you room to use the FHSA, pay down the right debts and know your number before you fall for a home." },
  { q: "My bank already pre-approved me. Why talk to you?", a: "A second opinion is worth having. I compare 50+ lenders, and your plan covers closing costs and programs, not just the mortgage." },
  { q: "I’m self-employed. Can I still qualify?", a: "Often, yes. Lenders look at self-employed income differently, and knowing which ones to go to matters. It’s a big part of what I do." },
];

const toPlan = () => document.getElementById("plan-final")?.scrollIntoView({ behavior: "smooth", block: "start" });
const story = () => window.dispatchEvent(new CustomEvent("open-story-form"));

function Stars({ colour = "#E8A317", size = 16 }: { colour?: string; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill={colour}><path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" /></svg>
      ))}
    </span>
  );
}

function PlanButton({ label = "Get my first home plan", dark = false }: { label?: string; dark?: boolean }) {
  return (
    <button
      type="button"
      onClick={toPlan}
      className={`cursor-pointer w-full sm:w-auto rounded-full px-8 py-4 min-h-[56px] text-[1.0625rem] font-semibold transition-colors duration-150 ${dark ? "bg-[#C4A592] text-[#352B26] hover:bg-[#9DB6C3]" : "bg-[#4F6B7A] text-white hover:bg-[#352B26]"}`}
      style={sans}
    >
      {label}
    </button>
  );
}

export default function FirstTimeBuyerLanding({ google }: { google: GoogleReviews }) {
  const [storyOpen, setStoryOpen] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const count = google.rating >= 4.95 ? `${google.count} five-star reviews on Google` : `${google.rating.toFixed(1)} stars from ${google.count} Google reviews`;

  useEffect(() => {
    const open = () => setStoryOpen(true);
    window.addEventListener("open-story-form", open);
    const onScroll = () => {
      const final = document.getElementById("plan-final");
      const nearEnd = final ? final.getBoundingClientRect().top < window.innerHeight : false;
      setShowBar(window.scrollY > 700 && !nearEnd);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("open-story-form", open);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div style={{ background: B.linen }}>
      {/* Minimal header: logo and phone only, so nothing pulls people away from the plan */}
      <header className="px-5 sm:px-6 py-3.5 bg-white/90 backdrop-blur sticky top-0 z-40 border-b" style={{ borderColor: B.line }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <Image src="/jesse-logo.png" alt="Jesse Karkoukly, Mortgage Agent" width={224} height={48} className="h-9 sm:h-10 w-auto" priority />
          <a href="tel:4162762666" className="flex items-center gap-2 min-h-[44px] text-[0.9375rem] font-semibold hover:text-[#4F6B7A]" style={{ ...sans, color: B.espresso }}>
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>
            <span className="hidden sm:inline">416-276-2666</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </header>

      <main>
        {/* Hero: who it's for, the promise, and the first question right away.
            One photo element: on phones it sits on top, on desktop it moves to the right column. */}
        <section className="px-5 sm:px-6 pt-4 sm:pt-10 lg:pt-14 pb-12 lg:pb-16">
          <div className="max-w-6xl mx-auto grid gap-5 sm:gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-x-12 lg:gap-y-5 items-start">
            <div className="relative overflow-hidden rounded-[18px] lg:rounded-[22px] aspect-[2/1] lg:aspect-[5/4] lg:col-start-2 lg:row-start-1">
              <Image src="/jesse-family.jpg" alt="Jesse Karkoukly with his family on the front steps of a Toronto home" fill priority sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" style={{ objectPosition: "50% 70%" }} />
            </div>
            <div className="flex flex-col gap-3.5 sm:gap-5 lg:pt-4 lg:col-start-1 lg:row-start-1 lg:row-span-2">
              <p className="m-0 text-[1rem] sm:text-[1.0625rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>For first-time buyers in Ontario</p>
              <h1 className="m-0 text-[2.125rem] sm:text-[3.25rem] lg:text-[3.875rem] leading-[1.04]" style={{ ...serif, fontWeight: 400, color: B.espresso, letterSpacing: "-0.5px" }}>
                Your first home, without the overwhelm.
              </h1>
              <p className="m-0 sm:hidden text-[1.0625rem] leading-relaxed" style={{ ...sans, color: B.body }}>
                I’m Jesse, a Toronto mortgage agent. I’ll show you what you can afford and how to get there.
              </p>
              <p className="m-0 hidden sm:block text-[1.25rem] leading-relaxed max-w-xl" style={{ ...sans, color: B.body }}>
                I’m Jesse, a Toronto mortgage agent. I’ll show you what you can afford, what closing day really costs, and every program you can use, so you can buy with confidence.
              </p>
              <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="self-start flex items-center gap-2.5 min-h-[36px] text-[0.9375rem] font-semibold hover:underline underline-offset-4" style={{ ...sans, color: B.espresso }}>
                <Stars /> {count}
              </a>
            </div>
            <div className="rounded-[22px] bg-white p-4 sm:p-7 shadow-[0_18px_50px_-24px_rgba(53,43,38,0.35)] lg:col-start-2 lg:row-start-2">
              <p className="m-0 mb-3 text-[0.9375rem] font-semibold" style={{ ...sans, color: B.skyDeep }}>Your first home plan. About 2 minutes, and there is no cost to you.</p>
              <PlanQuiz id="plan-hero" compact />
            </div>
          </div>
        </section>

        {/* Quick proof, right under the hero */}
        <section className="px-5 sm:px-6 pb-14" aria-label="What clients say">
          <ul className="max-w-6xl mx-auto m-0 p-0 list-none grid gap-3 md:grid-cols-3">
            {QUICK_PROOF.map((p) => (
              <li key={p.name} className="rounded-2xl px-5 py-4 flex flex-col gap-2" style={{ background: B.sand }}>
                <Stars size={14} />
                <span className="text-[1.125rem] leading-snug" style={{ ...serif, color: B.espresso }}>“{p.text}”</span>
                <span className="text-[0.875rem]" style={{ ...sans, color: B.body }}>{p.name}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* The problem, in their words */}
        <section className="bg-white px-5 sm:px-6 py-16 lg:py-20">
          <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16 items-center">
            <div className="flex flex-col gap-5">
              <p className="m-0 text-[1.0625rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>Sound familiar?</p>
              <h2 className="m-0 text-[2.125rem] sm:text-[2.75rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>
                The questions every first-time buyer asks me.
              </h2>
              <div className="rounded-2xl p-6 flex flex-col gap-2" style={{ background: B.linen }}>
                <span className="text-[3rem] leading-none" style={{ ...serif, color: B.skyDeep }}>92%</span>
                <span className="text-[1.0625rem] leading-snug" style={{ ...sans, color: B.espresso }}>of first-time buyers in Canada say buying a home is confusing.</span>
                <span className="text-[0.8125rem]" style={{ ...sans, color: B.body }}>Scotiabank Housing Poll by Harris Poll, December 2025</span>
              </div>
              <p className="m-0 text-[1.0625rem] leading-relaxed" style={{ ...sans, color: B.body }}>You’re not behind. Nobody hands you the playbook. That’s my job.</p>
            </div>
            <ul className="m-0 p-0 list-none flex flex-col gap-3">
              {QUESTIONS.map((q) => (
                <li key={q} className="rounded-2xl border-[1.5px] px-5 py-4 flex items-start gap-4" style={{ borderColor: B.line }}>
                  <span aria-hidden="true" className="mt-1 w-6 h-6 shrink-0 rounded-full flex items-center justify-center" style={{ background: B.skyDeep }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 6.2 5 8.5l4.5-5" /></svg>
                  </span>
                  <span className="text-[1.125rem] sm:text-[1.25rem] leading-snug" style={{ ...serif, color: B.espresso }}>{q}</span>
                </li>
              ))}
              <li className="pt-2 text-[1rem]" style={{ ...sans, color: B.body }}>One call answers all of it. Then you get it in writing.</li>
            </ul>
          </div>
        </section>

        {/* The offer: the plan */}
        <section className="px-5 sm:px-6 py-16 lg:py-24 overflow-hidden" style={{ background: B.linen }}>
          <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="flex flex-col gap-6 lg:order-2">
              <h2 className="m-0 text-[2.125rem] sm:text-[2.75rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>Your First Home Plan</h2>
              <p className="m-0 text-[1.125rem] leading-relaxed" style={{ ...sans, color: B.body }}>One conversation. Then I write it all down for you, so you can come back to it, share it with your partner and plan with real numbers.</p>
              <ul className="m-0 p-0 list-none flex flex-col gap-4">
                {PLAN.map((p, i) => (
                  <li key={p.title} className="flex gap-4">
                    <span aria-hidden="true" className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-[1rem] bg-white" style={{ ...serif, color: B.skyDeep }}>{i + 1}</span>
                    <span className="flex flex-col gap-0.5 pt-1">
                      <span className="text-[1.125rem] font-semibold" style={{ ...sans, color: B.espresso }}>{p.title}</span>
                      <span className="text-[1rem] leading-relaxed" style={{ ...sans, color: B.body }}>{p.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3 pt-2">
                <PlanButton />
                <p className="m-0 text-[0.9375rem] flex items-center gap-2" style={{ ...sans, color: B.body }}>
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={B.skyDeep} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
                  Your credit stays untouched until you give the OK.
                </p>
              </div>
            </div>

            {/* A preview of the plan document. Figures blurred: every plan is built on your own numbers. */}
            <div className="lg:order-1 flex justify-center">
              <div className="relative w-full max-w-[460px]">
                <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rotate-2 rounded-[18px]" style={{ background: B.sand }} />
                <figure className="relative m-0 rounded-[18px] bg-white p-6 sm:p-8 shadow-[0_24px_60px_-28px_rgba(53,43,38,0.45)] -rotate-1">
                  <div className="flex items-center justify-between gap-3 pb-4 border-b" style={{ borderColor: B.line }}>
                    <span className="flex flex-col">
                      <span className="text-[1.375rem]" style={{ ...serif, fontWeight: 500, color: B.espresso }}>First Home Plan</span>
                      <span className="text-[0.875rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>Prepared for you by Jesse</span>
                    </span>
                    <Image src="/brand/p4-on-clay.png" alt="" width={186} height={200} className="w-8 h-auto opacity-80" />
                  </div>
                  <dl className="m-0 py-4 flex flex-col gap-3.5" style={sans} aria-hidden="true">
                    {[
                      ["You qualify for up to", "$742,000"],
                      ["Monthly payment, option A", "$3,180"],
                      ["Monthly payment, option B", "$3,045"],
                      ["Cash needed on closing day", "$71,450"],
                      ["First-time buyer savings", "$12,600"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between gap-4">
                        <dt className="text-[0.9375rem]" style={{ color: B.body }}>{k}</dt>
                        <dd className="m-0 text-[1.0625rem] font-semibold blur-[5px] select-none" style={{ color: B.espresso }}>{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="pt-4 border-t flex flex-col gap-2" style={{ borderColor: B.line }} aria-hidden="true">
                    <span className="text-[0.875rem] font-semibold" style={{ ...sans, color: B.espresso }}>Programs you can use</span>
                    <span className="flex flex-wrap gap-2">
                      {["FHSA", "Home Buyers’ Plan", "Land transfer tax rebate", "30-year amortization"].map((t) => (
                        <span key={t} className="rounded-full px-3 py-1 text-[0.8125rem]" style={{ ...sans, background: B.linen, color: B.espresso }}>{t}</span>
                      ))}
                    </span>
                  </div>
                  <figcaption className="sr-only">Preview of a First Home Plan. Every plan is built on your own numbers.</figcaption>
                </figure>
                <p className="relative mt-6 text-center text-[0.875rem]" style={{ ...serif, fontStyle: "italic", color: B.body }}>Preview only. Yours is built on your numbers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews, big and blue */}
        <ReviewCarousel heading="First-time buyers, in their words" reviews={REVIEWS} google={google} />

        {/* How it works, three steps */}
        <section className="bg-white px-5 sm:px-6 py-16 lg:py-20">
          <div className="max-w-6xl mx-auto flex flex-col gap-10">
            <div className="flex flex-col gap-3 max-w-2xl">
              <h2 className="m-0 text-[2.125rem] sm:text-[2.75rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>From “where do I start?” to a plan you trust.</h2>
            </div>
            <ol className="m-0 p-0 list-none grid gap-4 md:grid-cols-3">
              {[
                { t: "Answer 4 quick questions", b: "Takes about 2 minutes. It tells me where you’re at before the call." },
                { t: "Have a real conversation", b: "I walk through your income, savings, debts and goals with you, and answer every question you have." },
                { t: "Get your plan in writing", b: "What you qualify for, your payment options, your cash to close and the programs you can use." },
              ].map((s, i) => (
                <li key={s.t} className="rounded-2xl p-6 sm:p-7 flex flex-col gap-3" style={{ background: B.linen }}>
                  <span className="text-[2.5rem] leading-none" style={{ ...serif, color: B.skyDeep }}>{i + 1}</span>
                  <h3 className="m-0 text-[1.5rem] leading-snug" style={{ ...serif, fontWeight: 500, color: B.espresso }}>{s.t}</h3>
                  <p className="m-0 text-[1rem] leading-relaxed" style={{ ...sans, color: B.body }}>{s.b}</p>
                </li>
              ))}
            </ol>
            <p className="m-0 max-w-3xl text-[1.0625rem] leading-relaxed" style={{ ...sans, color: B.body }}>
              When you’re ready to shop, I get you pre-approved. That holds your rate with a lender for up to 60 days. From there, I’m with you until the keys are in your hand.
            </p>
          </div>
        </section>

        {/* Programs, in plain numbers */}
        <section className="px-5 sm:px-6 py-16 lg:py-20" style={{ background: B.linen }}>
          <div className="max-w-6xl mx-auto flex flex-col gap-9">
            <div className="flex flex-col gap-3 max-w-2xl">
              <h2 className="m-0 text-[2.125rem] sm:text-[2.75rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>Money set aside for first-time buyers.</h2>
              <p className="m-0 text-[1.0625rem] leading-relaxed" style={{ ...sans, color: B.body }}>Most people know these exist. Few know how to stack them. I’ll tell you which ones you qualify for.</p>
            </div>
            <ul className="m-0 p-0 list-none grid gap-4 md:grid-cols-3">
              {[
                { n: "$40,000", t: "First Home Savings Account", b: "Save for your down payment. Contributions lower your taxes, and the money comes out tax-free when you buy." },
                { n: "$60,000", t: "Home Buyers’ Plan", b: "Use your RRSP savings toward your down payment and pay yourself back over time." },
                { n: "$8,475", t: "Land transfer tax rebates", b: "The most a first-time buyer can get back on a Toronto home: $4,000 from Ontario plus $4,475 from the city." },
              ].map((p) => (
                <li key={p.t} className="rounded-2xl bg-white p-6 sm:p-7 flex flex-col gap-2">
                  <span className="text-[2.5rem] leading-none" style={{ ...serif, color: B.espresso }}>{p.n}</span>
                  <h3 className="m-0 text-[1.125rem] font-semibold" style={{ ...sans, color: B.skyDeep }}>{p.t}</h3>
                  <p className="m-0 text-[1rem] leading-relaxed" style={{ ...sans, color: B.body }}>{p.b}</p>
                </li>
              ))}
            </ul>
            <p className="m-0 text-[0.9375rem]" style={{ ...sans, color: B.body }}>FHSA and Home Buyers’ Plan limits are per person. Buying with a partner? Each of you can use them.</p>
          </div>
        </section>

        {/* When the bank says no: Syed's story */}
        <section className="px-5 sm:px-6 py-16 lg:py-20" style={{ background: B.espresso }}>
          <figure className="max-w-4xl mx-auto m-0 flex flex-col gap-6">
            <p className="m-0 text-[1.0625rem]" style={{ ...serif, fontStyle: "italic", color: "#D2B8A6" }}>When the bank says no</p>
            <blockquote className="m-0 text-[1.625rem] sm:text-[2.125rem] leading-[1.3]" style={{ ...serif, color: B.linen }}>
              “At that point, we had almost lost hope of purchasing our first home. We were then referred to Jesse, and that completely changed our experience.”
            </blockquote>
            <figcaption className="flex items-center gap-3 text-[1rem]" style={{ ...sans, color: B.onDark }}>
              <Stars colour="#F2C66D" size={15} /> Syed Aklakur Rahman, first-time buyer, on Google
            </figcaption>
            <p className="m-0 text-[1.0625rem] leading-relaxed max-w-2xl" style={{ ...sans, color: B.onDark }}>
              A bank works with one lender. I work with 50+. If you’re self-employed, new to your job or your bank already said no, there’s often still a path.
            </p>
            <div><PlanButton dark /></div>
          </figure>
        </section>

        {/* Meet Jesse */}
        <section className="bg-white px-5 sm:px-6 py-16 lg:py-20">
          <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-center">
            <div className="relative overflow-hidden rounded-[22px] aspect-[3/4] max-w-[360px] w-full mx-auto">
              <Image src="/blog/self-employed-dividends-mortgage/jesse-family-walk.jpg" alt="Jesse out for a walk in the Annex with his son" fill sizes="(min-width: 768px) 360px, 90vw" className="object-cover" />
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="m-0 text-[2rem] sm:text-[2.5rem] leading-[1.12]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>Hi, I’m Jesse. I explain it the way I’d want it explained to me.</h2>
              <p className="m-0 text-[1.0625rem] leading-relaxed" style={{ ...sans, color: B.body }}>
                I spent a decade in tech before becoming a mortgage agent. Now I help first-time buyers across Ontario go from overwhelmed to confident, one clear step at a time.
              </p>
              <p className="m-0 text-[1.0625rem] leading-relaxed" style={{ ...sans, color: B.body }}>
                I’m a dad, I live in the Annex, and you can reach me directly by phone or email, start to finish.
              </p>
              <p className="m-0 text-[0.9375rem]" style={{ ...sans, color: B.body }}>Mortgage Agent Lic. M25003068 · Sherwood Mortgage Group</p>
            </div>
          </div>
        </section>

        {/* Questions people ask before reaching out */}
        <section className="px-5 sm:px-6 py-16 lg:py-20" style={{ background: B.linen }}>
          <div className="max-w-3xl mx-auto flex flex-col gap-8">
            <h2 className="m-0 text-[2rem] sm:text-[2.5rem] leading-[1.12]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>Before you reach out</h2>
            <dl className="m-0 flex flex-col">
              {FAQ.map((f) => (
                <div key={f.q} className="py-5 border-t first:border-t-0" style={{ borderColor: B.line }}>
                  <dt className="text-[1.125rem] font-semibold" style={{ ...sans, color: B.espresso }}>{f.q}</dt>
                  <dd className="m-0 mt-2 text-[1rem] leading-relaxed" style={{ ...sans, color: B.body }}>{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* The close: the full quiz again */}
        <section className="px-5 sm:px-6 py-16 lg:py-24" style={{ background: B.espresso }}>
          <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="flex flex-col gap-5">
              <h2 className="m-0 text-[2.25rem] sm:text-[3rem] leading-[1.08]" style={{ ...serif, fontWeight: 400, color: B.linen }}>Ready to trade the overwhelm for a plan?</h2>
              <p className="m-0 text-[1.125rem] leading-relaxed" style={{ ...sans, color: B.onDark }}>Four quick questions, then pick a time to talk. There is no cost to you, and your credit stays untouched until you give the OK.</p>
              <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="self-start flex items-center gap-2.5 min-h-[44px] text-[0.9375rem] font-semibold hover:underline underline-offset-4" style={{ ...sans, color: B.linen }}>
                <Stars colour="#F2C66D" /> {count}
              </a>
              <p className="m-0 text-[0.9375rem]" style={{ ...sans, color: B.onDark }}>
                Rather ask a quick question first?{" "}
                <button type="button" onClick={story} className="cursor-pointer underline underline-offset-2 font-semibold hover:text-[#9DB6C3]" style={{ color: B.linen }}>Send me a note</button>
              </p>
            </div>
            <div className="rounded-[22px] p-5 sm:p-7" style={{ background: "#3E332D" }}>
              <PlanQuiz id="plan-final" dark />
            </div>
          </div>
        </section>

        <section className="px-5 sm:px-6 py-10 bg-white">
          <p className="max-w-4xl mx-auto m-0 text-center text-[0.9375rem]" style={{ ...sans, color: B.body }}>
            Want to read up first? See the <Link href="/services/first-time-buyers" className="underline underline-offset-2 hover:text-[#4F6B7A]">first-time buyer guide</Link> or try the{" "}
            <Link href="/calculators/affordability" className="underline underline-offset-2 hover:text-[#4F6B7A]">affordability calculator</Link>.
          </p>
        </section>
      </main>

      <JesseFooter />
      <StoryForm open={storyOpen} onClose={() => setStoryOpen(false)} />

      {/* Sticky plan button on phones once the hero is out of view */}
      <div className={`lg:hidden fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 bg-white/95 backdrop-blur border-t transition-transform duration-300 ${showBar ? "translate-y-0" : "translate-y-full"}`} style={{ borderColor: B.line }} aria-hidden={!showBar}>
        <button type="button" tabIndex={showBar ? 0 : -1} onClick={toPlan} className="cursor-pointer w-full rounded-full px-6 py-3.5 min-h-[52px] text-[1rem] font-semibold bg-[#4F6B7A] text-white" style={sans}>
          Get my first home plan
        </button>
      </div>
    </div>
  );
}

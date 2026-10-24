"use client";

import Image from "next/image";
import Link from "next/link";
import MortgageQuestions from "@/components/home/MortgageQuestions";
import ReviewCarousel, { type Review } from "@/components/landing/ReviewCarousel";
import { B, serif, sans } from "@/components/home/brand";
import type { GoogleReviews } from "@/lib/googleReviews";

const schedule = () => window.dispatchEvent(new CustomEvent("open-booking-modal"));
const story = () => window.dispatchEvent(new CustomEvent("open-story-form"));

// Word for word from Jesse's Google reviews (read from his Google Business Profile, October 2026).
// Highlights are exact excerpts. Never edit or paraphrase a review.
const REVIEWS: Review[] = [
  {
    name: "Syed Aklakur Rahman",
    tag: "First-time buyer",
    highlight: "As a first-time homebuyer, I was extremely fortunate to have Mr. Jesse guide us through the mortgage process.",
    full: "As a first-time homebuyer, I was extremely fortunate to have Mr. Jesse guide us through the mortgage process. His advice and assistance made a very stressful and complicated process much easier for us.\n\nWe initially approached one of Canada’s major banks, where we already had our savings and accounts. However, due to the complexity of documenting the income of a self-employed applicant, we were unable to move forward with the mortgage application. At that point, we had almost lost hope of purchasing our first home.\n\nWe were then referred to Jesse, and that completely changed our experience. He identified the right lender for our situation, advised us on the necessary documentation, and organized everything in a way that made the process straightforward for both us and the lender, another major bank of Canada.\n\nJesse was proactive, responsive, and professional throughout the entire process. His guidance and attention to detail helped us secure our mortgage within a very short period of time. Without his expertise and support, I honestly don't think we would have been able to navigate the process successfully.\n\nI am sincerely grateful to Jesse for helping us achieve our dream of owning our first home. We had faith on him since the beginning and we got the result for that.",
  },
  {
    name: "Rebecca Marshello",
    tag: "First-time buyer",
    highlight: "Thank you for everything and thank you for helping us get into our first home.",
    full: "Jesse was and is fantastic to work with. Coming as a first time homeowner he had his hands full with having to explain in detail every step of the process and looked into every question or requirement that I sent his way. He is so knowledgeable and kept me updated every step of the way. I am very happy to have worked with him and excited to continue to work with him in the future.\n\nThank you for everything and thank you for helping us get into our first home.",
  },
  {
    name: "Ephy Bookbinder",
    tag: "Realtor, for first-time buyer clients",
    highlight: "Within roughly 24 to 48 hours of getting involved, he had secured the financing my clients needed and put the deal firmly back on track.",
    full: "I recently had the opportunity to work with Jesse on a deal involving my first-time home buyer clients, and I can genuinely say he was instrumental in getting the deal across the finish line.\n\nMy clients had been working directly with their bank, but as we got further into the transaction, some financing issues came up and suddenly we were in a very difficult spot with time running out. That’s when we reached out to Jesse.\n\nEven though he was brought in at the last minute, he immediately jumped in, got himself fully up to speed, reviewed everything thoroughly, and started working on a solution right away.\n\nWhat impressed me most was how calm and responsive he remained throughout. There was a lot of stress, understandably, but Jesse was clear, steady, and solutions focused. We even went ahead and arranged an extension on the financing condition to create some breathing room, but Jesse worked so quickly that we didn’t even need the extra time.\n\nWithin roughly 24 to 48 hours of getting involved, he had secured the financing my clients needed and put the deal firmly back on track. As an Realtor, moments like this really show you the value of having the right professionals around you.\n\nI’m extremely grateful for the effort he put in and would absolutely recommend Jesse to any buyer or real estate professional looking for a mortgage agent who is knowledgeable, responsive, and willing to step up when it matters most.",
  },
  {
    name: "Paola Santiago",
    highlight: "He made the whole process easy to understand. He was knowledgeable, patient, and gave me confidence about the next steps.",
    full: "I met with Jesse to learn about getting ready for a mortgage, and he made the whole process easy to understand. He was knowledgeable, patient, and gave me confidence about the next steps.",
  },
  {
    name: "Daniella Guzzi",
    highlight: "He made what could have been a stressful and complicated process feel straightforward and manageable.",
    full: "We had an excellent experience working with Jesse Karkoukly and would highly recommend him to anyone looking for a mortgage broker. Jesse was incredibly knowledgeable, responsive, and genuinely invested in helping us find the right mortgage for our needs.\n\nHe made what could have been a stressful and complicated process feel straightforward and manageable. He was always available to answer our questions, explain our options clearly, and make sure we understood everything before making any decisions. We also really appreciated how proactive Jesse was throughout the entire process — he consistently went above and beyond to make sure everything stayed on track.\n\nWe felt completely confident having Jesse in our corner and couldn’t be happier with the outcome. If you’re looking for a mortgage broker who is professional, trustworthy, and truly cares about his clients, we would absolutely recommend Jesse!",
  },
];

// Condensed from the First-Time Home Buyers and Pre-Approval pages.
const HELP = [
  {
    title: "Know what you qualify for",
    body: "Your income, down payment, debts and credit score, looked at together. You come away with a realistic home buying plan and a clear sense of what makes sense for you.",
  },
  {
    title: "Get pre-approved when you start shopping",
    body: "A pre-approval holds your rate with a lender for up to 60 days, so timing matters. It works best once you are ready to look at homes.",
  },
  {
    title: "Use every program you qualify for",
    body: "The FHSA, the Home Buyers’ Plan and land transfer tax refunds can stack. For a Toronto couple using all of them, that can add up to over $100,000.",
  },
  {
    title: "Know your costs before you offer",
    body: "Land transfer tax, legal fees and other closing costs, worked out for your price, so closing day holds no surprises.",
  },
];

const LEARN = [
  { title: "The first-time buyer guide", body: "Qualifying, down payments, programs and the full process.", href: "/services/first-time-buyers" },
  { title: "How much can I afford?", body: "A quick estimate from your income and savings.", href: "/calculators/affordability" },
  { title: "What will my closing costs be?", body: "Land transfer tax and the rest, for your price.", href: "/calculators/closing-costs" },
];

function Buttons({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
      <button type="button" onClick={schedule} className={`cursor-pointer w-full sm:w-auto rounded-full px-7 py-4 min-h-[48px] text-[1rem] font-semibold transition-colors duration-150 border-[1.5px] ${dark ? "bg-[#C4A592] text-[#352B26] border-[#C4A592] hover:bg-[#9DB6C3] hover:border-[#9DB6C3]" : "bg-[#352B26] text-[#F5EFE8] border-[#352B26] hover:bg-[#4F6B7A] hover:border-[#4F6B7A]"}`} style={sans}>
        Schedule a call
      </button>
      <button type="button" onClick={story} className="cursor-pointer w-full sm:w-auto rounded-full px-7 py-4 min-h-[48px] text-[1rem] font-semibold transition-colors duration-150 bg-transparent text-[#352B26] border-[1.5px] border-[#352B26] hover:text-[#4F6B7A] hover:border-[#4F6B7A]" style={sans}>
        Start the conversation
      </button>
    </div>
  );
}

export default function FirstTimeBuyerLanding({ google }: { google: GoogleReviews }) {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 lg:pt-32 pb-14 lg:pb-20 px-5 sm:px-6" style={{ background: B.linen }}>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-14">
          <div className="flex justify-center lg:order-2 lg:shrink-0">
            <Image src="/jesse-hero-arch.jpg" alt="Jesse Karkoukly, Toronto mortgage agent" width={1000} height={1250} priority sizes="(min-width: 1024px) 340px, (min-width: 640px) 300px, 240px" className="w-[240px] h-[300px] sm:w-[300px] sm:h-[375px] lg:w-[340px] lg:h-[430px] object-cover" style={{ borderRadius: "999px 999px 18px 18px" }} />
          </div>
          <div className="flex-1 min-w-0 flex flex-col gap-6 lg:order-1">
            <h1 className="m-0 text-[2.75rem] sm:text-[3.5rem] lg:text-[4.5rem] leading-[1.03]" style={{ ...serif, color: B.espresso, fontWeight: 400, letterSpacing: "-0.5px" }}>
              Planning to buy your first home?
            </h1>
            <p className="m-0 text-[1.125rem] sm:text-[1.3125rem] leading-relaxed max-w-xl" style={{ ...sans, color: B.body }}>
              I help you make confident decisions and remove the overwhelm.
            </p>
            <div className="pt-1"><Buttons /></div>
            <p className="m-0 text-[0.9375rem]" style={{ ...sans, color: B.body }}>Jesse Karkoukly, Toronto mortgage agent at Sherwood Mortgage Group</p>
          </div>
        </div>
      </section>

      <ReviewCarousel heading="What first-time buyers say" reviews={REVIEWS} google={google} />

      {/* How I help */}
      <section className="px-5 sm:px-6 py-16 lg:py-20" style={{ background: B.sand }}>
        <div className="max-w-6xl mx-auto flex flex-col gap-9">
          <h2 className="m-0 text-[2rem] sm:text-[2.5rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>How I help first-time buyers</h2>
          <ul className="m-0 p-0 list-none grid gap-4 sm:grid-cols-2">
            {HELP.map((h, i) => (
              <li key={h.title} className="bg-white rounded-2xl p-6 sm:p-7 flex gap-5">
                <span aria-hidden="true" className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-[1rem]" style={{ ...serif, background: B.linen, color: B.clayDeep }}>{i + 1}</span>
                <span className="flex flex-col gap-2">
                  <h3 className="m-0 text-[1.375rem] leading-snug" style={{ ...serif, fontWeight: 500, color: B.espresso }}>{h.title}</h3>
                  <p className="m-0 text-[1rem] leading-[1.65]" style={{ ...sans, color: B.body }}>{h.body}</p>
                </span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3">
            <p className="m-0 text-[1.0625rem]" style={{ ...sans, color: B.body }}>Typically, there is no cost to you. Lenders pay me when your mortgage closes.</p>
            <Buttons />
          </div>
        </div>
      </section>

      {/* Learn more */}
      <section className="bg-white px-5 sm:px-6 py-14 lg:py-16">
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          <h2 className="m-0 text-[1.75rem] sm:text-[2rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>Want to read up first?</h2>
          <ul className="m-0 p-0 list-none grid gap-3 md:grid-cols-3">
            {LEARN.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="group h-full rounded-2xl p-5 flex items-start justify-between gap-4 border-[1.5px] transition-colors duration-150 hover:border-[#4F6B7A]" style={{ borderColor: B.line }}>
                  <span className="flex flex-col gap-1">
                    <span className="text-[1.0625rem] font-semibold group-hover:text-[#4F6B7A]" style={{ ...sans, color: B.espresso }}>{l.title}</span>
                    <span className="text-[0.9375rem]" style={{ ...sans, color: B.body }}>{l.body}</span>
                  </span>
                  <span aria-hidden="true" className="group-hover:text-[#4F6B7A] group-hover:translate-x-0.5 transition-transform" style={{ color: B.espresso }}>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <MortgageQuestions onEmail={story} />
    </>
  );
}

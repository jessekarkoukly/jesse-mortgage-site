"use client";

import Image from "next/image";
import ReviewsStrip from "@/components/home/ReviewsStrip";
import { GOOGLE_REVIEWS_FALLBACK } from "@/lib/googleReviews";
import MortgageQuestions from "@/components/home/MortgageQuestions";
import { B, serif, sans } from "@/components/home/brand";

export type LandingContent = {
  label: string;
  headline: string;
  intro: string;
  points: { title: string; body: string }[];
  steps: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
};

const schedule = () => window.dispatchEvent(new CustomEvent("open-booking-modal"));
const story = () => window.dispatchEvent(new CustomEvent("open-story-form"));

/** Ad landing page in the homepage style: hero, reviews, what you will know, three steps, FAQ, closing band. */
export default function LandingPage({ c }: { c: LandingContent }) {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 lg:pt-32 pb-14 lg:pb-20 px-5 sm:px-6" style={{ background: B.linen }}>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-14">
          <div className="flex justify-center lg:order-2 lg:shrink-0">
            <Image
              src="/jesse-hero-arch.jpg"
              alt="Jesse Karkoukly, Toronto mortgage agent"
              width={1000}
              height={1250}
              priority
              sizes="(min-width: 1024px) 340px, (min-width: 640px) 300px, 240px"
              className="w-[240px] h-[300px] sm:w-[300px] sm:h-[375px] lg:w-[340px] lg:h-[430px] object-cover"
              style={{ borderRadius: "999px 999px 18px 18px" }}
            />
          </div>
          <div className="flex-1 min-w-0 flex flex-col gap-6 lg:order-1">
            <p className="m-0 text-[1.25rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>{c.label}</p>
            <h1 className="m-0 text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem] leading-[1.05]" style={{ ...serif, color: B.espresso, fontWeight: 400, letterSpacing: "-0.5px" }}>
              {c.headline}
            </h1>
            <p className="m-0 text-[1.0625rem] sm:text-[1.1875rem] leading-relaxed max-w-xl" style={{ ...sans, color: B.body }}>{c.intro}</p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 pt-1">
              <button type="button" onClick={schedule} className="cursor-pointer w-full sm:w-auto rounded-full px-7 py-4 min-h-[48px] text-[1rem] font-semibold transition-colors duration-150 bg-[#352B26] text-[#F5EFE8] border-[1.5px] border-[#352B26] hover:bg-[#4F6B7A] hover:border-[#4F6B7A]" style={sans}>
                Schedule a call
              </button>
              <button type="button" onClick={story} className="cursor-pointer w-full sm:w-auto rounded-full px-7 py-4 min-h-[48px] text-[1rem] font-semibold transition-colors duration-150 bg-transparent text-[#352B26] border-[1.5px] border-[#352B26] hover:text-[#4F6B7A] hover:border-[#4F6B7A]" style={sans}>
                Start the conversation
              </button>
            </div>
          </div>
        </div>
      </section>

      <ReviewsStrip google={GOOGLE_REVIEWS_FALLBACK} />

      {/* What you will know */}
      <section className="bg-white px-5 sm:px-6 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          <h2 className="m-0 text-[2.125rem] sm:text-[2.75rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>What you will know after one call</h2>
          <ul className="m-0 p-0 list-none grid gap-4 md:grid-cols-3">
            {c.points.map((p) => (
              <li key={p.title} className="rounded-2xl p-6 sm:p-7 flex flex-col gap-2.5" style={{ background: B.linen }}>
                <span className="text-[1.375rem] leading-snug" style={{ ...serif, fontWeight: 500, color: B.espresso }}>{p.title}</span>
                <span className="text-[1rem] leading-[1.65]" style={{ ...sans, color: B.body }}>{p.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Three steps */}
      <section className="px-5 sm:px-6 py-16 lg:py-20" style={{ background: B.sand }}>
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          <h2 className="m-0 text-[2.125rem] sm:text-[2.75rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>How it works</h2>
          <ol className="m-0 p-0 list-none grid gap-8 md:grid-cols-3 md:gap-10">
            {c.steps.map((s, i) => (
              <li key={s.title} className="flex flex-col gap-3">
                <span className="flex items-center gap-3">
                  <span aria-hidden="true" className="w-11 h-11 rounded-full flex items-center justify-center text-[1.0625rem]" style={{ ...serif, background: B.espresso, color: B.linen }}>{i + 1}</span>
                  <span aria-hidden="true" className="hidden md:block flex-1 h-[2px]" style={{ background: i < c.steps.length - 1 ? B.line : "transparent" }} />
                </span>
                <h3 className="m-0 text-[1.375rem] leading-snug" style={{ ...serif, fontWeight: 500, color: B.espresso }}>{s.title}</h3>
                <p className="m-0 text-[1rem] leading-[1.65]" style={{ ...sans, color: B.body }}>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-5 sm:px-6 py-16 lg:py-20">
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          <h2 className="m-0 text-[2.125rem] sm:text-[2.75rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>Common questions</h2>
          <div className="flex flex-col divide-y" style={{ borderColor: B.line }}>
            {c.faqs.map((f) => (
              <div key={f.q} className="py-6 flex flex-col gap-3" style={{ borderColor: B.line }}>
                <h3 className="m-0 text-[1.125rem] font-semibold leading-snug" style={{ ...sans, color: B.espresso }}>{f.q}</h3>
                {f.a.split("\n\n").map((para, j) => (
                  <p key={j} className="m-0 text-[1.0625rem] leading-relaxed" style={{ ...sans, color: B.body }}>{para}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <MortgageQuestions onEmail={story} />
    </>
  );
}

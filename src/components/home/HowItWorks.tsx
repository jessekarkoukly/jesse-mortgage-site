"use client";

import Link from "next/link";
import { useState } from "react";
import { B, serif, sans } from "./brand";

// Step explanations use Jesse's wording from the Working with Jesse page.
const STEPS = [
  { title: "Intro call", text: "It starts with a conversation. Your situation, your timeline, what matters most to you. I ask the questions, you share what you know, and by the end you have a clear picture of what the path forward looks like." },
  { title: "List of documents needed", text: "I send you a clear list of exactly what I need. Nothing more. You share documents when you are ready and I let you know if anything is missing." },
  { title: "Personalized roadmap", text: "I put together a customized plan based on your income, your goals, and your timeline. I walk you through each scenario, look at a few different options side by side, and you leave knowing exactly where you stand." },
  { title: "Pre-approval", text: "I shop your file across 50+ lenders and come back with real options. You see multiple scenarios with different rates, terms, and structures so you can make an informed decision." },
  { title: "Mortgage commitment", text: "Once you have an accepted offer, I finalize the approval and lock in your rate. I manage the lender relationship and keep you updated at every stage." },
  { title: "Keys in hand", text: "The mortgage funds, you sign at the lawyer's office, and you get your keys. My job at this point is to make sure nothing goes wrong." },
];

/**
 * Six step cards that flip over to show the explanation in inverted colours.
 * Both sides are always in the page, so search engines and AI tools read every step.
 */
export default function HowItWorks() {
  const [flipped, setFlipped] = useState<Set<number>>(() => new Set());
  const last = STEPS.length - 1;
  const toggle = (i: number) =>
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section className="px-5 sm:px-6 py-16 lg:py-20" style={{ background: B.sand }}>
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <h2 className="m-0 text-[2.125rem] sm:text-[2.75rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>How it works</h2>
          <Link href="/working-with-jesse" className="ml-auto text-[0.9375rem] font-semibold underline underline-offset-2 hover:text-[#4F6B7A] py-2" style={{ ...sans, color: B.espresso }}>
            Each step in detail
          </Link>
        </div>

        <ol className="m-0 p-0 list-none grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s, i) => {
            const isFlipped = flipped.has(i);
            const isKeys = i === last;
            // Front: linen (Keys in hand: sky deep). Back: the inverse.
            const front = isKeys ? { bg: B.skyDeep, fg: B.linen, num: B.linen } : { bg: B.linen, fg: B.espresso, num: B.clayDeep };
            const back = isKeys ? { bg: B.linen, fg: B.espresso, label: B.skyDeep } : { bg: B.espresso, fg: B.onDark, label: B.clayLight };
            return (
              <li key={s.title} className="[perspective:1200px]">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-pressed={isFlipped}
                  aria-label={`Step ${i + 1}: ${s.title}. ${isFlipped ? "Show the step name" : "Show what happens"}`}
                  className="jk-flip relative block w-full h-[230px] sm:h-[250px] cursor-pointer text-left rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-offset-4"
                  style={{ transform: isFlipped ? "rotateY(180deg)" : "none" }}
                >
                  {/* Front */}
                  <span
                    className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between overflow-hidden [backface-visibility:hidden]"
                    style={{ background: front.bg, color: front.fg, boxShadow: isKeys ? "0 10px 28px rgba(79,107,122,0.35)" : "none" }}
                  >
                    {isKeys && (
                      <svg aria-hidden="true" width="120" height="120" viewBox="0 0 120 120" className="absolute -right-2.5 -top-2.5">
                        <g fill="none" stroke={B.skyLight} strokeWidth="2" strokeLinecap="round"><path d="M88 22v12M82 28h12" /><path d="M104 46v8M100 50h8" /><path d="M70 10v6M67 13h6" /></g>
                        <circle cx="98" cy="30" r="2.5" fill={B.linen} /><circle cx="80" cy="44" r="2" fill={B.clayLight} /><circle cx="110" cy="14" r="2" fill={B.clayLight} />
                      </svg>
                    )}
                    <span className="text-[2.5rem] leading-none" style={{ ...serif, color: front.num }}>0{i + 1}</span>
                    <span className="flex items-end justify-between gap-4">
                      <span className="flex items-center gap-2.5">
                        {isKeys && (
                          <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={B.linen} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="7.5" cy="15.5" r="4.5" /><path d="M10.7 12.3 20 3" /><path d="m16 7 3 3" /><path d="m18 5 2 2" />
                          </svg>
                        )}
                        <span className="text-[1.375rem] leading-snug" style={{ ...serif, fontWeight: 500 }}>{s.title}</span>
                      </span>
                      <span aria-hidden="true" className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: isKeys ? "rgba(245,239,232,0.18)" : B.white }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" /><path d="M18 3v4h-4M6 21v-4h4" /></svg>
                      </span>
                    </span>
                  </span>

                  {/* Back */}
                  <span
                    className="absolute inset-0 rounded-2xl p-6 flex flex-col gap-2.5 overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]"
                    style={{ background: back.bg, color: back.fg }}
                  >
                    <span className="text-[1.0625rem]" style={{ ...serif, fontStyle: "italic", color: back.label }}>Step {i + 1}: {s.title}</span>
                    <span className="text-[0.9375rem] sm:text-[1rem] leading-[1.6]" style={sans}>{s.text}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

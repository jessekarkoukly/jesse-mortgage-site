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

export default function HowItWorks() {
  const [open, setOpen] = useState<number | null>(null);
  const last = STEPS.length - 1;

  return (
    <section className="px-5 sm:px-6 py-16 lg:py-20" style={{ background: B.sand }}>
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <h2 className="m-0 text-[2.125rem] sm:text-[2.75rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>How it works</h2>
          <Link href="/working-with-jesse" className="ml-auto text-[0.9375rem] font-semibold underline underline-offset-2 hover:text-[#4F6B7A] py-2" style={{ ...sans, color: B.espresso }}>
            Each step in detail
          </Link>
        </div>

        <ol className="m-0 p-0 list-none grid gap-3.5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {STEPS.map((s, i) => {
            const isOpen = open === i;
            const isKeys = i === last;
            return (
              <li key={s.title} className="relative">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`step-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="relative overflow-hidden w-full h-full text-left cursor-pointer rounded-2xl p-5 flex flex-col gap-2 border-[1.5px] transition-[border-color,transform] duration-150 hover:-translate-y-0.5"
                  style={{
                    background: isKeys ? B.skyDeep : B.linen,
                    color: isKeys ? B.linen : B.espresso,
                    borderColor: isOpen ? (isKeys ? B.skyLight : B.skyDeep) : "transparent",
                    boxShadow: isKeys ? "0 10px 28px rgba(79,107,122,0.35)" : "none",
                  }}
                >
                  {isKeys && (
                    <svg aria-hidden="true" width="120" height="120" viewBox="0 0 120 120" className="absolute -right-2.5 -top-2.5">
                      <g fill="none" stroke={B.skyLight} strokeWidth="2" strokeLinecap="round"><path d="M88 22v12M82 28h12" /><path d="M104 46v8M100 50h8" /><path d="M70 10v6M67 13h6" /></g>
                      <circle cx="98" cy="30" r="2.5" fill={B.linen} /><circle cx="80" cy="44" r="2" fill={B.clayLight} /><circle cx="110" cy="14" r="2" fill={B.clayLight} />
                    </svg>
                  )}
                  <span className="flex items-center justify-between">
                    <span className="text-[1.75rem]" style={{ ...serif, color: isKeys ? B.linen : B.clayDeep }}>0{i + 1}</span>
                    <span
                      aria-hidden="true"
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[1rem] transition-transform duration-200"
                      style={{ background: isKeys ? "rgba(245,239,232,0.18)" : B.white, color: isKeys ? B.linen : B.espresso, transform: isOpen ? "rotate(45deg)" : "none" }}
                    >
                      +
                    </span>
                  </span>
                  <span className="flex items-center gap-2.5">
                    {isKeys && (
                      <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={B.linen} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="7.5" cy="15.5" r="4.5" /><path d="M10.7 12.3 20 3" /><path d="m16 7 3 3" /><path d="m18 5 2 2" />
                      </svg>
                    )}
                    <b className="text-[1.0625rem] leading-snug" style={sans}>{s.title}</b>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* The bubble for the chosen step. Every explanation stays in the page for search and AI. */}
        <div className="relative">
          {STEPS.map((s, i) => (
            <div
              key={s.title}
              id={`step-${i}`}
              role="region"
              aria-label={s.title}
              hidden={open !== i}
              className="rounded-2xl px-6 py-5 sm:px-8 sm:py-6 shadow-[0_14px_34px_rgba(53,43,38,0.18)]"
              style={{ background: B.espresso, color: B.linen, animation: "jk-pop 0.28s cubic-bezier(0.34,1.56,0.64,1)" }}
            >
              <p className="m-0 mb-1.5 text-[1.0625rem]" style={{ ...serif, fontStyle: "italic", color: B.clayLight }}>Step {i + 1}: {s.title}</p>
              <p className="m-0 text-[1rem] sm:text-[1.0625rem] leading-[1.65]" style={{ ...sans, color: B.onDark }}>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { B, serif, sans } from "./brand";

// Step explanations use Jesse's wording from the Working with Jesse page.
const STEPS = [
  { title: "Intro call", text: "It starts with a conversation. Your situation, your timeline, what matters most to you. I ask the questions, you share what you know, and by the end you have a clear picture of what the path forward looks like." },
  { title: "List of documents needed", text: "I send you a clear list of exactly what I need. You share documents when you are ready and I let you know if anything is missing." },
  { title: "Personalized roadmap", text: "I put together a customized plan based on your income, your goals, and your timeline. I walk you through each scenario and look at a few different options side by side." },
  { title: "Pre-approval", text: "I shop your file across 50+ lenders and come back with real options. You see multiple scenarios with different rates, terms, and structures so you can make an informed decision." },
  { title: "Mortgage commitment", text: "Once you have an accepted offer, I finalize the approval and lock in your rate. I manage the lender relationship and keep you updated at every stage." },
  { title: "Keys in hand", text: "My job is to get you from the starting point to keys in hand." },
];

/**
 * Vertical timeline. Each step's dot fills in as it scrolls into view, and the line grows with it.
 * All text is always on the page.
 */
export default function HowItWorks() {
  const [reached, setReached] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const last = STEPS.length - 1;

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      const id = requestAnimationFrame(() => setReached(STEPS.length));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.i);
            setReached((r) => Math.max(r, i + 1));
          }
        });
      },
      { rootMargin: "0px 0px -35% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="px-5 sm:px-6 py-16 lg:py-24" style={{ background: B.sand }}>
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-32 self-start flex flex-col gap-4">
          <h2 className="m-0 text-[2.125rem] sm:text-[2.75rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>How it works</h2>
          <Link href="/working-with-jesse" className="self-start text-[0.9375rem] font-semibold underline underline-offset-2 hover:text-[#4F6B7A] py-2" style={{ ...sans, color: B.espresso }}>
            Each step in detail
          </Link>
        </div>

        <ol className="m-0 p-0 list-none relative">
          {STEPS.map((s, i) => {
            const on = i < reached;
            const isKeys = i === last;
            const dotBg = on ? (isKeys ? B.skyDeep : B.espresso) : B.linen;
            return (
              <li
                key={s.title}
                ref={(el) => { refs.current[i] = el; }}
                data-i={i}
                className="relative grid grid-cols-[44px_minmax(0,1fr)] gap-x-5 pb-9 last:pb-0"
              >
                {/* Connecting line to the next step */}
                {i < last && (
                  <span aria-hidden="true" className="absolute left-[21px] top-11 bottom-0 w-[2px]" style={{ background: B.line }}>
                    <span
                      className="absolute inset-x-0 top-0 transition-[height] duration-700 ease-out"
                      style={{ height: i + 1 < reached ? "100%" : "0%", background: B.espresso }}
                    />
                  </span>
                )}

                <span
                  aria-hidden="true"
                  className="relative z-[1] w-11 h-11 rounded-full flex items-center justify-center text-[1.0625rem] border-[1.5px] transition-colors duration-500"
                  style={{ ...serif, background: dotBg, borderColor: on ? dotBg : B.line, color: on ? B.linen : B.clayDeep }}
                >
                  {isKeys ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="7.5" cy="15.5" r="4.5" /><path d="M10.7 12.3 20 3" /><path d="m16 7 3 3" /><path d="m18 5 2 2" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </span>

                <div className="flex flex-col gap-1.5 pt-2">
                  <h3 className="m-0 text-[1.375rem] leading-snug" style={{ ...serif, fontWeight: 500, color: isKeys ? B.skyDeep : B.espresso }}>
                    <span className="sr-only">Step {i + 1}: </span>{s.title}
                  </h3>
                  <p className="m-0 text-[1rem] leading-[1.65] max-w-xl" style={{ ...sans, color: B.body }}>{s.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";


const FAQS = [
  {
    q: "Do I actually have to pay anything to use a mortgage broker?",
    a: "No. The lender pays the broker when a mortgage closes, not you. That fee is built into how lenders price their mortgages and does not affect the rate you receive. You pay nothing for the advice.",
  },
  {
    q: "Can a broker actually get me a better rate than if I just go to my bank?",
    a: "Often yes, sometimes no. A broker has access to over 50 lenders including banks, credit unions, and monoline lenders your bank will never mention. In most cases, that competition produces a better rate. But if your bank genuinely has the best deal for your situation, Jesse will tell you that and explain why.",
  },
  {
    q: "What actually happens when I reach out?",
    a: "You book a call. Jesse asks about your situation, your timeline, and what you are trying to accomplish. No documents yet, just a conversation. From there, he tells you honestly where you stand, what your options look like, and what the next step is. Most people leave that first call with more clarity than they expected.",
  },
  {
    q: "My renewal is coming up. When should I actually start looking?",
    a: "120 days before your term ends. That is when lenders will issue rate holds and when you have real negotiating leverage. Most banks do not send renewal offers until 21 days out, which leaves almost no time to compare. Starting early is not about rushing a decision. It is about having enough time to make a good one.",
  },
  {
    q: "My income is complicated. Can I still get approved?",
    a: "Complicated income is where a broker adds the most value. Lenders treat contract income, self-employment, commission, and bonuses differently, and some lenders are significantly better than others for specific income types. Before asking for a single document, Jesse will tell you honestly whether and how you qualify.",
  },
  {
    q: "What if I lock in a rate and then rates go down?",
    a: "You always get the better rate. A rate hold locks in today's rate, but if rates drop before your closing date, the lender gives you the lower rate instead. If rates go up, you keep the original hold. Either way, you end up with the best available number.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-white py-24 sm:py-28 px-6 scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h2
            className="text-[2.25rem] sm:text-[2.75rem] font-bold text-navy leading-tight"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Questions people actually ask.
          </h2>
        </div>

        {/* Accordion items */}
        <div className="flex flex-col divide-y divide-sand-2">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-6 min-h-[48px] text-left cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-semibold text-navy text-[1.0625rem] sm:text-[1.125rem] group-hover:text-coral transition-colors duration-150"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-200 group-hover:scale-110 ${
                      isOpen
                        ? "border-coral bg-coral text-white"
                        : "border-sand-2 text-slate group-hover:border-coral group-hover:text-coral"
                    }`}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      {isOpen ? (
                        /* X */
                        <>
                          <line x1="2" y1="2" x2="10" y2="10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                          <line x1="10" y1="2" x2="2" y2="10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                        </>
                      ) : (
                        /* + */
                        <>
                          <line x1="6" y1="1" x2="6" y2="11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                          <line x1="1" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                        </>
                      )}
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <p
                    className="pb-6 text-[1.0625rem] text-navy-2 leading-relaxed"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

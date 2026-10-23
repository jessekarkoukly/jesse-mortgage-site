"use client";

import { useState } from "react";


import { FAQS } from "@/data/faqs/home";

export { FAQS };

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://jessekarkoukly.com/#faq",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a.replace(/\n\n/g, " ") },
  })),
};

export default function FAQSection() {
  const [closed, setClosed] = useState<Set<number>>(() => new Set());
  // Fully expanded by default so every answer is visible to readers, search engines and AI tools.
  const toggle = (i: number) =>
    setClosed((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section id="faq" className="bg-white py-24 sm:py-28 px-6 scroll-mt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h2
            className="text-[2.25rem] sm:text-[2.75rem] font-bold text-navy leading-tight"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Common questions
          </h2>
        </div>

        {/* Accordion items */}
        <div className="flex flex-col divide-y divide-sand-2">
          {FAQS.map((item, i) => {
            const isOpen = !closed.has(i);
            return (
              <div key={i}>
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 py-6 min-h-[48px] text-left cursor-pointer group"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span
                    className="flex-1 min-w-0 font-semibold text-navy text-[1.0625rem] sm:text-[1.125rem] group-hover:text-coral transition-colors duration-150"
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

                {/* Answer is always in the page so search engines and AI tools can read it; hidden until opened */}
                <div
                  id={`faq-answer-${i}`}
                  hidden={!isOpen}
                  className="pb-6 flex flex-col gap-3 text-[1.0625rem] text-navy-2 leading-relaxed"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {item.a.split("\n\n").map((para, j) => (
                    <p key={j} className="m-0">{para}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

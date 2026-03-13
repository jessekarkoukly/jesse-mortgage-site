"use client";

import { useState } from "react";

const STEPS = [
  {
    number: "01",
    title: "Intro Call",
    subtitle: "Understanding where you are starting from.",
    detail:
      "A short call to understand your situation. What are you trying to do, what does your financial picture look like, and is anything complicated. No forms, no application. By the end of the call, you will know where you stand and what the next step looks like.",
  },
  {
    number: "02",
    title: "Document Collection",
    subtitle: "At your pace.",
    detail:
      "Jesse tells you exactly what he needs and why. Income documents, ID, mortgage statements if applicable. He works around your schedule.",
  },
  {
    number: "03",
    title: "Your Plan",
    subtitle: "A clear picture built around your situation.",
    detail:
      "Jesse runs your numbers across lenders and comes back with a clear picture: what you qualify for, what it costs, and what the options actually mean for your situation. Not a rate sheet. A plan.",
  },
  {
    number: "04",
    title: "Pre-Approval",
    subtitle: "Know your options, not just your limit.",
    detail:
      "A pre-approval locks in a rate hold for up to 120 days while you shop. It also tells sellers you are serious. Jesse handles the application and keeps you updated at every step.",
  },
  {
    number: "05",
    title: "Full Approval",
    subtitle: "Lender signed off. Conditions cleared.",
    detail:
      "Once you have an accepted offer, Jesse submits for full approval. He manages the conditions, the appraisal, insurance, any lender requests, so you are not chasing paperwork on your own.",
  },
  {
    number: "06",
    title: "Ongoing Support",
    subtitle: "Still here when rates change, life changes, or you just have a question.",
    detail:
      "Jesse tracks your renewal date and reaches out before it matters. If rates shift, your situation changes, or you just have a question two years from now, he is still the person you call.",
  },
];

export default function ProcessAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-sand py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <p
          className="text-[0.6875rem] font-semibold text-coral tracking-[0.2em] uppercase mb-4"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          How It Works
        </p>
        <h2
          className="text-[2rem] sm:text-[2.5rem] font-bold text-navy leading-tight mb-12"
          style={{ fontFamily: "var(--font-spectral)" }}
        >
          Six steps from first call to keys in hand<span className="text-coral">.</span>
        </h2>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {STEPS.map((step, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? "bg-navy border-navy shadow-lg"
                    : "bg-white border-sand-2 hover:border-coral/30 hover:shadow-md"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full text-left p-5 sm:p-6 flex items-center gap-5 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  {/* Number */}
                  <span
                    className={`font-bold text-[1.75rem] sm:text-[2rem] leading-none shrink-0 w-12 transition-colors duration-300 ${
                      isOpen ? "text-coral" : "text-coral/40"
                    }`}
                    style={{ fontFamily: "var(--font-spectral)" }}
                  >
                    {step.number}
                  </span>

                  {/* Title + subtitle */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-bold text-[1rem] sm:text-[1.0625rem] transition-colors duration-300 ${
                        isOpen ? "text-sand" : "text-navy"
                      }`}
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      {step.title}
                    </p>
                    <p
                      className={`text-[0.8125rem] sm:text-[0.875rem] mt-0.5 transition-colors duration-300 ${
                        isOpen ? "text-sand/50" : "text-slate"
                      }`}
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      {step.subtitle}
                    </p>
                  </div>

                  {/* Toggle icon */}
                  <span
                    className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "bg-coral text-white rotate-45 text-[1.375rem]"
                        : "bg-sand text-slate text-[1.25rem]"
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6">
                    <div className="ml-[4.25rem] pt-4 border-t border-white/10">
                      <p
                        className="text-sand/70 text-[0.9375rem] leading-relaxed max-w-xl"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        {step.detail}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

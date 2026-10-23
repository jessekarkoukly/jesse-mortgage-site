"use client";

import { useState } from "react";


export const FAQS = [
  {
    q: "Do I actually have to pay anything to use a mortgage broker?",
    a: "Typically, no. On most residential mortgages, the lender pays me a finder's fee when your mortgage closes, so there is no cost to you.\n\nWorking with me means I can see rates across lenders and know where I can negotiate the best rate and term. The only time a broker usually charges a fee is on an alternative (B lender) mortgage, and I would tell you what it costs upfront, in the first conversation.\n\nWorking with a trusted broker can often save you money over the long run, through good advice, lender deals only available to brokers, and volume discounts some lenders offer.",
  },
  {
    q: "Can a broker actually get me a better rate than if I just go to my bank?",
    a: "Often yes, sometimes no. As a mortgage broker, I have access to over 50 lenders.\n\nBut if your bank genuinely has the best deal for your situation, I will tell you that straight up and explain why.",
  },
  {
    q: "How much do I need for a down payment in Ontario?",
    a: "At least 5% of the first $500,000 and 10% of the part between $500,000 and $1.5 million. Homes priced at $1.5 million or more need 20% down. For example, a $700,000 home needs at least $45,000: $25,000 on the first $500,000 and $20,000 on the next $200,000. With less than 20% down, you also pay mortgage default insurance, which is added to your mortgage.",
  },
  {
    q: "What first-time home buyer programs can I use in Ontario?",
    a: "The main ones are the First Home Savings Account (FHSA), the RRSP Home Buyers' Plan and the land transfer tax refund. The FHSA lets you save up to $40,000 with tax-deductible contributions and tax-free withdrawals. The Home Buyers' Plan lets you take up to $60,000 from your RRSP and pay it back over time. First-time buyers can get up to $4,000 back on Ontario land transfer tax, plus up to $4,475 on Toronto's. Which ones you qualify for depends on your situation, and I walk through that with you.",
  },
  {
    q: "I'm self-employed or my income is complicated. Can I still get approved?",
    a: "Complicated income is where a broker can add a substantial amount of value. Lenders treat contract income, self-employment, commission, and bonuses differently, and some lenders are significantly better than others for specific income types. Before asking for a single document, I will tell you honestly whether and how you qualify.",
  },
  {
    q: "What will my closing costs be in Toronto?",
    a: "Land transfer tax is usually the biggest one, and in Toronto you pay it twice: once to the province and once to the city. On top of that, plan for legal fees, title insurance, a home inspection and adjustments like prepaid property tax. The closing cost calculator on this site works it out for your price.",
  },
  {
    q: "What actually happens when I reach out?",
    a: "Typically, it starts with an intro call where I learn about your situation and what you are hoping for. Everything you share is kept secure and confidential.\n\nFrom there, I build a mortgage plan with you that goes beyond the mortgage itself: your max purchase price, different home buying scenarios, qualification and pre-approval, and the details that come with different lenders and products.\n\nThen I walk with you through every step, from pre-qualification to getting your keys.",
  },
  {
    q: "My renewal is coming up. When should I actually start looking?",
    a: "120 days before your term ends. That is when lenders will issue rate holds and when you have real negotiating leverage. Most banks do not send renewal offers until 21 days out, which leaves almost no time to compare. Starting early is not about rushing a decision. It is about having enough time to make a good one.",
  },
  {
    q: "What if I lock in a rate and then rates go down?",
    a: "You always get the better rate. A rate hold locks in today's rate, but if rates drop before your closing date, the lender gives you the lower rate instead. If rates go up, you keep the original hold. Either way, you end up with the best available number.",
  },
];

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

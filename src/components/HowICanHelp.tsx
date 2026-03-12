"use client";

import { useState } from "react";
import Link from "next/link";

interface ServiceCard {
  title: string;
  teaser: string;
  bullets: string[];
  description?: string;
  link: string;
  featured?: boolean;
}

const CARDS: [ServiceCard, ServiceCard][] = [
  /* ── Row 1: Featured ── */
  [
    {
      title: "First-Time Home Buyers",
      teaser:
        "Buying your first home is exciting and nerve-wracking at the same time. This is where you start getting prepared.",
      bullets: [
        "Plain-language walkthrough of every step in the process",
        "Access to first-time buyer incentives and rebates",
        "Stress test explained so you know exactly where you stand",
        "Guidance from offer accepted to keys in hand",
      ],
      link: "/services/first-time-buyers",
      featured: true,
    },
    {
      title: "Pre-Approval",
      teaser:
        "Know exactly what you qualify for before you start shopping.",
      bullets: [
        "Get a full picture of your buying power before making offers",
        "Understand what rate you can lock in today",
        "Strengthen your offer in a competitive market",
        "No surprises when it matters most",
      ],
      link: "/services/pre-approval",
      featured: true,
    },
  ],
  /* ── Row 2 ── */
  [
    {
      title: "Self-Employed Mortgages",
      teaser:
        "Your income doesn't look like a typical paystub. That doesn't mean you don't qualify.",
      bullets: [
        "Lender programs built for business owners and incorporated professionals",
        "Alternative income verification when traditional documents fall short",
        "Strategies to maximize qualifying income from your business",
        "Access to lenders who understand self-employed borrowers",
      ],
      link: "/services/self-employed",
    },
    {
      title: "Specialty Programs",
      teaser:
        "Not everyone fits a standard mortgage box. That's where this comes in.",
      bullets: [
        "Medical Professional Lending Solutions",
        "High Net Worth Products",
        "Reverse Mortgages",
        "New to Canada Solutions",
        "Self-Employed / Incorporated Borrower Products",
        "Construction & Renovation Loans",
      ],
      description:
        "Not everyone fits into a standard mortgage box, whether you're purchasing, refinancing, or renewing. That's why we offer specialized programs designed to support professionals, newcomers, business owners, retirees, and more.",
      link: "/services/specialty",
    },
  ],
  /* ── Row 3 ── */
  [
    {
      title: "Mortgage Renewal",
      teaser:
        "Your renewal is a negotiation. Most people don't treat it that way.",
      bullets: [
        "Your lender's first offer is rarely their best",
        "Access to the full market, not just your current lender",
        "Rate holds available up to 120 days before renewal",
        "A 15-minute review could save you thousands",
      ],
      link: "/services/renewal",
    },
    {
      title: "Refinancing / Equity Access",
      teaser:
        "Is breaking your mortgage early worth it? The math will tell you.",
      bullets: [
        "Access the equity you have built for renovations, investments, or life events",
        "Calculate your exact penalty and break-even point",
        "Understand IRD, blend-and-extend, and all your options",
        "50+ lenders compared to find the best refinancing rate",
      ],
      link: "/services/refinancing",
    },
  ],
  /* ── Row 4 ── */
  [
    {
      title: "Cottage & Vacation Properties",
      teaser:
        "Financing a cottage or vacation property works differently. Here's how.",
      bullets: [
        "Different qualification rules than a primary residence",
        "Seasonal and year-round property options",
        "Understanding how rental income can support qualification",
        "Lender options that most brokers don't know about",
      ],
      link: "/services/cottage-vacation",
    },
    {
      title: "Debt Consolidation",
      teaser:
        "High-interest debt is expensive. Your mortgage might be the solution.",
      bullets: [
        "Roll high-interest credit card and loan debt into your mortgage",
        "Significantly reduce your monthly obligations",
        "Understand the long-term trade-offs before deciding",
        "A strategy built around your full financial picture",
      ],
      link: "/services/debt-consolidation",
    },
  ],
];

function AccordionCard({
  card,
  isOpen,
  onToggle,
}: {
  card: ServiceCard;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`rounded-xl border transition-colors duration-300 overflow-hidden ${
        isOpen
          ? "bg-[#243a4f] border-navy-2"
          : "bg-navy border-navy-2 hover:border-coral"
      }`}
    >
      <button
        onClick={onToggle}
        className={`w-full text-left cursor-pointer ${
          card.featured ? "p-5 sm:p-7 md:p-8" : "p-4 sm:p-5 md:p-6"
        }`}
        aria-expanded={isOpen}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p
              className={`font-bold text-sand leading-snug ${
                card.featured
                  ? "text-[1.25rem] sm:text-[1.5rem]"
                  : "text-[1.0625rem] sm:text-[1.125rem]"
              }`}
              style={{ fontFamily: "var(--font-spectral)" }}
            >
              {card.title}
            </p>
            <p
              className={`text-slate mt-2 leading-relaxed ${
                card.featured ? "text-[0.9375rem]" : "text-[0.8125rem]"
              }`}
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              {card.teaser}
            </p>
          </div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className={`shrink-0 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="#E8705A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            className={`${
              card.featured
                ? "px-5 pb-5 sm:px-7 sm:pb-7 md:px-8 md:pb-8"
                : "px-4 pb-4 sm:px-5 sm:pb-5 md:px-6 md:pb-6"
            }`}
          >
            <div className="border-t border-navy-2 pt-4">
              <ul className="space-y-2 mb-4">
                {card.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[0.875rem] text-sand-2 leading-relaxed"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    <span className="text-coral mt-0.5 shrink-0">&#8226;</span>
                    {bullet}
                  </li>
                ))}
              </ul>

              {card.description && (
                <p
                  className="text-[0.875rem] text-slate leading-relaxed mb-4"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {card.description}
                </p>
              )}

              <div className="mt-4">
                <Link
                  href={card.link}
                  className="inline-flex items-center gap-2 bg-coral text-white text-[1rem] font-bold px-7 py-4 rounded-xl hover:bg-coral-dark transition-colors min-h-[48px] shadow-lg shadow-coral/20"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Learn More
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M6 4L10 8L6 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HowICanHelp({
  onBookingOpen,
}: {
  onBookingOpen?: () => void;
}) {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const handleToggle = (key: string) => {
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <section id="services" className="bg-white py-20 px-6 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="text-[0.6875rem] font-semibold text-coral tracking-[0.2em] uppercase mb-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Services
          </p>
          <h2
            className="text-[2.25rem] sm:text-[3rem] font-bold text-navy leading-tight mb-5"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            How I Can Help<span className="text-coral">.</span>
          </h2>
          <p
            className="text-[1.125rem] text-navy-2 leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Every situation is different. What is not different is how I approach them. You get a clear process, honest answers, and someone who supports you through the entire journey.
          </p>
        </div>

        {/* Two independent columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          {/* Left column */}
          <div className="flex flex-col gap-5">
            {CARDS.map(([left]) => (
              <AccordionCard
                key={left.title}
                card={left}
                isOpen={openIndex === left.title}
                onToggle={() => handleToggle(left.title)}
              />
            ))}
          </div>
          {/* Right column */}
          <div className="flex flex-col gap-5">
            {CARDS.map(([, right]) => (
              <AccordionCard
                key={right.title}
                card={right}
                isOpen={openIndex === right.title}
                onToggle={() => handleToggle(right.title)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

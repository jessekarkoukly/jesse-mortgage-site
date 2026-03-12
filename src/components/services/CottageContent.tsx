"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* ── TOC sections ── */
const TOC_ITEMS = [
  { id: "how-it-works", label: "How cottage financing works" },
  { id: "seasonal-vs-yearround", label: "Seasonal vs year-round" },
  { id: "insured-vs-conventional", label: "Insured vs conventional" },
  { id: "funding-options", label: "How to fund it" },
  { id: "what-lenders-look-at", label: "What lenders look at" },
  { id: "the-process", label: "How it works" },
  { id: "faq", label: "FAQ" },
];

/* ── FAQ data ── */
const FAQ_ITEMS = [
  {
    q: "Do I really need 20% down to buy a cottage?",
    a: "Not necessarily. If the property qualifies as year-round with permanent heating, a full foundation, and maintained road access, it may qualify for an insured mortgage with as little as 5% down. Seasonal properties typically require at least 20% down because they do not qualify for mortgage insurance.",
  },
  {
    q: "Can I count Airbnb or rental income from the cottage to help qualify?",
    a: "Some do, but with strict conditions. The property usually needs a rental history or a signed lease. Most lenders will only count 50% to 80% of the projected rental income, and the property must meet their habitability standards. Short-term vacation rental income is harder to use than a long-term tenant.",
  },
  {
    q: "The cottage has well water and a septic system. Is that a problem for lenders?",
    a: "Most lenders are fine with well and septic as long as both pass inspection. A failed septic test or contaminated well can stall or kill a deal. Get inspections done early in the conditional period.",
  },
  {
    q: "Can I just use the equity in my home to buy the cottage outright?",
    a: "Yes, if you have enough equity. A HELOC on your primary home can cover the full cottage purchase price, which avoids a second mortgage application entirely. The trade-off is that your primary home carries more debt, and HELOC rates are variable.",
  },
  {
    q: "How do I know if my cottage counts as seasonal or year-round?",
    a: "There is no single definition. Lenders look at a combination of factors: road access (is it maintained in winter?), heating system (is it permanent or space heaters?), insulation and winterization, foundation type, and water and septic systems. A property can fall into a grey zone where different lenders classify it differently.",
  },
  {
    q: "Am I going to pay a higher rate on a cottage than on my main home?",
    a: "Not necessarily. Year-round properties with good access and standard construction often qualify for the same rates as a primary residence. Seasonal properties, properties on islands or with water-only access, and properties that need significant work may carry a small premium, typically 0.10% to 0.25%.",
  },
];

/* ── Lender factor cards ── */
const LENDER_FACTORS = [
  {
    title: "Property condition",
    desc: "Lenders want a property that is structurally sound and habitable. Major deferred maintenance, mould, foundation issues, or a failing roof can trigger a declined appraisal.",
  },
  {
    title: "Access",
    desc: "Year-round road access is the strongest position. Seasonal roads, water-only access, or properties on islands limit lender options and may require larger down payments.",
  },
  {
    title: "Water and septic",
    desc: "Municipal services are simplest. Well and septic are fine with passing inspections. A failed septic or contaminated well test will pause the deal until resolved.",
  },
  {
    title: "Winterization",
    desc: "Permanent heating, insulated walls and pipes, and a full foundation signal a year-round property. Space heaters, no insulation, and pier foundations signal seasonal.",
  },
  {
    title: "Your debt load",
    desc: "A cottage is a second property, so its carrying costs stack on top of your primary mortgage. Lenders stress-test both obligations together when calculating your ratios.",
  },
  {
    title: "Rental income",
    desc: "If you plan to rent the cottage, some lenders will count a portion of that income toward qualification. A rental history or signed lease strengthens the case.",
  },
];

/* ── Process steps ── */
const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discovery call with Jesse",
    desc: "The property details, your financial picture, and your goals get reviewed together. You will know which financing path makes sense and what the lender will need before you make an offer.",
  },
  {
    num: "02",
    title: "Lender matching",
    desc: "The application is matched to lenders who are comfortable with the specific property type. Not every lender treats cottages the same way, so placement matters.",
  },
  {
    num: "03",
    title: "Approval and close",
    desc: "Once an offer is accepted, the full application is submitted with all property details and supporting documents. Appraisal, conditions, and closing are managed through to keys.",
  },
];

/* ── Funding options ── */
const FUNDING_OPTIONS = [
  {
    title: "Straight cottage mortgage",
    desc: "A standalone mortgage on the cottage property itself. The property is the collateral. Down payment, rates, and terms depend on whether it qualifies as seasonal or year-round.",
    when: "Works well when: you have the down payment saved and want to keep your primary mortgage untouched.",
  },
  {
    title: "HELOC on your primary home",
    desc: "Borrow against the equity in your primary residence to fund some or all of the cottage purchase. This avoids a second mortgage application entirely.",
    when: "Works well when: you have significant equity in your primary home and want a simpler transaction.",
  },
  {
    title: "Refinance your primary home",
    desc: "Break your current mortgage and take out a larger one, using the extra funds for the cottage purchase. This consolidates everything into one payment on your primary property.",
    when: "Works well when: your primary mortgage rate is higher than current rates, making the refinance cost-effective.",
  },
];

/* ══════════════════════════════════════════════════════════════ */

export default function CottageContent() {
  const [activeSection, setActiveSection] = useState("how-it-works");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  /* Scroll spy for TOC */
  useEffect(() => {
    const ids = TOC_ITEMS.map((t) => t.id);
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const handleBookCall = () => {
    window.dispatchEvent(new CustomEvent("open-booking-modal"));
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          SECTION 1 — Hero
      ═══════════════════════════════════════════════════ */}
      <section className="bg-navy pt-28 pb-20 px-6 lg:pt-32 lg:pb-24">
        <div className="max-w-3xl mx-auto text-center pt-4">
          <span
            className="inline-block border border-coral text-coral text-[0.6875rem] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Cottage &amp; Vacation Properties
          </span>
          <h1
            className="text-[2rem] md:text-[2.75rem] leading-[1.15] font-bold text-sand mb-6"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Cottage financing follows different rules
            <span className="text-coral">.</span> Know them before you make an
            offer.
          </h1>
          <p
            className="text-slate text-[1.0625rem] md:text-[1.125rem] leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Lenders treat recreational properties differently from primary
            residences. The property itself, how it is built, where it is
            located, and whether it can be used year-round all affect what
            financing is available and on what terms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <button
              onClick={handleBookCall}
              className="bg-coral text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-coral-dark transition-colors cursor-pointer text-[0.9375rem]"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Book a Call
            </button>
          </div>
          <div className="flex flex-wrap gap-5 justify-center mt-6">
            {[
              "No cost to you",
              "50+ lenders compared",
              "Ontario cottage country",
            ].map((chip) => (
              <span
                key={chip}
                className="flex items-center gap-2 text-[0.8125rem] font-medium text-sand"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                <span className="w-2 h-2 rounded-full bg-coral shrink-0" />
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          TOC + CONTENT LAYOUT
      ═══════════════════════════════════════════════════ */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[220px_1fr] gap-12">
          {/* Sticky TOC (desktop) */}
          <nav className="hidden lg:block">
            <div className="sticky top-[84px] border-r border-sand-2 pr-6">
              <p
                className="text-[0.625rem] font-bold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                On This Page
              </p>
              <div className="flex flex-col gap-1">
                {TOC_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`text-[0.8125rem] py-1.5 px-3 rounded transition-colors ${
                      activeSection === item.id
                        ? "text-coral font-semibold bg-coral/5 border-l-2 border-coral"
                        : "text-navy-2 hover:text-coral border-l-2 border-transparent"
                    }`}
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </nav>

          {/* Main content */}
          <div className="max-w-3xl">
            {/* ── HOW IT WORKS ── */}
            <div id="how-it-works" className="scroll-mt-24 mb-20">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                The Basics
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Cottage mortgages follow different rules than your primary home.
              </h2>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                A cottage or vacation property is not assessed the same way as a
                primary residence. Lenders apply different criteria to
                recreational properties because the risk profile is different.
                The property type, location, construction, and accessibility all
                factor into what financing is available.
              </p>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Down payment requirements are often higher. Not every lender
                finances cottages at all, and among those that do, policies vary
                significantly. A property that one lender declines may be
                approved by another with different criteria.
              </p>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                The key is understanding how the property will be classified
                before making an offer. That classification determines the down
                payment, the rate, the amortization options, and which lenders
                are even in play.
              </p>
            </div>

            {/* ── SEASONAL VS YEAR-ROUND ── */}
            <div id="seasonal-vs-yearround" className="scroll-mt-24 mb-20">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Property Type
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                The distinction matters more than you would expect.
              </h2>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Lenders split recreational properties into two categories:
                seasonal and year-round. The classification affects everything
                from down payment to available lenders.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {/* Seasonal */}
                <div className="bg-sand rounded-xl border border-sand-2 p-6">
                  <h3
                    className="text-navy font-bold text-[1.0625rem] mb-4"
                    style={{ fontFamily: "var(--font-spectral)" }}
                  >
                    Seasonal property
                  </h3>
                  <ul className="space-y-2.5">
                    {[
                      "Typically no permanent heating system",
                      "Limited or no winterization",
                      "Seasonal road access only",
                      "Pier or post foundation common",
                      "Usually requires 20%+ down",
                      "Fewer lender options available",
                      "May carry a small rate premium",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-navy/70 text-[0.875rem] leading-relaxed"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        <svg
                          className="w-4 h-4 shrink-0 mt-0.5 text-slate"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <rect
                            width="16"
                            height="16"
                            rx="4"
                            fill="currentColor"
                            fillOpacity="0.1"
                          />
                          <path
                            d="M4.5 8.5L7 11l4.5-6"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Year-round */}
                <div className="bg-sand rounded-xl border border-sand-2 p-6">
                  <h3
                    className="text-navy font-bold text-[1.0625rem] mb-4"
                    style={{ fontFamily: "var(--font-spectral)" }}
                  >
                    Year-round property
                  </h3>
                  <ul className="space-y-2.5">
                    {[
                      "Permanent heating system installed",
                      "Insulated walls, pipes, and roof",
                      "Year-round road access maintained",
                      "Full foundation (concrete or equivalent)",
                      "May qualify with as little as 5% down",
                      "Wider lender selection available",
                      "Rates comparable to primary residence",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-navy/70 text-[0.875rem] leading-relaxed"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        <svg
                          className="w-4 h-4 shrink-0 mt-0.5 text-coral"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <rect
                            width="16"
                            height="16"
                            rx="4"
                            fill="currentColor"
                            fillOpacity="0.1"
                          />
                          <path
                            d="M4.5 8.5L7 11l4.5-6"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Grey zone callout */}
              <div className="bg-coral/5 border border-coral/20 rounded-xl p-6">
                <p
                  className="text-navy text-[0.9375rem] leading-relaxed"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  <span className="font-semibold">
                    Many cottages fall into a grey zone.
                  </span>{" "}
                  A property with a furnace but no insulated pipes, or
                  year-round road access but a pier foundation, may be
                  classified differently by different lenders. This is where
                  lender selection matters most. The same property can be
                  treated as seasonal by one lender and year-round by another.
                </p>
              </div>
            </div>

            {/* ── INSURED VS CONVENTIONAL ── */}
            <div id="insured-vs-conventional" className="scroll-mt-24 mb-20">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Down Payment
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Your down payment determines which world you are in.
              </h2>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Cottage financing splits into two categories based on your down
                payment. Each comes with different rules, different lender
                options, and different property requirements.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Insured */}
                <div className="bg-sand rounded-xl p-6">
                  <h3
                    className="text-navy font-bold text-[1.0625rem] mb-3"
                    style={{ fontFamily: "var(--font-spectral)" }}
                  >
                    Insured (less than 20% down)
                  </h3>
                  <ul className="space-y-2.5">
                    {[
                      "Property must qualify as year-round",
                      "Must be owner-occupied or second home",
                      "Purchase price under $1.5 million",
                      "Mortgage insurance premium applies",
                      "Widest rate selection available",
                      "Standard income qualification rules",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-navy/70 text-[0.875rem] leading-relaxed"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        <svg
                          className="w-4 h-4 shrink-0 mt-0.5 text-coral"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M4 8.5L7 11l5-6.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Conventional */}
                <div className="bg-sand rounded-xl p-6">
                  <h3
                    className="text-navy font-bold text-[1.0625rem] mb-3"
                    style={{ fontFamily: "var(--font-spectral)" }}
                  >
                    Conventional (20%+ down)
                  </h3>
                  <ul className="space-y-2.5">
                    {[
                      "Seasonal and year-round properties eligible",
                      "No mortgage insurance required",
                      "No purchase price ceiling",
                      "More flexibility on property condition",
                      "Required for most seasonal cottages",
                      "Some lenders require 25% to 35% for seasonal",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-navy/70 text-[0.875rem] leading-relaxed"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        <svg
                          className="w-4 h-4 shrink-0 mt-0.5 text-coral"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M4 8.5L7 11l5-6.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* ── FUNDING OPTIONS ── */}
            <div id="funding-options" className="scroll-mt-24 mb-20">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Funding Options
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Three ways to finance your cottage.
              </h2>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                The right approach depends on your equity position, your
                existing mortgage terms, and how you want to structure the
                debt.
              </p>

              <div className="space-y-4">
                {FUNDING_OPTIONS.map((option) => (
                  <div key={option.title} className="bg-sand rounded-xl p-6">
                    <h3
                      className="text-navy font-bold text-[1.0625rem] mb-2"
                      style={{ fontFamily: "var(--font-spectral)" }}
                    >
                      {option.title}
                    </h3>
                    <p
                      className="text-navy/70 text-[0.9375rem] leading-relaxed mb-3"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      {option.desc}
                    </p>
                    <p
                      className="text-coral font-semibold text-[0.8125rem]"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      {option.when}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href="/services/refinancing"
                  className="inline-flex items-center gap-1.5 text-coral font-semibold text-[0.9375rem] hover:underline"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Understand the penalty before you break
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8h10m0 0L9 4m4 4L9 12"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* ── Mid-page CTA ── */}
            <div className="bg-coral/5 border border-coral/20 rounded-xl p-8 text-center my-12">
              <p
                className="text-[1.125rem] md:text-[1.25rem] font-bold text-navy mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Have a property in mind? Find out where you stand.
              </p>
              <button
                onClick={handleBookCall}
                className="bg-coral text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-coral-dark transition-colors cursor-pointer text-[0.9375rem]"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Book a Call
              </button>
            </div>

            {/* ── WHAT LENDERS LOOK AT ── */}
            <div id="what-lenders-look-at" className="scroll-mt-24 mb-20">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Underwriting
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Lenders underwrite the property as much as they underwrite you.
              </h2>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                With a cottage, the property itself carries as much weight as
                your income and credit. Here are the six factors that come up
                most often.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {LENDER_FACTORS.map((factor) => (
                  <div
                    key={factor.title}
                    className="bg-sand rounded-xl p-5 flex gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-coral/15 flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2.5 6.5L5 9l4.5-6"
                          stroke="#E8705A"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div>
                      <p
                        className="text-navy font-semibold text-[0.875rem] mb-1"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        {factor.title}
                      </p>
                      <p
                        className="text-navy/60 text-[0.8125rem] leading-relaxed"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        {factor.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── THE PROCESS ── */}
            <div id="the-process" className="scroll-mt-24 mb-20">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Three Steps
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                From conversation to approval.
              </h2>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Cottage financing involves more variables than a standard
                purchase. The process is designed to sort those variables early
                so there are no surprises at closing.
              </p>

              <div className="space-y-4 mb-8">
                {PROCESS_STEPS.map((step) => (
                  <div key={step.num} className="bg-sand rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <span
                        className="text-coral text-[1.5rem] font-bold shrink-0 leading-none pt-0.5"
                        style={{ fontFamily: "var(--font-spectral)" }}
                      >
                        {step.num}
                      </span>
                      <div>
                        <h3
                          className="text-navy font-bold text-[1.0625rem] mb-2"
                          style={{ fontFamily: "var(--font-spectral)" }}
                        >
                          {step.title}
                        </h3>
                        <p
                          className="text-navy/70 text-[0.9375rem] leading-relaxed"
                          style={{ fontFamily: "var(--font-jakarta)" }}
                        >
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleBookCall}
                className="bg-coral text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-coral-dark transition-colors cursor-pointer text-[0.9375rem]"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Talk Through Your Property
              </button>
            </div>

            {/* ── FAQ ── */}
            <div id="faq" className="scroll-mt-24 mb-8">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Frequently Asked Questions
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-8"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Common questions about cottage mortgages.
              </h2>

              <div className="space-y-3">
                {FAQ_ITEMS.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div
                      key={i}
                      className={`rounded-xl border transition-colors ${
                        isOpen
                          ? "border-coral/20 bg-sand"
                          : "border-sand-2 bg-sand"
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                      >
                        <span
                          className="text-navy font-semibold text-[0.9375rem] pr-4"
                          style={{ fontFamily: "var(--font-spectral)" }}
                        >
                          {faq.q}
                        </span>
                        <svg
                          className={`w-5 h-5 shrink-0 transition-transform ${
                            isOpen ? "rotate-180 text-coral" : "text-navy/40"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pt-0">
                          <p
                            className="text-navy/70 text-[0.9375rem] leading-relaxed"
                            style={{ fontFamily: "var(--font-jakarta)" }}
                          >
                            {faq.a}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CTA BAND
      ═══════════════════════════════════════════════════ */}
      <section className="bg-navy">
        <div className="mx-auto max-w-3xl px-5 py-20 md:py-24 text-center">
          <h2
            className="text-[1.75rem] md:text-[2.25rem] font-bold text-sand mb-4"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Cottage financing has more moving parts. That is exactly why it helps to get them sorted early.
          </h2>
          <p
            className="text-slate text-[1.0625rem] leading-relaxed max-w-xl mx-auto mb-8"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            One conversation covers the property, the financing options, and a
            clear path forward. There is no cost to you.
          </p>
          <button
            onClick={handleBookCall}
            className="bg-coral text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-coral-dark transition-colors cursor-pointer text-[0.9375rem]"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Book a Cottage Financing Call
          </button>
        </div>
      </section>
    </>
  );
}

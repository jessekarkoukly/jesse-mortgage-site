"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";

/* ── FAQ data ── */
const FAQ_ITEMS = [
  {
    q: "Is breaking my mortgage early always going to cost me a fortune?",
    a: "Not always. Variable rate penalties are usually straightforward and sometimes modest. Fixed rate penalties depend heavily on how much rates have moved and which lender you are with. The only way to know your actual penalty is to calculate it specifically. That is what the calculator above does.",
  },
  {
    q: "I am with one of the big banks. Is refinancing even an option?",
    a: "Yes. Breaking a big bank mortgage mid-term is more expensive than breaking a monoline lender's mortgage because of how they calculate IRD. They use posted rates rather than discounted rates. That gap can be $5,000 to $15,000 on a typical mortgage. Sometimes the savings from a better rate still outweigh the higher penalty. Sometimes they do not. The math decides.",
  },
  {
    q: "My bank offered me a blend-and-extend. Is that actually a good deal?",
    a: "It depends. Blend-and-extend lets your current lender blend your existing rate with their current rate for a new extended term, avoiding the prepayment penalty entirely. The resulting rate is higher than what you could get by fully breaking and going to a different lender. Whether it is worth it depends on the size of the penalty and the size of the rate difference.",
  },
  {
    q: "I am moving to a new home. Can I just take my mortgage with me?",
    a: "If you are moving, most closed mortgages allow you to transfer your existing rate and terms to the new property. This avoids the penalty entirely. There are timing windows and qualification requirements. If a move is in your near-term plans, porting should be the first question, not refinancing.",
  },
  {
    q: "How long does the whole refinancing process take?",
    a: "Typically 2 to 4 weeks from application to closing. The bottlenecks are appraisal scheduling and lender processing times. Jesse manages the timeline and flags your discharge date with your existing lender so there are no gaps.",
  },
  {
    q: "Do I really need a lawyer just to refinance?",
    a: "Yes. A lawyer discharges your existing mortgage and registers the new one on title. Budget $800 to $1,500. If your refinanced mortgage is above $200,000, many lenders cover legal costs.",
  },
  {
    q: "Can I access my home equity without actually breaking my mortgage?",
    a: "Yes. A HELOC (Home Equity Line of Credit) lets you borrow against your equity without touching your existing mortgage. No penalty. No new mortgage. It works like a revolving credit line at a rate tied to prime. It is the right tool when you want flexibility and do not need a lump sum.",
  },
];

/* ── Reason cards ── */
const REASONS = [
  {
    icon: "\u2193",
    label: "Get a lower rate",
    desc: "Rates have shifted. If the market rate today is meaningfully lower than what you are paying, the math sometimes favours breaking early even after the penalty.",
    link: null,
  },
  {
    icon: "\u2B21",
    label: "Access your equity",
    desc: "Your home has likely appreciated. Refinancing can unlock up to 80% of your appraised value minus what you owe, as a lump sum at mortgage rates.",
    link: null,
  },
  {
    icon: "\u2715",
    label: "Consolidate debt",
    desc: "Roll high-interest credit cards, a car loan, or a line of credit into one payment at a much lower rate.",
    link: "/services/debt-consolidation",
  },
  {
    icon: "\u21C4",
    label: "Switch products",
    desc: "Move from variable to fixed or vice versa. Change lenders. Adjust your prepayment terms. Refinancing gives you a fresh mortgage that fits your life today.",
    link: null,
  },
  {
    icon: "\u2302",
    label: "Fund renovations",
    desc: "Access equity to pay for renovations in cash rather than using a line of credit or construction loan at higher rates.",
    link: null,
  },
  {
    icon: "\u2696",
    label: "Spousal buyout",
    desc: "Separation or divorce often requires one partner to buy out the other\u2019s share of the home. Refinancing is how that equity gets accessed and paid out.",
    link: null,
  },
];

/* ── Process steps ── */
const PROCESS_STEPS = [
  {
    num: "01",
    title: "Tell Jesse your situation",
    body: "Your current rate, balance, how long is left on your term, and what you are trying to accomplish. No documents yet. This is a 10-minute conversation.",
  },
  {
    num: "02",
    title: "Jesse runs the numbers",
    body: "Exact penalty. Exact savings. Exact break-even. He compares your current lender, refinancing options across 50+ lenders, and blend-and-extend if it applies.",
  },
  {
    num: "03",
    title: "You get an honest recommendation",
    body: "If breaking is not worth it, Jesse tells you that. If it is, he handles everything from application to closing.",
  },
];

/* ── Helpers ── */
function fmt(n: number): string {
  return n.toLocaleString("en-CA", { style: "currency", currency: "CAD", minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function fmtDec(n: number): string {
  return n.toLocaleString("en-CA", { style: "currency", currency: "CAD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/** Canadian semi-annual compounding mortgage payment */
function calcPayment(principal: number, annualRate: number, amortYears: number, paymentsPerYear = 12): number {
  if (annualRate <= 0 || principal <= 0 || amortYears <= 0) return 0;
  const ear = Math.pow(1 + annualRate / 2, 2) - 1;
  const periodicRate = Math.pow(1 + ear, 1 / paymentsPerYear) - 1;
  const n = amortYears * paymentsPerYear;
  return principal * (periodicRate * Math.pow(1 + periodicRate, n)) / (Math.pow(1 + periodicRate, n) - 1);
}

/* ── TOC sections for scroll-spy ── */
const TOC_SECTIONS = [
  { id: "why-refinance", label: "Why refinance" },
  { id: "equity-calculator", label: "Equity calculator" },
  { id: "the-penalty", label: "The penalty" },
  { id: "break-even", label: "Break-even calculator" },
  { id: "is-it-worth-it", label: "Is it worth it" },
  { id: "the-process", label: "The process" },
  { id: "faq", label: "FAQ" },
];

/* ══════════════════════════════════════════════════════════════ */

export default function RefinancingContent() {
  const [openFaq, setOpenFaq] = useState<number>(0);

  /* ── Equity calculator state ── */
  const [homeValue, setHomeValue] = useState("");
  const [mortgageBalance, setMortgageBalance] = useState("");
  const [helocBalance, setHelocBalance] = useState("");
  const [equityCalculated, setEquityCalculated] = useState(false);

  const equityResult = useMemo(() => {
    const hv = parseFloat(homeValue) || 0;
    const mb = parseFloat(mortgageBalance) || 0;
    const hb = parseFloat(helocBalance) || 0;
    const maxBorrow = hv * 0.8;
    const accessible = maxBorrow - mb - hb;
    const pct = hv > 0 ? (Math.max(accessible, 0) / hv) * 100 : 0;
    return { maxBorrow, totalOwing: mb + hb, accessible, pct };
  }, [homeValue, mortgageBalance, helocBalance]);

  /* ── Break-even calculator state ── */
  const [mortgageType, setMortgageType] = useState<"variable" | "fixed">("fixed");
  const [penBalance, setPenBalance] = useState("");
  const [penRate, setPenRate] = useState("");
  const [penMonths, setPenMonths] = useState("");
  const [lenderType, setLenderType] = useState<"big_bank" | "monoline">("big_bank");
  const [lenderCurrentRate, setLenderCurrentRate] = useState("");
  const [stage1Complete, setStage1Complete] = useState(false);

  /* Stage 2 */
  const [newRate, setNewRate] = useState("");
  const [remainingAmort, setRemainingAmort] = useState("");

  const DISCHARGE_FEE = 275;
  const LEGAL_FEE = 1200;

  const penaltyResult = useMemo(() => {
    const bal = parseFloat(penBalance) || 0;
    const rate = (parseFloat(penRate) || 0) / 100;
    const months = parseFloat(penMonths) || 0;

    if (bal <= 0 || rate <= 0 || months <= 0) return null;

    const threeMonthInterest = (bal * rate) / 12 * 3;

    if (mortgageType === "variable") {
      const total = threeMonthInterest + DISCHARGE_FEE + LEGAL_FEE;
      return { threeMonthInterest, ird: null, penalty: threeMonthInterest, total };
    }

    const currentLenderRate = (parseFloat(lenderCurrentRate) || 0) / 100;
    const rateDiff = Math.max(rate - currentLenderRate, 0);
    const ird = bal * rateDiff * (months / 12);
    const penalty = Math.max(threeMonthInterest, ird);
    const total = penalty + DISCHARGE_FEE + LEGAL_FEE;
    return { threeMonthInterest, ird, penalty, total };
  }, [penBalance, penRate, penMonths, mortgageType, lenderCurrentRate]);

  const breakEvenResult = useMemo(() => {
    if (!penaltyResult) return null;
    const bal = parseFloat(penBalance) || 0;
    const oldRate = (parseFloat(penRate) || 0) / 100;
    const nRate = (parseFloat(newRate) || 0) / 100;
    const amort = parseFloat(remainingAmort) || 0;

    if (nRate <= 0 || amort <= 0) return null;

    const oldPayment = calcPayment(bal, oldRate, amort);
    const newPayment = calcPayment(bal, nRate, amort);
    const monthlySavings = oldPayment - newPayment;

    if (monthlySavings <= 0) return { oldPayment, newPayment, monthlySavings, totalSavings: 0, breakEvenMonth: null, costToBreak: penaltyResult.total };

    const months = parseFloat(penMonths) || 0;
    const totalSavings = monthlySavings * months;
    const breakEvenMonth = Math.ceil(penaltyResult.total / monthlySavings);

    return { oldPayment, newPayment, monthlySavings, totalSavings, breakEvenMonth, costToBreak: penaltyResult.total };
  }, [penaltyResult, penBalance, penRate, newRate, remainingAmort, penMonths]);

  const handleBookCall = () => {
    window.dispatchEvent(new CustomEvent("open-booking-modal"));
  };

  /* ── Scroll-spy ── */
  const [activeId, setActiveId] = useState<string>(TOC_SECTIONS[0].id);
  const sectionRefs = useRef<Map<string, IntersectionObserverEntry>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          sectionRefs.current.set(entry.target.id, entry);
        });
        const visible = Array.from(sectionRefs.current.values())
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    const ids = TOC_SECTIONS.map((s) => s.id);
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ── Shared input class ── */
  const inputClass =
    "w-full rounded-lg border border-slate/30 bg-white px-4 py-3 text-navy text-[0.9375rem] focus:outline-none focus:ring-2 focus:ring-coral/40 transition-shadow";
  const labelClass = "block text-[0.8125rem] font-semibold text-navy mb-1.5";

  /* ── Dark-bg input class (for break-even calculator) ── */
  const darkInputClass =
    "w-full rounded-lg border border-navy/20 bg-sand px-4 py-3 text-navy text-[0.9375rem] focus:outline-none focus:ring-2 focus:ring-coral/40 placeholder:text-navy/30";

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          SECTION 1 — Hero
      ═══════════════════════════════════════════════════ */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-3xl px-5 pt-28 pb-20 md:pt-36 md:pb-28 text-center">
          <p
            className="text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-coral mb-6"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Ontario Mortgage Refinancing
          </p>
          <h1
            className="text-[2rem] md:text-[2.75rem] leading-[1.15] font-bold mb-6"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Is breaking your mortgage early actually worth it? Let&rsquo;s find out.
          </h1>
          <p
            className="text-sand/80 text-[1.0625rem] md:text-[1.125rem] leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Refinancing means replacing your current mortgage with a new one before your term ends. Sometimes that costs less than staying put. Jesse runs the numbers and tells you honestly which way it goes.
          </p>
          <button
            onClick={handleBookCall}
            className="bg-coral text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-coral-dark transition-colors cursor-pointer text-[0.9375rem]"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Book a Call
          </button>

          {/* Trust chips */}
          <div className="flex flex-wrap gap-5 justify-center mt-6">
            {[
              "No cost to you",
              "50+ lenders compared",
              "Toronto and Ontario",
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

        {/* Plain-English definition block */}
        <div className="mx-auto max-w-2xl px-5 pb-20 md:pb-28">
          <div className="bg-navy-2 rounded-xl p-8 md:p-10">
            <p
              className="text-sand/80 text-[1rem] md:text-[1.0625rem] leading-relaxed"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Refinancing means you break your existing mortgage and start a new one. You can do this with the same lender or a different one. The reason people do it is simple: circumstances change. Rates drop. Home values rise. Debt accumulates. Life rearranges itself.
            </p>
            <p
              className="text-sand/80 text-[1rem] md:text-[1.0625rem] leading-relaxed mt-4"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              The question is never whether refinancing is possible. It is whether it makes financial sense for your specific situation right now.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTIONS 2–8 — Grid TOC + Content
      ═══════════════════════════════════════════════════ */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[220px_1fr] gap-12">
          {/* Sticky TOC (desktop) */}
          <nav className="hidden lg:block">
            <div className="sticky top-[84px] border-r border-sand-2 pr-6">
              <p
                className="text-[0.6875rem] font-bold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                On This Page
              </p>
              <div className="flex flex-col gap-1">
                {TOC_SECTIONS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`text-[0.875rem] py-1.5 px-3 rounded transition-colors ${
                      activeId === item.id
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

            {/* ── Why People Refinance ── */}
            <div id="why-refinance" className="scroll-mt-24 mb-16 pb-16 border-b border-sand-2">
              <p
                className="text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-coral mb-4 text-center"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Why People Refinance
              </p>
              <h2
                className="text-navy text-[1.75rem] md:text-[2.25rem] font-bold text-center mb-14"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                There is no single reason. Every situation is different.
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {REASONS.map((r) => {
                  const isDebtCard = r.link !== null;
                  const cardBg = isDebtCard ? "bg-sand-2" : "bg-sand";
                  const inner = (
                    <div className={`${cardBg} rounded-xl p-7 h-full`}>
                      <span className="text-coral text-2xl block mb-3">{r.icon}</span>
                      <h3
                        className="text-navy font-bold text-[1.0625rem] mb-2"
                        style={{ fontFamily: "var(--font-spectral)" }}
                      >
                        {r.label}
                      </h3>
                      <p
                        className="text-navy/70 text-[0.9375rem] leading-relaxed"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        {r.desc}
                      </p>
                      {isDebtCard && (
                        <span
                          className="inline-block mt-3 text-coral text-[0.875rem] font-semibold"
                          style={{ fontFamily: "var(--font-jakarta)" }}
                        >
                          Learn more &rarr;
                        </span>
                      )}
                    </div>
                  );

                  return isDebtCard ? (
                    <Link key={r.label} href={r.link!} className="block hover:opacity-90 transition-opacity">
                      {inner}
                    </Link>
                  ) : (
                    <div key={r.label}>{inner}</div>
                  );
                })}
              </div>
            </div>

            {/* ── Equity Calculator ── */}
            <div id="equity-calculator" className="scroll-mt-24 mb-16 pb-16 border-b border-sand-2">
              <p
                className="text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-coral mb-4 text-center"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Equity Calculator
              </p>
              <h2
                className="text-navy text-[1.75rem] md:text-[2.25rem] font-bold text-center mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                How much equity can you access?
              </h2>
              <p
                className="text-navy/70 text-[1rem] text-center mb-12 max-w-lg mx-auto"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                In Ontario, you can refinance up to 80% of your home&rsquo;s appraised value. Enter your numbers below.
              </p>

              <div className="bg-sand rounded-xl p-6 md:p-8">
                <div className="grid gap-5 md:grid-cols-3">
                  <div>
                    <label className={labelClass} style={{ fontFamily: "var(--font-jakarta)" }}>Estimated home value ($)</label>
                    <input
                      type="number"
                      value={homeValue}
                      onChange={(e) => { setHomeValue(e.target.value); setEquityCalculated(false); }}
                      placeholder="750,000"
                      className={inputClass}
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    />
                  </div>
                  <div>
                    <label className={labelClass} style={{ fontFamily: "var(--font-jakarta)" }}>Mortgage balance ($)</label>
                    <input
                      type="number"
                      value={mortgageBalance}
                      onChange={(e) => { setMortgageBalance(e.target.value); setEquityCalculated(false); }}
                      placeholder="450,000"
                      className={inputClass}
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    />
                  </div>
                  <div>
                    <label className={labelClass} style={{ fontFamily: "var(--font-jakarta)" }}>HELOC balance, if any ($)</label>
                    <input
                      type="number"
                      value={helocBalance}
                      onChange={(e) => { setHelocBalance(e.target.value); setEquityCalculated(false); }}
                      placeholder="0"
                      className={inputClass}
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => setEquityCalculated(true)}
                  disabled={!homeValue || !mortgageBalance}
                  className="mt-6 w-full bg-coral text-white font-semibold py-3.5 rounded-lg hover:bg-coral-dark transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-[0.9375rem]"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Calculate Accessible Equity
                </button>
              </div>

              {/* Result */}
              {equityCalculated && (parseFloat(homeValue) || 0) > 0 && (
                <div className="mt-8 bg-sand rounded-xl p-6 md:p-8">
                  <div className="space-y-3">
                    <div className="flex justify-between text-[0.9375rem]" style={{ fontFamily: "var(--font-jakarta)" }}>
                      <span className="text-navy/70">80% of {fmt(parseFloat(homeValue) || 0)}</span>
                      <span className="text-navy font-semibold">{fmt(equityResult.maxBorrow)}</span>
                    </div>
                    <div className="flex justify-between text-[0.9375rem]" style={{ fontFamily: "var(--font-jakarta)" }}>
                      <span className="text-navy/70">Less: Total Owing</span>
                      <span className="text-navy font-semibold">&minus; {fmt(equityResult.totalOwing)}</span>
                    </div>
                    <div className="border-t border-navy/10 pt-3 flex justify-between text-[1.0625rem]" style={{ fontFamily: "var(--font-jakarta)" }}>
                      <span className="text-navy font-bold">Accessible Equity</span>
                      <span className="text-coral font-bold text-[1.25rem]">{fmt(Math.max(equityResult.accessible, 0))}</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-5">
                    <div className="flex justify-between text-[0.8125rem] text-navy/60 mb-1.5" style={{ fontFamily: "var(--font-jakarta)" }}>
                      <span>Accessible equity as % of home value</span>
                      <span>{equityResult.pct.toFixed(1)}%</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-navy/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-coral transition-all duration-500"
                        style={{ width: `${Math.min(Math.max(equityResult.pct, 0), 100)}%` }}
                      />
                    </div>
                  </div>

                  <p
                    className="mt-5 text-navy/60 text-[0.875rem] leading-relaxed"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    This is the equity available to you. What you do with it depends on your goal. The sections below walk through each option.
                  </p>
                </div>
              )}
            </div>

            {/* ── The Penalty ── */}
            <div id="the-penalty" className="scroll-mt-24 mb-16 pb-16 border-b border-sand-2">
              <p
                className="text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-coral mb-4 text-center"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                The Penalty
              </p>
              <h2
                className="text-navy text-[1.75rem] md:text-[2.25rem] font-bold text-center mb-12"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                What you need to know before you break
              </h2>

              {/* Two types table */}
              <div className="bg-sand rounded-xl overflow-hidden mb-8">
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-navy/10">
                  <div className="p-6 md:p-8">
                    <h3
                      className="text-navy font-bold text-[1.0625rem] mb-2"
                      style={{ fontFamily: "var(--font-spectral)" }}
                    >
                      Variable rate (closed)
                    </h3>
                    <p
                      className="text-navy/70 text-[0.9375rem] leading-relaxed mb-3"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      3 months&rsquo; interest on your outstanding balance.
                    </p>
                    <p
                      className="text-coral font-semibold text-[0.875rem]"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      Typical range: $3,000 to $8,000 on a $500K balance
                    </p>
                  </div>
                  <div className="p-6 md:p-8">
                    <h3
                      className="text-navy font-bold text-[1.0625rem] mb-2"
                      style={{ fontFamily: "var(--font-spectral)" }}
                    >
                      Fixed rate (closed)
                    </h3>
                    <p
                      className="text-navy/70 text-[0.9375rem] leading-relaxed mb-3"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      Greater of: 3 months&rsquo; interest OR the Interest Rate Differential (IRD).
                    </p>
                    <p
                      className="text-coral font-semibold text-[0.875rem]"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      Can exceed $15,000 to $25,000 at major banks
                    </p>
                  </div>
                </div>
              </div>

              {/* IRD explanation */}
              <div className="bg-sand rounded-xl p-6 md:p-8 mb-8">
                <h3
                  className="text-navy font-bold text-[1.125rem] mb-4"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  What the IRD actually is
                </h3>
                <p
                  className="text-navy/70 text-[0.9375rem] leading-relaxed mb-4"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  The Interest Rate Differential is the difference between what you agreed to pay your lender and what they can earn by re-lending that money today. If you locked in at 5.5% and the lender&rsquo;s current 2-year rate is 4.5%, your IRD is roughly 1% of your outstanding balance multiplied by the years remaining on your term.
                </p>
                <p
                  className="text-navy font-semibold text-[0.9375rem]"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Example: $500,000 balance. 1% rate difference. 2 years remaining. Rough IRD = $10,000.
                </p>
              </div>

              {/* Dirty secret callout */}
              <div className="bg-sand-2 rounded-xl p-6 md:p-8 border-l-4 border-coral mb-8">
                <h3
                  className="text-navy font-bold text-[1.0625rem] mb-3"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  The bank&rsquo;s IRD secret
                </h3>
                <p
                  className="text-navy/80 text-[0.9375rem] leading-relaxed mb-3"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Major banks calculate IRD using their posted rates, not the discounted rates they actually charge new clients. This inflates the penalty significantly.
                </p>
                <p
                  className="text-navy/80 text-[0.9375rem] leading-relaxed"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Monoline lenders (only accessible through brokers) use their actual rates. On the same mortgage, a monoline penalty can be thousands of dollars less than a Big Bank penalty for the identical situation. This is one of the most important and least publicized advantages of going through a broker.
                </p>
              </div>

              {/* Additional costs */}
              <div className="bg-sand rounded-xl p-6 md:p-8">
                <h3
                  className="text-navy font-bold text-[1.0625rem] mb-4"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  Additional costs to factor in
                </h3>
                <ul className="space-y-2.5">
                  {[
                    ["Discharge fee from your current lender", "$200 to $350"],
                    ["Legal fees to register the new mortgage", "$800 to $1,500"],
                    ["Appraisal (if required by the new lender)", "$300 to $500"],
                    ["Title insurance", "$150 to $300"],
                  ].map(([label, range]) => (
                    <li key={label} className="flex justify-between text-[0.9375rem]" style={{ fontFamily: "var(--font-jakarta)" }}>
                      <span className="text-navy/70">{label}</span>
                      <span className="text-navy font-semibold shrink-0 ml-4">{range}</span>
                    </li>
                  ))}
                </ul>
                <p
                  className="mt-5 text-navy/60 text-[0.875rem] leading-relaxed border-t border-navy/10 pt-4"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Total additional costs beyond the penalty: budget $1,500 to $2,500. Jesse factors all of these into the break-even calculation.
                </p>
              </div>
            </div>

            {/* ── Break-Even Calculator ── */}
            <div id="break-even" className="scroll-mt-24 mb-16 pb-16 border-b border-sand-2">
              <p
                className="text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-coral mb-4 text-center"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Run the Numbers
              </p>
              <h2
                className="text-navy text-[1.75rem] md:text-[2.25rem] font-bold text-center mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Is it worth breaking your mortgage?
              </h2>
              <p
                className="text-navy-2 text-[1rem] text-center mb-12 max-w-lg mx-auto"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Two steps. First estimate your penalty, then compare it against the savings from a new rate.
              </p>

              {/* Stage 1: Penalty Estimator */}
              <div className="bg-sand rounded-xl p-6 md:p-8">
                <h3
                  className="text-navy text-[1.0625rem] font-bold mb-6"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  Stage 1: Estimate your penalty
                </h3>

                {/* Type toggle */}
                <div className="flex gap-2 mb-6">
                  {(["fixed", "variable"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => { setMortgageType(t); setStage1Complete(false); }}
                      className={`flex-1 py-2.5 rounded-lg text-[0.875rem] font-semibold cursor-pointer transition-colors ${
                        mortgageType === t
                          ? "bg-coral text-white"
                          : "bg-navy/10 text-navy/60 hover:bg-navy/15"
                      }`}
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      {t === "fixed" ? "Fixed Rate" : "Variable Rate"}
                    </button>
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-[0.8125rem] font-semibold text-navy mb-1.5" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Outstanding balance ($)
                    </label>
                    <input
                      type="number"
                      value={penBalance}
                      onChange={(e) => { setPenBalance(e.target.value); setStage1Complete(false); }}
                      placeholder="500,000"
                      className={darkInputClass}
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-[0.8125rem] font-semibold text-navy mb-1.5" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Current interest rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={penRate}
                      onChange={(e) => { setPenRate(e.target.value); setStage1Complete(false); }}
                      placeholder="5.5"
                      className={darkInputClass}
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-[0.8125rem] font-semibold text-navy mb-1.5" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Months remaining on term
                    </label>
                    <input
                      type="number"
                      value={penMonths}
                      onChange={(e) => { setPenMonths(e.target.value); setStage1Complete(false); }}
                      placeholder="24"
                      className={darkInputClass}
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    />
                  </div>

                  {mortgageType === "fixed" && (
                    <>
                      <div>
                        <label className="block text-[0.8125rem] font-semibold text-navy mb-1.5" style={{ fontFamily: "var(--font-jakarta)" }}>
                          Lender type
                        </label>
                        <div className="flex gap-2">
                          {(["big_bank", "monoline"] as const).map((lt) => (
                            <button
                              key={lt}
                              onClick={() => { setLenderType(lt); setStage1Complete(false); }}
                              className={`flex-1 py-2.5 rounded-lg text-[0.8125rem] font-semibold cursor-pointer transition-colors ${
                                lenderType === lt
                                  ? "bg-coral/80 text-white"
                                  : "bg-navy/10 text-navy/60 hover:bg-navy/15"
                              }`}
                              style={{ fontFamily: "var(--font-jakarta)" }}
                            >
                              {lt === "big_bank" ? "Big Bank" : "Monoline"}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[0.8125rem] font-semibold text-navy mb-1.5" style={{ fontFamily: "var(--font-jakarta)" }}>
                          Lender&rsquo;s current rate for nearest matching term (%)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={lenderCurrentRate}
                          onChange={(e) => { setLenderCurrentRate(e.target.value); setStage1Complete(false); }}
                          placeholder="4.5"
                          className={darkInputClass}
                          style={{ fontFamily: "var(--font-jakarta)" }}
                        />
                      </div>
                    </>
                  )}
                </div>

                <button
                  onClick={() => setStage1Complete(true)}
                  disabled={!penBalance || !penRate || !penMonths || (mortgageType === "fixed" && !lenderCurrentRate)}
                  className="mt-6 w-full bg-coral text-white font-semibold py-3.5 rounded-lg hover:bg-coral-dark transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-[0.9375rem]"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Estimate Penalty
                </button>

                {/* Stage 1 Results */}
                {stage1Complete && penaltyResult && (
                  <div className="mt-6 bg-white rounded-lg p-5 border border-navy/10">
                    {mortgageType === "variable" ? (
                      <div className="flex justify-between text-[0.9375rem] mb-3" style={{ fontFamily: "var(--font-jakarta)" }}>
                        <span className="text-navy/70">3-month interest penalty</span>
                        <span className="text-navy font-semibold">{fmtDec(penaltyResult.threeMonthInterest)}</span>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between text-[0.9375rem] mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                          <span className="text-navy/70">3-month interest</span>
                          <span className="text-navy font-semibold">{fmtDec(penaltyResult.threeMonthInterest)}</span>
                        </div>
                        <div className="flex justify-between text-[0.9375rem] mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                          <span className="text-navy/70">Estimated IRD</span>
                          <span className="text-navy font-semibold">{fmtDec(penaltyResult.ird ?? 0)}</span>
                        </div>
                        <div className="flex justify-between text-[0.9375rem] mb-3 pt-2 border-t border-navy/10" style={{ fontFamily: "var(--font-jakarta)" }}>
                          <span className="text-navy/70">Penalty (greater of the two)</span>
                          <span className="text-coral font-bold">{fmtDec(penaltyResult.penalty)}</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between text-[0.9375rem] mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                      <span className="text-navy/70">+ Discharge fee</span>
                      <span className="text-navy/80">{fmt(DISCHARGE_FEE)}</span>
                    </div>
                    <div className="flex justify-between text-[0.9375rem] mb-3" style={{ fontFamily: "var(--font-jakarta)" }}>
                      <span className="text-navy/70">+ Legal fees</span>
                      <span className="text-navy/80">{fmt(LEGAL_FEE)}</span>
                    </div>
                    <div className="flex justify-between text-[1.0625rem] pt-3 border-t border-navy/10" style={{ fontFamily: "var(--font-jakarta)" }}>
                      <span className="text-navy font-bold">Total estimated cost to break</span>
                      <span className="text-coral font-bold text-[1.25rem]">{fmtDec(penaltyResult.total)}</span>
                    </div>
                    <p className="mt-4 text-navy/40 text-[0.75rem] leading-relaxed" style={{ fontFamily: "var(--font-jakarta)" }}>
                      This is a simplified estimate. Big Bank IRD using posted rates can be significantly higher. Call Jesse for your exact number.
                    </p>
                  </div>
                )}
              </div>

              {/* Stage 2: Break-Even Analysis */}
              {stage1Complete && penaltyResult && (
                <div className="mt-6 bg-sand rounded-xl p-6 md:p-8">
                  <h3
                    className="text-navy text-[1.0625rem] font-bold mb-6"
                    style={{ fontFamily: "var(--font-spectral)" }}
                  >
                    Stage 2: Is the savings worth the penalty?
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-[0.8125rem] font-semibold text-navy mb-1.5" style={{ fontFamily: "var(--font-jakarta)" }}>
                        New rate you have been offered (%)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={newRate}
                        onChange={(e) => setNewRate(e.target.value)}
                        placeholder="4.2"
                        className={darkInputClass}
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-[0.8125rem] font-semibold text-navy mb-1.5" style={{ fontFamily: "var(--font-jakarta)" }}>
                        Remaining amortization (years)
                      </label>
                      <input
                        type="number"
                        value={remainingAmort}
                        onChange={(e) => setRemainingAmort(e.target.value)}
                        placeholder="22"
                        className={darkInputClass}
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      />
                    </div>
                  </div>

                  {/* Stage 2 Results */}
                  {breakEvenResult && (
                    <div className="mt-6 bg-white rounded-lg p-5 border border-navy/10">
                      <div className="grid gap-3">
                        <div className="flex justify-between text-[0.9375rem]" style={{ fontFamily: "var(--font-jakarta)" }}>
                          <span className="text-navy/70">Monthly payment at current rate</span>
                          <span className="text-navy font-semibold">{fmtDec(breakEvenResult.oldPayment)}</span>
                        </div>
                        <div className="flex justify-between text-[0.9375rem]" style={{ fontFamily: "var(--font-jakarta)" }}>
                          <span className="text-navy/70">Monthly payment at new rate</span>
                          <span className="text-navy font-semibold">{fmtDec(breakEvenResult.newPayment)}</span>
                        </div>
                        <div className="flex justify-between text-[0.9375rem] pt-2 border-t border-navy/10" style={{ fontFamily: "var(--font-jakarta)" }}>
                          <span className="text-navy/70">Monthly savings</span>
                          <span className={`font-bold ${breakEvenResult.monthlySavings > 0 ? "text-green-600" : "text-coral"}`}>
                            {fmtDec(breakEvenResult.monthlySavings)}
                          </span>
                        </div>
                        <div className="flex justify-between text-[0.9375rem]" style={{ fontFamily: "var(--font-jakarta)" }}>
                          <span className="text-navy/70">Total savings over remaining term</span>
                          <span className="text-navy font-semibold">{fmtDec(breakEvenResult.totalSavings)}</span>
                        </div>
                        <div className="flex justify-between text-[0.9375rem]" style={{ fontFamily: "var(--font-jakarta)" }}>
                          <span className="text-navy/70">Total cost to break</span>
                          <span className="text-navy font-semibold">{fmtDec(breakEvenResult.costToBreak)}</span>
                        </div>
                        <div className="flex justify-between text-[1.0625rem] pt-3 border-t border-navy/10" style={{ fontFamily: "var(--font-jakarta)" }}>
                          <span className="text-navy font-bold">Break-even</span>
                          <span className="text-coral font-bold text-[1.25rem]">
                            {breakEvenResult.breakEvenMonth !== null
                              ? `Month ${breakEvenResult.breakEvenMonth}`
                              : "Savings do not exceed penalty"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Calculator CTA */}
                  <div className="mt-8 text-center">
                    <p
                      className="text-navy-2 text-[0.9375rem] mb-4"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      Want Jesse to run your exact numbers? It takes one call.
                    </p>
                    <button
                      onClick={handleBookCall}
                      className="bg-coral text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-coral-dark transition-colors cursor-pointer text-[0.9375rem]"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      Book a Call
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ── Is It Worth It? ── */}
            <div id="is-it-worth-it" className="scroll-mt-24 mb-16 pb-16 border-b border-sand-2">
              <p
                className="text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-coral mb-4 text-center"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Is It Worth It?
              </p>
              <h2
                className="text-navy text-[1.75rem] md:text-[2.25rem] font-bold text-center mb-12"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                How to decide
              </h2>

              {/* Break-Even Rule of Thumb Card */}
              <div className="bg-navy text-white rounded-xl p-6 md:p-8 mb-10">
                <h3
                  className="text-[1.125rem] font-bold mb-5"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  Break-even rule of thumb
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <span className="text-coral font-bold text-[0.9375rem] shrink-0 w-32" style={{ fontFamily: "var(--font-jakarta)" }}>Under 18 months</span>
                    <span className="text-sand/80 text-[0.9375rem]" style={{ fontFamily: "var(--font-jakarta)" }}>Refinance. The math is clear.</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-coral font-bold text-[0.9375rem] shrink-0 w-32" style={{ fontFamily: "var(--font-jakarta)" }}>18 to 36 months</span>
                    <span className="text-sand/80 text-[0.9375rem]" style={{ fontFamily: "var(--font-jakarta)" }}>Consider carefully. Depends on your plans and the rate difference.</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-coral font-bold text-[0.9375rem] shrink-0 w-32" style={{ fontFamily: "var(--font-jakarta)" }}>Over 36 months</span>
                    <span className="text-sand/80 text-[0.9375rem]" style={{ fontFamily: "var(--font-jakarta)" }}>Usually not worth it. Wait for renewal unless there is another compelling reason.</span>
                  </div>
                </div>
                <p
                  className="mt-5 text-sand/50 text-[0.8125rem] leading-relaxed border-t border-white/10 pt-4"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  These are guidelines, not rules. Accessing equity, consolidating high-interest debt, or a life change can make refinancing worth it even with a longer break-even.
                </p>
              </div>

              {/* When it makes sense / doesn't */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-sand rounded-xl p-6">
                  <h3
                    className="text-navy font-bold text-[1.0625rem] mb-4"
                    style={{ fontFamily: "var(--font-spectral)" }}
                  >
                    When breaking makes clear sense
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "The break-even point is under 18 months and you plan to stay in the home",
                      "You need to access equity and a HELOC is not available or insufficient",
                      "You are consolidating high-interest debt and the monthly savings are substantial",
                      "Your lender\u2019s features are poor: bad prepayment privileges, punishing IRD formula, no portability",
                      "You are going through a life change (separation, job change, upsizing) that requires restructuring regardless",
                    ].map((item, i) => (
                      <li key={i} className="flex gap-2.5 text-[0.9375rem] text-navy/70" style={{ fontFamily: "var(--font-jakarta)" }}>
                        <span className="text-coral shrink-0 mt-0.5">&#10003;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-sand rounded-xl p-6">
                  <h3
                    className="text-navy font-bold text-[1.0625rem] mb-4"
                    style={{ fontFamily: "var(--font-spectral)" }}
                  >
                    When it is probably not worth it
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "The IRD is high and your break-even point is 3+ years away",
                      "You are planning to sell in the near term. You may be able to port the mortgage instead.",
                      "The rate improvement is small and the penalty is large",
                      "You are extending amortization significantly just to make the payments work",
                    ].map((item, i) => (
                      <li key={i} className="flex gap-2.5 text-[0.9375rem] text-navy/70" style={{ fontFamily: "var(--font-jakarta)" }}>
                        <span className="text-slate shrink-0 mt-0.5">&#10005;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Blend-and-extend */}
              <div className="mt-8 bg-sand-2 rounded-xl p-6 md:p-8">
                <h3
                  className="text-navy font-bold text-[1.0625rem] mb-3"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  The alternative: blend-and-extend
                </h3>
                <p
                  className="text-navy/70 text-[0.9375rem] leading-relaxed"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  If your lender offers it, blending your existing rate with the current rate for an extended term avoids the penalty entirely. The resulting rate is higher than what you could get by fully breaking, but the math sometimes favours this route. Jesse models both scenarios so you can compare them directly.
                </p>
              </div>
            </div>

            {/* ── Mid-page CTA ── */}
            <div className="bg-coral/5 border border-coral/20 rounded-xl p-8 text-center my-12">
              <p
                className="text-[1.125rem] md:text-[1.25rem] font-bold text-navy mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Want to know if refinancing makes sense for you?
              </p>
              <button
                onClick={handleBookCall}
                className="bg-coral text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-coral-dark transition-colors cursor-pointer text-[0.9375rem]"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Book a Call
              </button>
            </div>

            {/* ── The Process ── */}
            <div id="the-process" className="scroll-mt-24 mb-16 pb-16 border-b border-sand-2">
              <p
                className="text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-coral mb-4 text-center"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                The Process
              </p>
              <h2
                className="text-navy text-[1.75rem] md:text-[2.25rem] font-bold text-center mb-14"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                What happens when you call
              </h2>

              <div className="grid md:grid-cols-3 gap-8 md:gap-10">
                {PROCESS_STEPS.map((step) => (
                  <div key={step.num} className="text-center">
                    <span
                      className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-navy text-white text-[1.25rem] font-bold mb-5"
                      style={{ fontFamily: "var(--font-spectral)" }}
                    >
                      {step.num}
                    </span>
                    <h3
                      className="text-navy font-bold text-[1.125rem] mb-3"
                      style={{ fontFamily: "var(--font-spectral)" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-navy/70 text-[0.9375rem] leading-relaxed"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── FAQ ── */}
            <div id="faq" className="scroll-mt-24 mb-16">
              <h2
                className="text-navy text-[1.75rem] md:text-[2.25rem] font-bold text-center mb-12"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Frequently asked questions
              </h2>

              <div className="space-y-3">
                {FAQ_ITEMS.map((item, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div
                      key={i}
                      className="bg-sand rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? -1 : i)}
                        className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                      >
                        <span
                          className="text-navy font-semibold text-[0.9375rem] pr-4"
                          style={{ fontFamily: "var(--font-jakarta)" }}
                        >
                          {item.q}
                        </span>
                        <svg
                          className={`w-5 h-5 text-coral shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
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
                      <div
                        className="grid transition-all duration-200"
                        style={{
                          gridTemplateRows: isOpen ? "1fr" : "0fr",
                        }}
                      >
                        <div className="overflow-hidden">
                          <p
                            className="px-6 pb-5 text-navy/70 text-[0.9375rem] leading-relaxed"
                            style={{ fontFamily: "var(--font-jakarta)" }}
                          >
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
          {/* end main content column */}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 9 — CTA Band
      ═══════════════════════════════════════════════════ */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-2xl px-5 py-20 md:py-24 text-center">
          <h2
            className="text-[1.75rem] md:text-[2.5rem] font-bold mb-5"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            The only way to know if it is worth breaking is to run your actual numbers.
          </h2>
          <p
            className="text-sand/80 text-[1.0625rem] md:text-[1.125rem] mb-10 leading-relaxed"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Jesse does this math every day for Ontario homeowners. He will tell you the penalty, the savings, the break-even point, and exactly what he would do in your position. One call.
          </p>
          <button
            onClick={handleBookCall}
            className="bg-coral text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-coral-dark transition-colors cursor-pointer text-[0.9375rem]"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Book a Call
          </button>
        </div>
      </section>
    </>
  );
}

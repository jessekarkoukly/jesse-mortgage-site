"use client";

import { useState, useEffect, useRef, useMemo } from "react";

/* ── FAQ data ── */
const FAQ_ITEMS = [
  {
    q: "If I consolidate, does my mortgage balance go up?",
    a: "Yes. The debt you consolidate gets added to your mortgage. Your mortgage balance will be higher, and your amortization resets or extends. The trade-off is a much lower interest rate on that balance compared to credit cards or personal loans.",
  },
  {
    q: "My mortgage is not up for renewal yet. Can I still consolidate?",
    a: "You can, but you will pay a prepayment penalty to break your existing mortgage. Whether it is worth it depends on how much high-interest debt you are carrying and how large the penalty is. Jesse runs both scenarios so you can compare.",
  },
  {
    q: "What kinds of debt can actually be rolled into my mortgage?",
    a: "Credit cards, personal loans, car loans, lines of credit, student loans, tax debt, and other consumer obligations. Essentially any debt that shows on your credit bureau can be rolled into the consolidation.",
  },
  {
    q: "Will consolidating my debt hurt my credit score?",
    a: "Usually the opposite. Paying off revolving balances like credit cards typically improves your credit score because your utilization ratio drops. The new mortgage balance is an installment loan, which credit bureaus treat differently than revolving credit.",
  },
  {
    q: "How do I know if I have enough equity to consolidate?",
    a: "In Ontario, lenders allow refinancing up to 80% of your appraised home value. The difference between 80% of your home value and your current mortgage balance is your available equity. That number needs to cover the debt you want to consolidate.",
  },
  {
    q: "What if I end up running up debt again after consolidating?",
    a: "This is the most important question to ask honestly. Consolidation solves the math problem, but it does not change spending patterns. If the underlying behaviour does not change, you can end up with a larger mortgage and new consumer debt on top of it.",
  },
];

/* ── Debt type options ── */
const DEBT_TYPES = [
  "Credit Card",
  "Car Loan",
  "Personal Loan",
  "Line of Credit",
  "Student Loan",
  "Other",
];

/* ── Consolidation methods ── */
const METHODS = [
  { key: "refinance" as const, label: "Refinance", spread: 0 },
  { key: "heloc" as const, label: "HELOC", spread: 0.005 },
  { key: "second" as const, label: "Second Mortgage", spread: 0.04 },
];

type ConsolidationMethod = "refinance" | "heloc" | "second";

/* ── Process steps ── */
const PROCESS_STEPS = [
  {
    num: "01",
    title: "Tell Jesse your situation",
    body: "What debt you are carrying, your mortgage details, and your home value. This is a 10-minute conversation. No documents needed at this stage.",
  },
  {
    num: "02",
    title: "Jesse runs the numbers",
    body: "He calculates your available equity, compares all three consolidation options, factors in any penalties, and maps out your monthly savings clearly.",
  },
  {
    num: "03",
    title: "You decide with full visibility",
    body: "Jesse presents the options side by side. If consolidation makes sense, he handles the application. If it does not, he tells you that directly.",
  },
];

/* ── Helpers ── */
function fmt2(n: number): string {
  return n.toLocaleString("en-CA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function fmtDec(n: number): string {
  return n.toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function fmtPct(n: number): string {
  return (n * 100).toFixed(2);
}

/** Canadian semi-annual compounding mortgage payment */
function calcPayment(
  principal: number,
  annualRate: number,
  amortYears: number,
  paymentsPerYear = 12
): number {
  if (annualRate <= 0 || principal <= 0 || amortYears <= 0) return 0;
  const ear = Math.pow(1 + annualRate / 2, 2) - 1;
  const periodicRate = Math.pow(1 + ear, 1 / paymentsPerYear) - 1;
  const n = amortYears * paymentsPerYear;
  return (
    (principal * (periodicRate * Math.pow(1 + periodicRate, n))) /
    (Math.pow(1 + periodicRate, n) - 1)
  );
}

/* ── Debt row type ── */
interface DebtRow {
  type: string;
  balance: string;
  rate: string;
  payment: string;
}

const emptyDebt = (): DebtRow => ({
  type: "Credit Card",
  balance: "",
  rate: "",
  payment: "",
});

/* ── TOC sections ── */
const TOC_SECTIONS = [
  { id: "what-is-it", label: "What is it" },
  { id: "why-rate-matters", label: "Why your rate matters" },
  { id: "three-options", label: "Your options" },
  { id: "comparison", label: "Option comparison" },
  { id: "calculator", label: "Savings calculator" },
  { id: "when-it-works", label: "When it works" },
  { id: "the-process", label: "The process" },
  { id: "faq", label: "FAQ" },
];

/* ══════════════════════════════════════════════════════════════ */

export default function DebtConsolidationContent() {
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [activeId, setActiveId] = useState<string>(TOC_SECTIONS[0].id);
  const sectionRefs = useRef<Map<string, IntersectionObserverEntry>>(new Map());

  /* ── Calculator state ── */
  const [debts, setDebts] = useState<DebtRow[]>([emptyDebt()]);
  const [homeValue, setHomeValue] = useState("");
  const [mortgageBalance, setMortgageBalance] = useState("");
  const [mortgageRate, setMortgageRate] = useState("");
  const [amortRemaining, setAmortRemaining] = useState("");
  const [method, setMethod] = useState<ConsolidationMethod>("refinance");

  const updateDebt = (index: number, field: keyof DebtRow, value: string) => {
    setDebts((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const addDebt = () => {
    if (debts.length < 5) setDebts((prev) => [...prev, emptyDebt()]);
  };

  const removeDebt = (index: number) => {
    if (debts.length > 1) setDebts((prev) => prev.filter((_, i) => i !== index));
  };

  /* ── Calculator logic ── */
  const results = useMemo(() => {
    const hv = parseFloat(homeValue) || 0;
    const mb = parseFloat(mortgageBalance) || 0;
    const mr = (parseFloat(mortgageRate) || 0) / 100;
    const amort = parseFloat(amortRemaining) || 0;

    const parsedDebts = debts.map((d) => ({
      balance: parseFloat(d.balance) || 0,
      rate: (parseFloat(d.rate) || 0) / 100,
      payment: parseFloat(d.payment) || 0,
    }));

    const totalDebtBalance = parsedDebts.reduce((s, d) => s + d.balance, 0);
    const totalCurrentPayments = parsedDebts.reduce((s, d) => s + d.payment, 0);

    // Available equity
    const availableEquity = hv * 0.8 - mb;
    const equityShortfall = totalDebtBalance > availableEquity;

    // Weighted average rate of existing debts
    const weightedRateNum = parsedDebts.reduce(
      (s, d) => s + d.balance * d.rate,
      0
    );
    const weightedAvgRate =
      totalDebtBalance > 0 ? weightedRateNum / totalDebtBalance : 0;

    // Consolidated rate based on method
    const methodObj = METHODS.find((m) => m.key === method)!;
    const consolidatedRate = mr + methodObj.spread;

    // Current mortgage payment
    const currentMortgagePayment = calcPayment(mb, mr, amort);

    // New consolidated payment (mortgage + debt rolled in)
    const newTotalPrincipal = mb + totalDebtBalance;
    const newConsolidatedPayment = calcPayment(
      newTotalPrincipal,
      consolidatedRate,
      amort
    );

    // Savings
    const currentTotalMonthly = currentMortgagePayment + totalCurrentPayments;
    const monthlySavings = currentTotalMonthly - newConsolidatedPayment;
    const annualSavings = monthlySavings * 12;
    const fiveYearSavings = monthlySavings * 60;

    const hasInputs =
      hv > 0 && mb > 0 && mr > 0 && amort > 0 && totalDebtBalance > 0;

    return {
      totalDebtBalance,
      totalCurrentPayments,
      availableEquity,
      equityShortfall,
      weightedAvgRate,
      consolidatedRate,
      currentMortgagePayment,
      currentTotalMonthly,
      newConsolidatedPayment,
      monthlySavings,
      annualSavings,
      fiveYearSavings,
      hasInputs,
    };
  }, [debts, homeValue, mortgageBalance, mortgageRate, amortRemaining, method]);

  const handleBookCall = () => {
    window.dispatchEvent(new CustomEvent("open-booking-modal"));
  };

  /* ── Scroll-spy ── */
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

  /* ── Shared styles ── */
  const darkInputClass =
    "w-full rounded-lg bg-navy-2 border border-navy/40 px-4 py-3 text-navy text-[0.9375rem] focus:outline-none focus:ring-2 focus:ring-coral/40 placeholder:text-slate/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════ */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-3xl px-5 pt-28 pb-20 md:pt-36 md:pb-28 text-center">
          <p
            className="text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-coral mb-6"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Ontario Debt Consolidation
          </p>
          <h1
            className="text-[2rem] md:text-[2.75rem] leading-[1.15] font-bold mb-6"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Carrying high-interest debt on top of a mortgage? Your equity might
            change the math.
          </h1>
          <p
            className="text-sand/80 text-[1.0625rem] md:text-[1.125rem] leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            If you own your home and carry credit card balances, car loans, or
            other consumer debt, rolling that debt into your mortgage can lower
            your monthly payments significantly. Jesse runs the numbers and tells
            you whether it actually makes sense in your situation.
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
      </section>

      {/* ═══════════════════════════════════════════════════
          TOC + CONTENT GRID
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

            {/* ═══════════════════════════════════════════════════
                SECTION 01 — What is debt consolidation
            ═══════════════════════════════════════════════════ */}
            <div id="what-is-it" className="scroll-mt-24 mb-16 pb-16 border-b border-sand-2">
              <p
                className="text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-coral mb-4 text-center"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                How It Works
              </p>
              <h2
                className="text-navy text-[1.75rem] md:text-[2.25rem] font-bold text-center mb-12"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Using home equity to pay off high-interest debt
              </h2>

              <div
                className="flex flex-col gap-5 text-[1rem] text-navy/70 leading-relaxed"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                <p>
                  Debt consolidation through your mortgage takes multiple
                  high-interest balances and rolls them into a single, lower-rate
                  payment secured against your home. Credit cards charge 19% to 24%.
                  Car loans run 6% to 12%. Personal lines of credit sit around 7% to
                  10%. Mortgage rates are considerably lower than all of these.
                </p>
                <p>
                  The mechanics are straightforward. You use your available home
                  equity to pay off existing consumer debt. That debt becomes part of
                  your mortgage, and you make one payment at mortgage rates instead
                  of multiple payments at higher rates.
                </p>
                <p>
                  The key number is your available equity: 80% of your home&rsquo;s
                  appraised value minus your current mortgage balance. That is how
                  much you can access.
                </p>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════
                SECTION 02 — Why your mortgage rate matters
            ═══════════════════════════════════════════════════ */}
            <div id="why-rate-matters" className="scroll-mt-24 mb-16 pb-16 border-b border-sand-2">
              <p
                className="text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-coral mb-4 text-center"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                The Rate Advantage
              </p>
              <h2
                className="text-navy text-[1.75rem] md:text-[2.25rem] font-bold text-center mb-12"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Why your mortgage rate matters
              </h2>

              <p
                className="text-navy/70 text-[1rem] leading-relaxed text-center mb-10 max-w-2xl mx-auto"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                The difference between consumer debt rates and mortgage rates is
                where the savings come from. Here is a typical comparison.
              </p>

              {/* Static rate comparison card */}
              <div className="bg-sand rounded-xl overflow-hidden">
                <div className="bg-navy px-6 py-4">
                  <h3
                    className="text-white font-bold text-[1rem]"
                    style={{ fontFamily: "var(--font-spectral)" }}
                  >
                    Typical interest rates by debt type
                  </h3>
                </div>
                <div className="divide-y divide-navy/10">
                  {[
                    { label: "Credit Card", rate: "19.99% to 24.99%", colour: "text-coral" },
                    { label: "Car Loan", rate: "6.00% to 12.00%", colour: "text-coral" },
                    { label: "Personal Line of Credit", rate: "7.00% to 10.00%", colour: "text-coral" },
                    { label: "Personal Loan", rate: "8.00% to 15.00%", colour: "text-coral" },
                    { label: "Mortgage (Refinance)", rate: "4.50% to 5.50%", colour: "text-navy" },
                    { label: "HELOC", rate: "5.00% to 6.50%", colour: "text-navy" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex justify-between items-center px-6 py-4 text-[0.9375rem]"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      <span className="text-navy/70">{row.label}</span>
                      <span className={`font-semibold ${row.colour}`}>
                        {row.rate}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p
                className="text-navy/60 text-[0.875rem] text-center mt-6 leading-relaxed"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Rates shown are typical ranges as of early 2026. Your actual rate
                depends on your credit profile, equity, and the consolidation method
                chosen.
              </p>
            </div>

            {/* ═══════════════════════════════════════════════════
                SECTION 03 — Three Options
            ═══════════════════════════════════════════════════ */}
            <div id="three-options" className="scroll-mt-24 mb-16 pb-16 border-b border-sand-2">
              <p
                className="text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-coral mb-4 text-center"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Your Options
              </p>
              <h2
                className="text-navy text-[1.75rem] md:text-[2.25rem] font-bold text-center mb-14"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Three ways to consolidate debt with your home
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Refinance */}
                <div className="bg-sand rounded-xl p-7 h-full flex flex-col">
                  <h3
                    className="text-navy font-bold text-[1.125rem] mb-3"
                    style={{ fontFamily: "var(--font-spectral)" }}
                  >
                    Refinance
                  </h3>
                  <p
                    className="text-navy/70 text-[0.9375rem] leading-relaxed mb-4 flex-1"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    Break your existing mortgage and start a new one at a higher
                    balance that includes your debt. One payment, one rate, one
                    amortization schedule.
                  </p>
                  <div
                    className="text-[0.8125rem] text-navy/60 space-y-1.5 border-t border-navy/10 pt-4"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    <p>
                      <span className="font-semibold text-navy">Rate:</span> Your
                      new mortgage rate
                    </p>
                    <p>
                      <span className="font-semibold text-navy">Best for:</span>{" "}
                      Large debt amounts, wanting a single fixed payment
                    </p>
                    <p>
                      <span className="font-semibold text-navy">Trade-off:</span>{" "}
                      Prepayment penalty if breaking mid-term. Legal and appraisal
                      costs apply.
                    </p>
                  </div>
                </div>

                {/* HELOC */}
                <div className="bg-sand rounded-xl p-7 h-full flex flex-col">
                  <h3
                    className="text-navy font-bold text-[1.125rem] mb-3"
                    style={{ fontFamily: "var(--font-spectral)" }}
                  >
                    HELOC
                  </h3>
                  <p
                    className="text-navy/70 text-[0.9375rem] leading-relaxed mb-4 flex-1"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    A revolving line of credit secured against your home. You draw
                    what you need, pay it down, and the credit is available again.
                    Rate is variable, tied to prime.
                  </p>
                  <div
                    className="text-[0.8125rem] text-navy/60 space-y-1.5 border-t border-navy/10 pt-4"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    <p>
                      <span className="font-semibold text-navy">Rate:</span>{" "}
                      Mortgage rate + ~0.50%
                    </p>
                    <p>
                      <span className="font-semibold text-navy">Best for:</span>{" "}
                      Moderate amounts, wanting flexibility
                    </p>
                    <p>
                      <span className="font-semibold text-navy">Trade-off:</span>{" "}
                      Variable rate. Requires discipline since the credit reopens as
                      you repay.
                    </p>
                  </div>
                </div>

                {/* Second Mortgage */}
                <div className="bg-sand rounded-xl p-7 h-full flex flex-col">
                  <h3
                    className="text-navy font-bold text-[1.125rem] mb-3"
                    style={{ fontFamily: "var(--font-spectral)" }}
                  >
                    Second Mortgage
                  </h3>
                  <p
                    className="text-navy/70 text-[0.9375rem] leading-relaxed mb-4 flex-1"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    A separate loan registered behind your first mortgage. Your
                    existing mortgage stays untouched. Useful when breaking the first
                    mortgage is too costly or not an option.
                  </p>
                  <div
                    className="text-[0.8125rem] text-navy/60 space-y-1.5 border-t border-navy/10 pt-4"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    <p>
                      <span className="font-semibold text-navy">Rate:</span>{" "}
                      Mortgage rate + ~4.00%
                    </p>
                    <p>
                      <span className="font-semibold text-navy">Best for:</span>{" "}
                      Avoiding a prepayment penalty, credit challenges
                    </p>
                    <p>
                      <span className="font-semibold text-navy">Trade-off:</span>{" "}
                      Higher rate. Shorter terms (typically 1 to 3 years). Lender
                      fees may apply.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════
                SECTION 04 — Option Comparison Table
            ═══════════════════════════════════════════════════ */}
            <div id="comparison" className="scroll-mt-24 mb-16 pb-16 border-b border-sand-2">
              <p
                className="text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-coral mb-4 text-center"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Side-by-Side
              </p>
              <h2
                className="text-navy text-[1.75rem] md:text-[2.25rem] font-bold text-center mb-12"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Comparing your consolidation options
              </h2>

              <div className="overflow-x-auto -mx-5 px-5">
                <table
                  className="w-full min-w-[600px] text-[0.875rem]"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  <thead>
                    <tr className="bg-navy text-white">
                      <th className="text-left px-5 py-4 font-semibold rounded-tl-lg">
                        Factor
                      </th>
                      <th className="text-left px-5 py-4 font-semibold">
                        Refinance
                      </th>
                      <th className="text-left px-5 py-4 font-semibold">HELOC</th>
                      <th className="text-left px-5 py-4 font-semibold rounded-tr-lg">
                        Second Mortgage
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [
                        "Interest rate",
                        "Lowest (mortgage rate)",
                        "Moderate (prime + margin)",
                        "Highest (mortgage + ~4%)",
                      ],
                      [
                        "Payment structure",
                        "Fixed monthly payment",
                        "Interest-only minimum",
                        "Fixed monthly payment",
                      ],
                      [
                        "Access to 80% LTV",
                        "Yes",
                        "Yes",
                        "Yes (combined with first)",
                      ],
                      [
                        "Penalty to set up",
                        "Yes, if mid-term",
                        "Often avoidable",
                        "Typically none",
                      ],
                      [
                        "Legal and appraisal costs",
                        "$1,500 to $3,000",
                        "$500 to $1,500",
                        "$1,000 to $2,500",
                      ],
                      [
                        "Revolving credit",
                        "No",
                        "Yes (re-borrowable)",
                        "No",
                      ],
                      [
                        "Ideal debt amount",
                        "$20,000+",
                        "$10,000 to $50,000",
                        "$10,000 to $75,000",
                      ],
                      [
                        "Term flexibility",
                        "1 to 5 year terms",
                        "Open / revolving",
                        "1 to 3 year terms",
                      ],
                    ].map((row, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "bg-white" : "bg-sand"}
                      >
                        {row.map((cell, j) => (
                          <td
                            key={j}
                            className={`px-5 py-3.5 ${
                              j === 0
                                ? "font-semibold text-navy"
                                : "text-navy/70"
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════
                SECTION 05 — Consolidation Savings Calculator
            ═══════════════════════════════════════════════════ */}
            <div id="calculator" className="scroll-mt-24 mb-16 pb-16 border-b border-sand-2">
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
                How much could you save by consolidating?
              </h2>
              <p
                className="text-navy/60 text-[1rem] text-center mb-12 max-w-lg mx-auto"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Enter your current debts and mortgage details below. The calculator
                compares your total monthly obligations today against a single
                consolidated payment.
              </p>

              {/* Debt Entries */}
              <div className="bg-sand rounded-xl p-6 md:p-8 mb-6">
                <h3
                  className="text-navy text-[1.0625rem] font-bold mb-6"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  Your current debts
                </h3>

                <div className="space-y-5">
                  {debts.map((debt, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg p-4 border border-navy/10"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className="text-[0.8125rem] font-semibold text-navy/70"
                          style={{ fontFamily: "var(--font-jakarta)" }}
                        >
                          Debt {i + 1}
                        </span>
                        {debts.length > 1 && (
                          <button
                            onClick={() => removeDebt(i)}
                            className="text-slate hover:text-coral text-[0.75rem] cursor-pointer transition-colors"
                            style={{ fontFamily: "var(--font-jakarta)" }}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                        <div>
                          <label
                            className="block text-[0.75rem] font-semibold text-navy/60 mb-1"
                            style={{ fontFamily: "var(--font-jakarta)" }}
                          >
                            Type
                          </label>
                          <select
                            value={debt.type}
                            onChange={(e) =>
                              updateDebt(i, "type", e.target.value)
                            }
                            className="w-full rounded-lg bg-white border border-navy/20 px-3 py-2.5 text-navy text-[0.875rem] focus:outline-none focus:ring-2 focus:ring-coral/40 cursor-pointer"
                            style={{ fontFamily: "var(--font-jakarta)" }}
                          >
                            {DEBT_TYPES.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label
                            className="block text-[0.75rem] font-semibold text-navy/60 mb-1"
                            style={{ fontFamily: "var(--font-jakarta)" }}
                          >
                            Balance ($)
                          </label>
                          <input
                            type="number"
                            value={debt.balance}
                            onChange={(e) =>
                              updateDebt(i, "balance", e.target.value)
                            }
                            placeholder="15,000"
                            className={darkInputClass}
                            style={{ fontFamily: "var(--font-jakarta)" }}
                          />
                        </div>
                        <div>
                          <label
                            className="block text-[0.75rem] font-semibold text-navy/60 mb-1"
                            style={{ fontFamily: "var(--font-jakarta)" }}
                          >
                            Rate (%)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={debt.rate}
                            onChange={(e) =>
                              updateDebt(i, "rate", e.target.value)
                            }
                            placeholder="19.99"
                            className={darkInputClass}
                            style={{ fontFamily: "var(--font-jakarta)" }}
                          />
                        </div>
                        <div>
                          <label
                            className="block text-[0.75rem] font-semibold text-navy/60 mb-1"
                            style={{ fontFamily: "var(--font-jakarta)" }}
                          >
                            Monthly Payment ($)
                          </label>
                          <input
                            type="number"
                            value={debt.payment}
                            onChange={(e) =>
                              updateDebt(i, "payment", e.target.value)
                            }
                            placeholder="450"
                            className={darkInputClass}
                            style={{ fontFamily: "var(--font-jakarta)" }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {debts.length < 5 && (
                  <button
                    onClick={addDebt}
                    className="mt-4 text-coral text-[0.875rem] font-semibold hover:text-coral-dark cursor-pointer transition-colors"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    + Add another debt
                  </button>
                )}

                {/* Weighted average rate callout */}
                {results.totalDebtBalance > 0 && results.weightedAvgRate > 0 && (
                  <div className="mt-5 bg-white rounded-lg px-4 py-3 border border-navy/10">
                    <p
                      className="text-navy/70 text-[0.8125rem]"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      Weighted average rate across your debts:{" "}
                      <span className="text-coral font-bold">
                        {fmtPct(results.weightedAvgRate)}%
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {/* Home Details */}
              <div className="bg-sand rounded-xl p-6 md:p-8 mb-6">
                <h3
                  className="text-navy text-[1.0625rem] font-bold mb-6"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  Your mortgage details
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      className="block text-[0.8125rem] font-semibold text-navy/70 mb-1.5"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      Estimated home value ($)
                    </label>
                    <input
                      type="number"
                      value={homeValue}
                      onChange={(e) => setHomeValue(e.target.value)}
                      placeholder="800,000"
                      className={darkInputClass}
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-[0.8125rem] font-semibold text-navy/70 mb-1.5"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      Current mortgage balance ($)
                    </label>
                    <input
                      type="number"
                      value={mortgageBalance}
                      onChange={(e) => setMortgageBalance(e.target.value)}
                      placeholder="450,000"
                      className={darkInputClass}
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-[0.8125rem] font-semibold text-navy/70 mb-1.5"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      Current mortgage rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={mortgageRate}
                      onChange={(e) => setMortgageRate(e.target.value)}
                      placeholder="5.00"
                      className={darkInputClass}
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-[0.8125rem] font-semibold text-navy/70 mb-1.5"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      Amortization remaining (years)
                    </label>
                    <input
                      type="number"
                      value={amortRemaining}
                      onChange={(e) => setAmortRemaining(e.target.value)}
                      placeholder="22"
                      className={darkInputClass}
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    />
                  </div>
                </div>

                {/* Available equity callout */}
                {(parseFloat(homeValue) || 0) > 0 &&
                  (parseFloat(mortgageBalance) || 0) > 0 && (
                    <div className="mt-5 bg-white rounded-lg px-4 py-3 border border-navy/10">
                      <div className="flex justify-between text-[0.875rem]" style={{ fontFamily: "var(--font-jakarta)" }}>
                        <span className="text-navy/70">Available equity (80% LTV)</span>
                        <span
                          className={`font-bold ${
                            results.availableEquity >= 0
                              ? "text-navy"
                              : "text-coral"
                          }`}
                        >
                          ${fmt2(Math.max(results.availableEquity, 0))}
                        </span>
                      </div>
                    </div>
                  )}
              </div>

              {/* Method Toggle */}
              <div className="bg-sand rounded-xl p-6 md:p-8 mb-6">
                <h3
                  className="text-navy text-[1.0625rem] font-bold mb-4"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  Consolidation method
                </h3>
                <div className="flex gap-2">
                  {METHODS.map((m) => (
                    <button
                      key={m.key}
                      onClick={() => setMethod(m.key)}
                      className={`flex-1 py-2.5 rounded-lg text-[0.875rem] font-semibold cursor-pointer transition-colors ${
                        method === m.key
                          ? "bg-coral text-white"
                          : "bg-white text-navy/60 hover:bg-sand-2"
                      }`}
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
                <p
                  className="text-navy/40 text-[0.75rem] mt-3"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {method === "refinance" &&
                    "New payment calculated at your mortgage rate on the combined balance."}
                  {method === "heloc" &&
                    "Rate estimated at your mortgage rate + 0.50%. Actual HELOC rates are variable and tied to prime."}
                  {method === "second" &&
                    "Rate estimated at your mortgage rate + 4.00%. Second mortgage rates vary by lender and risk profile."}
                </p>
              </div>

              {/* Results */}
              {results.hasInputs && (
                <div className="bg-navy rounded-xl p-6 md:p-8 text-white">
                  <h3
                    className="text-[1.0625rem] font-bold mb-6"
                    style={{ fontFamily: "var(--font-spectral)" }}
                  >
                    Your consolidation estimate
                  </h3>

                  {/* Equity warning */}
                  {results.equityShortfall && (
                    <div className="bg-coral/20 border border-coral/40 rounded-lg p-4 mb-6">
                      <p
                        className="text-coral text-[0.875rem] font-semibold"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        Your total debt (${fmt2(results.totalDebtBalance)}) exceeds
                        your available equity ($
                        {fmt2(Math.max(results.availableEquity, 0))}). You may not
                        be able to consolidate the full amount. Jesse can discuss
                        partial consolidation options.
                      </p>
                    </div>
                  )}

                  <div className="bg-white/5 rounded-lg p-5 border border-white/10 space-y-3">
                    <div
                      className="flex justify-between text-[0.9375rem]"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      <span className="text-sand/70">
                        Current mortgage payment
                      </span>
                      <span className="text-white font-semibold">
                        {fmtDec(results.currentMortgagePayment)}
                      </span>
                    </div>
                    <div
                      className="flex justify-between text-[0.9375rem]"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      <span className="text-sand/70">
                        Current debt payments (total)
                      </span>
                      <span className="text-white font-semibold">
                        {fmtDec(results.totalCurrentPayments)}
                      </span>
                    </div>
                    <div
                      className="flex justify-between text-[0.9375rem] pt-2 border-t border-white/10"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      <span className="text-sand/70 font-semibold">
                        Current total monthly
                      </span>
                      <span className="text-white font-bold">
                        {fmtDec(results.currentTotalMonthly)}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-white/10">
                      <div
                        className="flex justify-between text-[0.9375rem] mb-1"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        <span className="text-sand/70">
                          Consolidated rate (
                          {method === "refinance"
                            ? "mortgage rate"
                            : method === "heloc"
                              ? "mortgage + 0.50%"
                              : "mortgage + 4.00%"}
                          )
                        </span>
                        <span className="text-white font-semibold">
                          {fmtPct(results.consolidatedRate)}%
                        </span>
                      </div>
                      <div
                        className="flex justify-between text-[1.0625rem] pt-2"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        <span className="text-white font-bold">
                          New consolidated payment
                        </span>
                        <span className="text-coral font-bold text-[1.25rem]">
                          {fmtDec(results.newConsolidatedPayment)}
                        </span>
                      </div>
                    </div>

                    {/* Savings summary */}
                    <div className="pt-4 border-t border-white/10 space-y-2">
                      <div
                        className="flex justify-between text-[0.9375rem]"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        <span className="text-sand/70">Monthly savings</span>
                        <span
                          className={`font-bold ${
                            results.monthlySavings > 0
                              ? "text-green-400"
                              : "text-coral"
                          }`}
                        >
                          {fmtDec(results.monthlySavings)}
                        </span>
                      </div>
                      <div
                        className="flex justify-between text-[0.9375rem]"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        <span className="text-sand/70">Annual savings</span>
                        <span
                          className={`font-semibold ${
                            results.annualSavings > 0
                              ? "text-green-400"
                              : "text-coral"
                          }`}
                        >
                          {fmtDec(results.annualSavings)}
                        </span>
                      </div>
                      <div
                        className="flex justify-between text-[0.9375rem]"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        <span className="text-sand/70">5-year savings</span>
                        <span
                          className={`font-semibold ${
                            results.fiveYearSavings > 0
                              ? "text-green-400"
                              : "text-coral"
                          }`}
                        >
                          {fmtDec(results.fiveYearSavings)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Calculator CTA */}
                  <div className="mt-8 text-center">
                    <p
                      className="text-sand/60 text-[0.9375rem] mb-4"
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

            {/* ═══════════════════════════════════════════════════
                SECTION 06 — When it makes sense / when it doesn't
            ═══════════════════════════════════════════════════ */}
            <div id="when-it-works" className="scroll-mt-24 mb-16 pb-16 border-b border-sand-2">
              <p
                className="text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-coral mb-4 text-center"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Honest Assessment
              </p>
              <h2
                className="text-navy text-[1.75rem] md:text-[2.25rem] font-bold text-center mb-12"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                When consolidation works and when it does not
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-sand rounded-xl p-6">
                  <h3
                    className="text-navy font-bold text-[1.0625rem] mb-4"
                    style={{ fontFamily: "var(--font-spectral)" }}
                  >
                    When it makes sense
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "You carry $15,000 or more in high-interest debt and the monthly payments are straining your cash flow",
                      "You have sufficient home equity to cover the consolidation",
                      "The interest rate drop from consumer debt to mortgage rates creates meaningful monthly savings",
                      "Your debt-to-income ratio is affecting qualification for other financial goals",
                      "You have a plan to avoid re-accumulating consumer debt after consolidation",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-2.5 text-[0.9375rem] text-navy/70"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        <span className="text-coral shrink-0 mt-0.5">
                          &#10003;
                        </span>
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
                    When it may not be the right move
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "The debt amount is small relative to the cost of refinancing",
                      "Your mortgage renewal is within 6 months and you can wait",
                      "The prepayment penalty to break your current mortgage outweighs the savings",
                      "The spending patterns that created the debt have not changed",
                      "You have limited equity and the consolidation only covers a fraction of what you owe",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-2.5 text-[0.9375rem] text-navy/70"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        <span className="text-slate shrink-0 mt-0.5">
                          &#10005;
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Honest callout */}
              <div className="mt-8 bg-sand-2 rounded-xl p-6 md:p-8 border-l-4 border-coral">
                <h3
                  className="text-navy font-bold text-[1.0625rem] mb-3"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  The honest conversation
                </h3>
                <p
                  className="text-navy/70 text-[0.9375rem] leading-relaxed"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Consolidation solves the interest rate problem. It does not solve a
                  spending problem. If the same habits that created the debt continue
                  after consolidation, you can end up with a larger mortgage and new
                  consumer debt on top of it. Jesse discusses this openly with every
                  client considering this option.
                </p>
              </div>
            </div>

            {/* ── Mid-page CTA ── */}
            <div className="bg-coral/5 border border-coral/20 rounded-xl p-8 text-center my-12">
              <p
                className="text-[1.125rem] md:text-[1.25rem] font-bold text-navy mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Want to see what consolidation looks like with your numbers?
              </p>
              <button
                onClick={handleBookCall}
                className="bg-coral text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-coral-dark transition-colors cursor-pointer text-[0.9375rem]"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Book a Call
              </button>
            </div>

            {/* ═══════════════════════════════════════════════════
                SECTION 07 — 3-Step Process
            ═══════════════════════════════════════════════════ */}
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

            {/* ═══════════════════════════════════════════════════
                SECTION 08 — FAQ
            ═══════════════════════════════════════════════════ */}
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
                    <div key={i} className="bg-sand rounded-lg overflow-hidden">
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
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 09 — CTA Band
      ═══════════════════════════════════════════════════ */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-2xl px-5 py-20 md:py-24 text-center">
          <h2
            className="text-[1.75rem] md:text-[2.5rem] font-bold mb-5"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            The only way to know is to run the numbers on your actual situation.
          </h2>
          <p
            className="text-sand/80 text-[1.0625rem] md:text-[1.125rem] mb-10 leading-relaxed"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Jesse looks at your debts, your equity, and your mortgage details.
            He compares all three consolidation paths and tells you which one
            saves you the most. One call.
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

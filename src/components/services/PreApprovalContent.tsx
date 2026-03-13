"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";

/* ── TOC ── */
const TOC_ITEMS = [
  { id: "what-it-is", label: "Pre-qual vs pre-approval" },
  { id: "why-it-matters", label: "Why it matters" },
  { id: "broker-vs-bank", label: "Broker vs. bank" },
  { id: "what-you-need", label: "What to prepare" },
  { id: "the-process", label: "The process" },
  { id: "protect-it", label: "Protect your approval" },
  { id: "calculator", label: "Affordability check" },
  { id: "faq", label: "FAQ" },
];

/* ── FAQ ── */
const FAQ_ITEMS = [
  {
    q: "How long does this actually take?",
    a: "Most pre-approvals are completed within 24 to 48 hours once all documents are received. The initial call is typically 15 to 30 minutes. If your documents are organized and ready, the process moves as fast as the lender allows.",
  },
  {
    q: "Will getting pre-approved hurt my credit score?",
    a: "A hard inquiry may temporarily lower your score by 5 to 10 points. Working through a broker, one inquiry is used to assess every lender on your behalf. If you visited three banks directly, that would be three separate hard inquiries on your report.",
  },
  {
    q: "My bank said I am pre-qualified. Is that the same as pre-approved?",
    a: "No. Pre-qualification is an estimate based on self-reported numbers with no verification. Pre-approval involves actual verification of your income, credit, and assets by a lender. For making offers on homes, you want the verified version. Experienced agents and sellers know the difference immediately.",
  },
  {
    q: "I am self-employed. Can I still get pre-approved?",
    a: "Yes. Self-employed pre-approvals require additional documentation, typically two years of tax returns and financial statements, but are absolutely achievable. There are lenders who specialize in self-employed borrowers and price competitively for them.",
  },
  {
    q: "I got approved for way more than I want to spend. Should I be worried?",
    a: "Very common. The pre-approval tells you the maximum a lender will give you. It does not tell you what you should spend. The monthly payment that actually fits your life is often a different number than the maximum approval amount.",
  },
  {
    q: "Am I locked into working with you once I get pre-approved?",
    a: "No. You are never locked in until you sign a commitment with a specific lender. The job is to find you the best option available and explain the tradeoffs clearly. If you find something better elsewhere, say so and Jesse will tell you honestly whether it actually is.",
  },
  {
    q: "What if rates drop after I lock in my pre-approval?",
    a: "You automatically get the lower rate. The rate hold is a ceiling, not a floor. This is one of the reasons getting pre-approved early in your search costs you nothing and protects you in both directions.",
  },
];

/* ── Process steps ── */
const STEPS = [
  {
    title: "The strategy call",
    timeline: "15-30 minutes",
    body: "Jesse reviews your situation: income, debts, down payment, and goals. No forms yet. Just a conversation to understand what you actually need and which lenders make sense before anything is submitted.",
  },
  {
    title: "Application and documents",
    timeline: "Same day",
    body: "You submit documents through a secure portal. Everything is reviewed, anything that might be an issue is flagged early, and a clean application is prepared before it ever touches a lender.",
  },
  {
    title: "Credit review",
    timeline: "Single inquiry",
    body: "One credit check is run. Working through a broker, that single inquiry covers every lender assessed on your behalf. Visiting three banks directly would mean three separate hard inquiries on your report.",
  },
  {
    title: "Lender matching",
    timeline: "24-48 hours",
    body: "Jesse assesses your application against 50+ lenders. Not just for the lowest rate, but for the right product: prepayment flexibility, penalty structure, and portability for your situation.",
  },
  {
    title: "Pre-approval letter in hand",
    timeline: "You are ready to shop",
    body: "You receive a written pre-approval: your maximum amount, rate held for up to 120 days, and estimated payment. Share it with your realtor and start shopping with a real budget and real confidence.",
  },
];

/* ── Affordability Calculator ── */
function AffordabilityCalculator({
  onBookCall,
}: {
  onBookCall: () => void;
}) {
  const [income, setIncome] = useState(120000);
  const [debts, setDebts] = useState(800);
  const [downPayment, setDownPayment] = useState(80000);
  const [firstTime, setFirstTime] = useState(false);

  const result = useMemo(() => {
    const contractRate = 0.0475;
    const stressRate = Math.max(0.0525, contractRate + 0.02);
    const ear = Math.pow(1 + stressRate / 2, 2) - 1;
    const paymentsPerYear = 12;
    const amortYears = firstTime ? 30 : 25;
    const r = Math.pow(1 + ear, 1 / paymentsPerYear) - 1;
    const n = amortYears * paymentsPerYear;
    const propertyTax = 400;
    const heating = 120;

    const maxPaymentGDS =
      (income / 12) * 0.39 - propertyTax - heating;
    const maxPaymentTDS =
      (income / 12) * 0.44 - propertyTax - heating - debts;
    const maxPayment = Math.max(
      0,
      Math.min(maxPaymentGDS, maxPaymentTDS)
    );
    const maxLoan =
      maxPayment *
      (Math.pow(1 + r, n) - 1) /
      (r * Math.pow(1 + r, n));
    const maxPurchase = maxLoan + downPayment;
    return {
      maxPurchase,
      monthlyPayment: maxPayment,
      amortYears,
    };
  }, [income, debts, downPayment, firstTime]);

  const fmtDollar = (n: number) =>
    "$" + Math.round(n).toLocaleString("en-CA");

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-sand-2 overflow-hidden">
      {/* Header */}
      <div className="bg-navy px-6 py-4 flex items-center justify-between">
        <p
          className="text-[1rem] font-bold text-sand"
          style={{ fontFamily: "var(--font-spectral)" }}
        >
          Affordability Check
        </p>
        <span
          className="text-[0.625rem] font-bold text-coral bg-coral/10 px-3 py-1 rounded-full uppercase tracking-widest"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Ontario 2025 Rules
        </span>
      </div>

      <div className="p-6">
        {/* Sliders */}
        <div className="space-y-6 mb-6">
          <div>
            <div className="flex justify-between mb-2">
              <label
                className="text-[0.8125rem] font-semibold text-navy"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Household Income
              </label>
              <span
                className="text-[0.8125rem] font-bold text-coral"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {fmtDollar(income)}
              </span>
            </div>
            <input
              type="range"
              min={40000}
              max={400000}
              step={5000}
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full accent-coral"
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label
                className="text-[0.8125rem] font-semibold text-navy"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Monthly Debts
              </label>
              <span
                className="text-[0.8125rem] font-bold text-coral"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {fmtDollar(debts)}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={5000}
              step={50}
              value={debts}
              onChange={(e) => setDebts(Number(e.target.value))}
              className="w-full accent-coral"
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label
                className="text-[0.8125rem] font-semibold text-navy"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Down Payment Saved
              </label>
              <span
                className="text-[0.8125rem] font-bold text-coral"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {fmtDollar(downPayment)}
              </span>
            </div>
            <input
              type="range"
              min={10000}
              max={500000}
              step={5000}
              value={downPayment}
              onChange={(e) =>
                setDownPayment(Number(e.target.value))
              }
              className="w-full accent-coral"
            />
          </div>
        </div>

        {/* First-time toggle */}
        <div className="bg-sand rounded-lg px-4 py-3 flex items-center justify-between mb-6">
          <div>
            <p
              className="text-[0.8125rem] font-semibold text-navy"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              First-Time Buyer?
            </p>
            <p
              className="text-[0.6875rem] text-slate"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              30-year amortization available
            </p>
          </div>
          <button
            onClick={() => setFirstTime(!firstTime)}
            className={`w-11 h-6 rounded-full transition-colors duration-200 relative cursor-pointer ${
              firstTime ? "bg-coral" : "bg-sand-2"
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                firstTime ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        {/* Result */}
        <div className="bg-navy rounded-xl p-5 mb-6">
          <p
            className="text-[0.625rem] font-bold text-slate uppercase tracking-widest mb-1"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            You could afford up to
          </p>
          <p
            className="text-[2.5rem] font-bold text-sand leading-tight mb-2"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            {fmtDollar(result.maxPurchase)}
          </p>
          <div className="w-full h-1.5 bg-navy-2 rounded-full mb-3">
            <div
              className="h-full bg-coral rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(
                  100,
                  (result.maxPurchase / 1500000) * 100
                )}%`,
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span
              className="text-[0.8125rem] text-slate"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              ~{fmtDollar(result.monthlyPayment)}/mo
            </span>
            <span
              className="text-[0.8125rem] font-semibold text-coral"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              {result.amortYears}-year amort
            </span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onBookCall}
          className="w-full bg-coral text-white font-semibold py-3.5 rounded-lg hover:bg-coral-dark transition-colors cursor-pointer text-[0.9375rem] mb-3"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Get My Exact Numbers
        </button>
        <p
          className="text-[0.6875rem] text-slate text-center"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Based on 39%/44% GDS/TDS · Stress-tested at contract rate +
          2% · Canadian semi-annual compounding
        </p>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────── */

export default function PreApprovalContent() {
  const [activeSection, setActiveSection] = useState("what-it-is");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

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
      {/* ── HERO ── */}
      <section className="bg-navy pt-28 pb-20 px-6 lg:pt-32 lg:pb-24 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, #E8705A 0%, transparent 70%)",
          }}
        />
        <div className="max-w-3xl mx-auto text-center relative">
          <span
            className="inline-block border border-coral text-coral text-[0.6875rem] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Mortgage Pre-Approval
          </span>
          <h1
            className="text-[2.25rem] sm:text-[2.75rem] lg:text-[3.25rem] font-bold text-sand leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Before you fall in love with a home, find out what you can{" "}
            <span className="text-coral">actually</span> afford.
          </h1>
          <p
            className="text-[1.0625rem] text-slate leading-relaxed max-w-2xl mx-auto mb-8"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            A mortgage pre-approval gives you a real number, locks your rate for
            up to 120 days, and puts you in the strongest possible position when
            you find the right home. Takes 24-48 hours. Costs nothing.
          </p>
          <button
            onClick={handleBookCall}
            className="bg-coral text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-coral-dark transition-colors cursor-pointer text-[0.9375rem] mb-8"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Book a Pre-Approval Call
          </button>
          <div className="flex flex-wrap gap-5 justify-center">
            {[
              "No cost to you",
              "50+ lenders compared",
              "120-day rate hold",
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

      {/* ── TOC + CONTENT ── */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[220px_1fr] gap-12">
          {/* Sticky TOC */}
          <nav className="hidden lg:block">
            <div className="sticky top-[84px] border-r border-sand-2 pr-6">
              <p
                className="text-[0.6875rem] font-bold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                On This Page
              </p>
              <div className="flex flex-col gap-1">
                {TOC_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`text-[0.875rem] py-1.5 px-3 rounded transition-colors ${
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
            {/* ── WHAT IT IS ── */}
            <div id="what-it-is" className="scroll-mt-24 mb-20">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                The basics
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Three terms. Most people only know one of them.
              </h2>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Pre-qualified, pre-approved, and approved get used
                interchangeably. They are not the same thing. Here is exactly
                what each means and why the difference matters when you are
                making an offer on a home.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {/* Stage 1 */}
                <div className="bg-white border border-sand-2 rounded-xl p-5">
                  <span
                    className="text-[0.625rem] font-bold text-slate uppercase tracking-widest"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    Stage 1
                  </span>
                  <h3
                    className="font-bold text-navy text-[0.9375rem] mt-2 mb-3"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    Pre-Qualified
                  </h3>
                  <p
                    className="text-[0.8125rem] text-navy-2 leading-relaxed"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    A rough estimate based on numbers you provide. No documents
                    submitted, no credit check run. Takes a few minutes. Useful
                    for getting a ballpark. Not useful for making offers.
                  </p>
                </div>

                {/* Stage 2 - Featured */}
                <div className="bg-coral/5 border-2 border-coral rounded-xl p-5 relative">
                  <span
                    className="absolute top-3 right-3 text-[0.5625rem] font-bold text-white bg-coral px-2 py-0.5 rounded-full uppercase tracking-widest"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    What you want
                  </span>
                  <span
                    className="text-[0.625rem] font-bold text-coral uppercase tracking-widest"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    Stage 2
                  </span>
                  <h3
                    className="font-bold text-navy text-[0.9375rem] mt-2 mb-3"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    Pre-Approved
                  </h3>
                  <p
                    className="text-[0.8125rem] text-navy-2 leading-relaxed"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    Your income, credit, and debts are verified by a lender.
                    You receive a written commitment for a specific amount with a
                    rate held up to 120 days. This is what makes sellers take you
                    seriously.
                  </p>
                </div>

                {/* Stage 3 */}
                <div className="bg-white border border-sand-2 rounded-xl p-5">
                  <span
                    className="text-[0.625rem] font-bold text-slate uppercase tracking-widest"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    Stage 3
                  </span>
                  <h3
                    className="font-bold text-navy text-[0.9375rem] mt-2 mb-3"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    Approved
                  </h3>
                  <p
                    className="text-[0.8125rem] text-navy-2 leading-relaxed"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    Full approval happens after you make an offer on a specific
                    home. The lender verifies the property, re-confirms your
                    financials, and issues the final mortgage commitment.
                  </p>
                </div>
              </div>

              <div className="bg-sand rounded-xl p-5">
                <p
                  className="text-[0.8125rem] text-navy-2 leading-relaxed"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Most lenders use pre-qualified and pre-approved
                  interchangeably. What matters is whether your income and credit
                  have actually been verified. That is the version worth having
                  before you start making offers on homes.
                </p>
              </div>
            </div>

            {/* ── WHY IT MATTERS ── */}
            <div id="why-it-matters" className="scroll-mt-24 mb-20">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                The real value
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-8"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Three things a pre-approval does that most buyers don't realize.
              </h2>

              <div className="space-y-4">
                {[
                  {
                    num: "01",
                    title:
                      "It gives you your real budget before you fall in love with the wrong home",
                    body: "Most buyers overestimate what they qualify for by $50,000 to $100,000. Finding out at offer time is painful. Finding out before you start looking means you spend your Saturdays seeing homes you can actually buy, not ones that will break your heart at approval.",
                  },
                  {
                    num: "02",
                    title:
                      "Right now, buyers have leverage in Toronto. A pre-approval helps you use it.",
                    body: "The market has shifted. Sellers are negotiating. Conditions are back. Days on market are longer than they were two years ago. A pre-approved buyer can move quickly and with confidence when the right home comes up, while unverified buyers are still scrambling to get their paperwork together.",
                  },
                  {
                    num: "03",
                    title:
                      "It protects you if rates move. In either direction.",
                    body: "A 120-day rate hold locks in today's rate if rates rise before you close. If rates drop, you get the lower rate automatically. It is the only financial instrument where you genuinely cannot lose by getting it.",
                  },
                ].map((item) => (
                  <div
                    key={item.num}
                    className="bg-navy rounded-xl p-6 flex gap-5"
                  >
                    <span
                      className="text-[2.5rem] font-bold text-coral/20 leading-none shrink-0 w-14"
                      style={{ fontFamily: "var(--font-spectral)" }}
                    >
                      {item.num}
                    </span>
                    <div>
                      <h3
                        className="font-bold text-sand text-[1rem] mb-2"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-[0.875rem] text-slate leading-relaxed"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── BROKER VS BANK ── */}
            <div id="broker-vs-bank" className="scroll-mt-24 mb-20">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                The honest comparison
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Your bank will pre-approve you. Here is what they won't tell
                you.
              </h2>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                When you go to your bank, they show you one set of products, one
                rate sheet, and one set of approval criteria. That is the entire
                universe of options they will ever offer you.
              </p>

              <div className="overflow-x-auto mb-6">
                <table
                  className="w-full text-left text-[0.8125rem]"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  <thead>
                    <tr className="bg-navy text-sand">
                      <th className="py-3 px-4 font-semibold rounded-tl-lg">
                        What you are comparing
                      </th>
                      <th className="py-3 px-4 font-semibold">
                        Going to your bank
                      </th>
                      <th className="py-3 px-4 font-semibold text-coral rounded-tr-lg">
                        Working with Jesse
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-navy-2">
                    {[
                      ["Lenders assessed", "1", "50+ lenders compared"],
                      ["Rates available", "Posted rates", "Wholesale rates, often lower"],
                      ["If you don't fit their criteria", "Declined", "Matched to the right lender"],
                      ["Credit inquiries", "One per bank you visit", "One inquiry covers all lenders"],
                      ["Whose interests they serve", "The bank's", "Legally required to serve yours"],
                      ["Cost to you", "None", "None. Lender pays the commission."],
                    ].map(([label, bank, jesse], i) => (
                      <tr key={i} className="border-b border-sand-2">
                        <td className="py-3 px-4 font-semibold text-navy">
                          {label}
                        </td>
                        <td className="py-3 px-4">{bank}</td>
                        <td className="py-3 px-4 font-semibold text-emerald-600">
                          {jesse}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-coral/10 border border-coral/20 rounded-lg p-4">
                <p
                  className="text-[0.8125rem] text-coral font-semibold leading-relaxed"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Working with a broker doesn't mean you won't end up with a
                  bank mortgage. TD, Scotiabank, and BMO all work extensively
                  through brokers. It just means you compared them against the
                  full market before deciding.
                </p>
              </div>
            </div>

            {/* ── Mid-page CTA ── */}
            <div className="bg-coral/5 border border-coral/20 rounded-xl p-8 text-center my-12">
              <p
                className="text-[1.125rem] md:text-[1.25rem] font-bold text-navy mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Ready to get pre-approved?
              </p>
              <button
                onClick={handleBookCall}
                className="bg-coral text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-coral-dark transition-colors cursor-pointer text-[0.9375rem]"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Book a Pre-Approval Call
              </button>
            </div>

            {/* ── WHAT YOU NEED ── */}
            <div id="what-you-need" className="scroll-mt-24 mb-20">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Document checklist
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Here's what to prepare for smooth sailing.
              </h2>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Getting pre-approved takes 24-48 hours when your documents are
                in order. Here is everything Jesse needs depending on your
                employment situation.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-sand-2 rounded-xl p-5">
                  <h3
                    className="font-bold text-navy text-[0.9375rem] pb-3 mb-4 border-b-2 border-coral"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    Salaried or Hourly
                  </h3>
                  <ul className="space-y-2.5">
                    {[
                      "Government-issued photo ID",
                      "Two most recent pay stubs",
                      "Most recent T4 or Notice of Assessment",
                      "90-day bank statement showing down payment",
                      "List of current monthly debts",
                      "Employment letter (position, salary, start date)",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[0.8125rem] text-navy-2 leading-relaxed"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        <span className="text-emerald-500 mt-0.5 shrink-0">
                          &#10003;
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-sand-2 rounded-xl p-5">
                  <h3
                    className="font-bold text-navy text-[0.9375rem] pb-3 mb-4 border-b-2 border-coral"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    Self-Employed / Incorporated
                  </h3>
                  <ul className="space-y-2.5">
                    {[
                      "Government-issued photo ID",
                      "Two years of T1 Generals",
                      "Two years of Notices of Assessment from CRA",
                      "Proof of business ownership or registration",
                      "Two years of business financial statements",
                      "90-day bank statement showing down payment",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[0.8125rem] text-navy-2 leading-relaxed"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        <span className="text-emerald-500 mt-0.5 shrink-0">
                          &#10003;
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-sand rounded-xl p-5">
                <p
                  className="text-[0.875rem] text-navy-2 leading-relaxed"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Don't have everything ready? That is fine. Start with the
                  call. Jesse will tell you exactly what is needed for your
                  specific situation. Most pre-approvals begin with a 15-minute
                  conversation, not a stack of paperwork.
                </p>
                <button
                  onClick={handleBookCall}
                  className="text-coral text-[0.875rem] font-semibold hover:underline mt-3 cursor-pointer"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Book a Pre-Approval Call
                </button>
              </div>
            </div>

            {/* ── THE PROCESS ── */}
            <div id="the-process" className="scroll-mt-24 mb-20">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Step by step
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                What actually happens.
              </h2>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                No mystery. No waiting and wondering where your file is. Here is
                the complete process from first call to pre-approval letter in
                hand.
              </p>

              <div className="relative">
                <div className="absolute left-[1.125rem] top-6 bottom-6 w-0.5 bg-gradient-to-b from-coral to-sand-2" />
                <div className="space-y-6">
                  {STEPS.map((step, i) => (
                    <div key={i} className="relative pl-12">
                      <div className="absolute left-0 top-1 w-9 h-9 rounded-full bg-navy flex items-center justify-center">
                        <span
                          className="text-[0.75rem] font-bold text-coral"
                          style={{ fontFamily: "var(--font-jakarta)" }}
                        >
                          {i + 1}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3
                            className="font-bold text-navy text-[1rem]"
                            style={{ fontFamily: "var(--font-jakarta)" }}
                          >
                            {step.title}
                          </h3>
                          <span
                            className="text-[0.6875rem] font-semibold text-slate bg-sand px-2.5 py-0.5 rounded-full"
                            style={{ fontFamily: "var(--font-jakarta)" }}
                          >
                            {step.timeline}
                          </span>
                        </div>
                        <p
                          className="text-[0.875rem] text-navy-2 leading-relaxed"
                          style={{ fontFamily: "var(--font-jakarta)" }}
                        >
                          {step.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── PROTECT IT ── */}
            <div id="protect-it" className="scroll-mt-24 mb-20">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                The rules
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Your pre-approval is solid. Here is how to keep it that way.
              </h2>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Most people don't know that what they do between pre-approval
                and closing can void everything. A new car payment added after
                approval has killed deals. Not slowed them down. Ended them
                completely.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                  <h4
                    className="font-bold text-emerald-700 text-[0.875rem] mb-4"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    &#10003; Keep doing this
                  </h4>
                  <ul className="space-y-2.5">
                    {[
                      "Keep your job and income stable",
                      "Pay every bill on time, every time",
                      "Keep credit card balances under 30%",
                      "Document where your down payment came from",
                      "Call Jesse before any major financial decision",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[0.8125rem] text-navy-2 leading-relaxed"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        <span className="text-emerald-500 mt-0.5 shrink-0">
                          &#10003;
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50 border border-coral/30 rounded-xl p-5">
                  <h4
                    className="font-bold text-coral text-[0.875rem] mb-4"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    &#10007; Avoid this
                  </h4>
                  <ul className="space-y-2.5">
                    {[
                      "Finance a car or any large purchase",
                      "Open new credit cards or lines of credit",
                      "Co-sign a loan for anyone",
                      "Make large cash deposits without documentation",
                      "Change jobs without telling Jesse first",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[0.8125rem] text-navy-2 leading-relaxed"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        <span className="text-coral mt-0.5 shrink-0">
                          &#10007;
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* ── CALCULATOR ── */}
            <div id="calculator" className="scroll-mt-24 mb-20">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Affordability check
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Run your numbers before we talk.
              </h2>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Move the sliders to get a real sense of your range. Ontario
                rules, stress-tested, Canadian semi-annual compounding.
              </p>

              <AffordabilityCalculator onBookCall={handleBookCall} />

              <div className="bg-coral/10 border border-coral/20 rounded-xl p-5 mt-6">
                <p
                  className="text-[0.875rem] font-semibold text-navy mb-2"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  This is a high-level starting point.
                </p>
                <p
                  className="text-[0.8125rem] text-navy-2 leading-relaxed"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  These numbers use standard ratios and assumptions. Your actual
                  approval depends on your full picture: credit score, income
                  type, lender selection, property location, and more. When you
                  speak with Jesse, he will give you a crystal-clear number with
                  real options to choose from, so you leave the call empowered to
                  make a decision, not just with a figure.
                </p>
              </div>
            </div>

            {/* ── FAQ ── */}
            <div id="faq" className="scroll-mt-24 mb-10">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Common questions
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-8"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Things people always ask.
              </h2>

              <div className="space-y-3">
                {FAQ_ITEMS.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div
                      key={i}
                      className="border border-sand-2 bg-white rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() =>
                          setOpenFaq(isOpen ? null : i)
                        }
                        className="w-full text-left p-5 cursor-pointer flex items-center justify-between gap-4"
                        aria-expanded={isOpen}
                      >
                        <p
                          className="font-bold text-navy text-[0.9375rem]"
                          style={{ fontFamily: "var(--font-jakarta)" }}
                        >
                          {faq.q}
                        </p>
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
                      </button>
                      <div
                        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                        style={{
                          gridTemplateRows: isOpen ? "1fr" : "0fr",
                        }}
                      >
                        <div className="overflow-hidden">
                          <div className="px-5 pb-5">
                            <p
                              className="text-[0.875rem] text-navy-2 leading-relaxed"
                              style={{ fontFamily: "var(--font-jakarta)" }}
                            >
                              {faq.a}
                            </p>
                          </div>
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

      {/* ── FINAL CTA ── */}
      <section className="bg-navy py-20 px-6 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, #E8705A 0%, transparent 70%)",
          }}
        />
        <div className="max-w-2xl mx-auto text-center relative">
          <h2
            className="text-[2rem] sm:text-[2.5rem] font-bold text-sand leading-tight mb-4"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Ready to find out where you stand?
          </h2>
          <p
            className="text-[1rem] text-slate leading-relaxed mb-8"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            A pre-approval costs nothing, takes 24-48 hours, and puts you in the
            best possible position when the right home comes up. Jesse personally
            takes every call.
          </p>
          <button
            onClick={handleBookCall}
            className="bg-coral text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-coral-dark transition-colors cursor-pointer text-[0.9375rem] mb-3"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Book a Pre-Approval Call
          </button>
          <p
            className="text-[0.8125rem] text-slate"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            No cost. No obligation. No jargon.
          </p>
        </div>
      </section>
    </>
  );
}

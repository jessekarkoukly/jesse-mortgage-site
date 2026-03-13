"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import BrokerVsBank from "@/components/BrokerVsBank";

/* ── TOC sections ── */
const TOC_ITEMS = [
  { id: "how-to-qualify", label: "How to qualify" },
  { id: "your-credit", label: "Your credit score" },
  { id: "down-payment", label: "Down payment math" },
  { id: "programs", label: "First-time buyer programs" },
  { id: "the-process", label: "Finding the right home" },
  { id: "mistakes", label: "Common mistakes" },
  { id: "faq", label: "FAQ" },
];

/* ── Savings card rows ── */
const SAVINGS_ROWS = [
  { program: "FHSA (tax savings + growth)", amount: "Up to $40,000" },
  { program: "Home Buyers' Plan (RRSP)", amount: "Up to $60,000" },
  { program: "Ontario LTT Rebate", amount: "Up to $4,000" },
  { program: "Toronto LTT Rebate", amount: "Up to $4,475" },
  { program: "First-Time Buyer Tax Credit", amount: "$1,500" },
  { program: "30-yr amort (buying power)", amount: "+$60-80k" },
];

/* ── (readiness items removed — replaced by Four Pillars) ── */

/* ── Programs ── */
const PROGRAMS = [
  {
    tag: "Most powerful",
    featured: true,
    title: "First Home Savings Account (FHSA)",
    amount: "Up to $40,000",
    body: "The FHSA is the best savings vehicle ever created for first-time buyers. It combines the best features of an RRSP and a TFSA simultaneously.",
    bullets: [
      "Contribute up to $8,000 per year, $40,000 lifetime",
      "Contributions are tax-deductible, like an RRSP",
      "Growth is tax-free, like a TFSA",
      "Withdrawals for your first home purchase are completely tax-free",
      "Unused contribution room carries forward (up to $8,000)",
      "No repayment required. It is yours to keep.",
      "Open one now even if you are years away. The clock is ticking on contribution room.",
    ],
  },
  {
    tag: "Home Buyers' Plan",
    featured: false,
    title: "RRSP Withdrawal (HBP)",
    amount: "Up to $60,000",
    body: "If you have existing RRSP savings, the HBP lets you withdraw up to $60,000 per person tax-free for your first home purchase. Remember: you are borrowing from your future retirement and must repay over 15 years.",
    bullets: [
      "$60,000 per person, $120,000 per couple",
      "Must repay 1/15th per year starting the second year after withdrawal",
      "Increased from $35,000 in April 2024",
      "Can be combined with the FHSA for maximum impact",
    ],
  },
  {
    tag: "Land Transfer Tax",
    featured: false,
    title: "Ontario + Toronto LTT Rebates",
    amount: "Up to $8,475",
    body: "Ontario charges a land transfer tax on every home purchase. First-time buyers get a rebate of up to $4,000. If you are buying in Toronto, the city charges its own additional LTT, and first-time buyers get a rebate on that too, up to $4,475.",
    bullets: [
      "Ontario rebate: up to $4,000. Covers homes up to $368,000 fully, partial above that.",
      "Toronto rebate: up to $4,475. Only if buying within Toronto city limits.",
      "Must never have owned a home anywhere in the world to qualify.",
      "Applied automatically at closing through your lawyer.",
    ],
    link: { href: "/calculators/land-transfer-tax", label: "Calculate Your Land Transfer Tax" },
  },
  {
    tag: "Federal Tax Credit",
    featured: false,
    title: "First-Time Home Buyers' Tax Credit",
    amount: "$1,500",
    body: "The year you buy, you get $1,500 back on your taxes. You claim it when you file your return. If you are buying with a partner, you can split it between you.",
    bullets: [],
  },
  {
    tag: "Buying Power",
    featured: false,
    title: "30-Year Amortization",
    amount: "+$60-80k",
    body: "As of December 15, 2024, 30-year amortizations are available to all first-time buyers (any property type, not just new builds), plus anyone buying a new build. A 0.20% insurance premium surcharge applies. The longer amortization lowers your monthly payment, which improves your GDS ratio and effectively increases what you can qualify for.",
    bullets: [
      "Applies to insured mortgages (less than 20% down)",
      "0.20% additional CMHC premium surcharge applies",
      "Reduces your monthly payment by roughly $200-$350 per $500k borrowed",
      "Increases maximum qualification by approximately $60,000-$80,000",
    ],
  },
];

/* ── Offer to keys steps ── */
const OFFER_TO_KEYS = [
  { title: "Offer accepted", timeline: "Day 1", body: "Your conditions period begins. Your deposit cheque is delivered to the listing brokerage." },
  { title: "Conditions period", timeline: "Days 1-7", body: "This is your safety net. Typical conditions include financing approval, home inspection, and property disclosure review." },
  { title: "Home inspection", timeline: "Days 3-5", body: "Hire a certified inspector ($400 to $600). They check structure, electrical, plumbing, roof, and more. Attend the inspection if you can." },
  { title: "Financing confirmed", timeline: "Days 5-7", body: "Your broker submits the full application. The lender reviews the property and confirms your approval." },
  { title: "Conditions removed", timeline: "Day 7", body: "You waive conditions and the sale becomes firm. Backing out after this means losing your deposit." },
  { title: "Lawyer prepares closing", timeline: "Weeks 2-4", body: "Your lawyer conducts a title search, prepares transfer documents, coordinates with the lender, and arranges title insurance." },
  { title: "Final walkthrough", timeline: "1-3 days before", body: "Verify the property is in the condition agreed upon. Check that nothing has been removed or damaged." },
  { title: "Keys are yours", timeline: "Closing day", body: "Funds transfer from lender to seller through lawyers. You pick up the keys and become a homeowner." },
];

/* ── Mistakes ── */
const MISTAKES = [
  {
    title: "Waiting until they have 20% down",
    body: "The cost of CMHC insurance is almost always less than years of rent paid while waiting. Run the real numbers before you decide to wait.",
  },
  {
    title: "Going to their bank first",
    body: "One lender, one rate sheet, one set of criteria. If you don't fit, you're declined. A broker assesses 50+ lenders and finds the right match, often at a better rate.",
  },
  {
    title: "Not opening an FHSA years before buying",
    body: "Every year you wait is $8,000 in contribution room lost forever. You can open an FHSA today even if you are not buying for three years. The clock starts immediately.",
  },
  {
    title: "Financing a car after getting pre-approved",
    body: "A new car payment changes your TDS ratio. It has ended deals between pre-approval and closing. Do not finance anything major until the keys are in your hand.",
  },
  {
    title: "Spending the maximum approval amount",
    body: "Your approval is a ceiling. The right number is the payment that fits your actual life, including the unexpected expenses that come with owning a home.",
  },
  {
    title: "Focusing only on the interest rate",
    body: "Prepayment privileges, portability, and penalty type matter just as much. A slightly higher rate with flexible prepayment terms can save you significantly more over the term.",
  },
];

/* ── FAQ ── */
const FAQ_ITEMS = [
  /* ── Down payment ── */
  {
    q: "My parents want to help with the down payment. How does that actually work?",
    a: "Gift funds from immediate family members are acceptable as a down payment source for most lenders. You will need a signed gift letter confirming the funds are a gift and not a loan, plus 90 days of bank statements showing the funds.",
  },
  /* ── FHSA & programs ── */
  {
    q: "What is the First Home Savings Account (FHSA)?",
    a: "The FHSA lets you save up to $8,000 per year, to a lifetime max of $40,000, in a tax-sheltered account specifically for buying your first home. Contributions are tax-deductible like an RRSP, and withdrawals for a qualifying home purchase are completely tax-free. Unlike the Home Buyers' Plan, there is no repayment requirement.",
  },
  {
    q: "Can I use the FHSA and the Home Buyers' Plan at the same time?",
    a: "Yes, and this is one of the most powerful moves available to first-time buyers. A couple using both can access up to $200,000 combined ($40k FHSA each plus $60k HBP each). The FHSA has no repayment requirement. The HBP must be repaid over 15 years.",
  },
  {
    q: "Am I eligible for first-time buyer programs if my partner has owned before?",
    a: "Unfortunately, no. If your partner is on the title and mortgage, their ownership history applies to the application. This means programs like the FHSA withdrawal, the Home Buyers' Plan, and the land transfer tax rebate would not be available to you as a couple. It is worth discussing your specific situation with Jesse to understand your options.",
  },
  /* ── Qualifying ── */
  {
    q: "What credit score do I need to buy a home in Canada?",
    a: "Most prime lenders want a score of 680 or higher. Between 620 and 679, you can still qualify but may see slightly higher rates. Below 620, alternative lenders are an option with higher rates and larger down payment requirements. The score your bank app shows you is often different from the one lenders pull directly from Equifax or TransUnion.",
  },
  {
    q: "What is the mortgage stress test?",
    a: "Before approving your mortgage, every federally regulated lender must confirm you can afford payments at a rate higher than the one you are actually getting. The test rate is the greater of 5.25% or your contract rate plus 2%. This means you qualify at a higher payment than you will actually make, which is designed to protect you if rates rise.",
  },
  {
    q: "Can I buy a home if I have been self-employed for less than 2 years?",
    a: "It is harder but not impossible. Most prime lenders require two years of tax returns to verify self-employed income. If you have less than two years, some alternative lenders and credit unions will work with you, though rates may be higher and a larger down payment is often required. Talk to Jesse early so you know exactly where you stand.",
  },
  {
    q: "Thinking of changing jobs? Here is how it may affect your mortgage.",
    a: "If you are moving to a similar role in the same industry at a similar salary, it is usually straightforward. But there are factors to consider. You will need to have passed your probation period and collected your first paycheque. If you currently earn commission, your existing employer's track record can be used on your application. Switching jobs means starting that history over with projected income, which is harder for lenders to work with. If you can, the best move is to wait until you close on your new home before switching jobs.",
  },
];

/* ────────────────────────────────────────── */

export default function FirstTimeBuyerContent() {
  const [activeSection, setActiveSection] = useState("how-to-qualify");
  const [openProgram, setOpenProgram] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [stressTestOpen, setStressTestOpen] = useState(false);
  const [creditOpen, setCreditOpen] = useState(false);
  const [homePrice, setHomePrice] = useState(800000);
  const [owningCostsOpen, setOwningCostsOpen] = useState(false);
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
      {/* ── HERO ── */}
      <section className="bg-navy pt-28 pb-20 px-6 lg:pt-32 lg:pb-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_380px] gap-12 items-start">
          {/* Left */}
          <div className="pt-4">
            <span
              className="inline-block border border-coral text-coral text-[0.6875rem] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              First-Time Home Buyers
            </span>
            <h1
              className="text-[2.5rem] sm:text-[3rem] lg:text-[3.25rem] font-bold text-sand leading-[1.1] mb-6"
              style={{ fontFamily: "var(--font-spectral)" }}
            >
              The most prepared buyers make the best{" "}
              <span className="text-coral">decisions.</span>
            </h1>
            <p
              className="text-[1.0625rem] text-slate leading-relaxed max-w-lg mb-8"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Buying your first home is exciting and nerve-wracking at the
              same time. This guide is a good place to start. It will help you
              understand the basics so you go in with clear eyes and find the
              right home for you and your family.
            </p>
            <button
              onClick={handleBookCall}
              className="bg-coral text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-coral-dark transition-colors cursor-pointer text-[0.9375rem] mb-8"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Book an Intro Call
            </button>
            <div className="flex flex-wrap gap-5">
              {[
                "No cost to you",
                "50+ lenders compared",
                "All programs explained",
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

          {/* Right: Savings Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <p
              className="text-[0.625rem] font-bold text-slate uppercase tracking-widest mb-2"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Programs Available to You
            </p>
            <p
              className="text-[0.9375rem] font-bold text-navy mb-5"
              style={{ fontFamily: "var(--font-spectral)" }}
            >
              Combined first-time buyer savings in Ontario
            </p>
            <div className="space-y-0">
              {SAVINGS_ROWS.map((row, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 border-b border-sand-2"
                >
                  <span
                    className="text-[0.8125rem] text-navy-2"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    {row.program}
                  </span>
                  <span
                    className="text-[0.8125rem] font-semibold text-emerald-600 shrink-0 ml-4"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    {row.amount}
                  </span>
                </div>
              ))}
            </div>
            <div className="bg-navy rounded-lg mt-4 px-4 py-3 flex items-center justify-between">
              <span
                className="text-[0.8125rem] font-semibold text-sand"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Total potential advantage
              </span>
              <span
                className="text-[1.25rem] font-bold text-coral"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                $100,000+
              </span>
            </div>
            <p
              className="text-[0.6875rem] text-slate mt-3 leading-relaxed"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Per couple using all available programs. Exact amounts depend on
              purchase price, savings, and whether you are buying in Toronto or
              elsewhere in Ontario.
            </p>
          </div>
        </div>
      </section>

      {/* ── TOC + CONTENT LAYOUT ── */}
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
            {/* ── HOW TO QUALIFY — FOUR PILLARS ── */}
            <div id="how-to-qualify" className="scroll-mt-24 mb-16 pb-16 border-b border-sand-2">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                The real answer
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                How do you actually qualify for a mortgage<span className="text-coral">?</span>
              </h2>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-3"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                The most common question Jesse gets from first-time buyers is some version of this:
              </p>
              <p
                className="text-[1.125rem] italic text-navy font-semibold mb-6 pl-4 border-l-3 border-coral"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                &ldquo;I have no idea if I can even qualify. Where do I start?&rdquo;
              </p>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-10"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Qualifying for a mortgage comes down to five things. Lenders look at all of them
                together. Understanding each one tells you exactly where you stand and what, if
                anything, needs to change.
              </p>

              {/* ── PILLAR 1: DOWN PAYMENT ── */}
              <div className="bg-white border border-sand-2 rounded-xl p-5 sm:p-6 mb-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center shrink-0">
                    <span className="text-[0.75rem] font-bold text-white" style={{ fontFamily: "var(--font-jakarta)" }}>1</span>
                  </div>
                  <div>
                    <p className="font-bold text-navy text-[1rem]" style={{ fontFamily: "var(--font-jakarta)" }}>Your Down Payment</p>
                    <p className="text-[0.875rem] text-slate" style={{ fontFamily: "var(--font-jakarta)" }}>How much are you bringing to the table?</p>
                  </div>
                </div>
                <p className="text-[1rem] text-navy-2 leading-relaxed mb-4" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Your down payment is the portion of the price you pay upfront. The rest becomes your mortgage. In Canada, the minimum depends on the price of the home.
                </p>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-left text-[0.875rem]" style={{ fontFamily: "var(--font-jakarta)" }}>
                    <thead>
                      <tr className="bg-navy text-sand">
                        <th className="py-2.5 px-4 font-semibold rounded-tl-lg">Home Price</th>
                        <th className="py-2.5 px-4 font-semibold rounded-tr-lg">Minimum Down</th>
                      </tr>
                    </thead>
                    <tbody className="text-navy-2">
                      <tr className="border-b border-sand-2"><td className="py-2.5 px-4">Up to $500,000</td><td className="py-2.5 px-4">5%</td></tr>
                      <tr className="border-b border-sand-2 bg-sand/50"><td className="py-2.5 px-4">$500,001 to $1,499,999</td><td className="py-2.5 px-4">5% on first $500k, 10% on the rest</td></tr>
                      <tr><td className="py-2.5 px-4">$1,500,000+</td><td className="py-2.5 px-4 text-coral font-semibold">20% minimum</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-[0.9375rem] text-navy-2 leading-relaxed mb-3" style={{ fontFamily: "var(--font-jakarta)" }}>
                  <span className="font-semibold text-navy">In real numbers: </span>
                  $600,000 home = $35,000 minimum. $800,000 home = $55,000. $1,000,000 home = $75,000.
                </p>
                <p className="text-[0.9375rem] text-navy-2 leading-relaxed mb-3" style={{ fontFamily: "var(--font-jakarta)" }}>
                  <span className="font-semibold text-navy">Where it can come from: </span>
                  Your savings, FHSA withdrawal (tax-free, no repayment), RRSP via the Home Buyers&#39; Plan (up to $60,000), or a gift from immediate family.
                </p>
              </div>

              {/* ── PILLAR 2: INCOME ── */}
              <div className="bg-white border border-sand-2 rounded-xl p-5 sm:p-6 mb-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center shrink-0">
                    <span className="text-[0.75rem] font-bold text-white" style={{ fontFamily: "var(--font-jakarta)" }}>2</span>
                  </div>
                  <div>
                    <p className="font-bold text-navy text-[1rem]" style={{ fontFamily: "var(--font-jakarta)" }}>Your Income</p>
                    <p className="text-[0.875rem] text-slate" style={{ fontFamily: "var(--font-jakarta)" }}>Can you afford the monthly payment?</p>
                  </div>
                </div>
                <p className="text-[1rem] text-navy-2 leading-relaxed mb-4" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Lenders look at your gross income and use it to calculate the maximum mortgage payment you can carry.
                </p>
                <div className="bg-sand rounded-lg p-4 mb-4">
                  <p className="text-[0.9375rem] text-navy font-semibold leading-relaxed" style={{ fontFamily: "var(--font-jakarta)" }}>
                    For every $100k of income you will get roughly $500k in mortgage.
                  </p>
                </div>
                <p className="text-[0.875rem] font-semibold text-navy mb-3" style={{ fontFamily: "var(--font-jakarta)" }}>But income type matters:</p>
                <ul className="space-y-3 text-[0.9375rem] text-navy-2 leading-relaxed" style={{ fontFamily: "var(--font-jakarta)" }}>
                  <li><span className="font-semibold text-navy">Salaried:</span> Straightforward. Your T4 and pay stub tell the whole story.</li>
                  <li>
                    <span className="font-semibold text-navy">Salaried + Commission:</span> Base salary is straightforward. Commission income typically requires a two-year average to be used in your application. The longer and more consistent the track record, the more a lender will count.
                    <details className="mt-2 ml-1">
                      <summary className="text-[0.8125rem] font-semibold text-coral cursor-pointer">What about RSUs and stock compensation?</summary>
                      <p className="text-[0.9375rem] text-navy-2 leading-relaxed mt-2 pl-3 border-l-2 border-sand-2">
                        First, check if RSUs or stock compensation appear on your T4. If they do, lenders can typically count that income. If they do not, most lenders will not include them in your qualification. Some alternative lenders may consider them with a two-year vesting and liquidation history. Worth flagging early if stock compensation is a significant part of your total pay.
                      </p>
                    </details>
                  </li>
                  <li><span className="font-semibold text-navy">Self-employed:</span> Two years of T1 Generals and Notices of Assessment. The income lenders use is your net income after write-offs, which is often lower than what you would think of as your income. This is plannable. It just needs to be talked through early.</li>
                  <li><span className="font-semibold text-navy">Hourly or part-time:</span> Lenders average your last two years. Consistent hours help.</li>
                  <li><span className="font-semibold text-navy">Contract or freelance:</span> Two years of tax returns. If income varies year to year, they use the average.</li>
                </ul>
              </div>

              {/* ── PILLAR 3: DEBT ── */}
              <div className="bg-white border border-sand-2 rounded-xl p-5 sm:p-6 mb-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center shrink-0">
                    <span className="text-[0.75rem] font-bold text-white" style={{ fontFamily: "var(--font-jakarta)" }}>3</span>
                  </div>
                  <div>
                    <p className="font-bold text-navy text-[1rem]" style={{ fontFamily: "var(--font-jakarta)" }}>Your Debt</p>
                    <p className="text-[0.875rem] text-slate" style={{ fontFamily: "var(--font-jakarta)" }}>Your other payments reduce how much mortgage you can carry.</p>
                  </div>
                </div>
                <p className="text-[1rem] text-navy-2 leading-relaxed mb-4" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Every monthly debt payment you have reduces your maximum mortgage amount. Car loan, student loan, credit card minimums. This surprises a lot of first-time buyers.
                </p>
                <p className="text-[0.9375rem] text-navy-2 leading-relaxed mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Lenders use two ratios to measure this.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div className="bg-sand rounded-lg p-4">
                    <p className="text-[0.8125rem] font-semibold text-navy mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>Housing costs only <span className="text-slate font-normal">(GDS)</span></p>
                    <p className="text-[0.9375rem] text-navy-2 leading-relaxed" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Mortgage + property tax + heat + condo fees must stay under roughly 39% of your gross monthly income.
                    </p>
                  </div>
                  <div className="bg-sand rounded-lg p-4">
                    <p className="text-[0.8125rem] font-semibold text-navy mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>All debts combined <span className="text-slate font-normal">(TDS)</span></p>
                    <p className="text-[0.9375rem] text-navy-2 leading-relaxed" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Everything above, plus all your other monthly debt payments, must stay under 44% of your gross monthly income.
                    </p>
                  </div>
                </div>
                <p className="text-[0.9375rem] text-navy-2 leading-relaxed" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Paying down debt before applying directly increases your buying power, dollar for dollar. Paying down revolving debt (credit cards) helps more per dollar than installment debt (car loans). Jesse will show you exactly where to focus first.
                </p>
              </div>

              {/* ── PILLAR 4: CREDIT SCORE ── */}
              <div className="bg-white border border-sand-2 rounded-xl p-5 sm:p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center shrink-0">
                    <span className="text-[0.75rem] font-bold text-white" style={{ fontFamily: "var(--font-jakarta)" }}>4</span>
                  </div>
                  <div>
                    <p className="font-bold text-navy text-[1rem]" style={{ fontFamily: "var(--font-jakarta)" }}>Your Credit Score</p>
                    <p className="text-[0.875rem] text-slate" style={{ fontFamily: "var(--font-jakarta)" }}>It affects whether you qualify and what rate you get. The higher the number, the lower the risk, and the better the rate.</p>
                  </div>
                </div>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-left text-[0.875rem]" style={{ fontFamily: "var(--font-jakarta)" }}>
                    <thead>
                      <tr className="bg-navy text-sand">
                        <th className="py-2.5 px-4 font-semibold rounded-tl-lg">Score</th>
                        <th className="py-2.5 px-4 font-semibold rounded-tr-lg">What it means for your mortgage</th>
                      </tr>
                    </thead>
                    <tbody className="text-navy-2">
                      <tr className="border-b border-sand-2"><td className="py-2.5 px-4 font-semibold">720+</td><td className="py-2.5 px-4">Best available rates. No friction.</td></tr>
                      <tr className="border-b border-sand-2 bg-sand/50"><td className="py-2.5 px-4 font-semibold">680 to 719</td><td className="py-2.5 px-4">Excellent. Minor differences at most.</td></tr>
                      <tr className="border-b border-sand-2"><td className="py-2.5 px-4 font-semibold">620 to 679</td><td className="py-2.5 px-4">Qualifies with most lenders. Slightly higher rates.</td></tr>
                      <tr className="border-b border-sand-2 bg-sand/50"><td className="py-2.5 px-4 font-semibold">580 to 619</td><td className="py-2.5 px-4">Alternative lenders. Higher rates. Larger down payment often required.</td></tr>
                      <tr><td className="py-2.5 px-4 font-semibold">Under 580</td><td className="py-2.5 px-4">Needs a repair plan first. Usually 6 to 12 months to get to prime rates.</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ── PILLAR 5: STRESS TEST ── */}
              <div className="bg-white border border-sand-2 rounded-xl p-5 sm:p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center shrink-0">
                    <span className="text-[0.75rem] font-bold text-white" style={{ fontFamily: "var(--font-jakarta)" }}>5</span>
                  </div>
                  <div>
                    <p className="font-bold text-navy text-[1rem]" style={{ fontFamily: "var(--font-jakarta)" }}>The Stress Test</p>
                    <p className="text-[0.875rem] text-slate" style={{ fontFamily: "var(--font-jakarta)" }}>You must qualify at a higher rate than you will actually pay.</p>
                  </div>
                </div>
                <p className="text-[1rem] text-navy-2 leading-relaxed mb-4" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Every mortgage applicant in Canada must qualify at a rate higher than they will actually pay. This reduces what you can borrow, but it also means you are protected if rates rise. The practical effect: you qualify for roughly 20% less than you would without the stress test.
                </p>
                <button
                  onClick={() => setStressTestOpen(!stressTestOpen)}
                  className="flex items-center gap-2 text-[0.875rem] font-semibold text-coral mb-2 cursor-pointer"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {stressTestOpen ? "Hide the formula" : "See how the formula works"}
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className={`transition-transform duration-300 ${stressTestOpen ? "rotate-180" : ""}`}>
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="#E8705A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="grid transition-[grid-template-rows] duration-300 ease-in-out" style={{ gridTemplateRows: stressTestOpen ? "1fr" : "0fr" }}>
                  <div className="overflow-hidden">
                    <div className="bg-sand rounded-lg p-4 mt-2 mb-4">
                      <p className="text-[0.875rem] text-navy-2 mb-3" style={{ fontFamily: "var(--font-jakarta)" }}>
                        You qualify at whichever of these two rates is higher:
                      </p>
                      <code className="text-[0.875rem] text-navy font-semibold" style={{ fontFamily: "monospace" }}>
                        Qualifying rate = <span className="text-coral">MAX(5.25%, your contract rate + 2.00%)</span>
                      </code>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="bg-sand rounded-lg p-4">
                        <p className="text-[0.8125rem] font-semibold text-navy mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>If your rate is 4.75%</p>
                        <p className="text-[1.125rem] font-bold text-coral mb-0.5" style={{ fontFamily: "var(--font-spectral)" }}>Qualifying rate: 6.75%</p>
                        <p className="text-[0.75rem] text-slate" style={{ fontFamily: "var(--font-jakarta)" }}>4.75% + 2.00% = 6.75% (higher than floor)</p>
                      </div>
                      <div className="bg-sand rounded-lg p-4">
                        <p className="text-[0.8125rem] font-semibold text-navy mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>If your rate is 3.00%</p>
                        <p className="text-[1.125rem] font-bold text-coral mb-0.5" style={{ fontFamily: "var(--font-spectral)" }}>Qualifying rate: 5.25%</p>
                        <p className="text-[0.75rem] text-slate" style={{ fontFamily: "var(--font-jakarta)" }}>3.00% + 2.00% = 5.00% (below floor, so floor applies)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── YOUR CREDIT SCORE — DEEP DIVE ── */}
            <div id="your-credit" className="scroll-mt-24 mb-16 pb-16 border-b border-sand-2">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Credit deep dive
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                How your credit score is calculated<span className="text-coral">,</span> and how to fix it if it needs work.
              </h2>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Five factors determine your score. Each one carries a different weight.
              </p>
              <button
                onClick={() => setCreditOpen(!creditOpen)}
                className="flex items-center gap-2 text-[0.875rem] font-semibold text-coral mb-6 cursor-pointer"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {creditOpen ? "Hide details" : "See the five factors and how to improve"}
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className={`transition-transform duration-300 ${creditOpen ? "rotate-180" : ""}`}>
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="#E8705A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="grid transition-[grid-template-rows] duration-300 ease-in-out" style={{ gridTemplateRows: creditOpen ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">

              {/* Five factors */}
              <div className="space-y-4 mb-8">
                {/* Payment History */}
                <div className="bg-white border border-sand-2 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-navy text-[0.9375rem]" style={{ fontFamily: "var(--font-jakarta)" }}>Payment History</p>
                    <span className="text-coral font-bold text-[0.9375rem]" style={{ fontFamily: "var(--font-jakarta)" }}>35%</span>
                  </div>
                  <div className="w-full bg-sand-2 rounded-full h-2 mb-3"><div className="bg-coral h-2 rounded-full" style={{ width: "35%" }} /></div>
                  <p className="text-[0.9375rem] text-navy-2 leading-relaxed" style={{ fontFamily: "var(--font-jakarta)" }}>
                    Whether you pay your bills on time. The single biggest factor. One missed payment can drop your score significantly and stays on your report for six years. Set up autopay for everything.
                  </p>
                </div>

                {/* Credit Utilization */}
                <div className="bg-white border border-sand-2 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-navy text-[0.9375rem]" style={{ fontFamily: "var(--font-jakarta)" }}>Credit Utilization</p>
                    <span className="text-coral font-bold text-[0.9375rem]" style={{ fontFamily: "var(--font-jakarta)" }}>30%</span>
                  </div>
                  <div className="w-full bg-sand-2 rounded-full h-2 mb-3"><div className="bg-coral h-2 rounded-full" style={{ width: "30%" }} /></div>
                  <p className="text-[0.9375rem] text-navy-2 leading-relaxed" style={{ fontFamily: "var(--font-jakarta)" }}>
                    How much of your available credit you are using. If your credit card limit is $10,000 and your balance is $9,000, your utilization is 90%, and that is hurting your score. Keep your balance under 65% of your limit. Below 30% is even better in the months before you apply. This is one of the fastest things you can improve. Pay your balance down and your score can move in 30 to 60 days.
                  </p>
                </div>

                {/* Length of History */}
                <div className="bg-white border border-sand-2 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-navy text-[0.9375rem]" style={{ fontFamily: "var(--font-jakarta)" }}>Length of Credit History</p>
                    <span className="text-slate font-bold text-[0.9375rem]" style={{ fontFamily: "var(--font-jakarta)" }}>15%</span>
                  </div>
                  <div className="w-full bg-sand-2 rounded-full h-2 mb-3"><div className="bg-slate h-2 rounded-full" style={{ width: "15%" }} /></div>
                  <p className="text-[0.9375rem] text-navy-2 leading-relaxed" style={{ fontFamily: "var(--font-jakarta)" }}>
                    How long you have had credit. Older accounts help. This is why closing an old credit card, even one you do not use, can actually hurt your score. Keep old accounts open.
                  </p>
                </div>

                {/* Credit Mix */}
                <div className="bg-white border border-sand-2 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-navy text-[0.9375rem]" style={{ fontFamily: "var(--font-jakarta)" }}>Credit Mix</p>
                    <span className="text-slate font-bold text-[0.9375rem]" style={{ fontFamily: "var(--font-jakarta)" }}>10%</span>
                  </div>
                  <div className="w-full bg-sand-2 rounded-full h-2 mb-3"><div className="bg-slate h-2 rounded-full" style={{ width: "10%" }} /></div>
                  <p className="text-[0.9375rem] text-navy-2 leading-relaxed" style={{ fontFamily: "var(--font-jakarta)" }}>
                    Having different types of credit (credit card, car loan, line of credit) shows lenders you can manage different kinds of debt.
                  </p>
                </div>

                {/* New Credit */}
                <div className="bg-white border border-sand-2 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-navy text-[0.9375rem]" style={{ fontFamily: "var(--font-jakarta)" }}>New Credit Inquiries</p>
                    <span className="text-slate font-bold text-[0.9375rem]" style={{ fontFamily: "var(--font-jakarta)" }}>10%</span>
                  </div>
                  <div className="w-full bg-sand-2 rounded-full h-2 mb-3"><div className="bg-slate h-2 rounded-full" style={{ width: "10%" }} /></div>
                  <p className="text-[0.9375rem] text-navy-2 leading-relaxed" style={{ fontFamily: "var(--font-jakarta)" }}>
                    Every time you apply for new credit, a hard inquiry hits your report and temporarily lowers your score. In the 3 to 6 months before applying for a mortgage, do not apply for new credit cards, car loans, or lines of credit.
                  </p>
                </div>
              </div>

              {/* Repair timeline */}
              <h3
                className="text-[1.25rem] font-bold text-navy mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                If your score needs work<span className="text-coral">.</span>
              </h3>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Here is the honest timeline. These assume you are actively paying down balances, making every payment on time, and not adding new debt.
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-left text-[0.875rem]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  <thead>
                    <tr className="bg-navy text-sand">
                      <th className="py-2.5 px-4 font-semibold rounded-tl-lg">Starting Score</th>
                      <th className="py-2.5 px-4 font-semibold">Target</th>
                      <th className="py-2.5 px-4 font-semibold rounded-tr-lg">Realistic Timeline</th>
                    </tr>
                  </thead>
                  <tbody className="text-navy-2">
                    <tr className="border-b border-sand-2"><td className="py-2.5 px-4">650 to 679</td><td className="py-2.5 px-4">680+</td><td className="py-2.5 px-4 font-semibold">2 to 4 months</td></tr>
                    <tr className="border-b border-sand-2 bg-sand/50"><td className="py-2.5 px-4">620 to 649</td><td className="py-2.5 px-4">680+</td><td className="py-2.5 px-4 font-semibold">4 to 6 months</td></tr>
                    <tr className="border-b border-sand-2"><td className="py-2.5 px-4">580 to 619</td><td className="py-2.5 px-4">620+</td><td className="py-2.5 px-4 font-semibold">6 to 12 months</td></tr>
                    <tr><td className="py-2.5 px-4">Under 580</td><td className="py-2.5 px-4">580+</td><td className="py-2.5 px-4 font-semibold">12 to 18 months</td></tr>
                  </tbody>
                </table>
              </div>

              {/* Fastest moves */}
              <h3
                className="text-[1.125rem] font-bold text-navy mb-3"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                The fastest moves, in order<span className="text-coral">.</span>
              </h3>
              <ol className="space-y-2 mb-8 text-[0.9375rem] text-navy-2 leading-relaxed list-decimal list-inside" style={{ fontFamily: "var(--font-jakarta)" }}>
                <li>Keep your credit card balances under 65% of their limit</li>
                <li>Set up autopay so you never miss a payment</li>
                <li>Stop applying for new credit</li>
                <li>Dispute any errors on your report (pull your actual report from Equifax.ca, not a third-party app)</li>
              </ol>

              </div>
              </div>
            </div>

            {/* ── DOWN PAYMENT ── */}
            <div id="down-payment" className="scroll-mt-24 mb-16 pb-16 border-b border-sand-2">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Down payment math
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                How much do you actually need?
              </h2>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Canada uses a tiered minimum down payment system. The number
                depends on the purchase price. Here is exactly how it works.
              </p>

              {/* Table 1 */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-left text-[0.875rem]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  <thead>
                    <tr className="bg-navy text-sand">
                      <th className="py-3 px-4 font-semibold rounded-tl-lg">Purchase Price</th>
                      <th className="py-3 px-4 font-semibold">Minimum Down Payment</th>
                      <th className="py-3 px-4 font-semibold">Example</th>
                      <th className="py-3 px-4 font-semibold rounded-tr-lg">CMHC Insurance</th>
                    </tr>
                  </thead>
                  <tbody className="text-navy-2">
                    <tr className="border-b border-sand-2">
                      <td className="py-3 px-4">Up to $500,000</td>
                      <td className="py-3 px-4">5%</td>
                      <td className="py-3 px-4">$500k = $25,000</td>
                      <td className="py-3 px-4"><span className="text-coral font-semibold">Required</span></td>
                    </tr>
                    <tr className="border-b border-sand-2 bg-sand/50">
                      <td className="py-3 px-4 font-semibold">$500,001 to $999,999</td>
                      <td className="py-3 px-4">5% on first $500k + 10% on remainder</td>
                      <td className="py-3 px-4 font-semibold">$800k = $55,000</td>
                      <td className="py-3 px-4"><span className="text-coral font-semibold">Required</span></td>
                    </tr>
                    <tr className="border-b border-sand-2">
                      <td className="py-3 px-4">$1,000,000 to $1,499,999</td>
                      <td className="py-3 px-4">5% on first $500k + 10% on remainder</td>
                      <td className="py-3 px-4">$1.2M = $95,000</td>
                      <td className="py-3 px-4"><span className="text-coral font-semibold">Required</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">$1,500,000+</td>
                      <td className="py-3 px-4"><span className="text-coral font-semibold">20% minimum</span></td>
                      <td className="py-3 px-4">$1.5M = $300,000</td>
                      <td className="py-3 px-4">Not available</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-coral/10 border border-coral/20 rounded-lg p-4 mb-10">
                <p
                  className="text-[0.8125rem] text-coral font-semibold leading-relaxed"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  As of December 2024, the insured mortgage cap was raised from
                  $1M to $1.5M. This is a meaningful change for Toronto buyers
                  in the $1M-$1.5M range who previously needed 20% down.
                </p>
              </div>

              {/* Table 2: CMHC */}
              <h3
                className="text-[1.25rem] font-bold text-navy mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                CMHC Insurance Premiums
              </h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-left text-[0.875rem]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  <thead>
                    <tr className="bg-navy text-sand">
                      <th className="py-3 px-4 font-semibold rounded-tl-lg">Down Payment</th>
                      <th className="py-3 px-4 font-semibold">LTV Ratio</th>
                      <th className="py-3 px-4 font-semibold">Premium Rate</th>
                      <th className="py-3 px-4 font-semibold rounded-tr-lg">On $700k mortgage</th>
                    </tr>
                  </thead>
                  <tbody className="text-navy-2">
                    <tr className="border-b border-sand-2">
                      <td className="py-3 px-4">5% to 9.99%</td>
                      <td className="py-3 px-4">90.01% to 95%</td>
                      <td className="py-3 px-4"><span className="text-coral font-semibold">4.00%</span></td>
                      <td className="py-3 px-4">$28,000 added to mortgage</td>
                    </tr>
                    <tr className="border-b border-sand-2">
                      <td className="py-3 px-4">10% to 14.99%</td>
                      <td className="py-3 px-4">85.01% to 90%</td>
                      <td className="py-3 px-4">3.10%</td>
                      <td className="py-3 px-4">$21,700 added to mortgage</td>
                    </tr>
                    <tr className="border-b border-sand-2">
                      <td className="py-3 px-4">15% to 19.99%</td>
                      <td className="py-3 px-4">80.01% to 85%</td>
                      <td className="py-3 px-4">2.80%</td>
                      <td className="py-3 px-4">$19,600 added to mortgage</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">20%+</td>
                      <td className="py-3 px-4">80% or less</td>
                      <td className="py-3 px-4"><span className="text-coral font-semibold">None</span></td>
                      <td className="py-3 px-4">$0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-sand rounded-xl p-5">
                <p
                  className="text-[0.9375rem] text-navy-2 leading-relaxed"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  First-time buyers and new-build purchasers can now access 30-year amortization (as of Dec 15, 2024) with an additional 0.20% insurance surcharge. Lower monthly payments mean you qualify for more with the same income, but you do pay more in interest over the lifetime.
                </p>
              </div>

              {/* ── INLINE DOWN PAYMENT CALCULATOR ── */}
              {(() => {
                const p = homePrice;
                // Minimum down payment
                const minDown = p <= 500000
                  ? p * 0.05
                  : p <= 1499999
                    ? 25000 + (p - 500000) * 0.1
                    : p * 0.2;
                const minPct = (minDown / p) * 100;
                // 10% down
                const tenDown = p * 0.1;
                const tenPct = 10;
                // 20% down
                const twentyDown = p * 0.2;
                const twentyPct = 20;
                // CMHC premium
                const cmhc = (dp: number) => {
                  const ltv = ((p - dp) / p) * 100;
                  if (ltv <= 80) return 0;
                  if (ltv <= 85) return (p - dp) * 0.028;
                  if (ltv <= 90) return (p - dp) * 0.031;
                  return (p - dp) * 0.04;
                };
                const minCmhc = cmhc(minDown);
                const tenCmhc = cmhc(tenDown);
                const twentyCmhc = cmhc(twentyDown);
                const fmt = (n: number) => "$" + Math.round(n).toLocaleString("en-CA");

                return (
                  <div className="bg-navy rounded-xl p-5 sm:p-6 mt-6">
                    <p
                      className="text-[1rem] font-bold text-sand mb-4"
                      style={{ fontFamily: "var(--font-spectral)" }}
                    >
                      Down Payment Calculator
                    </p>
                    <div className="mb-5">
                      <p className="text-[0.875rem] text-sand mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                        Target Home Price: <span className="text-coral font-bold">{fmt(homePrice)}</span>
                      </p>
                      <input
                        type="range"
                        min={200000}
                        max={3000000}
                        step={10000}
                        value={homePrice}
                        onChange={(e) => setHomePrice(Number(e.target.value))}
                        className="w-full calc-slider accent-coral"
                        style={{ accentColor: "#E8705A" }}
                      />
                      <div className="flex justify-between text-[0.75rem] text-slate mt-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                        <span>$200K</span>
                        <span>$3M</span>
                      </div>
                    </div>

                    {p < 1500000 ? (
                      /* Under $1.5M: Minimum, 10%, 20% */
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="bg-navy-2 border border-white/10 rounded-xl p-4 text-center">
                          <p className="text-[0.75rem] text-slate mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>Minimum Down</p>
                          <p className="text-[1.5rem] font-bold text-sand mb-1" style={{ fontFamily: "var(--font-spectral)" }}>{fmt(minDown)}</p>
                          <p className="text-[0.75rem] text-slate mb-3" style={{ fontFamily: "var(--font-jakarta)" }}>{minPct.toFixed(1)}% of price</p>
                          <p className="text-[0.6875rem] text-slate" style={{ fontFamily: "var(--font-jakarta)" }}>CMHC Premium</p>
                          <p className="text-[0.875rem] font-semibold text-sand" style={{ fontFamily: "var(--font-jakarta)" }}>{fmt(minCmhc)}</p>
                          <div className="border-t border-white/10 mt-3 pt-3">
                            <p className="text-[0.6875rem] text-slate" style={{ fontFamily: "var(--font-jakarta)" }}>Total Cash Needed</p>
                            <p className="text-[1rem] font-bold text-sand" style={{ fontFamily: "var(--font-spectral)" }}>{fmt(minDown)}</p>
                          </div>
                        </div>

                        <div className="bg-navy-2 border border-white/10 rounded-xl p-4 text-center">
                          <p className="text-[0.75rem] text-slate mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>10% Down</p>
                          <p className="text-[1.5rem] font-bold text-sand mb-1" style={{ fontFamily: "var(--font-spectral)" }}>{fmt(tenDown)}</p>
                          <p className="text-[0.75rem] text-slate mb-3" style={{ fontFamily: "var(--font-jakarta)" }}>{tenPct.toFixed(1)}% of price</p>
                          <p className="text-[0.6875rem] text-slate" style={{ fontFamily: "var(--font-jakarta)" }}>CMHC Premium</p>
                          <p className="text-[0.875rem] font-semibold text-sand" style={{ fontFamily: "var(--font-jakarta)" }}>{fmt(tenCmhc)}</p>
                          <div className="border-t border-white/10 mt-3 pt-3">
                            <p className="text-[0.6875rem] text-slate" style={{ fontFamily: "var(--font-jakarta)" }}>Total Cash Needed</p>
                            <p className="text-[1rem] font-bold text-sand" style={{ fontFamily: "var(--font-spectral)" }}>{fmt(tenDown)}</p>
                          </div>
                        </div>

                        <div className="bg-navy-2 border border-coral/40 rounded-xl p-4 text-center">
                          <p className="text-[0.75rem] text-slate mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>20% Down</p>
                          <p className="text-[1.5rem] font-bold text-coral mb-1" style={{ fontFamily: "var(--font-spectral)" }}>{fmt(twentyDown)}</p>
                          <p className="text-[0.75rem] text-slate mb-3" style={{ fontFamily: "var(--font-jakarta)" }}>{twentyPct.toFixed(1)}% of price</p>
                          <p className="text-[0.6875rem] text-slate" style={{ fontFamily: "var(--font-jakarta)" }}>CMHC Premium</p>
                          <p className="text-[0.875rem] font-semibold text-coral" style={{ fontFamily: "var(--font-jakarta)" }}>None — $0</p>
                          <div className="border-t border-white/10 mt-3 pt-3">
                            <p className="text-[0.6875rem] text-slate" style={{ fontFamily: "var(--font-jakarta)" }}>Total Cash Needed</p>
                            <p className="text-[1rem] font-bold text-sand" style={{ fontFamily: "var(--font-spectral)" }}>{fmt(twentyDown)}</p>
                          </div>
                          {minCmhc > 0 && (
                            <p className="text-[0.6875rem] text-coral font-semibold mt-2 bg-coral/10 rounded-full px-3 py-1 inline-block" style={{ fontFamily: "var(--font-jakarta)" }}>
                              Save {fmt(minCmhc)} in insurance
                            </p>
                          )}
                        </div>
                      </div>
                    ) : (
                      /* $1.5M+: 20% (minimum), 25%, 30% — no insurance available */
                      <>
                        <p className="text-[0.75rem] text-coral font-semibold mb-3" style={{ fontFamily: "var(--font-jakarta)" }}>
                          Homes at $1.5M and above require a minimum 20% down. No mortgage insurance is available.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="bg-navy-2 border border-coral/40 rounded-xl p-4 text-center">
                            <p className="text-[0.75rem] text-slate mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>20% Down <span className="text-coral">(minimum)</span></p>
                            <p className="text-[1.5rem] font-bold text-coral mb-1" style={{ fontFamily: "var(--font-spectral)" }}>{fmt(p * 0.2)}</p>
                            <div className="border-t border-white/10 mt-3 pt-3">
                              <p className="text-[0.6875rem] text-slate" style={{ fontFamily: "var(--font-jakarta)" }}>Mortgage Amount</p>
                              <p className="text-[1rem] font-bold text-sand" style={{ fontFamily: "var(--font-spectral)" }}>{fmt(p * 0.8)}</p>
                            </div>
                          </div>

                          <div className="bg-navy-2 border border-white/10 rounded-xl p-4 text-center">
                            <p className="text-[0.75rem] text-slate mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>25% Down</p>
                            <p className="text-[1.5rem] font-bold text-sand mb-1" style={{ fontFamily: "var(--font-spectral)" }}>{fmt(p * 0.25)}</p>
                            <div className="border-t border-white/10 mt-3 pt-3">
                              <p className="text-[0.6875rem] text-slate" style={{ fontFamily: "var(--font-jakarta)" }}>Mortgage Amount</p>
                              <p className="text-[1rem] font-bold text-sand" style={{ fontFamily: "var(--font-spectral)" }}>{fmt(p * 0.75)}</p>
                            </div>
                          </div>

                          <div className="bg-navy-2 border border-white/10 rounded-xl p-4 text-center">
                            <p className="text-[0.75rem] text-slate mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>30% Down</p>
                            <p className="text-[1.5rem] font-bold text-sand mb-1" style={{ fontFamily: "var(--font-spectral)" }}>{fmt(p * 0.3)}</p>
                            <div className="border-t border-white/10 mt-3 pt-3">
                              <p className="text-[0.6875rem] text-slate" style={{ fontFamily: "var(--font-jakarta)" }}>Mortgage Amount</p>
                              <p className="text-[1rem] font-bold text-sand" style={{ fontFamily: "var(--font-spectral)" }}>{fmt(p * 0.7)}</p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })()}

              {/* Closing costs callout */}
              <div className="bg-navy rounded-xl p-5 mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-[0.9375rem] text-sand font-semibold" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Need to know your full upfront costs?
                </p>
                <Link
                  href="/calculators/closing-costs"
                  className="inline-flex items-center gap-2 bg-coral text-white font-semibold text-[0.8125rem] px-5 py-2.5 rounded-lg hover:bg-coral-dark transition-colors shrink-0"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Use the Closing Costs Calculator
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            </div>

            {/* ── PROGRAMS ── */}
            <div id="programs" className="scroll-mt-24 mb-16 pb-16 border-b border-sand-2">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Programs available to you
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                First-Time Buyer Programs<span className="text-coral">.</span>
              </h2>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Most first-time buyers know about one or two of these. Very few
                know they can stack them. Here is every program available to you
                in Ontario and exactly what it does.
              </p>

              <div className="space-y-3">
                {PROGRAMS.map((prog, i) => {
                  const isOpen = openProgram === i;
                  return (
                    <div
                      key={i}
                      className={`border rounded-xl overflow-hidden transition-colors ${
                        prog.featured
                          ? "border-coral"
                          : "border-sand-2"
                      }`}
                    >
                      <button
                        onClick={() =>
                          setOpenProgram(isOpen ? null : i)
                        }
                        className="w-full text-left p-5 cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3 min-w-0">
                            <span
                              className={`text-[0.625rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shrink-0 ${
                                prog.featured
                                  ? "bg-coral text-white"
                                  : "bg-sand-2 text-navy"
                              }`}
                              style={{ fontFamily: "var(--font-jakarta)" }}
                            >
                              {prog.tag}
                            </span>
                            <p
                              className="font-bold text-navy text-[0.9375rem]"
                              style={{ fontFamily: "var(--font-jakarta)" }}
                            >
                              {prog.title}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span
                              className="text-[1rem] font-bold text-emerald-600"
                              style={{ fontFamily: "var(--font-spectral)" }}
                            >
                              {prog.amount}
                            </span>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              className={`transition-transform duration-300 ${
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
                        </div>
                      </button>
                      <div
                        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                        style={{
                          gridTemplateRows: isOpen ? "1fr" : "0fr",
                        }}
                      >
                        <div className="overflow-hidden">
                          <div className="px-5 pb-5">
                            <div className="border-t border-sand-2 pt-4">
                              <p
                                className="text-[0.9375rem] text-navy-2 leading-relaxed mb-4"
                                style={{ fontFamily: "var(--font-jakarta)" }}
                              >
                                {prog.body}
                              </p>
                              {prog.bullets.length > 0 && (
                                <ul className="space-y-2">
                                  {prog.bullets.map((b, j) => (
                                    <li
                                      key={j}
                                      className="flex items-start gap-2 text-[0.9375rem] text-navy-2 leading-relaxed"
                                      style={{ fontFamily: "var(--font-jakarta)" }}
                                    >
                                      <span className="text-coral mt-0.5 shrink-0">
                                        &#8226;
                                      </span>
                                      {b}
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {"link" in prog && prog.link && (
                                <Link
                                  href={prog.link.href}
                                  className="inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-coral mt-3 hover:underline"
                                  style={{ fontFamily: "var(--font-jakarta)" }}
                                >
                                  {prog.link.label}
                                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Stacking banner */}
              <div className="bg-navy rounded-xl mt-6 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <h4
                    className="text-[1.125rem] font-bold text-sand mb-2"
                    style={{ fontFamily: "var(--font-spectral)" }}
                  >
                    The stacking story is the real headline.
                  </h4>
                  <p
                    className="text-[0.8125rem] text-slate leading-relaxed max-w-lg"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    A Toronto couple using FHSA plus HBP plus both LTT rebates
                    plus 30-year amortization buying power does not save $5,000.
                    They change their position by over $100,000. That is the
                    conversation Jesse has on every first-time buyer call.
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p
                    className="text-[0.625rem] font-bold text-slate uppercase tracking-widest mb-1"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    Total Advantage
                  </p>
                  <p
                    className="text-[2rem] font-bold text-coral"
                    style={{ fontFamily: "var(--font-spectral)" }}
                  >
                    $100k+
                  </p>
                </div>
              </div>

              {/* Transparency note */}
              <div className="bg-sand rounded-xl p-5 mt-6">
                <p
                  className="text-[0.9375rem] text-navy-2 leading-relaxed"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Working with Jesse costs you nothing. Lenders pay the broker's
                  commission when a mortgage funds. He is licensed with FSRA
                  (Financial Services Regulatory Authority of Ontario) and is
                  legally required to act in your best interest.
                </p>
              </div>

              {/* Broker vs Bank comparison */}
              <div className="mt-8">
                <BrokerVsBank />
              </div>

              {/* Anchor CTA to footer */}
              <div className="mt-10 text-center">
                <a
                  href="#final-cta"
                  className="inline-flex items-center gap-2 text-coral font-semibold text-[1rem] hover:underline"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Ready to get started?
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3v10M4 9l4 4 4-4" stroke="#E8705A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>

            {/* ── Mid-page CTA ── */}
            <div className="bg-coral/5 border border-coral/20 rounded-xl p-8 text-center my-12">
              <p
                className="text-[1.125rem] md:text-[1.25rem] font-bold text-navy mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Ready to find out what you qualify for?
              </p>
              <button
                onClick={handleBookCall}
                className="bg-coral text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-coral-dark transition-colors cursor-pointer text-[0.9375rem]"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Book an Intro Call
              </button>
            </div>

            {/* ── FINDING & BUYING YOUR HOME ── */}
            <div id="the-process" className="scroll-mt-24 mb-16 pb-16 border-b border-sand-2">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                The full picture
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Finding the Right Home<span className="text-coral">.</span>
              </h2>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Getting approved is only half the process. The other half is making sure you buy the right home, not just the one that fits the budget. The most expensive mistakes first-time buyers make are not financial. They are choosing a home that does not fit their life in two or three years.
              </p>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-10"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Before you start viewing listings, think through these carefully.
              </p>

              {/* ── LOCATION & NEIGHBOURHOOD ── */}
              <div className="bg-white border border-sand-2 rounded-xl p-5 sm:p-6 mb-5">
                <h3 className="font-bold text-navy text-[1.125rem] mb-3" style={{ fontFamily: "var(--font-spectral)" }}>
                  Location &amp; Neighbourhood
                </h3>
                <p className="text-[1rem] text-navy-2 leading-relaxed mb-4" style={{ fontFamily: "var(--font-jakarta)" }}>
                  This is where you will live for the next five to ten years. Think beyond what looks good in photos.
                </p>
                <ul className="space-y-3 text-[0.9375rem] text-navy-2 leading-relaxed" style={{ fontFamily: "var(--font-jakarta)" }}>
                  <li><span className="font-semibold text-navy">Commute:</span> Drive the route during rush hour. A 20-minute commute on a Sunday is very different from a Tuesday at 8am.</li>
                  <li><span className="font-semibold text-navy">Daily life:</span> Groceries, transit, parks, family doctor. Are the things you use every week actually close?</li>
                  <li><span className="font-semibold text-navy">Family proximity:</span> If you have young kids or plan to, being close to family for support is worth more than an extra bedroom.</li>
                  <li><span className="font-semibold text-navy">Schools:</span> Well-regarded schools directly affect resale value, even if you do not have children.</li>
                  <li><span className="font-semibold text-navy">Size and growth:</span> Will this home fit you in three years? A couple buying today may need a second bedroom sooner than they think.</li>
                </ul>
              </div>

              {/* ── MUST-HAVES vs NICE-TO-HAVES ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="bg-white border border-sand-2 rounded-xl p-5">
                  <h3 className="font-bold text-navy text-[1rem] mb-3" style={{ fontFamily: "var(--font-jakarta)" }}>Must-Haves</h3>
                  <ul className="space-y-2 text-[0.9375rem] text-navy-2 leading-relaxed" style={{ fontFamily: "var(--font-jakarta)" }}>
                    {["Location and commute distance", "Number of bedrooms and bathrooms", "Parking requirements", "Move-in date flexibility", "Deal-breaker structural issues"].map((item) => (
                      <li key={item} className="flex items-start gap-2"><span className="text-coral mt-0.5 shrink-0">&#8226;</span>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white border border-sand-2 rounded-xl p-5">
                  <h3 className="font-bold text-navy text-[1rem] mb-3" style={{ fontFamily: "var(--font-jakarta)" }}>Nice-to-Haves</h3>
                  <ul className="space-y-2 text-[0.9375rem] text-navy-2 leading-relaxed" style={{ fontFamily: "var(--font-jakarta)" }}>
                    {["Updated kitchen or bathrooms", "Backyard or outdoor space", "Garage or extra storage", "Specific architectural style", "Proximity to specific amenities"].map((item) => (
                      <li key={item} className="flex items-start gap-2"><span className="text-slate mt-0.5 shrink-0">&#8226;</span>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ── FROM PREPARED TO KEYS ── */}
              <h3
                className="text-[1.25rem] font-bold text-navy mb-4 mt-10"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                The Buying Process<span className="text-coral">.</span>
              </h3>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-6"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                From your first offer to closing day, here is every step.
              </p>

              <div className="relative mb-8">
                <div className="absolute left-[1.125rem] top-6 bottom-6 w-0.5 bg-gradient-to-b from-coral to-sand-2" />
                <div className="space-y-5">
                  {OFFER_TO_KEYS.map((step, i) => (
                    <div key={i} className="relative pl-12">
                      <div className="absolute left-0 top-1 w-9 h-9 rounded-full bg-navy flex items-center justify-center">
                        <span className="text-[0.75rem] font-bold text-white" style={{ fontFamily: "var(--font-jakarta)" }}>{i + 1}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-bold text-navy text-[0.9375rem]" style={{ fontFamily: "var(--font-jakarta)" }}>{step.title}</h4>
                          <span className="text-[0.6875rem] font-semibold text-slate bg-sand px-2.5 py-0.5 rounded-full" style={{ fontFamily: "var(--font-jakarta)" }}>{step.timeline}</span>
                        </div>
                        <p className="text-[0.9375rem] text-navy-2 leading-relaxed" style={{ fontFamily: "var(--font-jakarta)" }}>{step.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── WORKING WITH A REALTOR ── */}
              <div className="bg-sand rounded-xl p-5 sm:p-6 mb-8">
                <h3 className="font-bold text-navy text-[1rem] mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Working with a Realtor
                </h3>
                <p className="text-[0.9375rem] text-navy-2 leading-relaxed mb-3" style={{ fontFamily: "var(--font-jakarta)" }}>
                  A buyer&apos;s agent represents your interests during the search and negotiation. In most cases, the seller pays the buyer&apos;s agent commission, so working with an experienced realtor costs you nothing. Look for an agent with experience in your target area and price range.
                </p>
                <p className="text-[0.875rem] text-navy font-semibold leading-relaxed" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Jesse works with great realtor partners and can refer someone if they are the right fit for your situation.
                </p>
              </div>

              {/* ── ONGOING COST OF OWNING ── */}
              <h3
                className="text-[1.25rem] font-bold text-navy mb-3"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                The Ongoing Cost of Owning<span className="text-coral">.</span>
              </h3>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-3"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Your mortgage payment is not your only monthly cost. Budget for these before you decide what you can afford.
              </p>

              <button
                onClick={() => setOwningCostsOpen(!owningCostsOpen)}
                className="flex items-center gap-2 text-[0.875rem] font-semibold text-coral mb-4 cursor-pointer"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {owningCostsOpen ? "Hide cost breakdown" : "See the full cost breakdown"}
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className={`transition-transform duration-300 ${owningCostsOpen ? "rotate-180" : ""}`}>
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="#E8705A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="grid transition-[grid-template-rows] duration-300 ease-in-out" style={{ gridTemplateRows: owningCostsOpen ? "1fr" : "0fr" }}>
                <div className="overflow-hidden">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                    {[
                      { label: "Property Tax", desc: "In Toronto, roughly 0.6% of assessed value annually. Varies by municipality." },
                      { label: "Home Insurance", desc: "Required by your lender. Typically $100 to $250 per month." },
                      { label: "Maintenance", desc: "Budget 1% to 3% of your home's value per year for upkeep." },
                      { label: "Hydro and Gas", desc: "Budget $200 to $400 per month depending on home size and season." },
                      { label: "Emergency Repairs", desc: "Furnace, roof, plumbing. Things break without warning. Keep a separate fund." },
                      { label: "Condo Fees", desc: "If buying a condo, monthly fees cover shared maintenance and insurance. Check for special assessments." },
                    ].map((cost) => (
                      <div key={cost.label} className="bg-white border border-sand-2 rounded-xl p-4">
                        <p className="font-bold text-navy text-[0.875rem] mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>{cost.label}</p>
                        <p className="text-[0.9375rem] text-navy-2 leading-relaxed" style={{ fontFamily: "var(--font-jakarta)" }}>{cost.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Closing costs link */}
              <div className="bg-navy rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-[0.9375rem] text-sand font-semibold" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Want an exact closing costs estimate?
                </p>
                <Link
                  href="/calculators/closing-costs"
                  className="inline-flex items-center gap-2 bg-coral text-white font-semibold text-[0.8125rem] px-5 py-2.5 rounded-lg hover:bg-coral-dark transition-colors shrink-0"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Use the Closing Costs Calculator
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            </div>

            {/* ── MISTAKES ── */}
            <div id="mistakes" className="scroll-mt-24 mb-16 pb-16 border-b border-sand-2">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                What to avoid
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                The six mistakes first-time buyers make most often.
              </h2>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                These are not hypothetical. Jesse sees versions of these
                regularly. Knowing them in advance gives you a real advantage.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {MISTAKES.map((m, i) => (
                  <div
                    key={i}
                    className="bg-white border border-sand-2 rounded-xl p-5 border-t-[3px] border-t-coral"
                  >
                    <p
                      className="text-[2rem] font-bold text-coral/20 mb-2"
                      style={{ fontFamily: "var(--font-spectral)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3
                      className="font-bold text-navy text-[0.9375rem] mb-2"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      {m.title}
                    </h3>
                    <p
                      className="text-[0.9375rem] text-navy-2 leading-relaxed"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      {m.body}
                    </p>
                  </div>
                ))}
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
                Things first-time buyers ask.
              </h2>
              <div className="space-y-3">
                {FAQ_ITEMS.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div
                      key={i}
                      className="border border-sand-2 rounded-xl overflow-hidden"
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
                              className="text-[0.9375rem] text-navy-2 leading-relaxed"
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
      <section id="final-cta" className="bg-navy py-28 sm:py-32 px-6 scroll-mt-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-[2.5rem] sm:text-[3.25rem] lg:text-[3.75rem] font-bold text-sand leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Ready to get started<span className="text-coral">?</span>
          </h2>
          <p
            className="text-[1.125rem] sm:text-[1.25rem] text-slate leading-relaxed mb-10 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Book an intro call and get prepared to make the right decision.
            Buying the right home is one of the most important financial
            moves you will make. Jesse can't wait to help you get started.
          </p>
          <button
            onClick={handleBookCall}
            className="bg-coral text-white font-bold px-12 py-5 rounded-xl hover:bg-coral-dark transition-colors cursor-pointer text-[1.125rem] shadow-lg shadow-coral/20"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Book an Intro Call
          </button>
        </div>
      </section>
    </>
  );
}

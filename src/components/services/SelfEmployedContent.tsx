"use client";

import { useState, useEffect, useRef } from "react";

/* ── TOC sections ── */
const TOC_ITEMS = [
  { id: "the-challenge", label: "The income gap" },
  { id: "how-lenders-assess", label: "4 income methods" },
  { id: "documents", label: "Documents" },
  { id: "tax-strategy", label: "The tax dilemma" },
  { id: "scenarios", label: "Common scenarios" },
  { id: "lending-ladder", label: "When the bank says no" },
  { id: "deal-killers", label: "Mistakes that kill deals" },
  { id: "timeline", label: "Your timeline" },
  { id: "what-jesse-does", label: "The broker advantage" },
  { id: "faq", label: "FAQ" },
];

/* ── FAQ data ── */
const FAQ_ITEMS = [
  {
    q: "I have only been self-employed for a year. Can I still get a mortgage?",
    a: "Some lenders will consider applications with one year of T1 Generals. The options are more limited and rates may be slightly higher, but it is not an automatic disqualification. The strength of the rest of your application matters: credit score, down payment, and the consistency of your income during that year.",
  },
  {
    q: "Do I automatically need 20% down because I am self-employed?",
    a: "Not always. If your income can be fully verified through tax documents and Notices of Assessment, you can qualify with as little as 5% down through insured programs. Stated income programs, where the lender accepts a reasonable declared income without full tax verification, typically require 20% or more.",
  },
  {
    q: "My income is all over the place year to year. How do lenders handle that?",
    a: "Lenders typically average your income over two years. If one year was strong and the other was weaker, the average may still be enough. Some lenders weight recent income more heavily while others use straight averaging. The right match depends on which approach works in your favour.",
  },
  {
    q: "My accountant writes off everything. Does that hurt my chances?",
    a: "It can. The same write-offs that reduce your tax bill also reduce the income a lender sees on your Notice of Assessment. This is the most common challenge for self-employed borrowers. Lenders who offer stated income programs or who look at gross revenue alongside net income can bridge that gap.",
  },
  {
    q: "What does stated income actually mean?",
    a: "A stated income program allows you to declare a reasonable income for your occupation without requiring full tax documentation to verify it. Lenders still look at your credit, assets, and down payment. These programs are designed for borrowers whose tax returns do not reflect their actual earning capacity. They typically require at least 20% down.",
  },
  {
    q: "My business does great revenue. Why can I not just use that to qualify?",
    a: "Lenders assess personal income, not business revenue. However, the way your income flows from the business to you personally depends on your business structure. Sole proprietors report on their personal return. Incorporated borrowers may pay themselves a salary, dividends, or a combination. The application is structured around whichever path maximizes your qualifying income.",
  },
  {
    q: "I work on contract but I get a T4. Am I considered self-employed?",
    a: "If you receive a T4 from your employer, you are treated as a salaried employee for mortgage purposes regardless of the contract label. If you invoice clients and receive T4A slips or report income on a T2125, lenders classify you as self-employed. The distinction matters because it changes which lenders and programs are the best fit.",
  },
  {
    q: "My bank already said no. Does that mean I am out of options?",
    a: "A bank decline is not the end. It means your file did not fit that one lender's policies. A broker submits to 50+ lenders, each with different income criteria. Many self-employed borrowers who are declined at a bank get approved through a B-lender or stated income program at competitive rates.",
  },
  {
    q: "Am I automatically going to pay a higher rate because I am self-employed?",
    a: "Not necessarily. If your income can be fully documented through T1 Generals and Notices of Assessment, you qualify for the same A-lender rates as any salaried employee. Stated income programs or B-lender options may carry slightly higher rates, but the difference is often smaller than people expect.",
  },
];

/* ── Income assessment methods ── */
const INCOME_METHODS = [
  {
    num: "01",
    title: "Two-year average (Line 15000)",
    desc: "Lenders look at your net income on your personal tax return, averaged over two years. This is the most common method and gives you the widest lender selection and best rates.",
    fit: "Best for: borrowers whose tax returns reflect their actual earnings",
    tag: "Most common",
  },
  {
    num: "02",
    title: "Stated income",
    desc: "You declare a reasonable income for your occupation without full tax verification. Lenders still review credit, assets, and overall financial picture. Exists specifically for borrowers who write off aggressively.",
    fit: "Best for: significant write-offs, strong credit, 20%+ down",
    tag: "Income maximizer",
  },
  {
    num: "03",
    title: "Gross revenue / add-backs",
    desc: "Some lenders look at gross business revenue or add back certain deductions to your net income. This gives a more accurate picture of earning capacity. Not every lender does this.",
    fit: "Best for: sole proprietors with high revenue and high deductions",
    tag: "Deduction recovery",
  },
  {
    num: "04",
    title: "Bank statement programs",
    desc: "A smaller group of lenders review 12 to 24 months of business bank statements to verify income flow. Deposits are used to calculate average monthly income. Bypasses tax documents entirely.",
    fit: "Best for: consistent cash flow, recent or unfiled taxes",
    tag: "No NOA required",
  },
];

/* ── Documents required ── */
const DOCUMENTS = [
  {
    category: "Everyone",
    items: [
      "T1 General (2 years)",
      "Notice of Assessment (2 years)",
      "Government-issued photo ID",
      "Proof of down payment (90 days of statements)",
      "Void cheque or direct deposit form",
    ],
  },
  {
    category: "Incorporated",
    items: [
      "T2 Corporate return (2 years)",
      "Financial statements (income statement + balance sheet)",
      "Articles of Incorporation",
    ],
  },
  {
    category: "Sole proprietor",
    items: [
      "T2125 Statement of Business Activities (2 years)",
      "Business licence (if applicable)",
    ],
  },
  {
    category: "Contract / commission",
    items: [
      "T4A slips or contracts",
      "Invoicing history (12 months)",
    ],
  },
];

/* ── Tax timing strategies ── */
const TAX_STRATEGIES = [
  {
    title: "Defer equipment purchases",
    desc: "That new vehicle or laptop can wait until after closing. Major deductions taken right before applying reduce your qualifying income.",
  },
  {
    title: "Skip the home office deduction for one year",
    desc: "It is optional. Skipping it for one filing year can add $5,000 to $15,000 to your qualifying income.",
  },
  {
    title: "Pause Capital Cost Allowance (CCA)",
    desc: "CCA is optional. Pausing it for one to two tax years before applying preserves income on your return.",
  },
  {
    title: "File your taxes early",
    desc: "Lenders want the most recent year. Filing by March instead of April means they use your strongest, most current numbers.",
  },
  {
    title: "Time your fiscal year (incorporated)",
    desc: "Your fiscal year end determines which T2 the lender sees. Planning around this gives you control over which numbers are on file.",
  },
  {
    title: "Resolve CRA balances before applying",
    desc: "Outstanding tax debt, even a small amount, triggers automatic declines at most lenders. Clear it or set up a payment plan first.",
  },
];

/* ── Scenarios ── */
const SCENARIOS = [
  {
    title: "Sole proprietor with heavy write-offs",
    situation: "You earn $150,000 in gross revenue, but after vehicle, home office, supplies, and other deductions, your T1 shows $55,000 net. Banks see you as a $55,000 earner.",
    solution: "The right lender uses stated income programs or adds back specific deductions. The goal is qualification based on what you actually earn, not what your accountant reports.",
  },
  {
    title: "Incorporated professional",
    situation: "You pay yourself a modest salary and take the rest as dividends. Your personal T1 shows $80,000, but the corporation earns $250,000. Banks only see the $80,000.",
    solution: "Certain lenders consider retained earnings in the corporation alongside personal income. Some will also look at the T2 to build a fuller picture of your capacity.",
  },
  {
    title: "Commission-based income",
    situation: "You earn 100% commission. Your income varies month to month, and lenders struggle to determine a stable qualifying number. Some years are significantly stronger than others.",
    solution: "Some lenders average commission income over two years rather than taking the lower year. If you receive T4 commission slips, you may qualify under salaried guidelines at certain lenders.",
  },
  {
    title: "Gig worker or contract professional",
    situation: "You take on project-based contracts through multiple clients. You do not have a single employer or a consistent paystub. Your income is real, but it does not look like what lenders expect.",
    solution: "The first step is determining whether you are classified as employed (T4) or self-employed (T4A/T2125) for lending purposes. From there, the application is matched to lenders comfortable with contract income and structured to highlight income consistency.",
  },
  {
    title: "Recently self-employed (under 2 years)",
    situation: "You left a salaried role to start your own business 8 to 14 months ago. You have strong revenue, but most lenders want two years of tax returns you do not have yet.",
    solution: "A small number of lenders will work with one year of self-employment history if the rest of the application is strong. In some cases, if you were previously in the same industry as an employee, lenders will consider that history alongside your self-employed income.",
  },
];

/* ── Lending tiers ── */
const LENDING_TIERS = [
  {
    tier: "A-Lenders",
    subtitle: "Big banks + monolines",
    color: "bg-emerald-500",
    rates: "Best rates available",
    details: [
      "Strictest income qualification",
      "Full documentation required (T1 + NOA, 2 years)",
      "2+ years of self-employment history",
      "Widest product selection",
    ],
  },
  {
    tier: "B-Lenders",
    subtitle: "Trust companies + alternative lenders",
    color: "bg-amber-500",
    rates: "Rates +0.5% to +1.5%",
    details: [
      "More flexible income verification",
      "Stated income programs available",
      "May accept 1 year of self-employment",
      "Where most self-employed borrowers get approved",
    ],
  },
  {
    tier: "MICs",
    subtitle: "Mortgage Investment Corporations",
    color: "bg-orange-500",
    rates: "Rates +2% to +4%",
    details: [
      "Very flexible qualification criteria",
      "Interest-only options available",
      "1 to 2 year terms typical",
      "Bridge financing: get in, refinance later",
    ],
  },
  {
    tier: "Private",
    subtitle: "Private lenders",
    color: "bg-red-500",
    rates: "Rates 7%+",
    details: [
      "Property-focused, not income-focused",
      "Most flexible qualification",
      "Short-term (6 to 24 months)",
      "Always have an exit strategy planned",
    ],
  },
];

/* ── Deal killers ── */
const DEAL_KILLERS = [
  {
    mistake: "Filing taxes late",
    why: "Lenders need your most recent year. Filing in April instead of March means they use older, potentially weaker numbers.",
    fix: "File by March. Your accountant can submit early.",
  },
  {
    mistake: "CRA balance owing",
    why: "Outstanding tax debt triggers automatic declines at most lenders. Even $500 can kill a deal.",
    fix: "Pay it off or get a CRA payment arrangement letter before applying.",
  },
  {
    mistake: "Mixing business and personal accounts",
    why: "Commingled funds are a red flag for underwriters and make income verification significantly harder.",
    fix: "Separate accounts immediately. Even if you need to backtrack 12 months of statements.",
  },
  {
    mistake: "Major write-offs right before applying",
    why: "That new vehicle saved $15,000 in tax but cost $75,000 in mortgage qualification.",
    fix: "Time major purchases after closing. Talk to your broker and accountant before year-end.",
  },
  {
    mistake: "Incorporating at the wrong time",
    why: "New corporation means zero years of corporate history. Lenders want two years. The clock resets.",
    fix: "If buying soon, hold off on incorporating until after you close.",
  },
  {
    mistake: "Assuming your bank is the only option",
    why: "Your bank has one set of policies. A broker has access to 50+ lenders with different criteria.",
    fix: "Talk to a broker before accepting a decline as final.",
  },
  {
    mistake: "Major changes during the approval process",
    why: "Switching jobs, signing a new lease, or buying equipment mid-approval are all grounds for re-verification or decline.",
    fix: "Freeze everything until you have keys in hand.",
  },
];

/* ── Timeline phases ── */
const TIMELINE_PHASES = [
  {
    phase: "18+ months out",
    label: "Tax strategy",
    color: "bg-coral",
    items: [
      "Talk to your accountant about how next year's return will look for mortgage purposes",
      "Adjust write-off timing if possible",
      "Separate business and personal finances",
      "Start building a clear down payment trail",
      "Resolve any outstanding CRA balances",
    ],
  },
  {
    phase: "6 months out",
    label: "Get organized",
    color: "bg-coral/80",
    items: [
      "Gather all documents from the checklist above",
      "Pay down consumer debt (credit cards, lines of credit)",
      "Stop applying for new credit",
      "Get corporate financials prepared if incorporated",
      "Pull your own credit report and review for errors",
    ],
  },
  {
    phase: "3 months out",
    label: "Strategy call",
    color: "bg-coral/60",
    items: [
      "Review income across all four assessment methods",
      "Identify the best lender tier and program for your profile",
      "Get pre-approved with a rate hold (90 to 120 days)",
      "Know your exact budget before you start looking",
    ],
  },
  {
    phase: "Offer to close",
    label: "The finish line",
    color: "bg-coral/40",
    items: [
      "Submit full application when your offer is accepted",
      "Respond quickly to any underwriter questions",
      "Do not change anything financial until you have keys",
      "Arrange insurance and sign closing documents",
    ],
  },
];

/* ══════════════════════════════════════════════════════════════ */

export default function SelfEmployedContent() {
  const [activeSection, setActiveSection] = useState("the-challenge");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openScenario, setOpenScenario] = useState<number | null>(0);
  const [openKiller, setOpenKiller] = useState<number | null>(null);
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
            Self-Employed Mortgages
          </span>
          <h1
            className="text-[2rem] md:text-[2.75rem] leading-[1.15] font-bold text-sand mb-6"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Your income is{" "}
            <span className="text-coral">real.</span> Your tax return
            just does not show it.
          </h1>
          <p
            className="text-slate text-[1.0625rem] md:text-[1.125rem] leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Banks use your net income after deductions to decide what you qualify for. If you are
            self-employed, that number rarely reflects what you actually earn. The right lender
            looks at the full picture and knows how to assess business income properly.
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
              "Stated income programs",
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
            {/* ── THE CHALLENGE ── */}
            <div id="the-challenge" className="scroll-mt-24 mb-20">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Why it is different
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                The gap between what you earn and what your return shows.
              </h2>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Self-employed Canadians face a structural problem when applying for a mortgage. The
                write-offs that save thousands on your tax bill also reduce the income a lender sees
                on your Notice of Assessment.
              </p>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                If you are incorporated, it gets more complex. The way you pay yourself (salary,
                dividends, or a combination) changes what shows up on your personal return. Lenders
                assess personal income, not business revenue, so the structure matters.
              </p>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Most banks apply the same income rules to everyone. That approach works fine for a
                salaried employee with a T4. It does not work for someone whose income flows through a
                corporation, arrives as commission, or varies across a dozen different clients.
              </p>

              {/* Income gap visualizer */}
              <div className="bg-sand rounded-2xl p-6 md:p-8 mb-6">
                <h3
                  className="text-navy font-bold text-[1.125rem] mb-6 text-center"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  The income gap in real numbers
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* What the bank sees */}
                  <div className="bg-white rounded-xl p-5 border border-sand-2">
                    <p
                      className="text-[0.6875rem] font-bold text-slate uppercase tracking-widest mb-4"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      What CRA sees
                    </p>
                    <div className="space-y-3 mb-5">
                      <div className="flex justify-between items-center">
                        <span className="text-navy/60 text-[0.8125rem]" style={{ fontFamily: "var(--font-jakarta)" }}>Gross revenue</span>
                        <span className="text-navy font-semibold text-[0.9375rem]" style={{ fontFamily: "var(--font-jakarta)" }}>$200,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-navy/60 text-[0.8125rem]" style={{ fontFamily: "var(--font-jakarta)" }}>Write-offs</span>
                        <span className="text-red-500 font-semibold text-[0.9375rem]" style={{ fontFamily: "var(--font-jakarta)" }}>-$138,000</span>
                      </div>
                      <div className="border-t border-sand-2 pt-3 flex justify-between items-center">
                        <span className="text-navy font-semibold text-[0.8125rem]" style={{ fontFamily: "var(--font-jakarta)" }}>NOA Line 15000</span>
                        <span className="text-navy font-bold text-[1.125rem]" style={{ fontFamily: "var(--font-spectral)" }}>$62,000</span>
                      </div>
                    </div>
                    <div className="bg-sand rounded-lg p-3 text-center">
                      <p className="text-[0.75rem] text-slate mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>Bank approves you for</p>
                      <p className="text-navy font-bold text-[1.25rem]" style={{ fontFamily: "var(--font-spectral)" }}>$310,000</p>
                    </div>
                  </div>

                  {/* What a broker unlocks */}
                  <div className="bg-navy rounded-xl p-5">
                    <p
                      className="text-[0.6875rem] font-bold text-coral uppercase tracking-widest mb-4"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      What a broker unlocks
                    </p>
                    <div className="space-y-3 mb-5">
                      <div className="flex justify-between items-center">
                        <span className="text-sand/60 text-[0.8125rem]" style={{ fontFamily: "var(--font-jakarta)" }}>Same gross revenue</span>
                        <span className="text-sand font-semibold text-[0.9375rem]" style={{ fontFamily: "var(--font-jakarta)" }}>$200,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sand/60 text-[0.8125rem]" style={{ fontFamily: "var(--font-jakarta)" }}>After add-backs</span>
                        <span className="text-coral font-semibold text-[0.9375rem]" style={{ fontFamily: "var(--font-jakarta)" }}>+$76,000</span>
                      </div>
                      <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                        <span className="text-sand font-semibold text-[0.8125rem]" style={{ fontFamily: "var(--font-jakarta)" }}>Qualifying income</span>
                        <span className="text-sand font-bold text-[1.125rem]" style={{ fontFamily: "var(--font-spectral)" }}>$138,000</span>
                      </div>
                    </div>
                    <div className="bg-coral/15 rounded-lg p-3 text-center">
                      <p className="text-[0.75rem] text-sand/70 mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>You actually qualify for</p>
                      <p className="text-coral font-bold text-[1.25rem]" style={{ fontFamily: "var(--font-spectral)" }}>$690,000</p>
                    </div>
                  </div>
                </div>

                {/* Gap callout */}
                <div className="mt-6 bg-white rounded-xl border-2 border-coral/20 p-4 text-center">
                  <p
                    className="text-coral text-[2rem] font-bold mb-1"
                    style={{ fontFamily: "var(--font-spectral)" }}
                  >
                    $380,000
                  </p>
                  <p
                    className="text-navy/70 text-[0.875rem]"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    in purchasing power left on the table when lenders only see your NOA
                  </p>
                </div>
              </div>

              {/* Stat cards */}
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { stat: "16%", label: "of Canadians are self-employed" },
                  { stat: "2x", label: "more documentation typically required" },
                  { stat: "50+", label: "lenders with different income policies" },
                ].map((card) => (
                  <div key={card.label} className="bg-sand rounded-xl p-5 text-center">
                    <p
                      className="text-coral text-[1.75rem] font-bold mb-1"
                      style={{ fontFamily: "var(--font-spectral)" }}
                    >
                      {card.stat}
                    </p>
                    <p
                      className="text-navy/70 text-[0.8125rem]"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      {card.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── HOW LENDERS ASSESS INCOME ── */}
            <div id="how-lenders-assess" className="scroll-mt-24 mb-20">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Income Verification
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Four ways lenders can assess self-employed income.
              </h2>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Not every lender uses the same approach. The method that works best depends on your
                business structure, how you file your taxes, and how much documentation you can
                provide. The right match maximizes your qualifying income.
              </p>

              <div className="space-y-4">
                {INCOME_METHODS.map((method) => (
                  <div key={method.title} className="bg-sand rounded-xl p-6">
                    <div className="flex items-start gap-4 mb-3">
                      <span
                        className="text-coral text-[1.5rem] font-bold shrink-0 leading-none pt-0.5"
                        style={{ fontFamily: "var(--font-spectral)" }}
                      >
                        {method.num}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap mb-2">
                          <h3
                            className="text-navy font-bold text-[1.0625rem]"
                            style={{ fontFamily: "var(--font-spectral)" }}
                          >
                            {method.title}
                          </h3>
                          <span
                            className="text-[0.6875rem] font-bold text-coral bg-coral/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                            style={{ fontFamily: "var(--font-jakarta)" }}
                          >
                            {method.tag}
                          </span>
                        </div>
                        <p
                          className="text-navy/70 text-[0.9375rem] leading-relaxed mb-3"
                          style={{ fontFamily: "var(--font-jakarta)" }}
                        >
                          {method.desc}
                        </p>
                        <p
                          className="text-coral font-semibold text-[0.8125rem]"
                          style={{ fontFamily: "var(--font-jakarta)" }}
                        >
                          {method.fit}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── DOCUMENTS REQUIRED ── */}
            <div id="documents" className="scroll-mt-24 mb-20">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                What to prepare
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Documents you will need.
              </h2>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                The exact list depends on your business structure and which lending program fits your
                situation. Below is a general overview. On a call, you will get the exact list for
                your case.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {DOCUMENTS.map((group) => (
                  <div key={group.category} className="bg-sand rounded-xl p-5">
                    <h3
                      className="text-navy font-bold text-[0.9375rem] mb-3"
                      style={{ fontFamily: "var(--font-spectral)" }}
                    >
                      {group.category}
                    </h3>
                    <ul className="space-y-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-navy/70 text-[0.875rem] leading-relaxed"
                          style={{ fontFamily: "var(--font-jakarta)" }}
                        >
                          <svg className="w-4 h-4 shrink-0 mt-0.5 text-coral" viewBox="0 0 16 16" fill="none">
                            <rect width="16" height="16" rx="4" fill="currentColor" fillOpacity="0.1" />
                            <path d="M4.5 8.5L7 11l4.5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-coral/5 border border-coral/20 rounded-xl p-6">
                <p
                  className="text-navy text-[0.9375rem] leading-relaxed"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  <span className="font-semibold">Do not wait until everything is perfectly
                  organized.</span> Bring what you have. Gaps get identified early, and most files
                  are ready within a few days.
                </p>
              </div>
            </div>

            {/* ── Mid-page CTA ── */}
            <div className="bg-coral/5 border border-coral/20 rounded-xl p-8 text-center my-12">
              <p
                className="text-[1.125rem] md:text-[1.25rem] font-bold text-navy mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Not sure which income method works best for you?
              </p>
              <button
                onClick={handleBookCall}
                className="bg-coral text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-coral-dark transition-colors cursor-pointer text-[0.9375rem]"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Book a Call
              </button>
            </div>

            {/* ── TAX STRATEGY ── */}
            <div id="tax-strategy" className="scroll-mt-24 mb-20">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Tax Planning
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                The tax dilemma: your accountant says minimize, your mortgage says maximize.
              </h2>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Every dollar your accountant writes off saves you tax but reduces the income a
                lender will see. There is a sweet spot. You do not need to stop writing things off
                entirely. You just need to time it.
              </p>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Start this conversation with your accountant 18 to 24 months before you want to buy.
                One strong tax year is good. Two is better.
              </p>

              {/* Visual trade-off */}
              <div className="bg-navy rounded-2xl p-6 md:p-8 mb-8">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-slate" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                    <p className="text-sand font-bold text-[0.9375rem] mb-1" style={{ fontFamily: "var(--font-spectral)" }}>
                      Show less income
                    </p>
                    <p className="text-sand/50 text-[0.8125rem]" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Pay less tax. Qualify for less mortgage.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-coral/20 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-coral" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    </div>
                    <p className="text-sand font-bold text-[0.9375rem] mb-1" style={{ fontFamily: "var(--font-spectral)" }}>
                      Show more income
                    </p>
                    <p className="text-coral text-[0.8125rem] font-semibold" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Pay more tax. Qualify for more mortgage.
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-5 border-t border-white/10 text-center">
                  <p className="text-sand/70 text-[0.875rem] leading-relaxed max-w-lg mx-auto" style={{ fontFamily: "var(--font-jakarta)" }}>
                    In most cases, the extra tax paid over one to two years is far less than the equity
                    gained by qualifying for a stronger mortgage. The math almost always favours showing
                    more income.
                  </p>
                </div>
              </div>

              {/* Timing strategies */}
              <h3
                className="text-navy font-bold text-[1.25rem] mb-5"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Timing strategies that do not require changing your income.
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {TAX_STRATEGIES.map((strategy, i) => (
                  <div key={i} className="bg-sand rounded-xl p-5 flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-coral/15 flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6.5L5 9l4.5-6" stroke="#E8705A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-navy font-semibold text-[0.875rem] mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                        {strategy.title}
                      </p>
                      <p className="text-navy/60 text-[0.8125rem] leading-relaxed" style={{ fontFamily: "var(--font-jakarta)" }}>
                        {strategy.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── COMMON SCENARIOS ── */}
            <div id="scenarios" className="scroll-mt-24 mb-20">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Real Situations
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Five situations that get declined at the bank.
              </h2>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                If your situation looks like one of these, there is a lender and a strategy that
                fits.
              </p>

              <div className="space-y-3">
                {SCENARIOS.map((scenario, i) => {
                  const isOpen = openScenario === i;
                  return (
                    <div
                      key={scenario.title}
                      className={`rounded-xl border transition-colors ${
                        isOpen
                          ? "bg-navy border-navy"
                          : "bg-sand border-sand-2 hover:border-coral/30"
                      }`}
                    >
                      <button
                        onClick={() => setOpenScenario(isOpen ? null : i)}
                        className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className={`text-[0.75rem] font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                              isOpen
                                ? "bg-coral text-white"
                                : "bg-white text-navy border border-navy/10"
                            }`}
                            style={{ fontFamily: "var(--font-jakarta)" }}
                          >
                            {i + 1}
                          </span>
                          <span
                            className={`font-semibold text-[1rem] ${
                              isOpen ? "text-sand" : "text-navy"
                            }`}
                            style={{ fontFamily: "var(--font-spectral)" }}
                          >
                            {scenario.title}
                          </span>
                        </div>
                        <svg
                          className={`w-5 h-5 shrink-0 transition-transform ${
                            isOpen ? "rotate-180 text-coral" : "text-navy/40"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-6 pt-0">
                          <div className="ml-11 space-y-4">
                            <div>
                              <p
                                className="text-coral text-[0.6875rem] font-bold uppercase tracking-widest mb-1.5"
                                style={{ fontFamily: "var(--font-jakarta)" }}
                              >
                                The Situation
                              </p>
                              <p
                                className="text-sand/80 text-[0.9375rem] leading-relaxed"
                                style={{ fontFamily: "var(--font-jakarta)" }}
                              >
                                {scenario.situation}
                              </p>
                            </div>
                            <div>
                              <p
                                className="text-coral text-[0.6875rem] font-bold uppercase tracking-widest mb-1.5"
                                style={{ fontFamily: "var(--font-jakarta)" }}
                              >
                                The Approach
                              </p>
                              <p
                                className="text-sand/80 text-[0.9375rem] leading-relaxed"
                                style={{ fontFamily: "var(--font-jakarta)" }}
                              >
                                {scenario.solution}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── LENDING LADDER ── */}
            <div id="lending-ladder" className="scroll-mt-24 mb-20">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Beyond the bank
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                When the bank says no, the conversation is just starting.
              </h2>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                A bank decline means your file did not fit that one lender's criteria. It does not
                mean you cannot get a mortgage. There are four tiers of lenders in Canada, each with
                different qualification standards.
              </p>

              <div className="space-y-4 mb-8">
                {LENDING_TIERS.map((tier, i) => (
                  <div key={tier.tier} className="bg-sand rounded-xl p-5 md:p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${tier.color} shrink-0`} />
                        <h3
                          className="text-navy font-bold text-[1.0625rem]"
                          style={{ fontFamily: "var(--font-spectral)" }}
                        >
                          Tier {i + 1}: {tier.tier}
                        </h3>
                      </div>
                      <span
                        className="text-[0.6875rem] font-semibold text-navy/50 bg-white px-2.5 py-0.5 rounded-full"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        {tier.rates}
                      </span>
                    </div>
                    <p
                      className="text-navy/50 text-[0.8125rem] mb-3"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      {tier.subtitle}
                    </p>
                    <ul className="space-y-1.5">
                      {tier.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-2.5 text-navy/70 text-[0.875rem]"
                          style={{ fontFamily: "var(--font-jakarta)" }}
                        >
                          <svg className="w-4 h-4 shrink-0 mt-0.5 text-coral" viewBox="0 0 16 16" fill="none">
                            <path d="M4 8.5L7 11l5-6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Bridge strategy callout */}
              <div className="bg-navy rounded-2xl p-6 md:p-8">
                <h3
                  className="text-sand font-bold text-[1.25rem] mb-4"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  The bridge strategy
                </h3>
                <div className="space-y-4">
                  {[
                    "Get approved at Tier 2 or 3 today",
                    "Move in and start living your life",
                    "File one to two years of strong tax returns while you own the home",
                    "Refinance to Tier 1 with full documentation and your new history",
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span
                        className="w-7 h-7 rounded-full bg-coral text-white flex items-center justify-center shrink-0 text-[0.75rem] font-bold"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        {i + 1}
                      </span>
                      <p
                        className="text-sand/80 text-[0.9375rem] leading-relaxed pt-0.5"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-white/10">
                  <p
                    className="text-sand/60 text-[0.875rem] leading-relaxed"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    The interest premium over 12 to 18 months at Tier 2 is typically $3,000 to $8,000.
                    The home you gained access to during that period has often appreciated $30,000 or more.
                  </p>
                </div>
              </div>
            </div>

            {/* ── DEAL KILLERS ── */}
            <div id="deal-killers" className="scroll-mt-24 mb-20">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Avoid These
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Seven mistakes that kill self-employed mortgage deals.
              </h2>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                These come up repeatedly. Every one of them is avoidable if you know about it
                in advance.
              </p>

              <div className="space-y-3">
                {DEAL_KILLERS.map((killer, i) => {
                  const isOpen = openKiller === i;
                  return (
                    <div
                      key={killer.mistake}
                      className={`rounded-xl border transition-colors ${
                        isOpen ? "border-coral/20 bg-sand" : "border-sand-2 bg-sand"
                      }`}
                    >
                      <button
                        onClick={() => setOpenKiller(isOpen ? null : i)}
                        className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M3 3l6 6M9 3l-6 6" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          </span>
                          <span
                            className="text-navy font-semibold text-[0.9375rem]"
                            style={{ fontFamily: "var(--font-spectral)" }}
                          >
                            {killer.mistake}
                          </span>
                        </div>
                        <svg
                          className={`w-5 h-5 shrink-0 transition-transform ${
                            isOpen ? "rotate-180 text-coral" : "text-navy/40"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 pt-0 ml-9">
                          <div className="space-y-3">
                            <div>
                              <p className="text-[0.6875rem] font-bold text-red-500/70 uppercase tracking-widest mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                                Why it hurts
                              </p>
                              <p className="text-navy/60 text-[0.875rem] leading-relaxed" style={{ fontFamily: "var(--font-jakarta)" }}>
                                {killer.why}
                              </p>
                            </div>
                            <div>
                              <p className="text-[0.6875rem] font-bold text-coral uppercase tracking-widest mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                                The fix
                              </p>
                              <p className="text-navy/70 text-[0.875rem] leading-relaxed font-medium" style={{ fontFamily: "var(--font-jakarta)" }}>
                                {killer.fix}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── TIMELINE ── */}
            <div id="timeline" className="scroll-mt-24 mb-20">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Your Timeline
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                From planning to keys.
              </h2>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                The earlier you start, the stronger your application. Here is how the timeline
                breaks down.
              </p>

              <div className="space-y-0">
                {TIMELINE_PHASES.map((phase, i) => (
                  <div key={phase.phase} className="relative flex gap-5">
                    {/* Timeline line */}
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full ${phase.color} flex items-center justify-center shrink-0 z-10`}>
                        <span className="text-white font-bold text-[0.75rem]" style={{ fontFamily: "var(--font-jakarta)" }}>
                          {i + 1}
                        </span>
                      </div>
                      {i < TIMELINE_PHASES.length - 1 && (
                        <div className="w-0.5 bg-coral/20 flex-1 min-h-[20px]" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="pb-8 flex-1">
                      <p
                        className="text-coral font-bold text-[0.75rem] uppercase tracking-widest mb-1"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        {phase.phase}
                      </p>
                      <h3
                        className="text-navy font-bold text-[1.0625rem] mb-3"
                        style={{ fontFamily: "var(--font-spectral)" }}
                      >
                        {phase.label}
                      </h3>
                      <ul className="space-y-2">
                        {phase.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-navy/70 text-[0.875rem] leading-relaxed"
                            style={{ fontFamily: "var(--font-jakarta)" }}
                          >
                            <svg className="w-4 h-4 shrink-0 mt-0.5 text-coral" viewBox="0 0 16 16" fill="none">
                              <path d="M4 8.5L7 11l5-6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Warning callout */}
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-3">
                <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.168 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <p
                  className="text-amber-800 text-[0.875rem] leading-relaxed"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  <span className="font-semibold">During the approval process:</span> do not change your business structure,
                  incorporate, add a partner, buy equipment, switch banks, or make major financial
                  moves. The underwriter will re-verify everything.
                </p>
              </div>

              <button
                onClick={handleBookCall}
                className="mt-8 bg-coral text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-coral-dark transition-colors cursor-pointer text-[0.9375rem]"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Review Your Income Options
              </button>
            </div>

            {/* ── WHAT JESSE DOES DIFFERENTLY ── */}
            <div id="what-jesse-does" className="scroll-mt-24 mb-20">
              <p
                className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                The Broker Advantage
              </p>
              <h2
                className="text-[1.75rem] sm:text-[2rem] font-bold text-navy leading-tight mb-4"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Why lender selection matters more for self-employed borrowers.
              </h2>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                A bank evaluates your application against one set of policies. If your income does
                not meet their criteria, the answer is no. A broker evaluates your application
                against 50+ lenders, each with different income assessment policies. That access
                changes everything for self-employed borrowers.
              </p>
              <p
                className="text-[1rem] text-navy-2 leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Knowing which lenders offer stated income programs, which ones add back specific
                deductions, which ones weight recent income more heavily, and which ones accept
                less than two years of history is the difference between an approval and a decline.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Lender matching",
                    body: "Each lender has different self-employed policies. The right match depends on your specific business structure and income profile.",
                  },
                  {
                    title: "File positioning",
                    body: "How the application is structured and presented to an underwriter matters. The file is packaged to highlight income strength, and potential questions are addressed before they are asked.",
                  },
                  {
                    title: "Underwriter communication",
                    body: "Self-employed files generate more underwriter questions. That back-and-forth is handled directly, with context and supporting documents provided to keep the approval moving.",
                  },
                  {
                    title: "Rate negotiation",
                    body: "Self-employed rates do not have to be higher. With the right lender and a well-positioned application, you should expect competitive pricing.",
                  },
                ].map((card) => (
                  <div key={card.title} className="bg-sand rounded-xl p-6">
                    <h3
                      className="text-navy font-bold text-[1.0625rem] mb-2"
                      style={{ fontFamily: "var(--font-spectral)" }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="text-navy/70 text-[0.9375rem] leading-relaxed"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      {card.body}
                    </p>
                  </div>
                ))}
              </div>
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
                Common questions about self-employed mortgages.
              </h2>

              <div className="space-y-3">
                {FAQ_ITEMS.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div
                      key={i}
                      className={`rounded-xl border transition-colors ${
                        isOpen ? "border-coral/20 bg-sand" : "border-sand-2 bg-sand"
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
            Your income does not fit a standard template. Your mortgage application should not
            either.
          </h2>
          <p
            className="text-slate text-[1.0625rem] leading-relaxed max-w-xl mx-auto mb-8"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            One conversation is all it takes to understand your options, identify the right lenders,
            and build a plan that works with your income.
          </p>
          <button
            onClick={handleBookCall}
            className="bg-coral text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-coral-dark transition-colors cursor-pointer text-[0.9375rem]"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Talk Through Your Situation
          </button>
        </div>
      </section>
    </>
  );
}

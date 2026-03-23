"use client";

import Link from "next/link";

const CALCULATORS = [
  {
    name: "Purchase Calculator",
    description: "Enter a home price and see your monthly mortgage payment.",
    href: "/calculators/mortgage-payment",
    icon: "home",
  },
  {
    name: "Affordability",
    description: "Enter your income and down payment. See the maximum home price you can afford.",
    href: "/calculators/affordability",
    icon: "chart",
  },
  {
    name: "Required Income",
    description: "Pick a home price. See the minimum income to qualify.",
    href: "/calculators/required-income",
    icon: "target",
  },
  {
    name: "Debt Service Calculator",
    description: "Check if your income supports the mortgage you want (GDS/TDS).",
    href: "/calculators/debt-service",
    icon: "gauge",
  },
  {
    name: "Land Transfer Tax",
    description: "Ontario and Toronto land transfer tax, calculated to the dollar.",
    href: "/calculators/land-transfer-tax",
    icon: "tax",
  },
  {
    name: "Closing Costs",
    description: "Every cost beyond the down payment, line by line.",
    href: "/calculators/closing-costs",
    icon: "receipt",
  },
  {
    name: "Mortgage Calculator",
    description: "Enter a mortgage amount and see your payment breakdown.",
    href: "/calculators/mortgage-calculator",
    icon: "mortgage",
  },
  {
    name: "Prepayment Penalty",
    description: "Estimate the penalty for breaking your mortgage early.",
    href: "/calculators/prepayment-penalty",
    icon: "penalty",
  },
];

function IconHome() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M4 14L14 5l10 9" stroke="#E8705A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 12.5V23a1 1 0 001 1h4.5v-6h5v6H21a1 1 0 001-1V12.5" stroke="#E8705A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconWallet() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="3" y="7" width="22" height="16" rx="2" stroke="#E8705A" strokeWidth="2" />
      <path d="M3 11h22" stroke="#E8705A" strokeWidth="2" />
      <circle cx="20" cy="17" r="1.5" fill="#E8705A" />
    </svg>
  );
}

function IconGauge() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M14 24c5.523 0 10-4.477 10-10S19.523 4 14 4 4 8.477 4 14s4.477 10 10 10z" stroke="#E8705A" strokeWidth="2" />
      <path d="M14 14l4-6" stroke="#E8705A" strokeWidth="2" strokeLinecap="round" />
      <circle cx="14" cy="14" r="2" fill="#E8705A" />
    </svg>
  );
}

function IconTarget() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="10" stroke="#E8705A" strokeWidth="2" />
      <circle cx="14" cy="14" r="6" stroke="#E8705A" strokeWidth="2" />
      <circle cx="14" cy="14" r="2" fill="#E8705A" />
    </svg>
  );
}

function IconTax() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="5" y="3" width="18" height="22" rx="2" stroke="#E8705A" strokeWidth="2" />
      <path d="M9 9h10M9 13h10M9 17h6" stroke="#E8705A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconReceipt() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M6 4h16a1 1 0 011 1v19l-3-2-3 2-3-2-3 2-3-2-2 1.333V5a1 1 0 011-1z" stroke="#E8705A" strokeWidth="2" strokeLinejoin="round" />
      <path d="M10 10h8M10 14h5" stroke="#E8705A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconMortgage() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="5" y="12" width="18" height="12" rx="2" stroke="#E8705A" strokeWidth="2" />
      <path d="M3 14l11-9 11 9" stroke="#E8705A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 19h6" stroke="#E8705A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconChart() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M4 24V10l8 6 8-10 4 4" stroke="#E8705A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 24h20" stroke="#E8705A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconPenalty() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M7 7l14 14M21 7L7 21" stroke="#E8705A" strokeWidth="2" strokeLinecap="round" />
      <rect x="4" y="4" width="20" height="20" rx="3" stroke="#E8705A" strokeWidth="2" />
    </svg>
  );
}

const ICON_MAP: Record<string, () => React.ReactElement> = {
  home: IconHome,
  wallet: IconWallet,
  gauge: IconGauge,
  target: IconTarget,
  tax: IconTax,
  receipt: IconReceipt,
  mortgage: IconMortgage,
  chart: IconChart,
  penalty: IconPenalty,
};

export default function CalculatorHub() {
  const handleBookCall = () => {
    window.dispatchEvent(new CustomEvent("open-booking-modal"));
  };

  return (
    <section className="bg-navy pt-28 sm:pt-32 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p
            className="text-[0.6875rem] font-semibold text-coral tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Calculator Hub
          </p>
          <h1
            className="text-[2rem] sm:text-[2.5rem] font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Run the numbers yourself<span className="text-coral">.</span>
          </h1>
        </div>

        {/* Flat 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {CALCULATORS.map((calc) => {
            const Icon = ICON_MAP[calc.icon];
            return (
              <Link
                key={calc.name}
                href={calc.href}
                className="group bg-white border border-white/80 rounded-xl p-4 sm:p-5 flex flex-col hover:border-coral/30 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-sand flex items-center justify-center shrink-0">
                    <Icon />
                  </div>
                  <p
                    className="font-bold text-navy text-[0.9375rem] leading-snug"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    {calc.name}
                  </p>
                </div>
                <p
                  className="text-slate text-[0.8125rem] leading-relaxed flex-1 mb-4"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {calc.description}
                </p>
                <span
                  className="text-coral text-[0.8125rem] font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Try this tool
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 7h10M8 3l4 4-4 4"
                      stroke="#E8705A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>

        {/* Footer CTA */}
        <p
          className="text-slate text-[0.875rem]"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Want Jesse to run your exact numbers?{" "}
          <button
            onClick={handleBookCall}
            className="text-coral font-semibold hover:underline cursor-pointer"
          >
            It takes one call.
          </button>
        </p>
      </div>
    </section>
  );
}

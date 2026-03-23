import Link from "next/link";

const CALCULATORS = [
  {
    name: "Purchase Calculator",
    description: "See what your monthly payments look like on any home price.",
    href: "/calculators",
  },
  {
    name: "Affordability",
    description: "See how much mortgage you qualify for based on your income.",
    href: "/calculators",
  },
  {
    name: "Mortgage Calculator",
    description: "Enter a mortgage amount and see your payment breakdown.",
    href: "/calculators/mortgage-calculator",
  },
  {
    name: "Land Transfer Tax",
    description: "Find out what you owe in Ontario and Toronto land transfer taxes.",
    href: "/calculators",
  },
  {
    name: "Closing Costs",
    description: "See the full picture of what you need on closing day.",
    href: "/calculators",
  },
  {
    name: "Required Income",
    description: "Find out what income you need to qualify for any mortgage amount.",
    href: "/calculators",
  },
  {
    name: "Prepayment Penalty",
    description: "Estimate the penalty for breaking your mortgage early.",
    href: "/calculators/prepayment-penalty",
  },
  {
    name: "Mortgage Payment",
    description: "Find out what you will pay each month based on your rate and term.",
    href: "/calculators",
  },
];

function CalcIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="mb-4"
    >
      <rect x="4" y="4" width="24" height="24" rx="3" stroke="#E8705A" strokeWidth="1.75" />
      <rect x="8" y="8" width="6" height="4" rx="1" fill="#E8705A" />
      <rect x="18" y="8" width="6" height="4" rx="1" stroke="#E8705A" strokeWidth="1.5" />
      <rect x="8" y="16" width="4" height="4" rx="1" stroke="#E8705A" strokeWidth="1.5" />
      <rect x="14" y="16" width="4" height="4" rx="1" stroke="#E8705A" strokeWidth="1.5" />
      <rect x="20" y="16" width="4" height="4" rx="1" stroke="#E8705A" strokeWidth="1.5" />
      <rect x="8" y="22" width="4" height="2" rx="1" stroke="#E8705A" strokeWidth="1.5" />
      <rect x="14" y="22" width="4" height="2" rx="1" stroke="#E8705A" strokeWidth="1.5" />
      <rect x="20" y="22" width="4" height="2" rx="1" stroke="#E8705A" strokeWidth="1.5" />
    </svg>
  );
}

export default function CalculatorHub() {
  return (
    <section className="bg-navy py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <p
          className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Calculators
        </p>
        <h2
          className="text-[2rem] sm:text-[2.5rem] font-bold text-white leading-tight mb-4"
          style={{ fontFamily: "var(--font-spectral)" }}
        >
          Run the numbers yourself.
        </h2>
        <p
          className="text-[1rem] text-slate mb-12 max-w-xl"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Eight tools. No forms. No commitment. Start with a number, end with clarity.
        </p>

        {/* 4-column grid, 2 rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {CALCULATORS.map((calc) => (
            <Link
              key={calc.name}
              href={calc.href}
              className="group bg-white rounded-xl p-6 flex flex-col hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] transition-all duration-200"
            >
              <CalcIcon />
              <p
                className="font-bold text-navy text-[0.9375rem] mb-2"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {calc.name}
              </p>
              <p
                className="text-slate text-[0.8125rem] leading-relaxed flex-1"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {calc.description}
              </p>
              <span
                className="mt-4 text-coral text-[0.8125rem] font-semibold group-hover:underline flex items-center gap-1"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Try this tool
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="#E8705A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        {/* Footer link */}
        <p
          className="text-slate text-[0.875rem]"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Not sure what numbers to use?{" "}
          <Link
            href="/contact"
            className="text-coral font-semibold hover:underline"
          >
            Talk to Jesse
          </Link>
        </p>
      </div>
    </section>
  );
}

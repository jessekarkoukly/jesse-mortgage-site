"use client";

const ROWS = [
  {
    label: "Lender access",
    bank: "One lender, one set of products",
    broker: "50+ lenders, hundreds of products",
  },
  {
    label: "Rate shopping",
    bank: "You visit each bank individually",
    broker: "Done for you across the full market",
  },
  {
    label: "Self-employed income",
    bank: "Strict net-income criteria",
    broker: "Lenders matched to your income type",
  },
  {
    label: "If you get declined",
    bank: "Start over somewhere else",
    broker: "Moved to a lender that fits",
  },
  {
    label: "Cost to you",
    bank: "Lender sets the rate",
    broker: "Free. Lenders compete for your business",
  },
  {
    label: "Who they work for",
    bank: "The bank",
    broker: "You",
  },
];

function XIcon() {
  return (
    <span className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M3 3l6 6M9 3l-6 6" stroke="#C0514A" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function CheckIcon() {
  return (
    <span className="w-6 h-6 rounded-full bg-coral/15 flex items-center justify-center shrink-0">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M2.5 6.5L5 9l4.5-6" stroke="#E8705A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function BrokerVsBank() {
  return (
    <section className="bg-navy py-16 md:py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <p
          className="text-[0.6875rem] font-semibold text-coral tracking-[0.2em] uppercase mb-3 text-center"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Why Work With a Broker
        </p>
        <h2
          className="text-[1.75rem] sm:text-[2.25rem] font-bold text-white leading-tight mb-12 text-center"
          style={{ fontFamily: "var(--font-spectral)" }}
        >
          The bank works for the bank<span className="text-coral">.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {/* Bank column */}
          <div className="bg-navy-2 rounded-2xl border border-white/10 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/10">
              <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M10 2L2 7h16L10 2z" stroke="#8A9BAA" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M4 7v8M8 7v8M12 7v8M16 7v8" stroke="#8A9BAA" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M2 15h16M3 17h14" stroke="#8A9BAA" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <h3
                className="text-sand font-bold text-[1.125rem]"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                The bank
              </h3>
            </div>
            <div className="space-y-5">
              {ROWS.map((row) => (
                <div key={row.label} className="flex items-start gap-3">
                  <XIcon />
                  <div>
                    <p
                      className="text-sand font-semibold text-[0.8125rem] mb-0.5"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      {row.label}
                    </p>
                    <p
                      className="text-slate text-[0.9375rem] leading-snug"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      {row.bank}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Broker column */}
          <div className="bg-white rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6 pb-5 border-b border-sand-2">
              <span className="w-10 h-10 rounded-xl bg-coral/15 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M10 2l2.5 5 5.5.8-4 3.9.9 5.3L10 14.5 5.1 17l.9-5.3-4-3.9 5.5-.8L10 2z" stroke="#E8705A" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </span>
              <h3
                className="text-navy font-bold text-[1.125rem]"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                Your broker
              </h3>
            </div>
            <div className="space-y-5">
              {ROWS.map((row) => (
                <div key={row.label} className="flex items-start gap-3">
                  <CheckIcon />
                  <div>
                    <p
                      className="text-navy font-semibold text-[0.8125rem] mb-0.5"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      {row.label}
                    </p>
                    <p
                      className="text-navy-2 text-[0.9375rem] leading-snug"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      {row.broker}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

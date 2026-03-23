"use client";

/*
 * RATES PAGE
 * Displays Sherwood Mortgage Group's current rate specials.
 * Source: https://sherwoodmortgagegroup.com/en/mortgage-rates
 *
 * TO UPDATE: Change the RATES array and PRIME_RATE below.
 * These come directly from Sherwood's website.
 */

const PRIME_RATE = "4.45%";

const RATES = [
  { term: "1 year fixed", rate: "4.99%", note: null },
  { term: "2 year fixed", rate: "4.34%", note: null },
  { term: "3 year fixed", rate: "3.79%", note: null },
  { term: "4 year fixed", rate: "4.24%", note: null },
  { term: "5 year fixed", rate: "3.99%", note: "High ratio only" },
  {
    term: "5 year variable",
    rate: "3.55%",
    note: `Prime minus 0.90%`,
  },
];

export default function RatesContent() {
  const handleBookCall = () => {
    window.dispatchEvent(new CustomEvent("open-booking-modal"));
  };

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-3xl px-5 pt-28 pb-16 md:pt-36 md:pb-20 text-center">
          <p
            className="text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-coral mb-6"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Sherwood Mortgage Group &middot; Rate Specials
          </p>
          <h1
            className="text-[2rem] md:text-[2.75rem] leading-[1.15] font-bold mb-6"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Current mortgage rates
          </h1>
          <p
            className="text-sand/80 text-[1.0625rem] md:text-[1.125rem] leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            These are rate specials available through Sherwood Mortgage Group.
            Your actual rate depends on your down payment, credit, property type,
            and which lender is the best fit.
          </p>
        </div>
      </section>

      {/* ── Sherwood intro ── */}
      <section className="bg-sand py-14 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="text-[1.125rem] md:text-[1.25rem] text-navy leading-relaxed"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            As a reputable and established brokerage, Sherwood Mortgage Group has
            forged longstanding, trusting relationships with lenders and industry
            partners. This enables access to promotional rates, competitive
            offers, and early access to new products that are not readily
            available in the general market.
          </p>
        </div>
      </section>

      {/* ── Rate Table ── */}
      <section className="bg-white py-16 px-6">
        <div className="mx-auto max-w-2xl">
          <div className="overflow-hidden rounded-xl border border-sand-2">
            <table
              className="w-full text-left"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              <thead>
                <tr className="bg-navy text-sand">
                  <th className="py-4 px-6 text-[0.875rem] font-semibold">
                    Term
                  </th>
                  <th className="py-4 px-6 text-[0.875rem] font-semibold text-right">
                    Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {RATES.map((row, i) => (
                  <tr
                    key={row.term}
                    className={`border-b border-sand-2 ${
                      i % 2 === 1 ? "bg-sand/40" : ""
                    }`}
                  >
                    <td className="py-4 px-6">
                      <p className="text-[0.9375rem] font-semibold text-navy">
                        {row.term}
                      </p>
                      {row.note && (
                        <p className="text-[0.75rem] text-slate mt-0.5">
                          {row.note}
                        </p>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span
                        className="text-[1.5rem] font-bold text-coral"
                        style={{ fontFamily: "var(--font-spectral)" }}
                      >
                        {row.rate}
                        {row.note === "High ratio only" && "**"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Fine print */}
          <p
            className="text-[0.6875rem] text-slate leading-relaxed mt-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Current Prime Rate: {PRIME_RATE}. *Rates may vary provincially and
            are subject to change without notice OAC. **High Ratio only.
            Conditions may apply. May be subject to additional qualifying
            criteria and rate premiums.
          </p>
          <a
            href="https://sherwoodmortgagegroup.com/en/mortgage-rates"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[0.6875rem] font-semibold text-coral hover:underline mt-2"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            View rates on Sherwood&rsquo;s website
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>

      {/* ── Context section ── */}
      <section className="bg-sand py-16 px-6">
        <div className="mx-auto max-w-2xl">
          <h2
            className="text-[1.75rem] md:text-[2rem] font-bold text-navy mb-6"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            A rate is just one part of the picture
          </h2>
          <p
            className="text-[1rem] text-navy-2 leading-relaxed mb-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            The rate you see advertised is a starting point. What you actually
            qualify for depends on your down payment size, credit score,
            employment type, the property itself, and whether your mortgage is
            insured or uninsured.
          </p>
          <p
            className="text-[1rem] text-navy-2 leading-relaxed mb-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Two people buying at the same price can end up with different rates
            based on these factors. That is normal. The rate table above shows
            what is available at the best end of the spectrum.
          </p>
          <p
            className="text-[1rem] text-navy-2 leading-relaxed"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Jesse looks at your full situation, compares across 50+ lenders
            (not just the ones above), and tells you exactly what rate you can
            get and why. The posted specials are often beatable depending on
            your file.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-navy text-white py-20 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="text-[1.75rem] md:text-[2.5rem] font-bold mb-8"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Want to know your actual rate?
          </h2>
          <button
            onClick={handleBookCall}
            className="bg-coral text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-coral-dark hover:scale-[1.03] active:scale-95 transition-all cursor-pointer text-[0.9375rem] mb-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Book a Call
          </button>
          <p
            className="text-sand/70 text-[0.9375rem]"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            or email me at{" "}
            <a
              href="mailto:jkarkoukly@sherwoodmortgagegroup.com"
              className="text-coral hover:underline"
            >
              jkarkoukly@sherwoodmortgagegroup.com
            </a>
          </p>
        </div>
      </section>
    </>
  );
}

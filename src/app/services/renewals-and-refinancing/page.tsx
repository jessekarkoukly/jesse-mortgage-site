import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Mortgage Renewals and Refinancing | Toronto Mortgage Agent",
  description:
    "Toronto mortgage agent Jesse Karkoukly explains why renewal is a moment to act. Compare rates, switch lenders, or refinance to access equity. Do not let your lender auto-renew you.",
  openGraph: {
    title: "Mortgage Renewals and Refinancing | Toronto Mortgage Agent",
    description:
      "Renewal is one of the best opportunities in your mortgage cycle. Jesse Karkoukly helps Toronto homeowners compare options, switch lenders, and access equity through refinancing.",
    url: "https://jessekarkoukly.com/services/renewals-and-refinancing",
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

export default function RenewalsRefinancingPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[{ name: "Services", href: "/services" }, { name: "Renewals & Refinancing", href: "/services/renewals-and-refinancing" }]} />
      {/* Hero */}
      <section className="bg-sand pt-16 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p
            className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Services / Renewals and Refinancing
          </p>
          <h1
            className="text-[2.5rem] sm:text-[3rem] font-bold text-navy leading-tight mb-6 max-w-3xl"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Mortgage Renewals and Refinancing in Toronto
          </h1>
          <p
            className="text-[1.125rem] text-navy-2 leading-relaxed max-w-2xl"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Renewal is one of the most underused opportunities in your mortgage cycle. Most people accept whatever their bank sends them. There is usually a better option.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          {/* Renewal */}
          <div>
            <p
              className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Renewal
            </p>
            <h2
              className="text-[1.75rem] font-bold text-navy mb-5"
              style={{ fontFamily: "var(--font-spectral)" }}
            >
              Why renewal is a moment to act
            </h2>
            <div
              className="flex flex-col gap-4 text-[1rem] text-navy-2 leading-relaxed"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              <p>
                When your mortgage term ends, you have a decision to make. Your current lender will send a renewal offer, often 90 to 120 days before your maturity date. That offer is a starting point, not a final answer. Lenders know that most borrowers renew without shopping around, which is why renewal offers are rarely their best rates.
              </p>
              <p>
                At renewal, you can switch lenders without paying a penalty. That is the key difference from breaking your mortgage mid-term. No penalty means the full spread in rates is available to you. On a $600,000 mortgage balance, a 0.5% rate difference is roughly $3,000 per year in interest. Over a five-year term, that is significant.
              </p>
              <p>
                Renewal is also a chance to reconsider your term length, fixed versus variable, and whether your payment structure still fits your life. Things change over five years. Your renewal should reflect where you are now.
              </p>
            </div>
          </div>

          {/* Switching Lenders */}
          <div>
            <p
              className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Switching
            </p>
            <h2
              className="text-[1.75rem] font-bold text-navy mb-5"
              style={{ fontFamily: "var(--font-spectral)" }}
            >
              How switching lenders works
            </h2>
            <div
              className="flex flex-col gap-4 text-[1rem] text-navy-2 leading-relaxed"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              <p>
                Switching lenders at renewal is simpler than most people assume. If you are not increasing your mortgage balance or amortization, a switch is treated as a straight transfer. Most lenders cover the legal and appraisal costs to win your business.
              </p>
              <p>
                You will need to re-qualify with the new lender, which means providing updated income and employment documentation. The stress test still applies. If your financial situation has changed significantly since your original approval, that is worth reviewing before we start shopping.
              </p>
              <p>
                I handle the comparison across 50+ lenders and bring you real options with full terms, not just rates. Some of the best deals available in Canada come from monoline lenders you will never walk into a branch of.
              </p>
            </div>
          </div>

          {/* Refinancing */}
          <div>
            <p
              className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Refinancing
            </p>
            <h2
              className="text-[1.75rem] font-bold text-navy mb-5"
              style={{ fontFamily: "var(--font-spectral)" }}
            >
              Refinancing to access equity
            </h2>
            <div
              className="flex flex-col gap-4 text-[1rem] text-navy-2 leading-relaxed"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              <p>
                Refinancing means breaking your current mortgage early and replacing it with a new one, usually at a higher balance to access equity. The trade-off is a prepayment penalty. Whether it makes financial sense depends on the size of the penalty, the rate improvement available, and what you plan to do with the funds.
              </p>
              <p>
                Common reasons to refinance include consolidating high-interest debt, funding a renovation, or restructuring payments. In some cases, the interest savings from consolidating debt far outweigh the penalty. In others, it is better to wait for renewal. I work through the math with you so you can make an informed call.
              </p>
              <p>
                You can access up to 80% of your home's appraised value through a refinance. If you have significant equity built up over several years of ownership, this can be a meaningful amount of capital.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2
              className="text-[1.75rem] sm:text-[2rem] font-bold text-white leading-tight mb-2"
              style={{ fontFamily: "var(--font-spectral)" }}
            >
              Renewal coming up? Let us take a look.
            </h2>
            <p
              className="text-[1rem] text-slate leading-relaxed"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Even 90 days out, there is time to compare and switch if it makes sense.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 bg-coral text-white font-semibold px-7 py-3.5 rounded hover:bg-coral/90 transition-colors"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Book a Call
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

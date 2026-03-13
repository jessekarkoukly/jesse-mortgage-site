import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PrepaymentPenaltyCalculator from "@/components/calculators/PrepaymentPenaltyCalculator";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title:
    "Prepayment Penalty Calculator | Break Your Mortgage | Jesse Karkoukly",
  description:
    "Calculate the estimated penalty for breaking your mortgage early. Covers fixed and variable rate penalties, IRD calculations, and big bank vs monoline differences.",
  keywords: [
    "mortgage prepayment penalty calculator",
    "break mortgage penalty Canada",
    "IRD calculator",
    "mortgage penalty calculator Ontario",
    "3 months interest penalty",
    "interest rate differential calculator",
  ],
  openGraph: {
    title: "Prepayment Penalty Calculator | Jesse Karkoukly",
    description:
      "Estimate the penalty for breaking your mortgage early. Fixed and variable rate penalties calculated instantly.",
    url: "https://jessekarkoukly.com/calculators/prepayment-penalty",
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

export default function PrepaymentPenaltyPage() {
  return (
    <PageShell hideFloatingCTAs>
      <BreadcrumbJsonLd items={[{ name: "Calculators", href: "/calculators" }, { name: "Prepayment Penalty", href: "/calculators/prepayment-penalty" }]} />
      <section className="bg-sand pt-16">
        <div className="max-w-6xl mx-auto px-5 py-10">
          <p
            className="text-[0.8125rem] font-semibold text-coral tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Prepayment Penalty Calculator
          </p>
          <h1
            className="text-[2rem] md:text-[2.5rem] font-bold text-navy leading-tight mb-3"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            What Will It Cost to Break My Mortgage<span className="text-coral">?</span>
          </h1>
          <p
            className="text-navy-2 text-[1.0625rem] leading-relaxed max-w-2xl mb-2"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Enter your mortgage details to estimate the penalty for breaking your term early.
            The calculation depends on your rate type, lender, and how much time is left.
          </p>
        </div>
      </section>
      <section className="bg-white pb-20">
        <PrepaymentPenaltyCalculator />
      </section>
    </PageShell>
  );
}

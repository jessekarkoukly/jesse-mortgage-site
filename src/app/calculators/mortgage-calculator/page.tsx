import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import MortgageCalculator from "@/components/calculators/MortgageCalculator";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title:
    "Mortgage Calculator | Monthly Payment Calculator | Jesse Karkoukly",
  description:
    "Calculate your mortgage payment with Canadian semi-annual compounding. Enter your mortgage amount, rate, and amortization to see principal, interest, and balance over your term.",
  keywords: [
    "mortgage calculator",
    "mortgage payment calculator Canada",
    "monthly mortgage payment",
    "mortgage amortization calculator",
    "Canadian mortgage calculator",
    "Toronto mortgage calculator",
  ],
  openGraph: {
    title: "Mortgage Calculator | Jesse Karkoukly",
    description:
      "Calculate your mortgage payment with Canadian semi-annual compounding. See principal, interest, and balance over your term.",
    url: "https://jessekarkoukly.com/calculators/mortgage-calculator",
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

export default function MortgageCalculatorPage() {
  return (
    <PageShell hideFloatingCTAs>
      <BreadcrumbJsonLd items={[{ name: "Calculators", href: "/calculators" }, { name: "Mortgage Calculator", href: "/calculators/mortgage-calculator" }]} />
      <section className="bg-sand pt-16">
        <div className="max-w-6xl mx-auto px-5 py-10">
          <p
            className="text-[0.8125rem] font-semibold text-coral tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Mortgage Calculator
          </p>
          <h1
            className="text-[2rem] md:text-[2.5rem] font-bold text-navy leading-tight mb-3"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            What Will I Pay Monthly<span className="text-coral">?</span>
          </h1>
          <p
            className="text-navy-2 text-[1.0625rem] leading-relaxed max-w-2xl mb-2"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Enter your mortgage amount, rate, and amortization to see
            your payment broken down by principal and interest.
          </p>
        </div>
      </section>
      <section className="bg-white pb-20">
        <MortgageCalculator />
      </section>
    </PageShell>
  );
}

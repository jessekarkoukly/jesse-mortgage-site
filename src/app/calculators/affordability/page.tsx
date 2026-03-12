import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import AffordabilityCalculator from "@/components/calculators/AffordabilityCalculator";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title:
    "How Much Can I Afford? | Mortgage Affordability Calculator | Jesse Karkoukly",
  description:
    "Enter your income, down payment, and debts to see how much mortgage you can afford. Canadian stress test applied. GDS and TDS ratios calculated instantly.",
  keywords: [
    "mortgage affordability calculator",
    "how much mortgage can I afford",
    "mortgage calculator Canada",
    "GDS TDS calculator",
    "stress test calculator",
    "Toronto mortgage affordability",
  ],
  openGraph: {
    title: "How Much Can I Afford? | Mortgage Affordability Calculator | Jesse Karkoukly",
    description:
      "Enter your income, down payment, and debts to see how much mortgage you can afford. Canadian stress test and CMHC insurance calculated instantly.",
    url: "https://jessekarkoukly.com/calculators/affordability",
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

export default function AffordabilityPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[{ name: "Calculators", href: "/calculators" }, { name: "Affordability", href: "/calculators/affordability" }]} />
      <section className="bg-sand pt-16">
        <div className="max-w-6xl mx-auto px-5 py-10">
          <p
            className="text-[0.8125rem] font-semibold text-coral tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Max Mortgage Calculator
          </p>
          <h1
            className="text-[2rem] md:text-[2.5rem] font-bold text-navy leading-tight mb-3"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            How Much Can I Afford<span className="text-coral">?</span>
          </h1>
          <p
            className="text-navy-2 text-[1.0625rem] leading-relaxed max-w-2xl mb-2"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Calculate the maximum mortgage you can afford.
          </p>
        </div>
      </section>
      <section className="bg-white pb-20">
        <AffordabilityCalculator />
      </section>
    </PageShell>
  );
}

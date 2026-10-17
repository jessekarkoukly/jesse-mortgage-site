import type { Metadata } from "next";
import { social } from "@/lib/seo";
import PageShell from "@/components/PageShell";
import DebtServiceCalculator from "@/components/calculators/DebtServiceCalculator";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title:
    "GDS and TDS Calculator | Debt Service Ratios",
  description:
    "Check your GDS and TDS ratios and see whether you fit Canadian lending limits. A quick way to test if a mortgage payment is affordable.",
  keywords: [
    "GDS calculator",
    "TDS calculator",
    "debt service ratio calculator",
    "mortgage qualification calculator Canada",
    "stress test calculator mortgage",
    "GDS TDS mortgage Canada",
  ],
  ...social("GDS and TDS Calculator | Debt Service Ratios", "Check your GDS and TDS ratios and see whether you fit Canadian lending limits. A quick way to test if a mortgage payment is affordable.", "/calculators/debt-service"),
  alternates: { canonical: "/calculators/debt-service" },
};

export default function DebtServicePage() {
  return (
    <PageShell hideFloatingCTAs>
      <BreadcrumbJsonLd items={[{ name: "Calculators", href: "/calculators" }, { name: "Debt Service Ratios", href: "/calculators/debt-service" }]} />
      <section className="bg-sand pt-16">
        <div className="max-w-6xl mx-auto px-5 py-10">
          <p
            className="text-[0.8125rem] font-semibold text-coral tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Debt Service Calculator
          </p>
          <h1
            className="text-[2rem] md:text-[2.5rem] font-bold text-navy leading-tight mb-3"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Can I Afford This Mortgage<span className="text-coral">?</span>
          </h1>
          <p
            className="text-navy-2 text-[1.0625rem] leading-relaxed max-w-2xl mb-2"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Enter your income, debts, and the mortgage you want. This calculator tells you
            whether lenders would approve it based on Canada&#39;s debt service rules (GDS and TDS ratios).
          </p>
        </div>
      </section>
      <section className="bg-white pb-20">
        <DebtServiceCalculator />
      </section>
    </PageShell>
  );
}

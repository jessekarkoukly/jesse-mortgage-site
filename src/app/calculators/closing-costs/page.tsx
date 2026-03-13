import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ClosingCostsCalculator from "@/components/calculators/ClosingCostsCalculator";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title:
    "Closing Costs Calculator | Ontario & Toronto | Jesse Karkoukly",
  description:
    "Estimate your closing costs for buying a home in Ontario or Toronto. Includes land transfer tax, CMHC insurance, legal fees, HST on new builds, and more.",
  keywords: [
    "closing costs calculator Ontario",
    "Toronto closing costs",
    "land transfer tax calculator",
    "Ontario LTT calculator",
    "Toronto MLTT calculator",
    "CMHC insurance calculator",
    "home buying costs Ontario",
  ],
  openGraph: {
    title: "Closing Costs Calculator | Ontario & Toronto | Jesse Karkoukly",
    description:
      "Estimate your total closing costs for buying in Ontario or Toronto. Land transfer tax, CMHC, legal fees, and more.",
    url: "https://jessekarkoukly.com/calculators/closing-costs",
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

export default function ClosingCostsPage() {
  return (
    <PageShell hideFloatingCTAs>
      <BreadcrumbJsonLd items={[{ name: "Calculators", href: "/calculators" }, { name: "Closing Costs", href: "/calculators/closing-costs" }]} />
      <section className="bg-sand pt-16">
        <div className="max-w-6xl mx-auto px-5 py-10">
          <p
            className="text-[0.8125rem] font-semibold text-coral tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Closing Costs Calculator
          </p>
          <h1
            className="text-[2rem] md:text-[2.5rem] font-bold text-navy leading-tight mb-3"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            What Will I Pay on Closing Day<span className="text-coral">?</span>
          </h1>
          <p
            className="text-navy-2 text-[1.0625rem] leading-relaxed max-w-2xl mb-2"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Beyond your down payment, there are land transfer taxes, legal fees, title insurance,
            and other costs due on closing day. This gives you a line-by-line estimate so
            there are no surprises.
          </p>
        </div>
      </section>
      <section className="bg-white py-12 pb-20">
        <ClosingCostsCalculator />
      </section>
    </PageShell>
  );
}

import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import LandTransferTaxCalculator from "@/components/calculators/LandTransferTaxCalculator";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title:
    "Land Transfer Tax Calculator | Ontario & Toronto LTT | Jesse Karkoukly",
  description:
    "Calculate your Ontario and Toronto land transfer tax. See bracket-by-bracket breakdowns, first-time buyer rebates, and total LTT owing on your home purchase.",
  keywords: [
    "land transfer tax calculator",
    "Ontario land transfer tax",
    "Toronto land transfer tax",
    "MLTT calculator",
    "first-time buyer rebate Ontario",
    "LTT Ontario Toronto",
  ],
  openGraph: {
    title:
      "Land Transfer Tax Calculator | Ontario & Toronto LTT | Jesse Karkoukly",
    description:
      "Calculate your Ontario and Toronto land transfer tax with bracket breakdowns and first-time buyer rebates.",
    url: "https://jessekarkoukly.com/calculators/land-transfer-tax",
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

export default function LandTransferTaxPage() {
  return (
    <PageShell hideFloatingCTAs>
      <BreadcrumbJsonLd items={[{ name: "Calculators", href: "/calculators" }, { name: "Land Transfer Tax", href: "/calculators/land-transfer-tax" }]} />
      <section className="bg-sand pt-16">
        <div className="max-w-6xl mx-auto px-5 py-10">
          <p
            className="text-[0.8125rem] font-semibold text-coral tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Land Transfer Tax Calculator
          </p>
          <h1
            className="text-[2rem] md:text-[2.5rem] font-bold text-navy leading-tight mb-3"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            How Much Is Land Transfer Tax<span className="text-coral">?</span>
          </h1>
          <p
            className="text-navy-2 text-[1.0625rem] leading-relaxed max-w-2xl mb-2"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Enter your purchase price and see exactly what you owe in Ontario land transfer tax.
            If you&#39;re buying in Toronto, the municipal tax is added automatically. First-time
            buyer rebates are applied when they qualify.
          </p>
        </div>
      </section>
      <section className="bg-white pb-20">
        <LandTransferTaxCalculator />
      </section>

      {/* Explainer */}
      <section className="bg-sand py-14 px-5">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-[1.5rem] md:text-[1.75rem] font-bold text-navy mb-6"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Toronto, Ontario<span className="text-coral">.</span>
          </h2>
          <div
            className="flex flex-col gap-5 text-[0.9375rem] text-navy-2 leading-relaxed"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            <p>
              Ontario land transfer tax is calculated based on the property value. The first
              $55,000 is taxed at 0.5%, then $55,000 to $250,000 at 1%, the portion up to
              $400,000 at 1.5%, and the remaining balance up to $2,000,000 at 2%. Since
              January 1, 2017, any amount above $2,000,000 is taxed at 2.5%.
            </p>
            <p>
              If your property is in Toronto, there is an additional municipal land transfer
              tax (MLTT) on top of the provincial one. Toronto is the only municipality in
              Ontario that charges this second tax. The brackets mirror the provincial rates
              but are calculated separately.
            </p>
            <p>
              Ontario offers a rebate of up to $4,000 for first-time home buyers, which fully
              covers the provincial tax on properties up to $368,333. Toronto also offers a
              rebate of up to $4,475 for first-time buyers, fully covering the municipal tax
              on properties up to $400,000. You must be a Canadian citizen or permanent resident
              and occupy the property within nine months to qualify for the Toronto rebate.
            </p>
            <p>
              The calculator above does all the number crunching for you. Select your location,
              check the first-time buyer box if it applies, and you will see the exact breakdown
              by bracket.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import RequiredIncomeCalculator from "@/components/calculators/RequiredIncomeCalculator";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title:
    "Required Income Calculator | Jesse Karkoukly",
  description:
    "Find out the minimum household income needed to qualify for a mortgage in Canada. Includes CMHC insurance, stress test, and GDS/TDS calculations. Toronto mortgage calculator.",
  keywords: [
    "required income calculator",
    "how much income to qualify for mortgage",
    "mortgage qualification income Canada",
    "CMHC insurance calculator",
    "stress test income calculator",
    "GDS TDS income requirement",
  ],
  openGraph: {
    title: "Required Income Calculator | Jesse Karkoukly",
    description:
      "Calculate the minimum household income needed to qualify for a mortgage in Canada. Includes CMHC insurance and stress test.",
    url: "https://jessekarkoukly.com/calculators/required-income",
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

export default function RequiredIncomePage() {
  return (
    <PageShell hideFloatingCTAs>
      <BreadcrumbJsonLd items={[{ name: "Calculators", href: "/calculators" }, { name: "Required Income", href: "/calculators/required-income" }]} />
      <section className="bg-sand pt-16">
        <div className="max-w-6xl mx-auto px-5 py-10">
          <p
            className="text-[0.8125rem] font-semibold text-coral tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Required Income Calculator
          </p>
          <h1
            className="text-[2rem] md:text-[2.5rem] font-bold text-navy leading-tight mb-3"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Required Income<span className="text-coral">.</span>
          </h1>
          <p
            className="text-navy-2 text-[1.0625rem] leading-relaxed max-w-2xl mb-2"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Enter your mortgage amount and monthly obligations. This tells you the minimum
            household income needed to qualify, with the stress test already factored in.
          </p>
        </div>
      </section>
      <section className="bg-white pb-20">
        <RequiredIncomeCalculator />
      </section>
    </PageShell>
  );
}

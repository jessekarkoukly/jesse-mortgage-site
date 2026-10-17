import type { Metadata } from "next";
import { social } from "@/lib/seo";
import PageShell from "@/components/PageShell";
import PurchaseCalculatorWrapper from "@/components/calculators/PurchaseCalculatorWrapper";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title:
    "Monthly Payment Calculator by Home Price",
  description:
    "Enter a home price and down payment to see your monthly mortgage payment, with Canadian semi-annual compounding.",
  keywords: [
    "mortgage payment calculator",
    "mortgage calculator Canada",
    "monthly mortgage payment",
    "mortgage amortization calculator",
    "Canadian mortgage calculator",
    "Toronto mortgage calculator",
  ],
  ...social("Monthly Payment Calculator by Home Price", "Enter a home price and down payment to see your monthly mortgage payment, with Canadian semi-annual compounding.", "/calculators/mortgage-payment"),
  alternates: { canonical: "/calculators/mortgage-payment" },
};

export default function MortgagePaymentPage() {
  return (
    <PageShell hideFloatingCTAs>
      <BreadcrumbJsonLd items={[{ name: "Calculators", href: "/calculators" }, { name: "Mortgage Payment", href: "/calculators/mortgage-payment" }]} />
      <section className="bg-sand pt-16">
        <div className="max-w-6xl mx-auto px-5 py-10">
          <p
            className="text-[0.8125rem] font-semibold text-coral tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Purchase Calculator
          </p>
          <h1
            className="text-[2rem] md:text-[2.5rem] font-bold text-navy leading-tight mb-3"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            What Will It Cost Me<span className="text-coral">?</span>
          </h1>
          <p
            className="text-navy-2 text-[1.0625rem] leading-relaxed max-w-2xl mb-2"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Calculate your total monthly cost and the minimum required down
            payment.
          </p>
        </div>
      </section>
      <section className="bg-white pb-20">
        <PurchaseCalculatorWrapper />
      </section>
    </PageShell>
  );
}

import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PurchaseCalculatorWrapper from "@/components/calculators/PurchaseCalculatorWrapper";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title:
    "What Will I Pay Monthly? | Mortgage Payment Calculator | Jesse Karkoukly",
  description:
    "Calculate your monthly mortgage payment with Canadian semi-annual compounding. See principal, interest, and balance over your term. Toronto mortgage calculator.",
  keywords: [
    "mortgage payment calculator",
    "mortgage calculator Canada",
    "monthly mortgage payment",
    "mortgage amortization calculator",
    "Canadian mortgage calculator",
    "Toronto mortgage calculator",
  ],
  openGraph: {
    title:
      "What Will I Pay Monthly? | Mortgage Payment Calculator | Jesse Karkoukly",
    description:
      "Calculate your monthly mortgage payment with Canadian semi-annual compounding. See principal, interest, and balance over your term.",
    url: "https://jessekarkoukly.com/calculators/mortgage-payment",
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

export default function MortgagePaymentPage() {
  return (
    <PageShell>
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

import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import CompareSideBySide from "@/components/calculators/CompareSideBySide";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title:
    "Compare Mortgage Scenarios | Side by Side Calculator | Jesse Karkoukly",
  description:
    "Compare two mortgage scenarios side by side. See monthly payments, interest costs, and balance remaining over the term. Canadian semi-annual compounding. Toronto mortgage calculator.",
  keywords: [
    "compare mortgage rates",
    "side by side mortgage calculator",
    "fixed vs variable mortgage calculator",
    "mortgage comparison tool Canada",
    "Toronto mortgage calculator",
  ],
  openGraph: {
    title:
      "Compare Mortgage Scenarios | Side by Side Calculator | Jesse Karkoukly",
    description:
      "Compare two mortgage scenarios side by side. See monthly payments, interest costs, and balance remaining over the term.",
    url: "https://jessekarkoukly.com/calculators/compare",
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

export default function ComparePage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[{ name: "Calculators", href: "/calculators" }, { name: "Compare Mortgages", href: "/calculators/compare" }]} />
      <section className="bg-sand pt-16">
        <div className="max-w-6xl mx-auto px-5 py-10">
          <p
            className="text-[0.8125rem] font-semibold text-coral tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Compare Side by Side
          </p>
          <h1
            className="text-[2rem] md:text-[2.5rem] font-bold text-navy leading-tight mb-3"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Which Mortgage Costs Less<span className="text-coral">?</span>
          </h1>
          <p
            className="text-navy-2 text-[1.0625rem] leading-relaxed max-w-2xl mb-2"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Two rates, two terms, or two lender offers. Put them side by side and see the
            monthly payment difference, the 5-year interest cost, and which option saves you more.
          </p>
        </div>
      </section>
      <section className="bg-white pt-4 pb-20">
        <CompareSideBySide />
      </section>
    </PageShell>
  );
}

import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import CalculatorHub from "@/components/calculators/CalculatorHub";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Mortgage Calculators | Toronto Mortgage Agent Jesse Karkoukly",
  description:
    "Free mortgage calculators from Toronto mortgage agent Jesse Karkoukly. Payment, affordability, land transfer tax, closing costs, and more.",
  alternates: { canonical: "/calculators" },
  keywords: [
    "mortgage calculator Ontario",
    "affordability calculator",
    "land transfer tax calculator Ontario",
    "mortgage payment calculator Canada",
    "closing cost calculator Toronto",
    "CMHC insurance calculator",
  ],
  openGraph: {
    title: "Mortgage Calculators | Toronto Mortgage Agent Jesse Karkoukly",
    description:
      "Run your own mortgage numbers. Eight calculators built for Ontario buyers.",
    url: "https://jessekarkoukly.com/calculators",
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

export default function CalculatorsPage() {
  return (
    <PageShell hideFloatingCTAs>
      <BreadcrumbJsonLd items={[{ name: "Calculators", href: "/calculators" }]} />
      <CalculatorHub />
    </PageShell>
  );
}

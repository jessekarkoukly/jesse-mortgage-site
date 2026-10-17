import type { Metadata } from "next";
import { DEBT_CONSOLIDATION_FAQ } from "@/data/faqs/debt-consolidation";
import { social } from "@/lib/seo";
import PageShell from "@/components/PageShell";
import DebtConsolidationContent from "@/components/services/DebtConsolidationContent";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title:
    "Debt Consolidation Mortgage, Toronto | Jesse Karkoukly",
  description:
    "Roll credit card, car loan and personal debt into one mortgage payment. See if consolidating makes sense, with a calculator to check the math.",
  keywords: [
    "debt consolidation mortgage Toronto",
    "debt consolidation Ontario",
    "consolidate credit card debt mortgage",
    "home equity debt consolidation",
    "HELOC debt consolidation Toronto",
    "refinance to consolidate debt",
    "mortgage broker debt consolidation",
    "second mortgage debt consolidation",
  ],
  ...social("Debt Consolidation Mortgage, Toronto | Jesse Karkoukly", "Roll credit card, car loan and personal debt into one mortgage payment. See if consolidating makes sense, with a calculator to check the math.", "/services/debt-consolidation"),
  alternates: { canonical: "/services/debt-consolidation" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: DEBT_CONSOLIDATION_FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Debt Consolidation Mortgage",
  provider: {
    "@type": "LocalBusiness",
    name: "Jesse Karkoukly, Mortgage Agent",
    telephone: "416-276-2666",
    email: "jkarkoukly@sherwoodmortgagegroup.com",
    url: "https://jessekarkoukly.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toronto",
      addressRegion: "ON",
      addressCountry: "CA",
    },
  },
  areaServed: {
    "@type": "Province",
    name: "Ontario",
  },
  description:
    "Debt consolidation mortgage service for Toronto and Ontario homeowners. Compare refinance, HELOC, and second mortgage options to consolidate high-interest debt into a lower mortgage payment.",
};

export default function DebtConsolidationPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[{ name: "Services", href: "/services" }, { name: "Debt Consolidation", href: "/services/debt-consolidation" }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqSchema, serviceSchema]),
        }}
      />
      <DebtConsolidationContent />
    </PageShell>
  );
}

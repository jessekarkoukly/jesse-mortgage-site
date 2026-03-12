import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import DebtConsolidationContent from "@/components/services/DebtConsolidationContent";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title:
    "Debt Consolidation Mortgage in Toronto | Roll High-Interest Debt Into Your Mortgage | Jesse Karkoukly",
  description:
    "Toronto mortgage agent Jesse Karkoukly helps Ontario homeowners consolidate credit card, car loan, and personal debt into a single lower-rate mortgage payment. Calculator included.",
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
  openGraph: {
    title:
      "Debt Consolidation Mortgage in Toronto | Jesse Karkoukly",
    description:
      "Roll high-interest debt into your mortgage and lower your monthly payments. Jesse Karkoukly compares refinance, HELOC, and second mortgage options for Toronto and Ontario homeowners.",
    url: "https://jessekarkoukly.com/services/debt-consolidation",
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does consolidating debt increase my mortgage balance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The debt you consolidate gets added to your mortgage. Your mortgage balance will be higher, and your amortization resets or extends. The trade-off is a much lower interest rate on that balance compared to credit cards or personal loans.",
      },
    },
    {
      "@type": "Question",
      name: "Can I consolidate debt if my mortgage is not up for renewal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can, but you will pay a prepayment penalty to break your existing mortgage. Whether it is worth it depends on how much high-interest debt you are carrying and how large the penalty is.",
      },
    },
    {
      "@type": "Question",
      name: "What types of debt can I consolidate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Credit cards, personal loans, car loans, lines of credit, student loans, tax debt, and other consumer obligations. Essentially any debt that shows on your credit bureau can be rolled into the consolidation.",
      },
    },
    {
      "@type": "Question",
      name: "Will this affect my credit score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paying off revolving balances like credit cards typically improves your credit score because your utilization ratio drops. The new mortgage balance is an installment loan, which credit bureaus treat differently than revolving credit.",
      },
    },
    {
      "@type": "Question",
      name: "How much equity do I need?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You need enough equity to cover the debt you want to consolidate. In Ontario, lenders allow refinancing up to 80% of your appraised home value. The difference between 80% of your home value and your current mortgage balance is your available equity.",
      },
    },
    {
      "@type": "Question",
      name: "What if I accumulate new debt after consolidating?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This is the most important question to ask honestly. Consolidation solves the math problem, but it does not change spending patterns. If the underlying behaviour does not change, you can end up with a larger mortgage and new consumer debt on top of it.",
      },
    },
  ],
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

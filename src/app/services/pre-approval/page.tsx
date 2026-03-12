import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PreApprovalContent from "@/components/services/PreApprovalContent";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title:
    "Mortgage Pre-Approval in Ontario | Jesse Karkoukly, Mortgage Agent Toronto",
  description:
    "Get pre-approved for a mortgage in Ontario with a broker who shops 50+ lenders on your behalf. Know your number, lock your rate, and make a stronger offer. No cost, no obligation.",
  keywords: [
    "mortgage pre-approval Ontario",
    "mortgage pre-approval Toronto",
    "get pre-approved for a mortgage Canada",
    "mortgage pre-approval broker vs bank",
    "mortgage pre-approval how long does it take",
  ],
  openGraph: {
    title: "Mortgage Pre-Approval in Ontario | Jesse Karkoukly",
    description:
      "Know your number, lock your rate, and make a stronger offer. 50+ lenders compared. No cost, no obligation.",
    url: "https://jessekarkoukly.com/services/pre-approval",
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
      name: "How long does a pre-approval take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most pre-approvals are completed within 24-48 hours once all documents are received. The strategy call itself is typically 15-30 minutes. If your documents are organized and ready, the process moves as fast as the lender allows.",
      },
    },
    {
      "@type": "Question",
      name: "Does getting pre-approved hurt my credit score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A hard inquiry may temporarily lower your score by 5-10 points. Working through a broker, one inquiry is used to assess every lender on your behalf. If you visited three banks directly, that would be three separate hard inquiries on your report.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between pre-qualified and pre-approved?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pre-qualification is an estimate based on self-reported numbers with no verification. Pre-approval involves actual verification of your income, credit, and assets by a lender. For making offers on homes, you want the verified version.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get pre-approved if I am self-employed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Self-employed pre-approvals require additional documentation, typically two years of tax returns and financial statements, but are absolutely achievable. Jesse works regularly with lenders who specialize in self-employed borrowers and price competitively for them.",
      },
    },
    {
      "@type": "Question",
      name: "What if my pre-approval amount is more than I want to spend?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Very common. The pre-approval tells you the maximum a lender will give you. It does not tell you what you should spend. Jesse will help you figure out the monthly payment that actually fits your life.",
      },
    },
    {
      "@type": "Question",
      name: "Can I shop around after getting pre-approved through Jesse?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You are never locked in until you sign a commitment with a specific lender. Jesse's job is to find you the best option available and explain the tradeoffs clearly. If you find something better elsewhere, say so and he will tell you honestly whether it actually is.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if rates drop after I get pre-approved?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If rates drop during your rate hold period, you automatically get the lower rate. The rate hold is a ceiling, not a floor. This is one of the reasons getting pre-approved early in your home search costs you nothing and protects you in both directions.",
      },
    },
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
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
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Mortgage Pre-Approval",
  provider: {
    "@type": "LocalBusiness",
    name: "Jesse Karkoukly, Mortgage Agent",
  },
  areaServed: {
    "@type": "Province",
    name: "Ontario",
  },
  description:
    "Mortgage pre-approval service for Ontario home buyers. 50+ lenders compared, 120-day rate hold, no cost to the client.",
};

export default function PreApprovalPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[{ name: "Services", href: "/services" }, { name: "Pre-Approval", href: "/services/pre-approval" }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            faqSchema,
            localBusinessSchema,
            serviceSchema,
          ]),
        }}
      />
      <PreApprovalContent />
    </PageShell>
  );
}

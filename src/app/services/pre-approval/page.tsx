import type { Metadata } from "next";
import { PRE_APPROVAL_FAQ } from "@/data/faqs/pre-approval";
import { social } from "@/lib/seo";
import PageShell from "@/components/PageShell";
import PreApprovalContent from "@/components/services/PreApprovalContent";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title:
    "Mortgage Pre-Approval in Ontario | Jesse Karkoukly",
  description:
    "Get pre-approved in Ontario. Map your home buying plan, know your max price and down payment, and hold a rate for up to 120 days while you shop.",
  keywords: [
    "mortgage pre-approval Ontario",
    "mortgage pre-approval Toronto",
    "get pre-approved for a mortgage Canada",
    "mortgage pre-approval broker vs bank",
    "mortgage pre-approval how long does it take",
  ],
  ...social("Mortgage Pre-Approval in Ontario | Jesse Karkoukly", "Get pre-approved in Ontario. Map your home buying plan, know your max price and down payment, and hold a rate for up to 120 days while you shop.", "/services/pre-approval"),
  alternates: { canonical: "/services/pre-approval" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PRE_APPROVAL_FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
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

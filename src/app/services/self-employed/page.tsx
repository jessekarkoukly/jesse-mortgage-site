import type { Metadata } from "next";
import { SELF_EMPLOYED_FAQ } from "@/data/faqs/self-employed";
import { social } from "@/lib/seo";
import PageShell from "@/components/PageShell";
import SelfEmployedContent from "@/components/services/SelfEmployedContent";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title:
    "Self-Employed Mortgages in Ontario | Jesse Karkoukly",
  description:
    "Self-employed, incorporated or paid in dividends? How lenders read your income, which documents you need, and what options you have.",
  keywords: [
    "self-employed mortgage Toronto",
    "self-employed mortgage Ontario",
    "stated income mortgage Canada",
    "business owner mortgage",
    "incorporated professional mortgage",
    "freelancer mortgage Ontario",
    "commission income mortgage",
    "self-employed mortgage broker Toronto",
  ],
  ...social("Self-Employed Mortgages in Ontario | Jesse Karkoukly", "Self-employed, incorporated or paid in dividends? How lenders read your income, which documents you need, and what options you have.", "/services/self-employed"),
  alternates: { canonical: "/services/self-employed" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: SELF_EMPLOYED_FAQ.map((item) => ({
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
  name: "Self-Employed Mortgages",
  provider: {
    "@type": "LocalBusiness",
    name: "Jesse Karkoukly, Mortgage Agent",
  },
  areaServed: {
    "@type": "Province",
    name: "Ontario",
  },
  description:
    "Mortgage service for self-employed, incorporated, and commission-based borrowers in Toronto and Ontario. Stated income programs, alternative documentation, and 50+ lenders compared.",
};

export default function SelfEmployedPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[{ name: "Services", href: "/services" }, { name: "Self-Employed", href: "/services/self-employed" }]} />
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
      <SelfEmployedContent />
    </PageShell>
  );
}

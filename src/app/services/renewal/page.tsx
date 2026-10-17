import type { Metadata } from "next";
import { RENEWAL_FAQ } from "@/data/faqs/renewal";
import { social } from "@/lib/seo";
import PageShell from "@/components/PageShell";
import RenewalContent from "@/components/services/RenewalContent";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title:
    "Mortgage Renewal, Toronto: Compare Before You Sign",
  description:
    "Your lender's renewal offer isn't always their best. Compare options before you sign, hold a rate 120 days ahead and make a confident decision.",
  keywords: [
    "mortgage renewal Toronto",
    "mortgage renewal Ontario",
    "mortgage renewal broker Toronto",
    "mortgage renewal 2026 Ontario",
  ],
  ...social("Mortgage Renewal, Toronto: Compare Before You Sign", "Your lender's renewal offer isn't always their best. Compare options before you sign, hold a rate 120 days ahead and make a confident decision.", "/services/renewal"),
  alternates: { canonical: "/services/renewal" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: RENEWAL_FAQ.map((item) => ({
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
  name: "Mortgage Renewal",
  provider: {
    "@type": "LocalBusiness",
    name: "Jesse Karkoukly, Mortgage Agent",
  },
  areaServed: {
    "@type": "Province",
    name: "Ontario",
  },
  description:
    "Mortgage renewal service for Toronto and Ontario homeowners. 50+ lenders compared, 120-day rate hold, no cost to the client.",
};

export default function RenewalPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[{ name: "Services", href: "/services" }, { name: "Mortgage Renewal", href: "/services/renewal" }]} />
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
      <RenewalContent />
    </PageShell>
  );
}

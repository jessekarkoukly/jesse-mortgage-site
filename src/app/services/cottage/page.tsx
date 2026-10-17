import type { Metadata } from "next";
import { COTTAGE_FAQ } from "@/data/faqs/cottage";
import { social } from "@/lib/seo";
import PageShell from "@/components/PageShell";
import CottageContent from "@/components/services/CottageContent";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title:
    "Cottage and Second Home Mortgages in Ontario",
  description:
    "Financing a cottage or second home in Ontario? Lenders treat recreational properties differently. Here's how seasonal and year-round options work.",
  alternates: { canonical: "/services/cottage" },
  keywords: [
    "cottage mortgage Ontario",
    "vacation property mortgage",
    "recreational property financing",
    "cottage country mortgage",
    "Muskoka cottage mortgage",
    "seasonal property mortgage Ontario",
    "second home mortgage Ontario",
    "cottage mortgage broker Toronto",
  ],
  ...social("Cottage and Second Home Mortgages in Ontario", "Financing a cottage or second home in Ontario? Lenders treat recreational properties differently. Here's how seasonal and year-round options work.", "/services/cottage"),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: COTTAGE_FAQ.map((item) => ({
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
  name: "Cottage & Vacation Property Mortgages",
  provider: {
    "@type": "LocalBusiness",
    name: "Jesse Karkoukly, Mortgage Agent",
  },
  areaServed: {
    "@type": "Province",
    name: "Ontario",
  },
  description:
    "Mortgage service for cottage and vacation property buyers in Ontario. Seasonal and year-round property financing, HELOC strategies, and 50+ lenders compared across Ontario cottage country.",
};

export default function CottagePage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[{ name: "Services", href: "/services" }, { name: "Cottage & Vacation", href: "/services/cottage" }]} />
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
      <CottageContent />
    </PageShell>
  );
}

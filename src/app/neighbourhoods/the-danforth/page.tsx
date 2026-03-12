import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import NeighbourhoodPageLayout from "@/components/neighbourhoods/NeighbourhoodPageLayout";
import { theDanforth } from "@/data/neighbourhoods/the-danforth";

export const metadata: Metadata = {
  title: theDanforth.metaTitle,
  description: theDanforth.metaDescription,
  keywords: theDanforth.metaKeywords,
  alternates: { canonical: `/neighbourhoods/${theDanforth.slug}` },
  openGraph: {
    title: theDanforth.metaTitle,
    description: theDanforth.ogDescription,
    url: `https://jessekarkoukly.com/neighbourhoods/${theDanforth.slug}`,
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: theDanforth.faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Jesse Karkoukly, Mortgage Agent",
  telephone: "+1-416-276-2666",
  email: "jkarkoukly@sherwoodmortgagegroup.com",
  url: "https://jessekarkoukly.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  areaServed: {
    "@type": "Place",
    name: theDanforth.name,
    containedInPlace: {
      "@type": "City",
      name: "Toronto",
    },
  },
};

export default function TheDanforthPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Neighbourhoods", href: "/neighbourhoods" },
          {
            name: theDanforth.name,
            href: `/neighbourhoods/${theDanforth.slug}`,
          },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <NeighbourhoodPageLayout data={theDanforth} />
    </PageShell>
  );
}

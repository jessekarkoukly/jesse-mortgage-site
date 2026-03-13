import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import NeighbourhoodPageLayout from "@/components/neighbourhoods/NeighbourhoodPageLayout";
import { cabbagetown } from "@/data/neighbourhoods/cabbagetown";

export const metadata: Metadata = {
  title: cabbagetown.metaTitle,
  description: cabbagetown.metaDescription,
  keywords: cabbagetown.metaKeywords,
  alternates: { canonical: `/neighbourhoods/${cabbagetown.slug}` },
  openGraph: {
    title: cabbagetown.metaTitle,
    description: cabbagetown.ogDescription,
    url: `https://jessekarkoukly.com/neighbourhoods/${cabbagetown.slug}`,
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: cabbagetown.faq.map((item) => ({
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
    name: cabbagetown.name,
    containedInPlace: {
      "@type": "City",
      name: "Toronto",
    },
  },
};

export default function CabbagetownPage() {
  return (
    <PageShell hideFloatingCTAs>
      <BreadcrumbJsonLd
        items={[
          { name: "Neighbourhoods", href: "/neighbourhoods" },
          { name: cabbagetown.name, href: `/neighbourhoods/${cabbagetown.slug}` },
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
      <NeighbourhoodPageLayout data={cabbagetown} />
    </PageShell>
  );
}

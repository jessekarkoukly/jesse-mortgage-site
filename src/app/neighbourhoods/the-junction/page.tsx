import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import NeighbourhoodPageLayout from "@/components/neighbourhoods/NeighbourhoodPageLayout";
import { theJunction } from "@/data/neighbourhoods/the-junction";

export const metadata: Metadata = {
  title: theJunction.metaTitle,
  description: theJunction.metaDescription,
  keywords: theJunction.metaKeywords,
  alternates: { canonical: `/neighbourhoods/${theJunction.slug}` },
  openGraph: {
    title: theJunction.metaTitle,
    description: theJunction.ogDescription,
    url: `https://jessekarkoukly.com/neighbourhoods/${theJunction.slug}`,
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: theJunction.faq.map((item) => ({
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
    name: theJunction.name,
    containedInPlace: {
      "@type": "City",
      name: "Toronto",
    },
  },
};

export default function TheJunctionPage() {
  return (
    <PageShell hideFloatingCTAs>
      <BreadcrumbJsonLd
        items={[
          { name: "Neighbourhoods", href: "/neighbourhoods" },
          {
            name: theJunction.name,
            href: `/neighbourhoods/${theJunction.slug}`,
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
      <NeighbourhoodPageLayout data={theJunction} />
    </PageShell>
  );
}

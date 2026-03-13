import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import NeighbourhoodPageLayout from "@/components/neighbourhoods/NeighbourhoodPageLayout";
import { roncesvalles } from "@/data/neighbourhoods/roncesvalles";

export const metadata: Metadata = {
  title: roncesvalles.metaTitle,
  description: roncesvalles.metaDescription,
  keywords: roncesvalles.metaKeywords,
  alternates: { canonical: `/neighbourhoods/${roncesvalles.slug}` },
  openGraph: {
    title: roncesvalles.metaTitle,
    description: roncesvalles.ogDescription,
    url: `https://jessekarkoukly.com/neighbourhoods/${roncesvalles.slug}`,
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: roncesvalles.faq.map((item) => ({
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
    name: roncesvalles.name,
    containedInPlace: {
      "@type": "City",
      name: "Toronto",
    },
  },
};

export default function RoncesvallesPage() {
  return (
    <PageShell hideFloatingCTAs>
      <BreadcrumbJsonLd
        items={[
          { name: "Neighbourhoods", href: "/neighbourhoods" },
          {
            name: roncesvalles.name,
            href: `/neighbourhoods/${roncesvalles.slug}`,
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
      <NeighbourhoodPageLayout data={roncesvalles} />
    </PageShell>
  );
}

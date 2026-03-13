import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import NeighbourhoodPageLayout from "@/components/neighbourhoods/NeighbourhoodPageLayout";
import { theAnnex } from "@/data/neighbourhoods/the-annex";

export const metadata: Metadata = {
  title: theAnnex.metaTitle,
  description: theAnnex.metaDescription,
  keywords: theAnnex.metaKeywords,
  alternates: { canonical: `/neighbourhoods/${theAnnex.slug}` },
  openGraph: {
    title: theAnnex.metaTitle,
    description: theAnnex.ogDescription,
    url: `https://jessekarkoukly.com/neighbourhoods/${theAnnex.slug}`,
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: theAnnex.faq.map((item) => ({
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
    name: theAnnex.name,
    containedInPlace: {
      "@type": "City",
      name: "Toronto",
    },
  },
};

export default function TheAnnexPage() {
  return (
    <PageShell hideFloatingCTAs>
      <BreadcrumbJsonLd
        items={[
          { name: "Neighbourhoods", href: "/neighbourhoods" },
          { name: theAnnex.name, href: `/neighbourhoods/${theAnnex.slug}` },
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
      <NeighbourhoodPageLayout data={theAnnex} />
    </PageShell>
  );
}

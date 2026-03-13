import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import NeighbourhoodPageLayout from "@/components/neighbourhoods/NeighbourhoodPageLayout";
import { leslieville } from "@/data/neighbourhoods/leslieville";

export const metadata: Metadata = {
  title: leslieville.metaTitle,
  description: leslieville.metaDescription,
  keywords: leslieville.metaKeywords,
  alternates: { canonical: `/neighbourhoods/${leslieville.slug}` },
  openGraph: {
    title: leslieville.metaTitle,
    description: leslieville.ogDescription,
    url: `https://jessekarkoukly.com/neighbourhoods/${leslieville.slug}`,
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: leslieville.faq.map((item) => ({
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
    name: leslieville.name,
    containedInPlace: {
      "@type": "City",
      name: "Toronto",
    },
  },
};

export default function LeslievillePage() {
  return (
    <PageShell hideFloatingCTAs>
      <BreadcrumbJsonLd
        items={[
          { name: "Neighbourhoods", href: "/neighbourhoods" },
          {
            name: leslieville.name,
            href: `/neighbourhoods/${leslieville.slug}`,
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
      <NeighbourhoodPageLayout data={leslieville} />
    </PageShell>
  );
}

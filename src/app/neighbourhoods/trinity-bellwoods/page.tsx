import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import NeighbourhoodPageLayout from "@/components/neighbourhoods/NeighbourhoodPageLayout";
import { trinityBellwoods } from "@/data/neighbourhoods/trinity-bellwoods";

export const metadata: Metadata = {
  title: trinityBellwoods.metaTitle,
  description: trinityBellwoods.metaDescription,
  keywords: trinityBellwoods.metaKeywords,
  alternates: { canonical: `/neighbourhoods/${trinityBellwoods.slug}` },
  openGraph: {
    title: trinityBellwoods.metaTitle,
    description: trinityBellwoods.ogDescription,
    url: `https://jessekarkoukly.com/neighbourhoods/${trinityBellwoods.slug}`,
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: trinityBellwoods.faq.map((item) => ({
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
    name: trinityBellwoods.name,
    containedInPlace: {
      "@type": "City",
      name: "Toronto",
    },
  },
};

export default function TrinityBellwoodsPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Neighbourhoods", href: "/neighbourhoods" },
          { name: trinityBellwoods.name, href: `/neighbourhoods/${trinityBellwoods.slug}` },
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
      <NeighbourhoodPageLayout data={trinityBellwoods} />
    </PageShell>
  );
}

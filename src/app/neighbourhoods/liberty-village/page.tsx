import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import NeighbourhoodPageLayout from "@/components/neighbourhoods/NeighbourhoodPageLayout";
import { libertyVillage } from "@/data/neighbourhoods/liberty-village";

export const metadata: Metadata = {
  title: libertyVillage.metaTitle,
  description: libertyVillage.metaDescription,
  keywords: libertyVillage.metaKeywords,
  alternates: { canonical: `/neighbourhoods/${libertyVillage.slug}` },
  openGraph: {
    title: libertyVillage.metaTitle,
    description: libertyVillage.ogDescription,
    url: `https://jessekarkoukly.com/neighbourhoods/${libertyVillage.slug}`,
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: libertyVillage.faq.map((item) => ({
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
    name: libertyVillage.name,
    containedInPlace: {
      "@type": "City",
      name: "Toronto",
    },
  },
};

export default function LibertyVillagePage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Neighbourhoods", href: "/neighbourhoods" },
          { name: libertyVillage.name, href: `/neighbourhoods/${libertyVillage.slug}` },
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
      <NeighbourhoodPageLayout data={libertyVillage} />
    </PageShell>
  );
}

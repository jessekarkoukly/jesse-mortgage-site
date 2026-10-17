import type { Metadata } from "next";
import { REFINANCING_FAQ } from "@/data/faqs/refinancing";
import { social } from "@/lib/seo";
import PageShell from "@/components/PageShell";
import RefinancingContent from "@/components/services/RefinancingContent";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title:
    "Mortgage Refinancing, Toronto | Jesse Karkoukly",
  description:
    "Is breaking your mortgage early worth it? See the penalty, compare options and get a clear answer on whether refinancing makes sense.",
  keywords: [
    "mortgage refinancing Toronto",
    "mortgage refinancing Ontario",
    "break mortgage penalty calculator",
    "refinance mortgage Toronto",
    "mortgage penalty calculator Canada",
    "refinancing broker Toronto",
    "blend and extend mortgage",
    "IRD penalty calculator",
  ],
  ...social("Mortgage Refinancing, Toronto | Jesse Karkoukly", "Is breaking your mortgage early worth it? See the penalty, compare options and get a clear answer on whether refinancing makes sense.", "/services/refinancing"),
  alternates: { canonical: "/services/refinancing" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: REFINANCING_FAQ.map((item) => ({
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
  name: "Mortgage Refinancing",
  provider: {
    "@type": "LocalBusiness",
    name: "Jesse Karkoukly, Mortgage Agent",
  },
  areaServed: {
    "@type": "Province",
    name: "Ontario",
  },
  description:
    "Mortgage refinancing service for Toronto and Ontario homeowners. Penalty calculation, break-even analysis, and 50+ lenders compared.",
};

export default function RefinancingPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[{ name: "Services", href: "/services" }, { name: "Refinancing", href: "/services/refinancing" }]} />
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
      <RefinancingContent />
    </PageShell>
  );
}

import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import CottageContent from "@/components/services/CottageContent";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title:
    "Cottage & Vacation Property Mortgages in Ontario | Jesse Karkoukly, Mortgage Agent Toronto",
  description:
    "Financing a cottage or vacation property in Ontario? Lenders treat recreational properties differently. Get matched to the right lender for seasonal or year-round properties across Ontario cottage country.",
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
  openGraph: {
    title:
      "Cottage & Vacation Property Mortgages in Ontario | Jesse Karkoukly",
    description:
      "Cottage financing follows different rules. Know how lenders classify your property before making an offer. 50+ lenders compared across Ontario cottage country.",
    url: "https://jessekarkoukly.com/services/cottage",
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I really need 20% down to buy a cottage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not necessarily. If the property qualifies as year-round with permanent heating, a full foundation, and maintained road access, it may qualify for an insured mortgage with as little as 5% down. Seasonal properties typically require at least 20% down because they do not qualify for mortgage insurance.",
      },
    },
    {
      "@type": "Question",
      name: "Can I count Airbnb or rental income from the cottage to help qualify?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Some do, but with strict conditions. The property usually needs a rental history or a signed lease. Most lenders will only count 50% to 80% of the projected rental income, and the property must meet their habitability standards.",
      },
    },
    {
      "@type": "Question",
      name: "The cottage has well water and a septic system. Is that a problem for lenders?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most lenders are fine with well and septic as long as both pass inspection. A failed septic test or contaminated well can stall or kill a deal. Get inspections done early in the conditional period.",
      },
    },
    {
      "@type": "Question",
      name: "Can I just use the equity in my home to buy the cottage outright?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, if you have enough equity. A HELOC on your primary home can cover the full cottage purchase price, which avoids a second mortgage application entirely. The trade-off is that your primary home carries more debt, and HELOC rates are variable.",
      },
    },
    {
      "@type": "Question",
      name: "How do I know if my cottage counts as seasonal or year-round?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no single definition. Lenders look at a combination of factors: road access, heating system, insulation and winterization, foundation type, and water and septic systems. A property can fall into a grey zone where different lenders classify it differently.",
      },
    },
    {
      "@type": "Question",
      name: "Am I going to pay a higher rate on a cottage than on my main home?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not necessarily. Year-round properties with good access and standard construction often qualify for the same rates as a primary residence. Seasonal properties or those with water-only access may carry a small premium, typically 0.10% to 0.25%.",
      },
    },
  ],
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

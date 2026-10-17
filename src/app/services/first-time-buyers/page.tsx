import type { Metadata } from "next";
import { FIRST_TIME_BUYERS_FAQ } from "@/data/faqs/first-time-buyers";
import { social } from "@/lib/seo";
import PageShell from "@/components/PageShell";
import FirstTimeBuyerContent from "@/components/services/FirstTimeBuyerContent";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "First-Time Home Buyer Mortgages, Toronto | Jesse Karkoukly",
  description:
    "First-time buyer guide for Toronto: FHSA, Home Buyers' Plan, land transfer tax rebates and what you qualify for.",
  keywords: [
    "first time home buyer Toronto",
    "first time home buyer Ontario",
    "FHSA mortgage Ontario",
    "home buyers plan RRSP",
    "Ontario land transfer tax rebate",
    "mortgage broker first time buyer Toronto",
  ],
  ...social("First-Time Home Buyer Mortgages, Toronto | Jesse Karkoukly", "First-time buyer guide for Toronto: FHSA, Home Buyers' Plan, land transfer tax rebates and what you qualify for.", "/services/first-time-buyers"),
  alternates: { canonical: "/services/first-time-buyers" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FIRST_TIME_BUYERS_FAQ.map((item) => ({
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
  name: "First-Time Home Buyer Mortgages",
  provider: {
    "@type": "LocalBusiness",
    name: "Jesse Karkoukly, Mortgage Agent",
  },
  areaServed: {
    "@type": "Province",
    name: "Ontario",
  },
  description:
    "Mortgage services for first-time home buyers in Toronto and Ontario. FHSA, HBP, LTT rebates, stress test guidance, and access to 50+ lenders.",
};

export default function FirstTimeBuyersPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[{ name: "Services", href: "/services" }, { name: "First-Time Buyers", href: "/services/first-time-buyers" }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqSchema, localBusinessSchema, serviceSchema]),
        }}
      />
      <FirstTimeBuyerContent />
    </PageShell>
  );
}

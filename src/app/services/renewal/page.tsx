import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import RenewalContent from "@/components/services/RenewalContent";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title:
    "Mortgage Renewal in Toronto | Compare Before You Sign | Jesse Karkoukly",
  description:
    "Your lender's renewal offer is rarely their best. Jesse shops 50+ lenders to find out what you can actually get. Free, no obligation. Toronto mortgage broker.",
  keywords: [
    "mortgage renewal Toronto",
    "mortgage renewal Ontario",
    "mortgage renewal broker Toronto",
    "mortgage renewal 2026 Ontario",
  ],
  openGraph: {
    title:
      "Mortgage Renewal in Toronto | Compare Before You Sign | Jesse Karkoukly",
    description:
      "Your lender's renewal offer is rarely their best. Jesse shops 50+ lenders to find out what you can actually get. Free, no obligation.",
    url: "https://jessekarkoukly.com/services/renewal",
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
      name: "When should I start the renewal process?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "4 to 6 months before your renewal date. That is when lenders compete for your business and when you have the most room to negotiate with your existing lender. Inside 30 days, your options narrow significantly.",
      },
    },
    {
      "@type": "Question",
      name: "Do I have to qualify again if I switch lenders at renewal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For insured mortgages: no stress test on a straight switch at renewal. For uninsured mortgages where you are changing terms or extending amortization, you will need to re-qualify. Jesse tells you upfront which category you are in.",
      },
    },
    {
      "@type": "Question",
      name: "What if I just want to stay with my current lender?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Completely reasonable. Jesse can tell you whether their offer is fair before you sign back. If it is, sign it. If it is not, you now have a number to negotiate with. Either way you are better off knowing.",
      },
    },
    {
      "@type": "Question",
      name: "Can a mortgage broker help with renewal, or is that just for new purchases?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Renewal is one of the most common reasons people work with Jesse. There is no cost to you. Jesse is paid by the lender if you switch, and charges nothing for the review if you stay. Either way you get a clear picture of where you stand.",
      },
    },
    {
      "@type": "Question",
      name: "Fixed or variable at renewal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Depends on your situation, your plans for the home, and your risk tolerance. Jesse runs both scenarios for every client and gives a direct recommendation. Most people in 2026 are leaning toward shorter fixed terms, but the right answer varies.",
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
  name: "Mortgage Renewal",
  provider: {
    "@type": "LocalBusiness",
    name: "Jesse Karkoukly, Mortgage Agent",
  },
  areaServed: {
    "@type": "Province",
    name: "Ontario",
  },
  description:
    "Mortgage renewal service for Toronto and Ontario homeowners. 50+ lenders compared, 120-day rate hold, no cost to the client.",
};

export default function RenewalPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[{ name: "Services", href: "/services" }, { name: "Mortgage Renewal", href: "/services/renewal" }]} />
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
      <RenewalContent />
    </PageShell>
  );
}

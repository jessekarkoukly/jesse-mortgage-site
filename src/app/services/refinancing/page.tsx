import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import RefinancingContent from "@/components/services/RefinancingContent";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title:
    "Mortgage Refinancing in Toronto | Is Breaking Worth It? | Jesse Karkoukly",
  description:
    "Find out if breaking your mortgage early makes financial sense. Jesse calculates your penalty, compares 50+ lenders, and tells you honestly whether refinancing is worth it. Toronto and Ontario.",
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
  openGraph: {
    title:
      "Mortgage Refinancing in Toronto | Is Breaking Worth It? | Jesse Karkoukly",
    description:
      "Find out if breaking your mortgage early makes financial sense. Jesse calculates your penalty, compares 50+ lenders, and tells you honestly whether refinancing is worth it.",
    url: "https://jessekarkoukly.com/services/refinancing",
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
      name: "Is refinancing mid-term always expensive?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not always. Variable rate penalties are usually straightforward and sometimes modest. Fixed rate penalties depend heavily on how much rates have moved and which lender you are with. The only way to know your actual penalty is to calculate it specifically.",
      },
    },
    {
      "@type": "Question",
      name: "Can I refinance if I am with a Big Bank?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Breaking a Big Bank mortgage mid-term is more expensive than breaking a monoline lender's mortgage because of how they calculate IRD, using posted rates rather than discounted rates. That gap can be $5,000 to $15,000 on a typical mortgage. Sometimes the savings from a better rate still outweigh the higher penalty. Sometimes they do not. The math decides.",
      },
    },
    {
      "@type": "Question",
      name: "What is blend-and-extend and is it worth it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Blend-and-extend lets your current lender blend your existing rate with their current rate for a new extended term, avoiding the prepayment penalty entirely. The resulting rate is higher than what you could get by fully breaking and going to a different lender. Whether it is worth it depends on the size of the penalty and the size of the rate difference.",
      },
    },
    {
      "@type": "Question",
      name: "Can I port my mortgage instead?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you are moving to a new home, most closed mortgages allow you to transfer your existing rate and terms to the new property. This avoids the penalty entirely. There are timing windows and qualification requirements. If a move is in your near-term plans, porting should be the first question, not refinancing.",
      },
    },
    {
      "@type": "Question",
      name: "How long does refinancing take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typically 2 to 4 weeks from application to closing. The bottlenecks are appraisal scheduling and lender processing times.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a lawyer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A lawyer discharges your existing mortgage and registers the new one on title. Budget $800 to $1,500. If your refinanced mortgage is above $200,000, many lenders cover legal costs.",
      },
    },
    {
      "@type": "Question",
      name: "What if I just want to access equity without breaking my mortgage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A HELOC (Home Equity Line of Credit) lets you borrow against your equity without touching your existing mortgage. No penalty. No new mortgage. It works like a revolving credit line at a rate tied to prime. It is the right tool when you want flexibility and do not need a lump sum.",
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

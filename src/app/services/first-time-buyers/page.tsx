import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import FirstTimeBuyerContent from "@/components/services/FirstTimeBuyerContent";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "First-Time Home Buyer Toronto | Jesse Karkoukly Mortgage Agent",
  description:
    "First-time home buyer guide for Toronto and Ontario. FHSA, HBP, LTT rebates, stress test explained. 50+ lenders. Free strategy session with Jesse Karkoukly.",
  keywords: [
    "first time home buyer Toronto",
    "first time home buyer Ontario",
    "FHSA mortgage Ontario",
    "home buyers plan RRSP",
    "Ontario land transfer tax rebate",
    "mortgage broker first time buyer Toronto",
  ],
  openGraph: {
    title: "First-Time Home Buyer Toronto | Jesse Karkoukly",
    description:
      "You are probably closer to ready than you think. FHSA, HBP, LTT rebates, 30-year amortization, and 50+ lenders compared. Free strategy session.",
    url: "https://jessekarkoukly.com/services/first-time-buyers",
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
      name: "Can I use both the FHSA and HBP together?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, and this is one of the most powerful moves available to first-time buyers. A couple using both can access up to $200,000 combined ($40k FHSA each plus $60k HBP each). The FHSA has no repayment requirement. The HBP must be repaid over 15 years.",
      },
    },
    {
      "@type": "Question",
      name: "Do I really need 20% down to buy in Toronto?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. For homes up to $1.5M, you can buy with as little as 5-10% down with CMHC insurance. The insurance premium is added to your mortgage, not paid upfront.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get a mortgage if I have been at my job for less than 2 years?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Often yes, depending on the situation. If you recently changed roles within the same industry, most lenders will be fine. If you recently changed careers entirely, it depends on the gap and the income.",
      },
    },
    {
      "@type": "Question",
      name: "Can family gift me money for the down payment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Gift funds from immediate family members are acceptable as a down payment source for most lenders. You will need a signed gift letter confirming the funds are a gift and not a loan, plus 90 days of bank statements showing the funds.",
      },
    },
    {
      "@type": "Question",
      name: "What are closing costs and how much should I budget?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Budget 1.5% to 4% of your purchase price. In Toronto this includes Ontario LTT, Toronto LTT, legal fees ($1,000-$2,000), title insurance, home inspection, and adjustments. First-time buyers receive LTT rebates that meaningfully reduce this number.",
      },
    },
    {
      "@type": "Question",
      name: "How does the FHSA work if I already own a home?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you currently own a home, you do not qualify to open an FHSA. However, if you owned a home previously but have not owned one in the current calendar year or the preceding four calendar years, you may qualify again.",
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

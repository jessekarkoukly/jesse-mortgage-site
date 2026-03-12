import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import SelfEmployedContent from "@/components/services/SelfEmployedContent";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title:
    "Self-Employed Mortgages in Ontario | Jesse Karkoukly, Mortgage Agent Toronto",
  description:
    "Self-employed, incorporated, or commission-based? Your income looks different on paper. Jesse works with lenders who assess business income properly and offer stated income programs across Ontario.",
  keywords: [
    "self-employed mortgage Toronto",
    "self-employed mortgage Ontario",
    "stated income mortgage Canada",
    "business owner mortgage",
    "incorporated professional mortgage",
    "freelancer mortgage Ontario",
    "commission income mortgage",
    "self-employed mortgage broker Toronto",
  ],
  openGraph: {
    title:
      "Self-Employed Mortgages in Ontario | Jesse Karkoukly",
    description:
      "Your income is real. Your tax return just does not show it. Jesse works with lenders who assess self-employed income properly.",
    url: "https://jessekarkoukly.com/services/self-employed",
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
      name: "Can I qualify with only one year of self-employment history?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Some lenders will consider applications with one year of T1 Generals. The options are more limited and rates may be slightly higher, but it is not an automatic disqualification. The strength of the rest of your application matters: credit score, down payment, and the consistency of your income during that year.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need 20% down as a self-employed borrower?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not necessarily. If your income can be fully verified through tax documents and Notices of Assessment, you can qualify with as little as 5% down through insured programs. Stated income programs typically require 20% or more.",
      },
    },
    {
      "@type": "Question",
      name: "What if my income fluctuates significantly year to year?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lenders typically average your income over two years. If one year was strong and the other was weaker, the average may still be enough. Some lenders weight recent income more heavily than others.",
      },
    },
    {
      "@type": "Question",
      name: "My accountant minimizes my taxable income. Does that hurt my application?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It can. The same write-offs that reduce your tax bill also reduce the income a lender sees on your Notice of Assessment. Stated income programs and lenders who look at gross revenue alongside net income can bridge that gap.",
      },
    },
    {
      "@type": "Question",
      name: "What is a stated income program?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A stated income program allows you to declare a reasonable income for your occupation without requiring full tax documentation to verify it. Lenders still look at your credit, assets, and down payment. These programs typically require at least 20% down.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use business revenue to qualify?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lenders assess personal income, not business revenue. However, the way your income flows from the business to you personally depends on your business structure. Sole proprietors report on their personal return. Incorporated borrowers may pay themselves a salary, dividends, or a combination.",
      },
    },
    {
      "@type": "Question",
      name: "I am a contract worker, not technically self-employed. Does this apply to me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you receive a T4 from your employer, you are treated as a salaried employee for mortgage purposes. If you invoice clients and receive T4A slips or report income on a T2125, lenders classify you as self-employed.",
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
  name: "Self-Employed Mortgages",
  provider: {
    "@type": "LocalBusiness",
    name: "Jesse Karkoukly, Mortgage Agent",
  },
  areaServed: {
    "@type": "Province",
    name: "Ontario",
  },
  description:
    "Mortgage service for self-employed, incorporated, and commission-based borrowers in Toronto and Ontario. Stated income programs, alternative documentation, and 50+ lenders compared.",
};

export default function SelfEmployedPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[{ name: "Services", href: "/services" }, { name: "Self-Employed", href: "/services/self-employed" }]} />
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
      <SelfEmployedContent />
    </PageShell>
  );
}

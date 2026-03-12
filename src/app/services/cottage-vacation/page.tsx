import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ServicePageLayout from "@/components/ServicePageLayout";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title:
    "Cottage & Vacation Property Mortgages | Toronto Mortgage Agent Jesse Karkoukly",
  description:
    "Financing a cottage or vacation property in Ontario works differently than a primary residence. Different rules, different lenders, different strategies.",
  openGraph: {
    title: "Cottage & Vacation Property Mortgages | Jesse Karkoukly",
    description:
      "Financing a cottage or vacation property works differently. Here's how.",
    url: "https://jessekarkoukly.com/services/cottage-vacation",
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

export default function CottageVacationPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[{ name: "Services", href: "/services" }, { name: "Cottage & Vacation", href: "/services/cottage-vacation" }]} />
      <ServicePageLayout
        eyebrow="Cottage & Vacation Properties"
        title="Financing a cottage or vacation property works differently."
        intro="Whether it is a lakefront cottage in Muskoka or a vacation home you plan to rent out part-time, the qualification rules are not the same as your primary residence. I help you navigate the differences."
        sections={[
          {
            heading: "Different rules apply",
            body: "Lenders treat recreational properties differently. Down payment requirements are usually higher, and not all lenders will finance seasonal-use or remote properties. Some require year-round road access or specific building standards. I know which lenders are flexible and which are not.",
          },
          {
            heading: "Rental income considerations",
            body: "If you plan to rent the property when you are not using it, that income may help you qualify. But the rules vary by lender and by how the property is classified. I walk you through what counts, what does not, and how to structure things so the numbers work.",
          },
          {
            heading: "What to expect",
            body: "We start by looking at the property type, location, and your financial picture. From there, I match you with lenders who actually finance these properties and give you a clear breakdown of your options.",
          },
        ]}
        bullets={[
          "Different qualification rules than a primary residence",
          "Seasonal and year-round property options",
          "Understanding how rental income can support qualification",
          "Lender options that most brokers do not know about",
        ]}
      />
    </PageShell>
  );
}

import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ServicePageLayout from "@/components/ServicePageLayout";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Specialty Mortgage Programs | Toronto Mortgage Agent Jesse Karkoukly",
  description:
    "Not everyone fits a standard mortgage box. Specialized programs for medical professionals, high net worth clients, newcomers to Canada, retirees, and more.",
  alternates: { canonical: "/services/specialty" },
  keywords: [
    "specialty mortgage programs",
    "alternative lending Ontario",
    "medical professional mortgage",
    "new to Canada mortgage",
    "reverse mortgage Ontario",
    "construction loan Toronto",
    "high net worth mortgage",
  ],
  openGraph: {
    title: "Specialty Mortgage Programs | Jesse Karkoukly",
    description:
      "Not everyone fits a standard mortgage box. That's where this comes in.",
    url: "https://jessekarkoukly.com/services/specialty",
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

export default function SpecialtyPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[{ name: "Services", href: "/services" }, { name: "Specialty Programs", href: "/services/specialty" }]} />
      <ServicePageLayout
        eyebrow="Specialty Programs"
        title="Not everyone fits a standard mortgage box."
        intro="Whether you are purchasing, refinancing, or renewing, standard programs do not always account for your situation. That is why specialized lending products exist. I help you find the right one."
        sections={[
          {
            heading: "Medical Professional Lending",
            body: "Doctors, dentists, and other licensed medical professionals often have unique income structures, especially early in their careers. Certain lenders offer reduced down payment requirements and more flexible qualification criteria for licensed practitioners.",
          },
          {
            heading: "High Net Worth Products",
            body: "If your income does not reflect your actual financial position, high net worth programs look at your total asset picture instead of traditional income verification. These products are designed for clients with significant investments, savings, or other holdings.",
          },
          {
            heading: "New to Canada",
            body: "If you have recently moved to Canada, building a credit history takes time. Specific lender programs are designed for newcomers with limited Canadian credit, using international income history and other documentation to support qualification.",
          },
          {
            heading: "Reverse Mortgages",
            body: "For homeowners 55 and older, a reverse mortgage lets you access your home equity without making monthly payments. The loan is repaid when you sell or move. It can be a valuable tool for retirement planning when used correctly.",
          },
          {
            heading: "Construction & Renovation Loans",
            body: "Building a new home or doing a major renovation requires a different type of financing. I work with lenders who offer draw mortgages and renovation products that release funds in stages as the work is completed.",
          },
        ]}
        bullets={[
          "Medical Professional Lending Solutions",
          "High Net Worth Products",
          "Reverse Mortgages",
          "New to Canada Solutions",
          "Self-Employed / Incorporated Borrower Products",
          "Construction & Renovation Loans",
        ]}
      />
    </PageShell>
  );
}

import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import RatesContent from "@/components/RatesContent";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Mortgage Rates | Sherwood Mortgage Group | Jesse Karkoukly",
  description:
    "Current mortgage rate specials from Sherwood Mortgage Group. Fixed and variable rates across 1 to 5 year terms. Rates updated by the brokerage.",
  keywords: [
    "mortgage rates Ontario",
    "mortgage rates Toronto",
    "best mortgage rates Canada",
    "fixed mortgage rate Ontario",
    "variable mortgage rate Toronto",
    "Sherwood Mortgage Group rates",
  ],
  openGraph: {
    title: "Mortgage Rates | Sherwood Mortgage Group | Jesse Karkoukly",
    description:
      "Current mortgage rate specials from Sherwood Mortgage Group. Fixed and variable rates across 1 to 5 year terms.",
    url: "https://jessekarkoukly.com/rates",
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
  alternates: {
    canonical: "https://jessekarkoukly.com/rates",
  },
};

export default function RatesPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[{ name: "Rates", href: "/rates" }]}
      />
      <RatesContent />
    </PageShell>
  );
}

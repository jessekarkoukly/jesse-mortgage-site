import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import WorkingWithJesseContent from "@/components/services/WorkingWithJesseContent";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title:
    "Working with Jesse Karkoukly | What to Expect | Toronto Mortgage Agent",
  description:
    "The full mortgage process in nine steps, how Jesse operates, and what you can expect from first call through closing and beyond.",
  alternates: { canonical: "/working-with-jesse" },
  keywords: [
    "mortgage agent process",
    "what to expect mortgage agent",
    "working with a mortgage broker",
    "mortgage consultation Toronto",
    "Jesse Karkoukly mortgage process",
  ],
  openGraph: {
    title:
      "Working with Jesse Karkoukly | What to Expect | Toronto Mortgage Agent",
    description:
      "The full mortgage process in nine steps, how Jesse operates, and what you can expect from first call through closing and beyond.",
    url: "https://jessekarkoukly.com/working-with-jesse",
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

export default function WorkingWithJessePage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[{ name: "Working with Jesse", href: "/working-with-jesse" }]} />
      <WorkingWithJesseContent />
    </PageShell>
  );
}

import type { Metadata } from "next";
import { social } from "@/lib/seo";
import PageShell from "@/components/PageShell";
import WorkingWithJesseContent from "@/components/services/WorkingWithJesseContent";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title:
    "The Mortgage Process, Step by Step | Jesse Karkoukly",
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
  ...social("The Mortgage Process, Step by Step | Jesse Karkoukly", "The full mortgage process in nine steps, how Jesse operates, and what you can expect from first call through closing and beyond.", "/working-with-jesse"),
};

export default function WorkingWithJessePage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[{ name: "Working with Jesse", href: "/working-with-jesse" }]} />
      <WorkingWithJesseContent />
    </PageShell>
  );
}

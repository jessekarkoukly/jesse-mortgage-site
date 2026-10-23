import type { Metadata } from "next";
import { social } from "@/lib/seo";
import PageShell from "@/components/PageShell";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import ContactCard from "@/components/about/ContactCard";

export const metadata: Metadata = {
  title: "Contact Jesse Karkoukly | Toronto Mortgage Agent",
  description:
    "Get in touch with Jesse Karkoukly, Toronto mortgage agent. Call, email, or book an intro call.",
  alternates: { canonical: "/contact" },
  keywords: [
    "contact mortgage agent Toronto",
    "book mortgage consultation",
    "mortgage agent phone number",
    "Jesse Karkoukly contact",
    "Toronto mortgage call",
  ],
  ...social("Contact Jesse Karkoukly | Toronto Mortgage Agent", "Get in touch with Jesse Karkoukly, Toronto mortgage agent. Call, email, or book an intro call.", "/contact"),
};

export default function ContactPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[{ name: "Contact", href: "/contact" }]} />
      <section className="bg-sand pt-28 lg:pt-36 pb-20 px-5 sm:px-6 min-h-[80vh]">
        <ContactCard headingLevel="h1" />
        <p
          className="text-center text-[1.5rem] sm:text-[1.875rem] leading-snug mt-10 sm:mt-12 text-navy"
          style={{ fontFamily: "var(--font-spectral)", fontWeight: 400 }}
        >
          Looking forward to connecting with you.
        </p>
      </section>
    </PageShell>
  );
}

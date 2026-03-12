import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import HowICanHelp from "@/components/HowICanHelp";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Services | Toronto Mortgage Agent Jesse Karkoukly",
  description:
    "From pre-approvals and first-time buyers to renewals, debt consolidation, and specialty programs. See every mortgage service Jesse Karkoukly offers across Ontario.",
  alternates: { canonical: "/services" },
  keywords: [
    "mortgage services Toronto",
    "Ontario mortgage solutions",
    "mortgage agent services",
    "pre-approval Toronto",
    "mortgage renewal Ontario",
    "debt consolidation mortgage",
  ],
  openGraph: {
    title: "Services | Toronto Mortgage Agent Jesse Karkoukly",
    description:
      "From pre-approvals and first-time buyers to renewals, debt consolidation, and specialty programs.",
    url: "https://jessekarkoukly.com/services",
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

export default function ServicesIndexPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[{ name: "Services", href: "/services" }]} />
      {/* About intro */}
      <section className="bg-sand pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-8">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden shrink-0 border-2 border-sand-2">
            <Image
              src="/jesse-about.jpg"
              alt="Jesse Karkoukly, Toronto Mortgage Agent"
              width={144}
              height={144}
              className="object-cover object-top w-full h-full"
            />
          </div>
          <div>
            <p
              className="text-[1.0625rem] text-navy-2 leading-relaxed mb-3"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              I spent a decade in tech before switching to mortgages. What carried over: I listen first, explain clearly, and make sure you understand every number before signing anything. Whether you are buying your first home, renewing, or untangling something more complex, it all starts the same way. A conversation.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-coral font-semibold text-[0.9375rem] hover:underline"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              More about Jesse
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 4L10 8L6 12" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <HowICanHelp />
    </PageShell>
  );
}

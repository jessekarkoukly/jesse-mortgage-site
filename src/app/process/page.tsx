import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ProcessAccordion from "@/components/ProcessAccordion";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "How It Works | Toronto Mortgage Agent Jesse Karkoukly",
  description:
    "The nine-step process Jesse Karkoukly uses with every client. From first call to keys in hand, here is exactly what working with a Toronto mortgage agent looks like.",
  alternates: { canonical: "/process" },
  keywords: [
    "mortgage process Ontario",
    "how mortgages work",
    "mortgage steps Canada",
    "mortgage application process",
    "Toronto mortgage timeline",
  ],
  openGraph: {
    title: "How It Works | Toronto Mortgage Agent Jesse Karkoukly",
    description:
      "Discover the clear, nine-step process Jesse uses with every mortgage client in Toronto. No surprises, no pressure.",
    url: "https://jessekarkoukly.com/process",
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

export default function ProcessPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[{ name: "Process", href: "/process" }]} />
      {/* Hero */}
      <section className="bg-sand pt-16 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            How It Works
          </p>
          <h1
            className="text-[2.5rem] sm:text-[3rem] font-bold text-navy leading-tight mb-6"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            How working with a Toronto Mortgage Agent works.
          </h1>
          <p
            className="text-[1.0625rem] text-navy-2 leading-relaxed max-w-2xl"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Nine steps. Each one clear, each one has a purpose. You will always know where you are
            and what comes next. No surprises.
          </p>
        </div>
      </section>

      {/* Accordion */}
      <ProcessAccordion />

      {/* CTA */}
      <section className="bg-navy py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-[2rem] sm:text-[2.5rem] font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Ready to start at step one?
          </h2>
          <p
            className="text-[1rem] text-slate mb-8"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            The first call is 15-30 minutes. You share your situation, I ask the questions, and we
            figure out exactly where you stand.
          </p>
          <a
            href="tel:4162762666"
            className="inline-block bg-sand text-navy font-semibold px-8 py-3.5 rounded hover:bg-white transition-colors"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Call 416-276-2666
          </a>
        </div>
      </section>
    </PageShell>
  );
}

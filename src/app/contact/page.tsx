import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Contact Jesse Karkoukly | Toronto Mortgage Agent",
  description:
    "Get in touch with Jesse Karkoukly, Toronto mortgage agent. Call, email, or book a 15-30 minute discovery call. Free, no obligation.",
  alternates: { canonical: "/contact" },
  keywords: [
    "contact mortgage agent Toronto",
    "book mortgage consultation",
    "mortgage agent phone number",
    "Jesse Karkoukly contact",
    "Toronto mortgage call",
  ],
  openGraph: {
    title: "Contact Jesse Karkoukly | Toronto Mortgage Agent",
    description:
      "Reach Toronto mortgage agent Jesse Karkoukly by phone or email. Book a free discovery call today.",
    url: "https://jessekarkoukly.com/contact",
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[{ name: "Contact", href: "/contact" }]} />
      <section className="bg-sand pt-28 md:pt-36 pb-20 px-6 min-h-[80vh]">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Contact
          </p>
          <h1
            className="text-[2.5rem] sm:text-[3rem] font-bold text-navy leading-tight mb-6"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Contact a Toronto Mortgage Agent.
          </h1>
          <p
            className="text-[1.0625rem] text-navy-2 leading-relaxed mb-12 max-w-xl"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            The fastest way to get started is a 15-30 minute call. You walk me through your
            situation and I tell you exactly where you stand.
          </p>

          {/* Contact options */}
          <div className="flex flex-col gap-6">
            {/* Phone */}
            <a
              href="tel:4162762666"
              className="group flex items-center gap-5 bg-white rounded-xl px-7 py-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="w-12 h-12 rounded-full bg-coral/10 flex items-center justify-center shrink-0">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path
                    d="M6.5 2H4a2 2 0 00-2 2C2 13.822 8.178 20 17 20a2 2 0 002-2v-2.5a2 2 0 00-2-2l-2.946-.982a2 2 0 00-2.19.547L10.5 14A11.05 11.05 0 018 11.5a11.05 11.05 0 01-2.5-2.5l.935-.364a2 2 0 00.547-2.19L6 4a2 2 0 00-1.5-2z"
                    stroke="#E8705A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p
                  className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-0.5"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Call or text
                </p>
                <p
                  className="text-[1.125rem] font-bold text-navy group-hover:text-coral transition-colors"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  416-276-2666
                </p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:jkarkoukly@sherwoodmortgagegroup.com"
              className="group flex items-center gap-5 bg-white rounded-xl px-7 py-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="w-12 h-12 rounded-full bg-coral/10 flex items-center justify-center shrink-0">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <rect x="2" y="5" width="18" height="13" rx="2" stroke="#E8705A" strokeWidth="1.5" />
                  <path d="M2 8l9 5 9-5" stroke="#E8705A" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p
                  className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-0.5"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Email
                </p>
                <p
                  className="text-[1rem] font-bold text-navy group-hover:text-coral transition-colors break-all"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  jkarkoukly@sherwoodmortgagegroup.com
                </p>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-center gap-5 bg-white rounded-xl px-7 py-6">
              <div className="w-12 h-12 rounded-full bg-coral/10 flex items-center justify-center shrink-0">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path
                    d="M11 2a7 7 0 017 7c0 5-7 12-7 12S4 14 4 9a7 7 0 017-7z"
                    stroke="#E8705A"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <circle cx="11" cy="9" r="2.5" stroke="#E8705A" strokeWidth="1.5" />
                </svg>
              </div>
              <div>
                <p
                  className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-0.5"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Location
                </p>
                <p
                  className="text-[1rem] font-bold text-navy"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  The Annex, Toronto. Ontario-wide.
                </p>
              </div>
            </div>
          </div>

          {/* Book CTA note */}
          <p
            className="mt-10 text-[0.9rem] text-slate"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Prefer to book online? Use the{" "}
            <span className="text-coral font-semibold">See My Options</span> button in the top
            navigation to pick a time that works.
          </p>
        </div>
      </section>
    </PageShell>
  );
}

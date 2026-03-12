import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "About Jesse Karkoukly | Toronto Mortgage Agent",
  description:
    "Learn about Jesse Karkoukly, a Toronto mortgage agent with Sherwood Mortgage Group. Background in technology, now helping buyers, owners, and investors navigate the mortgage process clearly.",
  alternates: { canonical: "/about" },
  keywords: [
    "Toronto mortgage agent",
    "Jesse Karkoukly",
    "Sherwood Mortgage Group",
    "mortgage broker Toronto",
    "Ontario mortgage agent",
    "mortgage agent The Annex",
    "Mortgage Architects Network",
  ],
  openGraph: {
    title: "About Jesse Karkoukly | Toronto Mortgage Agent",
    description:
      "Jesse Karkoukly is a Toronto mortgage agent with Sherwood Mortgage Group. He works with first-time buyers, self-employed borrowers, and investors across the GTA.",
    url: "https://jessekarkoukly.com/about",
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

const VALUES = [
  {
    title: "Every option, not just the best-paying one",
    body: "Before you make any decision, you see every rate I find across every lender, in writing. Not a curated shortlist. You pick. I execute.",
  },
  {
    title: "If your bank is better, I will tell you",
    body: "My job is to get you the best outcome, not to move your mortgage for the sake of moving it. If staying put is the right call, I will say so in plain language and explain exactly why.",
  },
  {
    title: "You will know where you stand before any paperwork",
    body: "If you qualify, I will tell you how and what to expect. If you do not, I will tell you that too, along with what would need to change. You get the honest answer in the first conversation.",
  },
  {
    title: "You are never locked in",
    body: "No contracts between you and me. No fees. Walk away at any point before you sign. The first thing I will ever ask you to sign is a rate hold. It locks in today's rate and commits you to nothing.",
  },
  {
    title: "When your mortgage comes up again, I will still know your file",
    body: "I am not a bank employee who rotates departments. When your renewal comes around, you will have my number, I will have your history, and we start from where we left off.",
  },
];

const REVIEWS = [
  {
    quote:
      "His industry expertise and understanding of the broader economic landscape ensured we received excellent guidance when our mortgage came due. Consistently responsive, knowledgeable, and easy to work with. We felt confident every step of the way.",
    name: "Norah",
  },
  {
    quote:
      "I always appreciated how clearly he explained important details. He communicates well, knows his stuff, and is someone I would confidently recommend.",
    name: "Yoni",
  },
  {
    quote:
      "Consistently delivered thoughtful, high-quality guidance and handled every situation with professionalism and care. Working with him always left us in a stronger position.",
    name: "Nicole",
  },
  {
    quote: "Consistently impressed by how responsive and detail-oriented he is.",
    name: "Rafaela",
  },
];

const STATS = [
  { value: "50+", label: "Lenders compared" },
  { value: "10+", label: "Years in tech before mortgages" },
  { value: "The Annex", label: "Home base, Toronto" },
];

export default function AboutPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[{ name: "About", href: "/about" }]} />
      {/* ── Hero ── */}
      <section className="bg-sand pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p
              className="text-[0.75rem] font-semibold text-coral uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              About Jesse
            </p>
            <h1
              className="text-[2.5rem] sm:text-[3rem] font-bold text-navy leading-tight mb-8"
              style={{ fontFamily: "var(--font-spectral)" }}
            >
              You should understand exactly what you are signing<span className="text-coral">.</span>
            </h1>

            <div
              className="flex flex-col gap-5 text-[1.0625rem] text-navy-2 leading-relaxed"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              <p>
                I became a mortgage agent because I watched people I care about get poor advice
                during one of the most important financial decisions of their lives. Not malicious
                advice. Rushed advice. Advice driven by limited options and no real explanation. I
                wanted to do it differently.
              </p>
              <p>
                My background is in technology. I spent years building systems that had to be
                logical, clear, and well-documented. That is how I approach mortgages. I put your
                situation on paper, explain exactly what the numbers mean, and give you enough
                context to make a confident decision.
              </p>
              <p>
                I work with first-time buyers, homeowners at renewal, self-employed borrowers, and
                investors. The situations are all different, but the approach is the same. Understand
                the picture, find the right fit, and communicate clearly throughout.
              </p>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden bg-sand-2">
              <Image
                src="/jesse-family.jpg"
                alt="Jesse Karkoukly with his family in The Annex, Toronto"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 448px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="bg-navy py-10 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p
                className="text-coral text-[1.75rem] sm:text-[2rem] font-bold mb-1"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                {s.value}
              </p>
              <p
                className="text-sand/60 text-[0.75rem] sm:text-[0.8125rem] font-medium"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Credentials ── */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {[
              { label: "Brokerage", value: "Sherwood Mortgage Group" },
              { label: "Brokerage Licence", value: "#12176" },
              { label: "Network", value: "Mortgage Architects" },
              { label: "Personal Licence", value: "M25003068" },
              { label: "Location", value: "The Annex, Toronto" },
              { label: "Serves", value: "All of Ontario" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col">
                <span
                  className="text-slate text-[0.6875rem] font-semibold uppercase tracking-wider mb-1"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {item.label}
                </span>
                <span
                  className="text-navy font-semibold text-[0.9375rem]"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How Jesse Operates ── */}
      <section className="bg-navy py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p
            className="text-[0.6875rem] font-semibold text-coral tracking-[0.2em] uppercase mb-3 text-center"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            How Jesse Operates
          </p>
          <h2
            className="text-[1.75rem] sm:text-[2.25rem] font-bold text-sand leading-tight mb-3 text-center"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            A few things worth knowing upfront<span className="text-coral">.</span>
          </h2>
          <p
            className="text-sand/50 text-[1.0625rem] leading-relaxed max-w-2xl mx-auto text-center mb-12"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            These are not marketing words. They are promises I keep or you should find someone else.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className={`bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10${
                  i === VALUES.length - 1 ? " sm:col-span-2 sm:max-w-[calc(50%-0.625rem)] sm:mx-auto" : ""
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="w-6 h-6 rounded-full bg-coral/20 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.5 6.5L5 9l4.5-6"
                        stroke="#E8705A"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <h3
                    className="text-sand font-bold text-[0.9375rem]"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    {v.title}
                  </h3>
                </div>
                <p
                  className="text-sand/60 text-[0.875rem] leading-relaxed ml-9"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {v.body}
                </p>
              </div>
            ))}
          </div>

          <p
            className="text-sand/40 text-[0.9375rem] leading-relaxed text-center mt-10"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Most clients tell me the first call took ten minutes. The promises above are why they called at all.
          </p>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="bg-sand py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p
            className="text-[0.6875rem] font-semibold text-coral tracking-[0.2em] uppercase mb-3 text-center"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            What People Say
          </p>
          <h2
            className="text-[1.75rem] sm:text-[2.25rem] font-bold text-navy leading-tight mb-12 text-center"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            The people Jesse has worked with<span className="text-coral">.</span>
          </h2>

          <div className="grid sm:grid-cols-2 gap-5">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="bg-white rounded-xl p-6 border border-sand-2 shadow-sm"
              >
                <svg
                  className="text-coral/30 mb-4"
                  width="28"
                  height="20"
                  viewBox="0 0 28 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M0 20V8.571C0 2.857 4.2.476 8.4 0l1.05 2.857C5.95 4.286 5.25 6.19 5.25 8.571H10.5V20H0zm17.5 0V8.571C17.5 2.857 21.7.476 25.9 0l1.05 2.857c-3.5 1.429-4.2 3.333-4.2 5.714H28V20H17.5z" />
                </svg>
                <p
                  className="text-navy/70 text-[0.9375rem] leading-relaxed mb-4"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {r.quote}
                </p>
                <p
                  className="text-navy font-bold text-[0.875rem]"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {r.name}
                </p>
              </div>
            ))}
          </div>

          <p
            className="text-center mt-8"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            <a
              href="https://www.google.com/maps/place/Sherwood+Mortgage+Group"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral font-semibold text-[0.875rem] hover:underline"
            >
              All reviews on Google →
            </a>
          </p>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section className="bg-navy py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-[1.75rem] sm:text-[2rem] font-bold text-sand leading-tight mb-3"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Ready to talk through your situation<span className="text-coral">?</span>
          </h2>
          <p
            className="text-slate text-[1.0625rem] leading-relaxed mb-8"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            A 15-minute call is enough to know if I can help.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-coral text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-coral-dark transition-colors"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Book a Call
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

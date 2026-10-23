import type { Metadata } from "next";
import { social } from "@/lib/seo";
import Image from "next/image";
import PageShell from "@/components/PageShell";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import ContactCard from "@/components/about/ContactCard";

export const metadata: Metadata = {
  title: "About Jesse Karkoukly | Toronto Mortgage Agent",
  description:
    "Jesse Karkoukly is a Toronto mortgage agent with Sherwood Mortgage Group. A decade in tech, now helping first-time and self-employed buyers.",
  alternates: { canonical: "/about" },
  keywords: [
    "Toronto mortgage agent",
    "Jesse Karkoukly",
    "Sherwood Mortgage Group",
    "mortgage broker Toronto",
    "Ontario mortgage agent",
    "mortgage agent The Annex",
  ],
  ...social("About Jesse Karkoukly | Toronto Mortgage Agent", "Jesse Karkoukly is a Toronto mortgage agent with Sherwood Mortgage Group. A decade in tech, now helping first-time and self-employed buyers.", "/about"),
};

const VALUES = [
  {
    title: "Multiple options",
    body: "My role is to find you the best mortgage deal. I will always be direct and let you know which lenders are in the running for really good rates, promos and products for your specific situation.",
  },
  {
    title: "If your bank is better, I will tell you",
    body: "Simply put, if you have a deal I don't think I can beat, I will let you know straight up.",
  },
  {
    title: "You are never locked in",
    body: "For better or for worse, there are no contracts between you and me. Typically, I get paid directly by the lender for bringing them your deal. With some lenders, I can also get discounted rates through volume bonuses.",
  },
  {
    title: "Built on relationships",
    body: "I am building my business through relationships and referrals. I welcome any conversation and any question you have.",
  },
];

export default function AboutPage() {
  return (
    <PageShell hideFloatingCTAs>
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
                logical, clear, and well-documented. That is how I approach mortgages. I explain
                what your options are, based on your situation, so you can make a confident decision.
              </p>
              <p>
                I typically work with first-time homebuyers and self-employed borrowers looking to
                figure out what they qualify for and how to get the best possible mortgage. Mortgages
                are big decisions and can also come with a lot of complex feelings. I look forward to
                connecting with you.
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

      <ContactCard />

      {/* ── How Jesse works ── */}
      <section className="bg-sand py-16 lg:py-20 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-[2rem] sm:text-[2.5rem] text-navy leading-[1.1] mb-10"
            style={{ fontFamily: "var(--font-spectral)", fontWeight: 400 }}
          >
            A few things worth knowing upfront
          </h2>
          <ol className="m-0 p-0 list-none grid gap-4 sm:gap-5 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <li key={v.title} className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col gap-3">
                <span
                  aria-hidden="true"
                  className="text-[1.75rem] leading-none"
                  style={{ fontFamily: "var(--font-spectral)", color: "#7E6352" }}
                >
                  0{i + 1}
                </span>
                <h3
                  className="text-[1.375rem] sm:text-[1.5rem] text-navy leading-snug"
                  style={{ fontFamily: "var(--font-spectral)", fontWeight: 500 }}
                >
                  {v.title}
                </h3>
                <p
                  className="text-[1rem] leading-[1.65] text-[#5A4C44]"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {v.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </PageShell>
  );
}

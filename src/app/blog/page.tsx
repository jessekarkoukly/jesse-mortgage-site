import type { Metadata } from "next";
import Image from "next/image";
import PageShell from "@/components/PageShell";
import EmailCapture from "@/components/EmailCapture";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Mortgage Blog | Jesse Karkoukly, Licensed Ontario Mortgage Agent",
  description:
    "Mortgage insights, market context, and practical explanations from licensed Ontario mortgage agent Jesse Karkoukly.",
  alternates: { canonical: "/blog" },
  keywords: [
    "mortgage blog",
    "Ontario mortgage tips",
    "Toronto real estate",
    "mortgage advice Ontario",
    "Canadian mortgage guide",
    "mortgage insights Toronto",
  ],
  openGraph: {
    title: "Mortgage Blog | Jesse Karkoukly, Licensed Ontario Mortgage Agent",
    description:
      "Practical mortgage insights for Ontario buyers, homeowners, and investors from agent Jesse Karkoukly.",
    url: "https://jessekarkoukly.com/blog",
    siteName: "Jesse Karkoukly, Mortgage Agent",
    type: "website",
  },
};

const ARTICLES = [
  {
    title: "Mortgage Basics Before Buying a Home in Ontario",
    teaser:
      "Everything you should understand about how mortgages work in Ontario before you start looking at listings.",
    source: "Medium",
    href: "https://medium.com/@jessekarkoukly/mortgage-basics-before-buying-a-home-in-ontario-70d4f8cc7368",
    image: "/blog-mortgage-basics.png",
    imageStyle: "rounded" as const,
  },
  {
    title: "Why One Extra Mortgage Payment Matters More Than You Think",
    teaser:
      "A small change to your payment schedule can save you tens of thousands over the life of your mortgage. Here is the math.",
    source: "Medium",
    href: "https://medium.com/@jessekarkoukly/why-one-extra-mortgage-payment-matters-more-than-you-think-fdf31f552c98",
    image: "/blog-toronto-homes.png",
    imageStyle: "rounded" as const,
  },
  {
    title: "Down Payment Math for First-Time Buyers in Toronto",
    teaser:
      "The real numbers behind minimum down payments, CMHC insurance, and what it actually costs to buy in Toronto.",
    source: "LinkedIn",
    href: "https://www.linkedin.com/posts/jessekarkoukly_firsttimehomebuyer-torontorealestate-torontohomes-activity-7435353483437899776-gvDi",
    image: "/blog-linkedin-jesse.jpg",
    imageStyle: "linkedin" as const,
  },
];

const COMING_SOON = [
  {
    title: "How much do you actually need saved to buy in Toronto?",
    description:
      "Down payment, land transfer tax, legal fees, closing costs. The real number is higher than most people expect. Here is how to calculate it.",
  },
  {
    title: "Fixed vs variable in 2026: what makes sense right now",
    description:
      "The answer depends on your situation, your timeline, and your tolerance for uncertainty. A breakdown of what to consider before you decide.",
  },
  {
    title: "What self-employed borrowers need to know before applying",
    description:
      "How lenders assess self-employed income, what documentation helps, and how to position your file before shopping for a mortgage.",
  },
];

export default function BlogPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[{ name: "Blog", href: "/blog" }]} />
      {/* Hero */}
      <section className="bg-sand pt-28 pb-20 px-6 lg:pt-32">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-[0.75rem] font-semibold text-coral uppercase tracking-widest mb-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            From Jesse
          </p>
          <h1
            className="text-[2.5rem] sm:text-[3rem] font-bold text-navy leading-tight mb-6"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Mortgage insights from a licensed Ontario agent<span className="text-coral">.</span>
          </h1>
        </div>
      </section>

      {/* Published articles */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-6">
            {ARTICLES.map((article) => (
              <a
                key={article.title}
                href={article.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-sand-2 rounded-xl p-7 hover:border-coral/40 hover:shadow-md transition-all block"
              >
                <div className="flex gap-6 items-start">
                  {/* Article image */}
                  <div className="hidden sm:block shrink-0">
                    {article.imageStyle === "linkedin" ? (
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-sand-2">
                          <Image
                            src={article.image}
                            alt={article.title}
                            width={96}
                            height={96}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        {/* LinkedIn badge */}
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#0A66C2] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <div className="w-32 h-24 rounded-lg overflow-hidden border border-sand-2">
                        <Image
                          src={article.image}
                          alt={article.title}
                          width={128}
                          height={96}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                  </div>

                  {/* Article content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3">
                      {article.source === "LinkedIn" ? (
                        <span className="inline-flex items-center gap-1.5 bg-sand-2 px-2.5 py-1 rounded-full">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="#0A66C2">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-[#0A66C2]" style={{ fontFamily: "var(--font-jakarta)" }}>LinkedIn</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 bg-sand-2 px-2.5 py-1 rounded-full">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="#242424">
                            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zm2.94 0c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75c.66 0 1.19 2.58 1.19 5.75z"/>
                          </svg>
                          <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-[#242424]" style={{ fontFamily: "var(--font-jakarta)" }}>Medium</span>
                        </span>
                      )}
                    </div>
                    <h2
                      className="text-[1.375rem] font-bold text-navy mb-3 leading-snug"
                      style={{ fontFamily: "var(--font-spectral)" }}
                    >
                      {article.title}
                    </h2>
                    <p
                      className="text-[1.0625rem] text-navy-2 leading-relaxed mb-4"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      {article.teaser}
                    </p>
                    <span
                      className="inline-flex items-center gap-1.5 text-coral font-semibold text-[0.9375rem]"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      Read article
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Coming soon */}
      <section className="bg-sand py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-[0.75rem] font-semibold text-slate uppercase tracking-widest mb-8"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Coming soon
          </p>
          <div className="flex flex-col gap-6">
            {COMING_SOON.map((post) => (
              <article
                key={post.title}
                className="border border-sand-2 rounded-xl p-7 bg-white/60"
              >
                <h2
                  className="text-[1.25rem] font-bold text-navy mb-3 leading-snug"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  {post.title}
                </h2>
                <p
                  className="text-[1.0625rem] text-slate leading-relaxed"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {post.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      {/* Stay in the loop */}
      <EmailCapture variant="navy" />
    </PageShell>
  );
}

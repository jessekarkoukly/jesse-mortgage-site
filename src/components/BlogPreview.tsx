"use client";

import Image from "next/image";

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

export default function BlogPreview() {
  return (
    <section className="bg-white py-16 md:py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <p
          className="text-[0.6875rem] font-semibold text-coral tracking-[0.2em] uppercase mb-3 text-center"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          From Jesse
        </p>
        <h2
          className="text-[1.75rem] sm:text-[2.25rem] font-bold text-navy leading-tight mb-10 text-center"
          style={{ fontFamily: "var(--font-spectral)" }}
        >
          Recent writing<span className="text-coral">.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ARTICLES.map((article) => (
            <a
              key={article.title}
              href={article.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl border border-sand-2 p-6 hover:border-coral/40 hover:shadow-md transition-all flex flex-col"
            >
              {/* Article thumbnail */}
              <div className="mb-4">
                {article.imageStyle === "linkedin" ? (
                  <div className="relative inline-block">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-sand-2">
                      <Image
                        src={article.image}
                        alt={article.title}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-[#0A66C2] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className="w-full aspect-[16/9] rounded-lg overflow-hidden border border-sand-2">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={400}
                      height={225}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
              </div>

              {article.source === "LinkedIn" ? (
                <span className="inline-flex items-center gap-1.5 bg-sand-2 px-2.5 py-1 rounded-full mb-4 self-start">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#0A66C2">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-[#0A66C2]" style={{ fontFamily: "var(--font-jakarta)" }}>LinkedIn</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 bg-sand-2 px-2.5 py-1 rounded-full mb-4 self-start">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#242424">
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zm2.94 0c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75c.66 0 1.19 2.58 1.19 5.75z"/>
                  </svg>
                  <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-[#242424]" style={{ fontFamily: "var(--font-jakarta)" }}>Medium</span>
                </span>
              )}
              <h3
                className="text-navy font-bold text-[1.125rem] leading-snug mb-3"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                {article.title}
              </h3>
              <p
                className="text-[0.9375rem] text-navy-2 leading-relaxed mb-4 flex-1"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {article.teaser}
              </p>
              <span
                className="inline-flex items-center gap-1.5 text-coral font-semibold text-[0.875rem]"
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

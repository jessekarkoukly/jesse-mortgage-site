"use client";

import Image from "next/image";
import Link from "next/link";
import { posts } from "@/data/posts";

type Card = {
  title: string;
  teaser: string;
  date: string; // YYYY-MM-DD
  tag: string;
  href: string;
  external: boolean;
  source?: "Medium" | "LinkedIn";
  image: string;
};

// Articles published off-site. Dates from the original posts.
const EXTERNAL: Card[] = [
  {
    title: "Down Payment Math for First-Time Buyers in Toronto",
    teaser: "The real numbers behind minimum down payments, CMHC insurance, and what it actually costs to buy in Toronto.",
    date: "2026-03-05",
    tag: "First-time buyers",
    href: "https://www.linkedin.com/posts/jessekarkoukly_firsttimehomebuyer-torontorealestate-torontohomes-activity-7435353483437899776-gvDi",
    external: true,
    source: "LinkedIn",
    image: "/blog-linkedin-jesse.jpg",
  },
  {
    title: "Why One Extra Mortgage Payment Matters More Than You Think",
    teaser: "A small change to your payment schedule can save you tens of thousands over the life of your mortgage. Here is the math.",
    date: "2026-02-10",
    tag: "Homeowners",
    href: "https://medium.com/@jessekarkoukly/why-one-extra-mortgage-payment-matters-more-than-you-think-fdf31f552c98",
    external: true,
    source: "Medium",
    image: "/blog-toronto-homes.png",
  },
  {
    title: "Mortgage Basics Before Buying a Home in Ontario",
    teaser: "Everything you should understand about how mortgages work in Ontario before you start looking at listings.",
    date: "2026-02-02",
    tag: "First-time buyers",
    href: "https://medium.com/@jessekarkoukly/mortgage-basics-before-buying-a-home-in-ontario-70d4f8cc7368",
    external: true,
    source: "Medium",
    image: "/blog-mortgage-basics.png",
  },
];

// Short tag for a site post's category
function tagFor(category: string) {
  const c = category.toLowerCase();
  if (c.includes("self")) return "Self-employed";
  if (c.includes("first")) return "First-time buyers";
  if (c.includes("renew")) return "Mortgage renewal";
  return category;
}

// Site posts plus external articles, newest first. The newest article always leads.
const CARDS: Card[] = [
  ...posts.map((p) => ({
    title: p.h1,
    teaser: p.teaser,
    date: p.published,
    tag: tagFor(p.category),
    href: `/blog/${p.slug}`,
    external: false,
    image: p.image.src,
  })),
  ...EXTERNAL,
]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 3);

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
}

function CardBody({ c }: { c: Card }) {
  return (
    <>
      <div className="w-full aspect-[16/10] rounded-lg overflow-hidden bg-[#EBE2D7] mb-4">
        <Image src={c.image} alt="" width={480} height={300} className="object-cover w-full h-full" />
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
        <span className="rounded-full bg-[#F5EFE8] px-3 py-1 text-[0.8125rem] font-semibold text-[#4F6B7A]" style={{ fontFamily: "var(--font-jakarta)" }}>
          {c.tag}
        </span>
        <time dateTime={c.date} className="text-[0.8125rem] text-[#5A4C44]" style={{ fontFamily: "var(--font-jakarta)" }}>
          {formatDate(c.date)}
        </time>
      </div>
      <h3 className="text-[#352B26] text-[1.25rem] leading-snug mb-3" style={{ fontFamily: "var(--font-spectral)", fontWeight: 500 }}>
        {c.title}
      </h3>
      <p className="text-[0.9375rem] text-[#5A4C44] leading-relaxed mb-4 flex-1" style={{ fontFamily: "var(--font-jakarta)" }}>
        {c.teaser}
      </p>
      <span className="inline-flex items-center gap-1.5 text-[#352B26] group-hover:text-[#4F6B7A] font-semibold text-[0.9375rem] underline underline-offset-2" style={{ fontFamily: "var(--font-jakarta)" }}>
        {c.external ? `Read on ${c.source}` : "Read the article"} <span aria-hidden="true">→</span>
      </span>
    </>
  );
}

export default function BlogPreview() {
  const cls =
    "group bg-white rounded-2xl border-[1.5px] border-[#E3D9CD] p-5 hover:border-[#4F6B7A] transition-colors duration-150 flex flex-col";
  return (
    <section className="bg-white py-16 lg:py-20 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 mb-8">
          <h2 className="m-0 text-[2.125rem] sm:text-[2.75rem] leading-[1.1] text-[#352B26]" style={{ fontFamily: "var(--font-spectral)", fontWeight: 400 }}>
            Blog
          </h2>
          <Link href="/blog" className="ml-auto text-[0.9375rem] font-semibold underline underline-offset-2 text-[#352B26] hover:text-[#4F6B7A] py-2" style={{ fontFamily: "var(--font-jakarta)" }}>
            All articles
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CARDS.map((c) =>
            c.external ? (
              <a key={c.href} href={c.href} target="_blank" rel="noopener noreferrer" className={cls}>
                <CardBody c={c} />
              </a>
            ) : (
              <Link key={c.href} href={c.href} className={cls}>
                <CardBody c={c} />
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

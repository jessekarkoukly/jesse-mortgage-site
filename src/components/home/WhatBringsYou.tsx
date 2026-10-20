import Link from "next/link";
import { B, serif, sans } from "./brand";

const CARDS = [
  { title: "Starting to think about buying", body: "What you qualify for, the programs you can use and the closing costs, in order.", link: "First-time buyers", href: "/services/first-time-buyers" },
  { title: "Ready to make offers", body: "A clear number and a plan before you start looking at homes.", link: "Pre-approval", href: "/services/pre-approval" },
  { title: "Renewal coming up", body: "A look at your options before your lender sends the renewal letter.", link: "Renewals", href: "/services/renewal" },
  { title: "Already own, want to change something", body: "Refinancing, using your equity or rolling debt into your mortgage.", link: "Refinance", href: "/services/refinancing" },
];

const QUESTIONS = [
  { q: "I’m self-employed. Can I qualify?", href: "/services/self-employed" },
  { q: "Which first-time buyer programs can I use?", href: "/services/first-time-buyers" },
  { q: "How much can I afford?", href: "/calculators/affordability" },
  { q: "What will my closing costs be?", href: "/calculators/closing-costs" },
];

export default function WhatBringsYou() {
  return (
    <section className="px-5 sm:px-6 py-16 lg:py-20" style={{ background: B.linen }}>
      <div className="max-w-6xl mx-auto flex flex-col gap-7">
        <h2 className="m-0 text-[2.125rem] sm:text-[2.75rem] leading-[1.1]" style={{ ...serif, color: B.espresso, fontWeight: 400 }}>
          What brings you here?
        </h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group flex flex-col gap-2.5 rounded-[18px] p-6 bg-white border-[1.5px] border-white hover:border-[#4F6B7A] transition-colors duration-150"
            >
              <span className="text-[1.1875rem] font-bold leading-snug" style={{ ...sans, color: B.espresso }}>{c.title}</span>
              <span className="text-[0.9375rem] leading-relaxed" style={{ ...sans, color: B.body }}>{c.body}</span>
              <span className="mt-auto pt-1.5 text-[0.9375rem] font-semibold underline underline-offset-2 group-hover:text-[#4F6B7A]" style={{ ...sans, color: B.espresso }}>
                {c.link}
              </span>
            </Link>
          ))}
        </div>
        <div className="grid gap-2.5 grid-cols-1 md:grid-cols-2">
          {QUESTIONS.map((q) => (
            <Link
              key={q.q}
              href={q.href}
              className="group flex items-center justify-between gap-4 rounded-xl px-5 py-4 min-h-[56px] border-[1.5px] border-[#E3D9CD] hover:border-[#4F6B7A] transition-colors duration-150"
            >
              <span className="text-[1rem] font-medium group-hover:text-[#4F6B7A]" style={{ ...sans, color: B.espresso }}>{q.q}</span>
              <span aria-hidden="true" className="group-hover:text-[#4F6B7A]" style={{ color: B.espresso }}>→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

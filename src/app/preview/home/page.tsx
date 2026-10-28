import type { Metadata } from "next";
import Link from "next/link";
import JesseFooter from "@/components/JesseFooter";
import { B, serif, sans } from "@/components/home/brand";

export const metadata: Metadata = {
  title: "Homepage concepts | Preview",
  robots: { index: false, follow: false },
};

const CONCEPTS = [
  {
    href: "/preview/home/a",
    name: "A. In your corner",
    idea: "Leads with you: your portrait and “You should understand exactly what you’re signing.” Then client words, your 2021 story and a plain facts block. The calmest of the three, and the strongest for Google and AI search.",
  },
  {
    href: "/preview/home/b",
    name: "B. Know your numbers",
    idea: "Leads with what people get: the written plan with real Toronto math, on the desk beside your portrait. Then your promises and a self-employed band. The closest to the First Home Plan page you approved.",
  },
  {
    href: "/preview/home/c",
    name: "C. Start here",
    idea: "Leads with a question. Visitors tap their situation and get your short answer and the right next step, with the topic filled in when they book. Includes a document checklist and a note for realtors.",
  },
];

const FIXES = [
  "Your 2021 story replaces the About line your rules ban.",
  "Stars and your review count sit in the hero. Reviews show whole sentences, word for word.",
  "Your name, Sherwood and your descriptor are on the page as text, for Google and AI search.",
  "One button shape, square bands and ruled rows. The arch is only your portrait and the door.",
  "No lender logos, no swipe deck, and the page ends once.",
  "A sticky Schedule a call bar on phones.",
  "FAQ answers lead with the answer, with no rate promises, and say “mortgage agent”, not “broker”, for you.",
  "Schema without Mortgage Architects or “Free consultation”.",
];

export default function Page() {
  return (
    <>
      <main className="px-5 sm:px-8 py-16 lg:py-24" style={{ background: B.linen }}>
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <p className="m-0 text-[1.0625rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>Private preview, not indexed</p>
            <h1 className="m-0 text-[2.5rem] sm:text-[3.25rem] leading-[1.05]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>Three homepage concepts</h1>
            <p className="m-0 text-[1.125rem] leading-[1.6] max-w-2xl" style={{ ...sans, color: B.body }}>
              Each one is a full homepage built from the seven expert reviews: SEO, GEO, AEO, UX and AI, design, anti AI slop and brand. The buttons open the real forms, so please don’t send them from here.
            </p>
          </div>
          <ol className="m-0 p-0 list-none flex flex-col border-t" style={{ borderColor: B.espresso }}>
            {CONCEPTS.map((c) => (
              <li key={c.href} className="border-b" style={{ borderColor: B.line }}>
                <Link href={c.href} className="group grid gap-3 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-10 py-8">
                  <span className="text-[1.75rem] sm:text-[2rem] leading-tight transition-colors duration-150 group-hover:text-[#4F6B7A]" style={{ ...serif, color: B.espresso }}>{c.name}</span>
                  <span className="flex flex-col gap-2">
                    <span className="text-[1.0625rem] leading-[1.6]" style={{ ...sans, color: B.body }}>{c.idea}</span>
                    <span className="text-[1rem] font-semibold underline underline-offset-4 transition-colors duration-150 group-hover:text-[#4F6B7A]" style={{ ...sans, color: B.espresso }}>Open concept</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          <div className="flex flex-col gap-4">
            <h2 className="m-0 text-[1.75rem]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>What all three fix</h2>
            <ul className="m-0 pl-5 flex flex-col gap-2 text-[1.0625rem] leading-[1.55]" style={{ ...sans, color: B.body }}>
              {FIXES.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </div>
        </div>
      </main>
      <JesseFooter />
    </>
  );
}

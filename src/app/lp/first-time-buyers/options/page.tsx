import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import JesseFooter from "@/components/JesseFooter";
import { B, serif, sans } from "@/components/home/brand";

// Review page for Jesse and Matt: the four first-time buyer landing page options side by side. Hidden from search.
export const metadata: Metadata = {
  title: "First-Time Buyer Landing Options | Jesse Karkoukly",
  description: "Four landing page options for the first-time buyer ads.",
  robots: { index: false, follow: false },
};

const OPTIONS = [
  {
    href: "/lp/first-time-buyers/a",
    name: "A. The First Home Plan",
    how: "Long-form page on Sabri Suby’s King Kong structure. The plan quiz sits in the hero and again at the close.",
    best: "Cold Facebook traffic that needs to trust you before it fills anything in.",
    lead: "Plan request with phone, lands on the thank-you page with Calendly.",
  },
  {
    href: "/lp/first-time-buyers/b",
    name: "B. See how far your savings go",
    how: "A savings calculator first: the most home their cash covers, after land transfer tax and closing costs. Then three taps for the full number.",
    best: "People who want a number before they talk to anyone.",
    lead: "Full-number request with savings, city and phone, lands on the thank-you page.",
  },
  {
    href: "/lp/first-time-buyers/c",
    name: "C. The Playbook",
    how: "First name and email for a real Ontario playbook that opens right away. The plan form waits at the end of it.",
    best: "People a year or more out. Usually cheaper leads, but the least ready to talk, so they need follow-up.",
    lead: "Playbook signup, counted as its own Meta event (CompleteRegistration), not a Lead.",
  },
  {
    href: "/lp/first-time-buyers/d",
    name: "D. Text with Jesse",
    how: "The same four plan questions as a text conversation with you, made for phones.",
    best: "Instagram and Facebook traffic on phones.",
    lead: "Plan request with phone, lands on the thank-you page with Calendly.",
  },
];

export default function Page() {
  return (
    <div style={{ background: B.linen }}>
      <header className="px-5 sm:px-6 py-3 bg-white border-b" style={{ borderColor: B.line }}>
        <div className="max-w-5xl mx-auto"><Image src="/jesse-logo.png" alt="Jesse Karkoukly, Mortgage Agent" width={224} height={48} className="h-9 w-auto" /></div>
      </header>
      <main className="px-5 sm:px-6 py-12 lg:py-16">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h1 className="m-0 text-[2.25rem] sm:text-[3rem] leading-[1.05]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>First-time buyer landing pages</h1>
            <p className="m-0 text-[1.125rem] leading-relaxed max-w-2xl" style={{ ...sans, color: B.body }}>
              Four options for the ads. Same photo, same reviews (Daniella Guzzi first, Rebecca Marshello second), different way in.
            </p>
          </div>
          <ul className="m-0 p-0 list-none grid gap-4 md:grid-cols-2">
            {OPTIONS.map((o) => (
              <li key={o.href} className="rounded-[20px] bg-white p-6 sm:p-7 flex flex-col gap-3" style={sans}>
                <h2 className="m-0 text-[1.5rem] leading-snug" style={{ ...serif, fontWeight: 500, color: B.espresso }}>{o.name}</h2>
                <p className="m-0 text-[1rem] leading-relaxed" style={{ color: B.bodyDark }}>{o.how}</p>
                <p className="m-0 text-[0.9375rem] leading-relaxed" style={{ color: B.body }}><span className="font-semibold" style={{ color: B.espresso }}>Best for:</span> {o.best}</p>
                <p className="m-0 text-[0.9375rem] leading-relaxed" style={{ color: B.body }}><span className="font-semibold" style={{ color: B.espresso }}>The lead:</span> {o.lead}</p>
                <Link href={o.href} className="mt-auto self-start rounded-full px-6 py-3 min-h-[48px] flex items-center text-[1rem] font-semibold bg-[#4F6B7A] text-white hover:bg-[#352B26] transition-colors duration-150">Open {o.name.split(".")[0]}</Link>
              </li>
            ))}
          </ul>
          <p className="m-0 text-[0.9375rem]" style={{ ...sans, color: B.body }}>
            The playbook itself, as people see it after signing up: <Link href="/lp/first-time-buyers/playbook" className="underline underline-offset-2 font-semibold" style={{ color: B.espresso }}>open the playbook</Link>.
          </p>
        </div>
      </main>
      <JesseFooter />
    </div>
  );
}

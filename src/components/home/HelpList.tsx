import Link from "next/link";
import { B, serif, sans } from "./brand";

const ITEMS = [
  { label: "First-time buyers", href: "/services/first-time-buyers" },
  { label: "Self-employed", href: "/services/self-employed" },
  { label: "Pre-approval", href: "/services/pre-approval" },
  { label: "Renewals", href: "/services/renewal" },
  { label: "Refinancing and equity", href: "/services/refinancing" },
  { label: "Debt consolidation", href: "/services/debt-consolidation" },
  { label: "Cottages and vacation homes", href: "/services/cottage" },
  { label: "Specialty programs", href: "/services/specialty" },
];

export default function HelpList() {
  return (
    <section className="px-5 sm:px-6 py-16 lg:py-20" style={{ background: B.linen }}>
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-14">
        <h2 className="m-0 lg:w-[320px] shrink-0 text-[1.875rem] sm:text-[2.5rem] leading-[1.15]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>
          Everything I help with
        </h2>
        <ul className="m-0 p-0 list-none flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 border-b border-[#D8CCC0]">
          {ITEMS.map((it) => (
            <li key={it.href} className="border-t border-[#D8CCC0]">
              <Link href={it.href} className="flex justify-between items-center py-4 min-h-[48px] text-[1.0625rem] font-medium hover:text-[#4F6B7A] transition-colors duration-150" style={{ ...sans, color: B.espresso }}>
                {it.label}<span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

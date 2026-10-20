import Link from "next/link";
import { B, serif, sans } from "./brand";

const STEPS = ["Intro call", "List of documents needed", "Personalized roadmap", "Pre-approval", "Mortgage commitment"];

export default function HowItWorks() {
  return (
    <section className="px-5 sm:px-6 py-16 lg:py-20" style={{ background: B.sand }}>
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <h2 className="m-0 text-[2.125rem] sm:text-[2.75rem] leading-[1.1]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>How it works</h2>
          <Link href="/working-with-jesse" className="ml-auto text-[0.9375rem] font-semibold underline underline-offset-2 hover:text-[#4F6B7A] py-2" style={{ ...sans, color: B.espresso }}>
            Each step in detail
          </Link>
        </div>
        <ol className="m-0 p-0 list-none grid gap-3.5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {STEPS.map((s, i) => (
            <li key={s} className="rounded-2xl p-5 flex flex-col gap-2" style={{ background: B.linen }}>
              <span className="text-[1.75rem]" style={{ ...serif, color: B.clay }}>0{i + 1}</span>
              <b className="text-[1.0625rem] leading-snug" style={{ ...sans, color: B.espresso }}>{s}</b>
            </li>
          ))}
          <li className="relative overflow-hidden rounded-2xl p-5 flex flex-col gap-2" style={{ background: B.skyDeep, color: B.linen, boxShadow: "0 10px 28px rgba(79,107,122,0.35)" }}>
            <svg aria-hidden="true" width="120" height="120" viewBox="0 0 120 120" className="absolute -right-2.5 -top-2.5">
              <g fill="none" stroke={B.skyLight} strokeWidth="2" strokeLinecap="round"><path d="M88 22v12M82 28h12" /><path d="M104 46v8M100 50h8" /><path d="M70 10v6M67 13h6" /></g>
              <circle cx="98" cy="30" r="2.5" fill={B.linen} /><circle cx="80" cy="44" r="2" fill={B.clayLight} /><circle cx="110" cy="14" r="2" fill={B.clayLight} />
            </svg>
            <span className="text-[1.75rem]" style={{ ...serif, color: B.skyLight }}>06</span>
            <span className="flex items-center gap-2.5">
              <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={B.linen} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="7.5" cy="15.5" r="4.5" /><path d="M10.7 12.3 20 3" /><path d="m16 7 3 3" /><path d="m18 5 2 2" />
              </svg>
              <b className="text-[1.125rem]" style={sans}>Keys in hand</b>
            </span>
          </li>
        </ol>
      </div>
    </section>
  );
}

"use client";

import { B, JESSE_EMAIL, serif, sans } from "@/components/home/brand";

const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=390+Dupont+St+Suite+201+Toronto+ON+M5R+1V9";

function Icon({ d }: { d: string }) {
  return (
    <span className="w-11 h-11 shrink-0 rounded-full bg-white flex items-center justify-center" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={B.clayDeep} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
      </svg>
    </span>
  );
}

const PHONE = "M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2";
const MAIL = "M3 6h18v12H3zM3 7l9 6 9-6";
const PIN = "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5";
const BADGE = "M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6zM9 12l2 2 4-4";

export default function ContactCard() {
  const label = "text-[1rem] leading-tight";
  const value = "text-[1rem] font-semibold leading-snug";

  return (
    <section className="bg-white px-5 sm:px-6 py-14 lg:py-16">
      <div className="max-w-6xl mx-auto rounded-3xl px-6 sm:px-10 py-8 sm:py-10 flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-center" style={{ background: B.linen }}>
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          <h2 className="m-0 text-[2rem] sm:text-[2.25rem] leading-[1.1]" style={{ ...serif, fontWeight: 500, color: B.espresso }}>Contact</h2>

          <ul className="m-0 p-0 list-none grid gap-6 sm:grid-cols-2" style={sans}>
            <li className="flex items-start gap-4">
              <Icon d={PHONE} />
              <span className="flex flex-col gap-1">
                <span className={label} style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>Call or text</span>
                <a href="tel:4162762666" className={`${value} hover:text-[#4F6B7A] transition-colors duration-150`} style={{ color: B.espresso }}>416-276-2666</a>
              </span>
            </li>
            <li className="flex items-start gap-4">
              <Icon d={MAIL} />
              <span className="flex flex-col gap-1 min-w-0">
                <span className={label} style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>Email</span>
                <a href={`mailto:${JESSE_EMAIL}`} className={`${value} hover:text-[#4F6B7A] transition-colors duration-150`} style={{ color: B.espresso }}>jkarkoukly@<wbr />sherwoodmortgagegroup.com</a>
              </span>
            </li>
            <li className="flex items-start gap-4">
              <Icon d={PIN} />
              <span className="flex flex-col gap-1">
                <span className={label} style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>Office</span>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={`${value} hover:text-[#4F6B7A] transition-colors duration-150`} style={{ color: B.espresso }}>
                  390 Dupont St, Suite 201<br />Toronto, ON M5R 1V9
                </a>
                <span className="text-[0.9375rem]" style={{ color: B.body }}>Working with clients across Ontario</span>
              </span>
            </li>
            <li className="flex items-start gap-4">
              <Icon d={BADGE} />
              <span className="flex flex-col gap-1">
                <span className={label} style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>Licensing</span>
                <span className={value} style={{ color: B.espresso }}>Mortgage Agent, Lic. M25003068</span>
                <span className="text-[0.9375rem]" style={{ color: B.body }}>Sherwood Mortgage Group, Brokerage Lic. 12176</span>
              </span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 lg:w-[280px] shrink-0" style={sans}>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-booking-modal"))}
            className="cursor-pointer w-full rounded-full px-7 py-4 min-h-[52px] text-[1rem] font-semibold transition-colors duration-150 bg-[#352B26] text-[#F5EFE8] border-[1.5px] border-[#352B26] hover:bg-[#4F6B7A] hover:border-[#4F6B7A]"
          >
            Schedule a call
          </button>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-story-form"))}
            className="cursor-pointer w-full rounded-full px-7 py-4 min-h-[52px] text-[1rem] font-semibold transition-colors duration-150 bg-transparent text-[#352B26] border-[1.5px] border-[#352B26] hover:text-[#4F6B7A] hover:border-[#4F6B7A]"
          >
            Start the conversation
          </button>
        </div>
      </div>
    </section>
  );
}

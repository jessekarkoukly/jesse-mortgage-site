"use client";

import Image from "next/image";
import { useState } from "react";
import { B, JESSE_EMAIL, serif, sans } from "@/components/home/brand";

const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=390+Dupont+St+Suite+201+Toronto+ON+M5R+1V9";

function Icon({ d, color = B.clayDeep }: { d: string; color?: string }) {
  return (
    <span className="w-11 h-11 shrink-0 rounded-full flex items-center justify-center" style={{ background: B.linen }} aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
      </svg>
    </span>
  );
}

const PHONE = "M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2";
const MAIL = "M3 6h18v12H3zM3 7l9 6 9-6";
const CHECK = "M5 12.5l4.5 4.5L19 7.5";
const PIN = "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5";
const BADGE = "M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6zM9 12l2 2 4-4";

/**
 * Business card with Jesse's contact details and both buttons.
 * Used at the top of /about and as the main content of /contact.
 * Everything is plain text in the page, so search engines and AI tools read it.
 */
export default function ContactCard({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const [copied, setCopied] = useState(false);
  const Heading = headingLevel;
  const label = "text-[0.9375rem] leading-tight";
  const value = "text-[1rem] font-semibold leading-snug";

  async function copyEmail(e: React.MouseEvent) {
    // Copy on click; the link still works as mailto if copying is not possible.
    try {
      await navigator.clipboard.writeText(JESSE_EMAIL);
      e.preventDefault();
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  return (
    <div className="jk-card-drop w-full max-w-[880px] mx-auto rounded-[28px] bg-white px-6 sm:px-10 py-8 sm:py-10 shadow-[0_24px_60px_rgba(53,43,38,0.14),0_2px_6px_rgba(53,43,38,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Image src="/jesse-logo.png" alt="Jesse Karkoukly, Mortgage Agent" width={224} height={48} className="h-12 sm:h-14 w-auto" />
        <Heading className="m-0 text-[1.0625rem]" style={{ ...serif, fontStyle: "italic", fontWeight: 400, color: B.clayDeep }}>
          Contact Jesse Karkoukly
        </Heading>
      </div>

      <div className="h-px my-7" style={{ background: B.line }} />

      <ul className="m-0 p-0 list-none grid gap-6 sm:grid-cols-2" style={sans}>
        <li className="flex items-start gap-4">
          <Icon d={PHONE} />
          <span className="flex flex-col gap-1">
            <span className={label} style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>Call or text</span>
            <a href="tel:4162762666" className={`${value} hover:text-[#4F6B7A] transition-colors duration-150`} style={{ color: B.espresso }}>416-276-2666</a>
          </span>
        </li>
        <li className="flex items-start gap-4">
          <Icon d={copied ? CHECK : MAIL} color={copied ? B.skyDeep : B.clayDeep} />
          <span className="flex flex-col gap-1 min-w-0">
            <span className={label} style={{ ...serif, fontStyle: "italic", color: copied ? B.skyDeep : B.clayDeep }}>{copied ? "Copied" : "Email"}</span>
            <a href={`mailto:${JESSE_EMAIL}`} onClick={copyEmail} title="Click to copy" className={`${value} hover:text-[#4F6B7A] transition-colors duration-150`} style={{ color: B.espresso }}>
              jkarkoukly@<wbr />sherwoodmortgagegroup.com
            </a>
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

      <div className="flex flex-col sm:flex-row gap-3 mt-8" style={sans}>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent("open-booking-modal"))}
          className="cursor-pointer sm:flex-1 rounded-full px-7 py-4 min-h-[52px] text-[1rem] font-semibold transition-colors duration-150 bg-[#352B26] text-[#F5EFE8] border-[1.5px] border-[#352B26] hover:bg-[#4F6B7A] hover:border-[#4F6B7A]"
        >
          Schedule a call
        </button>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent("open-story-form"))}
          className="cursor-pointer sm:flex-1 rounded-full px-7 py-4 min-h-[52px] text-[1rem] font-semibold transition-colors duration-150 bg-transparent text-[#352B26] border-[1.5px] border-[#352B26] hover:text-[#4F6B7A] hover:border-[#4F6B7A]"
        >
          Start the conversation
        </button>
      </div>
    </div>
  );
}

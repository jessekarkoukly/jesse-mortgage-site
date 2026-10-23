"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { B, JESSE_EMAIL, serif, sans } from "@/components/home/brand";

/**
 * "Contact" pill in the nav that grows into a business card.
 * The card is clipped to the pill's shape and opens out from it, then the details fade in.
 */
export default function ContactPill({ onSchedule, mobile = false }: { onSchedule?: () => void; mobile?: boolean }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function toggle() {
    if (!open) trackEvent("contact_card_open");
    setOpen((o) => !o);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(JESSE_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${JESSE_EMAIL}`;
    }
  }

  // Closed: the card is clipped down to the pill in its top-right corner. Open: the full card.
  const closedClip = mobile ? "inset(0 0 calc(100% - 44px) calc(100% - 104px) round 999px)" : "inset(0 0 calc(100% - 46px) calc(100% - 118px) round 999px)";
  const row = "flex items-center gap-3.5 min-h-[44px]";
  const iconWrap = "w-10 h-10 shrink-0 rounded-full bg-white flex items-center justify-center";

  return (
    <div ref={wrapRef} className="relative">
      {mobile && (
        <div
          aria-hidden="true"
          className="fixed inset-x-0 bottom-0 top-16 z-0 transition-opacity duration-300"
          style={{ background: "rgba(30,24,21,0.35)", opacity: open ? 1 : 0, pointerEvents: "none" }}
        />
      )}
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="contact-card"
        className={`relative z-[2] cursor-pointer rounded-full border-[1.5px] font-semibold flex items-center gap-2 transition-colors duration-150 ${
          mobile ? "h-11 px-4 text-[0.9375rem]" : "h-[46px] px-5 text-[1rem]"
        } ${open ? "border-transparent text-[#352B26]" : "border-[#352B26] text-[#352B26] hover:border-[#4F6B7A] hover:text-[#4F6B7A]"}`}
        style={sans}
      >
        Contact
        <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" className="transition-transform duration-300" style={{ transform: open ? "rotate(45deg)" : "none" }}>
          <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      <div
        id="contact-card"
        role="dialog"
        aria-label="Contact Jesse"
        aria-hidden={!open}
        className={`${mobile ? "fixed left-3 right-3 top-[68px]" : "absolute right-0 top-0 w-[380px]"} z-[1] rounded-[22px] origin-top-right`}
        style={{
          background: B.linen,
          border: open ? `1px solid ${B.line}` : "1px solid transparent",
          boxShadow: open ? "0 24px 60px rgba(53,43,38,0.22), 0 2px 8px rgba(53,43,38,0.08)" : "none",
          clipPath: open || mobile ? "inset(0 round 22px)" : closedClip,
          opacity: mobile ? (open ? 1 : 0) : 1,
          transform: mobile ? (open ? "translateY(0) scale(1)" : "translateY(-8px) scale(0.97)") : "none",
          visibility: open ? "visible" : mobile ? "hidden" : "visible",
          pointerEvents: open ? "auto" : "none",
          transition: "clip-path 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease, opacity 0.25s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1), visibility 0.35s",
        }}
      >
        <div
          className={`flex flex-col gap-4 px-6 pb-6 ${mobile ? "pt-6" : "pt-[66px]"}`}
          style={{ ...sans, opacity: open ? 1 : 0, transform: open ? "none" : "translateY(6px)", transition: `opacity 0.3s ease ${open ? "0.18s" : "0s"}, transform 0.4s ease ${open ? "0.18s" : "0s"}` }}
        >
          <Image src="/jesse-logo.png" alt="Jesse Karkoukly, Mortgage Agent" width={224} height={48} className="h-11 w-auto self-start" />
          <div className="h-px" style={{ background: B.line }} />

          <a href="tel:4162762666" className={`${row} group`} tabIndex={open ? 0 : -1}>
            <span className={iconWrap} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={B.clayDeep} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
            </span>
            <span className="flex flex-col">
              <span className="text-[0.9375rem] leading-tight" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>Call or text</span>
              <span className="text-[1rem] font-semibold group-hover:text-[#4F6B7A] transition-colors" style={{ color: B.espresso }}>416-276-2666</span>
            </span>
          </a>

          <button type="button" onClick={copyEmail} className={`${row} group text-left cursor-pointer`} tabIndex={open ? 0 : -1} aria-label={`Copy email ${JESSE_EMAIL}`}>
            <span className={iconWrap} aria-hidden="true">
              {copied ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={B.skyDeep} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={B.clayDeep} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18v12H3zM3 7l9 6 9-6" /></svg>
              )}
            </span>
            <span className="flex flex-col min-w-0">
              <span className="text-[0.9375rem] leading-tight" style={{ ...serif, fontStyle: "italic", color: copied ? B.skyDeep : B.clayDeep }}>{copied ? "Copied" : "Email, tap to copy"}</span>
              <span className="text-[0.9375rem] font-semibold group-hover:text-[#4F6B7A] transition-colors" style={{ color: B.espresso }}>jkarkoukly@<wbr />sherwoodmortgagegroup.com</span>
            </span>
          </button>

          <div className={row}>
            <span className={iconWrap} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={B.clayDeep} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" /></svg>
            </span>
            <span className="flex flex-col">
              <span className="text-[0.9375rem] leading-tight" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>Office</span>
              <span className="text-[0.9375rem] font-semibold" style={{ color: B.espresso }}>390 Dupont St, Suite 201, Toronto</span>
            </span>
          </div>

          <div className="flex flex-col gap-2.5 pt-1">
            <button
              type="button"
              tabIndex={open ? 0 : -1}
              onClick={() => { setOpen(false); if (onSchedule) onSchedule(); else window.dispatchEvent(new CustomEvent("open-booking-modal")); }}
              className="cursor-pointer w-full rounded-full px-6 py-3.5 min-h-[48px] text-[0.9375rem] font-semibold transition-colors duration-150 bg-[#352B26] text-[#F5EFE8] hover:bg-[#4F6B7A]"
            >
              Schedule a call
            </button>
            <button
              type="button"
              tabIndex={open ? 0 : -1}
              onClick={() => { setOpen(false); window.dispatchEvent(new CustomEvent("open-story-form")); }}
              className="cursor-pointer w-full rounded-full px-6 py-3.5 min-h-[48px] text-[0.9375rem] font-semibold transition-colors duration-150 bg-transparent text-[#352B26] border-[1.5px] border-[#352B26] hover:text-[#4F6B7A] hover:border-[#4F6B7A]"
            >
              Start the conversation
            </button>
          </div>

          <p className="m-0 text-[0.8125rem] leading-snug" style={{ color: B.body }}>
            Mortgage Agent Lic. M25003068. Sherwood Mortgage Group, Brokerage Lic. 12176.
          </p>
        </div>
      </div>
    </div>
  );
}

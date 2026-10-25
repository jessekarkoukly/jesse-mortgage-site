"use client";

// Interactive pieces for the first-time buyer landing pages: scrolling buttons, the story form, the sticky bar.

import { useEffect, useState, type ReactNode } from "react";
import StoryForm from "@/components/home/StoryForm";
import { B, sans } from "@/components/home/brand";
import { PHONE_DISPLAY, PHONE_TEL } from "@/data/landing/fthb";

export const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
};

export const openStoryForm = () => window.dispatchEvent(new CustomEvent("open-story-form"));

type Sticky = {
  label: string;
  /** Element to scroll to. */
  target: string;
  /** Runs instead of the scroll when set (client pages only). */
  onClick?: () => void;
  /** Hide the bar while any of these are on screen (usually the forms). */
  hideWhen: string[];
};

/** The story form ("send me a note") and an optional sticky button on phones. */
export function LandingExtras({ sticky }: { sticky?: Sticky }) {
  const [storyOpen, setStoryOpen] = useState(false);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const open = () => setStoryOpen(true);
    window.addEventListener("open-story-form", open);
    return () => window.removeEventListener("open-story-form", open);
  }, []);

  const hideKey = sticky?.hideWhen.join(",") ?? "";
  useEffect(() => {
    if (!hideKey) return;
    const visible = new Set<string>();
    let scrolled = false;
    const update = () => setShowBar(scrolled && visible.size === 0);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target.id);
        else visible.delete(e.target.id);
      }
      update();
    });
    for (const id of hideKey.split(",")) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    const onScroll = () => {
      const next = window.scrollY > 400;
      if (next !== scrolled) { scrolled = next; update(); }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, [hideKey]);

  return (
    <>
      <StoryForm open={storyOpen} onClose={() => setStoryOpen(false)} />
      {sticky && (
        <div
          className={`lg:hidden fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 bg-white/95 backdrop-blur border-t transition-transform duration-300 motion-reduce:transition-none ${showBar ? "translate-y-0" : "translate-y-full"}`}
          style={{ borderColor: B.line }}
          aria-hidden={!showBar}
        >
          <button type="button" tabIndex={showBar ? 0 : -1} onClick={() => (sticky.onClick ? sticky.onClick() : scrollToId(sticky.target))} className="cursor-pointer w-full rounded-full px-6 py-3.5 min-h-[52px] text-[1rem] font-semibold bg-[#4F6B7A] text-white hover:bg-[#352B26] transition-colors duration-150" style={sans}>
            {sticky.label}
          </button>
        </div>
      )}
    </>
  );
}

const ctaClass = (dark: boolean, full: boolean) =>
  `cursor-pointer ${full ? "w-full" : "w-full sm:w-auto"} rounded-full px-8 py-4 min-h-[56px] text-[1.0625rem] font-semibold transition-colors duration-150 ${dark ? "bg-[#C4A592] text-[#352B26] hover:bg-[#9DB6C3]" : "bg-[#4F6B7A] text-white hover:bg-[#352B26]"}`;

/** Primary button with a click handler (client pages). Sky deep on light, clay on dark. */
export function CtaButton({ children, onClick, dark = false, full = false }: { children: ReactNode; onClick: () => void; dark?: boolean; full?: boolean }) {
  return <button type="button" onClick={onClick} className={ctaClass(dark, full)} style={sans}>{children}</button>;
}

/** Primary button that scrolls to a form on the page (usable from server pages). */
export function ScrollButton({ children, target, dark = false, full = false, compact = false }: { children: ReactNode; target: string; dark?: boolean; full?: boolean; compact?: boolean }) {
  const cls = compact
    ? "cursor-pointer rounded-full px-7 py-3.5 min-h-[52px] text-[1rem] font-semibold bg-[#4F6B7A] text-white hover:bg-[#352B26] transition-colors duration-150"
    : ctaClass(dark, full);
  return <button type="button" onClick={() => scrollToId(target)} className={cls} style={sans}>{children}</button>;
}

/** "Rather talk first?" line with call/text and the story form. */
export function TalkFirst({ dark = false }: { dark?: boolean }) {
  const ink = dark ? B.linen : B.espresso;
  const hover = dark ? "hover:text-[#9DB6C3]" : "hover:text-[#4F6B7A]";
  return (
    <p className="m-0 text-[0.9375rem] leading-relaxed" style={{ ...sans, color: dark ? B.onDark : B.body }}>
      Rather talk first? Call or text me at{" "}
      <a href={PHONE_TEL} className={`font-semibold underline underline-offset-2 ${hover}`} style={{ color: ink }}>{PHONE_DISPLAY}</a>, or{" "}
      <button type="button" onClick={openStoryForm} className={`cursor-pointer font-semibold underline underline-offset-2 ${hover}`} style={{ color: ink }}>send me a note</button>.
    </p>
  );
}

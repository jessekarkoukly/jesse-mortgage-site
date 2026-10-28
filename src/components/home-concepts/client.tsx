"use client";

// Interactive pieces for the homepage concepts: buttons that open the forms, the page shell with the
// phone sticky bar, the How it works timeline, the "Start here" router and the document checklist.

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Nav from "@/components/Nav";
import JesseFooter from "@/components/JesseFooter";
import InquiryForm from "@/components/InquiryForm";
import StoryForm from "@/components/home/StoryForm";
import { B, serif, sans } from "@/components/home/brand";
import { trackEvent } from "@/lib/analytics";
import { DOCS, EARN_TYPES, GIFT_DOCS, PARTNER_NOTE, PHONE, ROUTES, type EarnId } from "./content";

type BookDetail = { help?: string; context?: string };

export const openSchedule = (detail?: BookDetail) => window.dispatchEvent(new CustomEvent<BookDetail>("open-booking-modal", { detail }));
export const openNote = () => window.dispatchEvent(new CustomEvent("open-story-form"));

/** One button shape: 4px corners, colour-only hover (brand book). */
export const BTN =
  "cursor-pointer inline-flex items-center justify-center rounded-[4px] px-7 min-h-[52px] text-[1rem] font-semibold transition-colors duration-150 motion-reduce:transition-none";
const TONES = {
  espresso: "bg-[#352B26] text-[#F5EFE8] hover:bg-[#4F6B7A]",
  clay: "bg-[#C4A592] text-[#352B26] hover:bg-[#9DB6C3]",
  linen: "bg-[#F5EFE8] text-[#352B26] hover:bg-[#9DB6C3]",
} as const;

type Tone = keyof typeof TONES;

export function ScheduleButton({ tone = "espresso", full = false, help, context, className = "" }: {
  tone?: Tone; full?: boolean; help?: string; context?: string; className?: string;
}) {
  return (
    <button type="button" onClick={() => openSchedule({ help, context })} className={`${BTN} ${TONES[tone]} ${full ? "w-full" : "w-full sm:w-auto"} ${className}`} style={sans}>
      Schedule a call
    </button>
  );
}

/** "Start the conversation" as a filled button (used on the clay band). */
export function NoteButton({ tone = "linen", className = "" }: { tone?: Tone; className?: string }) {
  return (
    <button type="button" onClick={openNote} className={`${BTN} ${TONES[tone]} w-full sm:w-auto ${className}`} style={sans}>
      Start the conversation
    </button>
  );
}

/** "Start the conversation" as a quiet underlined link. */
export function NoteLink({ dark = false, children = "Start the conversation", className = "" }: { dark?: boolean; children?: ReactNode; className?: string }) {
  return (
    <button
      type="button"
      onClick={openNote}
      className={`cursor-pointer inline-flex items-center min-h-[48px] text-[1rem] font-semibold underline underline-offset-4 decoration-[1.5px] transition-colors duration-150 ${dark ? "text-[#F5EFE8] hover:text-[#9DB6C3]" : "text-[#352B26] hover:text-[#4F6B7A]"} ${className}`}
      style={sans}
    >
      {children}
    </button>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>
  );
}

/** Phones: "Schedule a call" and a call button, from 400px down, hidden while the hero or closing buttons are on screen. */
function StickyBar({ hideWhen }: { hideWhen: string[] }) {
  const [show, setShow] = useState(false);
  const key = hideWhen.join(",");
  useEffect(() => {
    const visible = new Set<string>();
    let scrolled = false;
    const update = () => setShow(scrolled && visible.size === 0);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target.id);
        else visible.delete(e.target.id);
      }
      update();
    });
    for (const id of key.split(",").filter(Boolean)) {
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
  }, [key]);

  return (
    <div
      className={`lg:hidden fixed inset-x-0 bottom-0 z-40 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] border-t backdrop-blur transition-transform duration-300 motion-reduce:transition-none ${show ? "translate-y-0" : "translate-y-full"}`}
      style={{ borderColor: B.line, background: "rgba(245,239,232,0.96)" }}
      aria-hidden={!show}
    >
      <div className="flex gap-2.5">
        <button type="button" tabIndex={show ? 0 : -1} onClick={() => openSchedule()} className={`${BTN} ${TONES.espresso} flex-1`} style={sans}>
          Schedule a call
        </button>
        <a
          href={PHONE.tel}
          tabIndex={show ? 0 : -1}
          aria-label={`Call or text Jesse at ${PHONE.display}`}
          className="shrink-0 w-[52px] min-h-[52px] rounded-[4px] border-[1.5px] flex items-center justify-center transition-colors duration-150 hover:text-[#4F6B7A] hover:border-[#4F6B7A]"
          style={{ borderColor: B.espresso, color: B.espresso }}
        >
          <PhoneIcon />
        </a>
      </div>
    </div>
  );
}

/**
 * Nav, page, footer, the two forms and the phone sticky bar.
 * Buttons anywhere on the page open the forms through window events, so sections can render on the server.
 */
export function ConceptShell({ children, beforeFooter, hideWhen = [] }: { children: ReactNode; beforeFooter?: ReactNode; hideWhen?: string[] }) {
  const [inquiry, setInquiry] = useState<{ open: boolean } & BookDetail>({ open: false });
  const [story, setStory] = useState(false);

  useEffect(() => {
    const onBook = (e: Event) => {
      trackEvent("book_call_click");
      const d = ((e as CustomEvent<BookDetail | undefined>).detail ?? {}) as BookDetail;
      setInquiry({ open: true, help: d.help, context: d.context });
    };
    const onStory = () => { trackEvent("email_me_click"); setStory(true); };
    window.addEventListener("open-booking-modal", onBook);
    window.addEventListener("open-story-form", onStory);
    return () => { window.removeEventListener("open-booking-modal", onBook); window.removeEventListener("open-story-form", onStory); };
  }, []);

  const fromNav = useCallback(() => openSchedule(), []);
  const closeInquiry = useCallback(() => setInquiry({ open: false }), []);
  const closeStory = useCallback(() => setStory(false), []);

  return (
    <>
      <Nav onBookingOpen={fromNav} />
      <main>{children}</main>
      {beforeFooter}
      <JesseFooter />
      <StickyBar hideWhen={hideWhen} />
      <InquiryForm open={inquiry.open} initialHelp={inquiry.help} context={inquiry.context} onClose={closeInquiry} />
      <StoryForm open={story} onClose={closeStory} />
    </>
  );
}

/* How it works */

/** The six slat colours of the P4 door, sky to espresso ("education to confidence"), measured from the logo. */
export const P4_RAMP = ["#BAC5C9", "#9FA6A8", "#858788", "#6A6967", "#504A47", "#352B26"];
const P4_X = [4, 9.75, 15.5, 21.25, 27, 32.75];

/** The P4 door as a timeline marker. Its slats fill in one by one, sky to espresso, when Keys in hand scrolls in. */
function DoorMarker({ on, animate }: { on: boolean; animate: boolean }) {
  return (
    <svg width="44" height="80" viewBox="0 0 40 72" aria-hidden="true" className="-mt-2">
      <defs>
        <clipPath id="jkc-door-marker"><path d="M4 62V20a16 16 0 0 1 32 0v42z" /></clipPath>
      </defs>
      <g clipPath="url(#jkc-door-marker)">
        {P4_X.map((x, k) => (
          <rect key={x} x={x} y="0" width="3.25" height="72" style={{ fill: on ? P4_RAMP[k] : "#D9CCBF", transition: animate ? `fill 280ms ease ${k * 110}ms` : "none" }} />
        ))}
      </g>
      <line x1="0" y1="62.5" x2="40" y2="62.5" stroke={B.espresso} strokeWidth="1" />
    </svg>
  );
}

const SPARK_COLOURS = ["#D9A441", "#4F6B7A", "#E8B85C", "#7E6352", "#F2D9A6"];
const SPARKS = Array.from({ length: 30 }, (_, i) => ({ a: i * 12 + ((i * 37) % 9) - 4, r: 44 + ((i * 53) % 40), d: (i * 137) % 700, c: SPARK_COLOURS[i % SPARK_COLOURS.length] }));

/** Jesse's sparkler on the keys (October 24, 2026). */
function SparkMarker({ on, motion }: { on: boolean; motion: boolean }) {
  return (
    <span
      className={`relative w-[52px] h-[52px] rounded-full flex items-center justify-center border-[1.5px] transition-colors duration-500 ${on && motion ? "jk-keys-lit" : ""}`}
      style={{ background: on ? B.skyDeep : B.linen, borderColor: on ? B.skyDeep : B.line, color: on ? B.linen : B.clayDeep }}
    >
      {on && motion && SPARKS.map((sp, k) => (
        <span key={k} className="jk-spark" style={{ "--a": `${sp.a}deg`, "--r": `${sp.r}px`, "--d": `${sp.d}ms`, "--c": sp.c } as CSSProperties} />
      ))}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7.5" cy="15.5" r="4.5" /><path d="M10.7 12.3 20 3" /><path d="m16 7 3 3" /><path d="m18 5 2 2" />
      </svg>
    </span>
  );
}

/**
 * Vertical timeline. Markers take the P4 colours in order, the line fills as you read,
 * and the last step ends on the door (or Jesse's sparkler). All text is always on the page.
 */
export function Timeline({ steps, keys = "door" }: { steps: { title: string; text: string }[]; keys?: "door" | "sparkler" }) {
  const [reached, setReached] = useState(0);
  const [motion, setMotion] = useState(false);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const last = steps.length - 1;

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      const id = requestAnimationFrame(() => setReached(steps.length));
      return () => cancelAnimationFrame(id);
    }
    const m = requestAnimationFrame(() => setMotion(true));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.i);
            setReached((r) => Math.max(r, i + 1));
          }
        }
      },
      { rootMargin: "0px 0px -30% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => { cancelAnimationFrame(m); io.disconnect(); };
  }, [steps.length]);

  return (
    <ol className="m-0 p-0 list-none">
      {steps.map((s, i) => {
        const on = i < reached;
        const isKeys = i === last;
        const colour = P4_RAMP[Math.min(i, P4_RAMP.length - 1)];
        return (
          <li key={s.title} ref={(el) => { refs.current[i] = el; }} data-i={i} className="relative grid grid-cols-[52px_minmax(0,1fr)] gap-x-5 pb-10 last:pb-0">
            {i < last && (
              <span aria-hidden="true" className="absolute left-[25px] top-[50px] bottom-1 w-[2px]" style={{ background: B.line }}>
                <span className="absolute inset-x-0 top-0 transition-[height] duration-700 ease-out motion-reduce:transition-none" style={{ height: i + 1 < reached ? "100%" : "0%", background: colour }} />
              </span>
            )}
            <span aria-hidden="true" className="relative z-[1] flex justify-center">
              {isKeys ? (
                keys === "door" ? <DoorMarker on={on} animate={motion} /> : <SparkMarker on={on} motion={motion} />
              ) : (
                <span
                  className="w-11 h-11 rounded-full flex items-center justify-center text-[1.1875rem] border-[1.5px] transition-colors duration-500 motion-reduce:transition-none"
                  style={{ ...serif, fontWeight: 600, background: on ? colour : B.linen, borderColor: on ? colour : B.line, color: on ? (i < 3 ? B.espresso : B.linen) : B.clayDeep }}
                >
                  {i + 1}
                </span>
              )}
            </span>
            <div className="flex flex-col gap-1.5 pt-2">
              <h3 className={`m-0 leading-snug ${isKeys ? "text-[1.75rem] sm:text-[2rem]" : "text-[1.375rem] sm:text-[1.5rem]"}`} style={{ ...serif, fontWeight: 500, color: isKeys && keys === "sparkler" ? B.skyDeep : B.espresso }}>
                <span className="sr-only">Step {i + 1}: </span>{s.title}
              </h3>
              <p className="m-0 text-[1rem] leading-[1.65] max-w-xl" style={{ ...sans, color: B.body }}>{s.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* Start here (concept C) */

/** One tap on your situation: Jesse's short answer, the right page, and Schedule a call with the topic filled in. */
export function StartHere({ headingId }: { headingId: string }) {
  const [sel, setSel] = useState<string | null>(null);
  const route = ROUTES.find((r) => r.id === sel);

  return (
    <div className="rounded-[2px] bg-white border px-5 py-6 sm:p-8 flex flex-col gap-5" style={{ borderColor: B.line }}>
      <div className="flex items-center gap-3.5">
        <Image src="/blog/jesse-face.jpg" alt="" width={56} height={56} className="w-12 h-12 rounded-full object-cover shrink-0" />
        <p className="m-0 text-[0.9375rem] leading-snug" style={{ ...sans, color: B.body }}>
          <span className="block font-semibold" style={{ color: B.espresso }}>Jesse</span>
          Tell me where you’re at, and I’ll point you the right way.
        </p>
      </div>
      <h2 id={headingId} className="m-0 text-[1.75rem] sm:text-[2rem] leading-[1.15]" style={{ ...serif, fontWeight: 400, color: B.espresso }}>What brings you here?</h2>
      <div role="group" aria-labelledby={headingId} className="flex flex-wrap gap-2.5">
        {ROUTES.map((r) => {
          const active = sel === r.id;
          return (
            <button
              key={r.id}
              type="button"
              aria-pressed={active}
              onClick={() => { setSel(r.id); trackEvent(`start_here_${r.id}`); }}
              className={`cursor-pointer rounded-[4px] px-4 min-h-[48px] text-[0.9375rem] font-semibold border-[1.5px] text-left transition-colors duration-150 motion-reduce:transition-none ${active ? "bg-[#352B26] border-[#352B26] text-[#F5EFE8]" : "bg-white border-[#E3D9CD] text-[#352B26] hover:border-[#4F6B7A] hover:text-[#4F6B7A]"}`}
              style={sans}
            >
              {r.chip}
            </button>
          );
        })}
      </div>
      <div aria-live="polite" className="border-t pt-5" style={{ borderColor: B.line }}>
        {route ? (
          <div className="flex flex-col gap-3.5">
            <h3 className="m-0 text-[1.375rem] leading-snug" style={{ ...serif, fontWeight: 500, color: B.espresso }}>{route.title}</h3>
            {route.body.map((p) => (
              <p key={p} className="m-0 text-[1rem] leading-[1.65]" style={{ ...sans, color: B.body }}>{p}</p>
            ))}
            {"quote" in route && (
              <figure className="m-0 border-l-2 pl-4 flex flex-col gap-1.5" style={{ borderColor: B.skyDeep }}>
                <blockquote className="m-0 text-[1.0625rem] leading-[1.45]" style={{ ...serif, color: B.espresso }}>“{route.quote.text}”</blockquote>
                <figcaption className="text-[0.875rem]" style={{ ...sans, color: B.body }}>{route.quote.review.name}, {route.quote.tag}, on Google</figcaption>
              </figure>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-1 pt-1">
              <ScheduleButton help={route.help} context={`start_here_${route.id}`} />
              {"href" in route && (
                <Link href={route.href} className="inline-flex items-center min-h-[48px] text-[1rem] font-semibold underline underline-offset-4 hover:text-[#4F6B7A]" style={{ ...sans, color: B.espresso }}>
                  {route.link}
                </Link>
              )}
            </div>
          </div>
        ) : (
          <p className="m-0 text-[1rem] leading-[1.65]" style={{ ...sans, color: B.body }}>Tap one. You’ll get a straight answer and the right next step.</p>
        )}
      </div>
    </div>
  );
}

/* What will I need? (concept C) */

function Choice({ name, checked, onChange, children }: { name: string; checked: boolean; onChange: () => void; children: ReactNode }) {
  return (
    <label
      className={`cursor-pointer inline-flex items-center rounded-[4px] px-4 min-h-[48px] text-[0.9375rem] font-semibold border-[1.5px] transition-colors duration-150 motion-reduce:transition-none has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-[3px] has-[:focus-visible]:outline-[#4F6B7A] ${checked ? "bg-[#352B26] border-[#352B26] text-[#F5EFE8]" : "bg-white border-[#E3D9CD] text-[#352B26] hover:border-[#4F6B7A] hover:text-[#4F6B7A]"}`}
      style={sans}
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="sr-only" />
      {children}
    </label>
  );
}

function Box() {
  return <span aria-hidden="true" className="mt-[5px] w-[15px] h-[15px] shrink-0 rounded-[2px] border-[1.5px]" style={{ borderColor: B.skyDeep }} />;
}

/** Three taps, then the starting document list from Jesse's own emails and his self-employed page. */
export function Checklist() {
  const [earn, setEarn] = useState<EarnId>("salary");
  const [gift, setGift] = useState(false);
  const [partner, setPartner] = useState(false);
  const docs = DOCS[earn];
  const now = gift ? [...docs.now, ...GIFT_DOCS] : docs.now;
  const legend = "m-0 mb-3 p-0 text-[1.25rem] leading-snug";

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 items-start">
      <div className="flex flex-col gap-7">
        <fieldset className="m-0 p-0 border-0">
          <legend className={legend} style={{ ...serif, color: B.espresso }}>How do you earn your income?</legend>
          <div className="flex flex-wrap gap-2.5">
            {EARN_TYPES.map((t) => (
              <Choice key={t.id} name="earn" checked={earn === t.id} onChange={() => { setEarn(t.id); trackEvent(`checklist_${t.id}`); }}>{t.label}</Choice>
            ))}
          </div>
        </fieldset>
        <fieldset className="m-0 p-0 border-0">
          <legend className={legend} style={{ ...serif, color: B.espresso }}>Is family helping with your down payment?</legend>
          <div className="flex flex-wrap gap-2.5">
            <Choice name="gift" checked={gift} onChange={() => setGift(true)}>Yes</Choice>
            <Choice name="gift" checked={!gift} onChange={() => setGift(false)}>No</Choice>
          </div>
        </fieldset>
        <fieldset className="m-0 p-0 border-0">
          <legend className={legend} style={{ ...serif, color: B.espresso }}>Buying alone or with someone?</legend>
          <div className="flex flex-wrap gap-2.5">
            <Choice name="partner" checked={!partner} onChange={() => setPartner(false)}>Just me</Choice>
            <Choice name="partner" checked={partner} onChange={() => setPartner(true)}>With a partner</Choice>
          </div>
        </fieldset>
      </div>

      <div className="rounded-[2px] bg-white border px-6 py-7 sm:px-9 sm:py-9 flex flex-col gap-5" style={{ borderColor: B.line }} aria-live="polite">
        <div className="flex flex-col gap-1 pb-4 border-b" style={{ borderColor: B.line }}>
          <p className="m-0 text-[1.5rem] leading-tight" style={{ ...serif, fontWeight: 500, color: B.espresso }}>Your starting list</p>
          <p className="m-0 text-[1rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>{EARN_TYPES.find((t) => t.id === earn)?.label}{gift ? ", with a family gift" : ""}{partner ? ", buying with a partner" : ""}</p>
        </div>
        <ul className="m-0 p-0 list-none flex flex-col gap-3">
          {now.map((d) => (
            <li key={d} className="flex gap-3 text-[1rem] leading-[1.55]" style={{ ...sans, color: B.espresso }}><Box />{d}</li>
          ))}
        </ul>
        {docs.later && (
          <div className="flex flex-col gap-2.5">
            <p className="m-0 text-[1rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>Later</p>
            {docs.later.map((d) => (
              <p key={d} className="m-0 flex gap-3 text-[1rem] leading-[1.55]" style={{ ...sans, color: B.body }}><Box />{d}</p>
            ))}
          </div>
        )}
        {partner && <p className="m-0 text-[1rem] leading-[1.6]" style={{ ...sans, color: B.body }}>{PARTNER_NOTE}</p>}
        <p className="m-0 text-[0.9375rem] leading-[1.6] pt-4 border-t" style={{ ...serif, fontStyle: "italic", color: B.body, borderColor: B.line }}>
          A starting list. Lenders can ask for more, and I’ll tell you exactly what yours needs.
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-1">
          <ScheduleButton />
          <NoteLink />
        </div>
      </div>
    </div>
  );
}

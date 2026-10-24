"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import { metaCustom } from "@/lib/metaPixel";
import { B, JESSE_EMAIL, serif, sans } from "./brand";

const SITUATIONS = [
  "planning a home purchase",
  "renewing my mortgage and want to see my options",
  "considering refinancing my existing mortgage",
  "just getting started",
];

type Props = { open: boolean; onClose: () => void };

const field =
  "bg-transparent border-0 border-b-2 border-[#A88A78] rounded-none px-1.5 py-1 mx-1 text-[#C4A592] placeholder:text-[#8C7A6E] focus:outline-none focus:border-[#9DB6C3] focus:text-[#F5EFE8]";

export default function StoryForm({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [situation, setSituation] = useState(SITUATIONS[0]);
  const [goal, setGoal] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot, stays empty for people
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const panelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    metaCustom("FormStart", { form: "start_conversation" });
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => firstRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.clearTimeout(t); window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);

  if (!open) return null;

  const valid = name.trim().length > 0 && /\S+@\S+\.\S+/.test(email.trim());

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!valid || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, situation, goal, email, website }),
      });
      if (!res.ok) throw new Error(String(res.status));
      trackEvent("story_form_submit");
      // Same ending as Schedule a call: the thank-you page with Calendly, name and email prefilled.
      try { sessionStorage.setItem("jk_inquiry", JSON.stringify({ name: name.trim(), email: email.trim() })); } catch {}
      setStatus("sent");
      onClose();
      router.push("/thank-you");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="story-title">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-[rgba(30,24,21,0.6)] cursor-default" />
      <div ref={panelRef} className="relative w-full sm:max-w-[640px] max-h-[92vh] overflow-y-auto rounded-t-[24px] sm:rounded-[24px]" style={{ background: B.espresso, color: B.linen }}>
        <div className="flex items-center justify-between px-6 sm:px-9 py-4 border-b border-[#4A3E37]">
          <span className="text-[1.0625rem]" style={{ ...serif, fontStyle: "italic", color: B.clayLight }}>Share your story</span>
          <button type="button" onClick={onClose} aria-label="Close" className="cursor-pointer w-11 h-11 -mr-2 flex items-center justify-center text-[#D8CCC0] hover:text-[#9DB6C3]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>

        {status === "sent" ? (
          <div className="px-6 sm:px-9 py-10 flex flex-col gap-4">
            <h2 id="story-title" className="m-0 text-[2rem] leading-[1.15]" style={{ ...serif, fontWeight: 500 }}>Thanks, {name.trim().split(" ")[0]}.</h2>
            <p className="m-0 text-[1.0625rem] leading-relaxed" style={{ ...sans, color: B.onDark }}>Your note is on its way. I’ll reply personally to find a time to talk.</p>
            <button type="button" onClick={onClose} className="self-start mt-2 cursor-pointer rounded-full px-6 py-3 min-h-[48px] font-semibold bg-[#C4A592] text-[#352B26] hover:bg-[#9DB6C3]" style={sans}>Close</button>
          </div>
        ) : (
          <form onSubmit={submit} className="px-6 sm:px-9 pt-7 pb-8 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 id="story-title" className="m-0 text-[2rem] sm:text-[2.375rem] leading-[1.1]" style={{ ...serif, fontWeight: 500 }}>Tell me a little about your story.</h2>
              <p className="m-0 text-[0.9375rem] leading-relaxed" style={{ ...sans, color: B.onDark }}>Fill in the blanks and send it over. I’ll reply personally to find a time to talk.</p>
            </div>

            <p className="m-0 text-[1.375rem] sm:text-[1.625rem] leading-[2.1]" style={{ ...serif, fontWeight: 500 }}>
              Hi Jesse, I’m
              <label className="sr-only" htmlFor="story-name">Your name</label>
              <input id="story-name" ref={firstRef} required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="your name" maxLength={80} className={`${field} [field-sizing:content] min-w-[10ch] max-w-full`} style={serif} />
              . Right now I’m
              <label className="sr-only" htmlFor="story-situation">Where you are right now</label>
              <span className="relative inline-block max-w-full align-baseline">
                <select id="story-situation" value={situation} onChange={(e) => setSituation(e.target.value)} className={`${field} appearance-none pr-7 max-w-full cursor-pointer`} style={{ ...serif, color: B.clayLight }}>
                  {SITUATIONS.map((s) => <option key={s} value={s} style={{ color: B.espresso }}>{s}</option>)}
                </select>
                <svg aria-hidden="true" className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="8" viewBox="0 0 12 8"><path d="M1 1l5 5 5-5" fill="none" stroke={B.clayLight} strokeWidth="2" /></svg>
              </span>
              , and over the next few months I want to
              <label className="sr-only" htmlFor="story-goal">Your goal</label>
              <input id="story-goal" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="your biggest goal" maxLength={300} className={`${field} [field-sizing:content] min-w-[15ch] max-w-full`} style={serif} />
              . You can reach me at
              <label className="sr-only" htmlFor="story-email">Your email</label>
              <input id="story-email" required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" maxLength={200} className={`${field} [field-sizing:content] min-w-[14ch] max-w-full`} style={serif} />
              .
            </p>

            <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
              <label htmlFor="story-website">Website</label>
              <input id="story-website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>

            {status === "error" && (
              <p className="m-0 text-[0.9375rem]" role="alert" style={{ ...sans, color: B.clayLight }}>
                That didn’t send. You can email me directly at{" "}
                <a href={`mailto:${JESSE_EMAIL}`} className="underline" style={{ color: B.linen }}>{JESSE_EMAIL}</a>.
              </p>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!valid || status === "sending"}
                className="cursor-pointer disabled:cursor-not-allowed rounded-full px-7 py-4 min-h-[52px] flex items-center gap-3 text-[1rem] font-semibold transition-colors duration-150 bg-[#4F6B7A] text-white hover:bg-[#9DB6C3] hover:text-[#352B26] disabled:opacity-60 disabled:hover:bg-[#4F6B7A] disabled:hover:text-white"
                style={sans}
              >
                {status === "sending" ? "Sending…" : "Submit"} <span aria-hidden="true">→</span>
              </button>
            </div>
            <p className="m-0 text-[0.8125rem] leading-snug text-right" style={{ ...sans, color: B.onDark }}>
              Your information stays private and is only used to contact you directly. No spam, just the occasional market email. <a href="/privacy" className="underline underline-offset-2 hover:text-[#9DB6C3]">Privacy</a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

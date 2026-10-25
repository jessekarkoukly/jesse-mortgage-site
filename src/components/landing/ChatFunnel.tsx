"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { B, sans } from "@/components/home/brand";
import { CHOICES } from "@/components/landing/PlanQuiz";
import { Stars, reviewSummary } from "@/components/landing/kit";
import { isEmail, rememberLead, submitLead } from "@/components/landing/lead";
import { FAMILY_WIDE, PHONE_DISPLAY } from "@/data/landing/fthb";
import type { GoogleReviews } from "@/lib/googleReviews";
import { metaCustom } from "@/lib/metaPixel";
import { trackEvent } from "@/lib/analytics";

type Msg = { id: number; from: "jesse" | "you"; text: string; summary?: [string, string][] };
type Stage = "intro" | "explained" | 0 | 1 | 2 | 3 | "name" | "email" | "phone" | "sending" | "done" | "error";

const INTRO: Msg[] = [
  { id: 1, from: "jesse", text: "Hi, I’m Jesse. I’m a Toronto mortgage agent for first-time buyers." },
  { id: 2, from: "jesse", text: "Most people ask me three things. Can I afford it? How much do I need saved? Which programs can I use?" },
  { id: 3, from: "jesse", text: "Answer four quick questions and I’ll put together your First Home Plan. About 2 minutes." },
];

// What Jesse says back to an answer, before the next question. Only where it adds something true and useful.
function reaction(key: string, value: string): string | null {
  if (key === "Timeline") {
    if (value === "I’ve found a home") return "Exciting. Then speed matters, and I’ll keep things moving.";
    if (value === "Just exploring for now") return "Starting early is the best way to do this. It gives you the most options.";
    if (value === "In the next 6 to 12 months") return "Great. That’s enough time to set things up right.";
    return "Great. Then the next step is getting you ready to shop.";
  }
  if (key === "Down payment saved") {
    if (value === "Under $25,000") return "That can work. The minimum is 5% on homes up to $500,000, and the FHSA and Home Buyers’ Plan can help you get there.";
    if (value === "Not sure yet") return "No problem. I’ll help you add it up, including your RRSP and FHSA.";
    return "Good to know. Your plan shows exactly how far it goes.";
  }
  if (key === "Income") {
    if (value === "Salary or hourly") return null;
    return "Lenders read self-employed income differently, and it’s a big part of what I do.";
  }
  if (key === "Buying" && value === "Me and a partner") return "FHSA and Home Buyers’ Plan limits are per person, so you can each use them.";
  return null;
}

const SUMMARY_LABEL: Record<string, string> = { Timeline: "Timeline", "Down payment saved": "Saved", Income: "Income", Buying: "Buying" };

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * The plan quiz as a text conversation with Jesse. Same four questions as the plan quiz,
 * then name, email and phone (optional). Sends to /api/leads, then /thank-you with Calendly.
 */
export default function ChatFunnel({ google }: { google: GoogleReviews }) {
  const router = useRouter();
  const [msgs, setMsgs] = useState<Msg[]>(INTRO);
  const [typing, setTyping] = useState(false);
  const [stage, setStage] = useState<Stage>("intro");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState("");
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [website, setWebsite] = useState("");
  const nextId = useRef(100);
  const alive = useRef(true);
  const bottom = useRef<HTMLDivElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLFormElement>(null);
  const input = useRef<HTMLInputElement>(null);
  // Anything past the three opening messages means the visitor has started.
  const begun = msgs.length > INTRO.length;

  useEffect(() => {
    alive.current = true;
    return () => { alive.current = false; };
  }, []);

  // Keep the newest message in view once the conversation has started.
  // Desktop: the conversation scrolls inside the phone frame, so only that box moves.
  // Phones: the conversation is part of the page, so the page scrolls just enough to show the newest line or the input.
  useEffect(() => {
    if (!begun) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const box = log.current;
    if (box && getComputedStyle(box).overflowY === "auto") {
      box.scrollTo({ top: box.scrollHeight, behavior: reduce ? "auto" : "smooth" });
      return;
    }
    (composerRef.current ?? bottom.current)?.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" });
  }, [begun, msgs, typing, stage]);

  useEffect(() => {
    if (stage === "name" || stage === "email" || stage === "phone") input.current?.focus({ preventScroll: true });
  }, [stage]);

  const reduceMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const push = (m: Omit<Msg, "id">) => setMsgs((all) => [...all, { ...m, id: nextId.current++ }]);

  async function jesse(lines: (string | Omit<Msg, "id">)[]) {
    for (const line of lines) {
      const m: Omit<Msg, "id"> = typeof line === "string" ? { from: "jesse", text: line } : line;
      setTyping(true);
      await wait(reduceMotion() ? 0 : Math.min(1300, 450 + m.text.length * 9));
      if (!alive.current) return;
      setTyping(false);
      push(m);
      await wait(reduceMotion() ? 0 : 140);
    }
  }

  const you = (text: string) => push({ from: "you", text });

  async function startQuestions(reply: string) {
    you(reply);
    metaCustom("FormStart", { form: "fthb_chat" });
    trackEvent("fthb_chat_start");
    setStage("explained");
    await jesse([CHOICES[0].q]);
    setStage(0);
  }

  async function explain() {
    you("What’s in the plan?");
    setStage("explained");
    await jesse([
      "Your numbers, in writing: what you can afford, your monthly payment options, the cash you’ll need on closing day, the programs you can use and your next steps.",
      "There is no cost to you, and your credit stays untouched until you give the OK.",
    ]);
    setStage("intro");
  }

  async function answer(i: 0 | 1 | 2 | 3, value: string) {
    const q = CHOICES[i];
    you(value);
    metaCustom("QuizStep", { step: String(i + 1) });
    trackEvent(`fthb_chat_step_${i + 1}`);
    const next = { ...answers, [q.key]: value };
    setAnswers(next);
    setStage("explained");
    const r = reaction(q.key, value);
    if (i < 3) {
      await jesse([...(r ? [r] : []), CHOICES[i + 1].q]);
      setStage((i + 1) as 1 | 2 | 3);
      return;
    }
    await jesse([
      ...(r ? [r] : []),
      { from: "jesse", text: "Here’s what I have:", summary: CHOICES.map((c) => [SUMMARY_LABEL[c.key] ?? c.key, next[c.key] ?? "Skipped"]) },
      "Where should I send your plan? What’s your name?",
    ]);
    setStage("name");
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const v = draft.trim();
    if (stage === "name") {
      if (!v) return;
      you(v);
      setDraft("");
      setContact((c) => ({ ...c, name: v }));
      trackEvent("fthb_chat_name");
      setStage("explained");
      await jesse([`Nice to meet you, ${v.split(/\s+/)[0]}. And your email?`]);
      setStage("email");
      return;
    }
    if (stage === "email") {
      if (!v) return;
      you(v);
      setDraft("");
      setStage("explained");
      if (!isEmail(v)) {
        await jesse(["That email doesn’t look quite right. Mind checking it?"]);
        setStage("email");
        return;
      }
      setContact((c) => ({ ...c, email: v }));
      trackEvent("fthb_chat_email");
      await jesse(["Last one: the best number to reach you? It’s optional."]);
      setStage("phone");
      return;
    }
    if (stage === "phone") {
      if (!v) return;
      you(v);
      setDraft("");
      await finish(v);
    }
  }

  async function finish(phone: string) {
    const c = { ...contact, phone };
    setContact(c);
    setStage("sending");
    setTyping(true);
    const ok = await submitLead({
      name: c.name,
      email: c.email,
      phone,
      inquiryType: "First home plan",
      message: CHOICES.map((q) => `${q.key}: ${answers[q.key] ?? "Skipped"}`).join("\n"),
      source: "fthb_lp_d_chat",
      website,
    });
    setTyping(false);
    if (!alive.current) return;
    if (!ok) {
      push({ from: "jesse", text: `That didn’t send. Call or text me at ${PHONE_DISPLAY}, or try again.` });
      setStage("error");
      return;
    }
    trackEvent("fthb_chat_submit");
    rememberLead(c.name, c.email, "plan");
    push({ from: "jesse", text: `Got it, ${c.name.split(/\s+/)[0]}. On the next page, pick a time that works for you to go through your plan with me.` });
    setStage("done");
    await wait(reduceMotion() ? 300 : 1500);
    if (alive.current) router.push("/thank-you");
  }

  const skipPhone = async () => {
    you("Skip");
    await finish("");
  };

  // Reply buttons under the conversation. Plain data here; the click handler decides what each one does.
  type Chip = { label: string; act: "start" | "explain" | "answer" | "skip" | "retry" | "go" };
  const chips: Chip[] =
    typing ? [] :
    stage === "intro" ? [{ label: "Let’s do it", act: "start" }, ...(msgs.some((m) => m.text === "What’s in the plan?") ? [] : [{ label: "What’s in the plan?", act: "explain" } as Chip])] :
    typeof stage === "number" ? CHOICES[stage].options.map((o): Chip => ({ label: o, act: "answer" })) :
    stage === "phone" ? [{ label: "Skip", act: "skip" }] :
    stage === "error" ? [{ label: "Try again", act: "retry" }] :
    stage === "done" ? [{ label: "Pick a time", act: "go" }] :
    [];

  const onChip = (c: Chip) => {
    if (c.act === "start") startQuestions(c.label);
    else if (c.act === "explain") explain();
    else if (c.act === "answer" && typeof stage === "number") answer(stage, c.label);
    else if (c.act === "skip") skipPhone();
    else if (c.act === "retry") finish(contact.phone);
    else if (c.act === "go") router.push("/thank-you");
  };

  const composer = stage === "name" || stage === "email" || stage === "phone";
  const lastJesse = (i: number) => msgs[i].from === "jesse" && (i === msgs.length - 1 || msgs[i + 1].from !== "jesse");

  return (
    <div className="rounded-[26px] lg:rounded-[44px] lg:p-3 lg:bg-[#241C18] lg:shadow-[0_40px_80px_-40px_rgba(53,43,38,0.7)]" style={sans}>
      <div className="rounded-[22px] lg:rounded-[34px] overflow-hidden flex flex-col bg-[#EFE7DE] border lg:border-0" style={{ borderColor: B.line }}>
        {/* Profile header: the family photo as a cover, Jesse's face on top */}
        <div className="relative">
          <div className="relative aspect-[3/1] lg:aspect-[2.4/1]">
            <Image src={FAMILY_WIDE.src} alt={FAMILY_WIDE.alt} fill priority sizes="(min-width: 1024px) 400px, 100vw" className="object-cover object-[50%_32%] lg:object-[50%_44%]" />
          </div>
          <div className="relative px-4 pb-3 flex items-end gap-3">
            <Image src="/blog/jesse-face.jpg" alt="" width={64} height={64} className="relative -mt-8 w-16 h-16 rounded-full border-[3px] shrink-0" style={{ borderColor: "#EFE7DE" }} />
            <div className="flex flex-col pt-2 min-w-0">
              <span className="text-[1.0625rem] font-semibold leading-tight" style={{ color: B.espresso }}>Jesse Karkoukly</span>
              <span className="text-[0.875rem] leading-tight" style={{ color: B.body }}>Mortgage agent, Toronto</span>
            </div>
          </div>
          <p className="m-0 px-4 pb-3 flex items-center gap-2 text-[0.8125rem] font-semibold border-b" style={{ color: B.espresso, borderColor: "#E0D5C9" }}>
            <Stars colour="#A6741E" size={12} />{reviewSummary(google)}
          </p>
        </div>

        {/* Conversation */}
        <div ref={log} className="lg:h-[400px] lg:overflow-y-auto overscroll-contain px-3.5 sm:px-4 py-4 flex flex-col gap-2" role="log" aria-live="polite" aria-label="Conversation with Jesse">
          {msgs.map((m, i) => {
            const delay = m.id <= 3 ? { animationDelay: `${0.2 + (m.id - 1) * 0.6}s` } : undefined;
            if (m.from === "you") {
              return (
                <div key={m.id} className="jk-bubble-in self-end max-w-[82%] rounded-[20px] rounded-br-[6px] px-4 py-2.5 text-[1rem] leading-snug text-white" style={{ background: B.skyDeep }}>
                  {m.text}
                </div>
              );
            }
            return (
              <div key={m.id} className="jk-bubble-in flex items-end gap-2 max-w-[92%]" style={delay}>
                {lastJesse(i) ? (
                  <Image src="/blog/jesse-face.jpg" alt="" width={28} height={28} className="w-7 h-7 rounded-full shrink-0" />
                ) : (
                  <span aria-hidden="true" className="w-7 shrink-0" />
                )}
                <div className="rounded-[20px] rounded-bl-[6px] bg-white px-4 py-2.5 text-[1rem] leading-snug shadow-[0_1px_2px_rgba(53,43,38,0.08)]" style={{ color: B.espresso }}>
                  <span className="sr-only">Jesse: </span>
                  {m.text}
                  {m.summary && (
                    <dl className="m-0 mt-2 grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1 text-[0.9375rem]">
                      {m.summary.map(([k, v]) => (
                        <div key={k} className="contents">
                          <dt style={{ color: B.body }}>{k}</dt>
                          <dd className="m-0 font-semibold">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </div>
            );
          })}
          {typing && (
            <div className="flex items-end gap-2" aria-hidden="true">
              <span className="w-7 shrink-0" />
              <div className="jk-typing rounded-[20px] rounded-bl-[6px] bg-white px-4 py-3.5 flex gap-1.5" aria-hidden="true">
                {[0, 1, 2].map((d) => <span key={d} className="w-2 h-2 rounded-full" style={{ background: B.clay }} />)}
              </div>
            </div>
          )}

          {chips.length > 0 && (
            <div className="jk-bubble-in pt-2 flex flex-wrap justify-end gap-2" style={begun ? undefined : { animationDelay: "1.9s" }}>
              {chips.map((c) => (
                <button key={c.label} type="button" onClick={() => onChip(c)} className="cursor-pointer rounded-full px-4 py-2.5 min-h-[48px] text-[0.9375rem] font-semibold border-[1.5px] border-[#4F6B7A] bg-white text-[#4F6B7A] hover:bg-[#4F6B7A] hover:text-white transition-colors duration-150 text-left">
                  {c.label}
                </button>
              ))}
            </div>
          )}
          <div ref={bottom} className="h-px" />
        </div>

        {/* Composer for name, email and phone */}
        {composer && (
          <form ref={composerRef} onSubmit={send} noValidate className="px-3 py-3 border-t flex items-center gap-2 bg-white" style={{ borderColor: "#E0D5C9" }}>
            <label htmlFor="chat-input" className="sr-only">{stage === "name" ? "Your name" : stage === "email" ? "Your email" : "Your phone number, optional"}</label>
            <input
              ref={input}
              id="chat-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              type={stage === "email" ? "email" : stage === "phone" ? "tel" : "text"}
              autoComplete={stage === "email" ? "email" : stage === "phone" ? "tel" : "name"}
              placeholder={stage === "name" ? "Your name" : stage === "email" ? "Your email" : "Your phone number"}
              maxLength={stage === "email" ? 200 : stage === "phone" ? 40 : 80}
              className="flex-1 min-w-0 rounded-full px-4 py-3 min-h-[48px] text-[1rem] border-[1.5px] outline-none bg-[#F5EFE8] border-[#E0D5C9] text-[#352B26] placeholder:text-[#8A7A70] focus:border-[#4F6B7A]"
            />
            <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
              <label htmlFor="chat-website">Website</label>
              <input id="chat-website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>
            <button type="submit" aria-label="Send" className="cursor-pointer w-12 h-12 shrink-0 rounded-full flex items-center justify-center bg-[#4F6B7A] text-white hover:bg-[#352B26] transition-colors duration-150">
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </form>
        )}
        {(composer || stage === "sending" || stage === "done") && (
          <p className="m-0 px-4 pb-3 pt-1 text-[0.75rem] leading-snug bg-white" style={{ color: B.body }}>
            Your information stays private and is only used to contact you directly. No spam, just the occasional market email.{" "}
            <a href="/privacy" className="underline underline-offset-2">Privacy</a>
          </p>
        )}
      </div>
    </div>
  );
}


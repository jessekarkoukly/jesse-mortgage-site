"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { B, serif, sans } from "@/components/home/brand";
import { metaCustom } from "@/lib/metaPixel";
import { trackEvent } from "@/lib/analytics";
import { isEmail, rememberLead, submitLead } from "@/components/landing/lead";

// Name and email someone already gave on the playbook page, so they don't type them twice.
function fromPlaybook(): { name: string; email: string } {
  try {
    const v = JSON.parse(sessionStorage.getItem("jk_playbook") ?? "{}");
    return { name: String(v.name ?? ""), email: String(v.email ?? "") };
  } catch {
    return { name: "", email: "" };
  }
}

export type Choice = { key: string; q: string; options: string[] };

// Four taps, then contact details last (the low-effort questions come first).
export const CHOICES: Choice[] = [
  { key: "Timeline", q: "When are you hoping to buy?", options: ["Just exploring for now", "In the next 6 to 12 months", "I’m ready to start looking", "I’ve found a home"] },
  { key: "Down payment saved", q: "Roughly how much have you saved for a down payment?", options: ["Under $25,000", "$25,000 to $75,000", "$75,000 to $150,000", "Over $150,000", "Not sure yet"] },
  { key: "Income", q: "How do you earn your income?", options: ["Salary or hourly", "Self-employed", "A mix of both"] },
  { key: "Buying", q: "Who’s buying?", options: ["Just me", "Me and a partner"] },
];
const TOTAL = CHOICES.length + 1;

/**
 * The first-time buyer plan quiz. Four quick taps, then name, email and phone.
 * Sends to /api/leads (saved in Supabase and emailed to Jesse), then /thank-you with Calendly.
 * `source` names the page in Jesse's lead email; `form` names the form in Meta's FormStart event.
 */
export default function PlanQuiz({
  id,
  dark = false,
  compact = false,
  source = "fthb_plan_quiz",
  form = "fthb_plan_quiz",
}: {
  id: string;
  dark?: boolean;
  compact?: boolean;
  source?: string;
  form?: string;
}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  // The contact fields only render at the last step, never on the server, so reading sessionStorage here is safe.
  const [name, setName] = useState(() => fromPlaybook().name);
  const [email, setEmail] = useState(() => fromPlaybook().email);
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  const ink = dark ? B.linen : B.espresso;
  const soft = dark ? B.onDark : B.body;
  const pct = Math.round(((step + 1) / (TOTAL + 1)) * 100);

  const pick = (key: string, value: string) => {
    if (step === 0) metaCustom("FormStart", { form });
    // One event per answered question, so drop-off shows step by step.
    metaCustom("QuizStep", { step: String(step + 1) });
    trackEvent(`fthb_quiz_step_${step + 1}`);
    setAnswers((a) => ({ ...a, [key]: value }));
    setStep((s) => Math.min(s + 1, TOTAL - 1));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isEmail(email) || !name.trim()) return;
    setStatus("sending");
    const ok = await submitLead({
      name,
      email,
      phone,
      inquiryType: "First home plan",
      message: CHOICES.map((c) => `${c.key}: ${answers[c.key] ?? "Skipped"}`).join("\n"),
      source,
      website,
    });
    if (!ok) { setStatus("error"); return; }
    trackEvent("fthb_quiz_submit");
    rememberLead(name, email, "plan");
    router.push("/thank-you");
  }

  const field = `w-full rounded-xl px-4 py-3.5 min-h-[52px] text-[1rem] border-[1.5px] outline-none focus:border-[#4F6B7A] ${dark ? "bg-[#4A3E37] border-[#6B5B52] text-[#F5EFE8] placeholder:text-[#C9BDB3]" : "bg-white border-[#D8CCC0] text-[#352B26] placeholder:text-[#8A7A70]"}`;

  return (
    <div id={id} className="scroll-mt-28 flex flex-col gap-4" style={sans}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-[0.9375rem]" style={{ ...serif, fontStyle: "italic", color: dark ? "#D2B8A6" : B.clayDeep }}>
          Step {step + 1} of {TOTAL}
        </span>
        {step > 0 && (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="cursor-pointer text-[0.875rem] font-semibold underline underline-offset-2 min-h-[48px] px-1 hover:text-[#4F6B7A]" style={{ color: ink }}>
            Back
          </button>
        )}
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: dark ? "#4A3E37" : B.line }} aria-hidden="true">
        <div className="h-full rounded-full transition-[width] duration-500 ease-out" style={{ width: `${pct}%`, background: B.skyDeep }} />
      </div>

      {step < CHOICES.length ? (
        <fieldset key={step} className="jk-step-in m-0 p-0 border-0 flex flex-col gap-3">
          <legend className={`p-0 mb-3 ${compact ? "text-[1.375rem]" : "text-[1.5rem] sm:text-[1.75rem]"} leading-snug`} style={{ ...serif, fontWeight: 500, color: ink }}>
            {CHOICES[step].q}
          </legend>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {CHOICES[step].options.map((o) => {
              const on = answers[CHOICES[step].key] === o;
              return (
                <button
                  key={o}
                  type="button"
                  onClick={() => pick(CHOICES[step].key, o)}
                  className={`cursor-pointer text-left rounded-xl px-4 py-3.5 min-h-[56px] text-[1rem] font-semibold border-[1.5px] transition-colors duration-150 ${
                    on
                      ? "bg-[#4F6B7A] border-[#4F6B7A] text-white"
                      : dark
                        ? "bg-[#4A3E37] border-[#6B5B52] text-[#F5EFE8] hover:border-[#9DB6C3]"
                        : "bg-white border-[#D8CCC0] text-[#352B26] hover:border-[#4F6B7A] hover:text-[#4F6B7A]"
                  }`}
                >
                  {o}
                </button>
              );
            })}
          </div>
        </fieldset>
      ) : (
        <form onSubmit={submit} className="jk-step-in flex flex-col gap-3">
          <p className={`m-0 ${compact ? "text-[1.375rem]" : "text-[1.5rem] sm:text-[1.75rem]"} leading-snug`} style={{ ...serif, fontWeight: 500, color: ink }}>
            Where should I send your plan?
          </p>
          <label className="sr-only" htmlFor={`${id}-name`}>Your name</label>
          <input id={`${id}-name`} required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" maxLength={80} className={field} />
          <label className="sr-only" htmlFor={`${id}-email`}>Your email</label>
          <input id={`${id}-email`} required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" maxLength={200} className={field} />
          <label className="sr-only" htmlFor={`${id}-phone`}>Phone, optional</label>
          <input id={`${id}-phone`} type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (optional)" maxLength={40} className={field} />
          <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
            <label htmlFor={`${id}-website`}>Website</label>
            <input id={`${id}-website`} tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="cursor-pointer mt-1 w-full rounded-full px-7 py-4 min-h-[56px] text-[1.0625rem] font-semibold bg-[#4F6B7A] text-white hover:bg-[#9DB6C3] hover:text-[#352B26] transition-colors duration-150 disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Get my first home plan"}
          </button>
          {status === "error" && (
            <p className="m-0 text-[0.9375rem]" role="alert" style={{ color: ink }}>
              That didn&apos;t send. Call or text me at <a href="tel:4162762666" className="underline">416-276-2666</a>.
            </p>
          )}
          <p className="m-0 text-[0.8125rem] leading-snug" style={{ color: soft }}>
            Your information stays private and is only used to contact you directly. No spam, just the occasional market email.{" "}
            <a href="/privacy" className="underline underline-offset-2">Privacy</a>
          </p>
        </form>
      )}
    </div>
  );
}

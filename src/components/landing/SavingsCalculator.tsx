"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { B, serif, sans } from "@/components/home/brand";
import { CHOICES } from "@/components/landing/PlanQuiz";
import { LockLine } from "@/components/landing/kit";
import { isEmail, rememberLead, submitLead } from "@/components/landing/lead";
import { cashNeeded, maxPrice, MAX_PRICE_CAP } from "@/components/landing/savingsMath";
import { formatDollars } from "@/lib/mortgageFormulas";
import { metaCustom } from "@/lib/metaPixel";
import { trackEvent } from "@/lib/analytics";

const PRESETS = [25000, 50000, 100000, 150000];
// Savings and city are already known, so the full-number flow asks three taps: timeline, income, who's buying.
const FLOW = [CHOICES[0], CHOICES[2], CHOICES[3]];
const TOTAL = FLOW.length + 1;
const SOURCE = "fthb_lp_b_calc";

export const SEGMENTS = [
  { key: "down", label: "Down payment, the minimum", colour: B.skyDeep },
  { key: "ltt", label: "Land transfer tax, after rebates", colour: B.clay },
  { key: "tax", label: "Tax on mortgage insurance", colour: B.sky },
  { key: "other", label: "Legal and other costs, about", colour: B.espresso },
] as const;

export function priceLabel(price: number) {
  return price >= MAX_PRICE_CAP ? `${formatDollars(MAX_PRICE_CAP)}+` : formatDollars(price);
}

type Props = {
  savings: number;
  setSavings: (n: number) => void;
  toronto: boolean;
  setToronto: (t: boolean) => void;
  /** -1 shows the calculator, 0 to 2 the taps, 3 the contact details. Lives on the page so other buttons can open the flow. */
  step: number;
  setStep: (fn: (s: number) => number) => void;
  openFlow: () => void;
};

/** Fires the form-start events and opens the full-number flow. */
export function startFullNumber(setStep: (fn: (s: number) => number) => void) {
  metaCustom("FormStart", { form: "fthb_savings_calc" });
  trackEvent("fthb_calc_full_number");
  setStep(() => 0);
}

/**
 * Savings in, the most home it covers out (cash side only), then three taps and contact details
 * for the full number. Sends to /api/leads, then /thank-you with Calendly.
 */
export default function SavingsCalculator({ savings, setSavings, toronto, setToronto, step, setStep, openFlow }: Props) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const used = useRef(false);

  const price = maxPrice(savings, toronto);
  const c = cashNeeded(price, toronto);
  const amounts = { down: c.down, ltt: c.lttNet, tax: c.insuranceTax, other: c.other };
  const lowSavings = savings > 0 && price < 100000;

  const touched = () => {
    if (used.current) return;
    used.current = true;
    metaCustom("CalcUse", { calc: "fthb_savings" });
    trackEvent("fthb_calc_used");
  };

  const pick = (key: string, value: string) => {
    metaCustom("QuizStep", { step: String(step + 1) });
    trackEvent(`fthb_calc_step_${step + 1}`);
    setAnswers((a) => ({ ...a, [key]: value }));
    setStep((s) => s + 1);
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isEmail(email) || !name.trim()) return;
    setStatus("sending");
    const ok = await submitLead({
      name,
      email,
      phone,
      inquiryType: "First home: full number",
      message: [
        `Savings: ${formatDollars(savings)}`,
        `Buying in: ${toronto ? "Toronto" : "Ontario, outside Toronto"}`,
        `Savings cover a home up to: ${priceLabel(price)} (cash side)`,
        ...FLOW.map((q) => `${q.key}: ${answers[q.key] ?? "Skipped"}`),
      ].join("\n"),
      source: SOURCE,
      website,
    });
    if (!ok) { setStatus("error"); return; }
    trackEvent("fthb_calc_submit");
    rememberLead(name, email, "number");
    router.push("/thank-you");
  }

  const field = "w-full rounded-xl px-4 py-3.5 min-h-[52px] text-[1rem] border-[1.5px] outline-none focus:border-[#4F6B7A] bg-white border-[#D8CCC0] text-[#352B26] placeholder:text-[#8A7A70]";

  if (step >= 0) {
    const pct = Math.round(((step + 1) / (TOTAL + 1)) * 100);
    return (
      <div className="flex flex-col gap-4" style={sans}>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[0.9375rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>Step {step + 1} of {TOTAL}</span>
          <button type="button" onClick={() => setStep((s) => s - 1)} className="cursor-pointer text-[0.875rem] font-semibold underline underline-offset-2 min-h-[48px] px-1 hover:text-[#4F6B7A]" style={{ color: B.espresso }}>
            {step === 0 ? "Back to my number" : "Back"}
          </button>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: B.line }} aria-hidden="true">
          <div className="h-full rounded-full transition-[width] duration-500 ease-out" style={{ width: `${pct}%`, background: B.skyDeep }} />
        </div>
        <p className="m-0 rounded-xl px-4 py-3 text-[0.9375rem] leading-snug" style={{ background: B.linen, color: B.espresso }}>
          {formatDollars(savings)} saved, buying {toronto ? "in Toronto" : "in Ontario, outside Toronto"}. Your savings cover a home up to <span className="font-semibold">{priceLabel(price)}</span>.
        </p>
        {step < FLOW.length ? (
          <fieldset key={step} className="jk-step-in m-0 p-0 border-0 flex flex-col gap-3">
            <legend className="p-0 mb-3 text-[1.375rem] sm:text-[1.5rem] leading-snug" style={{ ...serif, fontWeight: 500, color: B.espresso }}>{FLOW[step].q}</legend>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {FLOW[step].options.map((o) => {
                const on = answers[FLOW[step].key] === o;
                return (
                  <button key={o} type="button" onClick={() => pick(FLOW[step].key, o)} className={`cursor-pointer text-left rounded-xl px-4 py-3.5 min-h-[56px] text-[1rem] font-semibold border-[1.5px] transition-colors duration-150 ${on ? "bg-[#4F6B7A] border-[#4F6B7A] text-white" : "bg-white border-[#D8CCC0] text-[#352B26] hover:border-[#4F6B7A] hover:text-[#4F6B7A]"}`}>
                    {o}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ) : (
          <form onSubmit={submit} className="jk-step-in flex flex-col gap-3">
            <p className="m-0 text-[1.375rem] sm:text-[1.5rem] leading-snug" style={{ ...serif, fontWeight: 500, color: B.espresso }}>{lowSavings ? "Where should I send your plan?" : "Where should I send your full number?"}</p>
            <label className="sr-only" htmlFor="calc-name">Your name</label>
            <input id="calc-name" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" maxLength={80} className={field} />
            <label className="sr-only" htmlFor="calc-email">Your email</label>
            <input id="calc-email" required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" maxLength={200} className={field} />
            <label className="sr-only" htmlFor="calc-phone">Phone, optional</label>
            <input id="calc-phone" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (optional)" maxLength={40} className={field} />
            <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
              <label htmlFor="calc-website">Website</label>
              <input id="calc-website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>
            <button type="submit" disabled={status === "sending"} className="cursor-pointer mt-1 w-full rounded-full px-7 py-4 min-h-[56px] text-[1.0625rem] font-semibold bg-[#4F6B7A] text-white hover:bg-[#352B26] transition-colors duration-150 disabled:opacity-60">
              {status === "sending" ? "Sending…" : lowSavings ? "Get my plan" : "Get my full number"}
            </button>
            {status === "error" && (
              <p className="m-0 text-[0.9375rem]" role="alert" style={{ color: B.espresso }}>
                That didn&apos;t send. Call or text me at <a href="tel:4162762666" className="underline">416-276-2666</a>.
              </p>
            )}
            <p className="m-0 text-[0.8125rem] leading-snug" style={{ color: B.body }}>
              Your information stays private and is only used to contact you directly. No spam, just the occasional market email.{" "}
              <a href="/privacy" className="underline underline-offset-2">Privacy</a>
            </p>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 sm:gap-6" style={sans}>
      {/* Inputs */}
      <div className="flex flex-col gap-3">
        <label htmlFor="calc-savings" className="text-[1.0625rem] font-semibold" style={{ color: B.espresso }}>How much have you saved?</label>
        <div className="relative">
          <span aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-[1.625rem]" style={{ ...serif, color: B.body }}>$</span>
          <input
            id="calc-savings"
            inputMode="numeric"
            autoComplete="off"
            value={savings ? savings.toLocaleString("en-CA") : ""}
            onChange={(e) => { touched(); setSavings(Number(e.target.value.replace(/[^0-9]/g, "").slice(0, 8))); }}
            placeholder="50,000"
            className="w-full rounded-xl pl-10 pr-4 py-2.5 min-h-[60px] text-[1.75rem] tabular-nums border-[1.5px] outline-none bg-white border-[#D8CCC0] text-[#352B26] placeholder:text-[#B5A79C] focus:border-[#4F6B7A]"
            style={serif}
          />
        </div>
        <p className="m-0 text-[0.875rem]" style={{ color: B.body }}>Include your FHSA, RRSP and any gift from family.</p>
      </div>

      <fieldset className="m-0 p-0 border-0 flex flex-col">
        <legend className="p-0 mb-3 text-[1.0625rem] font-semibold" style={{ color: B.espresso }}>Where are you buying?</legend>
        <div className="grid grid-cols-2 gap-1 p-1 rounded-full" style={{ background: B.linen }}>
          {[{ t: true, l: "Toronto" }, { t: false, l: "Outside Toronto" }].map((o) => {
            const on = toronto === o.t;
            return (
              <button key={o.l} type="button" aria-pressed={on} onClick={() => { touched(); setToronto(o.t); }} className={`cursor-pointer rounded-full px-3 min-h-[48px] text-[0.9375rem] font-semibold transition-colors duration-150 ${on ? "bg-white text-[#352B26] shadow-[0_2px_8px_-2px_rgba(53,43,38,0.25)]" : "text-[#5A4C44] hover:text-[#4F6B7A]"}`}>
                {o.l}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Result */}
      <div className="pt-5 border-t flex flex-col gap-4" style={{ borderColor: B.line }} aria-live="polite">
        {savings <= 0 ? (
          <p className="m-0 text-[1.125rem]" style={{ color: B.body }}>Type in what you’ve saved to see your number.</p>
        ) : lowSavings ? (
          <div className="flex flex-col gap-3">
            <p className="m-0 text-[2rem] leading-tight" style={{ ...serif, color: B.espresso }}>Let’s build it up.</p>
            <p className="m-0 text-[1rem] leading-relaxed" style={{ color: B.body }}>
              Most homes in Ontario need more cash than this to close. The FHSA lets you save up to $8,000 a year and lowers your taxes. Your plan shows how fast you can get there.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-1">
              <p className="m-0 text-[1rem]" style={{ ...serif, fontStyle: "italic", color: B.clayDeep }}>Your savings can cover a home up to</p>
              <p className="m-0 text-[2.75rem] sm:text-[3.25rem] leading-none tabular-nums" style={{ ...serif, fontWeight: 500, color: B.espresso }}>{priceLabel(price)}</p>
            </div>
            <div className="flex h-3.5 rounded-full overflow-hidden" style={{ background: B.sand }} aria-hidden="true">
              {SEGMENTS.map((s) => (
                <span key={s.key} className="h-full transition-[width] duration-300 ease-out motion-reduce:transition-none" style={{ width: `${(amounts[s.key] / savings) * 100}%`, background: s.colour }} />
              ))}
            </div>
            <dl className="m-0 flex flex-col gap-2">
              {SEGMENTS.map((s) => (
                <div key={s.key} className="flex items-center justify-between gap-4 text-[0.9375rem]">
                  <dt className="flex items-center gap-2.5" style={{ color: B.body }}>
                    <span aria-hidden="true" className="w-2.5 h-2.5 rounded-[3px] shrink-0" style={{ background: s.colour }} />
                    {s.label}
                  </dt>
                  <dd className="m-0 tabular-nums font-semibold" style={{ color: B.espresso }}>{formatDollars(amounts[s.key])}</dd>
                </div>
              ))}
              <div className="mt-1 pt-2 border-t flex items-center justify-between gap-4 text-[0.9375rem]" style={{ borderColor: B.line }}>
                <dt className="font-semibold" style={{ color: B.espresso }}>Cash you need on closing day</dt>
                <dd className="m-0 tabular-nums font-bold" style={{ color: B.espresso }}>{formatDollars(c.total)}</dd>
              </div>
            </dl>
          </>
        )}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[0.875rem] mr-1" style={{ color: B.body }}>Try</span>
          {PRESETS.map((p) => {
            const on = savings === p;
            return (
              <button key={p} type="button" aria-pressed={on} onClick={() => { touched(); setSavings(p); }} className={`cursor-pointer rounded-full px-3.5 min-h-[48px] text-[0.875rem] font-semibold border-[1.5px] transition-colors duration-150 ${on ? "bg-[#4F6B7A] border-[#4F6B7A] text-white" : "bg-white border-[#D8CCC0] text-[#352B26] hover:border-[#4F6B7A] hover:text-[#4F6B7A]"}`}>
                {formatDollars(p)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="m-0 text-[1rem] leading-relaxed" style={{ color: B.body }}>
          {lowSavings ? "Your plan maps out what to save and the programs that get you there faster." : "That’s the cash side. Your income decides the other side: how much a lender will lend you."}
        </p>
        <p className="m-0 text-[1.0625rem] font-semibold" style={{ color: B.espresso }}>Want me to run your exact numbers? It takes one call.</p>
        <button type="button" onClick={openFlow} className="cursor-pointer w-full rounded-full px-7 py-4 min-h-[56px] text-[1.0625rem] font-semibold bg-[#4F6B7A] text-white hover:bg-[#352B26] transition-colors duration-150">
          {lowSavings ? "Get my plan" : "Get my full number"}
        </button>
        <LockLine />
      </div>
    </div>
  );
}

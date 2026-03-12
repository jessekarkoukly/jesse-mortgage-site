"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";

/* ── Info Tooltip ── */
function InfoBubble({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="relative inline-flex" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-[18px] h-[18px] rounded-full bg-coral text-white text-[0.6875rem] font-bold flex items-center justify-center cursor-pointer hover:bg-coral-dark transition-colors shrink-0 leading-none"
        aria-label="More info"
      >
        ?
      </button>
      {open && (
        <div
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-navy text-white text-[0.75rem] leading-relaxed rounded-lg px-4 py-3 shadow-lg"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-navy" />
        </div>
      )}
    </div>
  );
}

/* ── Helpers ── */
function fmt(n: number) {
  return n.toLocaleString("en-CA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function fmtPct(n: number) {
  return (n * 100).toFixed(1);
}

/* ── Brackets ── */
const ONTARIO_BRACKETS = [
  { min: 0, max: 55000, rate: 0.005 },
  { min: 55000, max: 250000, rate: 0.01 },
  { min: 250000, max: 400000, rate: 0.015 },
  { min: 400000, max: 2000000, rate: 0.02 },
  { min: 2000000, max: Infinity, rate: 0.025 },
];

const TORONTO_BRACKETS = [
  { min: 0, max: 55000, rate: 0.005 },
  { min: 55000, max: 250000, rate: 0.01 },
  { min: 250000, max: 400000, rate: 0.015 },
  { min: 400000, max: 2000000, rate: 0.02 },
  { min: 2000000, max: 3000000, rate: 0.025 },
  { min: 3000000, max: 4000000, rate: 0.044 },
  { min: 4000000, max: 5000000, rate: 0.0545 },
  { min: 5000000, max: 10000000, rate: 0.065 },
  { min: 10000000, max: 20000000, rate: 0.0755 },
  { min: 20000000, max: Infinity, rate: 0.086 },
];

const ONTARIO_FTB_REBATE_MAX = 4000;
const TORONTO_FTB_REBATE_MAX = 4475;

function calcBrackets(price: number, brackets: typeof ONTARIO_BRACKETS) {
  return brackets.map((b) => {
    const taxable = Math.max(0, Math.min(price, b.max) - b.min);
    return {
      ...b,
      taxable,
      tax: taxable * b.rate,
    };
  }).filter((b) => b.taxable > 0);
}

function calcTotal(price: number, brackets: typeof ONTARIO_BRACKETS) {
  return calcBrackets(price, brackets).reduce((sum, b) => sum + b.tax, 0);
}

/* ── Slider Input ── */
function SliderInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-3 pb-2 flex flex-col justify-between">
      <span
        className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide mb-1"
        style={{ fontFamily: "var(--font-jakarta)" }}
      >
        {label}
      </span>
      <p
        className="text-navy font-bold text-[1.25rem] mb-2"
        style={{ fontFamily: "var(--font-spectral)" }}
      >
        ${fmt(value)}
      </p>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-navy [&::-webkit-slider-thumb]:shadow-md"
        style={{
          background: `linear-gradient(to right, #1E2D3D 0%, #E8705A ${pct}%, #E5E7EB ${pct}%, #E5E7EB 100%)`,
        }}
      />
    </div>
  );
}

/* ════════════════════════════════════════════ */

export default function LandTransferTaxCalculator() {
  const [price, setPrice] = useState(800000);
  const [location, setLocation] = useState<"ontario" | "toronto">("ontario");
  const [firstTimeBuyer, setFirstTimeBuyer] = useState(false);

  const results = useMemo(() => {
    const ontarioBreakdown = calcBrackets(price, ONTARIO_BRACKETS);
    const ontarioTotal = calcTotal(price, ONTARIO_BRACKETS);
    const torontoTotal = location === "toronto" ? calcTotal(price, TORONTO_BRACKETS) : 0;
    const torontoBreakdown =
      location === "toronto" ? calcBrackets(price, TORONTO_BRACKETS) : [];

    const ontarioRebate = firstTimeBuyer
      ? Math.min(ontarioTotal, ONTARIO_FTB_REBATE_MAX)
      : 0;
    const torontoRebate =
      firstTimeBuyer && location === "toronto"
        ? Math.min(torontoTotal, TORONTO_FTB_REBATE_MAX)
        : 0;

    const totalTax = ontarioTotal + torontoTotal;
    const totalRebate = ontarioRebate + torontoRebate;
    const totalOwing = totalTax - totalRebate;

    const ontarioFullyCovered =
      firstTimeBuyer && ontarioRebate >= ontarioTotal;
    const torontoFullyCovered =
      firstTimeBuyer &&
      location === "toronto" &&
      torontoRebate >= torontoTotal;

    return {
      ontarioBreakdown,
      ontarioTotal,
      torontoBreakdown,
      torontoTotal,
      ontarioRebate,
      torontoRebate,
      totalTax,
      totalRebate,
      totalOwing,
      ontarioFullyCovered,
      torontoFullyCovered,
    };
  }, [price, location, firstTimeBuyer]);

  const handleBookCall = () => {
    window.dispatchEvent(new CustomEvent("open-booking-modal"));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-10 py-6 sm:py-10">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* ── LEFT: Inputs (60%) ── */}
        <div className="md:w-[60%] flex flex-col gap-5">
          {/* Purchase Price */}
          <SliderInput
            label="Purchase Price"
            value={price}
            min={100000}
            max={5000000}
            step={50000}
            onChange={setPrice}
          />

          {/* Location Toggle */}
          <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-3">
            <span
              className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide mb-2 block"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Location
            </span>
            <div className="flex gap-2">
              {(["ontario", "toronto"] as const).map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocation(loc)}
                  className={`flex-1 py-2 rounded-lg text-[0.875rem] font-semibold transition-colors cursor-pointer capitalize ${
                    location === loc
                      ? "bg-navy text-white"
                      : "bg-white text-slate border border-[#E5E7EB]"
                  }`}
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {loc === "ontario" ? "Ontario" : "Toronto"}
                </button>
              ))}
            </div>
          </div>

          {/* First-Time Buyer Checkbox */}
          <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <button
                role="checkbox"
                aria-checked={firstTimeBuyer}
                onClick={() => setFirstTimeBuyer(!firstTimeBuyer)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
                  firstTimeBuyer
                    ? "bg-coral border-coral"
                    : "bg-white border-[#E5E7EB]"
                }`}
              >
                {firstTimeBuyer && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 6l3 3 5-5" />
                  </svg>
                )}
              </button>
              <span
                className="text-[0.875rem] text-navy font-semibold"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                I am a first-time home buyer
              </span>
              <InfoBubble text="You qualify as a first-time buyer in Ontario if you have never owned a home anywhere in the world. In Toronto, you must also be a Canadian citizen or permanent resident and occupy the home within 9 months of purchase." />
            </label>
          </div>
        </div>

        {/* ── RIGHT: Results Panel (40%) ── */}
        <div className="md:w-[40%]">
          <div className="md:sticky md:top-6 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
            {/* Total Header */}
            <div className="flex items-center gap-2 mb-1">
              <p
                className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Total Land Transfer Tax
              </p>
              <InfoBubble text="This is the total amount you owe in land transfer tax on closing day. Your real estate lawyer collects it along with other closing costs. If you qualify as a first-time buyer, rebates are subtracted automatically." />
            </div>
            <p
              className="text-[2rem] font-bold text-navy leading-tight mb-1"
              style={{ fontFamily: "var(--font-spectral)" }}
            >
              ${Math.round(results.totalOwing).toLocaleString("en-CA")}
            </p>

            {/* FTB Rebate Summary */}
            {firstTimeBuyer && results.totalRebate > 0 && (
              <div className="mb-4">
                <div
                  className="flex justify-between text-[0.8125rem] mt-2"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  <span className="text-slate">Before rebate</span>
                  <span className="text-navy font-semibold">
                    ${fmt(results.totalTax)}
                  </span>
                </div>
                <div
                  className="flex justify-between text-[0.8125rem] mt-1"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  <span className="text-coral">First-time buyer rebate</span>
                  <span className="text-coral font-semibold">
                    -${fmt(results.totalRebate)}
                  </span>
                </div>
              </div>
            )}

            {/* Ontario Bracket Breakdown */}
            <div className="border-t border-sand-2 pt-4 mt-4">
              <div className="flex items-center gap-2 mb-3">
                <p
                  className="text-[0.8125rem] font-bold text-navy"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Ontario LTT Breakdown
                </p>
                <InfoBubble text="Ontario charges a provincial land transfer tax on every property purchase. It is calculated on a marginal bracket system, similar to income tax. Higher price portions are taxed at higher rates." />
              </div>
              <div
                className="flex flex-col gap-2 text-[0.8125rem]"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {results.ontarioBreakdown.map((b, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-slate">
                      ${fmt(b.taxable)} x {fmtPct(b.rate)}%
                    </span>
                    <span className="text-navy font-semibold tabular-nums">
                      ${fmt(b.tax)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between pt-2 border-t border-sand-2">
                  <span className="text-navy font-bold">Ontario LTT</span>
                  <span className="text-navy font-bold">
                    ${fmt(results.ontarioTotal)}
                  </span>
                </div>
                {firstTimeBuyer && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-slate flex items-center gap-1.5">
                        FTB rebate (max $
                        {fmt(ONTARIO_FTB_REBATE_MAX)})
                        <InfoBubble text="Ontario refunds up to $4,000 of provincial LTT for first-time buyers. This fully covers the tax on homes up to $368,333. Above that, you still save $4,000 but pay the remainder." />
                      </span>
                      <span className="text-navy font-semibold">
                        -${fmt(results.ontarioRebate)}
                      </span>
                    </div>
                    {results.ontarioFullyCovered && (
                      <p
                        className="text-coral text-[0.75rem] font-semibold"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        Your Ontario LTT is fully covered by the first-time
                        buyer rebate.
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Toronto MLTT Breakdown */}
            {location === "toronto" && (
              <div className="border-t border-sand-2 pt-4 mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <p
                    className="text-[0.8125rem] font-bold text-navy"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    Toronto MLTT Breakdown
                  </p>
                  <InfoBubble text="Toronto is the only municipality in Ontario that charges its own land transfer tax on top of the provincial one. The rates and brackets mirror Ontario's but are calculated separately." />
                </div>
                <div
                  className="flex flex-col gap-2 text-[0.8125rem]"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {results.torontoBreakdown.map((b, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-slate">
                        ${fmt(b.taxable)} x {fmtPct(b.rate)}%
                      </span>
                      <span className="text-navy font-semibold tabular-nums">
                        ${fmt(b.tax)}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 border-t border-sand-2">
                    <span className="text-navy font-bold">Toronto MLTT</span>
                    <span className="text-navy font-bold">
                      ${fmt(results.torontoTotal)}
                    </span>
                  </div>
                  {firstTimeBuyer && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-slate flex items-center gap-1.5">
                          FTB rebate (max $
                          {fmt(TORONTO_FTB_REBATE_MAX)})
                          <InfoBubble text="Toronto refunds up to $4,475 of municipal LTT for first-time buyers. This fully covers the municipal tax on homes up to $400,000. You must be a Canadian citizen or permanent resident." />
                        </span>
                        <span className="text-navy font-semibold">
                          -${fmt(results.torontoRebate)}
                        </span>
                      </div>
                      {results.torontoFullyCovered && (
                        <p
                          className="text-coral text-[0.75rem] font-semibold"
                          style={{ fontFamily: "var(--font-jakarta)" }}
                        >
                          Your Toronto MLTT is fully covered by the first-time
                          buyer rebate.
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Note */}
            <p
              className="text-slate text-[0.75rem] mt-4 leading-relaxed"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              LTT is paid on your closing date, not at the time of offer. Your
              lawyer will collect it along with other closing costs.
            </p>

            {/* April 2026 disclaimer */}
            {price > 3000000 && location === "toronto" && (
              <p
                className="text-coral text-[0.6875rem] mt-3 leading-relaxed"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Note: Toronto MLTT rates for properties above $3,000,000 may
                change under proposed April 2026 rate adjustments. Confirm
                current rates with your lawyer before closing.
              </p>
            )}

            {/* Cross-link CTA */}
            <Link
              href="/calculators/closing-costs"
              className="block text-center text-coral font-semibold text-[0.8125rem] mt-4 hover:underline"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Want a full closing cost estimate? Run the numbers →
            </Link>

            {/* Book a Call CTA */}
            <div className="mt-5 pt-5 border-t border-sand-2">
              <p
                className="text-slate text-[0.8125rem] mb-3 text-center"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Want Jesse to run your exact numbers? It takes one call.
              </p>
              <button
                onClick={handleBookCall}
                className="w-full bg-navy text-white font-semibold py-3 rounded-lg hover:bg-navy-2 transition-colors cursor-pointer text-[0.875rem]"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Book a Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

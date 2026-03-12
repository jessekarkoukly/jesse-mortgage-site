"use client";

import { useState, useMemo, useRef, useEffect } from "react";

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
function fmtDollar(n: number) {
  return "$" + Math.round(n).toLocaleString("en-CA");
}

function fmtPct(n: number) {
  return n.toFixed(2) + "%";
}

/* ── Lender posted rates by remaining term (approximate) ── */
const POSTED_RATES: Record<string, number> = {
  "1 Year": 6.79,
  "2 Year": 6.54,
  "3 Year": 6.14,
  "4 Year": 5.99,
  "5 Year": 5.59,
};

const TERM_OPTIONS = ["1 Year", "2 Year", "3 Year", "4 Year", "5 Year"];

const PROVINCE_OPTIONS = [
  "Ontario",
  "British Columbia",
  "Alberta",
  "Quebec",
  "Manitoba",
  "Saskatchewan",
  "Nova Scotia",
  "New Brunswick",
  "Newfoundland",
  "PEI",
];

const PROVIDER_OPTIONS = [
  "Big 5 Bank (TD, RBC, BMO, Scotiabank, CIBC)",
  "Monoline Lender (MCAP, First National, etc.)",
  "Credit Union",
  "Other / Not Sure",
];

export default function PrepaymentPenaltyCalculator() {
  /* ── State ── */
  const [province, setProvince] = useState("");
  const [balance, setBalance] = useState(400000);
  const [balanceDraft, setBalanceDraft] = useState("");
  const [balanceEditing, setBalanceEditing] = useState(false);
  const [rate, setRate] = useState(4.5);
  const [rateDraft, setRateDraft] = useState("");
  const [rateEditing, setRateEditing] = useState(false);
  const [provider, setProvider] = useState("");
  const [rateType, setRateType] = useState<"fixed" | "variable">("fixed");
  const [term, setTerm] = useState("5 Year");
  const [startMonth, setStartMonth] = useState("");
  const [startDay, setStartDay] = useState("");
  const [startYear, setStartYear] = useState("");
  const [calculated, setCalculated] = useState(false);

  /* ── Derived: remaining months ── */
  const remainingMonths = useMemo(() => {
    const m = parseInt(startMonth);
    const d = parseInt(startDay);
    const y = parseInt(startYear);
    if (!m || !d || !y || m < 1 || m > 12 || d < 1 || d > 31 || y < 2000) return null;

    const termYears = parseInt(term);
    const startDate = new Date(y, m - 1, d);
    const endDate = new Date(y + termYears, m - 1, d);
    const now = new Date();

    if (now >= endDate) return 0;
    if (now < startDate) return termYears * 12;

    const diffMs = endDate.getTime() - now.getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24 * 30.44));
  }, [startMonth, startDay, startYear, term]);

  /* ── Penalty calculations ── */
  const results = useMemo(() => {
    if (!calculated || !remainingMonths || remainingMonths <= 0) return null;

    const monthlyRate = rate / 100 / 12;

    // 3 months' interest
    const threeMonthsInterest = balance * monthlyRate * 3;

    if (rateType === "variable") {
      return {
        method: "3 Months' Interest",
        penalty: threeMonthsInterest,
        threeMonthsInterest,
        ird: null,
        explanation:
          "Variable rate mortgages are penalized at 3 months of interest. This is standard across all lenders.",
      };
    }

    // Fixed rate: greater of 3 months' interest or IRD
    const remainingYears = remainingMonths / 12;

    // Find the closest term for the remaining period
    let comparisonTerm = "1 Year";
    const remainingRounded = Math.ceil(remainingYears);
    if (remainingRounded >= 5) comparisonTerm = "5 Year";
    else if (remainingRounded >= 4) comparisonTerm = "4 Year";
    else if (remainingRounded >= 3) comparisonTerm = "3 Year";
    else if (remainingRounded >= 2) comparisonTerm = "2 Year";
    else comparisonTerm = "1 Year";

    const postedRate = POSTED_RATES[comparisonTerm] || 5.59;

    // IRD: Big banks use posted rate method, monolines use contract rate method
    let irdRate: number;
    const isBigBank = provider.includes("Big 5");

    if (isBigBank) {
      // Big bank: posted rate at signing minus posted rate for remaining term
      // Approximation: assume posted rate at signing was ~2% above contract rate
      const postedAtSigning = rate + 2.0;
      irdRate = Math.max(0, postedAtSigning - postedRate);
    } else {
      // Monoline / credit union: contract rate minus current rate for remaining term
      const currentRateForTerm = postedRate - 1.5; // Approximate discount from posted
      irdRate = Math.max(0, rate - currentRateForTerm);
    }

    const ird = balance * (irdRate / 100) * remainingYears;
    const penalty = Math.max(threeMonthsInterest, ird);

    return {
      method: ird > threeMonthsInterest ? "Interest Rate Differential (IRD)" : "3 Months' Interest",
      penalty,
      threeMonthsInterest,
      ird,
      explanation: isBigBank
        ? "Big banks calculate IRD using posted rates, which are typically higher than discounted rates. This often results in a larger penalty."
        : "Monoline lenders and credit unions typically calculate IRD using your actual contract rate, which usually results in a smaller penalty than big banks.",
    };
  }, [calculated, balance, rate, rateType, provider, remainingMonths]);

  /* ── Validation ── */
  const canCalculate =
    province !== "" &&
    balance > 0 &&
    rate > 0 &&
    provider !== "" &&
    startMonth !== "" &&
    startDay !== "" &&
    startYear !== "";

  const handleBookCall = () => {
    window.dispatchEvent(new CustomEvent("open-booking-modal"));
  };

  return (
    <div className="max-w-6xl mx-auto px-5 -mt-6">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* ── Left: Inputs ── */}
        <div
          className="w-full lg:w-[55%] rounded-2xl border border-[#E5E7EB] bg-white shadow-sm p-6 flex flex-col gap-5"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          {/* Province */}
          <div>
            <label className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-navy mb-2">
              Province
            </label>
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-[0.9375rem] text-navy bg-white focus:outline-none focus:ring-2 focus:ring-coral/30"
            >
              <option value="">Select a province</option>
              {PROVINCE_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Mortgage Balance */}
          <div>
            <label className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-navy mb-2">
              Current Mortgage Balance
              <InfoBubble text="The remaining principal balance on your mortgage. You can find this on your most recent mortgage statement." />
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate text-[0.9375rem]">
                $
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={
                  balanceEditing
                    ? balanceDraft
                    : balance.toLocaleString("en-CA")
                }
                onFocus={() => {
                  setBalanceEditing(true);
                  setBalanceDraft(String(balance));
                }}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, "");
                  setBalanceDraft(raw);
                  const n = parseInt(raw);
                  if (!isNaN(n)) setBalance(Math.min(5000000, Math.max(0, n)));
                }}
                onBlur={() => setBalanceEditing(false)}
                className="w-full border border-[#E5E7EB] rounded-lg pl-8 pr-4 py-3 text-[0.9375rem] text-navy bg-white focus:outline-none focus:ring-2 focus:ring-coral/30"
                placeholder="Enter amount"
              />
            </div>
            <input
              type="range"
              min={50000}
              max={2000000}
              step={5000}
              value={balance}
              onChange={(e) => setBalance(Number(e.target.value))}
              className="w-full mt-2 accent-coral"
            />
          </div>

          {/* Current Rate */}
          <div>
            <label className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-navy mb-2">
              Current Mortgage Rate
              <InfoBubble text="The interest rate on your current mortgage contract. This is the rate you are actually paying, not the posted rate." />
            </label>
            <div className="relative">
              <input
                type="text"
                inputMode="decimal"
                value={rateEditing ? rateDraft : rate.toFixed(2)}
                onFocus={() => {
                  setRateEditing(true);
                  setRateDraft(rate.toFixed(2));
                }}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9.]/g, "");
                  setRateDraft(raw);
                  const n = parseFloat(raw);
                  if (!isNaN(n)) setRate(Math.min(15, Math.max(0, n)));
                }}
                onBlur={() => setRateEditing(false)}
                className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 pr-8 text-[0.9375rem] text-navy bg-white focus:outline-none focus:ring-2 focus:ring-coral/30"
                placeholder="Enter percentage"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate text-[0.9375rem]">
                %
              </span>
            </div>
            <input
              type="range"
              min={0.5}
              max={10}
              step={0.05}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full mt-2 accent-coral"
            />
          </div>

          {/* Mortgage Provider */}
          <div>
            <label className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-navy mb-2">
              Mortgage Provider
              <InfoBubble text="Big banks and monoline lenders calculate penalties differently. Big banks typically use posted rates (resulting in higher penalties), while monolines use your actual contract rate." />
            </label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-[0.9375rem] text-navy bg-white focus:outline-none focus:ring-2 focus:ring-coral/30"
            >
              <option value="">Select your lender type</option>
              {PROVIDER_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Rate Type */}
          <div>
            <label className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-navy mb-2">
              Rate Type
            </label>
            <div className="flex gap-0 rounded-lg border border-[#E5E7EB] overflow-hidden">
              {(["fixed", "variable"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setRateType(t)}
                  className={`flex-1 py-3 text-[0.875rem] font-semibold transition-colors ${
                    rateType === t
                      ? "bg-navy text-white"
                      : "bg-white text-navy hover:bg-sand"
                  }`}
                >
                  {t === "fixed" ? "Fixed" : "Variable"}
                </button>
              ))}
            </div>
          </div>

          {/* Mortgage Term */}
          <div>
            <label className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-navy mb-2">
              Current Term
              <InfoBubble text="The length of your current mortgage term. Most common in Canada is 5 years. This is different from your amortization period." />
            </label>
            <select
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 text-[0.9375rem] text-navy bg-white focus:outline-none focus:ring-2 focus:ring-coral/30"
            >
              {TERM_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Mortgage Start Date */}
          <div>
            <label className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-navy mb-2">
              Mortgage Start Date
              <InfoBubble text="The date your current mortgage term began. This is used to calculate how much time is remaining on your term." />
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                inputMode="numeric"
                maxLength={2}
                value={startMonth}
                onChange={(e) =>
                  setStartMonth(e.target.value.replace(/[^0-9]/g, "").slice(0, 2))
                }
                placeholder="MM"
                className="flex-1 border border-[#E5E7EB] rounded-lg px-4 py-3 text-[0.9375rem] text-navy bg-white focus:outline-none focus:ring-2 focus:ring-coral/30 text-center"
              />
              <input
                type="text"
                inputMode="numeric"
                maxLength={2}
                value={startDay}
                onChange={(e) =>
                  setStartDay(e.target.value.replace(/[^0-9]/g, "").slice(0, 2))
                }
                placeholder="DD"
                className="flex-1 border border-[#E5E7EB] rounded-lg px-4 py-3 text-[0.9375rem] text-navy bg-white focus:outline-none focus:ring-2 focus:ring-coral/30 text-center"
              />
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                value={startYear}
                onChange={(e) =>
                  setStartYear(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))
                }
                placeholder="YYYY"
                className="flex-1 border border-[#E5E7EB] rounded-lg px-4 py-3 text-[0.9375rem] text-navy bg-white focus:outline-none focus:ring-2 focus:ring-coral/30 text-center"
              />
            </div>
          </div>

          {/* Calculate Button */}
          <button
            type="button"
            onClick={() => setCalculated(true)}
            disabled={!canCalculate}
            className={`w-full py-4 rounded-xl text-[1rem] font-bold transition-colors ${
              canCalculate
                ? "bg-coral text-white hover:bg-coral-dark cursor-pointer"
                : "bg-[#E5E7EB] text-slate cursor-not-allowed"
            }`}
          >
            Calculate My Penalty
          </button>
        </div>

        {/* ── Right: Results ── */}
        <div
          className="w-full lg:w-[45%] rounded-2xl border border-[#E5E7EB] bg-sand shadow-sm p-6 flex flex-col"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          <h2
            className="text-[1.25rem] font-bold text-navy mb-6"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            Estimated Penalty<span className="text-coral">.</span>
          </h2>

          {!calculated || !results ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-slate text-[0.875rem] text-center leading-relaxed">
                Fill in your mortgage details and click
                <br />
                &quot;Calculate My Penalty&quot; to see your estimate.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-5 flex-1">
              {/* Penalty Amount */}
              <div className="bg-white rounded-xl p-5 border border-[#E5E7EB]">
                <p className="text-[0.75rem] text-slate uppercase tracking-wider mb-1">
                  Estimated Penalty
                </p>
                <p
                  className="text-[2rem] font-bold text-navy"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  {fmtDollar(results.penalty)}
                </p>
                <p className="text-[0.8125rem] text-coral font-semibold mt-1">
                  {results.method}
                </p>
              </div>

              {/* Breakdown */}
              <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] flex flex-col gap-3">
                <p className="text-[0.8125rem] font-semibold text-navy">Breakdown</p>

                <div className="flex justify-between text-[0.8125rem]">
                  <span className="text-slate">3 Months&apos; Interest</span>
                  <span className="text-navy font-semibold">
                    {fmtDollar(results.threeMonthsInterest)}
                  </span>
                </div>

                {results.ird !== null && (
                  <div className="flex justify-between text-[0.8125rem]">
                    <span className="text-slate flex items-center gap-1">
                      Interest Rate Differential
                      <InfoBubble text="The IRD is the difference between your contract rate and the rate your lender can currently charge for the remaining term. The lender charges whichever penalty is higher." />
                    </span>
                    <span className="text-navy font-semibold">
                      {fmtDollar(results.ird)}
                    </span>
                  </div>
                )}

                {remainingMonths !== null && (
                  <div className="flex justify-between text-[0.8125rem]">
                    <span className="text-slate">Remaining in Term</span>
                    <span className="text-navy font-semibold">
                      {remainingMonths} month{remainingMonths !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-[0.8125rem]">
                  <span className="text-slate">Penalty Method</span>
                  <span className="text-navy font-semibold">
                    {rateType === "variable" ? "3 Months' Interest" : "Greater of the two"}
                  </span>
                </div>
              </div>

              {/* Explanation */}
              <div className="bg-white rounded-xl p-5 border border-[#E5E7EB]">
                <p className="text-[0.8125rem] font-semibold text-navy mb-2">How this works</p>
                <p className="text-[0.8125rem] text-slate leading-relaxed">
                  {results.explanation}
                </p>
              </div>

              {/* Disclaimer */}
              <p className="text-[0.6875rem] text-slate leading-relaxed mt-auto">
                This is an estimate only. Actual penalties vary by lender and depend on your
                specific mortgage contract. Some lenders may also charge administrative or
                discharge fees. Contact your lender for the exact penalty amount.
              </p>

              {/* CTA */}
              <button
                type="button"
                onClick={handleBookCall}
                className="w-full bg-coral text-white font-bold py-3.5 rounded-xl hover:bg-coral-dark transition-colors text-[0.9375rem] cursor-pointer"
              >
                Book a Call
              </button>
              <p className="text-[0.75rem] text-slate text-center -mt-2">
                Want Jesse to run your exact numbers? It takes one call.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

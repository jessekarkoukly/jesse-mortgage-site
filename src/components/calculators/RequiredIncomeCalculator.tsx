"use client";

import { useState, useMemo, useRef, useEffect } from "react";

/* ── Helpers ── */
function fmtDollars(n: number) {
  return Math.round(n).toLocaleString("en-CA");
}
function fmt2(n: number) {
  return n.toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* ── Info Bubble ── */
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

/* ── Canadian semi-annual compounding ── */
function monthlyRate(annualRate: number): number {
  const ear = Math.pow(1 + annualRate / 2, 2) - 1;
  return Math.pow(1 + ear, 1 / 12) - 1;
}

/* ── CMHC insurance premium rate ── */
function cmhcPremiumRate(ltv: number): number {
  if (ltv <= 0.80) return 0;
  if (ltv <= 0.85) return 0.028;
  if (ltv <= 0.90) return 0.031;
  if (ltv <= 0.95) return 0.04;
  return 0;
}

/* ── Minimum down payment ── */
function minDownPayment(homePrice: number): number {
  if (homePrice <= 0) return 0;
  if (homePrice > 1500000) return homePrice * 0.20;
  if (homePrice <= 500000) return homePrice * 0.05;
  return 25000 + (homePrice - 500000) * 0.10;
}

/* ── Slider Input (with editable text field) ── */
function SliderInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
  prefix = "$",
  suffix = "",
  helperText,
  formatDisplay,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  helperText?: string;
  formatDisplay?: (v: number) => string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const pct = ((value - min) / (max - min)) * 100;

  const displayed = formatDisplay
    ? formatDisplay(value)
    : prefix === "$"
      ? `${prefix}${fmtDollars(value)}`
      : `${value}${suffix}`;

  const startEditing = () => {
    setDraft(String(value));
    setEditing(true);
  };

  const commitEdit = () => {
    setEditing(false);
    const parsed = parseFloat(draft.replace(/[^0-9.\-]/g, ""));
    if (!isNaN(parsed)) {
      onChange(Math.min(max, Math.max(min, parsed)));
    }
  };

  return (
    <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-3 pb-2 flex flex-col justify-between h-full">
      <div className="flex items-center gap-1.5 mb-1">
        <span
          className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          {label}
        </span>
        {helperText && <InfoBubble text={helperText} />}
      </div>
      {editing ? (
        <div className="flex items-center gap-1 mb-2">
          {prefix && <span className="text-slate text-[1rem]">{prefix}</span>}
          <input
            type="number"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={(e) => e.key === "Enter" && commitEdit()}
            autoFocus
            className="w-full bg-transparent text-navy font-bold text-[1.125rem] sm:text-[1.25rem] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            style={{ fontFamily: "var(--font-spectral)" }}
          />
          {suffix && <span className="text-slate text-[1rem]">{suffix}</span>}
        </div>
      ) : (
        <p
          className="text-navy font-bold text-[1.125rem] sm:text-[1.25rem] mb-2 cursor-text"
          style={{ fontFamily: "var(--font-spectral)" }}
          onClick={startEditing}
        >
          {displayed}
        </p>
      )}
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

export default function RequiredIncomeCalculator() {
  const [homePrice, setHomePrice] = useState(750000);
  const [downPayment, setDownPayment] = useState(150000);
  const [rate, setRate] = useState(4.90);
  const [monthlyDebts, setMonthlyDebts] = useState(0);

  const results = useMemo(() => {
    const GDS_LIMIT = 0.32;
    const TDS_LIMIT = 0.40;
    const contractRate = rate / 100;
    const amortYears = 25;

    const mortgage = Math.max(0, homePrice - downPayment);
    const ltv = homePrice > 0 ? mortgage / homePrice : 0;
    const premiumRate = (ltv > 0.80 && homePrice <= 1500000) ? cmhcPremiumRate(ltv) : 0;
    const insurancePremium = mortgage * premiumRate;
    const insuredMortgage = mortgage + insurancePremium;

    // Monthly payment at contract rate
    const r = monthlyRate(contractRate);
    const n = amortYears * 12;
    const monthlyPayment = insuredMortgage > 0 && r > 0
      ? (insuredMortgage * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      : 0;

    // Required income: higher of GDS and TDS constraint
    const reqGDS = GDS_LIMIT > 0 ? (monthlyPayment / GDS_LIMIT) * 12 : 0;
    const reqTDS = TDS_LIMIT > 0 ? ((monthlyPayment + monthlyDebts) / TDS_LIMIT) * 12 : 0;
    const requiredIncome = Math.max(reqGDS, reqTDS);

    const monthlyIncome = requiredIncome / 12;
    const gds = monthlyIncome > 0 ? monthlyPayment / monthlyIncome : 0;
    const tds = monthlyIncome > 0 ? (monthlyPayment + monthlyDebts) / monthlyIncome : 0;
    const cashLeft = monthlyIncome - monthlyPayment - monthlyDebts;

    const minDP = minDownPayment(homePrice);
    const dpShortfall = downPayment < minDP;

    return {
      requiredIncome,
      mortgage,
      insuredMortgage,
      insurancePremium,
      monthlyPayment,
      ltv,
      gds,
      tds,
      cashLeft,
      dpShortfall,
      minDP,
    };
  }, [homePrice, downPayment, rate, monthlyDebts]);

  const handleBookCall = () => {
    window.dispatchEvent(new CustomEvent("open-booking-modal"));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-10 py-6 sm:py-10">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        {/* ── LEFT: Inputs ── */}
        <div className="md:w-[55%] flex flex-col gap-5">
          <SliderInput
            label="Home Price"
            value={homePrice}
            min={100000}
            max={5000000}
            step={25000}
            onChange={setHomePrice}
            helperText="The purchase price of the home you are looking at."
          />

          <SliderInput
            label="Down Payment"
            value={downPayment}
            min={0}
            max={1000000}
            step={5000}
            onChange={setDownPayment}
            helperText="The amount you have saved for a down payment. Minimum 5% for homes under $500K, 10% on the portion between $500K and $1.5M, and 20% for homes over $1.5M."
          />

          <SliderInput
            label="Interest Rate"
            value={rate}
            min={1}
            max={10}
            step={0.05}
            onChange={setRate}
            prefix=""
            suffix="%"
            formatDisplay={(v) => `${v.toFixed(2)}%`}
            helperText="The mortgage interest rate. Your actual rate will depend on the product and term you choose."
          />

          <SliderInput
            label="Monthly Debts"
            value={monthlyDebts}
            min={0}
            max={5000}
            step={100}
            onChange={setMonthlyDebts}
            helperText="Monthly debt obligations like car payments, student loans, credit card minimums, and child or spousal support. Do not include rent (that goes away when you buy)."
          />
        </div>

        {/* ── RIGHT: Results Panel ── */}
        <div className="md:w-[45%]">
          <div className="md:sticky md:top-20 bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-6 shadow-sm">
            {/* Required Income */}
            <div className="mb-5">
              <p
                className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide mb-1"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Minimum Income Required
              </p>
              <p
                className="text-[2rem] sm:text-[2.5rem] font-bold text-coral leading-tight"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                ${fmtDollars(results.requiredIncome)}
              </p>
            </div>

            {/* DP warning */}
            {results.dpShortfall && (
              <div
                className="bg-coral/10 border border-coral/20 rounded-lg px-4 py-3 mb-5 text-[0.75rem] text-navy leading-relaxed"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Minimum down payment for this price is ${fmtDollars(results.minDP)}. Increase your down payment to qualify.
              </div>
            )}

            {/* Key figures */}
            <div className="space-y-2.5 text-[0.8125rem] mb-5 pb-5 border-b border-sand-2" style={{ fontFamily: "var(--font-jakarta)" }}>
              <div className="flex items-center justify-between">
                <span className="text-slate flex items-center gap-1.5">
                  Mortgage Amount
                  <InfoBubble text="The home price minus your down payment." />
                </span>
                <span className="text-navy font-semibold">${fmtDollars(results.mortgage)}</span>
              </div>
              {results.insurancePremium > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-slate flex items-center gap-1.5">
                    CMHC Insurance
                    <InfoBubble text="When your down payment is less than 20%, mortgage insurance is required. The premium is added to your mortgage balance." />
                  </span>
                  <span className="text-navy font-semibold">${fmtDollars(results.insurancePremium)}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-slate flex items-center gap-1.5">
                  Monthly Payment
                  <InfoBubble text="Your estimated monthly mortgage payment (principal and interest) at the rate you entered, over a 25-year amortization." />
                </span>
                <span className="text-navy font-semibold">${fmt2(results.monthlyPayment)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate flex items-center gap-1.5">
                  LTV
                  <InfoBubble text="Loan-to-Value ratio. The percentage of the home price covered by the mortgage. Below 80% means no mortgage insurance is required." />
                </span>
                <span className="text-navy font-semibold">{(results.ltv * 100).toFixed(0)}%</span>
              </div>
            </div>

            {/* GDS / TDS side by side */}
            <div className="flex gap-3 mb-5">
              <div className="flex-1 bg-[#FAFAFA] rounded-lg px-3 py-2 flex items-center justify-between">
                <span className="text-slate text-[0.6875rem] font-semibold uppercase tracking-wide flex items-center gap-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                  GDS
                  <InfoBubble text="Gross Debt Service ratio. The percentage of your gross income going to your mortgage payment. This calculator uses a 32% maximum." />
                </span>
                <span className={`font-bold text-[0.9375rem] ${results.gds > 0.32 ? "text-coral" : "text-navy"}`} style={{ fontFamily: "var(--font-spectral)" }}>
                  {(results.gds * 100).toFixed(1)}%
                  <span className="text-slate font-normal text-[0.625rem]"> / 32%</span>
                </span>
              </div>
              <div className="flex-1 bg-[#FAFAFA] rounded-lg px-3 py-2 flex items-center justify-between">
                <span className="text-slate text-[0.6875rem] font-semibold uppercase tracking-wide flex items-center gap-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                  TDS
                  <InfoBubble text="Total Debt Service ratio. The percentage of your gross income going to mortgage payment plus all other monthly debts. This calculator uses a 40% maximum." />
                </span>
                <span className={`font-bold text-[0.9375rem] ${results.tds > 0.40 ? "text-coral" : "text-navy"}`} style={{ fontFamily: "var(--font-spectral)" }}>
                  {(results.tds * 100).toFixed(1)}%
                  <span className="text-slate font-normal text-[0.625rem]"> / 40%</span>
                </span>
              </div>
            </div>

            {/* Money left over */}
            <div className="bg-[#FAFAFA] rounded-lg p-3 mb-5 flex items-center justify-between" style={{ fontFamily: "var(--font-jakarta)" }}>
              <span className="text-slate text-[0.8125rem] flex items-center gap-1.5">
                Money Left Over
                <InfoBubble text="What remains from your gross monthly income after your mortgage payment and other debts. This is before income tax and other living expenses." />
              </span>
              <span className="text-navy font-bold text-[1.125rem]" style={{ fontFamily: "var(--font-spectral)" }}>
                ${fmtDollars(results.cashLeft)}/mo
              </span>
            </div>

            {/* Disclaimer */}
            <p
              className="text-[0.6875rem] text-slate leading-relaxed mb-5"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              This is an estimate for illustration purposes only. Actual mortgage approval depends on your full application, credit history, and lender criteria. This is not a mortgage commitment or guarantee.
            </p>

            {/* CTA */}
            <div className="space-y-2.5">
              <p
                className="text-navy text-[0.8125rem] font-medium text-center"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Want Jesse to run your exact numbers? It takes one call.
              </p>
              <button
                onClick={handleBookCall}
                className="w-full bg-coral text-white font-semibold py-3 rounded-lg hover:bg-coral-dark hover:scale-[1.03] active:scale-95 transition-all cursor-pointer text-[0.875rem]"
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

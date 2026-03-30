"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";

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
function fmt2(n: number) {
  return n.toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtRound(n: number) {
  return Math.round(n).toString();
}
function fmtPct2(n: number) {
  return n.toFixed(2);
}

function calcMonthlyPayment(principal: number, annualRate: number, amortYears: number) {
  if (principal <= 0 || annualRate <= 0 || amortYears <= 0) return 0;
  const ear = Math.pow(1 + annualRate / 2, 2) - 1;
  const periodicRate = Math.pow(1 + ear, 1 / 12) - 1;
  const n = amortYears * 12;
  return (
    (principal * (periodicRate * Math.pow(1 + periodicRate, n))) /
    (Math.pow(1 + periodicRate, n) - 1)
  );
}

const THRESHOLDS = [
  { label: "32%/40%", gds: 0.32, tds: 0.40, desc: "Conservative" },
  { label: "35%/42%", gds: 0.35, tds: 0.42, desc: "Standard" },
  { label: "39%/44%", gds: 0.39, tds: 0.44, desc: "Maximum" },
];

const RATE_TERMS = ["1 Year", "2 Year", "3 Year", "4 Year", "5 Year", "6 Year"];

/* ── Slider Input ── */
function SliderInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
  prefix = "$",
  suffix = "",
  info,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  info?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-4 pb-3 flex flex-col justify-between h-full">
      <div className="flex items-center gap-1.5 mb-1.5">
        <span
          className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          {label}
        </span>
        {info && <InfoBubble text={info} />}
      </div>
      <p
        className="text-navy font-bold text-[1.375rem] mb-2"
        style={{ fontFamily: "var(--font-spectral)" }}
      >
        {prefix}{prefix === "$" ? Math.round(value).toLocaleString("en-CA") : ""}{prefix !== "$" ? value : ""}{suffix}
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

/* ── Plain Input (no slider) ── */
function PlainInput({
  label,
  value,
  onChange,
  prefix = "$",
  suffix = "",
  note,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
  note?: string;
}) {
  return (
    <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-4 flex flex-col justify-between h-full">
      <span
        className="text-[0.6875rem] font-medium text-slate uppercase tracking-wide mb-1.5"
        style={{ fontFamily: "var(--font-jakarta)" }}
      >
        {label}
      </span>
      <div className="flex items-center gap-1">
        {prefix && <span className="text-slate text-[0.875rem]">{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-navy font-bold text-[1.375rem] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          style={{ fontFamily: "var(--font-spectral)" }}
        />
        {suffix && <span className="text-slate text-[0.875rem]">{suffix}</span>}
      </div>
      {note && (
        <p className="text-[0.625rem] text-slate mt-1" style={{ fontFamily: "var(--font-jakarta)" }}>
          {note}
        </p>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════ */

export default function DebtServiceCalculator() {
  /* ── State ── */
  const [mortgageAmount, setMortgageAmount] = useState(500000);
  const [grossIncome, setGrossIncome] = useState(100000);
  const [monthlyDebt, setMonthlyDebt] = useState(0);
  const [propertyTaxMonthly, setPropertyTaxMonthly] = useState("");
  const [propertyTaxYearly, setPropertyTaxYearly] = useState("");
  const [condoFees, setCondoFees] = useState(0);
  const [heat, setHeat] = useState(150);
  const [rate, setRate] = useState(5.25);
  const [rateType, setRateType] = useState<"fixed" | "variable">("fixed");
  const [rateTerm, setRateTerm] = useState("5 Year");
  const [amortization, setAmortization] = useState(25);
  const [rentalToggle, setRentalToggle] = useState(false);
  const [rentalMonthly, setRentalMonthly] = useState("");
  const [rentalYearly, setRentalYearly] = useState("");

  /* Property tax sync */
  const handlePropTaxMonthly = useCallback((v: string) => {
    setPropertyTaxMonthly(v);
    const n = parseFloat(v);
    setPropertyTaxYearly(isNaN(n) ? "" : String(Math.round(n * 12)));
  }, []);

  const handlePropTaxYearly = useCallback((v: string) => {
    setPropertyTaxYearly(v);
    const n = parseFloat(v);
    setPropertyTaxMonthly(isNaN(n) ? "" : String(parseFloat((n / 12).toFixed(2))));
  }, []);

  /* Rental income sync */
  const handleRentalMonthly = useCallback((v: string) => {
    setRentalMonthly(v);
    const n = parseFloat(v);
    setRentalYearly(isNaN(n) ? "" : String(Math.round(n * 12)));
  }, []);

  const handleRentalYearly = useCallback((v: string) => {
    setRentalYearly(v);
    const n = parseFloat(v);
    setRentalMonthly(isNaN(n) ? "" : String(Math.round(n / 12)));
  }, []);

  /* ── Calculations ── */
  const results = useMemo(() => {
    const contractRate = rate / 100;
    const qualifyingRate = Math.max(contractRate + 0.02, 0.0525);

    // Stress test payment (used for GDS/TDS qualification only)
    const stressTestPayment = calcMonthlyPayment(mortgageAmount, qualifyingRate, amortization);
    // Actual payment at contract rate (what you pay)
    const actualPayment = calcMonthlyPayment(mortgageAmount, contractRate, amortization);

    const baseMonthlyIncome = grossIncome / 12;
    const rentalMo = rentalToggle ? parseFloat(rentalMonthly) || 0 : 0;
    const adjustedMonthlyIncome = baseMonthlyIncome + rentalMo * 0.5;

    const propTaxMo = parseFloat(propertyTaxMonthly) || 0;
    const condoIncluded = condoFees * 0.5;

    // GDS/TDS use stress test payment + 50% condo
    const gdsNumerator = stressTestPayment + propTaxMo + heat + condoIncluded;
    const gds = adjustedMonthlyIncome > 0 ? gdsNumerator / adjustedMonthlyIncome : 0;

    const tdsNumerator = gdsNumerator + monthlyDebt;
    const tds = adjustedMonthlyIncome > 0 ? tdsNumerator / adjustedMonthlyIncome : 0;

    // Cash left uses actual payment + full condo
    const actualMonthlyOut = actualPayment + propTaxMo + heat + condoFees + monthlyDebt;
    const cashLeft = adjustedMonthlyIncome - actualMonthlyOut;

    return {
      qualifyingRate,
      monthlyPayment: actualPayment,
      gds,
      tds,
      cashLeft,
      homeExpenses: propTaxMo + heat + condoFees,
    };
  }, [mortgageAmount, grossIncome, monthlyDebt, propertyTaxMonthly, condoFees, heat, rate, amortization, rentalToggle, rentalMonthly]);

  const gdsExceedsMax = results.gds > 0.39;
  const tdsExceedsMax = results.tds > 0.44;
  const ratioColor = gdsExceedsMax || tdsExceedsMax ? "text-coral" : "text-navy";

  const handleBookCall = () => {
    window.dispatchEvent(new CustomEvent("open-booking-modal"));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-10 py-6 sm:py-10">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        {/* ── LEFT: Inputs ── */}
        <div className="md:w-[60%] flex flex-col gap-5">

          {/* Mortgage Amount */}
          <SliderInput
            label="Mortgage Amount"
            value={mortgageAmount}
            min={50000}
            max={2000000}
            step={50000}
            onChange={setMortgageAmount}
            info="The total mortgage amount, after your down payment. Take the purchase price and subtract your down payment."
          />

          {/* Gross Annual Income */}
          <SliderInput
            label="Gross Annual Income"
            value={grossIncome}
            min={30000}
            max={500000}
            step={1000}
            onChange={setGrossIncome}
            info="Enter your gross annual income. If you are applying with a co-applicant, combine all incomes and add it here."
          />

          {/* Monthly Debt */}
          <SliderInput
            label="Monthly Debt Payments"
            value={monthlyDebt}
            min={0}
            max={5000}
            step={100}
            onChange={setMonthlyDebt}
            info="The sum of all monthly debt payments. Add up all monthly credit card payments, car loans or leases, personal loans or line of credit payments, spouse or child support payments."
          />

          {/* Divider */}
          <div className="border-t border-dashed border-[#E5E7EB]" />

          {/* ── Home Expenses ── */}
          <div>
            <p
              className="text-navy font-bold text-[0.9375rem] mb-1"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Home Expenses
            </p>
            <p
              className="text-slate text-[0.75rem] mb-3"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              To budget better and calculate a more realistic monthly cost, enter your additional home expenses here.
            </p>

            {/* Property Tax */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <PlainInput
                label="Property Tax (Monthly)"
                value={propertyTaxMonthly}
                onChange={handlePropTaxMonthly}
              />
              <PlainInput
                label="Property Tax (Yearly)"
                value={propertyTaxYearly}
                onChange={handlePropTaxYearly}
              />
            </div>

            {/* Condo + Heat */}
            <div className="grid grid-cols-2 gap-3">
              <SliderInput
                label="Condo Fees (Monthly)"
                value={condoFees}
                min={0}
                max={2000}
                step={100}
                onChange={setCondoFees}
                info="Enter your monthly condo fees here. If you plan to live in a house, leave this value at $0."
              />
              <SliderInput
                label="Heat (Monthly)"
                value={heat}
                min={0}
                max={1000}
                step={50}
                onChange={setHeat}
                info="Enter the anticipated monthly heat cost. If unsure, use $150 for a house and $100 for a condo."
              />
            </div>
            {condoFees > 0 && (
              <p className="text-[0.625rem] text-slate mt-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                50% included in ratio calculation per CMHC guidelines.
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-dashed border-[#E5E7EB]" />

          {/* ── Rate ── */}
          <div>
            <p
              className="text-navy font-bold text-[0.9375rem] mb-1"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Rate
            </p>
            <p
              className="text-slate text-[0.75rem] mb-3"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Fixed stays the same for the term. Variable moves with prime.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-4 pb-3 flex flex-col justify-between">
                <span className="text-[0.6875rem] font-medium text-slate uppercase tracking-wide mb-1.5" style={{ fontFamily: "var(--font-jakarta)" }}>
                    Rate
                  </span>
                <p className="text-navy font-bold text-[1.375rem] mb-2" style={{ fontFamily: "var(--font-spectral)" }}>
                  {rate.toFixed(2)}%
                </p>
                <input
                  type="range"
                  min={1}
                  max={12}
                  step={0.1}
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-navy [&::-webkit-slider-thumb]:shadow-md"
                  style={{
                    background: `linear-gradient(to right, #1E2D3D 0%, #E8705A ${((rate - 1) / 11) * 100}%, #E5E7EB ${((rate - 1) / 11) * 100}%, #E5E7EB 100%)`,
                  }}
                />
              </div>
              <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-4 flex flex-col justify-between">
                <span className="text-[0.6875rem] font-medium text-slate uppercase tracking-wide mb-1.5" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Rate Term
                </span>
                <select
                  value={rateTerm}
                  onChange={(e) => setRateTerm(e.target.value)}
                  className="w-full bg-transparent text-navy font-bold text-[1.375rem] focus:outline-none cursor-pointer"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  {RATE_TERMS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-dashed border-[#E5E7EB]" />

          {/* ── Amortization ── */}
          <div>
            <p
              className="text-navy font-bold text-[0.9375rem] mb-1"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Amortization
            </p>
            <p
              className="text-slate text-[0.75rem] mb-3"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              The total time to pay off your mortgage. New mortgages in Canada typically start at 25 or 30 years.
            </p>
            <SliderInput
              label="Amortization"
              value={amortization}
              min={5}
              max={30}
              step={1}
              onChange={setAmortization}
              prefix=""
              suffix={` year${amortization !== 1 ? "s" : ""}`}
            />
          </div>

          {/* Divider */}
          <div className="border-t border-dashed border-[#E5E7EB]" />

          {/* ── Rental Income ── */}
          <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-4">
            <div className="flex items-center justify-between mb-1">
              <p
                className="text-navy font-bold text-[0.9375rem]"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Add Rental Income
              </p>
              <button
                onClick={() => {
                  setRentalToggle(!rentalToggle);
                  if (rentalToggle) {
                    setRentalMonthly("");
                    setRentalYearly("");
                  }
                }}
                className={`relative w-10 h-5 shrink-0 rounded-full transition-colors cursor-pointer ${
                  rentalToggle ? "bg-coral" : "bg-sand-2"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                    rentalToggle ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
            {rentalToggle && (
              <>
                <p
                  className="text-slate text-[0.75rem] mb-3"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  If you plan to rent out part of your home, enter the monthly rent. 50% of rental income is added to qualifying income.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <PlainInput
                    label="Rental Income (Monthly)"
                    value={rentalMonthly}
                    onChange={handleRentalMonthly}
                  />
                  <PlainInput
                    label="Rental Income (Yearly)"
                    value={rentalYearly}
                    onChange={handleRentalYearly}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── RIGHT: Results Panel ── */}
        <div className="md:w-[40%]">
          <div className="md:sticky md:top-20 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-md">
            {/* GDS / TDS header */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <p className="text-[0.6875rem] font-semibold text-slate tracking-wide mb-1 flex items-center gap-1.5" style={{ fontFamily: "var(--font-jakarta)" }}>
                  GDS <InfoBubble text="GDS (Gross Debt Service) measures housing costs as a share of income. It includes your mortgage payment, property tax, heat, and 50% of condo fees. Most lenders cap GDS at 32% to 39%." />
                </p>
                <p
                  className={`text-[2rem] font-bold ${results.gds > 0.39 ? "text-coral" : "text-navy"}`}
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  {fmtRound(results.gds * 100)}%
                </p>
              </div>
              <div>
                <p className="text-[0.6875rem] font-semibold text-slate tracking-wide mb-1 flex items-center gap-1.5" style={{ fontFamily: "var(--font-jakarta)" }}>
                  TDS <InfoBubble text="TDS (Total Debt Service) includes all housing costs plus your other monthly debts like car loans, credit cards, and student loans. Most lenders cap TDS at 40% to 44%." />
                </p>
                <p
                  className={`text-[2rem] font-bold ${results.tds > 0.44 ? "text-coral" : "text-navy"}`}
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  {fmtRound(results.tds * 100)}%
                </p>
              </div>
            </div>

            {/* Stress test rate */}
            <div className="flex items-center justify-between text-[0.8125rem] mb-5 pb-4 border-b border-sand-2" style={{ fontFamily: "var(--font-jakarta)" }}>
              <span className="text-slate font-semibold">Stress Test Rate</span>
              <span className="text-navy font-bold">{fmtPct2(results.qualifyingRate * 100)}%</span>
            </div>

            {/* Threshold pills */}
            <div className="flex gap-2 mb-5">
              {THRESHOLDS.map((tier) => {
                const exceeded = results.gds > tier.gds || results.tds > tier.tds;
                return (
                  <div
                    key={tier.label}
                    className={`flex-1 text-center py-2 rounded-lg text-[0.6875rem] font-bold transition-colors ${
                      exceeded ? "bg-coral text-white" : "bg-sand text-navy"
                    }`}
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    <p className="text-[0.5625rem] font-semibold opacity-70 mb-0.5">{tier.desc}</p>
                    {tier.label}
                  </div>
                );
              })}
            </div>

            {/* Visual bar */}
            <div className="h-3 rounded-full bg-sand-2 overflow-hidden flex mb-5">
              <div
                className="bg-navy transition-all duration-300"
                style={{ width: `${Math.min(100, results.gds * 100)}%` }}
              />
              <div
                className="bg-emerald-500 transition-all duration-300"
                style={{ width: `${Math.min(100 - results.gds * 100, Math.max(0, (results.tds - results.gds) * 100))}%` }}
              />
            </div>
            <div className="flex gap-4 text-[0.625rem] text-slate mb-5" style={{ fontFamily: "var(--font-jakarta)" }}>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-navy" />Housing (GDS)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" />Debt</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sand-2" />Remaining</span>
            </div>

            {/* Line items */}
            <div className="flex flex-col gap-3 text-[0.875rem] border-t border-sand-2 pt-4" style={{ fontFamily: "var(--font-jakarta)" }}>
              <div className="flex justify-between">
                <span className="text-slate">Monthly Mortgage</span>
                <span className="text-navy font-semibold">${fmt2(results.monthlyPayment)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate">Debt Payments</span>
                <span className="text-navy font-semibold">${fmt2(monthlyDebt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate">Home Expenses</span>
                <span className="text-navy font-semibold">${fmt2(results.homeExpenses)}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 pt-5 border-t border-sand-2">
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

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
  return Math.round(n).toLocaleString("en-CA");
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

/** Given a max monthly payment, back-calculate the max principal */
function calcMaxPrincipal(maxPayment: number, annualRate: number, amortYears: number) {
  if (maxPayment <= 0 || annualRate <= 0 || amortYears <= 0) return 0;
  const ear = Math.pow(1 + annualRate / 2, 2) - 1;
  const periodicRate = Math.pow(1 + ear, 1 / 12) - 1;
  const n = amortYears * 12;
  return (
    (maxPayment * (Math.pow(1 + periodicRate, n) - 1)) /
    (periodicRate * Math.pow(1 + periodicRate, n))
  );
}

const RATE_TERMS = ["1 Year", "2 Year", "3 Year", "4 Year", "5 Year", "6 Year"];

/* ── Affordability level: slider is GDS 0–50, TDS derived ── */
function getThresholds(gdsVal: number): { gds: number; tds: number; label: string } {
  const gds = gdsVal / 100;
  let tds: number;
  if (gdsVal <= 35) {
    tds = gdsVal > 0 ? gdsVal * (42 / 35) : 0;
  } else if (gdsVal <= 39) {
    tds = 42 + ((gdsVal - 35) / (39 - 35)) * (44 - 42);
  } else {
    tds = 44 + ((gdsVal - 39) / (50 - 39)) * (50 - 44);
  }
  const label = gdsVal <= 35 ? "Baseline" : gdsVal <= 39 ? "Standard" : "Stretched";
  return { gds, tds: tds / 100, label };
}

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
  displayValue,
  helperText,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  displayValue?: string;
  helperText?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
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
      <p
        className="text-navy font-bold text-[1.125rem] sm:text-[1.25rem] mb-2"
        style={{ fontFamily: "var(--font-spectral)" }}
      >
        {displayValue
          ? displayValue
          : `${prefix}${prefix === "$" ? fmt2(value) : value}${suffix}`}
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
    <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-3 flex flex-col justify-between h-full">
      <span
        className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide mb-1"
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
          className="w-full bg-transparent text-navy font-bold text-[1.125rem] sm:text-[1.25rem] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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

export default function AffordabilityCalculator() {
  /* ── State ── */
  const [grossIncome, setGrossIncome] = useState(100000);
  const [monthlyDebt, setMonthlyDebt] = useState(0);
  const [rate, setRate] = useState(5.25);
  const [rateType, setRateType] = useState<"fixed" | "variable">("fixed");
  const [rateTerm, setRateTerm] = useState("5 Year");
  const [amortization, setAmortization] = useState(25);

  // Home expenses
  const [propertyTaxMonthly, setPropertyTaxMonthly] = useState("");
  const [propertyTaxYearly, setPropertyTaxYearly] = useState("");
  const [condoFees, setCondoFees] = useState(0);
  const [heat, setHeat] = useState(0);

  // Rental income
  const [rentalToggle, setRentalToggle] = useState(false);
  const [rentalMonthly, setRentalMonthly] = useState("");
  const [rentalYearly, setRentalYearly] = useState("");

  // Affordability level
  const [affordLevel, setAffordLevel] = useState(35);
  const [customRatios, setCustomRatios] = useState(false);
  const [customGds, setCustomGds] = useState("35");
  const [customTds, setCustomTds] = useState("42");

  /* Property tax sync */
  const handlePropTaxMonthly = useCallback((v: string) => {
    setPropertyTaxMonthly(v);
    const n = parseFloat(v);
    setPropertyTaxYearly(isNaN(n) ? "" : String(Math.round(n * 12)));
  }, []);

  const handlePropTaxYearly = useCallback((v: string) => {
    setPropertyTaxYearly(v);
    const n = parseFloat(v);
    setPropertyTaxMonthly(isNaN(n) ? "" : String(Math.round(n / 12)));
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

  /* ── Threshold logic ── */
  const thresholds = useMemo(() => {
    if (customRatios) {
      return {
        gds: (parseFloat(customGds) || 32) / 100,
        tds: (parseFloat(customTds) || 40) / 100,
        label: "Custom",
      };
    }
    return getThresholds(affordLevel);
  }, [affordLevel, customRatios, customGds, customTds]);

  /* ── Calculate max mortgage from income ── */
  const results = useMemo(() => {
    const contractRate = rate / 100;
    const qualifyingRate = Math.max(contractRate + 0.02, 0.0525);

    const rentalMo = rentalToggle ? parseFloat(rentalMonthly) || 0 : 0;
    const baseMonthlyIncome = grossIncome / 12;
    const adjustedMonthlyIncome = baseMonthlyIncome + rentalMo * 0.5;

    const propTaxMo = parseFloat(propertyTaxMonthly) || 0;
    const condoIncluded = condoFees * 0.5; // 50% per CMHC

    // GDS: (mortgage + propTax + heat + 50% condo) / income <= threshold
    const maxPaymentGDS =
      adjustedMonthlyIncome * thresholds.gds - propTaxMo - heat - condoIncluded;

    // TDS: (mortgage + propTax + heat + 50% condo + debt) / income <= threshold
    const maxPaymentTDS =
      adjustedMonthlyIncome * thresholds.tds - propTaxMo - heat - condoIncluded - monthlyDebt;

    // The binding constraint is whichever gives the lower max payment
    const maxPayment = Math.max(0, Math.min(maxPaymentGDS, maxPaymentTDS));

    // Back-calculate max principal from the stress-test payment
    const maxMortgage = calcMaxPrincipal(maxPayment, qualifyingRate, amortization);

    // Actual monthly payment at contract rate
    const actualPayment = calcMonthlyPayment(maxMortgage, contractRate, amortization);

    // Full home expenses for display
    const fullHomeExpenses = propTaxMo + heat + condoFees;

    // Cash left uses actual payment + full expenses
    const cashLeft = adjustedMonthlyIncome - actualPayment - monthlyDebt - fullHomeExpenses;

    // GDS/TDS at the calculated mortgage (using stress test rate)
    const stressPayment = calcMonthlyPayment(maxMortgage, qualifyingRate, amortization);
    const gdsNumerator = stressPayment + propTaxMo + heat + condoIncluded;
    const gds = adjustedMonthlyIncome > 0 ? gdsNumerator / adjustedMonthlyIncome : 0;
    const tdsNumerator = gdsNumerator + monthlyDebt;
    const tds = adjustedMonthlyIncome > 0 ? tdsNumerator / adjustedMonthlyIncome : 0;

    return {
      maxMortgage,
      qualifyingRate,
      actualPayment,
      fullHomeExpenses,
      cashLeft,
      gds,
      tds,
    };
  }, [
    grossIncome,
    monthlyDebt,
    propertyTaxMonthly,
    condoFees,
    heat,
    rate,
    amortization,
    rentalToggle,
    rentalMonthly,
    thresholds,
  ]);

  /* ── Visual bar widths ── */
  const monthlyIncome = grossIncome / 12 + (rentalToggle ? (parseFloat(rentalMonthly) || 0) * 0.5 : 0);
  const mortgagePct = monthlyIncome > 0 ? Math.min((results.actualPayment / monthlyIncome) * 100, 100) : 0;
  const debtPct = monthlyIncome > 0 ? Math.min((monthlyDebt / monthlyIncome) * 100, 100 - mortgagePct) : 0;
  const expPct = monthlyIncome > 0 ? Math.min((results.fullHomeExpenses / monthlyIncome) * 100, 100 - mortgagePct - debtPct) : 0;

  const handleBookCall = () => {
    window.dispatchEvent(new CustomEvent("open-booking-modal"));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-10 py-6 sm:py-10">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        {/* ── LEFT: Inputs ── */}
        <div className="md:w-[60%] flex flex-col gap-5">

          {/* Gross Annual Income */}
          <SliderInput
            label="Gross Annual Income"
            value={grossIncome}
            min={30000}
            max={500000}
            step={5000}
            onChange={setGrossIncome}
            helperText="Enter your gross annual income. If you are applying with a co-applicant, combine all incomes and add it here."
          />

          {/* Monthly Debt */}
          <SliderInput
            label="Monthly Debt Payments"
            value={monthlyDebt}
            min={0}
            max={5000}
            step={100}
            onChange={setMonthlyDebt}
            helperText="The sum of all monthly debt payments. Add up all monthly credit card payments, car loans or leases, personal loans or line of credit payments, spouse or child support payments."
          />

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
              To budget better and calculate a more realistic total monthly cost, enter the additional home expenses here.
            </p>

            {/* Property Tax */}
            <p
              className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide mb-2"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Property Tax
            </p>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <PlainInput
                label="Monthly"
                value={propertyTaxMonthly}
                onChange={handlePropTaxMonthly}
              />
              <PlainInput
                label="Yearly"
                value={propertyTaxYearly}
                onChange={handlePropTaxYearly}
              />
            </div>

            {/* Condo + Heat */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SliderInput
                label="Condo Fees (Monthly)"
                value={condoFees}
                min={0}
                max={2000}
                step={100}
                onChange={setCondoFees}
                helperText="Enter your monthly condo fees here. If you plan to live in a house, leave this value at $0."
              />
              <SliderInput
                label="Heat"
                value={heat}
                min={0}
                max={500}
                step={50}
                onChange={setHeat}
                helperText="Enter the anticipated monthly heat cost. If unsure, use $150 for a house and $100 for a condo."
              />
            </div>
            {condoFees > 0 && (
              <p className="text-[0.625rem] text-slate mt-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                50% included in ratio calculation per CMHC guidelines.
              </p>
            )}
          </div>

          {/* ── Affordability Level ── */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <p
                className="text-navy font-bold text-[0.9375rem]"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Affordability Level
              </p>
              <div className="flex items-center gap-2">
                <span
                  className="text-[0.625rem] text-slate"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Custom Ratios
                </span>
                <button
                  onClick={() => setCustomRatios(!customRatios)}
                  className={`relative w-10 h-5 shrink-0 rounded-full transition-colors cursor-pointer ${
                    customRatios ? "bg-coral" : "bg-sand-2"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                      customRatios ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
            <p
              className="text-slate text-[0.75rem] mb-3"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              This slider decides how much of your disposable income is allocated to mortgage payments, home expenses, and monthly debt payments.
            </p>

            {customRatios ? (
              <div className="grid grid-cols-2 gap-3">
                <PlainInput
                  label="Max GDS (%)"
                  value={customGds}
                  onChange={setCustomGds}
                  prefix=""
                  suffix="%"
                />
                <PlainInput
                  label="Max TDS (%)"
                  value={customTds}
                  onChange={setCustomTds}
                  prefix=""
                  suffix="%"
                />
              </div>
            ) : (
              <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-4 pb-3">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    GDS: {(thresholds.gds * 100).toFixed(0)}% / TDS: {(thresholds.tds * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="relative">
                  <div
                    className="relative h-3 rounded-full"
                    style={{
                      background: "linear-gradient(to right, #22c55e 0%, #22c55e 60%, #eab308 75%, #E8705A 100%)",
                    }}
                  >
                    {/* Baseline dot at 70% (35/50) */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border border-[#ccc] z-[5] pointer-events-none"
                      style={{ left: "70%" }}
                    />
                    {/* Standard dot at 78% (39/50) */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border border-[#ccc] z-[5] pointer-events-none"
                      style={{ left: "78%" }}
                    />
                    <input
                      type="range"
                      min={0}
                      max={50}
                      step={1}
                      value={affordLevel}
                      onChange={(e) => setAffordLevel(parseInt(e.target.value))}
                      className="absolute inset-0 w-full h-full appearance-none cursor-pointer bg-transparent z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-navy [&::-webkit-slider-thumb]:shadow-md"
                    />
                  </div>
                  {/* Labels positioned below dots */}
                  <div className="relative mt-2 h-4 text-[0.6875rem] text-slate" style={{ fontFamily: "var(--font-jakarta)" }}>
                    <span className="absolute" style={{ left: "64%", transform: "translateX(-50%)" }}>Baseline</span>
                    <span className="absolute" style={{ left: "84%", transform: "translateX(-50%)" }}>Standard</span>
                  </div>
                </div>
              </div>
            )}
          </div>

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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-3 pb-2 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide" style={{ fontFamily: "var(--font-jakarta)" }}>
                    Rate
                  </span>
                  <div className="flex gap-1 ml-auto">
                    {(["fixed", "variable"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setRateType(t)}
                        className={`text-[0.5625rem] font-semibold px-2 py-0.5 rounded capitalize cursor-pointer transition-colors ${
                          rateType === t ? "bg-navy text-white" : "bg-white text-slate"
                        }`}
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="text-navy font-bold text-[1.125rem] sm:text-[1.25rem] mb-2" style={{ fontFamily: "var(--font-spectral)" }}>
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
              <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-3 flex flex-col justify-between">
                <span className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Rate Term
                </span>
                <select
                  value={rateTerm}
                  onChange={(e) => setRateTerm(e.target.value)}
                  className="w-full bg-transparent text-navy font-bold text-[1.125rem] sm:text-[1.25rem] focus:outline-none cursor-pointer appearance-none"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  {RATE_TERMS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

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

          {/* ── Rental Income ── */}
          <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-3">
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
          <div className="md:sticky md:top-20 bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-6 shadow-sm">
            {/* Maximum Mortgage Amount header */}
            <div className="mb-5">
              <p
                className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide mb-1"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Maximum Mortgage Amount
              </p>
              <p
                className="text-[1.625rem] sm:text-[2rem] font-bold text-coral"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                ${fmtRound(results.maxMortgage)}
              </p>
            </div>

            {/* Stress test rate + GDS / TDS */}
            <div className="space-y-2 text-[0.8125rem] mb-4 pb-4 border-b border-sand-2" style={{ fontFamily: "var(--font-jakarta)" }}>
              <div className="flex items-center justify-between">
                <span className="text-slate">Stress Test Rate</span>
                <span className="text-navy font-semibold">{fmtPct2(results.qualifyingRate * 100)}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate flex items-center gap-1.5">
                  GDS / TDS
                  <InfoBubble text="GDS (Gross Debt Service) measures housing costs as a share of income. TDS (Total Debt Service) includes housing costs plus all other debts. Lenders use both to determine how much you can borrow." />
                </span>
                <span className="text-navy font-semibold">{fmtPct2(results.gds * 100)}% / {fmtPct2(results.tds * 100)}%</span>
              </div>
            </div>

            {/* Visual bar */}
            <div className="h-3 rounded-full bg-[#E5E7EB] overflow-hidden flex mb-2">
              <div
                className="bg-navy transition-all duration-300"
                style={{ width: `${mortgagePct}%` }}
              />
              <div
                className="bg-coral transition-all duration-300"
                style={{ width: `${debtPct}%` }}
              />
              <div
                className="bg-emerald-500 transition-all duration-300"
                style={{ width: `${expPct}%` }}
              />
            </div>

            {/* Line items */}
            <div className="flex flex-col gap-3 text-[0.8125rem] pt-3" style={{ fontFamily: "var(--font-jakarta)" }}>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate">
                  <span className="w-2 h-2 rounded-full bg-navy shrink-0" />
                  Monthly Mortgage
                </span>
                <span className="text-navy font-semibold tabular-nums">${fmt2(results.actualPayment)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate">
                  <span className="w-2 h-2 rounded-full bg-coral shrink-0" />
                  Debt Payments
                </span>
                <span className="text-navy font-semibold tabular-nums">${fmt2(monthlyDebt)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  Home Expenses
                </span>
                <span className="text-navy font-semibold tabular-nums">${fmt2(results.fullHomeExpenses)}</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-sand-2">
                <span className="flex items-center gap-2 text-slate">
                  <span className="w-2 h-2 rounded-full bg-[#E5E7EB] shrink-0" />
                  Cash Left (Gross)
                </span>
                <span className={`font-semibold tabular-nums ${results.cashLeft >= 0 ? "text-navy" : "text-coral"}`}>
                  ${fmt2(results.cashLeft)}
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 pt-5 border-t border-sand-2 space-y-2.5">
              <button
                onClick={handleBookCall}
                className="w-full bg-coral text-white font-semibold py-3 rounded-lg hover:bg-coral-dark transition-colors cursor-pointer text-[0.875rem]"
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

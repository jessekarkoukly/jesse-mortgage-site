"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";

/* ── Helpers ── */
function fmt(n: number) {
  return n.toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtWhole(n: number) {
  return n.toLocaleString("en-CA", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
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
  note,
  decimals = 2,
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
  note?: string;
  decimals?: number;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;

  const fmtVal = (n: number) =>
    n.toLocaleString("en-CA", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const displayValue = prefix === "$" ? `$${fmtVal(value)}` : `${value}${suffix}`;

  return (
    <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-4 pb-3">
      <div className="flex items-center justify-between mb-1">
        <span
          className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          {label}
        </span>
        {info && <InfoBubble text={info} />}
      </div>
      <div className="flex items-center gap-1 mb-3">
        {editing && prefix === "$" && (
          <span className="text-navy font-bold text-[1.25rem]" style={{ fontFamily: "var(--font-spectral)" }}>$</span>
        )}
        <input
          type="text"
          inputMode="numeric"
          value={editing ? draft : displayValue}
          onFocus={() => {
            setEditing(true);
            setDraft(String(value));
          }}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^0-9.]/g, "");
            setDraft(raw);
            const n = parseFloat(raw);
            if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
          }}
          onBlur={() => {
            setEditing(false);
            const n = parseFloat(draft);
            if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
          }}
          className="w-full bg-transparent text-navy font-bold text-[1.25rem] focus:outline-none"
          style={{ fontFamily: "var(--font-spectral)" }}
        />
      </div>
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
      {note && (
        <p className="text-[0.625rem] text-slate mt-1.5" style={{ fontFamily: "var(--font-jakarta)" }}>
          {note}
        </p>
      )}
    </div>
  );
}

/* ── Plain Input ── */
function PlainInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-4 flex flex-col justify-between h-full">
      <span
        className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide mb-1"
        style={{ fontFamily: "var(--font-jakarta)" }}
      >
        {label}
      </span>
      <div className="flex items-center gap-1">
        <span className="text-slate text-[0.875rem]">$</span>
        <input
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-navy font-bold text-[1.25rem] focus:outline-none"
          style={{ fontFamily: "var(--font-spectral)" }}
        />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════ */

export default function RequiredIncomeCalculator() {
  /* ── State ── */
  const [mortgageAmount, setMortgageAmount] = useState(500000);
  const [monthlyDebt, setMonthlyDebt] = useState(0);
  const [propertyTaxMonthly, setPropertyTaxMonthly] = useState("0");
  const [propertyTaxYearly, setPropertyTaxYearly] = useState("0");
  const [condoFees, setCondoFees] = useState(0);
  const [heat, setHeat] = useState(0);
  const [rate, setRate] = useState(5.25);
  const [rateType, setRateType] = useState<"fixed" | "variable">("fixed");
  const [rateTerm, setRateTerm] = useState("5 Year");
  const [amortization, setAmortization] = useState(25);
  // Affordability: GDS value directly (0-50)
  const [affordability, setAffordability] = useState(35);

  /* Property tax sync */
  const fmtComma = (n: number) => n.toLocaleString("en-CA");

  const handlePropTaxMonthly = useCallback((v: string) => {
    const raw = v.replace(/,/g, "");
    setPropertyTaxMonthly(raw);
    const n = parseFloat(raw);
    setPropertyTaxYearly(isNaN(n) ? "" : fmtComma(Math.round(n * 12)));
  }, []);

  const handlePropTaxYearly = useCallback((v: string) => {
    const raw = v.replace(/,/g, "");
    setPropertyTaxYearly(v);
    const n = parseFloat(raw);
    setPropertyTaxMonthly(isNaN(n) ? "" : String(parseFloat((n / 12).toFixed(2))));
  }, []);

  /* ── Calculations ── */
  const results = useMemo(() => {
    // GDS from slider directly (0-50), TDS derived piecewise
    const gds = affordability;
    const gdsLimit = gds / 100;
    let tds: number;
    if (gds <= 35) {
      tds = gds > 0 ? gds * (42 / 35) : 0;
    } else if (gds <= 39) {
      tds = 42 + ((gds - 35) / (39 - 35)) * (44 - 42);
    } else {
      tds = 44 + ((gds - 39) / (50 - 39)) * (50 - 44);
    }
    const tdsLimit = tds / 100;

    const contractRate = rate / 100;
    const qualifyingRate = Math.max(contractRate + 0.02, 0.0525);

    const amortYears = amortization;

    // Monthly payment at STRESS TEST rate (for qualifying / required income calc)
    const stressEAR = Math.pow(1 + qualifyingRate / 2, 2) - 1;
    const stressMonthlyRate = Math.pow(1 + stressEAR, 1 / 12) - 1;
    const n = amortYears * 12;
    const stressPayment =
      mortgageAmount > 0 && stressMonthlyRate > 0
        ? (mortgageAmount * (stressMonthlyRate * Math.pow(1 + stressMonthlyRate, n))) /
          (Math.pow(1 + stressMonthlyRate, n) - 1)
        : 0;

    // Monthly payment at CONTRACT rate (for display line items)
    const contractEAR = Math.pow(1 + contractRate / 2, 2) - 1;
    const contractMonthlyRate = Math.pow(1 + contractEAR, 1 / 12) - 1;
    const contractPayment =
      mortgageAmount > 0 && contractMonthlyRate > 0
        ? (mortgageAmount * (contractMonthlyRate * Math.pow(1 + contractMonthlyRate, n))) /
          (Math.pow(1 + contractMonthlyRate, n) - 1)
        : 0;

    const propTaxMo = parseFloat(propertyTaxMonthly) || 0;
    const condoIncluded = condoFees * 0.5; // 50% for GDS/TDS calculation
    const homeExpensesForQualifying = propTaxMo + heat + condoIncluded;
    const homeExpensesDisplay = propTaxMo + heat + condoFees; // full condo for display

    // Use stress test payment for qualifying
    const housingCosts = stressPayment + homeExpensesForQualifying;
    const totalObligations = housingCosts + monthlyDebt;

    // Required income from GDS and TDS
    const reqGDS = gdsLimit > 0 ? (housingCosts / gdsLimit) * 12 : 0;
    const reqTDS = tdsLimit > 0 ? (totalObligations / tdsLimit) * 12 : 0;
    const requiredIncome = Math.max(reqGDS, reqTDS);

    const monthlyIncome = requiredIncome / 12;
    const gdsActual = monthlyIncome > 0 ? housingCosts / monthlyIncome : 0;
    const tdsActual = monthlyIncome > 0 ? totalObligations / monthlyIncome : 0;
    // Cash left based on contract payment (what you actually pay)
    const actualObligations = contractPayment + homeExpensesDisplay + monthlyDebt;
    const cashLeft = Math.max(0, monthlyIncome - actualObligations);

    return {
      requiredIncome,
      qualifyingRate,
      gdsLimit,
      tdsLimit,
      gdsActual,
      tdsActual,
      monthlyMortgage: contractPayment, // display at contract rate
      monthlyDebt,
      homeExpenses: homeExpensesDisplay, // full condo fees for display
      cashLeft,
      monthlyIncome,
    };
  }, [mortgageAmount, monthlyDebt, propertyTaxMonthly, condoFees, heat, rate, amortization, affordability]);

  const handleBookCall = () => {
    window.dispatchEvent(new CustomEvent("open-booking-modal"));
  };

  /* Bar chart proportions */
  const totalMonthly = results.monthlyMortgage + results.monthlyDebt + results.homeExpenses + results.cashLeft;
  const mortgagePct = totalMonthly > 0 ? (results.monthlyMortgage / totalMonthly) * 100 : 0;
  const debtPct = totalMonthly > 0 ? (results.monthlyDebt / totalMonthly) * 100 : 0;
  const expensesPct = totalMonthly > 0 ? (results.homeExpenses / totalMonthly) * 100 : 0;
  const cashPct = totalMonthly > 0 ? (results.cashLeft / totalMonthly) * 100 : 0;

  /* Affordability slider position */
  const affordPct = affordability;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-10 py-6 sm:py-10">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        {/* ── LEFT: Inputs ── */}
        <div className="md:w-[58%] flex flex-col gap-5">

          {/* Mortgage Amount */}
          <SliderInput
            label="Mortgage Amount"
            value={mortgageAmount}
            min={50000}
            max={2000000}
            step={50000}
            onChange={setMortgageAmount}
            info="The total mortgage you need, after your down payment. If you are not sure, take the purchase price and subtract what you have saved for a down payment."
          />

          {/* Monthly Debt Payments */}
          <SliderInput
            label="Monthly Debt Payments"
            value={monthlyDebt}
            min={0}
            max={5000}
            step={100}
            onChange={setMonthlyDebt}
            info="Include car loans, credit card minimums, student loans, and lines of credit. Do not include rent or the mortgage being calculated."
          />

          {/* ── Home Expenses ── */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p
                className="text-navy font-bold text-[0.9375rem]"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Home Expenses
              </p>
            </div>
            <p
              className="text-slate text-[0.75rem] mb-3"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              To calculate a more realistic required income, enter your expected monthly carrying costs.
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

            {/* Condo Fees + Heat */}
            <div className="flex flex-col gap-3">
              <SliderInput
                label="Condo Fees (Monthly)"
                value={condoFees}
                min={0}
                max={2000}
                step={100}
                onChange={setCondoFees}
                decimals={0}
                info="Lenders include 50% of your condo fees in the qualifying calculation. If you are not buying a condo, leave this at zero."
                note="50% included per CMHC rules"
              />
              <SliderInput
                label="Heat"
                value={heat}
                min={0}
                max={500}
                step={50}
                onChange={setHeat}
                decimals={0}
                info="Estimated monthly heating cost. Lenders include this in housing costs when calculating GDS. If you are unsure, $100 to $150 is typical for Ontario."
              />
            </div>
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
              <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-4 pb-3">
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
                <p className="text-navy font-bold text-[1.25rem] mb-3" style={{ fontFamily: "var(--font-spectral)" }}>
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
                <span className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Rate Term
                </span>
                <select
                  value={rateTerm}
                  onChange={(e) => setRateTerm(e.target.value)}
                  className="w-full bg-transparent text-navy font-bold text-[1.25rem] focus:outline-none cursor-pointer appearance-none"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  {["1 Year", "2 Year", "3 Year", "4 Year", "5 Year", "6 Year"].map((t) => (
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
              decimals={0}
            />
          </div>

          {/* ── Affordability Level ── */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p
                className="text-navy font-bold text-[0.9375rem]"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Affordability Level
              </p>
            </div>
            <p
              className="text-slate text-[0.75rem] mb-4"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              This slider adjusts how much of your income goes toward mortgage payments, home expenses, and debt. Baseline is conservative. Standard is what most lenders use.
            </p>
            <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-4 pb-3">
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  GDS: {affordability}% / TDS: {Math.round(affordability <= 35 ? (affordability > 0 ? affordability * (42 / 35) : 0) : affordability <= 39 ? 42 + ((affordability - 35) / 4) * 2 : 44 + ((affordability - 39) / 11) * 6)}%
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
                    value={affordability}
                    onChange={(e) => setAffordability(parseInt(e.target.value))}
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
          </div>
        </div>

        {/* ── RIGHT: Results Panel ── */}
        <div className="md:w-[42%]">
          <div className="md:sticky md:top-20 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">

            {/* Required Income */}
            <p
              className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide mb-1"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Required Income
            </p>
            <p
              className="text-[2.25rem] font-bold text-navy leading-tight mb-4"
              style={{ fontFamily: "var(--font-spectral)" }}
            >
              ${fmtWhole(results.requiredIncome)}
            </p>

            {/* Stress Test + GDS/TDS */}
            <div
              className="flex flex-col gap-2 text-[0.8125rem] mb-5"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              <div className="flex justify-between">
                <span className="text-slate">Stress Test Rate</span>
                <span className="text-navy font-semibold">{(results.qualifyingRate * 100).toFixed(2)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate">GDS / TDS</span>
                <span className="text-navy font-semibold">
                  {(results.gdsLimit * 100).toFixed(2)}% / {(results.tdsLimit * 100).toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Stacked Bar */}
            <div className="flex h-4 rounded-full overflow-hidden mb-4">
              {mortgagePct > 0 && (
                <div
                  className="bg-[#3B6B9A]"
                  style={{ width: `${mortgagePct}%` }}
                  title={`Monthly Mortgage: $${fmt(results.monthlyMortgage)}`}
                />
              )}
              {debtPct > 0 && (
                <div
                  className="bg-coral"
                  style={{ width: `${debtPct}%` }}
                  title={`Debt Payments: $${fmt(results.monthlyDebt)}`}
                />
              )}
              {expensesPct > 0 && (
                <div
                  className="bg-[#7B68AE]"
                  style={{ width: `${expensesPct}%` }}
                  title={`Home Expenses: $${fmt(results.homeExpenses)}`}
                />
              )}
            </div>

            {/* Line Items */}
            <div
              className="flex flex-col gap-3 text-[0.8125rem]"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3B6B9A] shrink-0" />
                  Monthly Mortgage
                </span>
                <span className="text-navy font-semibold tabular-nums">${fmt(results.monthlyMortgage)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate">
                  <span className="w-2.5 h-2.5 rounded-full bg-coral shrink-0" />
                  Debt Payments
                </span>
                <span className="text-navy font-semibold tabular-nums">${fmt(results.monthlyDebt)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7B68AE] shrink-0" />
                  Home Expenses
                </span>
                <span className="text-navy font-semibold tabular-nums">${fmt(results.homeExpenses)}</span>
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

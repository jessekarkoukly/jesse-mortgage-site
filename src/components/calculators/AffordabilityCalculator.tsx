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
        className="w-[14px] h-[14px] rounded-full bg-coral/20 text-coral/60 text-[0.5625rem] font-semibold flex items-center justify-center cursor-pointer hover:bg-coral/30 transition-colors shrink-0 leading-none"
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
function fmtDollars(n: number) {
  return Math.round(n).toLocaleString("en-CA");
}
function fmt2(n: number) {
  return n.toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* ── Canadian semi-annual compounding ── */
function monthlyRate(annualRate: number): number {
  const ear = Math.pow(1 + annualRate / 2, 2) - 1;
  return Math.pow(1 + ear, 1 / 12) - 1;
}

function calcMonthlyPayment(principal: number, annualRate: number, amortYears: number): number {
  if (principal <= 0 || annualRate <= 0 || amortYears <= 0) return 0;
  const r = monthlyRate(annualRate);
  const n = amortYears * 12;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

/* ══════════════════════════════════════════════
 *  Ontario + Federal Tax Calculation (2025 approx)
 * ══════════════════════════════════════════════ */

function calcFederalTax(taxableIncome: number): number {
  const BPA = 16129;
  const brackets = [
    { limit: 57375, rate: 0.15 },
    { limit: 114750, rate: 0.205 },
    { limit: 158468, rate: 0.26 },
    { limit: 225414, rate: 0.29 },
    { limit: Infinity, rate: 0.33 },
  ];
  let tax = 0, prev = 0;
  for (const b of brackets) {
    if (taxableIncome <= prev) break;
    tax += (Math.min(taxableIncome, b.limit) - prev) * b.rate;
    prev = b.limit;
  }
  return Math.max(0, tax - BPA * 0.15);
}

function calcOntarioTax(taxableIncome: number): number {
  const BPA = 11865;
  const brackets = [
    { limit: 52886, rate: 0.0505 },
    { limit: 105775, rate: 0.0915 },
    { limit: 150000, rate: 0.1116 },
    { limit: 220000, rate: 0.1216 },
    { limit: Infinity, rate: 0.1316 },
  ];
  let tax = 0, prev = 0;
  for (const b of brackets) {
    if (taxableIncome <= prev) break;
    tax += (Math.min(taxableIncome, b.limit) - prev) * b.rate;
    prev = b.limit;
  }
  tax = Math.max(0, tax - BPA * 0.0505);
  const surtaxBase = tax;
  let surtax = 0;
  if (surtaxBase > 4991) surtax += (surtaxBase - 4991) * 0.20;
  if (surtaxBase > 6387) surtax += (surtaxBase - 6387) * 0.36;
  return tax + surtax;
}

function calcCPP(income: number): number {
  const pensionable = Math.min(income, 71300) - 3500;
  if (pensionable <= 0) return 0;
  const cpp1 = pensionable * 0.0595;
  const cpp2Earnings = Math.min(income, 81200) - 71300;
  const cpp2 = cpp2Earnings > 0 ? cpp2Earnings * 0.04 : 0;
  return cpp1 + cpp2;
}

function calcEI(income: number): number {
  return Math.min(income, 65700) * 0.0164;
}

function calcAnnualDeductions(grossIncome: number): number {
  return calcFederalTax(grossIncome) + calcOntarioTax(grossIncome) + calcCPP(grossIncome) + calcEI(grossIncome);
}

function calcMonthlyTakeHome(grossAnnual: number, isSplit: boolean, income1: number, income2: number): number {
  if (isSplit) {
    return (income1 - calcAnnualDeductions(income1) + income2 - calcAnnualDeductions(income2)) / 12;
  }
  return (grossAnnual - calcAnnualDeductions(grossAnnual)) / 12;
}

/* ══════════════════════════════════════════════
 *  CMHC / Down Payment / Max Home Price
 * ══════════════════════════════════════════════ */

function cmhcPremiumRate(ltv: number): number {
  if (ltv <= 0.80) return 0;
  if (ltv <= 0.85) return 0.028;
  if (ltv <= 0.90) return 0.031;
  if (ltv <= 0.95) return 0.04;
  return 0;
}

function minDownPayment(homePrice: number): number {
  if (homePrice <= 0) return 0;
  if (homePrice > 1500000) return homePrice * 0.20;
  if (homePrice <= 500000) return homePrice * 0.05;
  return 25000 + (homePrice - 500000) * 0.10;
}

function maxHomePriceFromDP(dp: number): number {
  if (dp <= 0) return 0;
  const maxAt5pct = dp / 0.05;
  if (maxAt5pct <= 500000) return maxAt5pct;
  const maxTiered = (dp - 25000) / 0.10 + 500000;
  if (dp >= 25000 && maxTiered <= 1500000) return maxTiered;
  if (dp >= 300000) return dp / 0.20;
  if (maxTiered > 1500000) return maxTiered;
  return maxAt5pct;
}

/* ── Stress test rate ── */
const BENCHMARK_RATE = 0.0525;

function stressTestRate(contractRate: number): number {
  return Math.max(contractRate + 0.02, BENCHMARK_RATE);
}

/* ── Estimate property tax (0.95% of home price / 12) ── */
function estimateMonthlyPropertyTax(homePrice: number): number {
  return (homePrice * 0.0095) / 12;
}

/* ── Default monthly heat ── */
const DEFAULT_MONTHLY_HEAT = 100;

/* ── Solve for max home price ── */
function solveMaxMortgageAndHomePrice(
  grossAnnualIncome: number,
  downPayment: number,
  contractRate: number,
  monthlyDebts: number,
  monthlyHeat: number,
  amortYears: number,
  propTaxOverride?: number | null
): {
  maxMortgageFromIncome: number;
  maxHomePrice: number;
  maxMortgage: number;
  insuredMortgage: number;
  insurancePremium: number;
  monthlyPayment: number;
  qualifyingRate: number;
  estimatedPropTax: number;
  estimatedHeat: number;
  gds: number;
  tds: number;
  ltv: number;
  bindingConstraint: "gds" | "tds" | "downpayment";
  dpNeededForFullQualification: number;
} {
  const GDS_LIMIT = 0.39;
  const TDS_LIMIT = 0.45;
  const monthlyIncome = grossAnnualIncome / 12;

  const qualifyingRate = stressTestRate(contractRate); // B-20: always required
  const r = monthlyRate(qualifyingRate);
  const n = amortYears * 12;

  // Step 1: Solve for max mortgage from income alone.
  // Property tax depends on home price, so we iterate to converge.
  // Start with an estimated home price, solve mortgage, recalculate.
  let maxMortgage = 0;

  // Initial estimate: assume home price ≈ mortgage / 0.8 (rough)
  let estimatedHomePrice = (monthlyIncome * GDS_LIMIT * 150); // rough starting point

  for (let iter = 0; iter < 5; iter++) {
    const propTax = propTaxOverride !== null && propTaxOverride !== undefined
      ? propTaxOverride
      : estimateMonthlyPropertyTax(estimatedHomePrice);
    const heat = monthlyHeat;

    // Max P&I from GDS
    const maxHousingGDS = monthlyIncome * GDS_LIMIT;
    const maxPI_gds = maxHousingGDS - propTax - heat;

    // Max P&I from TDS
    const maxHousingTDS = monthlyIncome * TDS_LIMIT - monthlyDebts;
    const maxPI_tds = maxHousingTDS - propTax - heat;

    const maxPI = Math.min(maxPI_gds, maxPI_tds);
    if (maxPI <= 0) { maxMortgage = 0; break; }

    // Solve for mortgage from max P&I (no CMHC in qualification step)
    maxMortgage = maxPI * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));

    // Update estimated home price for next iteration
    estimatedHomePrice = maxMortgage + downPayment;
  }

  maxMortgage = Math.floor(maxMortgage);

  // Step 2: Add down payment to get home price
  const maxHP_income = maxMortgage + downPayment;

  // Step 3: Check if DP limits the home price
  const maxHP_dp = Math.floor(maxHomePriceFromDP(downPayment));
  const maxHP = Math.min(maxHP_income, maxHP_dp);

  // If DP-limited, recalculate mortgage
  const finalMortgage = Math.max(0, maxHP - downPayment);

  // Determine binding constraint
  let bindingConstraint: "gds" | "tds" | "downpayment" = "gds";
  if (maxHP_dp < maxHP_income) {
    bindingConstraint = "downpayment";
  } else {
    const propTax = propTaxOverride !== null && propTaxOverride !== undefined
      ? propTaxOverride
      : estimateMonthlyPropertyTax(maxHP);
    const heat = monthlyHeat;
    // Check if TDS is the binding constraint
    const testPayment = calcMonthlyPayment(finalMortgage, qualifyingRate, amortYears);
    const housingCosts = testPayment + propTax + heat;
    const tdsVal = monthlyIncome > 0 ? (housingCosts + monthlyDebts) / monthlyIncome : 0;
    if (monthlyDebts > 0 && tdsVal >= TDS_LIMIT - 0.001) {
      bindingConstraint = "tds";
    }
  }

  // Step 4: Apply CMHC based on final LTV
  const finalLTV = maxHP > 0 ? finalMortgage / maxHP : 0;
  const finalPremiumRate = (finalLTV > 0.80 && maxHP < 1500000) ? cmhcPremiumRate(finalLTV) : 0;
  const finalInsuredMortgage = finalMortgage * (1 + finalPremiumRate);
  const finalInsurancePremium = finalMortgage * finalPremiumRate;

  // Actual monthly payment at contract rate (what you'd actually pay)
  const actualPayment = calcMonthlyPayment(finalInsuredMortgage, contractRate, amortYears);

  const estPropTax = propTaxOverride !== null && propTaxOverride !== undefined
    ? propTaxOverride
    : estimateMonthlyPropertyTax(maxHP);
  const estHeat = monthlyHeat;

  // GDS/TDS use qualifying rate on the base mortgage (no CMHC in qualification)
  const qualifyingPayment = calcMonthlyPayment(finalMortgage, qualifyingRate, amortYears);
  const qualifyingHousing = qualifyingPayment + estPropTax + estHeat;
  const gds = monthlyIncome > 0 ? qualifyingHousing / monthlyIncome : 0;
  const tds = monthlyIncome > 0 ? (qualifyingHousing + monthlyDebts) / monthlyIncome : 0;

  // Calculate DP needed to use full income qualification
  // Use income-based mortgage to find the home price, then calculate min DP for that price
  // For homes > $1.5M, need 20%, so home = mortgage / 0.80
  // For homes <= $1.5M, tiered rules apply - iterate to find stable point
  let dpNeeded = 0;
  if (maxMortgage > 0) {
    // Try conventional (20% down): home = mortgage / 0.80
    const conventionalHome = maxMortgage / 0.80;
    const conventionalDP = minDownPayment(conventionalHome);
    // Verify: mortgage + conventionalDP should ≈ conventionalHome
    dpNeeded = conventionalDP;
  }

  return {
    maxMortgageFromIncome: maxMortgage,
    maxHomePrice: maxHP,
    maxMortgage: finalMortgage,
    insuredMortgage: finalInsuredMortgage,
    insurancePremium: finalInsurancePremium,
    monthlyPayment: actualPayment,
    qualifyingRate,
    estimatedPropTax: estPropTax,
    estimatedHeat: estHeat,
    gds,
    tds,
    ltv: finalLTV,
    bindingConstraint,
    dpNeededForFullQualification: dpNeeded,
  };
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
    setDraft(prefix === "$" ? String(value) : String(value));
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
    <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-3 pb-2 flex flex-col justify-between">
      {(label || helperText) && (
        <div className="flex items-center gap-1.5 mb-1">
          <span
            className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            {label}
          </span>
          {helperText && <InfoBubble text={helperText} />}
        </div>
      )}
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

export default function AffordabilityCalculator() {
  const [isSplit, setIsSplit] = useState(false);
  const [grossIncome, setGrossIncome] = useState(100000);
  const [income1, setIncome1] = useState(70000);
  const [income2, setIncome2] = useState(30000);
  const [downPayment, setDownPayment] = useState(50000);
  const [rate, setRate] = useState(3.25);
  const [monthlyDebts, setMonthlyDebts] = useState(0);
  const stressTest = true; // B-20 stress test is always required
  const [propTaxOverride, setPropTaxOverride] = useState<number | null>(null);
  const amortYears = 25; // Standard amortization

  const effectiveGross = isSplit ? income1 + income2 : grossIncome;

  const handleToggle = (split: boolean) => {
    if (split && !isSplit) {
      setIncome1(Math.round(grossIncome * 0.5));
      setIncome2(Math.round(grossIncome * 0.5));
    } else if (!split && isSplit) {
      setGrossIncome(income1 + income2);
    }
    setIsSplit(split);
  };

  const results = useMemo(
    () => solveMaxMortgageAndHomePrice(effectiveGross, downPayment, rate / 100, monthlyDebts, DEFAULT_MONTHLY_HEAT, amortYears, propTaxOverride),
    [effectiveGross, downPayment, rate, monthlyDebts, amortYears, propTaxOverride]
  );

  // Auto-calculated property tax based on result, unless user has overridden
  const autoPropTax = estimateMonthlyPropertyTax(results.maxHomePrice);
  const displayPropTax = propTaxOverride !== null ? propTaxOverride : autoPropTax;


  const monthlyTakeHome = useMemo(
    () => calcMonthlyTakeHome(effectiveGross, isSplit, income1, income2),
    [effectiveGross, isSplit, income1, income2]
  );

  const totalMonthlyHousing = results.monthlyPayment + displayPropTax + results.estimatedHeat;
  const cashLeftOver = monthlyTakeHome - totalMonthlyHousing - monthlyDebts;

  const handleBookCall = () => {
    window.dispatchEvent(new CustomEvent("open-booking-modal"));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-10 py-6 sm:py-10">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        {/* ── LEFT: Inputs ── */}
        <div className="md:w-[55%] flex flex-col gap-4">

          {/* Income toggle */}
          <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-3 pb-3">
            <div className="flex items-center gap-1.5 mb-3">
              <span
                className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Gross Annual Income
              </span>
              <InfoBubble
                text={
                  isSplit
                    ? "Entering each income separately calculates tax brackets individually, giving you a significantly more accurate after-tax estimate for Money Left Over."
                    : "Your total household income before taxes. Switch to two incomes for a more accurate after-tax calculation."
                }
              />
            </div>

            <div className="flex mb-3">
              <button
                onClick={() => handleToggle(false)}
                className={`flex-1 py-2 text-[0.8125rem] font-semibold rounded-l-lg border transition-all cursor-pointer ${
                  !isSplit
                    ? "bg-navy text-white border-navy"
                    : "bg-white text-navy border-[#E5E7EB] hover:border-navy/30"
                }`}
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Combined
              </button>
              <button
                onClick={() => handleToggle(true)}
                className={`flex-1 py-2 text-[0.8125rem] font-semibold rounded-r-lg border border-l-0 transition-all cursor-pointer ${
                  isSplit
                    ? "bg-navy text-white border-navy"
                    : "bg-white text-navy border-[#E5E7EB] hover:border-navy/30"
                }`}
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Two Incomes
              </button>
            </div>

            {isSplit ? (
              <div className="grid grid-cols-2 gap-3">
                <SliderInput label="Person 1" value={income1} min={0} max={500000} step={5000} onChange={setIncome1} />
                <SliderInput label="Person 2" value={income2} min={0} max={500000} step={5000} onChange={setIncome2} />
              </div>
            ) : (
              <SliderInput label="" value={grossIncome} min={30000} max={1000000} step={5000} onChange={setGrossIncome} />
            )}

            {isSplit && (
              <p className="text-[0.75rem] text-slate mt-2 text-center" style={{ fontFamily: "var(--font-jakarta)" }}>
                Combined: ${fmtDollars(income1 + income2)}/yr
              </p>
            )}
          </div>

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
            helperText="The mortgage interest rate you expect to receive. If stress test is on, qualification uses the higher of this rate + 2% or 5.25%."
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

          {/* Property Tax + Heat */}
          <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <span
                className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Property Tax + Heat
              </span>
              <InfoBubble text="Lenders include property tax and heat in your GDS calculation. Property tax is estimated at 0.95% of home price per year. Enter your own if you know it. Heat is fixed at the lender standard of $100/month." />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {/* Property Tax field */}
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <p
                    className="text-[0.625rem] font-medium uppercase tracking-wide"
                    style={{
                      fontFamily: "var(--font-jakarta)",
                      color: propTaxOverride !== null ? "#1E2D3D" : "#8A9BAA",
                    }}
                  >
                    {propTaxOverride !== null ? "Property Tax" : "Property Tax (est.)"}
                  </p>
                  {propTaxOverride !== null && (
                    <button
                      onClick={() => setPropTaxOverride(null)}
                      className="shrink-0 w-3.5 h-3.5 text-slate hover:text-coral transition-colors cursor-pointer"
                      title="Reset to auto-estimate"
                    >
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 1v5h5" />
                        <path d="M3.51 10a5.5 5.5 0 1 0 1.12-5.95L1 7.5" />
                      </svg>
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-1 bg-white border border-[#E5E7EB] rounded-lg px-2.5 py-1.5">
                  <span className="text-slate text-[0.8125rem]">$</span>
                  <input
                    type="number"
                    value={propTaxOverride !== null ? propTaxOverride : Math.round(autoPropTax)}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      if (!isNaN(val)) setPropTaxOverride(val);
                      else setPropTaxOverride(0);
                    }}
                    onFocus={() => {
                      if (propTaxOverride === null) setPropTaxOverride(Math.round(autoPropTax));
                    }}
                    className={`w-full bg-transparent text-[0.9375rem] font-bold focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                      propTaxOverride !== null ? "text-navy" : "text-slate"
                    }`}
                    style={{ fontFamily: "var(--font-spectral)" }}
                  />
                  <span className="text-slate text-[0.6875rem] shrink-0">/mo</span>
                </div>
              </div>
              {/* Heat (static) */}
              <div>
                <p
                  className="text-[0.625rem] font-medium uppercase tracking-wide mb-1 text-slate"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Heat
                </p>
                <div className="flex items-center gap-1 bg-[#F5F5F5] border border-[#E5E7EB] rounded-lg px-2.5 py-1.5">
                  <span className="text-slate text-[0.8125rem]">$</span>
                  <span
                    className="text-[0.9375rem] font-bold text-slate"
                    style={{ fontFamily: "var(--font-spectral)" }}
                  >
                    {DEFAULT_MONTHLY_HEAT}
                  </span>
                  <span className="text-slate text-[0.6875rem] shrink-0 ml-auto">/mo</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── RIGHT: Results Panel ── */}
        <div className="md:w-[45%]">
          <div className="md:sticky md:top-20 bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-6 shadow-sm">
            {/* Max home price */}
            <div className="mb-5">
              <p
                className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide mb-1"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                You may be able to afford a home up to
              </p>
              <p
                className="text-[2rem] sm:text-[2.5rem] font-bold text-coral leading-tight"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                ${fmtDollars(results.maxHomePrice)}
              </p>
            </div>

            {/* Constraint note - right under the headline */}
            {results.bindingConstraint === "downpayment" && (
              <div
                className="bg-navy rounded-xl px-4 py-4 mb-5"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                <p className="text-coral font-semibold text-[0.8125rem] mb-2">Your down payment is the limiting factor</p>
                <p className="text-white/80 text-[0.8125rem] leading-relaxed mb-3">
                  Your income supports a <span className="font-bold text-white">${fmtDollars(results.maxMortgageFromIncome)}</span> mortgage. With more saved, you could access a higher home price.
                </p>
                <button
                  onClick={() => setDownPayment(Math.ceil(results.dpNeededForFullQualification / 1000) * 1000)}
                  className="w-full bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2.5 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="text-sand/70 text-[0.75rem]">Adjust down payment to</span>
                  <span className="text-white font-bold text-[0.9375rem]" style={{ fontFamily: "var(--font-spectral)" }}>${fmtDollars(Math.ceil(results.dpNeededForFullQualification / 1000) * 1000)}</span>
                </button>
              </div>
            )}

            {/* Mortgage + DP breakdown */}
            <div className="bg-sand rounded-lg px-3 py-2.5 mb-5 text-[0.8125rem]" style={{ fontFamily: "var(--font-jakarta)" }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate">Mortgage you qualify for</span>
                <span className="text-navy font-bold">${fmtDollars(results.maxMortgageFromIncome)}</span>
              </div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-slate">Your down payment</span>
                <span className="text-navy font-bold">+ ${fmtDollars(downPayment)}</span>
              </div>
              <div className="flex items-center justify-between pt-1.5 border-t border-navy/10">
                <span className="text-navy font-semibold">Max home price</span>
                <span className="text-coral font-bold">${fmtDollars(results.maxHomePrice)}</span>
              </div>
            </div>

            {/* Key figures */}
            <div className="space-y-2.5 text-[0.8125rem] mb-5 pb-5 border-b border-sand-2" style={{ fontFamily: "var(--font-jakarta)" }}>
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
                  <InfoBubble text={`Your estimated monthly mortgage payment (principal and interest) at your ${rate.toFixed(2)}% contract rate, over ${amortYears} years. Qualification uses the stress test rate of ${(results.qualifyingRate * 100).toFixed(2)}%, but your actual payment is at your contract rate.`} />
                </span>
                <span className="text-navy font-semibold">${fmt2(results.monthlyPayment)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate flex items-center gap-1.5">
                  {propTaxOverride !== null ? "Property Tax" : "Est. Property Tax"}
                  <InfoBubble text={propTaxOverride !== null ? "Your manually entered monthly property tax." : "Estimated at 0.95% of home price per year. Your actual property tax depends on the municipality and assessed value."} />
                </span>
                <span className={`font-semibold ${propTaxOverride !== null ? "text-navy" : "text-slate"}`}>${fmtDollars(displayPropTax)}/mo</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate flex items-center gap-1.5">
                  Heat
                  <InfoBubble text="Industry-standard estimate of $100/month used by lenders." />
                </span>
                <span className="font-semibold text-slate">${fmtDollars(results.estimatedHeat)}/mo</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate flex items-center gap-1.5">
                  LTV
                  <InfoBubble text="Loan-to-value ratio. The percentage of the home price covered by the mortgage. Below 80% means no mortgage insurance is required." />
                </span>
                <span className="text-navy font-semibold">{(results.ltv * 100).toFixed(0)}%</span>
              </div>
            </div>

            {/* GDS / TDS side by side */}
            <div className="flex gap-3 mb-5">
              <div className="flex-1 bg-[#FAFAFA] rounded-lg px-3 py-2 flex items-center justify-between">
                <span className="text-slate text-[0.6875rem] font-semibold tracking-wide flex items-center gap-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                  GDS
                  <InfoBubble text="Gross debt service ratio. Includes mortgage payment, property tax, and heat as a percentage of gross income. This calculator uses a 39% maximum." />
                </span>
                <span className={`font-bold text-[0.9375rem] ${results.gds > 0.39 ? "text-coral" : "text-navy"}`} style={{ fontFamily: "var(--font-spectral)" }}>
                  {(results.gds * 100).toFixed(1)}%
                  <span className="text-slate font-normal text-[0.625rem]"> / 39%</span>
                </span>
              </div>
              <div className="flex-1 bg-[#FAFAFA] rounded-lg px-3 py-2 flex items-center justify-between">
                <span className="text-slate text-[0.6875rem] font-semibold tracking-wide flex items-center gap-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                  TDS
                  <InfoBubble text="Total debt service ratio. Includes mortgage payment, property tax, heat, plus all other monthly debts as a percentage of gross income. This calculator uses a 45% maximum." />
                </span>
                <span className={`font-bold text-[0.9375rem] ${results.tds > 0.45 ? "text-coral" : "text-navy"}`} style={{ fontFamily: "var(--font-spectral)" }}>
                  {(results.tds * 100).toFixed(1)}%
                  <span className="text-slate font-normal text-[0.625rem]"> / 45%</span>
                </span>
              </div>
            </div>

            {/* Money left over (after-tax) */}
            <div className="bg-[#FAFAFA] rounded-lg p-3 mb-5" style={{ fontFamily: "var(--font-jakarta)" }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate text-[0.8125rem] flex items-center gap-1.5">
                  Money Left Over
                  <InfoBubble
                    text={
                      isSplit
                        ? "Your estimated monthly take-home pay after Ontario and federal income tax, CPP, and EI for each person individually, minus your mortgage payment, property tax, heat, and debts."
                        : "Your estimated monthly take-home pay after Ontario and federal income tax, CPP, and EI, minus your mortgage payment, property tax, heat, and debts. Switch to Two Incomes for a more accurate calculation."
                    }
                  />
                </span>
                <span className={`font-bold text-[1.125rem] ${cashLeftOver < 0 ? "text-coral" : "text-navy"}`} style={{ fontFamily: "var(--font-spectral)" }}>
                  ${fmtDollars(cashLeftOver)}/mo
                </span>
              </div>
              <p className="text-[0.6875rem] text-slate leading-snug">
                After-tax income minus housing costs and debts
                {isSplit && (
                  <span className="text-coral font-semibold"> (tax calculated per person)</span>
                )}
              </p>
            </div>

            {/* (constraint note moved above breakdown) */}

            {/* Settings summary */}
            <div className="bg-[#FAFAFA] rounded-lg px-3 py-2 mb-5 text-[0.6875rem] text-slate leading-relaxed" style={{ fontFamily: "var(--font-jakarta)" }}>
              <span className="font-semibold text-navy">Settings: </span>
              Stress test {(results.qualifyingRate * 100).toFixed(2)}%
              {" · "}
              {propTaxOverride !== null ? "Custom property tax" : "Estimated housing costs"}
              {" · "}
              25-year amortization
            </div>

            {/* Disclaimer */}
            <p
              className="text-[0.6875rem] text-slate leading-relaxed mb-5"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              This is an estimate for illustration purposes only. Tax calculations are approximate and based on 2025 Ontario and federal rates. Property tax and heat are estimates. Actual mortgage approval depends on your full application, credit history, and lender criteria. This is not a mortgage commitment or guarantee.
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

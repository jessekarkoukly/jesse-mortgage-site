"use client";

import { useState, useMemo } from "react";

/* ── Formatting ── */
function fmt(n: number) {
  return n.toLocaleString("en-CA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/* ── Canadian Semi-Annual Compounding Math ── */
function calcMonthlyPayment(
  principal: number,
  annualRate: number,
  amortYears: number
) {
  if (principal <= 0 || annualRate <= 0 || amortYears <= 0) return 0;
  const EAR = Math.pow(1 + annualRate / 2, 2) - 1;
  const r = Math.pow(1 + EAR, 1 / 12) - 1;
  const n = amortYears * 12;
  return (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
}

function calcBalanceAfterN(
  principal: number,
  annualRate: number,
  amortYears: number,
  monthsElapsed: number
) {
  if (principal <= 0 || annualRate <= 0 || amortYears <= 0) return 0;
  const EAR = Math.pow(1 + annualRate / 2, 2) - 1;
  const r = Math.pow(1 + EAR, 1 / 12) - 1;
  const n = amortYears * 12;
  const payment =
    (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
  return (
    principal * Math.pow(1 + r, monthsElapsed) -
    (payment * (Math.pow(1 + r, monthsElapsed) - 1)) / r
  );
}

function calcInterestPaidOverN(
  principal: number,
  annualRate: number,
  amortYears: number,
  months: number
) {
  const payment = calcMonthlyPayment(principal, annualRate, amortYears);
  const endBalance = calcBalanceAfterN(
    principal,
    annualRate,
    amortYears,
    months
  );
  return payment * months - (principal - endBalance);
}

/* ── Types ── */
interface ScenarioState {
  label: string;
  amount: number;
  rate: number;
  rateType: "fixed" | "variable";
  rateTerm: string;
  amortization: number;
  lender: string;
}

const RATE_TERMS = [
  "1 Year",
  "2 Year",
  "3 Year",
  "4 Year",
  "5 Year",
  "6 Year",
];

function termToMonths(term: string): number {
  const y = parseInt(term);
  return isNaN(y) ? 60 : y * 12;
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
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
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
        {prefix}
        {prefix === "$" ? fmt(value) : value}
        {suffix}
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

/* ── Scenario Column ── */
function ScenarioColumn({
  scenario,
  onChange,
  headerClass,
  headerTextClass,
  id,
}: {
  scenario: ScenarioState;
  onChange: (patch: Partial<ScenarioState>) => void;
  headerClass: string;
  headerTextClass: string;
  id: "A" | "B";
}) {
  const ratePct = ((scenario.rate - 1) / 11) * 100;

  return (
    <div className="flex-1 min-w-0">
      {/* Header */}
      <div className={`${headerClass} rounded-t-xl px-4 py-3`}>
        <input
          type="text"
          value={scenario.label}
          onChange={(e) => onChange({ label: e.target.value })}
          className={`bg-transparent ${headerTextClass} font-bold text-[1rem] focus:outline-none w-full`}
          style={{ fontFamily: "var(--font-spectral)" }}
        />
      </div>

      <div className="border border-t-0 border-[#E5E7EB] rounded-b-xl p-4 flex flex-col gap-4">
        {/* Mortgage Amount */}
        <SliderInput
          label="Mortgage Amount"
          value={scenario.amount}
          min={50000}
          max={3000000}
          step={50000}
          onChange={(v) => onChange({ amount: v })}
        />

        {/* Rate */}
        <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-3 pb-2 flex flex-col justify-between">
          <span
            className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide mb-1"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Rate
          </span>
          <p
            className="text-navy font-bold text-[1.25rem] mb-2"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            {scenario.rate.toFixed(2)}%
          </p>
          <input
            type="range"
            min={1}
            max={12}
            step={0.1}
            value={scenario.rate}
            onChange={(e) => onChange({ rate: parseFloat(e.target.value) })}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-navy [&::-webkit-slider-thumb]:shadow-md"
            style={{
              background: `linear-gradient(to right, #1E2D3D 0%, #E8705A ${ratePct}%, #E5E7EB ${ratePct}%, #E5E7EB 100%)`,
            }}
          />
        </div>

        {/* Rate Term */}
        <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-3 flex flex-col justify-between">
          <span
            className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide mb-1"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Rate Term
          </span>
          <select
            value={scenario.rateTerm}
            onChange={(e) => onChange({ rateTerm: e.target.value })}
            className="w-full bg-transparent text-navy font-bold text-[1.25rem] focus:outline-none cursor-pointer"
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            {RATE_TERMS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Amortization */}
        <SliderInput
          label="Amortization"
          value={scenario.amortization}
          min={5}
          max={30}
          step={1}
          onChange={(v) => onChange({ amortization: v })}
          prefix=""
          suffix={` year${scenario.amortization !== 1 ? "s" : ""}`}
        />

        {/* Lender Name */}
        <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-3 flex flex-col justify-between">
          <span
            className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide mb-1"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Lender Name (optional)
          </span>
          <input
            type="text"
            value={scenario.lender}
            onChange={(e) => onChange({ lender: e.target.value })}
            placeholder="e.g. RBC, TD, Credit Union"
            className="w-full bg-transparent text-navy font-bold text-[1rem] focus:outline-none placeholder:text-slate/40 placeholder:font-normal"
            style={{ fontFamily: "var(--font-jakarta)" }}
          />
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════ */
/*  Main Component                                  */
/* ════════════════════════════════════════════════ */

export default function CompareSideBySide() {
  const [syncAmounts, setSyncAmounts] = useState(true);

  const [scenarioA, setScenarioA] = useState<ScenarioState>({
    label: "Fixed Rate",
    amount: 640000,
    rate: 5.25,
    rateType: "fixed",
    rateTerm: "5 Year",
    amortization: 25,
    lender: "",
  });

  const [scenarioB, setScenarioB] = useState<ScenarioState>({
    label: "Variable Rate",
    amount: 640000,
    rate: 4.9,
    rateType: "variable",
    rateTerm: "5 Year",
    amortization: 25,
    lender: "",
  });

  const handleChangeA = (patch: Partial<ScenarioState>) => {
    setScenarioA((prev) => {
      const next = { ...prev, ...patch };
      if (syncAmounts && patch.amount !== undefined) {
        setScenarioB((b) => ({ ...b, amount: patch.amount! }));
      }
      return next;
    });
  };

  const handleChangeB = (patch: Partial<ScenarioState>) => {
    setScenarioB((prev) => {
      const next = { ...prev, ...patch };
      if (syncAmounts && patch.amount !== undefined) {
        setScenarioA((a) => ({ ...a, amount: patch.amount! }));
      }
      return next;
    });
  };

  /* ── Computed Results ── */
  const results = useMemo(() => {
    const rA = scenarioA.rate / 100;
    const rB = scenarioB.rate / 100;

    const monthlyA = calcMonthlyPayment(
      scenarioA.amount,
      rA,
      scenarioA.amortization
    );
    const monthlyB = calcMonthlyPayment(
      scenarioB.amount,
      rB,
      scenarioB.amortization
    );

    const termMonthsA = termToMonths(scenarioA.rateTerm);
    const termMonthsB = termToMonths(scenarioB.rateTerm);

    // 5-year comparison uses each scenario's own term
    const interestA5 = calcInterestPaidOverN(
      scenarioA.amount,
      rA,
      scenarioA.amortization,
      termMonthsA
    );
    const interestB5 = calcInterestPaidOverN(
      scenarioB.amount,
      rB,
      scenarioB.amortization,
      termMonthsB
    );

    const balanceA5 = calcBalanceAfterN(
      scenarioA.amount,
      rA,
      scenarioA.amortization,
      termMonthsA
    );
    const balanceB5 = calcBalanceAfterN(
      scenarioB.amount,
      rB,
      scenarioB.amortization,
      termMonthsB
    );

    const totalCostA5 = monthlyA * termMonthsA;
    const totalCostB5 = monthlyB * termMonthsB;

    // Full amortization
    const totalMonthsA = scenarioA.amortization * 12;
    const totalMonthsB = scenarioB.amortization * 12;

    const totalInterestA = calcInterestPaidOverN(
      scenarioA.amount,
      rA,
      scenarioA.amortization,
      totalMonthsA
    );
    const totalInterestB = calcInterestPaidOverN(
      scenarioB.amount,
      rB,
      scenarioB.amortization,
      totalMonthsB
    );

    const totalCostFullA = monthlyA * totalMonthsA;
    const totalCostFullB = monthlyB * totalMonthsB;

    // Delta
    const monthlyDelta = Math.abs(monthlyA - monthlyB);
    const fiveYearDelta = Math.abs(totalCostA5 - totalCostB5);
    const cheaperMonthly = monthlyA <= monthlyB ? "A" : "B";

    // 5-year winner (lower total cost over term)
    const fiveYearWinner = totalCostA5 <= totalCostB5 ? "A" : "B";
    const fiveYearSavings = Math.abs(totalCostA5 - totalCostB5);

    return {
      monthlyA,
      monthlyB,
      interestA5,
      interestB5,
      balanceA5,
      balanceB5,
      totalCostA5,
      totalCostB5,
      totalInterestA,
      totalInterestB,
      totalCostFullA,
      totalCostFullB,
      monthlyDelta,
      fiveYearDelta,
      cheaperMonthly,
      fiveYearWinner,
      fiveYearSavings,
      termMonthsA,
      termMonthsB,
    };
  }, [scenarioA, scenarioB]);

  const labelA = scenarioA.label || "Scenario A";
  const labelB = scenarioB.label || "Scenario B";
  const winnerLabel = results.fiveYearWinner === "A" ? labelA : labelB;
  const loserLabel = results.fiveYearWinner === "A" ? labelB : labelA;

  const handleBookCall = () => {
    window.dispatchEvent(new CustomEvent("open-booking-modal"));
  };

  const hasVariableRate = true; // Right column is always variable rate

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-10 py-6 sm:py-10">
      {/* ── Sync Toggle ── */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setSyncAmounts(!syncAmounts)}
          className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${
            syncAmounts ? "bg-coral" : "bg-sand-2"
          }`}
          aria-label="Sync mortgage amounts"
        >
          <span
            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
              syncAmounts ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
        <span
          className="text-[0.8125rem] text-navy font-semibold"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Sync mortgage amounts
        </span>
      </div>

      {/* ── Scenario Columns ── */}
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <ScenarioColumn
          scenario={scenarioA}
          onChange={handleChangeA}
          headerClass="bg-navy"
          headerTextClass="text-white"
          id="A"
        />
        <ScenarioColumn
          scenario={scenarioB}
          onChange={handleChangeB}
          headerClass="bg-sand-2"
          headerTextClass="text-navy"
          id="B"
        />
      </div>

      {/* ════════════════════════════════════════════ */}
      {/*  Results                                     */}
      {/* ════════════════════════════════════════════ */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-8 shadow-sm">
        <h2
          className="text-[1.5rem] font-bold text-navy mb-6"
          style={{ fontFamily: "var(--font-spectral)" }}
        >
          Comparison Results
        </h2>

        {/* ── 1. Head-to-Head Table ── */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-[0.875rem]" style={{ fontFamily: "var(--font-jakarta)" }}>
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                <th className="text-left py-3 pr-4 text-slate font-semibold text-[0.75rem] uppercase tracking-wide">
                  Metric
                </th>
                <th className="text-right py-3 px-4 text-navy font-bold">
                  {labelA}
                </th>
                <th className="text-right py-3 pl-4 text-navy font-bold">
                  {labelB}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#FAFAFA]">
                <td className="py-3 pr-4 text-slate">Mortgage Amount</td>
                <td className="py-3 px-4 text-right text-navy font-semibold tabular-nums">
                  ${fmt(scenarioA.amount)}
                </td>
                <td className="py-3 pl-4 text-right text-navy font-semibold tabular-nums">
                  ${fmt(scenarioB.amount)}
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-slate">Rate</td>
                <td className="py-3 px-4 text-right text-navy font-semibold tabular-nums">
                  {scenarioA.rate.toFixed(2)}%
                </td>
                <td className="py-3 pl-4 text-right text-navy font-semibold tabular-nums">
                  {scenarioB.rate.toFixed(2)}%
                </td>
              </tr>
              <tr className="bg-[#FAFAFA]">
                <td className="py-3 pr-4 text-slate">Amortization</td>
                <td className="py-3 px-4 text-right text-navy font-semibold tabular-nums">
                  {scenarioA.amortization} years
                </td>
                <td className="py-3 pl-4 text-right text-navy font-semibold tabular-nums">
                  {scenarioB.amortization} years
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-slate">Monthly Payment</td>
                <td className="py-3 px-4 text-right text-navy font-bold tabular-nums">
                  ${fmt(results.monthlyA)}
                </td>
                <td className="py-3 pl-4 text-right text-navy font-bold tabular-nums">
                  ${fmt(results.monthlyB)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── 2. Monthly Payment Delta ── */}
        <div className="bg-sand rounded-xl p-5 mb-8">
          <p
            className="text-navy text-[1rem] font-semibold"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            ${fmt(results.monthlyDelta)}/month difference
          </p>
          <p
            className="text-slate text-[0.875rem] mt-1"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Over{" "}
            {results.fiveYearWinner === "A"
              ? results.termMonthsA / 12
              : results.termMonthsB / 12}{" "}
            years, that adds up to ${fmt(results.fiveYearSavings)} in savings
            with{" "}
            {results.cheaperMonthly === "A" ? labelA : labelB}.
          </p>
        </div>

        {/* ── 3. Term Comparison Table ── */}
        <h3
          className="text-[1.125rem] font-bold text-navy mb-4"
          style={{ fontFamily: "var(--font-spectral)" }}
        >
          Over the Rate Term
        </h3>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-[0.875rem]" style={{ fontFamily: "var(--font-jakarta)" }}>
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                <th className="text-left py-3 pr-4 text-slate font-semibold text-[0.75rem] uppercase tracking-wide">
                  Metric
                </th>
                <th className="text-right py-3 px-4 text-navy font-bold">
                  {labelA} ({scenarioA.rateTerm})
                </th>
                <th className="text-right py-3 pl-4 text-navy font-bold">
                  {labelB} ({scenarioB.rateTerm})
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#FAFAFA]">
                <td className="py-3 pr-4 text-slate">Interest Paid</td>
                <td
                  className={`py-3 px-4 text-right tabular-nums ${
                    results.interestA5 <= results.interestB5
                      ? "font-bold text-navy border-l-4 border-navy"
                      : "text-navy font-semibold"
                  }`}
                >
                  ${fmt(results.interestA5)}
                </td>
                <td
                  className={`py-3 pl-4 text-right tabular-nums ${
                    results.interestB5 <= results.interestA5
                      ? "font-bold text-navy border-l-4 border-navy"
                      : "text-navy font-semibold"
                  }`}
                >
                  ${fmt(results.interestB5)}
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-slate">Balance Remaining</td>
                <td
                  className={`py-3 px-4 text-right tabular-nums ${
                    results.balanceA5 <= results.balanceB5
                      ? "font-bold text-navy border-l-4 border-navy"
                      : "text-navy font-semibold"
                  }`}
                >
                  ${fmt(results.balanceA5)}
                </td>
                <td
                  className={`py-3 pl-4 text-right tabular-nums ${
                    results.balanceB5 <= results.balanceA5
                      ? "font-bold text-navy border-l-4 border-navy"
                      : "text-navy font-semibold"
                  }`}
                >
                  ${fmt(results.balanceB5)}
                </td>
              </tr>
              <tr className="bg-[#FAFAFA]">
                <td className="py-3 pr-4 text-slate">Total Cost</td>
                <td
                  className={`py-3 px-4 text-right tabular-nums ${
                    results.totalCostA5 <= results.totalCostB5
                      ? "font-bold text-navy border-l-4 border-navy"
                      : "text-navy font-semibold"
                  }`}
                >
                  ${fmt(results.totalCostA5)}
                </td>
                <td
                  className={`py-3 pl-4 text-right tabular-nums ${
                    results.totalCostB5 <= results.totalCostA5
                      ? "font-bold text-navy border-l-4 border-navy"
                      : "text-navy font-semibold"
                  }`}
                >
                  ${fmt(results.totalCostB5)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── 4. Winner Callout ── */}
        <div className="bg-sand rounded-xl border-l-4 border-navy p-5 mb-8">
          <p
            className="text-navy text-[1rem] font-bold"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Over the rate term, {winnerLabel} costs ${fmt(results.fiveYearSavings)}{" "}
            less than {loserLabel}.
          </p>
        </div>

        {/* ── 5. Full Amortization Table ── */}
        <h3
          className="text-[1.125rem] font-bold text-navy mb-4"
          style={{ fontFamily: "var(--font-spectral)" }}
        >
          Full Amortization
        </h3>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-[0.875rem]" style={{ fontFamily: "var(--font-jakarta)" }}>
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                <th className="text-left py-3 pr-4 text-slate font-semibold text-[0.75rem] uppercase tracking-wide">
                  Metric
                </th>
                <th className="text-right py-3 px-4 text-navy font-bold">
                  {labelA} ({scenarioA.amortization}yr)
                </th>
                <th className="text-right py-3 pl-4 text-navy font-bold">
                  {labelB} ({scenarioB.amortization}yr)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#FAFAFA]">
                <td className="py-3 pr-4 text-slate">Total Interest</td>
                <td
                  className={`py-3 px-4 text-right tabular-nums ${
                    results.totalInterestA <= results.totalInterestB
                      ? "font-bold text-navy border-l-4 border-navy"
                      : "text-navy font-semibold"
                  }`}
                >
                  ${fmt(results.totalInterestA)}
                </td>
                <td
                  className={`py-3 pl-4 text-right tabular-nums ${
                    results.totalInterestB <= results.totalInterestA
                      ? "font-bold text-navy border-l-4 border-navy"
                      : "text-navy font-semibold"
                  }`}
                >
                  ${fmt(results.totalInterestB)}
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-slate">Total Cost</td>
                <td
                  className={`py-3 px-4 text-right tabular-nums ${
                    results.totalCostFullA <= results.totalCostFullB
                      ? "font-bold text-navy border-l-4 border-navy"
                      : "text-navy font-semibold"
                  }`}
                >
                  ${fmt(results.totalCostFullA)}
                </td>
                <td
                  className={`py-3 pl-4 text-right tabular-nums ${
                    results.totalCostFullB <= results.totalCostFullA
                      ? "font-bold text-navy border-l-4 border-navy"
                      : "text-navy font-semibold"
                  }`}
                >
                  ${fmt(results.totalCostFullB)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── 6. Variable Rate Disclaimer ── */}
        {hasVariableRate && (
          <p
            className="text-slate text-[0.75rem] mb-8"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Variable rates change with the lender&apos;s prime rate. The figures
            above assume the variable rate stays constant for the full
            amortization. Actual costs will differ as rates move over time.
          </p>
        )}

        {/* ── 7. CTA ── */}
        <div className="border-t border-[#E5E7EB] pt-6 text-center">
          <p
            className="text-slate text-[0.9375rem] mb-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Not sure which option is right for you?
          </p>
          <button
            onClick={handleBookCall}
            className="bg-navy text-white font-semibold py-3 px-8 rounded-lg hover:bg-navy-2 transition-colors cursor-pointer text-[0.875rem]"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Book a Call
          </button>
          <p
            className="text-slate text-[0.75rem] mt-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Want Jesse to run your exact numbers? It takes one call.
          </p>
        </div>
      </div>
    </div>
  );
}

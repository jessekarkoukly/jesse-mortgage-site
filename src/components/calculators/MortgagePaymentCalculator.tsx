"use client";

import { useState, useMemo } from "react";

/* ── Helpers ── */
function fmt2(n: number) {
  return n.toLocaleString("en-CA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const RATE_TERMS = [
  "1 Year",
  "2 Year",
  "3 Year",
  "4 Year",
  "5 Year",
  "6 Year",
];

const FREQUENCIES = [
  { label: "Monthly", key: "monthly" },
  { label: "Semi-Monthly", key: "semi-monthly" },
  { label: "Bi-Weekly", key: "biweekly" },
  { label: "Accelerated Bi-Weekly", key: "acc-biweekly" },
  { label: "Weekly", key: "weekly" },
  { label: "Accelerated Weekly", key: "acc-weekly" },
] as const;

type FrequencyKey = (typeof FREQUENCIES)[number]["key"];
type TabKey = "payment" | "term" | "total";

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
  tooltip,
  displayValue,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  tooltip?: string;
  displayValue?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-3 pb-2 flex flex-col justify-between h-full">
      <div className="flex items-start justify-between mb-1">
        <span
          className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          {label}
        </span>
        {tooltip && (
          <span
            className="text-slate text-[0.75rem] cursor-help"
            title={tooltip}
          >
            &#9432;
          </span>
        )}
      </div>
      <p
        className="text-navy font-bold text-[1.25rem] mb-2"
        style={{ fontFamily: "var(--font-spectral)" }}
      >
        {displayValue ??
          `${prefix}${prefix === "$" ? fmt2(value) : value}${suffix}`}
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

/* ── Math ── */
function calcMonthlyPayment(
  principal: number,
  annualRate: number,
  amortYears: number
) {
  if (principal <= 0 || annualRate <= 0 || amortYears <= 0) return 0;
  const ear = Math.pow(1 + annualRate / 2, 2) - 1;
  const periodicRate = Math.pow(1 + ear, 1 / 12) - 1;
  const n = amortYears * 12;
  return (
    (principal * (periodicRate * Math.pow(1 + periodicRate, n))) /
    (Math.pow(1 + periodicRate, n) - 1)
  );
}

function calcBalanceAfterTerm(
  principal: number,
  annualRate: number,
  amortYears: number,
  termYears: number
) {
  if (principal <= 0 || annualRate <= 0 || amortYears <= 0) return 0;
  const ear = Math.pow(1 + annualRate / 2, 2) - 1;
  const periodicRate = Math.pow(1 + ear, 1 / 12) - 1;
  const n = amortYears * 12;
  const payment =
    (principal * (periodicRate * Math.pow(1 + periodicRate, n))) /
    (Math.pow(1 + periodicRate, n) - 1);
  const m = termYears * 12;
  const balance =
    principal * Math.pow(1 + periodicRate, m) -
    payment * ((Math.pow(1 + periodicRate, m) - 1) / periodicRate);
  return Math.max(0, balance);
}

function frequencyPayment(monthlyPayment: number, key: FrequencyKey) {
  switch (key) {
    case "monthly":
      return monthlyPayment;
    case "semi-monthly":
      return monthlyPayment / 2;
    case "biweekly":
      return (monthlyPayment * 12) / 26;
    case "acc-biweekly":
      return monthlyPayment / 2;
    case "weekly":
      return (monthlyPayment * 12) / 52;
    case "acc-weekly":
      return monthlyPayment / 4;
  }
}

function frequencyLabel(key: FrequencyKey) {
  return FREQUENCIES.find((f) => f.key === key)?.label ?? "Monthly";
}

/* ════════════════════════════════════════════ */

export default function MortgagePaymentCalculator() {
  /* ── State ── */
  const [mortgageAmount, setMortgageAmount] = useState(500000);
  const [rate, setRate] = useState(5.25);
  const [rateType, setRateType] = useState<"fixed" | "variable">("fixed");
  const [rateTerm, setRateTerm] = useState("5 Year");
  const [amortization, setAmortization] = useState(25);
  const [frequency, setFrequency] = useState<FrequencyKey>("monthly");
  const [activeTab, setActiveTab] = useState<TabKey>("payment");

  /* ── Calculations ── */
  const results = useMemo(() => {
    const annualRate = rate / 100;
    const monthlyPmt = calcMonthlyPayment(
      mortgageAmount,
      annualRate,
      amortization
    );
    const termYears = parseInt(rateTerm);

    const ear = Math.pow(1 + annualRate / 2, 2) - 1;
    const periodicRate = Math.pow(1 + ear, 1 / 12) - 1;

    // Month 1 split
    const firstMonthInterest = mortgageAmount * periodicRate;
    const firstMonthPrincipal = monthlyPmt - firstMonthInterest;

    // Frequency-adjusted payment
    const freqPayment = frequencyPayment(monthlyPmt, frequency);

    // Balance after term
    const balanceAfterTerm = calcBalanceAfterTerm(
      mortgageAmount,
      annualRate,
      amortization,
      termYears
    );

    // Term totals
    const termMonths = termYears * 12;
    const totalPaymentsTerm = monthlyPmt * termMonths;
    const principalPaidTerm = mortgageAmount - balanceAfterTerm;
    const interestPaidTerm = totalPaymentsTerm - principalPaidTerm;

    // Effective amortization remaining after term
    const effectiveAmortRemaining = amortization - termYears;

    // Total over full amortization
    const totalMonths = amortization * 12;
    const totalPaymentsFull = monthlyPmt * totalMonths;
    const totalInterestFull = totalPaymentsFull - mortgageAmount;

    return {
      monthlyPmt,
      freqPayment,
      firstMonthInterest,
      firstMonthPrincipal,
      balanceAfterTerm,
      totalPaymentsTerm,
      principalPaidTerm,
      interestPaidTerm,
      effectiveAmortRemaining,
      totalPaymentsFull,
      totalInterestFull,
      termYears,
    };
  }, [mortgageAmount, rate, rateTerm, amortization, frequency]);

  const handleBookCall = () => {
    window.dispatchEvent(new CustomEvent("open-booking-modal"));
  };

  // Bar percentages for month 1 split
  const totalMonth1 =
    results.firstMonthPrincipal + results.firstMonthInterest;
  const principalPct =
    totalMonth1 > 0 ? (results.firstMonthPrincipal / totalMonth1) * 100 : 50;

  const tabs: { key: TabKey; label: string }[] = [
    { key: "payment", label: "Payment" },
    { key: "term", label: "Term" },
    { key: "total", label: "Total" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-10 py-6 sm:py-10">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* ── LEFT: Inputs ── */}
        <div className="md:w-[60%] flex flex-col gap-5">
          {/* Mortgage Amount */}
          <SliderInput
            label="Mortgage Amount"
            value={mortgageAmount}
            min={50000}
            max={3000000}
            step={50000}
            onChange={setMortgageAmount}
          />

          {/* Rate */}
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
              <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-3 pb-2 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    Rate
                  </span>
                  <div className="flex gap-1 ml-auto">
                    {(["fixed", "variable"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setRateType(t)}
                        className={`text-[0.5625rem] font-semibold px-2 py-0.5 rounded capitalize cursor-pointer transition-colors ${
                          rateType === t
                            ? "bg-navy text-white"
                            : "bg-white text-slate"
                        }`}
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <p
                  className="text-navy font-bold text-[1.25rem] mb-2"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
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
                <span
                  className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide mb-1"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Rate Term
                </span>
                <select
                  value={rateTerm}
                  onChange={(e) => setRateTerm(e.target.value)}
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
            </div>
          </div>

          {/* Amortization */}
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
              The total time to pay off your mortgage. New mortgages in Canada
              typically start at 25 or 30 years.
            </p>
            <SliderInput
              label="Amortization"
              value={amortization}
              min={5}
              max={30}
              step={1}
              onChange={setAmortization}
              prefix=""
              displayValue={`${amortization} year${amortization !== 1 ? "s" : ""}`}
            />
          </div>

          {/* Payment Frequency */}
          <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-3 flex flex-col justify-between">
            <span
              className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide mb-1"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Payment Frequency
            </span>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as FrequencyKey)}
              className="w-full bg-transparent text-navy font-bold text-[1.25rem] focus:outline-none cursor-pointer"
              style={{ fontFamily: "var(--font-spectral)" }}
            >
              {FREQUENCIES.map((f) => (
                <option key={f.key} value={f.key}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ── RIGHT: Results Panel ── */}
        <div className="md:w-[40%]">
          <div className="md:sticky md:top-6 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
            {/* Header */}
            <p
              className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide mb-1"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Mortgage Payment
            </p>
            <p
              className="text-[2rem] font-bold text-navy leading-tight"
              style={{ fontFamily: "var(--font-spectral)" }}
            >
              ${Math.round(results.freqPayment).toLocaleString("en-CA")}
            </p>
            <p
              className="text-slate text-[0.8125rem] mb-5"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              {frequencyLabel(frequency)}
            </p>

            {/* Tabs */}
            <div className="flex gap-1 mb-5">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 text-[0.75rem] font-semibold py-2 rounded-lg cursor-pointer transition-colors ${
                    activeTab === tab.key
                      ? "bg-navy text-white"
                      : "bg-sand text-navy"
                  }`}
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "payment" && (
              <div>
                {/* Stacked bar */}
                <div className="flex h-3 rounded-full overflow-hidden mb-4">
                  <div
                    className="bg-navy transition-all duration-300"
                    style={{ width: `${principalPct}%` }}
                  />
                  <div
                    className="bg-coral transition-all duration-300"
                    style={{ width: `${100 - principalPct}%` }}
                  />
                </div>
                <div
                  className="flex gap-4 text-[0.625rem] text-slate mb-5"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-navy" />
                    Principal
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-coral" />
                    Interest
                  </span>
                </div>

                <div
                  className="flex flex-col gap-3 text-[0.875rem]"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  <div className="flex justify-between">
                    <span className="text-slate">Principal Paid (Month 1)</span>
                    <span className="text-navy font-semibold">
                      ${fmt2(results.firstMonthPrincipal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate">Interest Paid (Month 1)</span>
                    <span className="text-navy font-semibold">
                      ${fmt2(results.firstMonthInterest)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-sand-2">
                    <span className="text-navy font-bold">Total Payment</span>
                    <span className="text-navy font-bold">
                      ${fmt2(results.monthlyPmt)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate">Balance End of Term</span>
                    <span className="text-navy font-semibold">
                      ${fmt2(results.balanceAfterTerm)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate">
                      Effective Amortization Remaining
                    </span>
                    <span className="text-navy font-semibold">
                      {results.effectiveAmortRemaining} year
                      {results.effectiveAmortRemaining !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "term" && (
              <div>
                <p
                  className="text-navy font-bold text-[0.9375rem] mb-4"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  Over your {results.termYears}-year term:
                </p>
                <div
                  className="flex flex-col gap-3 text-[0.875rem]"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  <div className="flex justify-between">
                    <span className="text-slate">Total Payments</span>
                    <span className="text-navy font-semibold">
                      ${fmt2(results.totalPaymentsTerm)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate">Principal Paid</span>
                    <span className="text-navy font-semibold">
                      ${fmt2(results.principalPaidTerm)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate">Interest Paid</span>
                    <span className="text-navy font-semibold">
                      ${fmt2(results.interestPaidTerm)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-sand-2">
                    <span className="text-navy font-bold">
                      Balance Remaining
                    </span>
                    <span className="text-navy font-bold">
                      ${fmt2(results.balanceAfterTerm)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "total" && (
              <div>
                <p
                  className="text-navy font-bold text-[0.9375rem] mb-4"
                  style={{ fontFamily: "var(--font-spectral)" }}
                >
                  Over {amortization} years:
                </p>
                <div
                  className="flex flex-col gap-3 text-[0.875rem]"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  <div className="flex justify-between">
                    <span className="text-slate">Total Payments</span>
                    <span className="text-navy font-semibold">
                      ${fmt2(results.totalPaymentsFull)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate">Total Interest</span>
                    <span className="text-navy font-semibold">
                      ${fmt2(results.totalInterestFull)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-sand-2">
                    <span className="text-navy font-bold">Total Principal</span>
                    <span className="text-navy font-bold">
                      ${fmt2(mortgageAmount)}
                    </span>
                  </div>
                </div>
                <p
                  className="text-slate text-[0.6875rem] mt-4 leading-relaxed"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Total interest assumes rate stays constant for the full
                  amortization. In practice, you renew every {results.termYears}{" "}
                  years at the rate available at that time.
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="mt-6 pt-5 border-t border-sand-2">
              <p
                className="text-slate text-[0.8125rem] mb-3 text-center"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Want to know what rate you would actually get?
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

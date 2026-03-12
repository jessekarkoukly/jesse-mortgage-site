'use client';

import { useState, useMemo, useCallback } from 'react';
import * as calc from '@/lib/mortgageFormulas';
import ResultsPanel, { ResultItem, ResultsTab } from './ResultsPanel';

// ─── Constants ───

const FREQUENCIES = [
  'Monthly', 'Bi-Weekly', 'Acc. Bi-Weekly', 'Weekly', 'Acc. Weekly', 'Semi-Monthly',
];

const RATE_TERMS = [1, 2, 3, 4, 5, 6];

const PAYMENT_INCREASE_OPTIONS = [0, 5, 10, 15, 20, 100];

const MORTGAGE_STEPS: number[] = [];
for (let v = 0; v <= 3000000; v += 25000) MORTGAGE_STEPS.push(v);

function findNearestStepIndex(value: number, steps: number[]): number {
  let best = 0;
  let bestDiff = Math.abs(steps[0] - value);
  for (let i = 1; i < steps.length; i++) {
    const diff = Math.abs(steps[i] - value);
    if (diff < bestDiff) {
      best = i;
      bestDiff = diff;
    }
  }
  return best;
}

// ─── Formatting Helpers ───

function fmtDollar(v: number): string {
  return '$' + Math.round(v).toLocaleString('en-CA');
}

function fmtPct(v: number): string {
  return v.toFixed(2) + '%';
}

function parseDollar(s: string): number {
  return parseFloat(s.replace(/[$,\s]/g, '')) || 0;
}

// ─── Gradient Slider Helper ───

function sliderGradientStyle(value: number, min: number, max: number): React.CSSProperties {
  const pct = max === min ? 0 : ((value - min) / (max - min)) * 100;
  return {
    background: `linear-gradient(to right, #1E2D3D 0%, #E8705A ${pct}%, #E0DDD8 ${pct}%)`,
  };
}

// ─── Input Box ───

function InputBox({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format = 'dollar',
  steps,
  className = '',
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  format?: 'dollar' | 'percent' | 'year';
  steps?: number[];
  className?: string;
}) {
  const [inputVal, setInputVal] = useState('');
  const [focused, setFocused] = useState(false);

  const displayVal =
    format === 'dollar'
      ? fmtDollar(value)
      : format === 'percent'
        ? fmtPct(value)
        : `${value} yr${value !== 1 ? 's' : ''}`;

  const sliderMin = steps ? 0 : min;
  const sliderMax = steps ? steps.length - 1 : max;
  const sliderStep = steps ? 1 : step || 1;
  const sliderVal = steps ? findNearestStepIndex(value, steps) : value;

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = Number(e.target.value);
    onChange(steps ? steps[raw] : raw);
  };

  const handleInputFocus = () => {
    setFocused(true);
    if (format === 'dollar') setInputVal(String(Math.round(value)));
    else if (format === 'percent') setInputVal(value.toFixed(2));
    else setInputVal(String(value));
  };

  const handleInputBlur = () => {
    setFocused(false);
    const parsed = format === 'dollar' ? parseDollar(inputVal) : parseFloat(inputVal) || 0;
    const clamped = Math.max(min, Math.min(max, parsed));
    onChange(steps ? steps[findNearestStepIndex(clamped, steps)] : clamped);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
  };

  return (
    <div className={className}>
      <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 pb-3 h-full flex flex-col">
        <label
          className="block text-[0.6875rem] font-medium text-slate uppercase tracking-wide mb-1"
          style={{ fontFamily: 'var(--font-jakarta)' }}
        >
          {label}
        </label>
        <input
          type="text"
          value={focused ? inputVal : displayVal}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full text-[1rem] sm:text-[1.125rem] font-bold text-navy bg-transparent border-none outline-none p-0 mb-auto"
          style={{ fontFamily: 'var(--font-jakarta)' }}
        />
        <input
          type="range"
          min={sliderMin}
          max={sliderMax}
          step={sliderStep}
          value={sliderVal}
          onChange={handleSlider}
          className="calc-slider w-full mt-3"
          style={sliderGradientStyle(sliderVal, sliderMin, sliderMax)}
        />
      </div>
    </div>
  );
}

function SelectBox({
  label,
  value,
  onChange,
  options,
  className = '',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
  className?: string;
}) {
  return (
    <div className={`sm:w-[160px] md:w-[180px] shrink-0 ${className}`}>
      <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 h-full flex flex-col">
        <label
          className="block text-[0.6875rem] font-medium text-slate uppercase tracking-wide mb-1"
          style={{ fontFamily: 'var(--font-jakarta)' }}
        >
          {label}
        </label>
        <div className="flex items-center mt-auto">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full text-[0.875rem] font-semibold text-navy bg-transparent border-none outline-none p-0 cursor-pointer appearance-none"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-1 text-slate shrink-0 pointer-events-none">
            <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function RateInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [focused, setFocused] = useState(false);
  const [inputVal, setInputVal] = useState('');
  return (
    <input
      type="text"
      value={focused ? inputVal : fmtPct(value)}
      onFocus={() => { setFocused(true); setInputVal(value.toFixed(2)); }}
      onBlur={() => { setFocused(false); onChange(Math.max(0.8, Math.min(10, parseFloat(inputVal) || 0))); }}
      onChange={(e) => setInputVal(e.target.value)}
      onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
      className="text-[1.125rem] font-bold text-navy bg-transparent border-none outline-none p-0 w-full"
      style={{ fontFamily: 'var(--font-jakarta)' }}
    />
  );
}

// ─── Main Component ───

export default function MortgageCalculator() {
  const [mortgageAmount, setMortgageAmount] = useState(500000);
  const [frequency, setFrequency] = useState('Monthly');
  const [rate, setRate] = useState(4.0);
  const [rateType, setRateType] = useState<'Fixed' | 'Variable'>('Fixed');
  const [rateTerm, setRateTerm] = useState(5);
  const [amortization, setAmortization] = useState(25);

  const [payFasterEnabled, setPayFasterEnabled] = useState(false);
  const [paymentIncreasePct, setPaymentIncreasePct] = useState(0);
  const [oneTimePrepayment, setOneTimePrepayment] = useState(0);
  const [annualPrepayment, setAnnualPrepayment] = useState(0);

  const [loanType, setLoanType] = useState<'Regular' | 'Interest-Only'>('Regular');

  // ─── Derived ───

  const interestOnly = loanType === 'Interest-Only';

  const termResults = useMemo(
    () => calc.calculateTermResults(mortgageAmount, rate / 100, amortization, frequency, rateTerm, interestOnly),
    [mortgageAmount, rate, amortization, frequency, rateTerm, interestOnly]
  );

  const ppy = calc.getPaymentsPerYear(frequency);
  const monthlyPaymentEquiv = (termResults.payment * ppy) / 12;

  const handleAmortChange = useCallback((v: number) => {
    setAmortization(Math.min(v, 30));
  }, []);

  const paymentIncreaseDollar = termResults.payment * (paymentIncreasePct / 100);

  // ─── Result Items ───

  // Payment breakdown bar proportions
  const principalPct = termResults.totalPaidOverTerm > 0
    ? (termResults.principalOverTerm / termResults.totalPaidOverTerm) * 100
    : 50;

  const paymentTabItems: ResultItem[] = useMemo(() => [
    { label: 'Principal Paid', value: fmtDollar(termResults.principalOverTerm) },
    { label: 'Interest Paid', value: fmtDollar(termResults.interestOverTerm) },
    { label: 'Total payment', value: fmtDollar(termResults.totalPaidOverTerm), separator: true },
    { label: 'Balance end of Term', value: fmtDollar(termResults.balanceEndOfTerm), separator: true },
    {
      label: 'Effective Amortization',
      value: termResults.effectiveAmortYears === Infinity ? 'N/A' : `${termResults.effectiveAmortYears} Years`,
    },
  ], [termResults]);

  const termTabItems: ResultItem[] = useMemo(() => [
    { label: 'Payment per period', value: fmtDollar(termResults.payment) },
    { label: 'Payment frequency', value: frequency },
    { label: 'Monthly equivalent', value: fmtDollar(monthlyPaymentEquiv) },
    { label: 'Total paid over term', value: fmtDollar(termResults.totalPaidOverTerm), separator: true },
    { label: 'Interest over term', value: fmtDollar(termResults.interestOverTerm) },
    { label: 'Principal over term', value: fmtDollar(termResults.principalOverTerm) },
  ], [termResults, frequency, monthlyPaymentEquiv]);

  const totalAmort = useMemo(
    () => calc.calculateTotalAmortization(mortgageAmount, rate / 100, amortization, frequency, interestOnly),
    [mortgageAmount, rate, amortization, frequency, interestOnly]
  );

  const totalTabItems: ResultItem[] = useMemo(() => [
    { label: 'Total interest paid', value: totalAmort.totalInterest === Infinity ? 'N/A' : fmtDollar(totalAmort.totalInterest) },
    { label: 'Total amount paid', value: totalAmort.totalPaid === Infinity ? 'N/A' : fmtDollar(totalAmort.totalPaid) },
    { label: 'Mortgage amount', value: fmtDollar(mortgageAmount), separator: true },
  ], [totalAmort, mortgageAmount]);

  const resultTabs: ResultsTab[] = useMemo(() => [
    { label: 'Payment', summaryValue: fmtDollar(termResults.payment), items: paymentTabItems },
    { label: 'Term', summaryValue: `${rateTerm} Year`, items: termTabItems },
    { label: 'Total', summaryValue: totalAmort.totalPaid === Infinity ? 'N/A' : fmtDollar(totalAmort.totalPaid), items: totalTabItems },
  ], [termResults.payment, rateTerm, totalAmort.totalPaid, paymentTabItems, termTabItems, totalTabItems]);

  // Top-level items: payment breakdown bar
  const topItems: ResultItem[] = useMemo(() => [
    { label: 'Principal Paid', value: fmtDollar(termResults.principalOverTerm) },
    { label: 'Interest Paid', value: fmtDollar(termResults.interestOverTerm) },
  ], [termResults]);

  // ─── Settings Slot ───

  const settingsContent = (
    <div className="space-y-4">
      <div>
        <p className="text-[0.6875rem] font-semibold text-slate mb-2 uppercase tracking-wide" style={{ fontFamily: 'var(--font-jakarta)' }}>Loan Type</p>
        <div className="flex rounded-lg overflow-hidden border border-gray-200">
          {(['Regular', 'Interest-Only'] as const).map((t) => (
            <button key={t} onClick={() => setLoanType(t)}
              className={`flex-1 py-2 text-[0.75rem] font-semibold transition-colors cursor-pointer ${loanType === t ? 'bg-navy text-white' : 'bg-white text-navy hover:bg-sand'}`}
              style={{ fontFamily: 'var(--font-jakarta)' }}>{t}</button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[0.6875rem] font-semibold text-slate mb-1 uppercase tracking-wide" style={{ fontFamily: 'var(--font-jakarta)' }}>Compounding</p>
        <span className="text-[0.8125rem] text-navy font-semibold" style={{ fontFamily: 'var(--font-jakarta)' }}>Semi-Annual</span>
      </div>
    </div>
  );

  // ─── Render ───

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-10 py-6 sm:py-10">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8">
        {/* LEFT COLUMN */}
        <div className="md:col-span-3 space-y-4">

          {/* Row 1: Mortgage Amount + Payment Frequency */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
            <InputBox
              label="Mortgage Amount"
              value={mortgageAmount}
              onChange={setMortgageAmount}
              min={0} max={3000000}
              steps={MORTGAGE_STEPS}
              format="dollar"
            />
            <SelectBox
              label="Payment Frequency"
              value={frequency}
              onChange={setFrequency}
              options={FREQUENCIES.map((f) => ({ label: f, value: f }))}
            />
          </div>

          {/* Row 2: Rate section */}
          <div>
            <h3
              className="text-[0.9375rem] font-bold text-navy mb-1"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              Rate
            </h3>
            <p className="text-[0.75rem] text-slate mb-3" style={{ fontFamily: 'var(--font-jakarta)' }}>
              Fixed stays the same for the term. Variable moves with prime.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
              <div className="bg-white border border-gray-200 rounded-xl p-4 pb-3 h-full flex flex-col">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[0.6875rem] font-medium text-slate uppercase tracking-wide" style={{ fontFamily: 'var(--font-jakarta)' }}>Rate</label>
                  <div className="flex rounded-md overflow-hidden border border-gray-200">
                    {(['Fixed', 'Variable'] as const).map((t) => (
                      <button key={t} onClick={() => setRateType(t)}
                        className={`px-2.5 py-1 text-[0.625rem] font-semibold transition-colors cursor-pointer ${rateType === t ? 'bg-navy text-white' : 'bg-white text-navy hover:bg-sand'}`}
                        style={{ fontFamily: 'var(--font-jakarta)' }}>{t}</button>
                    ))}
                  </div>
                </div>
                <RateInput value={rate} onChange={setRate} />
                <input
                  type="range" min={8} max={100} step={1}
                  value={Math.round(rate * 10)}
                  onChange={(e) => setRate(Number(e.target.value) / 10)}
                  className="calc-slider w-full mt-3"
                  style={sliderGradientStyle(Math.round(rate * 10), 8, 100)}
                />
              </div>
              <SelectBox
                label="Rate Term"
                value={String(rateTerm)}
                onChange={(v) => setRateTerm(Number(v))}
                options={RATE_TERMS.map((t) => ({ label: `${t} Year`, value: String(t) }))}
              />
            </div>
          </div>

          {/* Row 3: Amortization */}
          <div>
            <h3
              className="text-[0.9375rem] font-bold text-navy mb-1"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              Amortization
            </h3>
            <p className="text-[0.75rem] text-slate mb-3" style={{ fontFamily: 'var(--font-jakarta)' }}>
              The total time to pay off your mortgage in full. New mortgages in Canada typically start at 25 or 30 years.
            </p>
            <InputBox
              label="Amortization"
              value={amortization}
              onChange={handleAmortChange}
              min={1} max={30} step={1}
              format="year"
            />
          </div>

          {/* Pay Your Mortgage Faster */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-[0.8125rem] font-bold text-navy" style={{ fontFamily: 'var(--font-jakarta)' }}>
                Pay your mortgage faster
              </span>
              <button
                onClick={() => setPayFasterEnabled(!payFasterEnabled)}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${payFasterEnabled ? 'bg-coral' : 'bg-slate/30'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${payFasterEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            {payFasterEnabled && (
              <div className="mt-4 space-y-4 border-t border-dashed border-gray-200 pt-4">
                <div>
                  <label className="block text-[0.6875rem] font-medium text-slate uppercase tracking-wide mb-2" style={{ fontFamily: 'var(--font-jakarta)' }}>
                    Payment Increase
                  </label>
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex">
                    <div className="flex-1 p-3">
                      <span className="text-[0.9375rem] font-semibold text-navy tabular-nums" style={{ fontFamily: 'var(--font-jakarta)' }}>{fmtDollar(paymentIncreaseDollar)}</span>
                    </div>
                    <div className="border-l border-gray-200 flex items-center px-4 shrink-0">
                      <select value={paymentIncreasePct} onChange={(e) => setPaymentIncreasePct(Number(e.target.value))}
                        className="text-[0.875rem] font-semibold text-navy bg-transparent border-none outline-none p-0 cursor-pointer appearance-none"
                        style={{ fontFamily: 'var(--font-jakarta)' }}>
                        {PAYMENT_INCREASE_OPTIONS.map((p) => (<option key={p} value={p}>{p}%</option>))}
                      </select>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-1 text-slate shrink-0">
                        <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <InputBox label="One-time Pre-Payment" value={oneTimePrepayment} onChange={setOneTimePrepayment} min={0} max={100000} step={1000} format="dollar" />
                  <InputBox label="Annual Pre-Payment" value={annualPrepayment} onChange={setAnnualPrepayment} min={0} max={100000} step={1000} format="dollar" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="md:col-span-2">
          <ResultsPanel
            primaryLabel="Mortgage Payment"
            primaryValue={`${fmtDollar(termResults.payment)} ${frequency === 'Monthly' ? 'Monthly' : '/ ' + frequency}`}
            items={topItems}
            tabs={resultTabs}
            onDownloadReport={() => {}}
            settingsSlot={settingsContent}
          />
        </div>
      </div>
    </div>
  );
}

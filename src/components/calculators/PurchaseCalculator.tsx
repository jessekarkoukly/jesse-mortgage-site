'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import * as calc from '@/lib/mortgageFormulas';
import ResultsPanel, { ResultItem, ResultsTab } from './ResultsPanel';

// ─── Constants ───

const LOCATIONS = [
  'Toronto ON', 'Mississauga ON', 'Brampton ON', 'Markham ON',
  'Vaughan ON', 'Richmond Hill ON', 'Oakville ON', 'Burlington ON',
  'Hamilton ON', 'Whitby ON', 'Oshawa ON', 'Ajax ON',
  'Pickering ON', 'Barrie ON', 'Kingston ON', 'London ON',
  'Ottawa ON', 'Other ON',
];

const FREQUENCIES = [
  'Monthly', 'Bi-Weekly', 'Acc. Bi-Weekly', 'Weekly', 'Acc. Weekly', 'Semi-Monthly',
];

const RATE_TERMS = [1, 2, 3, 4, 5, 6];

const DP_PRESETS = ['Min', '10%', '15%', '19%', '20%', '25%', '30%', '35%', '50%', '100%'];

const PAYMENT_INCREASE_OPTIONS = [0, 5, 10, 15, 20, 100];

// Build custom home price steps
const HOME_PRICE_STEPS: number[] = [];
for (let v = 0; v <= 3000000; v += 50000) HOME_PRICE_STEPS.push(v);

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
// Returns inline style for the track gradient: filled portion navy->coral, unfilled light gray
function sliderGradientStyle(value: number, min: number, max: number): React.CSSProperties {
  const pct = max === min ? 0 : ((value - min) / (max - min)) * 100;
  return {
    background: `linear-gradient(to right, #1E2D3D 0%, #E8705A ${pct}%, #E0DDD8 ${pct}%)`,
  };
}

// ─── Input Box Components ───

function InputBox({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format = 'dollar',
  note,
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
  note?: string;
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
      {note && (
        <p
          className="text-[0.6875rem] text-coral mt-2 mb-2 px-1 relative z-10"
          style={{ fontFamily: 'var(--font-jakarta)' }}
        >
          {note}
        </p>
      )}
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

function DualInputBox({
  label,
  monthlyValue,
  onMonthlyChange,
  className = '',
}: {
  label: string;
  monthlyValue: number;
  onMonthlyChange: (v: number) => void;
  className?: string;
}) {
  const [mFocused, setMFocused] = useState(false);
  const [yFocused, setYFocused] = useState(false);
  const [mInput, setMInput] = useState('');
  const [yInput, setYInput] = useState('');

  return (
    <div className={className}>
      <label
        className="block text-[0.6875rem] font-medium text-slate uppercase tracking-wide mb-2"
        style={{ fontFamily: 'var(--font-jakarta)' }}
      >
        {label}
      </label>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white border border-gray-200 rounded-xl p-3">
          <span className="block text-[0.625rem] text-slate mb-0.5" style={{ fontFamily: 'var(--font-jakarta)' }}>Monthly</span>
          <input
            type="text"
            value={mFocused ? mInput : fmtDollar(monthlyValue)}
            onFocus={() => { setMFocused(true); setMInput(String(Math.round(monthlyValue))); }}
            onBlur={() => { setMFocused(false); onMonthlyChange(parseDollar(mInput)); }}
            onChange={(e) => setMInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
            className="w-full text-[0.9375rem] font-semibold text-navy bg-transparent border-none outline-none p-0"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          />
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-3">
          <span className="block text-[0.625rem] text-slate mb-0.5" style={{ fontFamily: 'var(--font-jakarta)' }}>Yearly</span>
          <input
            type="text"
            value={yFocused ? yInput : fmtDollar(monthlyValue * 12)}
            onFocus={() => { setYFocused(true); setYInput(String(Math.round(monthlyValue * 12))); }}
            onBlur={() => { setYFocused(false); onMonthlyChange(Math.round(parseDollar(yInput) / 12)); }}
            onChange={(e) => setYInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
            className="w-full text-[0.9375rem] font-semibold text-navy bg-transparent border-none outline-none p-0"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          />
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-[0.8125rem] font-bold text-navy uppercase tracking-wide mb-3"
      style={{ fontFamily: 'var(--font-jakarta)' }}
    >
      {children}
    </h3>
  );
}

// ─── Main Component ───

interface PurchaseCalculatorProps {
  onDownloadReport: (snapshot: Record<string, unknown>) => void;
}

export default function PurchaseCalculator({ onDownloadReport }: PurchaseCalculatorProps) {
  const [homePrice, setHomePrice] = useState(500000);
  const [location, setLocation] = useState('Toronto ON');
  const [downPayment, setDownPayment] = useState(25000);
  const [dpPreset, setDpPreset] = useState<string>('Min');
  const [frequency, setFrequency] = useState('Monthly');
  const [firstTimeBuyer, setFirstTimeBuyer] = useState(false);
  const [newlyBuilt, setNewlyBuilt] = useState(false);
  const [rate, setRate] = useState(4.0);
  const [rateType, setRateType] = useState<'Fixed' | 'Variable'>('Fixed');
  const [rateTerm, setRateTerm] = useState(5);
  const [amortization, setAmortization] = useState(25);

  const [propertyTaxMonthly, setPropertyTaxMonthly] = useState(0);
  const [condoFees, setCondoFees] = useState(0);
  const [heat, setHeat] = useState(0);
  const [otherExpenses, setOtherExpenses] = useState(0);

  const [rentalEnabled, setRentalEnabled] = useState(false);
  const [rentalMonthly, setRentalMonthly] = useState(0);

  const [payFasterEnabled, setPayFasterEnabled] = useState(false);
  const [paymentIncreasePct, setPaymentIncreasePct] = useState(0);
  const [oneTimePrepayment, setOneTimePrepayment] = useState(0);
  const [annualPrepayment, setAnnualPrepayment] = useState(0);

  const [loanType, setLoanType] = useState<'Regular' | 'Interest-Only'>('Regular');

  // ─── Derived ───

  const minDown = useMemo(() => calc.getMinDownPayment(homePrice), [homePrice]);

  const isInsured = useMemo(() => {
    const dpPct = (downPayment / homePrice) * 100;
    return homePrice < 1500000 && dpPct < 20;
  }, [homePrice, downPayment]);

  const maxAmort = useMemo(
    () => calc.getMaxAmortization(isInsured, firstTimeBuyer, newlyBuilt),
    [isInsured, firstTimeBuyer, newlyBuilt]
  );

  const effectiveAmort = Math.min(amortization, maxAmort);

  const cmhc = useMemo(
    () => calc.getCMHCInsurance(homePrice, downPayment, effectiveAmort),
    [homePrice, downPayment, effectiveAmort]
  );

  const totalPrincipal = cmhc.totalPrincipal;
  const interestOnly = loanType === 'Interest-Only';

  const termResults = useMemo(
    () => calc.calculateTermResults(totalPrincipal, rate / 100, effectiveAmort, frequency, rateTerm, interestOnly),
    [totalPrincipal, rate, effectiveAmort, frequency, rateTerm, interestOnly]
  );

  const ppy = calc.getPaymentsPerYear(frequency);
  const monthlyPaymentEquiv = (termResults.payment * ppy) / 12;
  const homeExpensesMonthly = propertyTaxMonthly + condoFees + heat;
  const totalMonthlyCost =
    monthlyPaymentEquiv + homeExpensesMonthly + otherExpenses - (rentalEnabled ? rentalMonthly : 0);

  const closingCosts = useMemo(
    () => calc.calculateClosingCosts(homePrice, downPayment, location, firstTimeBuyer, false, 0),
    [homePrice, downPayment, location, firstTimeBuyer]
  );

  const chartData = useMemo(() => {
    if (!payFasterEnabled) return [];
    const basePayment = termResults.payment;
    const increasedPayment = basePayment * (1 + paymentIncreasePct / 100);
    const baseBalances = calc.getYearlyBalances(totalPrincipal, rate / 100, ppy, basePayment, effectiveAmort);
    const newBalances = calc.getYearlyBalances(totalPrincipal, rate / 100, ppy, increasedPayment, effectiveAmort, oneTimePrepayment, annualPrepayment);
    const maxLen = Math.max(baseBalances.length, newBalances.length);
    const data: { year: number; Balance: number; 'New Balance': number }[] = [];
    for (let i = 0; i < maxLen; i++) {
      data.push({ year: i, Balance: baseBalances[i]?.balance ?? 0, 'New Balance': newBalances[i]?.balance ?? 0 });
    }
    return data;
  }, [payFasterEnabled, termResults.payment, paymentIncreasePct, totalPrincipal, rate, ppy, effectiveAmort, oneTimePrepayment, annualPrepayment]);

  const paymentIncreaseDollar = termResults.payment * (paymentIncreasePct / 100);

  // ─── Handlers ───

  const handleHomePriceChange = useCallback((v: number) => {
    setHomePrice(v);
    if (dpPreset === 'Min') {
      setDownPayment(calc.getMinDownPayment(v));
    } else if (dpPreset !== '') {
      const pct = parseFloat(dpPreset) / 100;
      setDownPayment(Math.round(v * pct));
    }
  }, [dpPreset]);

  const handleDownPaymentChange = useCallback((v: number) => {
    const clamped = Math.max(minDown, Math.min(homePrice, v));
    setDownPayment(clamped);
    setDpPreset('');
  }, [minDown, homePrice]);

  const handleDpPreset = useCallback((preset: string) => {
    setDpPreset(preset);
    if (preset === 'Min') {
      setDownPayment(calc.getMinDownPayment(homePrice));
    } else {
      const pct = parseFloat(preset) / 100;
      const dpVal = Math.round(homePrice * pct);
      setDownPayment(Math.max(calc.getMinDownPayment(homePrice), dpVal));
    }
  }, [homePrice]);

  const handleAmortChange = useCallback((v: number) => {
    setAmortization(Math.min(v, 30));
  }, []);

  // ─── Snapshot ───

  const getSnapshot = useCallback(
    () => ({
      homePrice, location, downPayment,
      downPaymentPercent: ((downPayment / homePrice) * 100).toFixed(2),
      frequency, rate, rateType, rateTerm,
      amortization: effectiveAmort, firstTimeBuyer, newlyBuilt,
      cmhcPremium: cmhc.premium, cmhcPST: cmhc.pst,
      totalPrincipal, payment: termResults.payment,
      monthlyPaymentEquiv, totalMonthlyCost,
      balanceEndOfTerm: termResults.balanceEndOfTerm,
      interestOverTerm: termResults.interestOverTerm,
      closingCosts: closingCosts.total,
      effectiveAmortYears: termResults.effectiveAmortYears,
    }),
    [homePrice, location, downPayment, frequency, rate, rateType, rateTerm, effectiveAmort, firstTimeBuyer, newlyBuilt, cmhc, totalPrincipal, termResults, monthlyPaymentEquiv, totalMonthlyCost, closingCosts]
  );

  // ─── Result Items ───

  const topItems: ResultItem[] = useMemo(() => [
    { label: 'Monthly Mortgage', value: fmtDollar(monthlyPaymentEquiv) },
    { label: 'Home Expenses', value: fmtDollar(homeExpensesMonthly) },
    { label: 'Other Expenses', value: fmtDollar(otherExpenses), hidden: otherExpenses === 0 },
    { label: 'Rental Income', value: '-' + fmtDollar(rentalMonthly), hidden: !rentalEnabled || rentalMonthly === 0 },
  ], [monthlyPaymentEquiv, homeExpensesMonthly, otherExpenses, rentalEnabled, rentalMonthly]);

  // Tab 1: Mortgage Amount details
  const mortgageTabItems: ResultItem[] = useMemo(() => {
    const items: ResultItem[] = [
      { label: 'Mortgage Payment', value: fmtDollar(termResults.payment) + '/mo equiv.' },
    ];
    items.push({ label: 'Net Mortgage', value: fmtDollar(cmhc.mortgageAmount), separator: true });
    if (cmhc.premium > 0) {
      items.push({ label: 'Mortgage Insurance', value: '+ ' + fmtDollar(cmhc.premium), indent: true });
    }
    items.push({ label: 'Interest paid over term', value: fmtDollar(termResults.interestOverTerm), separator: true });
    items.push({ label: 'Balance end of term', value: fmtDollar(termResults.balanceEndOfTerm) });
    items.push({
      label: 'Effective amortization',
      value: termResults.effectiveAmortYears === Infinity ? 'N/A' : `${termResults.effectiveAmortYears} years`,
    });
    return items;
  }, [termResults, cmhc]);

  // Tab 2: Closing Costs details
  const closingTabItems: ResultItem[] = useMemo(() => {
    const items: ResultItem[] = [
      { label: 'Land Transfer Tax (Ontario)', value: fmtDollar(closingCosts.ontarioLTT) },
    ];
    if (closingCosts.torontoMLTT > 0) {
      items.push({ label: 'Municipal Land Transfer Tax', value: fmtDollar(closingCosts.torontoMLTT) });
    }
    if (closingCosts.ontarioRebate > 0) {
      items.push({ label: 'Ontario LTT Rebate', value: '-' + fmtDollar(closingCosts.ontarioRebate) });
    }
    if (closingCosts.torontoRebate > 0) {
      items.push({ label: 'Toronto LTT Rebate', value: '-' + fmtDollar(closingCosts.torontoRebate) });
    }
    if (cmhc.pst > 0) {
      items.push({ label: 'PST on Mortgage Insurance', value: fmtDollar(cmhc.pst) });
    }
    items.push({ label: 'Legal Fees (est.)', value: '$0', separator: true });
    items.push({ label: 'Home Inspection (est.)', value: '$0' });
    items.push({ label: 'Appraisal (est.)', value: '$0' });
    return items;
  }, [closingCosts, cmhc]);

  const resultTabs: ResultsTab[] = useMemo(() => [
    {
      label: 'Mortgage Amount',
      summaryValue: fmtDollar(cmhc.totalPrincipal),
      items: mortgageTabItems,
    },
    {
      label: 'Closing Costs',
      summaryValue: fmtDollar(closingCosts.total),
      items: closingTabItems,
    },
  ], [cmhc.totalPrincipal, closingCosts.total, mortgageTabItems, closingTabItems]);

  // ─── Warnings ───

  const highPriceWarning = homePrice >= 1500000
    ? 'Properties over $1.5M require a minimum 20% down payment and are not eligible for CMHC insurance'
    : '';

  const amortWarning = isInsured && amortization > maxAmort
    ? `Insured mortgages are capped at ${maxAmort} years amortization${maxAmort === 30 ? '' : ' (30 years for first-time buyers and new builds)'}`
    : '';

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
        <div className="flex items-center gap-2">
          <span className="text-[0.8125rem] text-navy font-semibold" style={{ fontFamily: 'var(--font-jakarta)' }}>Semi-Annual</span>
          <span className="relative group">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-slate cursor-help">
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
              <text x="7" y="10" textAnchor="middle" fill="currentColor" fontSize="8" fontWeight="600">?</text>
            </svg>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-navy text-white text-[0.6875rem] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30" style={{ fontFamily: 'var(--font-jakarta)' }}>
              Fixed-rate mortgages in Canada are required by law to compound semi-annually
            </span>
          </span>
        </div>
      </div>
      <div>
        <p className="text-[0.6875rem] font-semibold text-slate mb-2 uppercase tracking-wide" style={{ fontFamily: 'var(--font-jakarta)' }}>Scenario Options</p>
        <label className="flex items-center gap-2 mb-2 cursor-pointer">
          <input type="checkbox" checked={firstTimeBuyer} onChange={(e) => setFirstTimeBuyer(e.target.checked)} className="accent-coral w-4 h-4" />
          <span className="text-[0.75rem] text-navy" style={{ fontFamily: 'var(--font-jakarta)' }}>First-time Homebuyer</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={newlyBuilt} onChange={(e) => setNewlyBuilt(e.target.checked)} className="accent-coral w-4 h-4" />
          <span className="text-[0.75rem] text-navy" style={{ fontFamily: 'var(--font-jakarta)' }}>Newly Built Home</span>
        </label>
      </div>
    </div>
  );

  // ─── Render ───

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-10 py-6 sm:py-10">
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8">
      {/* LEFT COLUMN */}
      <div className="md:col-span-3 space-y-4">

        {/* Row 1: Home Price + Location */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
          <InputBox
            label="Home Price"
            value={homePrice}
            onChange={handleHomePriceChange}
            min={0} max={3000000}
            steps={HOME_PRICE_STEPS}
            format="dollar"
            note={highPriceWarning}
          />
          <SelectBox
            label="Location"
            value={location}
            onChange={setLocation}
            options={LOCATIONS.map((l) => ({ label: l, value: l }))}
          />
        </div>

        {/* Row 2: Down Payment + Payment Frequency */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
          {/* Down Payment with inline % dropdown */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col">
            <div className="flex">
              <div className="flex-1 p-4 pb-0">
                <label className="block text-[0.6875rem] font-medium text-slate uppercase tracking-wide mb-1" style={{ fontFamily: 'var(--font-jakarta)' }}>
                  Down Payment
                </label>
                <DpDollarInput value={downPayment} onChange={handleDownPaymentChange} />
              </div>
              <div className="border-l border-gray-200 flex items-center px-4 shrink-0">
                <select
                  value={dpPreset}
                  onChange={(e) => handleDpPreset(e.target.value)}
                  className="text-[0.875rem] font-semibold text-navy bg-transparent border-none outline-none p-0 cursor-pointer appearance-none"
                  style={{ fontFamily: 'var(--font-jakarta)' }}
                >
                  {DP_PRESETS.map((p) => (
                    <option key={p} value={p}>
                      {p === 'Min' ? `Min` : p}
                    </option>
                  ))}
                </select>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-1 text-slate shrink-0">
                  <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="px-4 pb-3 pt-2">
              <input
                type="range" min={minDown} max={homePrice} step={5000}
                value={downPayment}
                onChange={(e) => handleDownPaymentChange(Number(e.target.value))}
                className="calc-slider w-full"
                style={sliderGradientStyle(downPayment, minDown, homePrice)}
              />
            </div>
            {downPayment <= minDown && (
              <p
                className="text-coral text-[0.75rem] font-medium px-4 pb-3 -mt-1"
                style={{ fontFamily: 'var(--font-jakarta)' }}
              >
                Minimum down payment for a {fmtDollar(homePrice)} home is {fmtDollar(minDown)} ({homePrice >= 1500000 ? '20%' : homePrice <= 500000 ? '5%' : '5% on the first $500K, 10% on the rest'}).
              </p>
            )}
          </div>
          <SelectBox
            label="Payment Frequency"
            value={frequency}
            onChange={setFrequency}
            options={FREQUENCIES.map((f) => ({ label: f, value: f }))}
          />
        </div>

        {/* Row 3: Checkboxes */}
        <div className="flex flex-wrap gap-6 px-1 py-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={firstTimeBuyer} onChange={(e) => setFirstTimeBuyer(e.target.checked)} className="accent-coral w-4 h-4" />
            <span className="text-[0.8125rem] text-navy font-medium" style={{ fontFamily: 'var(--font-jakarta)' }}>First-time Homebuyer</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={newlyBuilt} onChange={(e) => setNewlyBuilt(e.target.checked)} className="accent-coral w-4 h-4" />
            <span className="text-[0.8125rem] text-navy font-medium" style={{ fontFamily: 'var(--font-jakarta)' }}>Newly Built Home</span>
          </label>
        </div>

        {/* Row 4: Rate section */}
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

        {/* Row 5: Amortization */}
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
            note={amortWarning}
          />
        </div>

        {/* Pay Your Mortgage Faster (moved above Home Expenses) */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-[0.8125rem] font-bold text-navy" style={{ fontFamily: 'var(--font-jakarta)' }}>
              Pay your mortgage faster
            </span>
            <button
              onClick={() => setPayFasterEnabled(!payFasterEnabled)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${payFasterEnabled ? 'bg-coral' : 'bg-slate/30'}`}
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
              {chartData.length > 0 && (
                <div className="mt-4">
                  <ResponsiveContainer width="100%" height={240}>
                    <LineChart data={chartData}>
                      <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#8A9BAA' }} label={{ value: 'Years', position: 'insideBottom', offset: -2, fontSize: 11, fill: '#8A9BAA' }} />
                      <YAxis tick={{ fontSize: 11, fill: '#8A9BAA' }} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
                      <Tooltip formatter={(value) => fmtDollar(Number(value))} labelFormatter={(label) => `Year ${label}`} contentStyle={{ fontSize: 12, fontFamily: 'var(--font-jakarta)' }} />
                      <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'var(--font-jakarta)' }} />
                      <Line type="monotone" dataKey="Balance" stroke="#E8705A" strokeWidth={2} dot={{ r: 3, fill: '#E8705A' }} />
                      <Line type="monotone" dataKey="New Balance" stroke="#1E2D3D" strokeWidth={2} dot={{ r: 3, fill: '#1E2D3D' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Home Expenses */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <SectionHeader>Home Expenses</SectionHeader>
          <DualInputBox label="Property Tax" monthlyValue={propertyTaxMonthly} onMonthlyChange={setPropertyTaxMonthly} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputBox label="Condo Fees (Monthly)" value={condoFees} onChange={setCondoFees} min={0} max={1500} step={100} format="dollar" />
            <InputBox label="Heat (Monthly)" value={heat} onChange={setHeat} min={0} max={500} step={50} format="dollar" />
          </div>
          <InputBox label="Other Monthly Expenses" value={otherExpenses} onChange={setOtherExpenses} min={0} max={3000} step={100} format="dollar" />
        </div>

        {/* Rental Income */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-[0.8125rem] font-bold text-navy" style={{ fontFamily: 'var(--font-jakarta)' }}>
              Add Rental Income
            </span>
            <button
              onClick={() => setRentalEnabled(!rentalEnabled)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${rentalEnabled ? 'bg-coral' : 'bg-slate/30'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${rentalEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
          {rentalEnabled && (
            <div className="mt-4 border-t border-dashed border-gray-200 pt-4">
              <DualInputBox label="Rental Income" monthlyValue={rentalMonthly} onMonthlyChange={setRentalMonthly} />
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="md:col-span-2">
        <ResultsPanel
          primaryLabel="Total Monthly Cost"
          primaryValue={fmtDollar(totalMonthlyCost)}
          items={topItems}
          tabs={resultTabs}
          onDownloadReport={() => onDownloadReport(getSnapshot())}
          settingsSlot={settingsContent}
        />
      </div>
    </div>
    </div>
  );
}

// ─── Small inline sub-components ───

function DpDollarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [focused, setFocused] = useState(false);
  const [inputVal, setInputVal] = useState('');
  return (
    <input
      type="text"
      value={focused ? inputVal : fmtDollar(value)}
      onFocus={() => { setFocused(true); setInputVal(String(Math.round(value))); }}
      onBlur={() => { setFocused(false); onChange(parseDollar(inputVal)); }}
      onChange={(e) => setInputVal(e.target.value)}
      onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
      className="text-[1.125rem] font-bold text-navy bg-transparent border-none outline-none p-0 w-full"
      style={{ fontFamily: 'var(--font-jakarta)' }}
    />
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

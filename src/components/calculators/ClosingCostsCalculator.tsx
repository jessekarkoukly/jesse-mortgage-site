'use client';

import { useState, useMemo, useRef, useEffect } from 'react';

// ─── Formatting Helpers ───

function fmtDollar(v: number): string {
  return '$' + v.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtDollarWhole(v: number): string {
  return '$' + Math.round(v).toLocaleString('en-CA');
}

// ─── Info Tooltip ───

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
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
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
          style={{ fontFamily: 'var(--font-jakarta)' }}
        >
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-navy" />
        </div>
      )}
    </div>
  );
}

// ─── Slider Gradient ───

function sliderGradientStyle(value: number, min: number, max: number): React.CSSProperties {
  const pct = max === min ? 0 : ((value - min) / (max - min)) * 100;
  return {
    background: `linear-gradient(to right, #1E2D3D 0%, #E8705A ${pct}%, #E5E7EB ${pct}%)`,
  };
}

// ─── LTT Brackets ───

const ONTARIO_LTT_BRACKETS = [
  { min: 0, max: 55000, rate: 0.005 },
  { min: 55000, max: 250000, rate: 0.01 },
  { min: 250000, max: 400000, rate: 0.015 },
  { min: 400000, max: 2000000, rate: 0.02 },
  { min: 2000000, max: Infinity, rate: 0.025 },
];

const TORONTO_MLTT_BRACKETS = [
  { min: 0, max: 55000, rate: 0.005 },
  { min: 55000, max: 250000, rate: 0.01 },
  { min: 250000, max: 400000, rate: 0.015 },
  { min: 400000, max: 2000000, rate: 0.02 },
  { min: 2000000, max: 3000000, rate: 0.025 },
  { min: 3000000, max: 4000000, rate: 0.044 },
  { min: 4000000, max: 5000000, rate: 0.0545 },
  { min: 5000000, max: 10000000, rate: 0.065 },
  { min: 10000000, max: 20000000, rate: 0.0755 },
  { min: 20000000, max: Infinity, rate: 0.086 },
];

function calculateBracketTax(price: number, brackets: typeof ONTARIO_LTT_BRACKETS): number {
  let tax = 0;
  for (const bracket of brackets) {
    if (price <= bracket.min) break;
    const taxable = Math.min(price, bracket.max) - bracket.min;
    tax += taxable * bracket.rate;
  }
  return tax;
}

// ─── Slider Input ───

function SliderInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
  prefix = '$',
  suffix = '',
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
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;
  const display =
    prefix === '$'
      ? `$${Math.round(value).toLocaleString('en-CA')}`
      : `${value}${suffix}`;

  return (
    <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-4 pb-3 flex flex-col justify-between h-full">
      <div className="flex items-center gap-1.5 mb-1">
        <span
          className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide"
          style={{ fontFamily: 'var(--font-jakarta)' }}
        >
          {label}
        </span>
        {info && <InfoBubble text={info} />}
      </div>
      <div className="flex items-center gap-1 mb-2">
        {editing && prefix === '$' && (
          <span className="text-navy font-bold text-[1.25rem]" style={{ fontFamily: 'var(--font-spectral)' }}>$</span>
        )}
        <input
          type="text"
          inputMode="numeric"
          value={editing ? draft : display}
          onFocus={() => {
            setEditing(true);
            setDraft(String(Math.round(value)));
          }}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^0-9.]/g, '');
            setDraft(raw);
            const n = parseFloat(raw);
            if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
          }}
          onBlur={() => {
            setEditing(false);
            const n = parseFloat(draft);
            if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
          }}
          onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
          className="w-full bg-transparent text-navy font-bold text-[1.25rem] focus:outline-none"
          style={{ fontFamily: 'var(--font-spectral)' }}
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
        style={sliderGradientStyle(value, min, max)}
      />
    </div>
  );
}

// ─── Result Line Item ───

function ResultLine({
  label,
  value,
  note,
  negative,
  bold,
}: {
  label: string;
  value: string;
  note?: string;
  negative?: boolean;
  bold?: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span
          className={`text-[0.8125rem] ${negative ? 'text-green-700' : 'text-slate'}`}
          style={{ fontFamily: 'var(--font-jakarta)' }}
        >
          {label}
        </span>
        <span
          className={`text-[0.8125rem] tabular-nums ${
            bold ? 'font-bold text-navy' : negative ? 'font-semibold text-green-700' : 'font-semibold text-navy'
          }`}
          style={{ fontFamily: 'var(--font-jakarta)' }}
        >
          {value}
        </span>
      </div>
      {note && (
        <p
          className="text-[0.625rem] text-slate mt-0.5"
          style={{ fontFamily: 'var(--font-jakarta)' }}
        >
          {note}
        </p>
      )}
    </div>
  );
}

// ─── Main Component ───

export default function ClosingCostsCalculator() {
  // Core inputs
  const [purchasePrice, setPurchasePrice] = useState(500000);
  const [downPaymentPct, setDownPaymentPct] = useState(10);
  const [amortization, setAmortization] = useState(25);

  // Ancillary costs
  const [appraisal, setAppraisal] = useState(0);
  const [homeInspection, setHomeInspection] = useState(0);
  const [movingCosts, setMovingCosts] = useState(0);
  const [titleInsurance, setTitleInsurance] = useState(0);
  const [legalFees, setLegalFees] = useState(0);
  const [finalAdjustments, setFinalAdjustments] = useState(0);
  const [lenderFee, setLenderFee] = useState(0);
  const [brokerageFee, setBrokerageFee] = useState(0);

  // Other inputs
  const [location, setLocation] = useState<'ontario' | 'toronto'>('toronto');
  const [firstTimeBuyer, setFirstTimeBuyer] = useState(false);

  const downPaymentDollar = Math.round(purchasePrice * (downPaymentPct / 100));
  const dpPresets = [5, 10, 15, 20];

  // Minimum down payment calculation
  const minDownDollar = useMemo(() => {
    if (purchasePrice >= 1000000) return purchasePrice * 0.20;
    if (purchasePrice <= 500000) return purchasePrice * 0.05;
    return 500000 * 0.05 + (purchasePrice - 500000) * 0.10;
  }, [purchasePrice]);
  const minDownPct = purchasePrice > 0 ? (minDownDollar / purchasePrice) * 100 : 5;
  const dpTooLow = downPaymentPct < Math.ceil(minDownPct);

  const results = useMemo(() => {
    const price = purchasePrice;
    const dp = downPaymentDollar;
    const mortgageAmount = price - dp;
    const ltv = price > 0 ? mortgageAmount / price : 0;

    // Ontario LTT
    const provincialLTT = calculateBracketTax(price, ONTARIO_LTT_BRACKETS);
    const provincialFTBRebate = firstTimeBuyer ? Math.min(provincialLTT, 4000) : 0;

    // Toronto MLTT
    const isToronto = location === 'toronto';
    const municipalLTT = isToronto ? calculateBracketTax(price, TORONTO_MLTT_BRACKETS) : 0;
    const municipalFTBRebate = isToronto && firstTimeBuyer ? Math.min(municipalLTT, 4475) : 0;

    const totalLTT = provincialLTT + municipalLTT;
    const totalRebate = provincialFTBRebate + municipalFTBRebate;
    const netLTT = totalLTT - totalRebate;

    // CMHC Insurance
    let cmhcRate = 0;
    if (ltv > 0.80) {
      if (ltv <= 0.85) cmhcRate = 0.028;
      else if (ltv <= 0.90) cmhcRate = 0.031;
      else cmhcRate = 0.04;
    }
    const cmhcPremium = mortgageAmount * cmhcRate;
    const pstOnCmhc = cmhcPremium * 0.08;

    // Ancillary total
    const ancillaryCost =
      appraisal + homeInspection + movingCosts + titleInsurance +
      legalFees + finalAdjustments + lenderFee + brokerageFee;

    // Total
    const totalClosingCosts =
      netLTT + pstOnCmhc + ancillaryCost;

    const cashRequired = dp + totalClosingCosts;

    return {
      provincialLTT,
      municipalLTT,
      totalLTT,
      totalRebate,
      netLTT,
      cmhcPremium,
      pstOnCmhc,
      ancillaryCost,
      totalClosingCosts,
      dp,
      cashRequired,
      mortgageAmount,
    };
  }, [purchasePrice, downPaymentDollar, location, firstTimeBuyer, appraisal, homeInspection, movingCosts, titleInsurance, legalFees, finalAdjustments, lenderFee, brokerageFee]);

  const handleBookCall = () => {
    window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-10 py-6 sm:py-10">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        {/* ── LEFT: Inputs ── */}
        <div className="md:w-[60%] flex flex-col gap-5">

          {/* Home Price */}
          <SliderInput
            label="Home Price"
            value={purchasePrice}
            min={100000}
            max={3000000}
            step={50000}
            onChange={setPurchasePrice}
          />

          {/* Down Payment */}
          <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-4 pb-3">
            <div className="flex items-center gap-1.5 mb-1">
              <span
                className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide"
                style={{ fontFamily: 'var(--font-jakarta)' }}
              >
                Down Payment
              </span>
              <InfoBubble text="The minimum down payment in Canada is 5% on the first $500,000 and 10% on any amount above that, up to $999,999. For homes $1M or more, at least 20% is required." />
            </div>
            <div className="flex items-baseline gap-3 mb-2">
              <span
                className="text-navy font-bold text-[1.25rem]"
                style={{ fontFamily: 'var(--font-spectral)' }}
              >
                {fmtDollarWhole(downPaymentDollar)}
              </span>
              <span
                className="text-[0.8125rem] text-slate font-semibold"
                style={{ fontFamily: 'var(--font-jakarta)' }}
              >
                {downPaymentPct}%
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={100}
              step={1}
              value={downPaymentPct}
              onChange={(e) => setDownPaymentPct(Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer mb-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-navy [&::-webkit-slider-thumb]:shadow-md"
              style={sliderGradientStyle(downPaymentPct, 5, 100)}
            />
            <div className="flex gap-2">
              {dpPresets.map((pct) => (
                <button
                  key={pct}
                  onClick={() => setDownPaymentPct(pct)}
                  className={`px-3 py-1.5 rounded-lg text-[0.75rem] font-semibold transition-colors cursor-pointer ${
                    downPaymentPct === pct
                      ? 'bg-navy text-white'
                      : 'bg-white border border-[#E5E7EB] text-navy hover:bg-sand'
                  }`}
                  style={{ fontFamily: 'var(--font-jakarta)' }}
                >
                  {pct}%
                </button>
              ))}
            </div>
            {dpTooLow && (
              <p
                className="text-coral text-[0.75rem] font-medium mt-2"
                style={{ fontFamily: 'var(--font-jakarta)' }}
              >
                Minimum down payment for a {fmtDollarWhole(purchasePrice)} home is {fmtDollarWhole(Math.ceil(minDownDollar))} ({purchasePrice >= 1000000 ? '20%' : purchasePrice <= 500000 ? '5%' : '5% on the first $500K, 10% on the rest'}).
              </p>
            )}
          </div>

          {/* Amortization */}
          <SliderInput
            label="Amortization"
            value={amortization}
            min={5}
            max={30}
            step={1}
            onChange={setAmortization}
            prefix=""
            suffix={` year${amortization !== 1 ? 's' : ''}`}
            info="The total time to pay off your mortgage. Longer amortization means smaller monthly payments but more interest overall."
          />

          {/* Location */}
          <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-4">
            <span
              className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide mb-2 block"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              Location
            </span>
            <div className="flex gap-2">
              {(['ontario', 'toronto'] as const).map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocation(loc)}
                  className={`flex-1 py-2 rounded-lg text-[0.875rem] font-semibold transition-colors cursor-pointer ${
                    location === loc
                      ? 'bg-navy text-white'
                      : 'bg-white text-slate border border-[#E5E7EB]'
                  }`}
                  style={{ fontFamily: 'var(--font-jakarta)' }}
                >
                  {loc === 'ontario' ? 'Ontario' : 'Toronto'}
                </button>
              ))}
            </div>
          </div>

          {/* First-Time Buyer */}
          <div className="border border-[#E5E7EB] rounded-xl bg-[#FAFAFA] p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <button
                role="checkbox"
                aria-checked={firstTimeBuyer}
                onClick={() => setFirstTimeBuyer(!firstTimeBuyer)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                  firstTimeBuyer ? 'bg-coral border-coral' : 'bg-white border-[#E5E7EB]'
                }`}
              >
                {firstTimeBuyer && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 6l3 3 5-5" />
                  </svg>
                )}
              </button>
              <span className="text-[0.875rem] text-navy font-semibold" style={{ fontFamily: 'var(--font-jakarta)' }}>
                I am a first-time home buyer
              </span>
              <InfoBubble text="You qualify as a first-time buyer in Ontario if you have never owned a home anywhere in the world. In Toronto, you must also be a Canadian citizen or permanent resident and occupy the home within 9 months of purchase." />
            </label>
          </div>

          {/* Divider */}
          <div className="border-t border-[#E5E7EB] my-2" />

          {/* ── Ancillary Costs ── */}
          <div>
            <p
              className="text-navy font-bold text-[0.9375rem] mb-1"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              Ancillary Costs
            </p>
            <p
              className="text-slate text-[0.75rem] mb-4"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              Additional costs that are often overlooked. Adjust each to calculate a more realistic closing cost estimate.
            </p>

            <div className="flex flex-col gap-3">
              <SliderInput
                label="Appraisal"
                value={appraisal}
                min={0}
                max={1000}
                step={50}
                onChange={setAppraisal}
                info="An appraisal is an unbiased estimate of a property's fair market value. Lenders require one to confirm the mortgage amount is appropriate. The cost is usually covered by the buyer and, in some cases, by the lender. Approximately $300 to $500."
              />
              <SliderInput
                label="Home Inspection"
                value={homeInspection}
                min={0}
                max={1000}
                step={50}
                onChange={setHomeInspection}
                info="Accredited home inspectors will examine the property to ensure it is up to code and that everything functions properly. Approximately $200 to $500."
              />
              <SliderInput
                label="Moving Costs"
                value={movingCosts}
                min={0}
                max={10000}
                step={250}
                onChange={setMovingCosts}
                info="The cost of moving furniture and belongings to the new property. Depending on the size of your home and distance, approximately $350 to $5,000."
              />
              <SliderInput
                label="Title Insurance"
                value={titleInsurance}
                min={0}
                max={1000}
                step={50}
                onChange={setTitleInsurance}
                info="Title insurance protects against losses related to property ownership or title. It covers title disputes, forgery, fraud, and errors in the legal description. The typical cost is $350 to $400. Not legally required in Canada, but most lenders require it."
              />
              <SliderInput
                label="Legal Fees"
                value={legalFees}
                min={0}
                max={5000}
                step={100}
                onChange={setLegalFees}
                info="Real estate lawyers will submit your offer, handle registration, and submit your final payment on close. Approximately $800 to $2,500."
              />
              <SliderInput
                label="Final Adjustments"
                value={finalAdjustments}
                min={0}
                max={15000}
                step={250}
                onChange={setFinalAdjustments}
                info="Any expenses the seller needs to be reimbursed for after closing, such as maintenance fees, heat, or prepaid property tax. Approximately $0 to $10,000+."
              />
              <SliderInput
                label="Lender Fee"
                value={lenderFee}
                min={0}
                max={5000}
                step={100}
                onChange={setLenderFee}
                info="The fee a lender may charge for providing financing. Not all lenders charge this. Ask before you commit."
              />
              <SliderInput
                label="Brokerage Fee"
                value={brokerageFee}
                min={0}
                max={5000}
                step={100}
                onChange={setBrokerageFee}
                info="The fee a brokerage may charge for their services in obtaining financing. In most cases, this is paid by the lender, not the borrower."
              />
            </div>
          </div>
        </div>

        {/* ── RIGHT: Results Panel ── */}
        <div className="md:w-[40%]">
          <div className="md:sticky md:top-20 bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-6 shadow-sm">

            {/* Total Estimated Cost */}
            <p
              className="text-[0.6875rem] font-semibold text-slate uppercase tracking-wide mb-1"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              Total Estimated Cost
            </p>
            <p
              className="text-[1.625rem] sm:text-[2rem] font-bold text-coral leading-tight mb-5"
              style={{ fontFamily: 'var(--font-spectral)' }}
            >
              {fmtDollarWhole(results.totalClosingCosts)}
            </p>

            {/* Land Transfer Section */}
            <div className="mb-4 pb-4 border-b border-sand-2">
              <div className="flex items-center justify-between mb-3">
                <p
                  className="text-[0.875rem] font-bold text-navy"
                  style={{ fontFamily: 'var(--font-jakarta)' }}
                >
                  Land Transfer
                </p>
                <span className="text-[0.8125rem] font-semibold text-navy tabular-nums" style={{ fontFamily: 'var(--font-jakarta)' }}>
                  {fmtDollarWhole(results.netLTT)}
                </span>
              </div>

              <div className="space-y-2 text-[0.8125rem]" style={{ fontFamily: 'var(--font-jakarta)' }}>
                <div className="flex justify-between">
                  <span className="text-slate">Provincial</span>
                  <span className="text-navy font-semibold tabular-nums">+ {fmtDollarWhole(results.provincialLTT)}</span>
                </div>
                {location === 'toronto' && (
                  <div className="flex justify-between">
                    <span className="text-slate">Municipal</span>
                    <span className="text-navy font-semibold tabular-nums">+ {fmtDollarWhole(results.municipalLTT)}</span>
                  </div>
                )}
                {results.totalRebate > 0 && (
                  <div className="flex justify-between">
                    <span className="text-green-700">Total Rebate</span>
                    <span className="text-green-700 font-semibold tabular-nums">- {fmtDollarWhole(results.totalRebate)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Additional line items */}
            <div className="space-y-3 text-[0.8125rem] mb-5" style={{ fontFamily: 'var(--font-jakarta)' }}>
              <div className="flex items-center justify-between">
                <span className="text-slate flex items-center gap-1.5">
                  PST on Mortgage Insurance
                  <InfoBubble text="When your down payment is less than 20%, mortgage insurance (CMHC) is required. The 8% Ontario PST on that insurance premium is paid in cash at closing." />
                </span>
                <span className="text-navy font-semibold tabular-nums">{fmtDollarWhole(Math.round(results.pstOnCmhc))}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate">Ancillary Costs</span>
                <span className="text-navy font-semibold tabular-nums">{fmtDollarWhole(results.ancillaryCost)}</span>
              </div>
            </div>

            {/* Disclaimer */}
            <p
              className="text-[0.6875rem] text-slate mb-5 leading-relaxed"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              These are estimates. Your lawyer provides exact figures before closing.
            </p>

            {/* CTA */}
            <div className="pt-4 border-t border-sand-2">
              <p
                className="text-slate text-[0.8125rem] mb-3 text-center"
                style={{ fontFamily: 'var(--font-jakarta)' }}
              >
                Want Jesse to run your exact numbers? It takes one call.
              </p>
              <button
                onClick={handleBookCall}
                className="w-full bg-navy text-white font-semibold py-3 rounded-lg hover:bg-navy-2 transition-colors cursor-pointer text-[0.875rem]"
                style={{ fontFamily: 'var(--font-jakarta)' }}
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

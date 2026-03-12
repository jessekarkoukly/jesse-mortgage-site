// ─── Canadian Mortgage Formulas ───
// Fixed-rate mortgages in Canada compound semi-annually by law.
// NEVER use annualRate / 12 for monthly rate. That is US-style.

// ─── Core Rate Conversion ───

export function getPeriodicRate(annualRate: number, paymentsPerYear: number): number {
  if (annualRate === 0) return 0;
  // Step 1: Effective annual rate (semi-annual compounding)
  const ear = Math.pow(1 + annualRate / 2, 2) - 1;
  // Step 2: Periodic rate for payment frequency
  return Math.pow(1 + ear, 1 / paymentsPerYear) - 1;
}

export function calculatePayment(
  principal: number,
  annualRate: number,
  amortYears: number,
  paymentsPerYear: number
): number {
  if (principal <= 0) return 0;
  const r = getPeriodicRate(annualRate, paymentsPerYear);
  const n = amortYears * paymentsPerYear;
  if (r === 0) return principal / n;
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

// ─── Payment Frequencies ───

export function getPaymentsPerYear(frequency: string): number {
  switch (frequency) {
    case 'Monthly': return 12;
    case 'Semi-Monthly': return 24;
    case 'Bi-Weekly':
    case 'Acc. Bi-Weekly': return 26;
    case 'Weekly':
    case 'Acc. Weekly': return 52;
    default: return 12;
  }
}

export function getPaymentAmount(
  principal: number,
  annualRate: number,
  amortYears: number,
  frequency: string,
  interestOnly: boolean = false
): number {
  const ppy = getPaymentsPerYear(frequency);
  if (interestOnly) {
    return principal * getPeriodicRate(annualRate, ppy);
  }
  // Accelerated Bi-Weekly: monthly payment / 2, paid 26 times/year
  if (frequency === 'Acc. Bi-Weekly') {
    return calculatePayment(principal, annualRate, amortYears, 12) / 2;
  }
  // Accelerated Weekly: monthly payment / 4, paid 52 times/year
  if (frequency === 'Acc. Weekly') {
    return calculatePayment(principal, annualRate, amortYears, 12) / 4;
  }
  return calculatePayment(principal, annualRate, amortYears, ppy);
}

// ─── CMHC Insurance (updated December 15, 2024) ───

export function getCMHCPremiumRate(downPaymentPercent: number, amortYears: number = 25): number {
  if (downPaymentPercent >= 20) return 0;
  let base = 0.04; // 5% to 9.99%
  if (downPaymentPercent >= 15) base = 0.028;
  else if (downPaymentPercent >= 10) base = 0.031;
  // 0.20% surcharge for 26-30 year insured amortization (Dec 2024 rule)
  if (amortYears > 25) base += 0.002;
  return base;
}

export function getCMHCInsurance(
  homePrice: number,
  downPayment: number,
  amortYears: number = 25
): { premium: number; pst: number; mortgageAmount: number; totalPrincipal: number } {
  const dpPercent = (downPayment / homePrice) * 100;
  const mortgageAmount = homePrice - downPayment;

  if (homePrice >= 1500000 || dpPercent >= 20) {
    return { premium: 0, pst: 0, mortgageAmount, totalPrincipal: mortgageAmount };
  }

  const rate = getCMHCPremiumRate(dpPercent, amortYears);
  const premium = mortgageAmount * rate;
  // Ontario PST on CMHC: 8%, paid in cash at closing, cannot be added to mortgage
  const pst = premium * 0.08;

  return {
    premium,
    pst,
    mortgageAmount,
    totalPrincipal: mortgageAmount + premium, // CMHC added to principal for payment calc
  };
}

// ─── Minimum Down Payment ───

export function getMinDownPayment(homePrice: number): number {
  if (homePrice <= 0) return 0;
  if (homePrice >= 1500000) return homePrice * 0.20;
  if (homePrice <= 500000) return homePrice * 0.05;
  return 500000 * 0.05 + (homePrice - 500000) * 0.10;
}

// ─── Term Calculations ───

export interface TermResults {
  payment: number;
  balanceEndOfTerm: number;
  interestOverTerm: number;
  principalOverTerm: number;
  totalPaidOverTerm: number;
  effectiveAmortYears: number;
}

export function calculateTermResults(
  principal: number,
  annualRate: number,
  amortYears: number,
  frequency: string,
  termYears: number,
  interestOnly: boolean = false
): TermResults {
  const ppy = getPaymentsPerYear(frequency);
  const payment = getPaymentAmount(principal, annualRate, amortYears, frequency, interestOnly);
  const r = getPeriodicRate(annualRate, ppy);
  const isAccelerated = frequency === 'Acc. Bi-Weekly' || frequency === 'Acc. Weekly';
  const termPayments = termYears * ppy;

  let balanceEndOfTerm: number;
  let interestOverTerm: number;
  let principalOverTerm: number;
  let totalPaidOverTerm: number;

  if (interestOnly) {
    balanceEndOfTerm = principal;
    interestOverTerm = termPayments * payment;
    principalOverTerm = 0;
    totalPaidOverTerm = interestOverTerm;
  } else if (!isAccelerated && r > 0) {
    // Formula approach for standard frequencies (exact)
    const n = amortYears * ppy;
    const rn = Math.pow(1 + r, n);
    const rp = Math.pow(1 + r, termPayments);

    balanceEndOfTerm = principal * (rn - rp) / (rn - 1);
    principalOverTerm = principal - balanceEndOfTerm;
    totalPaidOverTerm = termPayments * payment;
    interestOverTerm = totalPaidOverTerm - principalOverTerm;
  } else {
    // Iterative for accelerated payments or zero rate
    let balance = principal;
    let totalInterest = 0;

    for (let i = 0; i < termPayments && balance > 0.001; i++) {
      const interest = balance * r;
      const paidPrincipal = Math.min(payment - interest, balance);
      balance -= paidPrincipal;
      totalInterest += interest;
    }

    balanceEndOfTerm = Math.max(0, balance);
    interestOverTerm = totalInterest;
    principalOverTerm = principal - balanceEndOfTerm;
    totalPaidOverTerm = termPayments * payment;
  }

  // Effective amortization: iterate to find actual payoff time
  let effPayments = 0;
  if (!interestOnly && payment > 0 && r > 0) {
    let eBal = principal;
    while (eBal > 0.01 && effPayments < 100 * ppy) {
      const interest = eBal * r;
      const paidPrincipal = payment - interest;
      if (paidPrincipal <= 0) { effPayments = Infinity; break; }
      eBal -= Math.min(paidPrincipal, eBal);
      effPayments++;
    }
  } else if (r === 0 && payment > 0) {
    effPayments = Math.ceil(principal / payment);
  }

  return {
    payment: Math.round(payment * 100) / 100,
    balanceEndOfTerm: Math.round(balanceEndOfTerm * 100) / 100,
    interestOverTerm: Math.round(interestOverTerm * 100) / 100,
    principalOverTerm: Math.round(principalOverTerm * 100) / 100,
    totalPaidOverTerm: Math.round(totalPaidOverTerm * 100) / 100,
    effectiveAmortYears: interestOnly
      ? Infinity
      : Math.round((effPayments / ppy) * 10) / 10,
  };
}

// ─── Yearly Balance Schedule (for charts) ───

export function getYearlyBalances(
  principal: number,
  annualRate: number,
  paymentsPerYear: number,
  paymentAmount: number,
  maxYears: number,
  oneTimePrepayment: number = 0,
  annualPrepayment: number = 0
): { year: number; balance: number }[] {
  let balance = Math.max(0, principal - oneTimePrepayment);
  const r = getPeriodicRate(annualRate, paymentsPerYear);
  const data: { year: number; balance: number }[] = [{ year: 0, balance: Math.round(balance) }];

  for (let year = 1; year <= maxYears; year++) {
    for (let p = 0; p < paymentsPerYear && balance > 0.01; p++) {
      const interest = balance * r;
      const paidPrincipal = Math.min(paymentAmount - interest, balance);
      if (paidPrincipal <= 0) { balance = 0; break; }
      balance = Math.max(0, balance - paidPrincipal);
    }
    if (annualPrepayment > 0 && balance > 0) {
      balance = Math.max(0, balance - annualPrepayment);
    }
    data.push({ year, balance: Math.round(balance) });
    if (balance <= 0) break;
  }

  return data;
}

// ─── Total Amortization Results ───

export function calculateTotalAmortization(
  principal: number,
  annualRate: number,
  amortYears: number,
  frequency: string,
  interestOnly: boolean = false
): { totalInterest: number; totalPaid: number } {
  const ppy = getPaymentsPerYear(frequency);
  const payment = getPaymentAmount(principal, annualRate, amortYears, frequency, interestOnly);
  const r = getPeriodicRate(annualRate, ppy);

  if (interestOnly) {
    return { totalInterest: Infinity, totalPaid: Infinity };
  }

  let balance = principal;
  let totalInterest = 0;
  let payments = 0;

  while (balance > 0.01 && payments < 100 * ppy) {
    const interest = balance * r;
    const paidPrincipal = Math.min(payment - interest, balance);
    if (paidPrincipal <= 0) break;
    totalInterest += interest;
    balance -= paidPrincipal;
    payments++;
  }

  return {
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalPaid: Math.round((totalInterest + principal) * 100) / 100,
  };
}

// ─── Land Transfer Tax ───

export function calculateOntarioLTT(price: number): number {
  if (price <= 0) return 0;
  let tax = 0;
  const brackets = [
    { limit: 55000, rate: 0.005 },
    { limit: 250000, rate: 0.01 },
    { limit: 400000, rate: 0.015 },
    { limit: 2000000, rate: 0.02 },
    { limit: Infinity, rate: 0.025 },
  ];

  let prev = 0;
  for (const b of brackets) {
    if (price <= prev) break;
    const taxable = Math.min(price, b.limit) - prev;
    tax += taxable * b.rate;
    prev = b.limit;
  }

  return Math.round(tax * 100) / 100;
}

export function calculateTorontoMLTT(price: number): number {
  if (price <= 0) return 0;
  let tax = 0;

  // Standard brackets (same as Ontario LTT up to $3M)
  const standardBrackets = [
    { limit: 55000, rate: 0.005 },
    { limit: 250000, rate: 0.01 },
    { limit: 400000, rate: 0.015 },
    { limit: 2000000, rate: 0.02 },
    { limit: 3000000, rate: 0.025 },
  ];

  let prev = 0;
  for (const b of standardBrackets) {
    if (price <= prev) break;
    const taxable = Math.min(price, b.limit) - prev;
    tax += taxable * b.rate;
    prev = b.limit;
  }

  // Luxury brackets above $3M (effective April 1, 2026)
  if (price > 3000000) {
    const luxuryBrackets = [
      { limit: 4000000, rate: 0.044 },
      { limit: 5000000, rate: 0.0545 },
      { limit: 10000000, rate: 0.065 },
      { limit: 20000000, rate: 0.0755 },
      { limit: Infinity, rate: 0.086 },
    ];

    let luxPrev = 3000000;
    for (const b of luxuryBrackets) {
      if (price <= luxPrev) break;
      const taxable = Math.min(price, b.limit) - luxPrev;
      tax += taxable * b.rate;
      luxPrev = b.limit;
    }
  }

  return Math.round(tax * 100) / 100;
}

export function isToronto(location: string): boolean {
  return location === 'Toronto ON';
}

export function getLTTRebate(
  price: number,
  location: string,
  firstTimeBuyer: boolean
): { ontarioRebate: number; torontoRebate: number } {
  let ontarioRebate = 0;
  let torontoRebate = 0;

  if (firstTimeBuyer) {
    ontarioRebate = Math.min(calculateOntarioLTT(price), 4000);
    if (isToronto(location)) {
      torontoRebate = Math.min(calculateTorontoMLTT(price), 4475);
    }
  }

  return { ontarioRebate, torontoRebate };
}

// ─── Closing Costs ───

export function calculateClosingCosts(
  homePrice: number,
  downPayment: number,
  location: string,
  firstTimeBuyer: boolean,
  foreignBuyer: boolean,
  ancillaryCosts: number = 0
): {
  ontarioLTT: number;
  torontoMLTT: number;
  ontarioRebate: number;
  torontoRebate: number;
  foreignSurcharge: number;
  cmhcPST: number;
  ancillary: number;
  total: number;
} {
  const ontarioLTT = calculateOntarioLTT(homePrice);
  const torontoMLTT = isToronto(location) ? calculateTorontoMLTT(homePrice) : 0;
  const { ontarioRebate, torontoRebate } = getLTTRebate(homePrice, location, firstTimeBuyer);

  let foreignSurcharge = 0;
  if (foreignBuyer) {
    foreignSurcharge += homePrice * 0.25; // Ontario NRST
    if (isToronto(location)) {
      foreignSurcharge += homePrice * 0.10; // Toronto MNRST
    }
  }

  const cmhc = getCMHCInsurance(homePrice, downPayment);

  const total =
    ontarioLTT +
    torontoMLTT -
    ontarioRebate -
    torontoRebate +
    foreignSurcharge +
    cmhc.pst +
    ancillaryCosts;

  return {
    ontarioLTT,
    torontoMLTT,
    ontarioRebate,
    torontoRebate,
    foreignSurcharge,
    cmhcPST: cmhc.pst,
    ancillary: ancillaryCosts,
    total: Math.round(total * 100) / 100,
  };
}

// ─── Stress Test ───

export function getStressTestRate(contractRate: number): number {
  return Math.max(contractRate + 0.02, 0.0525);
}

// ─── Maximum Amortization ───

export function getMaxAmortization(
  isInsured: boolean,
  firstTimeBuyer: boolean,
  newlyBuilt: boolean
): number {
  if (!isInsured) return 30;
  if (firstTimeBuyer || newlyBuilt) return 30;
  return 25;
}

// ─── Formatting Utilities ───

export function formatDollars(value: number): string {
  return '$' + Math.round(value).toLocaleString('en-CA');
}

export function formatDollarsCents(value: number): string {
  return (
    '$' +
    value.toLocaleString('en-CA', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

export function formatPercent(value: number, decimals: number = 2): string {
  return value.toFixed(decimals) + '%';
}

export function parseDollarInput(value: string): number {
  return parseFloat(value.replace(/[$,\s]/g, '')) || 0;
}

export function parsePercentInput(value: string): number {
  return parseFloat(value.replace(/[%\s]/g, '')) || 0;
}

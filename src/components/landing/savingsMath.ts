// "How far do my savings go?" for first-time buyers in Ontario. Cash side only: no rates, no income.
// Uses the site's own rules in src/lib/mortgageFormulas.ts (minimum down payment, Ontario and Toronto
// land transfer tax, first-time buyer rebates, CMHC premium and the 8% Ontario tax on it).

import { calculateOntarioLTT, calculateTorontoMLTT, getCMHCInsurance, getMinDownPayment } from "@/lib/mortgageFormulas";

/** Legal fees, title insurance and closing adjustments. Jesse's usual estimate. */
export const OTHER_COSTS = 5000;
const MAX_PRICE = 6_000_000;

export type CashBreakdown = {
  price: number;
  down: number;
  lttGross: number;
  rebates: number;
  lttNet: number;
  insurancePremium: number;
  insuranceTax: number;
  other: number;
  total: number;
};

/** Cash a first-time buyer needs on closing day at a given price, with the minimum down payment. */
export function cashNeeded(price: number, toronto: boolean): CashBreakdown {
  if (price <= 0) return { price: 0, down: 0, lttGross: 0, rebates: 0, lttNet: 0, insurancePremium: 0, insuranceTax: 0, other: 0, total: 0 };
  const down = getMinDownPayment(price);
  const ontario = calculateOntarioLTT(price);
  const city = toronto ? calculateTorontoMLTT(price) : 0;
  const rebates = Math.min(ontario, 4000) + (toronto ? Math.min(city, 4475) : 0);
  const insurance = getCMHCInsurance(price, down, 25);
  const lttNet = ontario + city - rebates;
  return {
    price,
    down,
    lttGross: ontario + city,
    rebates,
    lttNet,
    insurancePremium: insurance.premium,
    insuranceTax: insurance.pst,
    other: OTHER_COSTS,
    total: down + lttNet + insurance.pst + OTHER_COSTS,
  };
}

/**
 * The highest price (rounded down to the nearest $5,000) whose closing-day cash fits in `savings`.
 * Cash needed only goes up as the price goes up, so a binary search is safe.
 */
export function maxPrice(savings: number, toronto: boolean): number {
  if (!(savings > OTHER_COSTS)) return 0;
  if (cashNeeded(MAX_PRICE, toronto).total <= savings) return MAX_PRICE;
  let lo = 0;
  let hi = MAX_PRICE;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (cashNeeded(mid, toronto).total <= savings) lo = mid;
    else hi = mid;
  }
  return Math.floor(lo / 5000) * 5000;
}

export const MAX_PRICE_CAP = MAX_PRICE;

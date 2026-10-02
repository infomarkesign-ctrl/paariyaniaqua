import type { Product } from '@/types';

function getBaseUnitCount(unitLabel: string): number {
  const match = unitLabel.match(/(\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : 1;
}

function getPackagingMultiplier(
  option: string,
  allOptions: string[],
  baseUnitCount: number,
): number {
  const gramsMatch = option.match(/(\d+(?:\.\d+)?)\s*g(?:ram)?s?\b/i);
  if (gramsMatch) return parseFloat(gramsMatch[1]) / 1000;

  const numMatch = option.match(/(\d+(?:\.\d+)?)/);
  if (numMatch) {
    return parseFloat(numMatch[1]) / baseUnitCount;
  }

  // Plain "Bulk" / "Bulk crate" with no explicit size — treat as double the
  // largest explicitly-sized tier for this product, at a further volume discount.
  const explicitMultipliers = allOptions
    .filter((o) => o !== option && /\d/.test(o))
    .map((o) => getPackagingMultiplier(o, allOptions, baseUnitCount));
  const maxExplicit = explicitMultipliers.length ? Math.max(...explicitMultipliers) : 1;
  return Math.max(2, maxExplicit * 2);
}

function volumeDiscount(multiplier: number): number {
  if (multiplier <= 1) return 1;
  return 1 - Math.min(0.2, 0.03 * (multiplier - 1));
}

/** Fixed price for one unit of the given packaging option — deterministic, no ranges. */
export function getUnitPrice(product: Product, packaging: string): number {
  const baseUnitCount = getBaseUnitCount(product.unit_label);
  const multiplier = getPackagingMultiplier(packaging, product.packaging_options, baseUnitCount);
  const raw = product.base_price * multiplier * volumeDiscount(multiplier);
  return Math.max(5, Math.round(raw / 5) * 5);
}

/** Fixed total for the chosen packaging option and quantity. */
export function getLineTotal(product: Product, packaging: string, quantity: number): number {
  return getUnitPrice(product, packaging) * quantity;
}

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

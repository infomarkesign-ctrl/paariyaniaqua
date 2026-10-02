const MIN_QUANTITY_LIMIT = 5;
const MAX_QUANTITY_LIMIT = 10;

/**
 * Deterministic per-product order cap (5-10 units), derived from the
 * product id so it stays stable across renders/sessions without needing
 * to store it anywhere. Larger bulk orders should go through Enquire/Contact.
 */
export function getProductQuantityLimit(productId: string): number {
  let hash = 0;
  for (let i = 0; i < productId.length; i++) {
    hash = (hash * 31 + productId.charCodeAt(i)) >>> 0;
  }
  const range = MAX_QUANTITY_LIMIT - MIN_QUANTITY_LIMIT + 1;
  return MIN_QUANTITY_LIMIT + (hash % range);
}

import { storeConfig } from "./config";
import { findPromo } from "./promo";
import type { ProductSummary } from "./types";

export const GIFT_WRAP_PRICE = 6;

export type ShippingMethod = "standard" | "express";

export type PricedLine = {
  id: string;
  slug: string;
  sizeMl: number;
  concentration?: string;
  quantity: number;
  product: ProductSummary;
  unitPrice: number;
  lineTotal: number;
};

export type Totals = {
  subtotal: number;
  discount: number;
  shipping: number;
  giftWrap: number;
  total: number;
  /** Amount still needed for free standard delivery; 0 once reached. */
  toFreeShipping: number;
  freeShipping: boolean;
  promoLabel: string | null;
};

const round = (n: number) => Math.round(n * 100) / 100;

export function priceLine(
  line: { id: string; slug: string; sizeMl: number; concentration?: string; quantity: number },
  product: ProductSummary | undefined,
): PricedLine | null {
  if (!product) return null;
  const size =
    product.sizes.find((s) => s.ml === line.sizeMl && (s.concentration ?? "") === (line.concentration ?? "")) ??
    product.sizes.find((s) => s.ml === line.sizeMl);
  if (!size) return null;
  return { ...line, product, unitPrice: size.price, lineTotal: round(size.price * line.quantity) };
}

/** All money maths in one place; prices include VAT. */
export function computeTotals(
  lines: PricedLine[],
  opts: { promoCode: string | null; giftWrap: boolean; shippingMethod?: ShippingMethod },
): Totals {
  const subtotal = round(lines.reduce((s, l) => s + l.lineTotal, 0));
  const promo = findPromo(opts.promoCode);
  let discount = 0;
  if (promo?.kind === "percent") discount = round((subtotal * promo.value) / 100);
  if (promo?.kind === "amount" && subtotal >= promo.minSubtotal) discount = Math.min(promo.value, subtotal);

  const afterDiscount = subtotal - discount;
  const freeShipping = afterDiscount >= storeConfig.freeShippingThreshold || promo?.kind === "shipping";
  const method = opts.shippingMethod ?? "standard";
  const shipping = lines.length === 0 ? 0 : method === "express" ? storeConfig.expressShipping : freeShipping ? 0 : storeConfig.standardShipping;
  const giftWrap = opts.giftWrap && lines.length ? GIFT_WRAP_PRICE : 0;

  return {
    subtotal,
    discount,
    shipping,
    giftWrap,
    total: round(afterDiscount + shipping + giftWrap),
    toFreeShipping: freeShipping ? 0 : round(storeConfig.freeShippingThreshold - afterDiscount),
    freeShipping,
    promoLabel: promo ? `${promo.code}, ${promo.label.toLowerCase()}` : null,
  };
}

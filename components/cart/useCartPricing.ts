"use client";

import { useSyncExternalStore } from "react";
import { computeTotals, priceLine, type PricedLine, type ShippingMethod } from "@/lib/pricing";
import { useCart } from "@/store/cart";
import { useProducts } from "./useProducts";

const subscribeHydration = (cb: () => void) => useCart.persist.onFinishHydration(cb);

/** False on the server and until the saved cart has been read from storage. */
export function useCartHydrated() {
  return useSyncExternalStore(subscribeHydration, () => useCart.persist.hasHydrated(), () => false);
}

/** Cart lines joined with product data, plus every total, in one place. */
export function useCartPricing(shippingMethod: ShippingMethod = "standard") {
  const hydrated = useCartHydrated();
  const lines = useCart((s) => s.lines);
  const promoCode = useCart((s) => s.promoCode);
  const giftWrap = useCart((s) => s.giftWrap);
  const { products, loading } = useProducts(lines.map((l) => l.slug));

  const priced = lines.map((l) => priceLine(l, products.get(l.slug))).filter((l): l is PricedLine => l != null);
  const totals = computeTotals(priced, { promoCode, giftWrap, shippingMethod });

  return {
    ready: hydrated && !loading,
    hydrated,
    lines,
    priced,
    totals,
    count: lines.reduce((n, l) => n + l.quantity, 0),
  };
}

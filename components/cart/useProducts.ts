"use client";

import { useEffect, useState } from "react";
import { fetchSummaries } from "@/lib/api";
import type { ProductSummary } from "@/lib/types";

// Product summaries are fetched once per session and shared by the cart
// drawer, cart page, checkout and wishlist.
const cache = new Map<string, ProductSummary>();
const listeners = new Set<() => void>();

/** Returns the summaries known so far for `slugs`, fetching the missing ones. */
export function useProducts(slugs: string[]) {
  const [, rerender] = useState(0);
  const key = [...new Set(slugs)].sort().join(",");

  useEffect(() => {
    const notify = () => rerender((n) => n + 1);
    listeners.add(notify);
    return () => {
      listeners.delete(notify);
    };
  }, []);

  useEffect(() => {
    const missing = key ? key.split(",").filter((s) => !cache.has(s)) : [];
    if (!missing.length) return;
    const controller = new AbortController();
    fetchSummaries(missing, controller.signal)
      .then((list) => {
        list.forEach((p) => cache.set(p.slug, p));
        listeners.forEach((l) => l());
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, [key]);

  const map = new Map<string, ProductSummary>();
  for (const s of slugs) {
    const p = cache.get(s);
    if (p) map.set(s, p);
  }
  return { products: map, loading: slugs.some((s) => !cache.has(s)) };
}

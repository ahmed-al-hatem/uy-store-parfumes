import type { Suggestions } from "./shop/engine";
import { serializeShop, type ProductPage, type ShopParams } from "./shop/query";
import type { Gender, ProductSummary } from "./types";

// Browser side of the mock API. Every UI fetch goes through here, so the mock
// route handlers can later be replaced by Shopify Storefront or a custom
// backend without touching components.

async function get<T>(path: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(path, { signal, headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`${path} failed with ${res.status}`);
  return res.json() as Promise<T>;
}

export function fetchProducts(
  params: Omit<ShopParams, "page">,
  range: { offset: number; limit: number; category?: Gender },
  signal?: AbortSignal,
) {
  const qs = serializeShop({ ...params, page: null });
  const extra = new URLSearchParams({ offset: String(range.offset), limit: String(range.limit) });
  if (range.category) extra.set("category", range.category);
  const sep = qs ? "&" : "?";
  return get<ProductPage<ProductSummary>>(`/api/products${qs}${sep}${extra}`, signal);
}

export function fetchSuggestions(q: string, signal?: AbortSignal) {
  return get<Suggestions>(`/api/search?q=${encodeURIComponent(q)}`, signal);
}

export function fetchSummaries(slugs: string[], signal?: AbortSignal) {
  return get<ProductSummary[]>(`/api/products/lookup?slugs=${slugs.map(encodeURIComponent).join(",")}`, signal);
}

export type { Suggestions };

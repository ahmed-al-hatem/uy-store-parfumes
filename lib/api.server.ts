import "server-only";
import { productBySlug, products, getReviews, toSummary } from "@/data/catalog";
import { queryProducts, suggest } from "./shop/engine";
import type { ShopQuery } from "./shop/query";

// Server side of the mock API. Server Components call these directly; the
// route handlers in app/api expose the same functions to the browser.

export const listProducts = (query: ShopQuery) => queryProducts(query);
export const searchSuggestions = (q: string) => suggest(q);
export const getProduct = (slug: string) => productBySlug.get(slug) ?? null;
export const getProductReviews = (slug: string) => getReviews(slug);
export const allProductSlugs = () => products.map((p) => p.slug);
export const getSummaries = (slugs: string[]) =>
  slugs.map((s) => productBySlug.get(s)).filter((p) => p != null).map(toSummary);

/** Same family first, then the most shared notes, then popularity. */
export function getRelated(slug: string, limit = 5) {
  const base = productBySlug.get(slug);
  if (!base) return [];
  const own = new Set([...base.notes.top, ...base.notes.heart, ...base.notes.base].map((n) => n.toLowerCase()));
  return products
    .filter((p) => p.slug !== slug)
    .map((p) => {
      const shared = [...p.notes.top, ...p.notes.heart, ...p.notes.base].filter((n) => own.has(n.toLowerCase())).length;
      return { p, score: (p.family === base.family ? 10 : 0) + shared * 2 + (p.gender === base.gender || p.gender === "unisex" ? 1 : 0) };
    })
    .sort((a, b) => b.score - a.score || b.p.sold - a.p.sold)
    .slice(0, limit)
    .map(({ p }) => toSummary(p));
}

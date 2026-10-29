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

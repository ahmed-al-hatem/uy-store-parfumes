import "server-only";
import { brands } from "@/data/brands";
import { products, toSummary } from "@/data/catalog";
import { concentrations, families, genderLabels } from "@/data/taxonomy";
import { normalize, scoreDoc, tokens } from "@/lib/search";
import type { Product, ProductSummary } from "@/lib/types";
import type { FacetOption, Facets, ProductPage, ShopQuery } from "./query";

// In-memory query engine standing in for a commerce backend. lib/api.server.ts
// is the only caller; swap this module for Shopify or a custom API later.

const docs = new Map(
  products.map((p) => [
    p.slug,
    { name: normalize(p.name), brand: normalize(p.brandName), notes: normalize([...p.notes.top, ...p.notes.heart, ...p.notes.base].join(" ")) },
  ]),
);

const allNotes = (p: Product) => [...p.notes.top, ...p.notes.heart, ...p.notes.base];

type Key = "gender" | "brand" | "family" | "notes" | "concentration" | "size" | "price" | "rating" | "inStock";

/** True when `p` passes every filter except `skip` (disjunctive facet counting). */
function passes(p: Product, q: ShopQuery, skip?: Key) {
  if (q.category && p.gender !== q.category) return false;
  if (skip !== "gender" && q.gender.length && !q.gender.includes(p.gender)) return false;
  if (skip !== "brand" && q.brand.length && !q.brand.includes(p.brand)) return false;
  if (skip !== "family" && q.family.length && !q.family.includes(p.family)) return false;
  if (skip !== "notes" && q.notes.length) {
    const own = allNotes(p).map(normalize);
    if (!q.notes.every((n) => own.includes(normalize(n)))) return false;
  }
  if (skip !== "concentration" && q.concentration.length) {
    const own = new Set(p.sizes.map((s) => s.concentration ?? p.concentration));
    if (!q.concentration.some((c) => own.has(c as Product["concentration"]))) return false;
  }
  if (skip !== "size" && q.size.length && !p.sizes.some((s) => q.size.includes(s.ml))) return false;
  if (skip !== "price") {
    if (q.priceMin != null && !p.sizes.some((s) => s.price >= q.priceMin!)) return false;
    if (q.priceMax != null && p.priceFrom > q.priceMax) return false;
  }
  if (skip !== "rating" && q.rating != null && p.rating < q.rating) return false;
  if (skip !== "inStock" && q.inStock && !p.inStock) return false;
  return true;
}

function count<T extends string | number>(list: Product[], pick: (p: Product) => T[] | T) {
  const m = new Map<T, number>();
  for (const p of list) {
    const v = pick(p);
    for (const k of new Set(Array.isArray(v) ? v : [v])) m.set(k, (m.get(k) ?? 0) + 1);
  }
  return m;
}

function facets(base: Product[], q: ShopQuery): Facets {
  const without = (k: Key) => base.filter((p) => passes(p, q, k));
  const opts = (m: Map<string, number>, label: (v: string) => string, selected: string[]): FacetOption[] => {
    const keys = new Set([...m.keys(), ...selected]);
    return [...keys].map((value) => ({ value, label: label(value), count: m.get(value) ?? 0 }));
  };

  const brandCounts = count(without("brand"), (p) => p.brand);
  const noteCounts = count(without("notes"), (p) => allNotes(p).map((n) => n.toLowerCase()));
  const sizeCounts = count(without("size"), (p) => p.sizes.map((s) => s.ml));
  const priced = without("price");
  const rated = without("rating");

  // Fixed lists keep their order and show zero-count options (disabled in the UI).
  const genderCounts = count(without("gender"), (p) => p.gender);
  const familyCounts = count(without("family"), (p) => p.family);

  return {
    gender: (Object.keys(genderLabels) as (keyof typeof genderLabels)[]).map((g) => ({ value: g, label: genderLabels[g], count: genderCounts.get(g) ?? 0 })),
    brand: opts(brandCounts, (v) => brands.find((b) => b.slug === v)?.name ?? v, q.brand).sort((a, b) => a.label.localeCompare(b.label)),
    family: families.map((f) => ({ value: f.slug, label: f.label, count: familyCounts.get(f.slug) ?? 0 })),
    notes: opts(noteCounts, (v) => v, q.notes.map((n) => n.toLowerCase()))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
      .filter((o, i) => i < 24 || q.notes.map((n) => n.toLowerCase()).includes(o.value)),
    concentration: concentrations.map((c) => ({
      value: c.slug,
      label: c.label,
      count: without("concentration").filter((p) => p.sizes.some((s) => (s.concentration ?? p.concentration) === c.slug)).length,
    })),
    size: [...new Map([...sizeCounts].sort(([a], [b]) => a - b)).entries()].map(([ml, n]) => ({ value: String(ml), label: `${ml} ml`, count: n })),
    price: {
      min: priced.length ? Math.floor(Math.min(...priced.map((p) => p.priceFrom))) : 0,
      max: priced.length ? Math.ceil(Math.max(...priced.flatMap((p) => p.sizes.map((s) => s.price)))) : 0,
    },
    ratingAtLeast: { 4: rated.filter((p) => p.rating >= 4).length, 3: rated.filter((p) => p.rating >= 3).length },
    inStock: without("inStock").filter((p) => p.inStock).length,
  };
}

const featuredRank = (p: Product) => (p.featured ? 1000 : 0) + p.sold;

export function queryProducts(q: ShopQuery): ProductPage<ProductSummary> {
  const queryTokens = tokens(q.q);
  const scored = products
    .map((p) => ({ p, score: scoreDoc(docs.get(p.slug)!, queryTokens) }))
    .filter((x) => x.score > 0);
  const base = scored.map((x) => x.p);
  const matched = scored.filter((x) => passes(x.p, q));

  const sorted = matched.sort((a, b) => {
    switch (q.sort) {
      case "newest":
        return b.p.addedAt.localeCompare(a.p.addedAt);
      case "price-asc":
        return a.p.priceFrom - b.p.priceFrom;
      case "price-desc":
        return b.p.priceFrom - a.p.priceFrom;
      case "rating":
        return b.p.rating - a.p.rating || b.p.reviewCount - a.p.reviewCount;
      case "bestselling":
        return b.p.sold - a.p.sold;
      default:
        return queryTokens.length ? b.score - a.score || featuredRank(b.p) - featuredRank(a.p) : featuredRank(b.p) - featuredRank(a.p);
    }
  });

  return {
    items: sorted.slice(q.offset, q.offset + q.limit).map((x) => toSummary(x.p)),
    total: sorted.length,
    offset: q.offset,
    facets: facets(base, q),
  };
}

export type Suggestions = {
  products: Pick<ProductSummary, "slug" | "name" | "brandName" | "priceFrom" | "images">[];
  brands: { slug: string; name: string }[];
  notes: string[];
};

export function suggest(query: string): Suggestions {
  const t = tokens(query);
  if (!t.length) return { products: [], brands: [], notes: [] };
  const ranked = products
    .map((p) => ({ p, s: scoreDoc(docs.get(p.slug)!, t) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s || b.p.sold - a.p.sold)
    .slice(0, 5)
    .map(({ p }) => ({ slug: p.slug, name: p.name, brandName: p.brandName, priceFrom: p.priceFrom, images: p.images.slice(0, 1) }));
  const q = t.join(" ");
  const brandHits = brands.filter((b) => normalize(b.name).includes(q)).slice(0, 3).map((b) => ({ slug: b.slug, name: b.name }));
  const noteHits = [...new Set(products.flatMap(allNotes).map((n) => n.toLowerCase()))]
    .filter((n) => normalize(n).includes(q))
    .slice(0, 4);
  return { products: ranked, brands: brandHits, notes: noteHits };
}

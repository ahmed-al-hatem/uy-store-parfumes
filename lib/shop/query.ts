import {
  createLoader,
  createSerializer,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  type inferParserType,
} from "nuqs/server";
import type { Concentration, Family, Gender } from "@/lib/types";

// The shop's URL state. Shared by the client grid (nuqs hooks), the route
// handler (createLoader) and links that build shop URLs (serializer).

export const SORTS = ["featured", "newest", "price-asc", "price-desc", "rating", "bestselling"] as const;
export type SortKey = (typeof SORTS)[number];

export const sortLabels: Record<SortKey, string> = {
  featured: "Featured",
  newest: "Newest",
  "price-asc": "Price, low to high",
  "price-desc": "Price, high to low",
  rating: "Best rated",
  bestselling: "Best selling",
};

export const PAGE_SIZE = 15;

const list = parseAsArrayOf(parseAsString, ",").withDefault([]);

export const shopParsers = {
  q: parseAsString.withDefault(""),
  gender: list,
  brand: list,
  family: list,
  notes: list,
  concentration: list,
  size: parseAsArrayOf(parseAsInteger, ",").withDefault([]),
  priceMin: parseAsInteger,
  priceMax: parseAsInteger,
  rating: parseAsInteger,
  inStock: parseAsBoolean.withDefault(false),
  sort: parseAsStringLiteral(SORTS).withDefault("featured"),
  page: parseAsInteger.withDefault(1),
};

export type ShopParams = inferParserType<typeof shopParsers>;

/** Everything that narrows the result set (page and sort excluded). */
export const FILTER_KEYS = ["gender", "brand", "family", "notes", "concentration", "size", "priceMin", "priceMax", "rating", "inStock"] as const;

export type ShopQuery = Omit<ShopParams, "page"> & {
  /** Fixed by the route on /shop/[category]. */
  category?: Gender;
  offset: number;
  limit: number;
};

export const loadShopParams = createLoader(shopParsers);
export const serializeShop = createSerializer(shopParsers);

export function countActiveFilters(p: Pick<ShopParams, (typeof FILTER_KEYS)[number]>) {
  return (
    p.gender.length +
    p.brand.length +
    p.family.length +
    p.notes.length +
    p.concentration.length +
    p.size.length +
    (p.priceMin != null || p.priceMax != null ? 1 : 0) +
    (p.rating != null ? 1 : 0) +
    (p.inStock ? 1 : 0)
  );
}

export const defaultParams: ShopParams = {
  q: "",
  gender: [],
  brand: [],
  family: [],
  notes: [],
  concentration: [],
  size: [],
  priceMin: null,
  priceMax: null,
  rating: null,
  inStock: false,
  sort: "featured",
  page: 1,
};

export type FacetOption = { value: string; label: string; count: number };
export type Facets = {
  gender: FacetOption[];
  brand: FacetOption[];
  family: FacetOption[];
  notes: FacetOption[];
  concentration: FacetOption[];
  size: FacetOption[];
  price: { min: number; max: number };
  ratingAtLeast: { 4: number; 3: number };
  inStock: number;
};

export type PriceBucket = { label: string; min: number | null; max: number | null };
export const priceBuckets: PriceBucket[] = [
  { label: "Under €50", min: null, max: 49 },
  { label: "€50 to €100", min: 50, max: 100 },
  { label: "€100 to €150", min: 100, max: 150 },
  { label: "€150 and above", min: 150, max: null },
];

export type ProductPage<T> = { items: T[]; total: number; offset: number; facets: Facets };

// Narrowing helpers so the engine can trust literal unions from the URL.
export const asGender = (v: string): v is Gender => v === "women" || v === "men" || v === "unisex";
export const asFamily = (v: string): v is Family =>
  ["floral", "woody", "amber", "fresh", "aromatic", "chypre", "leather", "gourmand"].includes(v);
export const asConcentration = (v: string): v is Concentration => ["Cologne", "EDT", "EDP", "Parfum", "Extrait"].includes(v);

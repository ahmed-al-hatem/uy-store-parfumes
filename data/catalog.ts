import "server-only";
import { brandBySlug } from "./brands";
import { productImages } from "./product-images.generated";
import { productRecords } from "./products";
import { buildReviews } from "./reviews";
import type { Product, ProductSummary, Review } from "@/lib/types";

// Joins the hand-written records with generated image data, brands and reviews.
// Server-only: client code receives ProductSummary objects through lib/api.

const reviewsBySlug = new Map<string, Review[]>(productRecords.map((p) => [p.slug, buildReviews(p)]));

export const products: Product[] = productRecords.map((record) => {
  const images = productImages[record.slug];
  if (!images?.length) throw new Error(`No photos for "${record.slug}". Run npm run images.`);
  const brand = brandBySlug.get(record.brand);
  if (!brand) throw new Error(`Unknown brand "${record.brand}" on "${record.slug}".`);
  const reviews = reviewsBySlug.get(record.slug) ?? [];
  const rating = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
  return {
    ...record,
    images,
    brandName: brand.name,
    rating: Math.round(rating * 10) / 10,
    reviewCount: reviews.length,
    priceFrom: Math.min(...record.sizes.map((s) => s.price)),
    inStock: record.sizes.some((s) => s.stock > 0),
  };
});

const missing = Object.keys(productImages).filter((slug) => !products.some((p) => p.slug === slug));
if (missing.length) throw new Error(`Photos without product copy: ${missing.join(", ")}`);

export const productBySlug = new Map(products.map((p) => [p.slug, p]));

export const getReviews = (slug: string) => reviewsBySlug.get(slug) ?? [];

export function toSummary(p: Product): ProductSummary {
  return {
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    brandName: p.brandName,
    concentration: p.concentration,
    gender: p.gender,
    family: p.family,
    priceFrom: p.priceFrom,
    rating: p.rating,
    reviewCount: p.reviewCount,
    inStock: p.inStock,
    letter: p.letter,
    // Cards show at most two photos (second on hover).
    images: p.images.slice(0, 2),
    sizes: p.sizes,
    topNotes: p.notes.top,
  };
}

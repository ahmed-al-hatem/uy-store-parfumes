/** One product photo, copied unchanged from ./perfumes. */
export type SourceImage = {
  src: string;
  /** Original file name in ./perfumes. */
  source: string;
  width: number;
  height: number;
  /** Mean colour of the photo's outer edge; fills the frame around the photo. */
  frame: string;
  /** 0–255 luminance of `frame`, used to pick a legible caption tone. */
  luminance: number;
  blurDataURL: string;
};

export type Gender = "women" | "men" | "unisex";
export type Concentration = "Cologne" | "EDT" | "EDP" | "Parfum" | "Extrait";
export type Family = "floral" | "woody" | "amber" | "fresh" | "aromatic" | "chypre" | "leather" | "gourmand";
export type Season = "spring" | "summer" | "autumn" | "winter";

export type ProductSize = {
  ml: number;
  price: number;
  stock: number;
  /** Set when a size is a different concentration from the product default (e.g. Sauvage Parfum). */
  concentration?: Concentration;
};

export type Notes = { top: string[]; heart: string[]; base: string[] };

export type ProductRecord = {
  slug: string;
  name: string;
  brand: string;
  concentration: Concentration;
  gender: Gender;
  family: Family;
  notes: Notes;
  sizes: ProductSize[];
  /** 1–5 */
  longevity: number;
  /** 1–5 */
  sillage: number;
  seasons: Season[];
  story: string;
  /** ISO date the product joined the store; drives "newest". */
  addedAt: string;
  /** Units sold in the last 90 days; drives "best selling". */
  sold: number;
  featured?: boolean;
  collections: string[];
  /** Letter mark for the house's own line (DESIGN.md letter system). */
  letter?: string;
};

export type Product = ProductRecord & {
  images: SourceImage[];
  brandName: string;
  rating: number;
  reviewCount: number;
  priceFrom: number;
  inStock: boolean;
};

export type Brand = { slug: string; name: string; origin: string; note: string };

export type Review = {
  id: string;
  productSlug: string;
  author: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
};

/** Card-sized product for listings and the API (no story, no reviews). */
export type ProductSummary = Pick<
  Product,
  "slug" | "name" | "brand" | "brandName" | "concentration" | "gender" | "family" | "priceFrom" | "rating" | "reviewCount" | "inStock" | "letter"
> & { images: SourceImage[]; sizes: ProductSize[]; topNotes: string[] };

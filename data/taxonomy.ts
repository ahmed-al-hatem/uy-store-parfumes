import type { Concentration, Family, Gender, Season } from "@/lib/types";

export type Category = { slug: Gender; title: string; heading: string; intro: string };

/** /shop/[category] pages. */
export const categories: Category[] = [
  {
    slug: "women",
    title: "For her",
    heading: "Fragrance for her",
    intro: "Rose and iris, white flowers and warm resins: the classics, the new and our own letters.",
  },
  {
    slug: "men",
    title: "For him",
    heading: "Fragrance for him",
    intro: "Clean woods, aromatic herbs and the occasional leather jacket, from day to late.",
  },
  {
    slug: "unisex",
    title: "Shared",
    heading: "Shared fragrance",
    intro: "Colognes and studio blends written for anyone, best borrowed back and forth.",
  },
];

export const genderLabels: Record<Gender, string> = { women: "Women", men: "Men", unisex: "Unisex" };

export const families: { slug: Family; label: string; description: string }[] = [
  { slug: "floral", label: "Floral", description: "Rose, jasmine, tuberose and the white flowers." },
  { slug: "woody", label: "Woody", description: "Cedar, vetiver and sandalwood, dry and composed." },
  { slug: "amber", label: "Amber", description: "Resins, vanilla and spice; warm and enveloping." },
  { slug: "fresh", label: "Fresh", description: "Citrus, sea air and clean musk." },
  { slug: "aromatic", label: "Aromatic", description: "Lavender, sage and herbs; crisp and confident." },
  { slug: "chypre", label: "Chypre", description: "Citrus over patchouli and moss; elegant contrast." },
  { slug: "leather", label: "Leather", description: "Suede, smoke and soft hide." },
  { slug: "gourmand", label: "Gourmand", description: "Praline, vanilla and the edible." },
];

export const familyLabels = Object.fromEntries(families.map((f) => [f.slug, f.label])) as Record<Family, string>;

export const concentrations: { slug: Concentration; label: string }[] = [
  { slug: "Cologne", label: "Cologne" },
  { slug: "EDT", label: "Eau de toilette" },
  { slug: "EDP", label: "Eau de parfum" },
  { slug: "Parfum", label: "Parfum" },
];

export const seasonLabels: Record<Season, string> = {
  spring: "Spring",
  summer: "Summer",
  autumn: "Autumn",
  winter: "Winter",
};

export type Collection = { slug: string; title: string; description: string };

export const collections: Collection[] = [
  { slug: "icons", title: "The icons", description: "The bottles that changed what perfume could be." },
  { slug: "studio-line", title: "The studio line", description: "Our own small-batch letters, and the quiet houses we found along the way." },
  { slug: "after-dark", title: "After dark", description: "Amber, tobacco and leather for long evenings." },
  { slug: "light-and-air", title: "Light and air", description: "Citrus, sea salt and white flowers for warm days." },
];

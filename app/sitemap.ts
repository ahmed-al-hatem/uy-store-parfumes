import type { MetadataRoute } from "next";
import { categories } from "@/data/taxonomy";
import { allProductSlugs } from "@/lib/api.server";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, siteUrl).toString();
  const pages = ["/", "/shop", "/about", "/shipping-returns", "/faq", "/contact"];
  return [
    ...pages.map((p) => ({ url: url(p), changeFrequency: "weekly" as const, priority: p === "/" ? 1 : 0.6 })),
    ...categories.map((c) => ({ url: url(`/shop/${c.slug}`), changeFrequency: "weekly" as const, priority: 0.7 })),
    ...allProductSlugs().map((slug) => ({ url: url(`/product/${slug}`), changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}

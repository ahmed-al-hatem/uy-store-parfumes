import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShopPage } from "@/components/shop/ShopPage";
import { categories } from "@/data/taxonomy";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[category]">): Promise<Metadata> {
  const { category: slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  return category ? { title: category.heading, description: category.intro } : {};
}

export default async function CategoryPage({ params }: PageProps<"/shop/[category]">) {
  const { category: slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();
  return <ShopPage category={category.slug} heading={category.heading} intro={category.intro} />;
}

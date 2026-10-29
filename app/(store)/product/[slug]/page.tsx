import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/product/Gallery";
import { longevityWords, Meter, sillageWords } from "@/components/product/Meter";
import { NotesPyramid } from "@/components/product/NotesPyramid";
import { ProductAccordions } from "@/components/product/ProductAccordions";
import { ProductRow } from "@/components/product/ProductRow";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { Reviews } from "@/components/product/Reviews";
import { Stars } from "@/components/product/Stars";
import { brandBySlug } from "@/data/brands";
import { categories, familyLabels, genderLabels, seasonLabels } from "@/data/taxonomy";
import { allProductSlugs, getProduct, getProductReviews, getRelated } from "@/lib/api.server";
import { formatPrice, storeConfig } from "@/lib/config";
import { siteUrl } from "@/lib/site";
import type { Product } from "@/lib/types";

export function generateStaticParams() {
  return allProductSlugs().map((slug) => ({ slug }));
}

const firstSentence = (text: string) => text.split(/(?<=\.)\s/)[0];

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  const title = `${product.brandName} ${product.name}`;
  const description = firstSentence(product.story);
  const image = product.images[0];
  return {
    title,
    description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title,
      description,
      url: `/product/${product.slug}`,
      images: [{ url: image.src, width: image.width, height: image.height, alt: `${title}, bottle photograph` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.src] },
  };
}

function jsonLd(product: Product) {
  const prices = product.sizes.map((s) => s.price);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: { "@type": "Brand", name: product.brandName },
    description: product.story,
    image: product.images.map((i) => new URL(i.src, siteUrl).toString()),
    sku: product.slug,
    category: `Fragrance > ${familyLabels[product.family]}`,
    aggregateRating: product.reviewCount
      ? { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviewCount, bestRating: 5, worstRating: 1 }
      : undefined,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: storeConfig.currency,
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: product.sizes.length,
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: new URL(`/product/${product.slug}`, siteUrl).toString(),
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const reviews = getProductReviews(product.slug);
  const related = getRelated(product.slug);
  const category = categories.find((c) => c.slug === product.gender);
  const brand = brandBySlug.get(product.brand);
  const fullName = `${product.brandName} ${product.name}`;

  const details: [string, string][] = [
    ["House", `${product.brandName}${brand && brand.origin !== "Unknown" ? `, ${brand.origin}` : ""}`],
    ["Family", familyLabels[product.family]],
    ["Worn by", genderLabels[product.gender]],
    ["Seasons", product.seasons.map((s) => seasonLabels[s]).join(", ")],
    ["Sizes", product.sizes.map((s) => `${s.ml} ml${s.concentration ? ` ${s.concentration}` : ""}`).join(", ")],
  ];

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(product)).replace(/</g, "\\u003c") }}
      />

      <nav aria-label="Breadcrumb" className="px-16 py-10 lg:px-32">
        <ol className="flex flex-wrap gap-x-7 text-caption">
          <li>
            <Link href="/shop" className="decoration-1 underline-offset-4 hover:underline">
              Shop
            </Link>
            <span aria-hidden="true"> /</span>
          </li>
          {category && (
            <li>
              <Link href={`/shop/${category.slug}`} className="decoration-1 underline-offset-4 hover:underline">
                {category.title}
              </Link>
              <span aria-hidden="true"> /</span>
            </li>
          )}
          <li aria-current="page">{product.name}</li>
        </ol>
      </nav>

      <div className="border-t border-soot lg:grid lg:grid-cols-2">
        <div className="lg:border-e lg:border-soot">
          <Gallery images={product.images} name={fullName} />
        </div>

        <div className="px-16 pb-30 pt-30 lg:sticky lg:top-[var(--header-h)] lg:self-start lg:px-32 lg:pt-32">
          <Link href={`/shop?brand=${product.brand}`} className="text-caption uppercase decoration-1 underline-offset-4 hover:underline">
            {product.brandName}
          </Link>
          <h1 className="pt-7 text-subheading tracking-display lg:text-heading">
            {product.letter && <span className="sr-only">UY </span>}
            {product.name}
          </h1>
          {product.reviewCount > 0 && (
            <a href="#reviews" className="mt-10 inline-flex min-h-touch items-center gap-7 text-caption decoration-1 underline-offset-4 hover:underline">
              <Stars rating={product.rating} />
              <span>
                {product.rating.toFixed(1)} from {product.reviewCount} reviews
              </span>
            </a>
          )}

          <div className="pt-13">
            <PurchasePanel
              slug={product.slug}
              name={product.name}
              brandName={product.brandName}
              concentration={product.concentration}
              sizes={product.sizes}
            />
          </div>

          <div className="pt-30">
            <ProductAccordions
              sections={[
                {
                  id: "description",
                  title: "Description",
                  content: (
                    <>
                      <p className="max-w-[60ch] text-body">{product.story}</p>
                      <dl className="grid grid-cols-[96px_1fr] gap-x-13 gap-y-6 pt-17">
                        {details.map(([k, v]) => (
                          <div key={k} className="contents">
                            <dt className="text-caption uppercase">{k}</dt>
                            <dd>{v}</dd>
                          </div>
                        ))}
                      </dl>
                    </>
                  ),
                },
                {
                  id: "notes",
                  title: "Notes",
                  content: (
                    <dl className="grid grid-cols-[96px_1fr] gap-x-13 gap-y-6">
                      {(["top", "heart", "base"] as const).map((tier) => (
                        <div key={tier} className="contents">
                          <dt className="text-caption uppercase">{tier}</dt>
                          <dd>{product.notes[tier].join(", ")}</dd>
                        </div>
                      ))}
                    </dl>
                  ),
                },
                {
                  id: "shipping",
                  title: "Shipping",
                  content: (
                    <p className="max-w-[60ch]">
                      Standard delivery in 2 to 3 working days, {formatPrice(storeConfig.standardShipping)}, free over{" "}
                      {formatPrice(storeConfig.freeShippingThreshold)}. Express next working day, {formatPrice(storeConfig.expressShipping)}, when
                      ordered before 14:00. Every order is wrapped in the studio with two samples of your choice.{" "}
                      <Link href="/shipping-returns" className="underline decoration-1 underline-offset-4">
                        Shipping and returns
                      </Link>
                    </p>
                  ),
                },
                {
                  id: "returns",
                  title: "Returns",
                  content: (
                    <p className="max-w-[60ch]">
                      Unopened bottles can be returned within 30 days for a full refund. Not sure? Try the sample first: open it, and if the
                      fragrance is not for you, return the sealed bottle at no cost.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>

      <section aria-labelledby="composition-title" className="border-t border-soot px-16 pt-section lg:px-32">
        <h2 id="composition-title" className="text-subheading tracking-display">
          How it unfolds
        </h2>
        <div className="grid gap-30 pt-30 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-32">
          <NotesPyramid notes={product.notes} />
          <div className="flex flex-col gap-30">
            <Meter label="Longevity" value={product.longevity} words={longevityWords} />
            <Meter label="Sillage" value={product.sillage} words={sillageWords} />
            <div>
              <p className="pb-7 text-caption uppercase">Best worn in</p>
              <p className="text-body-sm">{product.seasons.map((s) => seasonLabels[s]).join(", ")}</p>
            </div>
          </div>
        </div>
      </section>

      {reviews.length > 0 && <Reviews reviews={reviews} rating={product.rating} />}

      <ProductRow id="related-title" title="You may also like" products={related} />
    </article>
  );
}

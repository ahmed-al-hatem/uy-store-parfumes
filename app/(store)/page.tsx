import Link from "next/link";
import type { CSSProperties } from "react";
import { BestSellers } from "@/components/home/BestSellers";
import { FamilyIndex, type FamilyEntry } from "@/components/home/FamilyIndex";
import { HeroFrame } from "@/components/home/HeroFrame";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ProductFrame } from "@/components/product/ProductFrame";
import { Stars } from "@/components/product/Stars";
import { atmosphereImages, productImages } from "@/data/product-images.generated";
import { collections, families } from "@/data/taxonomy";
import { getProduct, getProductReviews, listProducts } from "@/lib/api.server";
import { defaultParams } from "@/lib/shop/query";

const HERO = "marc-jacobs-daisy";

const COLLECTION_PHOTOS: Record<string, string> = {
  icons: "chanel-n5",
  "studio-line": "amber-oval-perfume",
  "after-dark": "chanel-coco-noir",
  "light-and-air": "jo-malone-wood-sage-sea-salt",
};

const FAMILY_PHOTOS: Record<string, string> = {
  floral: "miss-dior",
  woody: "terre-d-hermes",
  amber: "red-diamond",
  fresh: "zara-seoul",
  aromatic: "hermes-h24",
  chypre: "chanel-coco-mademoiselle",
  leather: "zara-vibrant-leather",
  gourmand: "lancome-la-vie-est-belle",
};

const TESTIMONIALS = ["chanel-coco-mademoiselle", "maison-margiela-replica-jazz-club", "jo-malone-wood-sage-sea-salt"];

const name = (slug: string) => {
  const p = getProduct(slug);
  return p ? `${p.brandName} ${p.name}` : slug;
};

export default function HomePage() {
  const { page: _page, ...filters } = defaultParams;
  const all = listProducts({ ...filters, offset: 0, limit: 0 });
  const bestSellers = listProducts({ ...filters, sort: "bestselling", offset: 0, limit: 10 }).items;

  const familyEntries: FamilyEntry[] = families
    .map((f) => ({
      slug: f.slug,
      label: f.label,
      description: f.description,
      count: all.facets.family.find((o) => o.value === f.slug)?.count ?? 0,
      image: productImages[FAMILY_PHOTOS[f.slug]][0],
      imageAlt: `${name(FAMILY_PHOTOS[f.slug])}, a ${f.label.toLowerCase()} fragrance`,
    }))
    .filter((f) => f.count > 0);

  const quotes = TESTIMONIALS.map((slug) => ({ slug, product: name(slug), review: getProductReviews(slug).find((r) => r.rating === 5) })).filter(
    (q) => q.review,
  );

  return (
    <>
      {/* Hero: the photograph is never cropped, so it sits beside the type on a sand panel (DECISIONS.md D-07, D-46). */}
      <section aria-labelledby="hero-title" className="grid lg:min-h-[calc(100svh-var(--header-h)-36px)] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div className="order-2 flex flex-col justify-center px-16 pb-48 pt-30 lg:order-1 lg:px-48 lg:py-64">
          <p className="label hero-fade pb-20 text-accent-strong">Fine fragrance, Berlin</p>
          <h1 id="hero-title" className="text-display">
            <span className="hero-line">
              <span style={{ "--d": 0 } as CSSProperties}>A quiet gallery</span>
            </span>
            <span className="hero-line">
              <span style={{ "--d": 1 } as CSSProperties}>of fine fragrance.</span>
            </span>
          </h1>
          <p className="hero-fade max-w-[40ch] pt-20 text-body text-muted">
            Sixty-nine perfumes from the houses we admire and our own small line, wrapped by hand in Berlin with two samples of your choice.
          </p>
          <div className="hero-fade flex flex-wrap items-center gap-x-30 gap-y-13 pt-30">
            <Link href="/shop" className="btn btn-primary">
              Shop all fragrance
            </Link>
            <Link href="/shop?collection=studio-line" className="label link-grow inline-flex min-h-touch items-center">
              Our own letters
            </Link>
          </div>
        </div>
        <div className="order-1 bg-surface lg:order-2 lg:flex lg:items-center lg:justify-center lg:p-64">
          <div className="hero-photo w-full lg:max-w-[min(100%,calc(100svh-var(--header-h)-200px))]">
            <HeroFrame image={productImages[HERO][0]} alt="Marc Jacobs Daisy on a white plinth, a leaf shadow on the wall behind" />
          </div>
        </div>
      </section>

      <section aria-labelledby="collections-title" className="pt-section">
        <Reveal className="flex items-end justify-between gap-20 px-16 pb-30 lg:px-32">
          <h2 id="collections-title" className="text-heading">
            Collections
          </h2>
          <p className="max-w-[36ch] text-body-sm text-muted max-md:hidden">Four ways into the shelf, from the icons to our own small-batch letters.</p>
        </Reveal>
        <div className="px-gutter">
          <RevealGroup as="li" className="grid grid-cols-2 gap-x-gutter gap-y-32 lg:grid-cols-4">
            {collections.map((c) => (
              <RevealItem as="li" key={c.slug}>
                <Link href={`/shop?collection=${c.slug}`} className="group block">
                  <ProductFrame
                    image={productImages[COLLECTION_PHOTOS[c.slug]][0]}
                    alt={`${name(COLLECTION_PHOTOS[c.slug])}, from ${c.title.toLowerCase()}`}
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    matted
                    zoom
                  />
                  <span className="block pb-10 pt-13">
                    <span className="text-title block">
                      <span className="link-grow-target">{c.title}</span>
                    </span>
                    <span className="block pt-6 text-body-sm text-muted max-sm:hidden">{c.description}</span>
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section aria-labelledby="best-title" className="pt-section">
        <Reveal className="flex items-end justify-between px-16 pb-30 lg:px-32">
          <h2 id="best-title" className="text-heading">
            Most loved this season
          </h2>
          <Link href="/shop?sort=bestselling" className="label link-grow inline-flex min-h-touch items-center">
            See all
          </Link>
        </Reveal>
        <BestSellers products={bestSellers} />
      </section>

      <section aria-labelledby="families-title" className="mt-section bg-surface pt-section">
        <Reveal className="px-16 pb-30 lg:px-32">
          <h2 id="families-title" className="text-heading">
            Shop by family
          </h2>
          <p className="max-w-[56ch] pt-10 text-body-sm text-muted">Every fragrance belongs to a family. Start from the one you already love.</p>
        </Reveal>
        <FamilyIndex families={familyEntries} />
      </section>

      <section aria-labelledby="story-title" className="grid bg-ink text-canvas lg:grid-cols-2">
        <div>
          <ProductFrame image={atmosphereImages["perfume-oil-dropper"]} alt="Glass vials and a dropper of perfume oil in the studio" sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
        <Reveal className="flex flex-col justify-center px-16 py-64 lg:px-64">
          <p className="label pb-20 text-canvas/75">The studio</p>
          <h2 id="story-title" className="text-heading">
            Made slowly, in Berlin.
          </h2>
          <p className="max-w-[48ch] pt-20 text-body text-canvas/75">
            UY began as a shelf of bottles in a concrete room on Linienstraße. We still keep it that way: a short list of perfumes we would wear ourselves, a
            small line of our own blended in batches of two hundred, and every order wrapped by hand.
          </p>
          <div className="pt-30">
            <Link href="/about" className="btn btn-light">
              Visit the studio
            </Link>
          </div>
        </Reveal>
      </section>

      <section aria-labelledby="voices-title" className="px-16 pt-section lg:px-32">
        <Reveal>
          <h2 id="voices-title" className="pb-30 text-heading">
            From our reviews
          </h2>
        </Reveal>
        <RevealGroup className="grid gap-48 md:grid-cols-3 md:gap-32">
          {quotes.map(({ slug, product, review }) => (
            <RevealItem key={slug} className="border-t border-line pt-20">
              <figure>
                <Stars rating={review!.rating} size={13} />
                <blockquote className="font-display pt-13 text-[26px] leading-[1.3]">
                  <p>&ldquo;{review!.body}&rdquo;</p>
                </blockquote>
                <figcaption className="pt-17 text-caption text-muted">
                  {review!.author}, {review!.location}, on{" "}
                  <Link href={`/product/${slug}`} className="link-grow text-ink">
                    {product}
                  </Link>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section aria-labelledby="letter-title" className="mt-section bg-surface px-16 py-section lg:grid lg:grid-cols-2 lg:items-end lg:gap-64 lg:px-32">
        <Reveal>
          <h2 id="letter-title" className="text-heading">
            The letter
          </h2>
          <p className="max-w-[44ch] pt-13 text-body-sm text-muted">New arrivals, studio evenings and the occasional sample, four times a year. Nothing more.</p>
        </Reveal>
        <div className="pt-30 lg:pt-0">
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}

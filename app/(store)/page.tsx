import Link from "next/link";
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
      {/* Hero: the photograph is never cropped, so it sits beside the type rather than under it (DECISIONS.md D-07). */}
      <section aria-labelledby="hero-title" className="grid border-b border-soot lg:grid-cols-2">
        <div className="order-2 flex flex-col justify-end px-16 pb-30 pt-30 lg:order-1 lg:border-e lg:border-soot lg:px-32 lg:pb-32">
          <h1 id="hero-title" className="max-w-[14ch] text-subheading tracking-display sm:text-heading">
            A quiet gallery of fine fragrance.
          </h1>
          <p className="max-w-[44ch] pt-17 text-body">
            Sixty-nine perfumes from the houses we admire and our own small line, wrapped by hand in Berlin with two samples of your choice.
          </p>
          <div className="flex flex-wrap items-center gap-x-30 gap-y-10 pt-30">
            <Link href="/shop" className="inline-flex min-h-[52px] items-center bg-graphite px-30 text-body-sm text-chalk transition-transform duration-[var(--duration-fast)] active:translate-y-px">
              Shop all fragrance
            </Link>
            <Link href="/shop?collection=studio-line" className="inline-flex min-h-touch items-center text-caption uppercase underline decoration-1 underline-offset-4">
              Our own letters
            </Link>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <HeroFrame image={productImages[HERO][0]} alt="Marc Jacobs Daisy on a white plinth, a leaf shadow on the wall behind" />
        </div>
      </section>

      <section aria-labelledby="collections-title" className="pt-section">
        <Reveal>
          <h2 id="collections-title" className="px-16 pb-17 text-subheading tracking-display lg:px-32">
            Collections
          </h2>
        </Reveal>
        <div className="overflow-hidden border-t border-soot">
          <RevealGroup as="li" className="grid w-[calc(100%+1px)] grid-cols-2 lg:grid-cols-4">
            {collections.map((c) => (
              <RevealItem as="li" key={c.slug} className="border-b border-e border-soot">
                <Link href={`/shop?collection=${c.slug}`} className="group block">
                  <ProductFrame
                    image={productImages[COLLECTION_PHOTOS[c.slug]][0]}
                    alt={`${name(COLLECTION_PHOTOS[c.slug])}, from ${c.title.toLowerCase()}`}
                    sizes="(min-width: 1024px) 25vw, 50vw"
                  />
                  <span className="block px-10 pb-17 pt-13 text-center">
                    <span className="block text-body-sm decoration-1 underline-offset-4 group-hover:underline">{c.title}</span>
                    <span className="block pt-4 text-caption max-sm:hidden">{c.description}</span>
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section aria-labelledby="best-title" className="pt-section">
        <Reveal className="flex items-baseline justify-between px-16 pb-17 lg:px-32">
          <h2 id="best-title" className="text-subheading tracking-display">
            Most loved this season
          </h2>
          <Link href="/shop?sort=bestselling" className="text-caption uppercase underline decoration-1 underline-offset-4">
            See all
          </Link>
        </Reveal>
        <BestSellers products={bestSellers} />
      </section>

      <section aria-labelledby="families-title" className="pt-section">
        <Reveal>
          <h2 id="families-title" className="px-16 pb-6 text-subheading tracking-display lg:px-32">
            Shop by family
          </h2>
          <p className="max-w-[56ch] px-16 pb-17 text-body-sm lg:px-32">Every fragrance belongs to a family. Start from the one you already love.</p>
        </Reveal>
        <FamilyIndex families={familyEntries} />
      </section>

      <section aria-labelledby="story-title" className="mt-section grid border-y border-soot lg:grid-cols-2">
        <div className="lg:border-e lg:border-soot">
          <ProductFrame image={atmosphereImages["perfume-oil-dropper"]} alt="Glass vials and a dropper of perfume oil in the studio" sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
        <Reveal className="flex flex-col justify-center px-16 py-30 lg:px-32">
          <h2 id="story-title" className="text-subheading tracking-display">
            Made slowly, in Berlin.
          </h2>
          <p className="max-w-[52ch] pt-17 text-body">
            UY began as a shelf of bottles in a concrete room on Linienstraße. We still keep it that way: a short list of perfumes we would wear ourselves, a
            small line of our own blended in batches of two hundred, and every order wrapped by hand.
          </p>
          <Link href="/about" className="mt-17 inline-flex min-h-touch items-center text-caption uppercase underline decoration-1 underline-offset-4">
            The studio
          </Link>
        </Reveal>
      </section>

      <section aria-labelledby="voices-title" className="px-16 pt-section lg:px-32">
        <Reveal>
          <h2 id="voices-title" className="pb-17 text-subheading tracking-display">
            From our reviews
          </h2>
        </Reveal>
        <RevealGroup className="grid gap-30 border-t border-soot pt-30 md:grid-cols-3 md:gap-32">
          {quotes.map(({ slug, product, review }) => (
            <RevealItem key={slug}>
              <figure>
                <Stars rating={review!.rating} />
                <blockquote className="pt-10 text-body">
                  <p>&ldquo;{review!.body}&rdquo;</p>
                </blockquote>
                <figcaption className="pt-13 text-caption">
                  {review!.author}, {review!.location}, on{" "}
                  <Link href={`/product/${slug}`} className="underline decoration-1 underline-offset-4">
                    {product}
                  </Link>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section aria-labelledby="letter-title" className="mx-16 mt-section border-t border-soot pt-30 lg:mx-32 lg:grid lg:grid-cols-2 lg:gap-32">
        <Reveal>
          <h2 id="letter-title" className="text-subheading tracking-display">
            The letter
          </h2>
          <p className="max-w-[44ch] pt-13 text-body-sm">New arrivals, studio evenings and the occasional sample, four times a year. Nothing more.</p>
        </Reveal>
        <div className="pt-17 lg:pt-0">
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}

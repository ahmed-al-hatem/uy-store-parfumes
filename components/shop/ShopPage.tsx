import { Suspense } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { SearchIcon } from "@/components/ui/icons";
import { getSummaries, listProducts } from "@/lib/api.server";
import { defaultParams, PAGE_SIZE } from "@/lib/shop/query";
import type { Gender } from "@/lib/types";
import { ShopView } from "./ShopView";

type ShopPageProps = { category?: Gender; heading: string; intro: string };

const POPULAR = ["dior-sauvage", "chanel-coco-mademoiselle", "maison-margiela-replica-jazz-club", "jo-malone-wood-sage-sea-salt", "amber-oval-perfume"];

/**
 * Static shell for /shop and /shop/[category]. Page 1 of the unfiltered list is
 * prerendered (fast first paint, crawlable); the client view then takes over
 * and applies whatever filters, search and page the URL carries.
 */
export function ShopPage({ category, heading, intro }: ShopPageProps) {
  const { page: _page, ...filters } = defaultParams;
  const initial = listProducts({ ...filters, category, offset: 0, limit: PAGE_SIZE });
  const popular = getSummaries(POPULAR);

  return (
    <Suspense fallback={<ShopFallback heading={heading} intro={intro} initial={initial} />}>
      <ShopView initial={initial} category={category} heading={heading} intro={intro} popular={popular} />
    </Suspense>
  );
}

function ShopFallback({ heading, intro, initial }: { heading: string; intro: string; initial: ReturnType<typeof listProducts> }) {
  return (
    <>
      <section className="px-16 pb-30 pt-30 lg:px-32 lg:pt-32">
        <h1 className="text-subheading tracking-display lg:text-heading">{heading}</h1>
        <p className="max-w-[56ch] pt-13 text-body">{intro}</p>
      </section>
      <div className="flex min-h-[53px] items-center gap-13 border-b border-soot px-16 lg:px-32">
        <SearchIcon aria-hidden="true" />
        <span className="text-body text-soot/60">Search by name, house or note</span>
      </div>
      <div className="flex min-h-touch items-center justify-between border-b border-soot px-16 text-caption uppercase lg:px-32">
        <span>Filter</span>
        <span className="normal-case">{initial.total} fragrances</span>
        <span>Sort ▾</span>
      </div>
      <div className="overflow-hidden border-t border-soot">
        <ul className="grid w-[calc(100%+1px)] grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" aria-label="Fragrances">
          {initial.items.map((product, i) => (
            <li key={product.slug} className="border-b border-e border-soot">
              <ProductCard product={product} preload={i < 2} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

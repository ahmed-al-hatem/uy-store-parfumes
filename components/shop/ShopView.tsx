"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { fetchProducts } from "@/lib/api";
import { countActiveFilters, defaultParams, PAGE_SIZE, type ProductPage, type ShopParams } from "@/lib/shop/query";
import type { Gender, ProductSummary } from "@/lib/types";
import { AppliedFilters } from "./AppliedFilters";
import { FilterDrawer } from "./FilterDrawer";
import { InfiniteGrid } from "./InfiniteGrid";
import { SearchBox } from "./SearchBox";
import { SortSelect } from "./SortSelect";
import { useShopParams } from "./useShopParams";

type ShopViewProps = {
  /** Page 1 of the unfiltered listing, rendered on the server. */
  initial: ProductPage<ProductSummary>;
  category?: Gender;
  heading: string;
  intro: string;
  /** Shown in the empty state. */
  popular: ProductSummary[];
};

type Loaded = ProductPage<ProductSummary> & { key: string };

const SCROLL_KEY = "uy-shop-return";
const filtersKey = ({ page: _page, ...filters }: ShopParams) => JSON.stringify(filters);
const DEFAULT_KEY = filtersKey(defaultParams);

/** Remembers where the visitor was before opening a product, for the back button. */
function rememberScroll() {
  try {
    sessionStorage.setItem(SCROLL_KEY, JSON.stringify({ url: location.pathname + location.search, y: scrollY, at: Date.now() }));
  } catch {
    // Storage blocked: the list simply reopens at the top.
  }
}

function takeScroll(): number | null {
  try {
    const raw = sessionStorage.getItem(SCROLL_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(SCROLL_KEY);
    const saved = JSON.parse(raw) as { url: string; y: number; at: number };
    const fresh = Date.now() - saved.at < 30 * 60 * 1000;
    return fresh && saved.url === location.pathname + location.search ? saved.y : null;
  } catch {
    return null;
  }
}

export function ShopView({ initial, category, heading, intro, popular }: ShopViewProps) {
  const pathname = usePathname();
  const [params, setParams] = useShopParams();
  const key = filtersKey(params);
  const [data, setData] = useState<Loaded>(() => ({ ...initial, key: params.page === 1 && key === DEFAULT_KEY ? key : "" }));
  const [loadingMore, setLoadingMore] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const restored = useRef(false);
  const loading = data.key !== key && failed !== key;

  const load = useEffectEvent((signal: AbortSignal) => {
    const { page, ...filters } = params;
    // A shared or restored URL with ?page=3 loads all three pages at once.
    fetchProducts(filters, { offset: 0, limit: PAGE_SIZE * Math.max(1, page), category }, signal)
      .then((res) => {
        setData({ ...res, key });
        setFailed(null);
        setAnnouncement(`${res.total} ${res.total === 1 ? "fragrance" : "fragrances"}`);
      })
      .catch((err: unknown) => {
        if ((err as Error).name !== "AbortError") setFailed(key);
      });
  });

  useEffect(() => {
    if (data.key === key) return;
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [key, data.key, attempt]);

  // Back from a product page: put the visitor where they were.
  useEffect(() => {
    if (loading || restored.current) return;
    restored.current = true;
    const y = takeScroll();
    if (y != null) requestAnimationFrame(() => window.scrollTo(0, y));
  }, [loading]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest?.('a[href^="/product/"]')) rememberScroll();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  const change = (patch: { [K in keyof ShopParams]?: ShopParams[K] | null }) => void setParams({ ...patch, page: null });
  const clear = () =>
    void setParams({ ...defaultParams, q: params.q || null, sort: params.sort === "featured" ? null : params.sort, page: null });

  async function loadMore() {
    if (loadingMore || loading || data.items.length >= data.total) return;
    setLoadingMore(true);
    const { page: _page, ...filters } = params;
    try {
      const res = await fetchProducts(filters, { offset: data.items.length, limit: PAGE_SIZE, category });
      const items = [...data.items, ...res.items];
      setData((d) => (d.key === key ? { ...d, items, total: res.total } : d));
      setAnnouncement(`Loaded ${res.items.length} more. Showing ${items.length} of ${res.total}.`);
      void setParams({ page: Math.ceil(items.length / PAGE_SIZE) }, { history: "replace" });
    } catch {
      setAnnouncement("More fragrances could not be loaded. Try again.");
    } finally {
      setLoadingMore(false);
    }
  }

  const title = params.q ? `Results for “${params.q}”` : heading;
  const empty = !loading && failed !== key && data.items.length === 0;

  return (
    <>
      <section className="px-16 pb-30 pt-30 lg:px-32 lg:pt-32">
        <h1 className="text-subheading tracking-display lg:text-heading">{title}</h1>
        {!params.q && <p className="max-w-[56ch] pt-13 text-body">{intro}</p>}
      </section>

      <SearchBox
        value={params.q}
        onQuery={(q) => void setParams({ q: q || null, page: null }, { history: "replace" })}
        onBrand={(slug) => change({ q: null, brand: params.brand.includes(slug) ? params.brand : [...params.brand, slug] })}
        onNote={(note) => change({ q: null, notes: params.notes.includes(note) ? params.notes : [...params.notes, note] })}
      />

      <div className="sticky-under-header sticky top-[var(--header-h)] z-20 flex items-center justify-between gap-13 border-b border-line bg-canvas px-16 lg:px-32">
        <FilterDrawer
          params={params}
          facets={data.facets}
          total={data.total}
          loading={loading}
          hideGender={category != null}
          onChange={change}
          onClear={clear}
        />
        <p className="text-caption" aria-hidden="true">
          {loading ? " " : `${data.total} ${data.total === 1 ? "fragrance" : "fragrances"}`}
        </p>
        <SortSelect value={params.sort} onChange={(sort) => change({ sort: sort === "featured" ? null : sort })} />
      </div>

      <AppliedFilters params={params} facets={data.facets} onChange={change} onClear={clear} />

      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>

      {failed === key ? (
        <div className="px-16 py-section text-center lg:px-32">
          <p className="text-body">The collection could not be loaded just now.</p>
          <button
            type="button"
            onClick={() => {
              setFailed(null);
              setAttempt((a) => a + 1);
            }}
            className="mt-13 min-h-touch text-caption uppercase underline decoration-1 underline-offset-4"
          >
            Try again
          </button>
        </div>
      ) : empty ? (
        <EmptyState hasFilters={countActiveFilters(params) > 0} query={params.q} onClear={clear} onClearQuery={() => change({ q: null })} popular={popular} pathname={pathname} />
      ) : (
        <InfiniteGrid items={data.items} total={data.total} loading={loading} loadingMore={loadingMore} onLoadMore={loadMore} />
      )}
    </>
  );
}

const SUGGESTED = ["rose", "vetiver", "vanilla", "bergamot", "Chanel", "leather"];

function EmptyState({
  query,
  onClear,
  onClearQuery,
  popular,
  pathname,
  hasFilters,
}: {
  hasFilters: boolean;
  query: string;
  onClear: () => void;
  onClearQuery: () => void;
  popular: ProductSummary[];
  pathname: string;
}) {
  return (
    <section aria-labelledby="empty-title" className="border-t border-line">
      <div className="px-16 py-section lg:px-32">
        <h2 id="empty-title" className="text-subheading tracking-display">
          Nothing on the shelf matches.
        </h2>
        <p className="max-w-[52ch] pt-13 text-body">
          {query ? "Check the spelling, or try a house or a single note." : "Loosen a filter or two and the shelf will fill again."}
        </p>
        <div className="flex flex-wrap gap-x-30 pt-17">
          {query && (
            <button type="button" onClick={onClearQuery} className="min-h-touch text-caption uppercase underline decoration-1 underline-offset-4">
              Clear the search
            </button>
          )}
          {hasFilters && (
            <button type="button" onClick={onClear} className="min-h-touch text-caption uppercase underline decoration-1 underline-offset-4">
              Clear filters
            </button>
          )}
        </div>
        <p className="pt-30 text-caption uppercase">Try</p>
        <ul className="flex flex-wrap gap-x-17">
          {SUGGESTED.map((s) => (
            <li key={s}>
              <Link href={`${pathname}?q=${encodeURIComponent(s)}`} className="inline-flex min-h-touch items-center text-body-sm decoration-1 underline-offset-4 hover:underline">
                {s}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <h3 className="px-16 pb-13 text-caption uppercase lg:px-32">Most loved this season</h3>
      <div className="px-gutter">
        <ul className="grid grid-cols-2 gap-x-gutter gap-y-32 sm:grid-cols-3 lg:grid-cols-5">
          {popular.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

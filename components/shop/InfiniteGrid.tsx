"use client";

import { useEffect, useRef, useState } from "react";
import { ProductCard, ProductCardSkeleton } from "@/components/product/ProductCard";
import { PAGE_SIZE } from "@/lib/shop/query";
import type { ProductSummary } from "@/lib/types";

type InfiniteGridProps = {
  items: ProductSummary[];
  total: number;
  /** A fresh result set is loading: show skeletons instead of stale cards. */
  loading: boolean;
  loadingMore: boolean;
  onLoadMore: () => void;
};

/**
 * 5 / 3 / 2-column grid with gutters. Cards present on first paint stay still
 * (they replace the server-rendered page); every card loaded later rises in.
 * An IntersectionObserver loads the next page before the end is reached;
 * the "Load more" link stays as a fallback for keyboards and old browsers.
 */
export function InfiniteGrid({ items, total, loading, loadingMore, onLoadMore }: InfiniteGridProps) {
  const sentinel = useRef<HTMLDivElement>(null);
  const hasMore = !loading && items.length < total;
  const onLoadMoreRef = useRef(onLoadMore);
  const [firstPaint] = useState(() => new Set(items.map((p) => p.slug)));

  useEffect(() => {
    onLoadMoreRef.current = onLoadMore;
  });

  useEffect(() => {
    const el = sentinel.current;
    if (!el || !hasMore || loadingMore || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && onLoadMoreRef.current(), {
      rootMargin: "0px 0px 400px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, loadingMore, items.length]);

  const skeletons = (n: number) =>
    Array.from({ length: n }, (_, i) => (
      <li key={`s${i}`}>
        <ProductCardSkeleton />
      </li>
    ));

  return (
    <div>
      <div className="px-gutter">
        <ul
          className="grid grid-cols-2 gap-x-gutter gap-y-32 sm:grid-cols-3 lg:grid-cols-5"
          aria-busy={loading || loadingMore}
          aria-label="Fragrances"
        >
          {loading
            ? skeletons(PAGE_SIZE)
            : items.map((product, i) => (
                <li key={product.slug}>
                  <ProductCard
                    product={product}
                    preload={i < 2}
                    headingLevel={2}
                    index={firstPaint.has(product.slug) ? undefined : i % PAGE_SIZE}
                  />
                </li>
              ))}
          {loadingMore && skeletons(Math.min(PAGE_SIZE, total - items.length))}
        </ul>
      </div>

      <div ref={sentinel} aria-hidden="true" />

      {!loading && items.length > 0 && (
        <div className="flex flex-col items-center gap-10 px-16 pt-30 text-center">
          <p className="text-caption">
            Showing {items.length} of {total}
          </p>
          {hasMore && (
            <button
              type="button"
              onClick={onLoadMore}
              disabled={loadingMore}
              className="min-h-touch text-caption uppercase underline decoration-1 underline-offset-4 disabled:opacity-40"
            >
              {loadingMore ? "Loading…" : "Load more"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

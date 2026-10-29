"use client";

import { useRef, useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import type { ProductSummary } from "@/lib/types";

/** Horizontal row with scroll snap; swipe on phones, Previous/Next on desktop. */
export function BestSellers({ products }: { products: ProductSummary[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState<"start" | "middle" | "end">("start");

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const left = Math.abs(el.scrollLeft);
    setEdge(left < 4 ? "start" : left + el.clientWidth >= el.scrollWidth - 4 ? "end" : "middle");
  };

  const page = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const rtl = getComputedStyle(el).direction === "rtl" ? -1 : 1;
    el.scrollBy({ left: dir * rtl * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div>
      <div className="overflow-hidden border-t border-soot">
        <ul
          ref={track}
          onScroll={onScroll}
          className="flex w-[calc(100%+1px)] snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Best sellers"
        >
          {products.map((p) => (
            <li key={p.slug} className="w-1/2 shrink-0 snap-start border-b border-e border-soot sm:w-1/3 lg:w-1/5">
              <ProductCard product={p} sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw" />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-end gap-17 px-16 pt-10 max-sm:hidden lg:px-32">
        <button
          type="button"
          onClick={() => page(-1)}
          disabled={edge === "start"}
          className="min-h-touch text-caption uppercase decoration-1 underline-offset-4 hover:underline disabled:opacity-30 disabled:hover:no-underline"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => page(1)}
          disabled={edge === "end"}
          className="min-h-touch text-caption uppercase decoration-1 underline-offset-4 hover:underline disabled:opacity-30 disabled:hover:no-underline"
        >
          Next
        </button>
      </div>
    </div>
  );
}

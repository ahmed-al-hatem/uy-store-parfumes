"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useProducts } from "@/components/cart/useProducts";
import { useWishlist } from "@/store/wishlist";
import { ProductCard, ProductCardSkeleton } from "./ProductCard";

const subscribe = (cb: () => void) => useWishlist.persist.onFinishHydration(cb);

export function WishlistView() {
  const hydrated = useSyncExternalStore(subscribe, () => useWishlist.persist.hasHydrated(), () => false);
  const slugs = useWishlist((s) => s.slugs);
  const { products, loading } = useProducts(slugs);

  return (
    <>
      <section className="px-16 pb-30 pt-30 lg:px-32 lg:pt-32">
        <h1 className="text-subheading tracking-display lg:text-heading">Wishlist</h1>
        <p className="max-w-[52ch] pt-13 text-body">
          {hydrated && slugs.length === 0
            ? "Nothing saved yet. Tap the heart on any fragrance to keep it here for later."
            : "Saved in this browser. Add a size to your bag when you are ready."}
        </p>
        {hydrated && slugs.length === 0 && (
          <Link href="/shop" className="mt-17 inline-flex min-h-touch items-center text-caption uppercase underline decoration-1 underline-offset-4">
            Browse all fragrance
          </Link>
        )}
      </section>
      {(!hydrated || slugs.length > 0) && (
        <div className="overflow-hidden border-t border-soot">
          <ul className="grid w-[calc(100%+1px)] grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" aria-busy={!hydrated || loading}>
            {!hydrated
              ? Array.from({ length: 5 }, (_, i) => (
                  <li key={i} className="border-b border-e border-soot">
                    <ProductCardSkeleton />
                  </li>
                ))
              : slugs.map((slug) => {
                  const p = products.get(slug);
                  return (
                    <li key={slug} className="border-b border-e border-soot">
                      {p ? <ProductCard product={p} headingLevel={2} /> : <ProductCardSkeleton />}
                    </li>
                  );
                })}
          </ul>
        </div>
      )}
    </>
  );
}

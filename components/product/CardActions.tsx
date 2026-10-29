"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { HeartIcon } from "@/components/ui/icons";
import type { ProductSummary } from "@/lib/types";
import { useWishlist } from "@/store/wishlist";

const QuickView = dynamic(() => import("./QuickView").then((m) => m.QuickView), { ssr: false });

/**
 * Wishlist heart and Quick view, layered over the card photo as siblings of the
 * card link (never nested inside it). Quick view appears on hover or focus on
 * pointer devices; phones tap through to the product page.
 */
export function CardActions({ product }: { product: ProductSummary }) {
  const saved = useWishlist((s) => s.slugs.includes(product.slug));
  const toggle = useWishlist((s) => s.toggle);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const label = `${product.brandName} ${product.name}`;

  return (
    <>
      <button
        type="button"
        onClick={() => toggle(product.slug)}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${label} from wishlist` : `Save ${label} to wishlist`}
        className="absolute end-0 top-0 z-10 inline-flex size-[44px] items-center justify-center"
      >
        <HeartIcon filled={saved} />
      </button>
      <button
        type="button"
        onClick={() => {
          setLoaded(true);
          setOpen(true);
        }}
        className="absolute inset-x-10 bottom-10 z-10 hidden min-h-touch items-center justify-center bg-limestone text-caption uppercase opacity-0 transition-opacity duration-[var(--duration-base)] ease-quiet focus-visible:opacity-100 group-hover:opacity-100 pointer-fine:flex"
        aria-label={`Quick view, ${label}`}
      >
        Quick view
      </button>
      {loaded && <QuickView product={product} open={open} onOpenChange={setOpen} />}
    </>
  );
}

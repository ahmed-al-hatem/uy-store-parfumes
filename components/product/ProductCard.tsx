import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { formatPrice } from "@/lib/config";
import type { ProductSummary } from "@/lib/types";
import { CardActions } from "./CardActions";
import { ProductFrame } from "./ProductFrame";

type ProductCardProps = {
  product: ProductSummary;
  sizes?: string;
  preload?: boolean;
  /** 2 when the grid sits directly under the page h1 (shop, wishlist); 3 under a section h2. */
  headingLevel?: 2 | 3;
  /** Position in the grid, for the staggered first-paint entrance. */
  index?: number;
};

const DEFAULT_SIZES = "(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw";

/**
 * The photo sits on a sand mat like a framed print. On hover it eases forward
 * inside the mat (never cropped) while the second photo fades in.
 * The photo link is a mouse convenience; the caption link is the one keyboards
 * and screen readers use, so the card is announced once.
 */
export function ProductCard({ product, sizes = DEFAULT_SIZES, preload = false, headingLevel = 3, index }: ProductCardProps) {
  const [first, second] = product.images;
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const multipleSizes = new Set(product.sizes.map((s) => s.price)).size > 1;
  const href = `/product/${product.slug}`;

  return (
    <article
      className={`group relative flex h-full flex-col ${index != null ? "rise-in" : ""}`}
      style={index != null ? ({ "--i": index } as CSSProperties) : undefined}
    >
      <div className="relative">
        <Link href={href} tabIndex={-1} aria-hidden="true" className="block">
          <ProductFrame image={first} alt="" sizes={sizes} preload={preload} matted zoom />
          {second && (
            <span
              className="absolute inset-[7%] opacity-0 transition-opacity duration-[var(--duration-slow)] ease-quiet group-hover:opacity-100"
              style={{ backgroundColor: second.frame }}
            >
              <Image src={second.src} alt="" width={second.width} height={second.height} sizes={sizes} className="zoom-on-hover h-full w-full object-contain" />
            </span>
          )}
        </Link>
        {!product.inStock && (
          <span className="label pointer-events-none absolute start-[10%] top-[10%] rounded-pill bg-canvas px-10 py-4 text-ink">Sold out</span>
        )}
        <CardActions product={product} />
      </div>
      <Link href={href} className="flex flex-1 flex-col gap-4 pb-17 pt-13 focus-visible:outline-offset-2">
        <span className="label text-muted">{product.brandName}</span>
        <Heading className="text-title">
          <span className="link-grow-target">{product.name}</span>
        </Heading>
        <span className="text-body-sm tabular-nums text-muted">
          {multipleSizes ? "From " : ""}
          {formatPrice(product.priceFrom)}
        </span>
      </Link>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="aspect-square animate-breathe bg-surface" />
      <div className="flex flex-col gap-6 pb-17 pt-13">
        <div className="h-[12px] w-1/3 animate-breathe bg-surface" />
        <div className="h-[20px] w-2/3 animate-breathe bg-surface" />
        <div className="h-[14px] w-1/4 animate-breathe bg-surface" />
      </div>
    </div>
  );
}

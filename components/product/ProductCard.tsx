import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/config";
import type { ProductSummary } from "@/lib/types";
import { ProductFrame } from "./ProductFrame";

type ProductCardProps = {
  product: ProductSummary;
  sizes?: string;
  preload?: boolean;
};

const DEFAULT_SIZES = "(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw";

/**
 * The photograph is the card (DESIGN.md): no border, no shadow. Name and price
 * sit centred below. On hover-capable screens the second photo fades in.
 */
export function ProductCard({ product, sizes = DEFAULT_SIZES, preload = false }: ProductCardProps) {
  const [first, second] = product.images;
  const multipleSizes = new Set(product.sizes.map((s) => s.price)).size > 1;
  const alt = `${product.brandName} ${product.name}`;

  return (
    <article className="group relative flex h-full flex-col bg-limestone">
      <Link href={`/product/${product.slug}`} className="flex h-full flex-col focus-visible:outline-offset-[-4px]">
        <div className="relative">
          <ProductFrame image={first} alt={`${alt}, bottle photograph`} sizes={sizes} preload={preload} />
          {second && (
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-[var(--duration-base)] ease-quiet group-hover:opacity-100"
              style={{ backgroundColor: second.frame }}
              aria-hidden="true"
            >
              <Image
                src={second.src}
                alt=""
                width={second.width}
                height={second.height}
                sizes={sizes}
                className="h-full w-full object-contain"
              />
            </div>
          )}
          {!product.inStock && (
            <span className="absolute start-10 top-10 bg-limestone px-6 py-4 text-caption">Sold out</span>
          )}
        </div>
        <div className="flex flex-1 flex-col items-center gap-4 px-10 pb-17 pt-13 text-center">
          <p className="text-caption">{product.brandName}</p>
          <h3 className="text-body-sm decoration-1 underline-offset-4 group-hover:underline">{product.name}</h3>
          <p className="text-body-sm">
            {multipleSizes ? "From " : ""}
            {formatPrice(product.priceFrom)}
          </p>
        </div>
      </Link>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-limestone" aria-hidden="true">
      <div className="aspect-square animate-breathe bg-chalk" />
      <div className="flex flex-col items-center gap-6 px-10 pb-17 pt-13">
        <div className="h-[13px] w-1/3 animate-breathe bg-chalk" />
        <div className="h-[15px] w-2/3 animate-breathe bg-chalk" />
        <div className="h-[15px] w-1/4 animate-breathe bg-chalk" />
      </div>
    </div>
  );
}

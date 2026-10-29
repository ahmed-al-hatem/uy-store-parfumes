"use client";

import Link from "next/link";
import { Dialog } from "radix-ui";
import { useId, useRef, useState } from "react";
import { CloseIcon } from "@/components/ui/icons";
import { formatPrice } from "@/lib/config";
import { flyToBag } from "@/lib/fly-to-bag";
import type { ProductSummary } from "@/lib/types";
import { useCart, useCartDrawer } from "@/store/cart";
import { ProductFrame } from "./ProductFrame";
import { WishlistButton } from "./WishlistButton";

type QuickViewProps = { product: ProductSummary; open: boolean; onOpenChange: (open: boolean) => void };

/** Size choice and add to bag without leaving the grid. Loaded on first use. */
export function QuickView({ product, open, onOpenChange }: QuickViewProps) {
  const id = useId();
  const add = useCart((s) => s.add);
  const openDrawer = useCartDrawer((s) => s.setOpen);
  const frame = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(Math.max(0, product.sizes.findIndex((s) => s.stock > 0)));
  const size = product.sizes[selected];
  const mixed = product.sizes.some((s) => s.concentration);
  const soldOut = size.stock <= 0;

  async function addToBag() {
    add({ slug: product.slug, sizeMl: size.ml, concentration: size.concentration });
    await flyToBag(frame.current);
    onOpenChange(false);
    openDrawer(true);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
        <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 max-h-[92dvh] overflow-y-auto border-t border-line bg-canvas data-[state=closed]:animate-sheet-out data-[state=open]:animate-sheet-in md:inset-auto md:start-1/2 md:top-1/2 md:w-[min(92vw,960px)] md:-translate-x-1/2 md:-translate-y-1/2 md:border md:shadow-float md:data-[state=closed]:animate-fade-out md:data-[state=open]:animate-fade-in rtl:md:translate-x-1/2">
          <div className="grid md:grid-cols-2">
            <div ref={frame} className="md:border-e md:border-line">
              <ProductFrame image={product.images[0]} alt={`${product.brandName} ${product.name}, bottle photograph`} sizes="(min-width: 768px) 480px, 100vw" matted />
            </div>
            <div className="flex flex-col px-16 pb-17 pt-13 md:px-30 md:pt-30">
              <div className="flex items-start justify-between gap-13">
                <div>
                  <p className="label text-muted">{product.brandName}</p>
                  <Dialog.Title className="pt-6 text-subheading">{product.name}</Dialog.Title>
                </div>
                <Dialog.Close className="inline-flex min-h-touch min-w-touch shrink-0 items-center justify-end" aria-label="Close quick view">
                  <CloseIcon />
                </Dialog.Close>
              </div>
              <Dialog.Description className="pt-7 text-body-sm">
                {product.topNotes.slice(0, 3).join(", ")}, and more.
              </Dialog.Description>
              <p className="font-display pt-13 text-[26px] leading-none tabular-nums" aria-live="polite">
                {formatPrice(size.price)}
              </p>

              <fieldset className="pt-13">
                <legend className="label pb-10 text-muted">Size</legend>
                <div className="flex flex-wrap gap-10">
                  {product.sizes.map((s, i) => (
                    <label
                      key={`${s.ml}-${s.concentration ?? ""}`}
                      className={`flex min-h-[52px] min-w-[104px] cursor-pointer flex-col items-center justify-center rounded-pill border border-ink/30 px-20 text-center hover:border-ink has-checked:border-ink has-checked:bg-ink has-checked:text-canvas has-focus-visible:outline has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent-strong ${
                        s.stock <= 0 ? "border-dashed text-muted" : ""
                      }`}
                    >
                      <input type="radio" name={`${id}-size`} className="sr-only" checked={selected === i} onChange={() => setSelected(i)} />
                      <span className="text-body-sm">
                        {s.ml} ml{mixed ? ` ${s.concentration ?? product.concentration}` : ""}
                      </span>
                      <span className="text-caption">{s.stock <= 0 ? "Sold out" : formatPrice(s.price)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <button
                type="button"
                onClick={addToBag}
                disabled={soldOut}
                className="btn btn-primary mt-17 w-full"
              >
                {soldOut ? "Sold out" : `Add to bag, ${formatPrice(size.price)}`}
              </button>
              <div className="flex items-center justify-between pt-7">
                <Link href={`/product/${product.slug}`} className="min-h-touch content-center text-caption uppercase underline decoration-1 underline-offset-4">
                  Full details
                </Link>
                <WishlistButton slug={product.slug} name={`${product.brandName} ${product.name}`} />
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

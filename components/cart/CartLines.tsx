"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import Link from "next/link";
import { ProductFrame } from "@/components/product/ProductFrame";
import { formatPrice } from "@/lib/config";
import { DURATION, EASE_LUXE, EASE_QUIET } from "@/lib/motion";
import type { PricedLine } from "@/lib/pricing";
import { useCart, useCartUndo } from "@/store/cart";
import { QuantityStepper } from "./QuantityStepper";

/** "Removed. Undo" message; rendered by both the line list and the empty bag. */
export function UndoNotice() {
  const removed = useCartUndo((s) => s.removed);
  const undo = useCartUndo((s) => s.undo);
  return (
    <div role="status" aria-live="polite">
      {removed && (
        <p className="flex items-center justify-between gap-13 border-b border-soot py-10 text-body-sm">
          <span>{removed.name} removed.</span>
          <button type="button" onClick={undo} className="min-h-touch text-caption uppercase underline decoration-1 underline-offset-4">
            Undo
          </button>
        </p>
      )}
    </div>
  );
}

/** Line items with a quantity stepper and remove-with-undo. */
export function CartLines({ priced, compact = false, onNavigate }: { priced: PricedLine[]; compact?: boolean; onNavigate?: () => void }) {
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  const remember = useCartUndo((s) => s.remember);

  function onRemove(line: PricedLine, index: number) {
    const { product: _p, unitPrice: _u, lineTotal: _t, ...plain } = line;
    remove(line.id);
    remember({ line: plain, index, name: line.product.name });
  }

  const thumb = compact ? "w-[88px]" : "w-[96px] sm:w-[128px]";

  return (
    <div>
      <ul className="border-t border-soot">
        <AnimatePresence initial={false}>
        {priced.map((line, i) => (
          <m.li
            key={line.id}
            layout="position"
            exit={{ opacity: 0, transition: { duration: DURATION.fast, ease: EASE_QUIET } }}
            transition={{ duration: DURATION.base, ease: EASE_LUXE }}
            className="flex gap-13 border-b border-soot py-13"
          >
            <Link href={`/product/${line.slug}`} onClick={onNavigate} className={`${thumb} shrink-0`} tabIndex={-1} aria-hidden="true">
              <ProductFrame image={line.product.images[0]} alt="" sizes="128px" />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex justify-between gap-10">
                <div className="min-w-0">
                  <p className="text-caption">{line.product.brandName}</p>
                  <Link href={`/product/${line.slug}`} onClick={onNavigate} className="text-body-sm decoration-1 underline-offset-4 hover:underline">
                    {line.product.name}
                  </Link>
                  <p className="text-caption">
                    {line.sizeMl} ml{line.concentration ? ` ${line.concentration}` : ""}, {formatPrice(line.unitPrice)}
                  </p>
                </div>
                <p className="text-body-sm tabular-nums">{formatPrice(line.lineTotal)}</p>
              </div>
              <div className="mt-auto flex items-end justify-between pt-10">
                <QuantityStepper value={line.quantity} onChange={(q) => setQuantity(line.id, q)} label={line.product.name} />
                <button
                  type="button"
                  onClick={() => onRemove(line, i)}
                  className="min-h-touch text-caption uppercase decoration-1 underline-offset-4 hover:underline"
                  aria-label={`Remove ${line.product.name}`}
                >
                  Remove
                </button>
              </div>
            </div>
          </m.li>
        ))}
        </AnimatePresence>
      </ul>
      <UndoNotice />
    </div>
  );
}

import { formatPrice, storeConfig } from "@/lib/config";
import type { Totals } from "@/lib/pricing";

/** Hairline progress towards free delivery; the fill moves with transform only. */
export function FreeShippingBar({ totals }: { totals: Totals }) {
  const threshold = storeConfig.freeShippingThreshold;
  const progress = totals.freeShipping ? 1 : Math.min(1, (threshold - totals.toFreeShipping) / threshold);
  return (
    <div>
      <p className="pb-7 text-caption" aria-live="polite">
        {totals.freeShipping
          ? "Your order ships free."
          : `${formatPrice(totals.toFreeShipping)} away from free delivery.`}
      </p>
      <div
        className="h-[4px] border border-line"
        role="progressbar"
        aria-label="Progress to free delivery"
        aria-valuemin={0}
        aria-valuemax={threshold}
        aria-valuenow={Math.round(progress * threshold)}
      >
        <div
          className="h-full origin-left bg-ink transition-transform duration-[var(--duration-slow)] ease-luxe rtl:origin-right"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </div>
  );
}

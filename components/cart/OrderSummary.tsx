import { formatPrice } from "@/lib/config";
import type { Totals } from "@/lib/pricing";

type OrderSummaryProps = { totals: Totals; shippingLabel?: string };

/** Subtotal, discount, delivery, gift wrap and total. Prices include VAT. */
export function OrderSummary({ totals, shippingLabel = "Delivery" }: OrderSummaryProps) {
  const row = "flex justify-between gap-13 py-4 text-body-sm";
  return (
    <dl>
      <div className={row}>
        <dt>Subtotal</dt>
        <dd className="tabular-nums">{formatPrice(totals.subtotal)}</dd>
      </div>
      {totals.discount > 0 && (
        <div className={row}>
          <dt>Discount{totals.promoLabel ? <span className="block text-caption">{totals.promoLabel}</span> : null}</dt>
          <dd className="tabular-nums">−{formatPrice(totals.discount)}</dd>
        </div>
      )}
      <div className={row}>
        <dt>{shippingLabel}</dt>
        <dd className="tabular-nums">{totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}</dd>
      </div>
      {totals.giftWrap > 0 && (
        <div className={row}>
          <dt>Gift wrapping</dt>
          <dd className="tabular-nums">{formatPrice(totals.giftWrap)}</dd>
        </div>
      )}
      <div className="mt-7 flex items-baseline justify-between gap-13 border-t border-line pt-10">
        <dt className="text-body">Total</dt>
        <dd className="text-subheading tabular-nums tracking-display">{formatPrice(totals.total)}</dd>
      </div>
      <p className="pt-4 text-caption">Including VAT.</p>
    </dl>
  );
}

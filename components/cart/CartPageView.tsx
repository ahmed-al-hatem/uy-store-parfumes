"use client";

import Link from "next/link";
import { CartLines, UndoNotice } from "./CartLines";
import { GiftOptions, PromoField, SamplePicker } from "./CartExtras";
import { FreeShippingBar } from "./FreeShippingBar";
import { OrderSummary } from "./OrderSummary";
import { useCartPricing } from "./useCartPricing";

export function CartPageView() {
  const { ready, hydrated, priced, totals, count } = useCartPricing();

  if (hydrated && count === 0) {
    return (
      <section className="px-16 pb-section pt-30 lg:px-32 lg:pt-32">
        <div className="max-w-[520px] pb-17">
          <UndoNotice />
        </div>
        <h1 className="text-subheading tracking-display lg:text-heading">Your bag is empty.</h1>
        <p className="max-w-[48ch] pt-13 text-body">
          Find something to wear tonight. Every order is wrapped in the studio and ships with two samples of your choice.
        </p>
        <Link href="/shop" className="mt-17 inline-flex min-h-touch items-center text-caption uppercase underline decoration-1 underline-offset-4">
          Browse all fragrance
        </Link>
      </section>
    );
  }

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <section aria-labelledby="bag-title" className="px-16 pt-30 lg:border-e lg:border-line lg:px-32 lg:pt-32">
        <h1 id="bag-title" className="text-subheading tracking-display lg:text-heading">
          Your bag{count > 0 && <span className="text-body"> ({count})</span>}
        </h1>
        <div className="pb-17 pt-17">
          <FreeShippingBar totals={totals} />
        </div>
        {ready ? (
          <CartLines priced={priced} />
        ) : (
          <div className="h-[160px] animate-breathe border-y border-line bg-surface" aria-label="Loading your bag" />
        )}
        <div className="flex flex-col gap-30 py-30">
          <SamplePicker />
          <GiftOptions />
        </div>
      </section>

      <aside aria-labelledby="summary-title" className="border-t border-line px-16 pb-section pt-30 lg:sticky lg:top-[var(--header-h)] lg:self-start lg:border-t-0 lg:px-32 lg:pt-32">
        <h2 id="summary-title" className="pb-13 text-caption uppercase">
          Order summary
        </h2>
        <div className="pb-20">
          <PromoField subtotal={totals.subtotal} />
        </div>
        <OrderSummary totals={totals} />
        <Link
          href="/checkout"
          aria-disabled={!ready}
          className="btn btn-primary mt-17 w-full"
        >
          Checkout
        </Link>
        <p className="pt-10 text-center text-caption">Secure payment. Free returns on unopened bottles within 30 days.</p>
      </aside>
    </div>
  );
}

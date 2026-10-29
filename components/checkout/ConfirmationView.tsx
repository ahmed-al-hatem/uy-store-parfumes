"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSyncExternalStore } from "react";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { ProductFrame } from "@/components/product/ProductFrame";
import { formatPrice } from "@/lib/config";
import { getOrder } from "@/lib/orders";

const noop = () => () => {};

export function ConfirmationView() {
  const number = useSearchParams().get("order") ?? "";
  // Orders live in browser storage, so read them only on the client.
  const raw = useSyncExternalStore(noop, () => JSON.stringify(getOrder(number)), () => "loading");

  if (raw === "loading") return <div className="h-[60dvh] animate-breathe bg-surface" aria-busy="true" />;
  const order = JSON.parse(raw) as ReturnType<typeof getOrder>;

  if (!order) {
    return (
      <section className="px-16 py-section lg:px-32">
        <h1 className="text-subheading tracking-display">We could not find that order.</h1>
        <p className="max-w-[52ch] pt-13 text-body">
          Order details are kept in this browser only. If you placed it on another device, check the confirmation e-mail.
        </p>
        <Link href="/shop" className="mt-17 inline-flex min-h-touch items-center text-caption uppercase underline decoration-1 underline-offset-4">
          Continue shopping
        </Link>
      </section>
    );
  }

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <section aria-labelledby="thanks" className="px-16 pb-30 pt-30 lg:border-e lg:border-line lg:px-32 lg:pb-section lg:pt-32">
        <p className="text-caption uppercase">Order {order.number}</p>
        <h1 id="thanks" className="pt-7 text-subheading tracking-display lg:text-heading" tabIndex={-1}>
          Thank you, {order.firstName}.
        </h1>
        <p className="max-w-[52ch] pt-13 text-body">
          Your order is being wrapped in the studio. A confirmation is on its way to {order.email}, and we will write again when it leaves Berlin.
        </p>

        <dl className="grid gap-x-30 gap-y-17 pt-30 sm:grid-cols-2">
          <div>
            <dt className="pb-6 text-caption uppercase">Delivering to</dt>
            <dd className="text-body-sm">
              {order.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="pb-6 text-caption uppercase">Delivery</dt>
            <dd className="text-body-sm">{order.shippingMethod}</dd>
            <dt className="pb-6 pt-13 text-caption uppercase">Payment</dt>
            <dd className="text-body-sm">{order.payment}</dd>
          </div>
          {order.samples.length > 0 && (
            <div>
              <dt className="pb-6 text-caption uppercase">Samples</dt>
              <dd className="text-body-sm">{order.samples.join(", ")}</dd>
            </div>
          )}
          {order.giftMessage != null && (
            <div>
              <dt className="pb-6 text-caption uppercase">Gift message</dt>
              <dd className="text-body-sm">{order.giftMessage || "Wrapped, without a card."}</dd>
            </div>
          )}
        </dl>

        <div className="flex flex-wrap gap-x-30 pt-30">
          <Link href="/shop" className="inline-flex min-h-touch items-center text-caption uppercase underline decoration-1 underline-offset-4">
            Continue shopping
          </Link>
          <Link href="/account" className="inline-flex min-h-touch items-center text-caption uppercase decoration-1 underline-offset-4 hover:underline">
            Order history
          </Link>
        </div>
      </section>

      <aside aria-labelledby="ordered" className="border-t border-line px-16 pb-section pt-30 lg:border-t-0 lg:px-32 lg:pt-32">
        <h2 id="ordered" className="pb-13 text-caption uppercase">
          Your order
        </h2>
        <ul className="border-t border-line">
          {order.lines.map((l) => (
            <li key={`${l.slug}-${l.sizeMl}-${l.concentration ?? ""}`} className="flex gap-13 border-b border-line py-13">
              <div className="w-[72px] shrink-0">
                <ProductFrame image={{ ...l.image, source: "", luminance: 0 }} alt="" sizes="72px" />
              </div>
              <div className="flex-1 text-body-sm">
                <p className="text-caption">{l.brandName}</p>
                <p>{l.name}</p>
                <p className="text-caption">
                  {l.sizeMl} ml{l.concentration ? ` ${l.concentration}` : ""}, quantity {l.quantity}
                </p>
              </div>
              <p className="text-body-sm tabular-nums">{formatPrice(l.unitPrice * l.quantity)}</p>
            </li>
          ))}
        </ul>
        <div className="pt-13">
          <OrderSummary totals={order.totals} />
        </div>
      </aside>
    </div>
  );
}

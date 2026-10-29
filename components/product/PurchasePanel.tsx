"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { formatPrice } from "@/lib/config";
import type { Concentration, ProductSize } from "@/lib/types";
import { useCart } from "@/store/cart";
import { DeliveryEstimate } from "./DeliveryEstimate";
import { WishlistButton } from "./WishlistButton";

const concentrationLabel: Record<Concentration, string> = {
  Cologne: "Cologne",
  EDT: "Eau de toilette",
  EDP: "Eau de parfum",
  Parfum: "Parfum",
  Extrait: "Extrait de parfum",
};

type PurchasePanelProps = {
  slug: string;
  name: string;
  brandName: string;
  concentration: Concentration;
  sizes: ProductSize[];
};

/**
 * Size choice drives the price. Add to bag is the page's one Graphite button
 * (DESIGN.md); on phones a slim bar repeats it once the main button scrolls away.
 */
export function PurchasePanel({ slug, name, brandName, concentration, sizes }: PurchasePanelProps) {
  const id = useId();
  const router = useRouter();
  const add = useCart((s) => s.add);
  const firstAvailable = Math.max(0, sizes.findIndex((s) => s.stock > 0));
  const [selected, setSelected] = useState(firstAvailable);
  const [notice, setNotice] = useState("");
  const [barVisible, setBarVisible] = useState(false);
  const mainButton = useRef<HTMLButtonElement>(null);

  const size = sizes[selected];
  const soldOut = size.stock <= 0;
  const sizeConcentration = size.concentration ?? concentration;
  const mixed = sizes.some((s) => s.concentration && s.concentration !== concentration);
  const lowStock = size.stock > 0 && size.stock <= 5;

  useEffect(() => {
    const el = mainButton.current;
    if (!el) return;
    // Show the sticky bar once the main button is above the viewport. Measured on
    // scroll (not IntersectionObserver) so fast flings and anchor jumps are caught too.
    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // Step aside for the footer so it is never covered.
        const footerTop = document.querySelector("footer")?.getBoundingClientRect().top ?? Infinity;
        setBarVisible(el.getBoundingClientRect().bottom < 0 && footerTop > window.innerHeight);
      });
    };
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  function addToBag() {
    if (soldOut) return;
    add({ slug, sizeMl: size.ml, concentration: size.concentration });
    setNotice(`${name}, ${sizeLabel(size)}, added to your bag.`);
  }

  function buyNow() {
    if (soldOut) return;
    add({ slug, sizeMl: size.ml, concentration: size.concentration });
    router.push("/checkout");
  }

  const sizeLabel = (s: ProductSize) => `${s.ml} ml${mixed ? ` ${s.concentration ?? concentration}` : ""}`;

  return (
    <div>
      <p className="text-body tabular-nums" aria-live="polite">
        {formatPrice(size.price)}
      </p>
      <p className="text-caption">
        {concentrationLabel[sizeConcentration]}, {size.ml} ml
      </p>

      <fieldset className="pt-20">
        <legend className="pb-7 text-caption uppercase">Size</legend>
        <div className="grid grid-cols-2 border-s border-t border-soot sm:grid-cols-3">
          {sizes.map((s, i) => {
            const out = s.stock <= 0;
            return (
              <label
                key={`${s.ml}-${s.concentration ?? ""}`}
                className={`relative flex min-h-[56px] cursor-pointer flex-col items-center justify-center border-b border-e border-soot bg-limestone px-6 text-center has-checked:bg-soot has-checked:text-limestone has-focus-visible:outline has-focus-visible:outline-1 has-focus-visible:-outline-offset-4 ${
                  out ? "cursor-default text-soot/50" : ""
                }`}
              >
                <input
                  type="radio"
                  name={`${id}-size`}
                  value={i}
                  checked={selected === i}
                  onChange={() => {
                    setSelected(i);
                    setNotice("");
                  }}
                  className="sr-only"
                  aria-describedby={out ? `${id}-out-${i}` : undefined}
                />
                <span className="text-body-sm">{sizeLabel(s)}</span>
                <span className="text-caption" id={out ? `${id}-out-${i}` : undefined}>
                  {out ? "Sold out" : formatPrice(s.price)}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <p className="min-h-[30px] pt-7 text-caption">{lowStock ? `Only ${size.stock} left in this size.` : soldOut ? "This size is sold out. Choose another or save it to your wishlist." : ""}</p>

      <div className="flex flex-col gap-7">
        <button
          ref={mainButton}
          type="button"
          onClick={addToBag}
          disabled={soldOut}
          className="min-h-[52px] w-full bg-graphite px-16 text-body-sm text-chalk transition-transform duration-[var(--duration-fast)] active:translate-y-px disabled:opacity-40"
        >
          {soldOut ? "Sold out" : `Add to bag, ${formatPrice(size.price)}`}
        </button>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={buyNow}
            disabled={soldOut}
            className="min-h-touch text-caption uppercase underline decoration-1 underline-offset-4 disabled:opacity-40"
          >
            Buy now
          </button>
          <WishlistButton slug={slug} name={`${brandName} ${name}`} />
        </div>
      </div>

      <p role="status" aria-live="polite" className="min-h-[24px] text-body-sm">
        {notice && (
          <>
            {notice}{" "}
            <Link href="/cart" className="underline decoration-1 underline-offset-4">
              View bag
            </Link>
          </>
        )}
      </p>

      <div className="border-t border-soot pt-13">
        <DeliveryEstimate />
      </div>

      {/* Phone sticky bar: same action, thumb-reachable. Hidden from assistive tech to avoid a duplicate control. */}
      <div
        aria-hidden={!barVisible}
        inert={!barVisible}
        className={`fixed inset-x-0 bottom-0 z-30 flex items-center gap-13 border-t border-soot bg-limestone px-16 py-7 transition-transform duration-[var(--duration-base)] ease-luxe lg:hidden ${
          barVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="min-w-0 flex-1">
          <p className="truncate text-body-sm">{name}</p>
          <p className="text-caption tabular-nums">
            {sizeLabel(size)}, {formatPrice(size.price)}
          </p>
        </div>
        <button
          type="button"
          onClick={addToBag}
          disabled={soldOut}
          className="min-h-touch shrink-0 bg-graphite px-20 text-body-sm text-chalk disabled:opacity-40"
        >
          {soldOut ? "Sold out" : "Add to bag"}
        </button>
      </div>
    </div>
  );
}

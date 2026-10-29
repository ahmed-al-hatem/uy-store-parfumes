"use client";

import { useId, useState, type FormEvent } from "react";
import { ProductFrame } from "@/components/product/ProductFrame";
import { Checkbox } from "@/components/ui/Checkbox";
import { formatPrice, storeConfig } from "@/lib/config";
import { GIFT_WRAP_PRICE } from "@/lib/pricing";
import { checkPromo } from "@/lib/promo";
import { GIFT_MESSAGE_MAX, useCart } from "@/store/cart";
import { useProducts } from "./useProducts";

export function GiftOptions() {
  const id = useId();
  const giftWrap = useCart((s) => s.giftWrap);
  const giftMessage = useCart((s) => s.giftMessage);
  const setGiftWrap = useCart((s) => s.setGiftWrap);
  const setGiftMessage = useCart((s) => s.setGiftMessage);
  return (
    <div>
      <Checkbox
        label={`Wrap it as a gift, ${formatPrice(GIFT_WRAP_PRICE)}`}
        checked={giftWrap}
        onChange={(e) => setGiftWrap(e.currentTarget.checked)}
      />
      {giftWrap && (
        <div className="pt-6">
          <label htmlFor={`${id}-msg`} className="text-caption uppercase">
            Gift message
          </label>
          <textarea
            id={`${id}-msg`}
            value={giftMessage}
            maxLength={GIFT_MESSAGE_MAX}
            onChange={(e) => setGiftMessage(e.target.value)}
            rows={3}
            aria-describedby={`${id}-count`}
            placeholder="Written by hand on a studio card. Prices are never included."
            className="mt-6 block w-full rounded-input border border-soot bg-transparent p-10 text-body-sm placeholder:text-soot/60"
          />
          <p id={`${id}-count`} className="pt-4 text-end text-caption tabular-nums">
            {giftMessage.length} / {GIFT_MESSAGE_MAX}
          </p>
        </div>
      )}
    </div>
  );
}

export function SamplePicker() {
  const samples = useCart((s) => s.samples);
  const toggle = useCart((s) => s.toggleSample);
  const slugs = [...storeConfig.sampleSlugs];
  const { products } = useProducts(slugs);
  const full = samples.length >= storeConfig.freeSamples;

  return (
    <fieldset>
      <legend className="text-caption uppercase">
        Choose {storeConfig.freeSamples} free samples ({samples.length} of {storeConfig.freeSamples})
      </legend>
      <ul className="grid grid-cols-4 gap-6 pt-10">
        {slugs.map((slug) => {
          const p = products.get(slug);
          const checked = samples.includes(slug);
          const disabled = !checked && full;
          return (
            <li key={slug}>
              <label className={`block cursor-pointer ${disabled ? "cursor-default opacity-40" : ""}`}>
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={checked}
                  disabled={disabled}
                  onChange={() => toggle(slug)}
                  aria-label={p ? `${p.brandName} ${p.name} sample` : slug}
                />
                <span className="block outline-offset-2 peer-checked:outline peer-checked:outline-1 peer-checked:outline-soot peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-dashed">
                  {p ? <ProductFrame image={p.images[0]} alt="" sizes="96px" /> : <span className="block aspect-square animate-breathe bg-chalk" />}
                </span>
                <span className="block truncate pt-4 text-caption">{p?.name ?? " "}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

export function PromoField({ subtotal }: { subtotal: number }) {
  const id = useId();
  const promoCode = useCart((s) => s.promoCode);
  const setPromoCode = useCart((s) => s.setPromoCode);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function apply(e: FormEvent) {
    e.preventDefault();
    const result = checkPromo(value, subtotal);
    if (!result.ok) return setError(result.message);
    setPromoCode(result.promo.code);
    setValue("");
    setError("");
  }

  if (promoCode) {
    return (
      <p className="flex items-center justify-between text-body-sm" role="status">
        <span>
          Code <span className="uppercase">{promoCode}</span> applied.
        </span>
        <button type="button" onClick={() => setPromoCode(null)} className="min-h-touch text-caption uppercase underline decoration-1 underline-offset-4">
          Remove
        </button>
      </p>
    );
  }

  return (
    <form onSubmit={apply} noValidate>
      <label htmlFor={id} className="text-caption uppercase">
        Promo code
      </label>
      <div className="flex items-end gap-13 border-b border-soot">
        <input
          id={id}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError("");
          }}
          autoCapitalize="characters"
          autoComplete="off"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className="min-h-touch w-full bg-transparent text-body-sm uppercase placeholder:normal-case placeholder:text-soot/60 focus:outline-none"
          placeholder="For example WELCOME10"
        />
        <button type="submit" className="min-h-touch text-body-sm uppercase decoration-1 underline-offset-4 hover:underline">
          Apply
        </button>
      </div>
      {error && (
        <p id={`${id}-err`} role="alert" className="pt-6 text-caption">
          {error}
        </p>
      )}
    </form>
  );
}

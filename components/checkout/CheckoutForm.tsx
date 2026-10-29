"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Collapsible } from "radix-ui";
import { useState, type ReactNode } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { CartLines } from "@/components/cart/CartLines";
import { PromoField } from "@/components/cart/CartExtras";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { useCartPricing } from "@/components/cart/useCartPricing";
import { useProducts } from "@/components/cart/useProducts";
import { Checkbox } from "@/components/ui/Checkbox";
import { cardBrandLabel, detectBrand, formatCardNumber, formatExpiry, onlyDigits } from "@/lib/card";
import { formatPrice, storeConfig } from "@/lib/config";
import { newOrderNumber, saveOrder, type Order } from "@/lib/orders";
import { useCart } from "@/store/cart";
import { InputField, SelectField } from "./Field";
import { checkoutDefaults, checkoutSchema, COUNTRIES, type CheckoutValues } from "./schema";

const SUBMIT_DELAY = 1400;

function Section({ title, children, aside }: { title: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <section className="border-t border-soot pb-30 pt-20">
      <div className="flex items-baseline justify-between pb-13">
        <h2 className="text-caption uppercase">{title}</h2>
        {aside}
      </div>
      {children}
    </section>
  );
}

/**
 * One-page checkout (UI only): express row, contact, delivery, shipping method,
 * payment. Validated with zod; nothing leaves the browser.
 */
export function CheckoutForm() {
  const router = useRouter();
  const [expressNote, setExpressNote] = useState("");
  const [placed, setPlaced] = useState(false);
  const samples = useCart((s) => s.samples);
  const giftWrap = useCart((s) => s.giftWrap);
  const giftMessage = useCart((s) => s.giftMessage);
  const clearCart = useCart((s) => s.clear);
  const { products: sampleProducts } = useProducts(samples);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({ resolver: zodResolver(checkoutSchema), defaultValues: checkoutDefaults, mode: "onTouched" });

  const shippingMethod = useWatch({ control, name: "shippingMethod" });
  const paymentMethod = useWatch({ control, name: "paymentMethod" });
  const billingSame = useWatch({ control, name: "billingSame" });
  const cardNumber = useWatch({ control, name: "cardNumber" });
  const brand = detectBrand(onlyDigits(cardNumber));

  const { ready, hydrated, priced, totals, count } = useCartPricing(shippingMethod);
  // Whether standard delivery would be free, whichever method is selected.
  const standardFree = totals.freeShipping;

  async function onSubmit(values: CheckoutValues) {
    await new Promise((r) => setTimeout(r, SUBMIT_DELAY));
    const country = COUNTRIES.find((c) => c.code === values.country)?.name ?? values.country;
    const digits = onlyDigits(values.cardNumber);
    const order: Order = {
      number: newOrderNumber(),
      placedAt: new Date().toISOString(),
      email: values.email,
      firstName: values.firstName,
      address: [
        `${values.firstName} ${values.lastName}`,
        values.address1,
        values.address2,
        `${values.postalCode} ${values.city}`,
        country,
      ].filter(Boolean),
      shippingMethod: values.shippingMethod === "express" ? "Express, next working day" : "Standard, 2 to 3 working days",
      payment:
        values.paymentMethod === "card"
          ? `${cardBrandLabel[detectBrand(digits)] || "Card"} ending ${digits.slice(-4)}`
          : values.paymentMethod === "cod"
            ? "Cash on delivery"
            : storeConfig.regionalWallet.label,
      lines: priced.map((l) => ({
        slug: l.slug,
        name: l.product.name,
        brandName: l.product.brandName,
        sizeMl: l.sizeMl,
        concentration: l.concentration,
        quantity: l.quantity,
        unitPrice: l.unitPrice,
        image: l.product.images[0],
      })),
      samples: samples.map((s) => sampleProducts.get(s)?.name ?? s),
      giftMessage: giftWrap ? giftMessage || "" : null,
      totals,
    };
    saveOrder(order);
    setPlaced(true);
    clearCart();
    router.replace(`/checkout/confirmation?order=${order.number}`);
  }

  if (hydrated && count === 0 && !placed && !isSubmitting) {
    return (
      <div className="px-16 py-section lg:px-32">
        <h1 className="text-subheading tracking-display lg:text-heading">Your bag is empty.</h1>
        <Link href="/shop" className="mt-17 inline-flex min-h-touch items-center text-caption uppercase underline decoration-1 underline-offset-4">
          Browse all fragrance
        </Link>
      </div>
    );
  }

  const summary = (
    <>
      {ready ? <CartLines priced={priced} compact /> : <div className="h-[120px] animate-breathe bg-chalk" />}
      <div className="py-17">
        <PromoField subtotal={totals.subtotal} />
      </div>
      <OrderSummary totals={totals} />
      {samples.length > 0 && (
        <p className="pt-10 text-caption">Samples: {samples.map((s) => sampleProducts.get(s)?.name ?? "").filter(Boolean).join(", ")}</p>
      )}
    </>
  );

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      {/* Phone: the summary folds away above the form. */}
      <Collapsible.Root className="border-b border-soot lg:hidden">
        <Collapsible.Trigger className="group flex min-h-[52px] w-full items-center justify-between px-16 text-body-sm">
          <span className="text-caption uppercase decoration-1 underline-offset-4 group-hover:underline">
            <span className="group-data-[state=open]:hidden">Show order summary</span>
            <span className="hidden group-data-[state=open]:inline">Hide order summary</span>
          </span>
          <span className="tabular-nums">{formatPrice(totals.total)}</span>
        </Collapsible.Trigger>
        <Collapsible.Content className="px-16 pb-17 data-[state=open]:animate-fade-in">{summary}</Collapsible.Content>
      </Collapsible.Root>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="px-16 pt-20 lg:border-e lg:border-soot lg:px-32 lg:pt-32" aria-labelledby="checkout-title">
        <h1 id="checkout-title" className="pb-20 text-subheading tracking-display">
          Checkout
        </h1>

        <section aria-labelledby="express-title" className="pb-20">
          <h2 id="express-title" className="pb-10 text-caption uppercase">
            Express checkout
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {["Apple Pay", "Google Pay", "PayPal"].map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => setExpressNote(`${label} is shown for the demo only. Complete the form below to place a test order.`)}
                className="min-h-[48px] rounded-input border border-soot text-body-sm decoration-1 underline-offset-4 hover:underline"
              >
                {label}
              </button>
            ))}
          </div>
          <p role="status" className="min-h-[20px] pt-6 text-caption">
            {expressNote}
          </p>
        </section>

        <Section title="Contact" aside={<Link href="/account" className="text-caption underline decoration-1 underline-offset-4">Log in</Link>}>
          <div className="flex flex-col gap-13">
            <InputField label="E-mail" type="email" autoComplete="email" inputMode="email" error={errors.email?.message} {...register("email")} />
            <Checkbox label="Send me the studio letter, four times a year" {...register("newsletter")} />
          </div>
        </Section>

        <Section title="Delivery">
          <div className="grid grid-cols-2 gap-13">
            <SelectField label="Country" autoComplete="country" wrapperClassName="col-span-2" error={errors.country?.message} {...register("country")}>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </SelectField>
            <InputField label="First name" autoComplete="given-name" error={errors.firstName?.message} {...register("firstName")} />
            <InputField label="Last name" autoComplete="family-name" error={errors.lastName?.message} {...register("lastName")} />
            <InputField label="Street and number" autoComplete="address-line1" wrapperClassName="col-span-2" error={errors.address1?.message} {...register("address1")} />
            <InputField label="Apartment, floor (optional)" autoComplete="address-line2" wrapperClassName="col-span-2" {...register("address2")} />
            <InputField label="Postal code" autoComplete="postal-code" error={errors.postalCode?.message} {...register("postalCode")} />
            <InputField label="City" autoComplete="address-level2" error={errors.city?.message} {...register("city")} />
            <InputField
              label="Phone (optional)"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              wrapperClassName="col-span-2"
              hint="Only for the courier, if they cannot find you."
              error={errors.phone?.message}
              {...register("phone")}
            />
          </div>
        </Section>

        <Section title="Shipping method">
          <div className="border-s border-t border-soot">
            {(
              [
                ["standard", "Standard", "2 to 3 working days", standardFree ? 0 : storeConfig.standardShipping],
                ["express", "Express", "Next working day, ordered before 14:00", storeConfig.expressShipping],
              ] as const
            ).map(([value, label, note, price]) => (
              <label key={value} className="flex min-h-[56px] cursor-pointer items-center gap-12 border-b border-e border-soot px-13 has-checked:bg-chalk">
                <input type="radio" value={value} {...register("shippingMethod")} className="size-[13px] appearance-none rounded-full border border-soot checked:bg-soot" />
                <span className="flex-1 text-body-sm">
                  {label}
                  <span className="block text-caption">{note}</span>
                </span>
                <span className="text-body-sm tabular-nums">{price === 0 ? "Free" : formatPrice(price)}</span>
              </label>
            ))}
          </div>
        </Section>

        <Section title="Payment">
          <p className="pb-10 text-caption">All payments are simulated in this demo. Nothing is charged or sent.</p>
          <div className="border-s border-t border-soot">
            {(
              [
                ["card", "Credit or debit card", "Visa, Mastercard, American Express"],
                ["cod", "Cash on delivery", "Pay the courier in cash or by card"],
                ["wallet", storeConfig.regionalWallet.label, storeConfig.regionalWallet.note],
              ] as const
            ).map(([value, label, note]) => (
              <div key={value} className="border-b border-e border-soot">
                <label className="flex min-h-[56px] cursor-pointer items-center gap-12 px-13 has-checked:bg-chalk">
                  <input type="radio" value={value} {...register("paymentMethod")} className="size-[13px] appearance-none rounded-full border border-soot checked:bg-soot" />
                  <span className="flex-1 text-body-sm">
                    {label}
                    <span className="block text-caption">{note}</span>
                  </span>
                </label>
                {value === "card" && paymentMethod === "card" && (
                  <div className="grid grid-cols-2 gap-13 border-t border-soot px-13 pb-17 pt-13">
                    <Controller
                      control={control}
                      name="cardNumber"
                      render={({ field }) => (
                        <InputField
                          label="Card number"
                          inputMode="numeric"
                          autoComplete="cc-number"
                          placeholder="1234 1234 1234 1234"
                          wrapperClassName="col-span-2"
                          adornment={cardBrandLabel[brand]}
                          error={errors.cardNumber?.message}
                          name={field.name}
                          ref={field.ref}
                          value={field.value}
                          onBlur={field.onBlur}
                          onChange={(e) => field.onChange(formatCardNumber(e.target.value))}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="cardExpiry"
                      render={({ field }) => (
                        <InputField
                          label="Expiry (MM / YY)"
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          placeholder="MM / YY"
                          error={errors.cardExpiry?.message}
                          name={field.name}
                          ref={field.ref}
                          value={field.value}
                          onBlur={field.onBlur}
                          onChange={(e) => {
                            const raw = e.target.value;
                            // Let backspace through the " / " separator.
                            field.onChange(raw.length < field.value.length && field.value.endsWith(" / ") ? raw.replace(/ \/ ?$/, "") : formatExpiry(raw));
                          }}
                        />
                      )}
                    />
                    <InputField
                      label="Security code"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      maxLength={brand === "amex" ? 4 : 3}
                      placeholder={brand === "amex" ? "4 digits" : "3 digits"}
                      error={errors.cardCvc?.message}
                      {...register("cardCvc", { setValueAs: (v: string) => onlyDigits(v) })}
                    />
                    <InputField label="Name on card" autoComplete="cc-name" wrapperClassName="col-span-2" error={errors.cardName?.message} {...register("cardName")} />
                    <div className="col-span-2">
                      <Checkbox label="Billing address is the same as delivery" {...register("billingSame")} />
                    </div>
                    {!billingSame && (
                      <>
                        <InputField label="Billing street and number" autoComplete="billing address-line1" wrapperClassName="col-span-2" error={errors.billingAddress?.message} {...register("billingAddress")} />
                        <InputField label="Billing postal code" autoComplete="billing postal-code" error={errors.billingPostalCode?.message} {...register("billingPostalCode")} />
                        <InputField label="Billing city" autoComplete="billing address-level2" error={errors.billingCity?.message} {...register("billingCity")} />
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>

        <div className="border-t border-soot pb-section pt-20">
          {Object.keys(errors).length > 0 && (
            <p role="alert" className="pb-10 text-body-sm">
              Some details need another look. They are marked above.
            </p>
          )}
          <button
            type="submit"
            disabled={isSubmitting || !ready}
            className="min-h-[56px] w-full bg-graphite px-16 text-body-sm text-chalk transition-transform duration-[var(--duration-fast)] active:translate-y-px disabled:opacity-60"
          >
            {isSubmitting ? "Placing your order…" : `Pay ${formatPrice(totals.total)}`}
          </button>
          <p className="pt-10 text-center text-caption">
            By placing the order you agree to our{" "}
            <Link href="/shipping-returns" className="underline decoration-1 underline-offset-4">
              shipping and returns terms
            </Link>
            .
          </p>
        </div>
      </form>

      <aside aria-labelledby="checkout-summary" className="max-lg:hidden lg:sticky lg:top-0 lg:self-start lg:px-32 lg:pt-32">
        <h2 id="checkout-summary" className="pb-13 text-caption uppercase">
          Order summary
        </h2>
        {summary}
      </aside>
    </div>
  );
}

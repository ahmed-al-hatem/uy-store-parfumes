import { z } from "zod";
import { detectBrand, expiryIsFuture, luhn, onlyDigits } from "@/lib/card";

export const COUNTRIES = [
  { code: "DE", name: "Germany" },
  { code: "AT", name: "Austria" },
  { code: "CH", name: "Switzerland" },
  { code: "FR", name: "France" },
  { code: "NL", name: "Netherlands" },
  { code: "BE", name: "Belgium" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "DK", name: "Denmark" },
  { code: "SE", name: "Sweden" },
  { code: "GB", name: "United Kingdom" },
] as const;

const countryCodes = COUNTRIES.map((c) => c.code) as [string, ...string[]];
const required = (label: string) => z.string().trim().min(1, `Enter your ${label}.`);

export const checkoutSchema = z
  .object({
    email: z.string().trim().pipe(z.email("Enter an email address like name@example.com.")),
    newsletter: z.boolean(),
    country: z.enum(countryCodes, "Choose a country."),
    firstName: required("first name"),
    lastName: required("last name"),
    address1: z.string().trim().min(3, "Enter your street and house number."),
    address2: z.string().trim(),
    postalCode: z
      .string()
      .trim()
      .regex(/^[A-Za-z0-9][A-Za-z0-9 -]{2,9}$/, "Enter a postal code like 10115."),
    city: required("city"),
    phone: z
      .string()
      .trim()
      .refine((v) => v === "" || /^\+?[0-9 ()-]{7,20}$/.test(v), "Enter a phone number like +49 30 1234567, or leave it empty."),
    shippingMethod: z.enum(["standard", "express"]),
    paymentMethod: z.enum(["card", "cod", "wallet"]),
    cardNumber: z.string(),
    cardExpiry: z.string(),
    cardCvc: z.string(),
    cardName: z.string(),
    billingSame: z.boolean(),
    billingAddress: z.string(),
    billingPostalCode: z.string(),
    billingCity: z.string(),
  })
  .superRefine((v, ctx) => {
    if (v.paymentMethod === "card") {
      const digits = onlyDigits(v.cardNumber);
      const amex = detectBrand(digits) === "amex";
      if (digits.length < 13 || !luhn(digits)) ctx.addIssue({ code: "custom", path: ["cardNumber"], message: "Enter a valid card number." });
      if (!expiryIsFuture(v.cardExpiry)) ctx.addIssue({ code: "custom", path: ["cardExpiry"], message: "Enter a future expiry date as MM / YY." });
      if (onlyDigits(v.cardCvc).length !== (amex ? 4 : 3))
        ctx.addIssue({ code: "custom", path: ["cardCvc"], message: amex ? "Enter the 4 digits on the front of the card." : "Enter the 3 digits on the back of the card." });
      if (v.cardName.trim().length < 2) ctx.addIssue({ code: "custom", path: ["cardName"], message: "Enter the name as it appears on the card." });
    }
    if (!v.billingSame) {
      if (v.billingAddress.trim().length < 3) ctx.addIssue({ code: "custom", path: ["billingAddress"], message: "Enter the billing street and house number." });
      if (!/^[A-Za-z0-9][A-Za-z0-9 -]{2,9}$/.test(v.billingPostalCode.trim()))
        ctx.addIssue({ code: "custom", path: ["billingPostalCode"], message: "Enter the billing postal code." });
      if (!v.billingCity.trim()) ctx.addIssue({ code: "custom", path: ["billingCity"], message: "Enter the billing city." });
    }
  });

export type CheckoutValues = z.infer<typeof checkoutSchema>;

export const checkoutDefaults: CheckoutValues = {
  email: "",
  newsletter: false,
  country: "DE",
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  postalCode: "",
  city: "",
  phone: "",
  shippingMethod: "standard",
  paymentMethod: "card",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
  cardName: "",
  billingSame: true,
  billingAddress: "",
  billingPostalCode: "",
  billingCity: "",
};

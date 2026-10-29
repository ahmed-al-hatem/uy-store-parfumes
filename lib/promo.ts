/** Mock promo codes (listed in README). Codes are case-insensitive. */
export type Promo =
  | { code: string; kind: "percent"; value: number; label: string }
  | { code: string; kind: "amount"; value: number; minSubtotal: number; label: string }
  | { code: string; kind: "shipping"; label: string };

export const PROMOS: Promo[] = [
  { code: "WELCOME10", kind: "percent", value: 10, label: "10% off your first order" },
  { code: "STUDIO20", kind: "amount", value: 20, minSubtotal: 150, label: "€20 off orders over €150" },
  { code: "FREESHIP", kind: "shipping", label: "Free standard delivery" },
];

export type PromoResult = { ok: true; promo: Promo } | { ok: false; message: string };

export function checkPromo(input: string, subtotal: number): PromoResult {
  const code = input.trim().toUpperCase();
  if (!code) return { ok: false, message: "Enter a code." };
  const promo = PROMOS.find((p) => p.code === code);
  if (!promo) return { ok: false, message: `${code} is not a valid code. Check the spelling and try again.` };
  if (promo.kind === "amount" && subtotal < promo.minSubtotal) {
    return { ok: false, message: `${code} applies to orders over €${promo.minSubtotal}.` };
  }
  return { ok: true, promo };
}

export const findPromo = (code: string | null) => (code ? (PROMOS.find((p) => p.code === code.toUpperCase()) ?? null) : null);

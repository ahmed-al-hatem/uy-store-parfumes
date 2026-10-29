// Card-field helpers for the mock checkout. Nothing here is sent anywhere.

export type CardBrand = "visa" | "mastercard" | "amex" | "discover" | "unknown";

export const cardBrandLabel: Record<CardBrand, string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "American Express",
  discover: "Discover",
  unknown: "",
};

export function detectBrand(digits: string): CardBrand {
  if (/^4/.test(digits)) return "visa";
  if (/^(5[1-5]|2(2[2-9]|[3-6]\d|7[01]|720))/.test(digits)) return "mastercard";
  if (/^3[47]/.test(digits)) return "amex";
  if (/^(6011|65|64[4-9])/.test(digits)) return "discover";
  return "unknown";
}

export const onlyDigits = (s: string) => s.replace(/\D/g, "");

/** Visa/MC: 4-4-4-4. Amex: 4-6-5. */
export function formatCardNumber(value: string) {
  const digits = onlyDigits(value);
  if (detectBrand(digits) === "amex") {
    const d = digits.slice(0, 15);
    return [d.slice(0, 4), d.slice(4, 10), d.slice(10, 15)].filter(Boolean).join(" ");
  }
  return digits
    .slice(0, 19)
    .replace(/(\d{4})(?=\d)/g, "$1 ")
    .trim();
}

export function formatExpiry(value: string) {
  const d = onlyDigits(value).slice(0, 4);
  if (d.length === 1 && Number(d) > 1) return `0${d} / `;
  return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
}

export function luhn(digits: string) {
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let n = Number(digits[digits.length - 1 - i]);
    if (i % 2 === 1) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
  }
  return digits.length > 0 && sum % 10 === 0;
}

export function expiryIsFuture(value: string, now = new Date()) {
  const [mm, yy] = value.split("/").map((s) => Number(s.trim()));
  if (!mm || mm < 1 || mm > 12 || Number.isNaN(yy)) return false;
  const year = 2000 + yy;
  return year > now.getFullYear() || (year === now.getFullYear() && mm >= now.getMonth() + 1);
}

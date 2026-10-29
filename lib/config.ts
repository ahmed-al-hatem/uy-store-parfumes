/** Store-wide settings. Change currency or the regional wallet here (DECISIONS.md D-08). */
export const storeConfig = {
  name: "UY Studio",
  currency: "EUR",
  locale: "en-US",
  /** Shown as the third payment option at checkout. */
  regionalWallet: { id: "klarna", label: "Klarna", note: "Pay in 3 interest-free instalments" },
  freeShippingThreshold: 150,
  standardShipping: 8,
  expressShipping: 18,
  freeSamples: 2,
} as const;

const currencyFormat = new Intl.NumberFormat(storeConfig.locale, {
  style: "currency",
  currency: storeConfig.currency,
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export const formatPrice = (amount: number) => currencyFormat.format(amount);

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
  /** Offered as complimentary samples in the cart. */
  sampleSlugs: [
    "amber-oval-perfume",
    "amber-square-perfume",
    "clear-glass-perfume",
    "floral-glass-perfume",
    "blue-glass-perfume",
    "tilo-skin-99-9",
    "maison-margiela-replica-jazz-club",
    "jo-malone-wood-sage-sea-salt",
  ],
} as const;

const wholeFormat = new Intl.NumberFormat(storeConfig.locale, { style: "currency", currency: storeConfig.currency, maximumFractionDigits: 0 });
const centsFormat = new Intl.NumberFormat(storeConfig.locale, { style: "currency", currency: storeConfig.currency, minimumFractionDigits: 2 });

/** €108 for whole amounts, €17.60 otherwise (never €17.6). */
export const formatPrice = (amount: number) => (Number.isInteger(amount) ? wholeFormat : centsFormat).format(amount);

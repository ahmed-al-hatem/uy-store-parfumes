# UY Studio: fragrance store prototype

A front-end-only prototype of a luxury perfume store, built as an interactive client demo. All data is mocked; nothing is charged or sent. Every screen behaves like a shipped store: search, filters, infinite scroll, product pages, bag, checkout and confirmation.

- **Design:** started from [DESIGN.md](DESIGN.md); the client later replaced its grey palette and type with a warm ivory and bronze system with serif headings (DECISIONS.md D-44 to D-50). Every decision is in [DECISIONS.md](DECISIONS.md).
- **Photos:** the client's originals in [`perfumes/`](perfumes), used unchanged. The inventory and grouping are in [IMAGES.md](IMAGES.md).

## Setup

Requires Node 20.9 or newer (developed on Node 24).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (static pages + two mock API routes)
npm start          # serve the production build
npm run lint
npm run images     # re-run the photo inventory (see below)
```

Set `NEXT_PUBLIC_SITE_URL` in production so Open Graph, canonical URLs, the sitemap and JSON-LD use the real domain (defaults to `http://localhost:3000`).

## Stack

| | Why |
|---|---|
| Next.js 16 (App Router, Cache Components) + TypeScript strict | Static generation for every shop, category and product page |
| Tailwind CSS v4 | Semantic tokens in `app/globals.css` (`canvas`, `surface`, `ink`, `muted`, `line`, `accent`, `accent-strong`); Tailwind's defaults are cleared, so only these values exist. Change the palette there. Fonts: Cormorant Garamond (headings) and DM Sans (body) in `app/layout.tsx` |
| `radix-ui` | Accessible dialogs, drawers, navigation menu, select, accordion, tabs |
| `motion` | Restrained animation via `LazyMotion` + `m` components, reduced-motion aware |
| `zustand` | Bag and wishlist, persisted to `localStorage` |
| `nuqs` | Shop search, filters, sort and page in the URL |
| `zod` + `react-hook-form` | Checkout validation |
| `sharp` (dev only) | Reads photo sizes, edge colours and blur placeholders |

## Pages

`/` home · `/shop` and `/shop/women|men|unisex` · `/product/[slug]` (69 products) · `/cart` · `/checkout` · `/checkout/confirmation` · `/wishlist` · `/account` · `/about` · `/shipping-returns` · `/faq` · `/contact` · `/dev/images` (photo review, not indexed) · 404.

## Mock promo codes

| Code | Effect |
|---|---|
| `WELCOME10` | 10% off |
| `STUDIO20` | €20 off orders over €150 |
| `FREESHIP` | Free standard delivery |

Delivery is €8 (free from €150 after discounts), express €18, gift wrap €6. Change these in [`lib/config.ts`](lib/config.ts), [`lib/pricing.ts`](lib/pricing.ts) and [`lib/promo.ts`](lib/promo.ts). The currency (EUR) and the regional wallet (Klarna) are also set in `lib/config.ts`.

For a test checkout, use a published test card number such as `4242 4242 4242 4242`, any future expiry and any 3-digit code. Card numbers are checked locally (Luhn, brand, expiry) and never leave the browser.

## Adding a product

1. **Drop the photos** into `./perfumes`. Name them `<slug>-1.webp`, `<slug>-2.webp`, … (`.jpg`, `.png` and `.avif` also work). Files sharing a stem with `-1`, `-2` become one product's gallery; a single file becomes its own product. Never edit the originals; the script only copies them.
2. **Optional:** set the gallery order (the first photo is the card image) in [`scripts/image-groups.json`](scripts/image-groups.json) under `order`, or exclude a file with `exclude`.
3. **Run the inventory:**
   ```bash
   npm run images
   ```
   This copies the photos unchanged to `public/images/products/<slug>/01.webp, 02.webp, …` and regenerates [`data/product-images.generated.ts`](data/product-images.generated.ts) with each photo's real width and height, blur placeholder and edge colour (the frame background).
4. **Write the copy:** add an entry for the slug in [`data/products.ts`](data/products.ts) (name, house, concentration, sizes and prices, family, notes, longevity, sillage, seasons, story). New houses go in [`data/brands.ts`](data/brands.ts).
5. `npm run build`. The build fails with a clear message if a product has no photos, or photos have no copy.

## Replacing the mock data

The UI never imports data directly. Everything goes through two files:

- [`lib/api.ts`](lib/api.ts): browser side (`fetchProducts`, `fetchSuggestions`, `fetchSummaries`), calling the route handlers in `app/api/`.
- [`lib/api.server.ts`](lib/api.server.ts): server side (`listProducts`, `getProduct`, `getProductReviews`, `getRelated`, …), used by Server Components and the route handlers.

To connect Shopify Storefront or a custom backend, reimplement `lib/api.server.ts` (and the in-memory engine in [`lib/shop/engine.ts`](lib/shop/engine.ts)), keep the return types in [`lib/types.ts`](lib/types.ts), and remove the artificial delay in [`lib/latency.ts`](lib/latency.ts). Orders are written to `localStorage` in [`lib/orders.ts`](lib/orders.ts); replace `saveOrder`/`getOrder` with real calls. The bag lives in [`store/cart.ts`](store/cart.ts); a real store would keep it server-side (cookie) so the bag and checkout render on the server.

## Project structure

```
perfumes/                        client's original photos (read-only)
public/images/products/<slug>/   unchanged copies, clean names
scripts/                         photo inventory script and grouping config
app/(store)/                     store routes (header, footer, bag drawer)
app/(checkout)/                  checkout routes (minimal layout)
app/api/                         mock API route handlers
components/ui/                   primitives (icons, checkbox)
components/product/              ProductFrame, ProductCard, Gallery, NotesPyramid, QuickView, …
components/shop/                 ShopView, FilterDrawer, SortSelect, SearchBox, InfiniteGrid
components/cart/ checkout/       bag drawer, cart page, checkout form, confirmation
components/home/ motion/         home sections, motion primitives
data/                            products, brands, reviews, taxonomy, generated photo data
lib/                             api, search, pricing, promo, card helpers, config
store/                           zustand stores (bag, wishlist)
```

## Lighthouse

Production build (`next start`) on localhost, Lighthouse 12, mobile preset. Performance is the median of three runs with Lighthouse's default simulated throttling (slow 4G, 4× CPU). Applied DevTools throttling was run once per page for comparison.

| Page | Performance | Accessibility | Best practices | SEO | LCP (simulated) | LCP (applied throttling) | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| Home | 89–90 | 100 | 100 | 100 | 3.4 s | 2.4 s | 150 ms | 0 |
| Shop | 81–84 | 100 | 100 | 100 | 3.9 s | 2.0 s | 250–310 ms | 0 |
| Product | 84–91 | 100 | 100 | 100 | 3.2 s | 2.0 s | 145–370 ms | 0 |
| FAQ | 94 | 100 | 100 | 100 | 2.5 s | n/a | 210 ms | 0 |
| Cart | 88 | 100 | 100 | 63* | 3.3 s | n/a | 236 ms | 0 |
| Checkout | 88 | 100 | 100 | 63* | 3.6 s | n/a | 196 ms | 0 |

\* Cart and checkout are `noindex` on purpose.

Notes:
- Accessibility (100) and CLS (0) meet the targets everywhere. Performance ≥ 90 is met on home, product (median) and content pages; the shop is 81–84.
- **LCP:** with applied throttling, home, shop and product pages paint their LCP in 2.0–2.4 s (under 2.5 s). Lighthouse's *simulated* LCP is 3.2–3.9 s because on localhost every script finishes before the real LCP, so the simulation counts all ~300 KB of JavaScript as blocking the hero image. Measure on the deployed site (CDN, HTTP/2, compression) for representative numbers.
- **Shop:** the filterable grid reads the URL, which Next.js only knows at request time, so page 1 is prerendered as static HTML and then re-rendered on the client. A server-rendered grid per URL (Partial Prerendering) would close most of the remaining gap.
- **Cart and checkout:** the bag is stored in the browser, so its contents appear only after JavaScript runs. A cookie-backed server cart would let them render on the server.
- Scores on a busy desktop vary by ±5 between runs.

## Known limits

- No real backend, payments, accounts or e-mail. Every one of these is clearly a demo in the UI.
- Photos are 1000 × 1000 px. They are sharp in cards but slightly soft in the 50%-width desktop gallery on retina screens; higher-resolution originals fix that with no code change.
- Store copy (About, FAQ, shipping, contact details, address and hours), prices and generated reviews are demo content to confirm before launch. See DECISIONS.md D-17, D-19 to D-21 and D-41.

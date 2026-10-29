# DECISIONS.md

Decisions where DESIGN.md is silent or conflicts with the build brief. DESIGN.md wins unless noted.

| # | Topic | Decision | Why |
|---|---|---|---|
| D-01 | Typeface | **DM Sans 400** via `next/font/google`, exposed as `--font-gp`. | GP is proprietary; DESIGN.md lists "Inter or DM Sans" as substitutes. DM Sans is the less default of the two. |
| D-02 | Body 16px size | Added `--text-body: 16px` (line-height 1.77, tracking 0.011em). | DESIGN.md lists 16px among sizes and 1.77 as the top of its line-height range, but gives no role row for it. Used for long-form copy (product story, About). |
| D-03 | Motion | Durations 240 / 480 / 900 ms; easing `cubic-bezier(0.22, 1, 0.36, 1)` (soft ease-out, no overshoot). No springs with bounce. | DESIGN.md defines no motion. The brief asks for slow, soft, expensive motion. |
| D-04 | Product frame | **1:1 frame, `object-fit: contain`, photo edge to edge** (no mat). Frame background = the photo's measured edge colour. | Every source photo is 1000×1000, so a 1:1 frame shows the whole photo with no bands. DESIGN.md: "the photograph IS the card". Approved by client. |
| D-05 | Saturated photo backgrounds | Not matted, not edited (see D-04). Where a product has a calmer photo it is the card image. | Client chose edge-to-edge over a Chalk mat. |
| D-06 | Desktop filters | **Filter drawer from the start edge** on every width (bottom sheet on phones), not a fixed sidebar. | DESIGN.md: "No sidebar", 5-column full-bleed grid. Approved by client. |
| D-07 | Hero | Split editorial hero: square photo frame + 48px headline. No full-bleed photo, no light-sweep gradient. | A full-viewport hero would crop the 1:1 photos; DESIGN.md bans decorative gradients. Approved by client. |
| D-08 | Currency / wallet | EUR (`Intl.NumberFormat("en-US", { currency: "EUR" })`), regional wallet **Klarna**. Both in `lib/config.ts`. | DESIGN.md nav shows EUR. Approved by client. |
| D-09 | Unbranded bottles | Five unlabelled bottles form the store's own **UY** line, one letter each (A, S, B, C, F). | IMAGES.md flag F2; DESIGN.md letter system. |
| D-10 | Focus ring | 1px Soot outline, 3px offset. | DESIGN.md has no focus style; uses only existing colour and hairline weight. |
| D-11 | Touch target | `--spacing-touch: 44px` added as a sizing token. | Accessibility floor from the brief; not a visual spacing value. |
| D-12 | Theme | Light only, no dark mode. | DESIGN.md: "Theme: light"; Limestone is the identity. |
| D-13 | Navigation labels | Start zone: SHOP ▾ (full-width panel: wear, families, houses, one featured bottle), FOR HER, FOR HIM, SHARED. End zone: SEARCH, THE STUDIO, LOG IN, wishlist and bag icons. Phones: MENU drawer from the start edge, search, account and bag icons. | DESIGN.md's links (homewear, clothing, journal) describe a wider brand; this store sells fragrance only. "Shared" reads warmer than "unisex" in the nav; filters keep "Unisex". |
| D-14 | Uppercase nav and labels | Kept, per DESIGN.md, even though the frontend-design skill discourages all-caps labels. | DESIGN.md is binding. |
| D-15 | Hairlines | 1px Soot rules under the announcement bar, the header, between grid cells and above the footer. | DESIGN.md requires them; the taste skill bans thin rules, DESIGN.md wins. |
| D-16 | Sticky header | The nav row sticks to the top; the announcement bar scrolls away. Flat Limestone, no blur or shadow. | Keeps the bag and menu in reach on long pages without adding chrome. |
| D-17 | Store address and hours | Linienstraße 40, Berlin; Tuesday to Saturday 11–19, Sunday by appointment. | Placeholder content for the demo; confirm or replace before launch. |
| D-18 | Overlay scrim | `bg-soot/30` behind drawers. | Built from the Soot token; DESIGN.md has no overlay value. |
| D-19 | Catalog copy and prices | Real fragrances keep their published notes; prices are demo EUR prices close to European retail. Unlabelled and unknown-house bottles have notes written to match their look (IMAGES.md F2). | Brief: real copy, faithful to known fragrances. |
| D-20 | Uncertain variants | `prada` is listed as *Luna Rossa Black*, `dolce-gabbana-the-one` as *The One for Men EDP*, `gucci-guilty` as *Guilty Pour Femme*; Sauvage offers EDP and Parfum sizes. | IMAGES.md F4; confirm with the client. |
| D-21 | Reviews | Generated deterministically per product from family-specific lines (3–8 each), so ratings are stable between builds. | Demo data; no real customer quotes are invented per product. |
| D-22 | Product card | Brand (13px), name and "From" price (15px), centred under the photo; second photo fades in on hover-capable screens; "Sold out" tag when no size is in stock. | DESIGN.md card shows name and price; brand added because the store is multi-house. |
| D-23 | Infinite scroll | 15 per page; next page loads 400px before the end; `?page=N` updated with history replace; a shared `?page=3` loads three pages; "Load more" stays visible as a fallback. Scroll position is restored when returning from a product page. | Brief. |
| D-24 | Filter URL keys | `q, gender, brand, family, notes, concentration, size, priceMin, priceMax, rating, inStock, sort, page`; lists comma-separated; filter changes push history, typing and paging replace it. | Shareable and back-button safe without flooding history. |
| D-25 | Product page layout | Desktop: photos stacked in the start half, purchase panel sticky in the end half, hairline between. Phones: swipeable photo row with a counter, then the panel. Below both: notes pyramid with longevity and sillage meters, reviews, "You may also like". | DESIGN.md has no PDP; this keeps the photo as the dominant object and the grid language of the shop. |
| D-26 | Second Graphite button | The phone-only sticky bar repeats Add to bag in Graphite; it appears only after the main button has scrolled away, so one Graphite button is visible at a time. | DESIGN.md: Graphite at most once per page; the brief asks for a sticky add-to-cart bar on mobile. |
| D-27 | Buy now and wishlist | Text actions (underlined caption) beside the Graphite button. | DESIGN.md: text links are the primary interaction pattern. |
| D-28 | Zoom | Full-screen viewer, tap or click toggles 2× and pans with the pointer or a finger; requests at most the original 1000 px; loaded with `next/dynamic` on first open. | Brief: zoom + swipe, code-split. |
| D-29 | Open Graph image | The product's first photo, the original WebP at 1000×1000. | Brief: OG from the real photos; converting to JPEG would be processing outside `next/image`. Most platforms accept WebP. |
| D-30 | Delivery estimate | Rendered in the browser: 2–3 working days, 14:00 cut-off, weekends skipped. A neutral line is in the static HTML. | The date depends on when the page is read, not when it was built. |
| D-31 | Bag drawer | Slides in from the end edge when something is added, and from the header bag icon (still a real link to `/cart` for new tabs). Holds lines, the free-delivery bar, totals, Checkout and a link to the full bag. | Brief: slide-over drawer plus full page. |
| D-32 | Money rules | Prices include VAT. Standard delivery €8, free from €150 after discounts; express €18 always. Gift wrap €6. Promo codes: `WELCOME10` (10%), `STUDIO20` (€20 off over €150), `FREESHIP`. Amounts show no cents when whole, otherwise two decimals. | Demo values in `lib/config.ts`, `lib/pricing.ts`, `lib/promo.ts`. |
| D-33 | Undo | The last removed line can be restored for 6 seconds, including from the empty bag. | Brief: remove with undo. |
| D-34 | Checkout chrome | Own layout: back to bag, wordmark, "Secure checkout"; no navigation or footer. Express buttons are plain bordered text (no wallet logos) and explain they are demo-only. | Shopify-style focus; DESIGN.md has no colour for third-party marks. |
| D-35 | Checkout validation | zod + react-hook-form, errors on blur then live, focus moves to the first error, a summary line above Pay. Card: Luhn, brand detection (Visa, Mastercard, Amex, Discover), Amex 4-6-5 grouping and 4-digit CVC, expiry must be in the future. | Brief. |
| D-36 | Orders | Saved to `localStorage` (`uy-orders`, last 20) for the confirmation page and the account order history; the cart is cleared after a successful mock payment. | No backend in this prototype. |

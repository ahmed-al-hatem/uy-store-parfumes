# IMAGES.md — inventory of `./perfumes`

Every file in `./perfumes` was opened and looked at (contact sheets of all 124 files, then single files where a label needed reading). Size and edge colour come from a script that reads each file's real pixel size and the mean colour of a 2.5% strip around its four edges.

**Rule for this build:** photos are used exactly as they are. No cutouts, background removal, cropping, retouching or recolouring. The only processing is copying, renaming to clean slugs, and the format/size conversion `next/image` does. `./perfumes` is read-only; copies go to `/public/images/products/<slug>/01.webp, 02.webp, …`.

## Summary

| | |
|---|---|
| Image files | 124 (all `.webp`, RGB, no alpha) |
| Resolution | **1000 × 1000 px for every file** |
| Aspect ratio | **1:1 for every file** |
| Photo type | editorial still-life / lifestyle; the background runs to every edge (no packshots, no transparency) |
| Groups in `perfumes/products.json` | 71 |
| Sellable products (after F1) | **69** |
| Unusable as a product image | 2 (F1) |
| Low resolution | none, but see the resolution note |

**Frame decision that follows from this:** every photo is 1:1, so a **1:1 frame with `object-fit: contain` shows the whole photo with no empty bands at all**. The per-image edge colour is still stored and used as the frame background (behind the blur placeholder while loading, and in any frame that is not square).

**Resolution note:** 1000 px stays sharp up to a 500 CSS px frame on 2× screens. Product cards (about 290 px on desktop, 180 px on phones) are fine. The PDP gallery and the home hero at desktop width (about 640–720 px) are upscaled about 1.4× on retina screens: slightly soft, not broken. Higher-resolution originals from the client would fix it.

## Flags for your review

- **F1 — not a single product (2 files).** `acqua-di-gio-fahrenheit-cool-water` shows three houses (Armani, Dior, Davidoff). `perfume-oil-dropper` shows lab vials, no product. Proposal: not in the catalog; the dropper shot is the one atmosphere photo on the About page.
- **F2 — no house on the label (8 products).** `amber-oval-perfume`, `amber-square-perfume`, `blue-glass-perfume`, `clear-glass-perfume`, `floral-glass-perfume` show no label at all. `red-diamond`, `l-eau-laurissi`, `tilo-skin-99-9` show a product name but no known house. Proposal: the five unlabelled bottles become the store's own **UY** line using the DESIGN.md letter system (temporary names *UY A — Ambre Ovale*, *UY S — Soleil Carré*, *UY B — Bleu Miniature*, *UY C — Cristal Taillé*, *UY F — Fleur de Verre*); the three named ones keep the label name and show the house as the label reads it (Red Diamond, Laurissi, Tilo).
- **F3 — the only photo of a product also shows other products or a hand (5 products).** `gucci-guilty` (shop shelf), `lancome-poeme`, `montblanc-explorer`, `roberto-cavalli-gemma-di-paradiso`, `hugo-boss-bottled`. Cropping is not allowed, so the other bottles stay visible. Options: keep them (alt text names the right bottle), or leave these 5 out (64 products).
- **F4 — variant uncertain.** `armani-si-2` (black bottle, likely *Sì Intense*), `burberry-weekend-2` (frosted, looks like *Weekend for Women*), `dior-sauvage-2` (label reads *Parfum*), `dolce-gabbana-the-one-1` (dark cap, likely *The One for Men EDP*), `miu-miu` (EDP and L'Eau Bleue together), `prada` (flanker unreadable, likely *Luna Rossa Black*). Proposal: keep the grouping; Sauvage offers EDP / Parfum as concentrations because both bottles are photographed.
- **F5 — saturated backgrounds against the four-grey palette.** `chanel-coco-noir-2` (coral), `dolce-gabbana-11-la-force-1/3` (yellow), `valentino-voce-viva-2` (teal), `blue-glass-perfume` (iridescent), `creed-green-irish-tweed` (yellow-gold). Not edited. Where possible a calmer photo of the same product is the card image; where it is the only photo, see the frame choice in the plan.
- **Gallery-only photos.** Photos with a hand, another brand or clutter are never the card image; they sit last in their product's gallery.

## Product grouping

Grouping comes from the file names and `perfumes/products.json`, confirmed by looking: every group shows the same bottle. **Card** = the photo used on the product card and first in the gallery (calmest on-palette background with the whole bottle in view). The order is set in `scripts/image-groups.json`; `npm run images` applies it.

| # | Product slug | Files (gallery order) | Card | Flags |
|---|---|---|---|---|
| 1 | acca-kappa-muschio-bianco | `acca-kappa-muschio-bianco` | `acca-kappa-muschio-bianco` |  |
| 2 | acqua-di-gio-fahrenheit-cool-water | `acqua-di-gio-fahrenheit-cool-water` | `acqua-di-gio-fahrenheit-cool-water` | F1 drop |
| 3 | amber-oval-perfume | `amber-oval-perfume` | `amber-oval-perfume` | F2 |
| 4 | amber-square-perfume | `amber-square-perfume` | `amber-square-perfume` | F2 |
| 5 | armani-acqua-di-gio | `armani-acqua-di-gio-2`, `armani-acqua-di-gio-1` | `armani-acqua-di-gio-2` |  |
| 6 | armani-acqua-di-gio-profumo | `armani-acqua-di-gio-profumo-2`, `armani-acqua-di-gio-profumo-1` | `armani-acqua-di-gio-profumo-2` |  |
| 7 | armani-si | `armani-si-1`, `armani-si-2` | `armani-si-1` | F4 |
| 8 | armani-stronger-with-you-intensely | `armani-stronger-with-you-intensely-1`, `armani-stronger-with-you-intensely-2` | `armani-stronger-with-you-intensely-1` |  |
| 9 | armani-sun-di-gioia | `armani-sun-di-gioia` | `armani-sun-di-gioia` |  |
| 10 | azzaro-chrome | `azzaro-chrome` | `azzaro-chrome` |  |
| 11 | bleu-de-chanel | `bleu-de-chanel-1`, `bleu-de-chanel-2` | `bleu-de-chanel-1` |  |
| 12 | blue-glass-perfume | `blue-glass-perfume` | `blue-glass-perfume` | F2 F5 |
| 13 | boss-bottled-infinite | `boss-bottled-infinite-1`, `boss-bottled-infinite-2` | `boss-bottled-infinite-1` |  |
| 14 | burberry-brit | `burberry-brit-1`, `burberry-brit-2` | `burberry-brit-1` |  |
| 15 | burberry-weekend | `burberry-weekend-1`, `burberry-weekend-2` | `burberry-weekend-1` | F4 |
| 16 | bvlgari-man-wood-neroli | `bvlgari-man-wood-neroli-2`, `bvlgari-man-wood-neroli-1`, `bvlgari-man-wood-neroli-3` | `bvlgari-man-wood-neroli-2` |  |
| 17 | chanel-allure-homme-sport | `chanel-allure-homme-sport` | `chanel-allure-homme-sport` |  |
| 18 | chanel-chance-eau-tendre | `chanel-chance-eau-tendre` | `chanel-chance-eau-tendre` |  |
| 19 | chanel-coco-mademoiselle | `chanel-coco-mademoiselle-2`, `chanel-coco-mademoiselle-1`, `chanel-coco-mademoiselle-3` | `chanel-coco-mademoiselle-2` |  |
| 20 | chanel-coco-noir | `chanel-coco-noir-1`, `chanel-coco-noir-2` | `chanel-coco-noir-1` | F5 |
| 21 | chanel-n5 | `chanel-n5-2`, `chanel-n5-1` | `chanel-n5-2` |  |
| 22 | chloe | `chloe` | `chloe` |  |
| 23 | ck-one | `ck-one-2`, `ck-one-1` | `ck-one-2` |  |
| 24 | clear-glass-perfume | `clear-glass-perfume` | `clear-glass-perfume` | F2 |
| 25 | creed-green-irish-tweed | `creed-green-irish-tweed` | `creed-green-irish-tweed` | F5 |
| 26 | dior-sauvage | `dior-sauvage-1`, `dior-sauvage-2`, `dior-sauvage-3` | `dior-sauvage-1` | F4 |
| 27 | diptyque-do-son | `diptyque-do-son-1`, `diptyque-do-son-2`, `diptyque-do-son-3` | `diptyque-do-son-1` |  |
| 28 | dolce-gabbana-11-la-force | `dolce-gabbana-11-la-force-2`, `dolce-gabbana-11-la-force-1`, `dolce-gabbana-11-la-force-3` | `dolce-gabbana-11-la-force-2` | F5 |
| 29 | dolce-gabbana-dolce | `dolce-gabbana-dolce-2`, `dolce-gabbana-dolce-1` | `dolce-gabbana-dolce-2` |  |
| 30 | dolce-gabbana-the-one | `dolce-gabbana-the-one-1`, `dolce-gabbana-the-one-2` | `dolce-gabbana-the-one-1` | F4 |
| 31 | dolce-gabbana-the-one-grey | `dolce-gabbana-the-one-grey-2`, `dolce-gabbana-the-one-grey-1`, `dolce-gabbana-the-one-grey-3` | `dolce-gabbana-the-one-grey-2` |  |
| 32 | floral-glass-perfume | `floral-glass-perfume` | `floral-glass-perfume` | F2 |
| 33 | givenchy-gentleman | `givenchy-gentleman-1`, `givenchy-gentleman-2` | `givenchy-gentleman-1` |  |
| 34 | givenchy-irresistible | `givenchy-irresistible-1`, `givenchy-irresistible-2`, `givenchy-irresistible-3` | `givenchy-irresistible-1` |  |
| 35 | gucci-bloom | `gucci-bloom-1`, `gucci-bloom-2`, `gucci-bloom-3` | `gucci-bloom-1` |  |
| 36 | gucci-guilty | `gucci-guilty` | `gucci-guilty` | F3 |
| 37 | gucci-memoire-d-une-odeur | `gucci-memoire-d-une-odeur-2`, `gucci-memoire-d-une-odeur-1`, `gucci-memoire-d-une-odeur-3` | `gucci-memoire-d-une-odeur-2` |  |
| 38 | hermes-h24 | `hermes-h24-2`, `hermes-h24-1` | `hermes-h24-2` |  |
| 39 | hugo-boss-bottled | `hugo-boss-bottled` | `hugo-boss-bottled` | F3 |
| 40 | hugo-man | `hugo-man-1`, `hugo-man-2` | `hugo-man-1` |  |
| 41 | jo-malone-nectarine-blossom-honey | `jo-malone-nectarine-blossom-honey` | `jo-malone-nectarine-blossom-honey` |  |
| 42 | jo-malone-wood-sage-sea-salt | `jo-malone-wood-sage-sea-salt-1`, `jo-malone-wood-sage-sea-salt-2`, `jo-malone-wood-sage-sea-salt-3` | `jo-malone-wood-sage-sea-salt-1` |  |
| 43 | l-eau-laurissi | `l-eau-laurissi` | `l-eau-laurissi` | F2 |
| 44 | lancome-la-vie-est-belle | `lancome-la-vie-est-belle-1`, `lancome-la-vie-est-belle-2` | `lancome-la-vie-est-belle-1` |  |
| 45 | lancome-poeme | `lancome-poeme` | `lancome-poeme` | F3 |
| 46 | lancome-tresor | `lancome-tresor-1`, `lancome-tresor-2`, `lancome-tresor-3` | `lancome-tresor-1` |  |
| 47 | maison-margiela-replica-jazz-club | `maison-margiela-replica-jazz-club-1`, `maison-margiela-replica-jazz-club-2` | `maison-margiela-replica-jazz-club-1` |  |
| 48 | marc-jacobs-daisy | `marc-jacobs-daisy` | `marc-jacobs-daisy` |  |
| 49 | miss-dior | `miss-dior` | `miss-dior` |  |
| 50 | miu-miu | `miu-miu` | `miu-miu` | F4 |
| 51 | montblanc-explorer | `montblanc-explorer` | `montblanc-explorer` | F3 |
| 52 | montblanc-legend-spirit | `montblanc-legend-spirit-2`, `montblanc-legend-spirit-1`, `montblanc-legend-spirit-3` | `montblanc-legend-spirit-2` |  |
| 53 | montblanc-starwalker | `montblanc-starwalker-1`, `montblanc-starwalker-2` | `montblanc-starwalker-1` |  |
| 54 | paco-rabanne-1-million | `paco-rabanne-1-million-1`, `paco-rabanne-1-million-2`, `paco-rabanne-1-million-3` | `paco-rabanne-1-million-1` |  |
| 55 | perfume-oil-dropper | `perfume-oil-dropper` | `perfume-oil-dropper` | F1 drop |
| 56 | prada | `prada` | `prada` | F4 |
| 57 | red-diamond | `red-diamond` | `red-diamond` | F2 |
| 58 | roberto-cavalli-gemma-di-paradiso | `roberto-cavalli-gemma-di-paradiso` | `roberto-cavalli-gemma-di-paradiso` | F3 |
| 59 | terre-d-hermes | `terre-d-hermes-1`, `terre-d-hermes-2` | `terre-d-hermes-1` |  |
| 60 | tilo-skin-99-9 | `tilo-skin-99-9` | `tilo-skin-99-9` | F2 |
| 61 | valentino-donna | `valentino-donna` | `valentino-donna` |  |
| 62 | valentino-voce-viva | `valentino-voce-viva-1`, `valentino-voce-viva-2` | `valentino-voce-viva-1` | F5 |
| 63 | vera-wang-for-men | `vera-wang-for-men` | `vera-wang-for-men` |  |
| 64 | versace-crystal-noir | `versace-crystal-noir-1`, `versace-crystal-noir-2` | `versace-crystal-noir-1` |  |
| 65 | versace-eros | `versace-eros` | `versace-eros` |  |
| 66 | ysl-libre | `ysl-libre` | `ysl-libre` |  |
| 67 | ysl-mon-paris | `ysl-mon-paris` | `ysl-mon-paris` |  |
| 68 | zara-at-dawn | `zara-at-dawn-2`, `zara-at-dawn-1`, `zara-at-dawn-3` | `zara-at-dawn-2` |  |
| 69 | zara-oriental | `zara-oriental-1`, `zara-oriental-2` | `zara-oriental-1` |  |
| 70 | zara-seoul | `zara-seoul` | `zara-seoul` |  |
| 71 | zara-vibrant-leather | `zara-vibrant-leather-1`, `zara-vibrant-leather-2`, `zara-vibrant-leather-3` | `zara-vibrant-leather-1` |  |

## Per-image inventory

Every file is 1000 × 1000, aspect ratio 1:1. **Edge colour** is the measured mean of the outer strip (stored in the product data as the frame colour). **Background** = plain / soft / busy (edge variance) and dark / mid / light (edge luminance).

| File | What it shows | Visible label | Size | Ratio | Edge colour | Background | Verdict |
|---|---|---|---|---|---|---|---|
| `acca-kappa-muschio-bianco.webp` | Single bottle, dried gypsophila | Acca Kappa · Muschio Bianco · Acqua di Colonia | 1000×1000 | 1:1 | `#bcc2c9` | soft, light | usable |
| `acqua-di-gio-fahrenheit-cool-water.webp` | THREE bottles from three houses (Acqua di Giò, Dior Fahrenheit, Davidoff Cool Water) | Armani / Dior / Davidoff | 1000×1000 | 1:1 | `#353334` | busy, dark | unusable — three houses in one frame (F1) |
| `amber-oval-perfume.webp` | Single unbranded oval bottle on satin | none visible | 1000×1000 | 1:1 | `#9f7a52` | soft, mid | usable |
| `amber-square-perfume.webp` | Single unbranded square bottle on linen, hard sun | none visible | 1000×1000 | 1:1 | `#a29c97` | busy, mid | usable |
| `armani-acqua-di-gio-1.webp` | Bottle close-up on denim | Acqua di Giò · Giorgio Armani · Pour Homme | 1000×1000 | 1:1 | `#465b6f` | busy, mid | usable |
| `armani-acqua-di-gio-2.webp` | Bottle lying on woven rug, hard shadow | Acqua di Giò | 1000×1000 | 1:1 | `#4a4a46` | busy, mid | usable |
| `armani-acqua-di-gio-profumo-1.webp` | Two Profumo bottles, studio | Acqua di Giò Profumo · Giorgio Armani | 1000×1000 | 1:1 | `#47535c` | busy, mid | usable |
| `armani-acqua-di-gio-profumo-2.webp` | Single bottle tilted, cap off, white seamless | Acqua di Giò Parfum | 1000×1000 | 1:1 | `#f9fafa` | plain, light | usable |
| `armani-si-1.webp` | Single bottle, reflection on dark water | Sì · Giorgio Armani | 1000×1000 | 1:1 | `#081014` | soft, dark | usable |
| `armani-si-2.webp` | Black bottle in gold glitter | Sì (dark flanker — likely Sì Intense) | 1000×1000 | 1:1 | `#292116` | busy, dark | usable |
| `armani-stronger-with-you-intensely-1.webp` | Single bottle on grey ledge | Stronger With You Intensely · Emporio Armani | 1000×1000 | 1:1 | `#485e5b` | soft, mid | usable |
| `armani-stronger-with-you-intensely-2.webp` | Bottle on dark fur | Stronger With You Intensely | 1000×1000 | 1:1 | `#172321` | plain, dark | usable |
| `armani-sun-di-gioia.webp` | Bottle with gypsophila on magazine | Sun di Gioia · Giorgio Armani | 1000×1000 | 1:1 | `#a9927a` | busy, mid | usable |
| `azzaro-chrome.webp` | Small bottle on black, reflective line | label unreadable (file name: Azzaro Chrome) | 1000×1000 | 1:1 | `#060a0d` | plain, dark | usable |
| `bleu-de-chanel-1.webp` | Single bottle, light-blue seamless | Bleu de Chanel · Eau de Parfum | 1000×1000 | 1:1 | `#ccedfd` | plain, light | usable |
| `bleu-de-chanel-2.webp` | Single bottle on black | Bleu de Chanel | 1000×1000 | 1:1 | `#0c191e` | plain, dark | usable |
| `blue-glass-perfume.webp` | Single unbranded blue miniature, iridescent backdrop | none visible | 1000×1000 | 1:1 | `#233f6a` | busy, dark, saturated | usable — saturated background (F5) |
| `boss-bottled-infinite-1.webp` | Bottle leaning on wall | BOSS Bottled Infinite | 1000×1000 | 1:1 | `#4c5553` | soft, mid | usable |
| `boss-bottled-infinite-2.webp` | Bottle on black with crystals | BOSS Bottled Infinite | 1000×1000 | 1:1 | `#030303` | plain, dark | usable |
| `burberry-brit-1.webp` | Box + bottle on striped linen | Burberry Brit (for Her) · EDT | 1000×1000 | 1:1 | `#b7b0a1` | busy, mid | usable |
| `burberry-brit-2.webp` | Box + bottle on knit and linen | Burberry Brit | 1000×1000 | 1:1 | `#b09160` | busy, mid | usable |
| `burberry-weekend-1.webp` | Single bottle, white seamless | Burberry Weekend · For Men | 1000×1000 | 1:1 | `#e4e4e0` | plain, light | usable |
| `burberry-weekend-2.webp` | Frosted bottle among dried flowers | Burberry Weekend (frosted — looks like the women's version) | 1000×1000 | 1:1 | `#8f8579` | soft, mid | usable |
| `bvlgari-man-wood-neroli-1.webp` | Bottle close-up, warm light, citrus | Bvlgari Man Wood Neroli | 1000×1000 | 1:1 | `#9c6d30` | busy, mid, saturated | usable |
| `bvlgari-man-wood-neroli-2.webp` | Bottle front, warm light | Bvlgari Man Wood Neroli | 1000×1000 | 1:1 | `#734b1b` | soft, mid, saturated | usable |
| `bvlgari-man-wood-neroli-3.webp` | Bottle held in a hand, leaves | Bvlgari Man Wood Neroli | 1000×1000 | 1:1 | `#6e7c6f` | busy, mid | usable — hand in shot; gallery only |
| `chanel-allure-homme-sport.webp` | Bottle in a sports bag | Allure Homme Sport · Chanel | 1000×1000 | 1:1 | `#242e28` | busy, dark | usable |
| `chanel-chance-eau-tendre.webp` | Round bottle in front of roses | Chance Eau Tendre · Chanel | 1000×1000 | 1:1 | `#686866` | busy, mid | usable |
| `chanel-coco-mademoiselle-1.webp` | Bottle on white with pink petals | Coco Mademoiselle · Chanel | 1000×1000 | 1:1 | `#eee0e7` | soft, light | usable |
| `chanel-coco-mademoiselle-2.webp` | Bottle among roses | Coco Mademoiselle · Chanel Paris | 1000×1000 | 1:1 | `#e3e2dd` | soft, light | usable |
| `chanel-coco-mademoiselle-3.webp` | Bottle on vintage tray, jewellery | Coco Mademoiselle | 1000×1000 | 1:1 | `#987655` | busy, mid | usable |
| `chanel-coco-noir-1.webp` | Bottle front with red flower behind | Coco Noir · Chanel Paris | 1000×1000 | 1:1 | `#b2aead` | busy, mid | usable |
| `chanel-coco-noir-2.webp` | Bottle front on coral-red seamless | Coco Noir · Chanel | 1000×1000 | 1:1 | `#e2837c` | busy, mid, saturated | usable — saturated background (F5) |
| `chanel-n5-1.webp` | Bottle front on pale blue | N°5 Chanel · Eau de Parfum | 1000×1000 | 1:1 | `#b3cfe3` | plain, light, saturated | usable |
| `chanel-n5-2.webp` | Bottle tilted on grey | N°5 Chanel Paris · Eau de Parfum | 1000×1000 | 1:1 | `#c6c8ca` | plain, light | usable |
| `chloe.webp` | Bottle with ribbon, neon-lit on black | Chloé | 1000×1000 | 1:1 | `#000507` | plain, dark | usable — coloured light cast |
| `ck-one-1.webp` | Bottle held in hand on black | ck one · Calvin Klein (black edition) | 1000×1000 | 1:1 | `#221f16` | soft, dark | usable — hand in shot; gallery only |
| `ck-one-2.webp` | Frosted bottle in white towel | ck one · Calvin Klein | 1000×1000 | 1:1 | `#c6d6e7` | soft, light | usable |
| `clear-glass-perfume.webp` | Unbranded faceted bottle + two jars, hard sun | none visible | 1000×1000 | 1:1 | `#dfb064` | soft, mid, saturated | usable |
| `creed-green-irish-tweed.webp` | Bottle on yellow-to-dark backdrop | Creed · Green Irish Tweed | 1000×1000 | 1:1 | `#b49341` | busy, mid, saturated | usable — saturated background (F5) |
| `dior-sauvage-1.webp` | Bottle, blue side light | Sauvage · Dior · Eau de Parfum | 1000×1000 | 1:1 | `#222c56` | soft, dark | usable |
| `dior-sauvage-2.webp` | Bottle on stacked stone coasters | Sauvage · Dior · Parfum | 1000×1000 | 1:1 | `#32392d` | busy, dark | usable |
| `dior-sauvage-3.webp` | Bottle, green side light | Sauvage · Dior · Eau de Parfum | 1000×1000 | 1:1 | `#1e3024` | soft, dark | usable |
| `diptyque-do-son-1.webp` | Oval bottle on teal fabric | Diptyque · Do Son | 1000×1000 | 1:1 | `#042a35` | plain, dark | usable |
| `diptyque-do-son-2.webp` | Bottle on white, hard shadow | Diptyque · Do Son | 1000×1000 | 1:1 | `#cfd8da` | soft, light | usable |
| `diptyque-do-son-3.webp` | Bottle in a pouch with a Chanel hand cream | Diptyque · Do Son (+ Chanel tube) | 1000×1000 | 1:1 | `#8e877e` | busy, mid | usable — Chanel tube in shot; gallery only |
| `dolce-gabbana-11-la-force-1.webp` | Bottle with palm shadow, yellow | D&G · 11 La Force | 1000×1000 | 1:1 | `#ceb041` | busy, mid, saturated | usable — saturated background (F5) |
| `dolce-gabbana-11-la-force-2.webp` | Bottle among cardamom pods | D&G · 11 La Force | 1000×1000 | 1:1 | `#c5b4a5` | busy, mid | usable |
| `dolce-gabbana-11-la-force-3.webp` | Bottle on plain yellow | D&G · 11 La Force | 1000×1000 | 1:1 | `#daba1f` | soft, mid, saturated | usable — saturated background (F5) |
| `dolce-gabbana-dolce-1.webp` | Bottle with floral print, tilted | Dolce · Dolce&Gabbana | 1000×1000 | 1:1 | `#6c645f` | busy, mid | usable |
| `dolce-gabbana-dolce-2.webp` | Bottle on open book with rose | Dolce · Dolce&Gabbana | 1000×1000 | 1:1 | `#967b66` | busy, mid | usable |
| `dolce-gabbana-the-one-1.webp` | Bottle on white side table | Dolce&Gabbana · The One (dark cap — likely The One for Men EDP) | 1000×1000 | 1:1 | `#c6cbcb` | soft, light | usable |
| `dolce-gabbana-the-one-2.webp` | Bottle with wood cap on plaster | Dolce&Gabbana · The One | 1000×1000 | 1:1 | `#c3c4c4` | soft, light | usable |
| `dolce-gabbana-the-one-grey-1.webp` | Bottle close-up, cool light | Dolce&Gabbana · The One Grey | 1000×1000 | 1:1 | `#bac8d4` | busy, light | usable |
| `dolce-gabbana-the-one-grey-2.webp` | Bottle tilted on white, hard light | The One Grey · Dolce&Gabbana | 1000×1000 | 1:1 | `#e8e8e8` | plain, light | usable |
| `dolce-gabbana-the-one-grey-3.webp` | Bottle in ice with lemon slices | The One Grey · Dolce&Gabbana | 1000×1000 | 1:1 | `#cbd0d1` | soft, light | usable |
| `floral-glass-perfume.webp` | Unbranded round cut-glass bottle in flowers | none visible | 1000×1000 | 1:1 | `#c9ad92` | busy, mid | usable |
| `givenchy-gentleman-1.webp` | Bottle on black with coal | Gentleman · Givenchy | 1000×1000 | 1:1 | `#0d0f10` | plain, dark | usable |
| `givenchy-gentleman-2.webp` | Bottle, angled, black | Gentleman · Givenchy | 1000×1000 | 1:1 | `#202223` | soft, dark | usable |
| `givenchy-irresistible-1.webp` | Bottle + lipstick on white sheet | Irresistible · Givenchy | 1000×1000 | 1:1 | `#c3c0c6` | soft, light | usable |
| `givenchy-irresistible-2.webp` | Bottle with lipsticks + cream tube | Irresistible · Givenchy | 1000×1000 | 1:1 | `#dddee0` | plain, light | usable — other Givenchy cosmetics; gallery only |
| `givenchy-irresistible-3.webp` | Bottle with lipsticks + tube | Irresistible · Givenchy | 1000×1000 | 1:1 | `#d7d6d9` | soft, light | usable — other Givenchy cosmetics; gallery only |
| `gucci-bloom-1.webp` | Bottle on white seamless | Gucci · Bloom | 1000×1000 | 1:1 | `#f5f5f6` | plain, light | usable |
| `gucci-bloom-2.webp` | Bottle flat-lay with phone case, lip products | Gucci · Bloom | 1000×1000 | 1:1 | `#a39594` | busy, mid | usable — other brands in shot; gallery only |
| `gucci-bloom-3.webp` | Bottle among books and a bag | Gucci · Bloom | 1000×1000 | 1:1 | `#caa89d` | busy, mid | usable — clutter; gallery only |
| `gucci-guilty.webp` | Retail shelf of several Gucci bottles | Gucci (Guilty centre) | 1000×1000 | 1:1 | `#797252` | busy, mid | usable with caveat — retail shelf, several bottles (only photo, F3) |
| `gucci-memoire-d-une-odeur-1.webp` | Green ribbed bottle, chamomile glasses | Gucci · Mémoire d'une Odeur | 1000×1000 | 1:1 | `#727968` | soft, mid | usable |
| `gucci-memoire-d-une-odeur-2.webp` | Bottle upright beside glass | Gucci · Mémoire d'une Odeur | 1000×1000 | 1:1 | `#939d91` | busy, mid | usable |
| `gucci-memoire-d-une-odeur-3.webp` | Bottle lying in peonies | Gucci · Mémoire d'une Odeur | 1000×1000 | 1:1 | `#4d314b` | soft, dark | usable |
| `hermes-h24-1.webp` | Bottle on black, low key | H24 · Hermès | 1000×1000 | 1:1 | `#101010` | soft, dark | usable |
| `hermes-h24-2.webp` | Bottle on white sheet, B&W | H24 · Hermès | 1000×1000 | 1:1 | `#636363` | busy, mid | usable |
| `hugo-boss-bottled.webp` | Bottle floating above a hand | BOSS Bottled | 1000×1000 | 1:1 | `#353637` | busy, dark | usable with caveat — hand in shot (only photo, F3) |
| `hugo-man-1.webp` | Box + bottle on rocks, blue sky | HUGO Man | 1000×1000 | 1:1 | `#819893` | busy, mid | usable |
| `hugo-man-2.webp` | HUGO bottle + Montblanc Explorer lying in front | HUGO (+ Montblanc) | 1000×1000 | 1:1 | `#cacbc7` | soft, light | usable — Montblanc bottle in shot; gallery only |
| `jo-malone-nectarine-blossom-honey.webp` | Bottle on pure black | Jo Malone London · Nectarine Blossom & Honey · Cologne | 1000×1000 | 1:1 | `#010100` | plain, dark | usable |
| `jo-malone-wood-sage-sea-salt-1.webp` | Bottle on cracked plaster, from above | Jo Malone London · Wood Sage & Sea Salt | 1000×1000 | 1:1 | `#cacac9` | plain, light | usable |
| `jo-malone-wood-sage-sea-salt-2.webp` | Bottle outdoors, grass bokeh | Jo Malone London · Wood Sage & Sea Salt | 1000×1000 | 1:1 | `#909262` | busy, mid | usable |
| `jo-malone-wood-sage-sea-salt-3.webp` | Bottle + box with ribbon on stone | Jo Malone London · Wood Sage & Sea Salt | 1000×1000 | 1:1 | `#97a4a4` | busy, mid | usable |
| `l-eau-laurissi.webp` | Round bottle on cream, rings | L'Eau Laurissi · eau de poème | 1000×1000 | 1:1 | `#d0b6a1` | soft, light | usable |
| `lancome-la-vie-est-belle-1.webp` | Bottle with ribbon, pink flowers | La Vie est Belle (Lancôme) | 1000×1000 | 1:1 | `#dbc1c7` | soft, light | usable |
| `lancome-la-vie-est-belle-2.webp` | Bottle lying on silk | La Vie est Belle | 1000×1000 | 1:1 | `#c9c7cd` | soft, light | usable |
| `lancome-poeme.webp` | Poême beside two other houses' bottles | Lancôme · Poême (+ others) | 1000×1000 | 1:1 | `#897f78` | busy, mid | usable with caveat — two other houses in shot (only photo, F3) |
| `lancome-tresor-1.webp` | Bottle floating on white | Trésor · Lancôme | 1000×1000 | 1:1 | `#e0e1e9` | plain, light | usable |
| `lancome-tresor-2.webp` | Bottle on crumpled white | Trésor | 1000×1000 | 1:1 | `#a09eab` | busy, mid | usable |
| `lancome-tresor-3.webp` | Bottle with Christmas baubles | Trésor | 1000×1000 | 1:1 | `#8e7664` | busy, mid | usable |
| `maison-margiela-replica-jazz-club-1.webp` | Bottle with box, bokeh | Maison Margiela · Replica · Jazz Club | 1000×1000 | 1:1 | `#b7b4ab` | busy, mid | usable |
| `maison-margiela-replica-jazz-club-2.webp` | Bottle + box, B&W | Maison Margiela · Replica · Jazz Club | 1000×1000 | 1:1 | `#333333` | busy, dark | usable |
| `marc-jacobs-daisy.webp` | Bottle on plinth, leaf shadow | Daisy · Marc Jacobs | 1000×1000 | 1:1 | `#4d3720` | busy, dark | usable |
| `miss-dior.webp` | Bottle on warm seamless, long shadow | Miss Dior | 1000×1000 | 1:1 | `#dfd6cc` | soft, light | usable |
| `miu-miu.webp` | Two bottles (Miu Miu EDP + L'Eau Bleue) | miu miu | 1000×1000 | 1:1 | `#273c3f` | busy, dark | usable — two variants in one frame (F4) |
| `montblanc-explorer.webp` | B&W shelf; Explorer among other bottles | Montblanc Explorer (+ others) | 1000×1000 | 1:1 | `#ababab` | busy, mid | usable with caveat — other bottles in shot (only photo, F3) |
| `montblanc-legend-spirit-1.webp` | White bottle in white linen | Montblanc · Legend Spirit | 1000×1000 | 1:1 | `#e0e0de` | plain, light | usable |
| `montblanc-legend-spirit-2.webp` | White bottle, front | Montblanc · Legend Spirit | 1000×1000 | 1:1 | `#dfe0de` | plain, light | usable |
| `montblanc-legend-spirit-3.webp` | Bottle with gold chain | Montblanc · Legend Spirit | 1000×1000 | 1:1 | `#dededc` | plain, light | usable |
| `montblanc-starwalker-1.webp` | Bottle in white linen | Montblanc · Starwalker | 1000×1000 | 1:1 | `#e5e6e3` | plain, light | usable |
| `montblanc-starwalker-2.webp` | Bottle in white linen, closer | Montblanc · Starwalker | 1000×1000 | 1:1 | `#f3f4f2` | plain, light | usable |
| `paco-rabanne-1-million-1.webp` | Gold ingot bottle, white seamless | 1 Million · Paco Rabanne | 1000×1000 | 1:1 | `#e9e8e5` | busy, light | usable |
| `paco-rabanne-1-million-2.webp` | Bottle with light streaks | 1 Million | 1000×1000 | 1:1 | `#9c8a77` | busy, mid | usable |
| `paco-rabanne-1-million-3.webp` | Macro of embossed logo | 1 Million | 1000×1000 | 1:1 | `#a18f6e` | busy, mid | usable — macro detail; gallery only |
| `perfume-oil-dropper.webp` | Glass vials + dropper, no product | none | 1000×1000 | 1:1 | `#938b7b` | busy, mid | unusable as a product — no bottle (F1); usable as atmosphere |
| `prada.webp` | Black bottle among coal, low key | PRADA · Milano (flanker not readable — likely Luna Rossa Black) | 1000×1000 | 1:1 | `#050606` | plain, dark | usable |
| `red-diamond.webp` | Red square bottle on wood | RED DIAMOND (house not shown) | 1000×1000 | 1:1 | `#575b5d` | busy, mid | usable |
| `roberto-cavalli-gemma-di-paradiso.webp` | Cavalli bottle in front of a Victoria's Secret bottle | Roberto Cavalli · Gemma di Paradiso (+ VS) | 1000×1000 | 1:1 | `#c0c3c3` | busy, light | usable with caveat — Victoria's Secret bottle behind (only photo, F3) |
| `terre-d-hermes-1.webp` | Bottle on white fur, B&W | Terre d'Hermès | 1000×1000 | 1:1 | `#acacac` | busy, mid | usable |
| `terre-d-hermes-2.webp` | Bottle on reflective table, cool | Terre d'Hermès | 1000×1000 | 1:1 | `#526c83` | busy, mid | usable |
| `tilo-skin-99-9.webp` | Brown bottle with wooden cap on driftwood | TILO · SKIN 99.9 · 50 ml | 1000×1000 | 1:1 | `#3d2714` | soft, dark, saturated | usable |
| `valentino-donna.webp` | Studded bottle cropped, pink fabric | none visible (Valentino Donna by shape/file name) | 1000×1000 | 1:1 | `#ccb1a9` | soft, mid | usable |
| `valentino-voce-viva-1.webp` | Bottle in warm side light | Valentino (Voce Viva by file name) | 1000×1000 | 1:1 | `#6a350b` | busy, dark, saturated | usable |
| `valentino-voce-viva-2.webp` | Bottle on teal geometric surface | Voce Viva · Valentino | 1000×1000 | 1:1 | `#2d6258` | busy, mid | usable — saturated background (F5) |
| `vera-wang-for-men.webp` | Bottle on wooden table, plant | Vera Wang · For Men | 1000×1000 | 1:1 | `#bcc0b8` | busy, light | usable |
| `versace-crystal-noir-1.webp` | Bottle in white paper shred | Versace · Crystal Noir | 1000×1000 | 1:1 | `#b9baac` | busy, mid | usable |
| `versace-crystal-noir-2.webp` | Box + faceted bottle, dark | Versace · Crystal Noir | 1000×1000 | 1:1 | `#151616` | plain, dark | usable |
| `versace-eros.webp` | Bottle front, plant behind | Versace · Eros | 1000×1000 | 1:1 | `#7b7e7e` | busy, mid | usable |
| `ysl-libre.webp` | Bottle floating in water droplets | Libre · YSL | 1000×1000 | 1:1 | `#231f05` | soft, dark | usable |
| `ysl-mon-paris.webp` | Bottle with black rocks on white | YSL · Mon Paris (pink bottle, bow) | 1000×1000 | 1:1 | `#9a9a9b` | busy, mid | usable |
| `zara-at-dawn-1.webp` | Dark bottle with shells, sand, close | AT DAWN · Zara Men Night Collection 01 | 1000×1000 | 1:1 | `#624c3b` | busy, mid | usable |
| `zara-at-dawn-2.webp` | Bottle with shells, dark | AT DAWN · Zara Men | 1000×1000 | 1:1 | `#201610` | soft, dark | usable |
| `zara-at-dawn-3.webp` | Bottle with water droplets | AT DAWN · Zara Men Night Collection 01 | 1000×1000 | 1:1 | `#392617` | busy, dark | usable |
| `zara-oriental-1.webp` | Bottle behind orange petals | ORIENTAL · Zara Day Collection 02 | 1000×1000 | 1:1 | `#a4855f` | soft, mid | usable |
| `zara-oriental-2.webp` | Bottle close-up, orange petals | ORIENTAL · Zara Day Collection 02 | 1000×1000 | 1:1 | `#885940` | busy, mid | usable |
| `zara-seoul.webp` | Bottle on grey seamless with reflection | ZARA · Seoul 532-8 Sinsa Dong Gangnam-Gu | 1000×1000 | 1:1 | `#bebec3` | plain, light | usable |
| `zara-vibrant-leather-1.webp` | Bottle tilted, warm light | VIBRANT LEATHER · Zara | 1000×1000 | 1:1 | `#412e1d` | busy, dark | usable |
| `zara-vibrant-leather-2.webp` | Bottle tilted, column, warm | VIBRANT LEATHER · Zara | 1000×1000 | 1:1 | `#4a290a` | busy, dark, saturated | usable |
| `zara-vibrant-leather-3.webp` | Bottle smaller, column, warm | VIBRANT LEATHER · Zara | 1000×1000 | 1:1 | `#231608` | soft, dark | usable |

## Sources

Every file's source URL is recorded in `perfumes/products.json` (all Unsplash).

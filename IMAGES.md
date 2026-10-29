# IMAGES.md — inventory of `./perfumes`

Every file in `./perfumes` was opened and inspected. All 124 images are **1000 × 1000 px WebP, RGB, no alpha**. 
They are editorial/lifestyle photographs (sources recorded in `perfumes/products.json`, all Unsplash), not studio packshots, so most backgrounds are busy and every bottle needs a cutout to reach the DESIGN.md "object on a chalk plinth" look.

`./perfumes` is treated as read-only. Processed output will go to `/public/images/products/<slug>/`.

## Summary

| | Count |
|---|---|
| Image files | 124 |
| Groups in `perfumes/products.json` | 71 |
| Distinct sellable products (after flags F1) | **69** |
| Usable | 108 |
| Needs cleanup (other products, hands, clutter) | 14 |
| Unusable as a product image | 2 |
| Unbranded / unknown house (flag F2) | 8 |

## Flags for your review

- **F1 — not a single product.** `acqua-di-gio-fahrenheit-cool-water` shows three bottles from three different houses (Armani, Dior, Davidoff). `perfume-oil-dropper` shows lab vials and a dropper, no product. Proposal: drop both from the catalog; use the dropper shot as atmosphere on the About page and the trio as a secondary gallery image of Acqua di Giò.
- **F2 — unbranded or unknown house.** `amber-oval-perfume`, `amber-square-perfume`, `blue-glass-perfume`, `clear-glass-perfume`, `floral-glass-perfume` show no label. `red-diamond`, `l-eau-laurissi`, `tilo-skin-99-9` show a name but no recognisable house. Proposal: the five unlabelled bottles become the store's own **UY Studio** line, named with the DESIGN.md letter system (temporary names: *UY A — Ambre Ovale*, *UY S — Soleil Carré*, *UY B — Bleu Miniature*, *UY C — Cristal*, *UY F — Fleur de Verre*); the three named ones keep their label name with the house shown as the label reads (Red Diamond, Laurissi, Tilo).
- **F3 — product shares the frame with others.** `gucci-guilty` (retail shelf), `lancome-poeme`, `montblanc-explorer` are each the only photo of their product and show other bottles too. A cutout can isolate the right bottle but quality will be lower; they will be checked on the contact sheet.
- **F4 — grouping or variant uncertain.** `armani-si-2` (dark bottle — likely *Sì Intense*), `burberry-weekend-2` (frosted — looks like *Weekend for Women*), `dior-sauvage-2` (label reads *Parfum*, not EDP), `dolce-gabbana-the-one-1` (dark cap — likely *The One for Men*), `miu-miu` (two variants in one frame), `prada` (flanker not readable). Proposal: keep each grouped as listed, and present the variant differences as concentration options where that is true (Sauvage EDP / Parfum).

## Product grouping

Main image = the file the cutout and card image will be made from.

| # | Product (slug) | Files | Main image | Notes |
|---|---|---|---|---|
| 1 | acca-kappa-muschio-bianco | 1 | `acca-kappa-muschio-bianco` |  |
| 2 | acqua-di-gio-fahrenheit-cool-water | 1 | `acqua-di-gio-fahrenheit-cool-water` | F1 — drop |
| 3 | amber-oval-perfume | 1 | `amber-oval-perfume` | F2 |
| 4 | amber-square-perfume | 1 | `amber-square-perfume` | F2 |
| 5 | armani-acqua-di-gio | 2 | `armani-acqua-di-gio-1` |  |
| 6 | armani-acqua-di-gio-profumo | 2 | `armani-acqua-di-gio-profumo-2` |  |
| 7 | armani-si | 2 | `armani-si-1` | F4 |
| 8 | armani-stronger-with-you-intensely | 2 | `armani-stronger-with-you-intensely-1` |  |
| 9 | armani-sun-di-gioia | 1 | `armani-sun-di-gioia` |  |
| 10 | azzaro-chrome | 1 | `azzaro-chrome` |  |
| 11 | bleu-de-chanel | 2 | `bleu-de-chanel-1` |  |
| 12 | blue-glass-perfume | 1 | `blue-glass-perfume` | F2 |
| 13 | boss-bottled-infinite | 2 | `boss-bottled-infinite-1` |  |
| 14 | burberry-brit | 2 | `burberry-brit-1` |  |
| 15 | burberry-weekend | 2 | `burberry-weekend-1` | F4 |
| 16 | bvlgari-man-wood-neroli | 3 | `bvlgari-man-wood-neroli-2` |  |
| 17 | chanel-allure-homme-sport | 1 | `chanel-allure-homme-sport` |  |
| 18 | chanel-chance-eau-tendre | 1 | `chanel-chance-eau-tendre` |  |
| 19 | chanel-coco-mademoiselle | 3 | `chanel-coco-mademoiselle-2` |  |
| 20 | chanel-coco-noir | 2 | `chanel-coco-noir-1` |  |
| 21 | chanel-n5 | 2 | `chanel-n5-2` |  |
| 22 | chloe | 1 | `chloe` |  |
| 23 | ck-one | 2 | `ck-one-1` |  |
| 24 | clear-glass-perfume | 1 | `clear-glass-perfume` | F2 |
| 25 | creed-green-irish-tweed | 1 | `creed-green-irish-tweed` |  |
| 26 | dior-sauvage | 3 | `dior-sauvage-1` | F4 |
| 27 | diptyque-do-son | 3 | `diptyque-do-son-1` |  |
| 28 | dolce-gabbana-11-la-force | 3 | `dolce-gabbana-11-la-force-3` |  |
| 29 | dolce-gabbana-dolce | 2 | `dolce-gabbana-dolce-2` |  |
| 30 | dolce-gabbana-the-one | 2 | `dolce-gabbana-the-one-1` | F4 |
| 31 | dolce-gabbana-the-one-grey | 3 | `dolce-gabbana-the-one-grey-2` |  |
| 32 | floral-glass-perfume | 1 | `floral-glass-perfume` | F2 |
| 33 | givenchy-gentleman | 2 | `givenchy-gentleman-1` |  |
| 34 | givenchy-irresistible | 3 | `givenchy-irresistible-1` |  |
| 35 | gucci-bloom | 3 | `gucci-bloom-1` |  |
| 36 | gucci-guilty | 1 | `gucci-guilty` | F3 |
| 37 | gucci-memoire-d-une-odeur | 3 | `gucci-memoire-d-une-odeur-2` |  |
| 38 | hermes-h24 | 2 | `hermes-h24-2` |  |
| 39 | hugo-boss-bottled | 1 | `hugo-boss-bottled` |  |
| 40 | hugo-man | 2 | `hugo-man-1` |  |
| 41 | jo-malone-nectarine-blossom-honey | 1 | `jo-malone-nectarine-blossom-honey` |  |
| 42 | jo-malone-wood-sage-sea-salt | 3 | `jo-malone-wood-sage-sea-salt-2` |  |
| 43 | l-eau-laurissi | 1 | `l-eau-laurissi` | F2 |
| 44 | lancome-la-vie-est-belle | 2 | `lancome-la-vie-est-belle-1` |  |
| 45 | lancome-poeme | 1 | `lancome-poeme` | F3 |
| 46 | lancome-tresor | 3 | `lancome-tresor-1` |  |
| 47 | maison-margiela-replica-jazz-club | 2 | `maison-margiela-replica-jazz-club-1` |  |
| 48 | marc-jacobs-daisy | 1 | `marc-jacobs-daisy` |  |
| 49 | miss-dior | 1 | `miss-dior` |  |
| 50 | miu-miu | 1 | `miu-miu` | F4 |
| 51 | montblanc-explorer | 1 | `montblanc-explorer` | F3 |
| 52 | montblanc-legend-spirit | 3 | `montblanc-legend-spirit-2` |  |
| 53 | montblanc-starwalker | 2 | `montblanc-starwalker-1` |  |
| 54 | paco-rabanne-1-million | 3 | `paco-rabanne-1-million-1` |  |
| 55 | perfume-oil-dropper | 1 | `perfume-oil-dropper` | F1 — drop |
| 56 | prada | 1 | `prada` | F4 |
| 57 | red-diamond | 1 | `red-diamond` | F2 |
| 58 | roberto-cavalli-gemma-di-paradiso | 1 | `roberto-cavalli-gemma-di-paradiso` |  |
| 59 | terre-d-hermes | 2 | `terre-d-hermes-1` |  |
| 60 | tilo-skin-99-9 | 1 | `tilo-skin-99-9` | F2 |
| 61 | valentino-donna | 1 | `valentino-donna` |  |
| 62 | valentino-voce-viva | 2 | `valentino-voce-viva-1` |  |
| 63 | vera-wang-for-men | 1 | `vera-wang-for-men` |  |
| 64 | versace-crystal-noir | 2 | `versace-crystal-noir-1` |  |
| 65 | versace-eros | 1 | `versace-eros` |  |
| 66 | ysl-libre | 1 | `ysl-libre` |  |
| 67 | ysl-mon-paris | 1 | `ysl-mon-paris` |  |
| 68 | zara-at-dawn | 3 | `zara-at-dawn-2` |  |
| 69 | zara-oriental | 2 | `zara-oriental-1` |  |
| 70 | zara-seoul | 1 | `zara-seoul` |  |
| 71 | zara-vibrant-leather | 3 | `zara-vibrant-leather-1` |  |

## Per-image inventory

Resolution is 1000 × 1000 for every file, so it is not repeated per row.

| File | What it shows | Visible label | Background | Verdict | Source |
|---|---|---|---|---|---|
| `acca-kappa-muschio-bianco.webp` | Single bottle, dried gypsophila | Acca Kappa · Muschio Bianco · Acqua di Colonia | busy, light | usable | [Unsplash](https://unsplash.com/photos/1591925463023-1ca6b0636780) |
| `acqua-di-gio-fahrenheit-cool-water.webp` | THREE bottles from three houses (Acqua di Giò, Dior Fahrenheit, Davidoff Cool Water) | Armani / Dior / Davidoff | busy, dark | unusable as a single product — see flag F1 | [Unsplash](https://unsplash.com/photos/1629077007578-a36bb1056b3e) |
| `amber-oval-perfume.webp` | Single unbranded oval bottle on satin | none visible | busy, warm satin | usable — unbranded, flag F2 | [Unsplash](https://unsplash.com/photos/1733660227163-01bc46e0d7d7) |
| `amber-square-perfume.webp` | Single unbranded square bottle on linen, hard sun | none visible | busy, warm linen | usable — unbranded, flag F2 | [Unsplash](https://unsplash.com/photos/1588405748880-12d1d2a59f75) |
| `armani-acqua-di-gio-1.webp` | Bottle close-up on denim | Acqua di Giò · Giorgio Armani · Pour Homme | busy, blue fabric | usable (tight crop, cap cropped) | [Unsplash](https://unsplash.com/photos/1706924179763-7f2744656823) |
| `armani-acqua-di-gio-2.webp` | Bottle lying on woven rug, hard shadow | Acqua di Giò | busy, textured | usable (gallery) | [Unsplash](https://unsplash.com/photos/1775639698865-e82725f39178) |
| `armani-acqua-di-gio-profumo-1.webp` | Two Profumo bottles, studio | Acqua di Giò Profumo · Giorgio Armani | plain-ish, dark grey | usable | [Unsplash](https://unsplash.com/photos/1708979165880-dd0ff61fa748) |
| `armani-acqua-di-gio-profumo-2.webp` | Single bottle tilted, cap off, white seamless | Acqua di Giò Parfum | plain, white | usable — best cutout candidate | [Unsplash](https://unsplash.com/photos/1717376280564-0fd179a9695a) |
| `armani-si-1.webp` | Single bottle, reflection on dark water | Sì · Giorgio Armani | busy, dark | usable | [Unsplash](https://unsplash.com/photos/1533603208986-24fd819e718a) |
| `armani-si-2.webp` | Black bottle in gold glitter | Sì (dark flanker — likely Sì Intense) | busy, dark glitter | usable — flag F4 (may be a different flanker) | [Unsplash](https://unsplash.com/photos/1544006593-1a0b9255782d) |
| `armani-stronger-with-you-intensely-1.webp` | Single bottle on grey ledge | Stronger With You Intensely · Emporio Armani | plain-ish, grey | usable — cutout candidate | [Unsplash](https://unsplash.com/photos/1611242956059-53e4c29e6b22) |
| `armani-stronger-with-you-intensely-2.webp` | Bottle on dark fur | Stronger With You Intensely | busy, dark | usable (gallery) | [Unsplash](https://unsplash.com/photos/1611146264101-358a3b387eee) |
| `armani-sun-di-gioia.webp` | Bottle with gypsophila on magazine | Sun di Gioia · Giorgio Armani | busy, warm | usable | [Unsplash](https://unsplash.com/photos/1547887537-6158d64c35b3) |
| `azzaro-chrome.webp` | Small bottle on black, reflective line | label unreadable (file name: Azzaro Chrome) | plain, black | usable — small in frame | [Unsplash](https://unsplash.com/photos/1598634222670-87c5f558119c) |
| `bleu-de-chanel-1.webp` | Single bottle, light-blue seamless | Bleu de Chanel · Eau de Parfum | plain, light blue | usable — best cutout candidate | [Unsplash](https://unsplash.com/photos/1523293182086-7651a899d37f) |
| `bleu-de-chanel-2.webp` | Single bottle on black | Bleu de Chanel | plain, black | usable — cutout candidate (dark glass on dark bg) | [Unsplash](https://unsplash.com/photos/1732828912683-57104a2d1b4b) |
| `blue-glass-perfume.webp` | Single unbranded blue miniature, iridescent backdrop | none visible | busy, saturated colour | needs cleanup — saturated bg clashes with DESIGN.md; unbranded, flag F2 | [Unsplash](https://unsplash.com/photos/1608721279136-cd41b752fa41) |
| `boss-bottled-infinite-1.webp` | Bottle leaning on wall | BOSS Bottled Infinite | plain-ish, grey | usable — cutout candidate | [Unsplash](https://unsplash.com/photos/1638551442447-085a2d42918f) |
| `boss-bottled-infinite-2.webp` | Bottle on black with crystals | BOSS Bottled Infinite | plain, black | usable (gallery) | [Unsplash](https://unsplash.com/photos/1638551457466-7e9b5d6bd470) |
| `burberry-brit-1.webp` | Box + bottle on striped linen | Burberry Brit (for Her) · EDT | busy, light | usable | [Unsplash](https://unsplash.com/photos/1761778304143-4c89e7dd2457) |
| `burberry-brit-2.webp` | Box + bottle on knit and linen | Burberry Brit | busy, warm | usable (gallery) | [Unsplash](https://unsplash.com/photos/1761865544944-2c8da85c869e) |
| `burberry-weekend-1.webp` | Single bottle, white seamless | Burberry Weekend · For Men | plain, white | usable — best cutout candidate | [Unsplash](https://unsplash.com/photos/1657457385219-a8fec445dc1f) |
| `burberry-weekend-2.webp` | Frosted bottle among dried flowers | Burberry Weekend (frosted — looks like the women's version) | busy | usable — flag F4 (may be Weekend for Women) | [Unsplash](https://unsplash.com/photos/1726167527720-1ed1f20385d6) |
| `bvlgari-man-wood-neroli-1.webp` | Bottle close-up, warm light, citrus | Bvlgari Man Wood Neroli | busy, warm | usable (cap cropped) | [Unsplash](https://unsplash.com/photos/1786278304004-6907e6cb6b7c) |
| `bvlgari-man-wood-neroli-2.webp` | Bottle front, warm light | Bvlgari Man Wood Neroli | busy, warm | usable — cutout candidate | [Unsplash](https://unsplash.com/photos/1786278303982-6bdd47f1a2c2) |
| `bvlgari-man-wood-neroli-3.webp` | Bottle held in a hand, leaves | Bvlgari Man Wood Neroli | busy | needs cleanup — hand in shot (gallery only) | [Unsplash](https://unsplash.com/photos/1593105587216-6581c8071e68) |
| `chanel-allure-homme-sport.webp` | Bottle in a sports bag | Allure Homme Sport · Chanel | busy, dark green | usable | [Unsplash](https://unsplash.com/photos/1623742310401-d8057c3c43c8) |
| `chanel-chance-eau-tendre.webp` | Round bottle in front of roses | Chance Eau Tendre · Chanel | busy, pink | usable | [Unsplash](https://unsplash.com/photos/1588177925144-2fd3e4e7ce57) |
| `chanel-coco-mademoiselle-1.webp` | Bottle on white with pink petals | Coco Mademoiselle · Chanel | busy, white | usable | [Unsplash](https://unsplash.com/photos/1595425959632-34f2822322ce) |
| `chanel-coco-mademoiselle-2.webp` | Bottle among roses | Coco Mademoiselle · Chanel Paris | busy, light | usable — cutout candidate | [Unsplash](https://unsplash.com/photos/1592945403244-b3fbafd7f539) |
| `chanel-coco-mademoiselle-3.webp` | Bottle on vintage tray, jewellery | Coco Mademoiselle | busy, warm | usable (gallery) | [Unsplash](https://unsplash.com/photos/1595535373192-fc8935bacd89) |
| `chanel-coco-noir-1.webp` | Bottle front with red flower behind | Coco Noir · Chanel Paris | busy, white/red | usable — cutout candidate | [Unsplash](https://unsplash.com/photos/1594035910387-fea47794261f) |
| `chanel-coco-noir-2.webp` | Bottle front on coral-red seamless | Coco Noir · Chanel | plain, saturated red | usable — cap cropped | [Unsplash](https://unsplash.com/photos/1585218334450-afcf929da36e) |
| `chanel-n5-1.webp` | Bottle front on pale blue | N°5 Chanel · Eau de Parfum | plain, blue | usable — cutout candidate (cap cropped at top) | [Unsplash](https://unsplash.com/photos/1541643600914-78b084683601) |
| `chanel-n5-2.webp` | Bottle tilted on grey | N°5 Chanel Paris · Eau de Parfum | plain, grey | usable — best cutout candidate | [Unsplash](https://unsplash.com/photos/1514348871858-1d3c20902571) |
| `chloe.webp` | Bottle with ribbon, neon-lit on black | Chloé | plain, black, coloured light | usable — coloured light cast | [Unsplash](https://unsplash.com/photos/1514557179557-9efc4d7949cc) |
| `ck-one-1.webp` | Bottle held in hand on black | ck one · Calvin Klein (black edition) | plain, black | needs cleanup — hand in shot | [Unsplash](https://unsplash.com/photos/1614003151344-c3a493e9fb0c) |
| `ck-one-2.webp` | Frosted bottle in white towel | ck one · Calvin Klein | busy, white | usable | [Unsplash](https://unsplash.com/photos/1620848616916-3efaf499adcb) |
| `clear-glass-perfume.webp` | Unbranded faceted bottle + two jars, hard sun | none visible | busy, saturated yellow | usable — unbranded, flag F2 | [Unsplash](https://unsplash.com/photos/1622618991746-fe6004db3a47) |
| `creed-green-irish-tweed.webp` | Bottle on yellow-to-dark backdrop | Creed · Green Irish Tweed | plain, gradient light | usable — cutout candidate | [Unsplash](https://unsplash.com/photos/1624811742200-69166e7b7bcc) |
| `dior-sauvage-1.webp` | Bottle, blue side light | Sauvage · Dior · Eau de Parfum | busy, dark blue | usable — cutout candidate | [Unsplash](https://unsplash.com/photos/1747916148863-7164d8920b57) |
| `dior-sauvage-2.webp` | Bottle on stacked stone coasters | Sauvage · Dior · Parfum | busy, dark green | usable — flag F4 (Parfum, not EDP) | [Unsplash](https://unsplash.com/photos/1732247609999-52bb7c01fcf2) |
| `dior-sauvage-3.webp` | Bottle, green side light | Sauvage · Dior · Eau de Parfum | busy, dark | usable (gallery) | [Unsplash](https://unsplash.com/photos/1747916148827-d5fb453bb978) |
| `diptyque-do-son-1.webp` | Oval bottle on teal fabric | Diptyque · Do Son | busy, teal | usable — cutout candidate | [Unsplash](https://unsplash.com/photos/1631376693912-072cd9697451) |
| `diptyque-do-son-2.webp` | Bottle on white, hard shadow | Diptyque · Do Son | plain-ish, white | usable | [Unsplash](https://unsplash.com/photos/1603547547037-cb2289fecaa3) |
| `diptyque-do-son-3.webp` | Bottle in a pouch with a Chanel hand cream | Diptyque · Do Son (+ Chanel tube) | busy | needs cleanup — another brand in shot (gallery only) | [Unsplash](https://unsplash.com/photos/1685528052059-1990cba99f84) |
| `dolce-gabbana-11-la-force-1.webp` | Bottle with palm shadow, yellow | D&G · 11 La Force | busy, yellow | usable | [Unsplash](https://unsplash.com/photos/1659774483415-487113551d77) |
| `dolce-gabbana-11-la-force-2.webp` | Bottle among cardamom pods | D&G · 11 La Force | busy, white | usable | [Unsplash](https://unsplash.com/photos/1659774483433-988e57ff5c5f) |
| `dolce-gabbana-11-la-force-3.webp` | Bottle on plain yellow | D&G · 11 La Force | plain, yellow | usable — best cutout candidate | [Unsplash](https://unsplash.com/photos/1659774483289-cbb7822c0a50) |
| `dolce-gabbana-dolce-1.webp` | Bottle with floral print, tilted | Dolce · Dolce&Gabbana | busy, colourful | usable (gallery) | [Unsplash](https://unsplash.com/photos/1676139412671-00742a9920a8) |
| `dolce-gabbana-dolce-2.webp` | Bottle on open book with rose | Dolce · Dolce&Gabbana | busy | usable — cutout candidate | [Unsplash](https://unsplash.com/photos/1706838525519-c129896e22bd) |
| `dolce-gabbana-the-one-1.webp` | Bottle on white side table | Dolce&Gabbana · The One (dark cap — likely The One for Men EDP) | plain-ish, white | usable — flag F4 | [Unsplash](https://unsplash.com/photos/1506915925765-ed31516b9080) |
| `dolce-gabbana-the-one-2.webp` | Bottle with wood cap on plaster | Dolce&Gabbana · The One | busy, plaster | usable | [Unsplash](https://unsplash.com/photos/1616949755610-8c9bbc08f138) |
| `dolce-gabbana-the-one-grey-1.webp` | Bottle close-up, cool light | Dolce&Gabbana · The One Grey | plain-ish, cool | usable (cap cropped) | [Unsplash](https://unsplash.com/photos/1601295452898-78a8dd904ab3) |
| `dolce-gabbana-the-one-grey-2.webp` | Bottle tilted on white, hard light | The One Grey · Dolce&Gabbana | plain, white | usable — best cutout candidate | [Unsplash](https://unsplash.com/photos/1601295445656-6db161fb654d) |
| `dolce-gabbana-the-one-grey-3.webp` | Bottle in ice with lemon slices | The One Grey · Dolce&Gabbana | busy, cool | usable (gallery) | [Unsplash](https://unsplash.com/photos/1601295437622-e67b121ffb83) |
| `floral-glass-perfume.webp` | Unbranded round cut-glass bottle in flowers | none visible | busy, pastel | usable — unbranded, flag F2 | [Unsplash](https://unsplash.com/photos/1615108395437-df128ad79e80) |
| `givenchy-gentleman-1.webp` | Bottle on black with coal | Gentleman · Givenchy | plain, black | usable — cutout candidate | [Unsplash](https://unsplash.com/photos/1780943004155-1b2c5424fb2e) |
| `givenchy-gentleman-2.webp` | Bottle, angled, black | Gentleman · Givenchy | plain, black | usable (gallery) | [Unsplash](https://unsplash.com/photos/1780943004195-3bd30f748872) |
| `givenchy-irresistible-1.webp` | Bottle + lipstick on white sheet | Irresistible · Givenchy | busy, white | usable | [Unsplash](https://unsplash.com/photos/1591375372226-3531cf2eb6d3) |
| `givenchy-irresistible-2.webp` | Bottle with lipsticks + cream tube | Irresistible · Givenchy | busy, white | needs cleanup — cosmetics in shot (gallery only) | [Unsplash](https://unsplash.com/photos/1591375462077-800a22f5fba4) |
| `givenchy-irresistible-3.webp` | Bottle with lipsticks + tube | Irresistible · Givenchy | busy, white | needs cleanup — cosmetics in shot (gallery only) | [Unsplash](https://unsplash.com/photos/1591375462355-a219af30bf16) |
| `gucci-bloom-1.webp` | Bottle on white seamless | Gucci · Bloom | plain, white | usable — best cutout candidate | [Unsplash](https://unsplash.com/photos/1652262147172-142284cf5a6f) |
| `gucci-bloom-2.webp` | Bottle flat-lay with phone case, lip products | Gucci · Bloom | busy | needs cleanup — clutter, other brands (gallery only) | [Unsplash](https://unsplash.com/photos/1649464578246-e7df4f59365f) |
| `gucci-bloom-3.webp` | Bottle among books and a bag | Gucci · Bloom | busy | needs cleanup — clutter (gallery only) | [Unsplash](https://unsplash.com/photos/1680789526882-8042f7fd0a77) |
| `gucci-guilty.webp` | Retail shelf of several Gucci bottles | Gucci (Guilty centre) | busy, shop shelf | needs cleanup — multiple products, no clean cutout, flag F3 | [Unsplash](https://unsplash.com/photos/1624613533305-28d421d70875) |
| `gucci-memoire-d-une-odeur-1.webp` | Green ribbed bottle, chamomile glasses | Gucci · Mémoire d'une Odeur | busy, green | usable | [Unsplash](https://unsplash.com/photos/1687198193157-7914b3ccdb91) |
| `gucci-memoire-d-une-odeur-2.webp` | Bottle upright beside glass | Gucci · Mémoire d'une Odeur | busy, light | usable — cutout candidate | [Unsplash](https://unsplash.com/photos/1687198192320-333497e0cdad) |
| `gucci-memoire-d-une-odeur-3.webp` | Bottle lying in peonies | Gucci · Mémoire d'une Odeur | busy, pink | usable (gallery) | [Unsplash](https://unsplash.com/photos/1687775436483-e6118816e19d) |
| `hermes-h24-1.webp` | Bottle on black, low key | H24 · Hermès | plain, black | usable — cutout difficult (low key) | [Unsplash](https://unsplash.com/photos/1763631403216-8d193008481e) |
| `hermes-h24-2.webp` | Bottle on white sheet, B&W | H24 · Hermès | busy, grey | usable — cutout candidate | [Unsplash](https://unsplash.com/photos/1663869960499-6866301c0259) |
| `hugo-boss-bottled.webp` | Bottle floating above a hand | BOSS Bottled | busy, grey interior | needs cleanup — hand in shot | [Unsplash](https://unsplash.com/photos/1512777576244-b846ac3d816f) |
| `hugo-man-1.webp` | Box + bottle on rocks, blue sky | HUGO Man | busy, outdoor | usable | [Unsplash](https://unsplash.com/photos/1778058505512-7b042182b805) |
| `hugo-man-2.webp` | HUGO bottle + Montblanc Explorer lying in front | HUGO (+ Montblanc) | busy, white | needs cleanup — another brand in shot (gallery only) | [Unsplash](https://unsplash.com/photos/1720729823943-19fff3227f84) |
| `jo-malone-nectarine-blossom-honey.webp` | Bottle on pure black | Jo Malone London · Nectarine Blossom & Honey · Cologne | plain, black | usable — best cutout candidate | [Unsplash](https://unsplash.com/photos/1519669011783-4eaa95fa1b7d) |
| `jo-malone-wood-sage-sea-salt-1.webp` | Bottle on cracked plaster, from above | Jo Malone London · Wood Sage & Sea Salt | busy, plaster (on-brand) | usable | [Unsplash](https://unsplash.com/photos/1664198891866-8a35b73bb95f) |
| `jo-malone-wood-sage-sea-salt-2.webp` | Bottle outdoors, grass bokeh | Jo Malone London · Wood Sage & Sea Salt | busy, outdoor | usable — cutout candidate | [Unsplash](https://unsplash.com/photos/1688413580470-5eff69a96686) |
| `jo-malone-wood-sage-sea-salt-3.webp` | Bottle + box with ribbon on stone | Jo Malone London · Wood Sage & Sea Salt | busy | usable (gallery) | [Unsplash](https://unsplash.com/photos/1688413580186-fdec38c39553) |
| `l-eau-laurissi.webp` | Round bottle on cream, rings | L'Eau Laurissi · eau de poème | busy, cream | usable — house unknown, flag F2 | [Unsplash](https://unsplash.com/photos/1566977776052-6e61e35bf9be) |
| `lancome-la-vie-est-belle-1.webp` | Bottle with ribbon, pink flowers | La Vie est Belle (Lancôme) | busy, pink | usable — cutout candidate | [Unsplash](https://unsplash.com/photos/1613521140785-e85e427f8002) |
| `lancome-la-vie-est-belle-2.webp` | Bottle lying on silk | La Vie est Belle | busy, white | usable (gallery) | [Unsplash](https://unsplash.com/photos/1613521076081-2820f9746a2d) |
| `lancome-poeme.webp` | Poême beside two other houses' bottles | Lancôme · Poême (+ others) | busy | needs cleanup — other products, flag F3 | [Unsplash](https://unsplash.com/photos/1615634260167-c8cdede054de) |
| `lancome-tresor-1.webp` | Bottle floating on white | Trésor · Lancôme | plain, white | usable — best cutout candidate | [Unsplash](https://unsplash.com/photos/1635762810192-8061369cefe2) |
| `lancome-tresor-2.webp` | Bottle on crumpled white | Trésor | busy, light | usable (gallery) | [Unsplash](https://unsplash.com/photos/1635762810400-4e454ef3627f) |
| `lancome-tresor-3.webp` | Bottle with Christmas baubles | Trésor | busy, festive | usable (gallery; seasonal) | [Unsplash](https://unsplash.com/photos/1635762810408-238c50f80c51) |
| `maison-margiela-replica-jazz-club-1.webp` | Bottle with box, bokeh | Maison Margiela · Replica · Jazz Club | busy, bokeh | usable — cutout candidate | [Unsplash](https://unsplash.com/photos/1509432987859-a93add19398d) |
| `maison-margiela-replica-jazz-club-2.webp` | Bottle + box, B&W | Maison Margiela · Replica · Jazz Club | busy, grey | usable (gallery) | [Unsplash](https://unsplash.com/photos/1763658731853-ac41d3c42db1) |
| `marc-jacobs-daisy.webp` | Bottle on plinth, leaf shadow | Daisy · Marc Jacobs | busy, warm (on-brand plinth) | usable — cutout candidate | [Unsplash](https://unsplash.com/photos/1763986665850-6e66549aa8e0) |
| `miss-dior.webp` | Bottle on warm seamless, long shadow | Miss Dior | plain, warm | usable — best cutout candidate | [Unsplash](https://unsplash.com/photos/1458538977777-0549b2370168) |
| `miu-miu.webp` | Two bottles (Miu Miu EDP + L'Eau Bleue) | miu miu | busy, dark knit | usable — two variants in one shot, flag F4 | [Unsplash](https://unsplash.com/photos/1557170334-a9632e77c6e4) |
| `montblanc-explorer.webp` | B&W shelf; Explorer among other bottles | Montblanc Explorer (+ others) | busy, B&W | needs cleanup — other products, flag F3 | [Unsplash](https://unsplash.com/photos/1621814374283-57cc5d0d39c2) |
| `montblanc-legend-spirit-1.webp` | White bottle in white linen | Montblanc · Legend Spirit | busy, white | usable — cutout difficult (white on white) | [Unsplash](https://unsplash.com/photos/1729101773837-8db9b1425b86) |
| `montblanc-legend-spirit-2.webp` | White bottle, front | Montblanc · Legend Spirit | busy, white | usable — cutout candidate | [Unsplash](https://unsplash.com/photos/1729101807924-3446ca9aa480) |
| `montblanc-legend-spirit-3.webp` | Bottle with gold chain | Montblanc · Legend Spirit | busy, white | usable (gallery) | [Unsplash](https://unsplash.com/photos/1729101886078-6976c47c1e74) |
| `montblanc-starwalker-1.webp` | Bottle in white linen | Montblanc · Starwalker | busy, white | usable — cutout candidate | [Unsplash](https://unsplash.com/photos/1729101827046-6fb7e456eddd) |
| `montblanc-starwalker-2.webp` | Bottle in white linen, closer | Montblanc · Starwalker | busy, white | usable (gallery) | [Unsplash](https://unsplash.com/photos/1729101827027-c2e3276a9d98) |
| `paco-rabanne-1-million-1.webp` | Gold ingot bottle, white seamless | 1 Million · Paco Rabanne | plain, white | usable — best cutout candidate | [Unsplash](https://unsplash.com/photos/1633072437275-ec3344b4b966) |
| `paco-rabanne-1-million-2.webp` | Bottle with light streaks | 1 Million | busy, dark | usable (gallery) | [Unsplash](https://unsplash.com/photos/1633071990941-1417f7dea790) |
| `paco-rabanne-1-million-3.webp` | Macro of embossed logo | 1 Million | plain, white | usable as detail only | [Unsplash](https://unsplash.com/photos/1633072041402-f18acf68861a) |
| `perfume-oil-dropper.webp` | Glass vials + dropper, no product | none | busy, lab | unusable as a product — flag F1 (use as atmosphere) | [Unsplash](https://unsplash.com/photos/1602928298849-325cec8771c0) |
| `prada.webp` | Black bottle among coal, low key | PRADA · Milano (flanker not readable — likely Luna Rossa Black) | plain, black | usable — flag F4 | [Unsplash](https://unsplash.com/photos/1610461888750-10bfc601b874) |
| `red-diamond.webp` | Red square bottle on wood | RED DIAMOND (house not shown) | busy, wood | usable — house unknown, flag F2 | [Unsplash](https://unsplash.com/photos/1608528577891-eb055944f2e7) |
| `roberto-cavalli-gemma-di-paradiso.webp` | Cavalli bottle in front of a Victoria's Secret bottle | Roberto Cavalli · Gemma di Paradiso (+ VS) | busy, white | needs cleanup — another brand in shot | [Unsplash](https://unsplash.com/photos/1541108564883-bec8126021f5) |
| `terre-d-hermes-1.webp` | Bottle on white fur, B&W | Terre d'Hermès | busy, white | usable — cutout candidate | [Unsplash](https://unsplash.com/photos/1737916061048-5a288b8e9f26) |
| `terre-d-hermes-2.webp` | Bottle on reflective table, cool | Terre d'Hermès | busy, cool | usable (gallery) | [Unsplash](https://unsplash.com/photos/1635795729633-39a2c479c1d3) |
| `tilo-skin-99-9.webp` | Brown bottle with wooden cap on driftwood | TILO · SKIN 99.9 · 50 ml | busy, warm brown | usable — niche house, flag F2 | [Unsplash](https://unsplash.com/photos/1723391962090-f17948c190ec) |
| `valentino-donna.webp` | Studded bottle cropped, pink fabric | none visible (Valentino Donna by shape/file name) | busy, pink | usable — cap cropped | [Unsplash](https://unsplash.com/photos/1543422655-ac1c6ca993ed) |
| `valentino-voce-viva-1.webp` | Bottle in warm side light | Valentino (Voce Viva by file name) | busy, warm | usable — cutout candidate | [Unsplash](https://unsplash.com/photos/1761329842950-f3551938e4da) |
| `valentino-voce-viva-2.webp` | Bottle on teal geometric surface | Voce Viva · Valentino | busy, saturated teal | usable (gallery) | [Unsplash](https://unsplash.com/photos/1615160460524-432433ba1b8f) |
| `vera-wang-for-men.webp` | Bottle on wooden table, plant | Vera Wang · For Men | busy, light | usable — cutout candidate | [Unsplash](https://unsplash.com/photos/1593487568720-92097fb460fb) |
| `versace-crystal-noir-1.webp` | Bottle in white paper shred | Versace · Crystal Noir | busy, white | usable | [Unsplash](https://unsplash.com/photos/1628642564422-698939984654) |
| `versace-crystal-noir-2.webp` | Box + faceted bottle, dark | Versace · Crystal Noir | busy, dark | usable (gallery) | [Unsplash](https://unsplash.com/photos/1659167530799-982cfce69360) |
| `versace-eros.webp` | Bottle front, plant behind | Versace · Eros | plain-ish, grey | usable — cutout candidate | [Unsplash](https://unsplash.com/photos/1587017539504-67cfbddac569) |
| `ysl-libre.webp` | Bottle floating in water droplets | Libre · YSL | busy, olive | usable — cutout candidate | [Unsplash](https://unsplash.com/photos/1724157073080-fcffb8d6c956) |
| `ysl-mon-paris.webp` | Bottle with black rocks on white | YSL · Mon Paris (pink bottle, bow) | plain, white | usable — cutout candidate | [Unsplash](https://unsplash.com/photos/1676951334972-2e65e67f4cbe) |
| `zara-at-dawn-1.webp` | Dark bottle with shells, sand, close | AT DAWN · Zara Men Night Collection 01 | busy, sand | usable (gallery) | [Unsplash](https://unsplash.com/photos/1631573577668-31fe3f2a01da) |
| `zara-at-dawn-2.webp` | Bottle with shells, dark | AT DAWN · Zara Men | busy, dark | usable — cutout candidate | [Unsplash](https://unsplash.com/photos/1631573576452-a073df952614) |
| `zara-at-dawn-3.webp` | Bottle with water droplets | AT DAWN · Zara Men Night Collection 01 | busy, dark | usable (gallery) | [Unsplash](https://unsplash.com/photos/1631573579428-e4091c25396b) |
| `zara-oriental-1.webp` | Bottle behind orange petals | ORIENTAL · Zara Day Collection 02 | busy, saturated orange | usable — petals cover base | [Unsplash](https://unsplash.com/photos/1687200877070-143b149c2315) |
| `zara-oriental-2.webp` | Bottle close-up, orange petals | ORIENTAL · Zara Day Collection 02 | busy, orange | usable (gallery) | [Unsplash](https://unsplash.com/photos/1687202163645-8be2de10ba7a) |
| `zara-seoul.webp` | Bottle on grey seamless with reflection | ZARA · Seoul 532-8 Sinsa Dong Gangnam-Gu | plain, grey | usable — best cutout candidate | [Unsplash](https://unsplash.com/photos/1582211594533-268f4f1edcb9) |
| `zara-vibrant-leather-1.webp` | Bottle tilted, warm light | VIBRANT LEATHER · Zara | busy, warm | usable — cutout candidate | [Unsplash](https://unsplash.com/photos/1759793499912-625d49ae6087) |
| `zara-vibrant-leather-2.webp` | Bottle tilted, column, warm | VIBRANT LEATHER · Zara | busy, warm | usable (gallery) | [Unsplash](https://unsplash.com/photos/1759793500110-e3cb1f0fe6ae) |
| `zara-vibrant-leather-3.webp` | Bottle smaller, column, warm | VIBRANT LEATHER · Zara | busy, warm | usable (gallery) | [Unsplash](https://unsplash.com/photos/1759793499819-bf60128a54b4) |

## Cutouts

_Filled in during phase (a): one row per product with the cutout result (clean / fallback to original on Chalk) and any defects._

## Atmospheric scenes

_Filled in during phase (a): file, subject, olfactory family, photographer, licence, source URL._


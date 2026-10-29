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

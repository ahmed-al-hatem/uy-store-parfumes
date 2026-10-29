"use client";

import * as m from "motion/react-m";
import { CloseIcon } from "@/components/ui/icons";
import { collections } from "@/data/taxonomy";
import { DURATION, EASE_LUXE } from "@/lib/motion";
import { countActiveFilters, priceBuckets, type Facets, type ShopParams } from "@/lib/shop/query";

type AppliedFiltersProps = {
  params: ShopParams;
  facets: Facets;
  onChange: (patch: Partial<ShopParams>) => void;
  onClear: () => void;
};

type Chip = { key: string; label: string; remove: () => void };

/** Removable text chips for every applied filter, plus "Clear all". */
export function AppliedFilters({ params, facets, onChange, onClear }: AppliedFiltersProps) {
  if (countActiveFilters(params) === 0) return null;

  const labelOf = (list: { value: string; label: string }[], value: string) =>
    list.find((o) => o.value.toLowerCase() === value.toLowerCase())?.label ?? value;

  const listChips = (key: "gender" | "family" | "brand" | "notes" | "concentration", source: { value: string; label: string }[]): Chip[] =>
    params[key].map((v) => ({
      key: `${key}:${v}`,
      label: labelOf(source, v),
      remove: () => onChange({ [key]: params[key].filter((x) => x !== v) }),
    }));

  const bucket = priceBuckets.find((b) => b.min === params.priceMin && b.max === params.priceMax);
  const chips: Chip[] = [
    ...listChips("gender", facets.gender),
    ...listChips("family", facets.family),
    ...params.collection.map((c) => ({
      key: `collection:${c}`,
      label: collections.find((x) => x.slug === c)?.title ?? c,
      remove: () => onChange({ collection: params.collection.filter((x) => x !== c) }),
    })),
    ...listChips("brand", facets.brand),
    ...listChips("notes", facets.notes),
    ...listChips("concentration", facets.concentration),
    ...params.size.map((ml) => ({ key: `size:${ml}`, label: `${ml} ml`, remove: () => onChange({ size: params.size.filter((x) => x !== ml) }) })),
    ...(params.priceMin != null || params.priceMax != null
      ? [{ key: "price", label: bucket?.label ?? "Price", remove: () => onChange({ priceMin: null, priceMax: null }) }]
      : []),
    ...(params.rating != null ? [{ key: "rating", label: `${params.rating} stars and up`, remove: () => onChange({ rating: null }) }] : []),
    ...(params.inStock ? [{ key: "stock", label: "In stock", remove: () => onChange({ inStock: false }) }] : []),
  ];

  return (
    <div className="flex flex-wrap items-center gap-x-17 px-16 py-6 lg:px-32">
      <h2 className="sr-only">Applied filters</h2>
      <ul className="contents">
        {chips.map((chip) => (
          <m.li key={chip.key} layout="position" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: DURATION.base, ease: EASE_LUXE }}>
            <button
              type="button"
              onClick={chip.remove}
              className="inline-flex min-h-touch items-center gap-6 text-caption decoration-1 underline-offset-4 hover:underline"
              aria-label={`Remove filter: ${chip.label}`}
            >
              {chip.label}
              <CloseIcon size={10} />
            </button>
          </m.li>
        ))}
      </ul>
      <button type="button" onClick={onClear} className="min-h-touch text-caption uppercase underline decoration-1 underline-offset-4">
        Clear all
      </button>
    </div>
  );
}

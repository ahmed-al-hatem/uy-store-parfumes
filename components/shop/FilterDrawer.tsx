"use client";

import { Accordion, Dialog } from "radix-ui";
import type { ReactNode } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import { CloseIcon } from "@/components/ui/icons";
import { countActiveFilters, priceBuckets, type Facets, type FacetOption, type ShopParams } from "@/lib/shop/query";

type ListKey = "gender" | "brand" | "family" | "notes" | "concentration";

type FilterDrawerProps = {
  params: ShopParams;
  facets: Facets;
  total: number;
  loading: boolean;
  /** Hide the wearer group on /shop/[category]. */
  hideGender: boolean;
  onChange: (patch: Partial<ShopParams>) => void;
  onClear: () => void;
};

function Group({ value, title, count, children }: { value: string; title: string; count: number; children: ReactNode }) {
  return (
    <Accordion.Item value={value} className="border-b border-line">
      <Accordion.Header>
        <Accordion.Trigger className="group flex min-h-touch w-full items-center justify-between py-10 text-caption uppercase">
          <span className="decoration-1 underline-offset-4 group-hover:underline">
            {title}
            {count > 0 && <span className="normal-case"> ({count})</span>}
          </span>
          <span aria-hidden="true" className="transition-transform duration-[var(--duration-fast)] group-data-[state=open]:rotate-180">
            ▾
          </span>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="pb-13">{children}</Accordion.Content>
    </Accordion.Item>
  );
}

/**
 * Filters slide in from the start edge on desktop and rise as a bottom sheet on
 * phones (DECISIONS.md D-06). Changes apply immediately and update the URL.
 */
export function FilterDrawer({ params, facets, total, loading, hideGender, onChange, onClear }: FilterDrawerProps) {
  const active = countActiveFilters(params);

  const toggle = (key: ListKey, value: string) => {
    const current = params[key];
    onChange({ [key]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value] });
  };
  const toggleSize = (ml: number) =>
    onChange({ size: params.size.includes(ml) ? params.size.filter((v) => v !== ml) : [...params.size, ml] });

  const options = (key: ListKey, list: FacetOption[]) =>
    list.map((o) => {
      const checked = params[key].map((v) => v.toLowerCase()).includes(o.value.toLowerCase());
      return (
        <Checkbox
          key={o.value}
          label={o.label}
          meta={o.count}
          checked={checked}
          disabled={!checked && o.count === 0}
          onChange={() => toggle(key, o.value)}
        />
      );
    });

  const bucketValue = priceBuckets.findIndex((b) => b.min === params.priceMin && b.max === params.priceMax);

  return (
    <Dialog.Root>
      <Dialog.Trigger className="inline-flex min-h-touch items-center text-caption uppercase decoration-1 underline-offset-4 hover:underline">
        Filter{active > 0 && <span className="normal-case">&nbsp;({active})</span>}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
        <Dialog.Content
          className="fixed inset-x-0 bottom-0 z-50 flex max-h-[88dvh] flex-col border-t border-line bg-canvas shadow-float data-[state=closed]:animate-sheet-out data-[state=open]:animate-sheet-in lg:inset-x-auto lg:inset-y-0 lg:start-0 lg:max-h-none lg:w-[420px] lg:border-e lg:border-t-0 lg:data-[state=closed]:animate-drawer-out-start lg:data-[state=open]:animate-drawer-in-start"
        >
          <div className="flex items-center justify-between border-b border-line px-16">
            <Dialog.Title className="text-caption uppercase">
              Filter{active > 0 && <span className="normal-case"> ({active} applied)</span>}
            </Dialog.Title>
            <Dialog.Close className="inline-flex min-h-touch min-w-touch items-center justify-end" aria-label="Close filters">
              <CloseIcon />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">Results update as you choose filters.</Dialog.Description>

          <div className={`flex-1 overflow-y-auto px-16 transition-opacity duration-[var(--duration-fast)] ${loading ? "opacity-60" : ""}`}>
            <Accordion.Root type="multiple" defaultValue={["gender", "family", "price"]}>
              {!hideGender && (
                <Group value="gender" title="Worn by" count={params.gender.length}>
                  {options("gender", facets.gender)}
                </Group>
              )}
              <Group value="family" title="Family" count={params.family.length}>
                {options("family", facets.family)}
              </Group>
              <Group value="price" title="Price" count={bucketValue >= 0 ? 1 : 0}>
                <Checkbox
                  type="radio"
                  name="price"
                  label="Any price"
                  checked={bucketValue < 0}
                  onChange={() => onChange({ priceMin: null, priceMax: null })}
                />
                {priceBuckets.map((b) => (
                  <Checkbox
                    key={b.label}
                    type="radio"
                    name="price"
                    label={b.label}
                    checked={b.min === params.priceMin && b.max === params.priceMax}
                    onChange={() => onChange({ priceMin: b.min, priceMax: b.max })}
                  />
                ))}
              </Group>
              <Group value="brand" title="House" count={params.brand.length}>
                <div className="max-h-[320px] overflow-y-auto">{options("brand", facets.brand)}</div>
              </Group>
              <Group value="notes" title="Notes" count={params.notes.length}>
                <div className="grid grid-cols-2 gap-x-13">{options("notes", facets.notes)}</div>
              </Group>
              <Group value="concentration" title="Concentration" count={params.concentration.length}>
                {options("concentration", facets.concentration)}
              </Group>
              <Group value="size" title="Size" count={params.size.length}>
                <div className="grid grid-cols-2 gap-x-13">
                  {facets.size.map((o) => {
                    const ml = Number(o.value);
                    const checked = params.size.includes(ml);
                    return (
                      <Checkbox key={o.value} label={o.label} meta={o.count} checked={checked} disabled={!checked && o.count === 0} onChange={() => toggleSize(ml)} />
                    );
                  })}
                </div>
              </Group>
              <Group value="rating" title="Rating" count={params.rating != null ? 1 : 0}>
                <Checkbox type="radio" name="rating" label="Any rating" checked={params.rating == null} onChange={() => onChange({ rating: null })} />
                <Checkbox type="radio" name="rating" label="4 stars and up" meta={facets.ratingAtLeast[4]} checked={params.rating === 4} onChange={() => onChange({ rating: 4 })} />
                <Checkbox type="radio" name="rating" label="3 stars and up" meta={facets.ratingAtLeast[3]} checked={params.rating === 3} onChange={() => onChange({ rating: 3 })} />
              </Group>
              <Group value="stock" title="Availability" count={params.inStock ? 1 : 0}>
                <Checkbox label="In stock only" meta={facets.inStock} checked={params.inStock} onChange={() => onChange({ inStock: !params.inStock })} />
              </Group>
            </Accordion.Root>
          </div>

          <div className="flex items-center gap-16 border-t border-line px-16 py-12">
            <button
              type="button"
              onClick={onClear}
              disabled={active === 0}
              className="min-h-touch text-caption uppercase decoration-1 underline-offset-4 hover:underline disabled:opacity-40 disabled:hover:no-underline"
            >
              Clear all
            </button>
            <Dialog.Close className="btn btn-primary flex-1">
              {loading ? "Updating…" : `Show ${total} ${total === 1 ? "fragrance" : "fragrances"}`}
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

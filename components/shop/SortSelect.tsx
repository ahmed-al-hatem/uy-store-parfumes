"use client";

import { Select } from "radix-ui";
import { SORTS, sortLabels, type SortKey } from "@/lib/shop/query";

type SortSelectProps = { value: SortKey; onChange: (value: SortKey) => void };

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <Select.Root value={value} onValueChange={(v) => onChange(v as SortKey)}>
      <Select.Trigger
        aria-label="Sort products"
        className="inline-flex min-h-touch items-center gap-4 text-caption uppercase decoration-1 underline-offset-4 hover:underline data-[state=open]:underline"
      >
        <span className="max-sm:hidden">Sort:&nbsp;</span>
        <Select.Value />
        <Select.Icon aria-hidden="true">▾</Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          align="end"
          sideOffset={4}
          className="z-50 min-w-[220px] border border-line bg-canvas data-[state=open]:animate-fade-in"
        >
          <Select.Viewport className="py-6">
            {SORTS.map((key) => (
              <Select.Item
                key={key}
                value={key}
                className="flex min-h-touch cursor-pointer items-center justify-between gap-13 px-13 text-body-sm outline-none data-[highlighted]:underline data-[highlighted]:decoration-1 data-[highlighted]:underline-offset-4"
              >
                <Select.ItemText>{sortLabels[key]}</Select.ItemText>
                <Select.ItemIndicator aria-hidden="true">—</Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

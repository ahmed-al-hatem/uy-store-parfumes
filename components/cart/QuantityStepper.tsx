"use client";

import { MinusIcon, PlusIcon } from "@/components/ui/icons";
import { MAX_QUANTITY } from "@/store/cart";

type QuantityStepperProps = { value: number; onChange: (value: number) => void; label: string };

export function QuantityStepper({ value, onChange, label }: QuantityStepperProps) {
  const btn = "inline-flex size-[44px] items-center justify-center disabled:opacity-30";
  return (
    <div role="group" aria-label={`Quantity, ${label}`} className="inline-flex items-center rounded-pill border border-ink/30">
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="One fewer">
        <MinusIcon size={12} />
      </button>
      <output className="min-w-[24px] text-center text-body-sm tabular-nums" aria-live="polite">
        {value}
      </output>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= MAX_QUANTITY} aria-label="One more">
        <PlusIcon size={12} />
      </button>
    </div>
  );
}

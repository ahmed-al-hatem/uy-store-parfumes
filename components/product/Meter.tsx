type MeterProps = { label: string; value: number; words: [string, string, string, string, string] };

/** Five hairline segments, filled Soot up to the value. */
export function Meter({ label, value, words }: MeterProps) {
  const word = words[Math.min(5, Math.max(1, value)) - 1];
  return (
    <div>
      <div className="flex items-baseline justify-between pb-7">
        <span className="text-caption uppercase">{label}</span>
        <span className="text-body-sm">{word}</span>
      </div>
      <div role="meter" aria-label={label} aria-valuemin={1} aria-valuemax={5} aria-valuenow={value} aria-valuetext={word} className="flex gap-4">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={`h-[6px] flex-1 border border-soot ${i < value ? "bg-soot" : ""}`} />
        ))}
      </div>
    </div>
  );
}

export const longevityWords: MeterProps["words"] = ["Fleeting", "Light", "Moderate", "Long-lasting", "All day and night"];
export const sillageWords: MeterProps["words"] = ["Skin close", "Soft", "Moderate", "Strong", "Fills a room"];

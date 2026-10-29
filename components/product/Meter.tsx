type MeterProps = { label: string; value: number; words: [string, string, string, string, string] };

/** Five hairline segments, filled Soot up to the value. */
export function Meter({ label, value, words }: MeterProps) {
  const word = words[Math.min(5, Math.max(1, value)) - 1];
  return (
    <div>
      <div className="flex items-baseline justify-between pb-7">
        <span className="label text-muted">{label}</span>
        <span className="font-display text-title">{word}</span>
      </div>
      <div role="meter" aria-label={label} aria-valuemin={1} aria-valuemax={5} aria-valuenow={value} aria-valuetext={word} className="flex gap-6">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={`h-[3px] flex-1 rounded-pill ${i < value ? "bg-accent" : "bg-line"}`} />
        ))}
      </div>
    </div>
  );
}

export const longevityWords: MeterProps["words"] = ["Fleeting", "Light", "Moderate", "Long-lasting", "All day and night"];
export const sillageWords: MeterProps["words"] = ["Skin close", "Soft", "Moderate", "Strong", "Fills a room"];

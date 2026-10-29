import type { Notes } from "@/lib/types";

const tiers: { key: keyof Notes; label: string; when: string; width: string }[] = [
  { key: "top", label: "Top", when: "The first fifteen minutes", width: "w-1/2" },
  { key: "heart", label: "Heart", when: "The next few hours", width: "w-3/4" },
  { key: "base", label: "Base", when: "What stays on skin", width: "w-full" },
];

const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Three widening tiers drawn with hairlines: the shape of a perfume as it
 * evaporates, from the bright top to the base that stays.
 */
export function NotesPyramid({ notes }: { notes: Notes }) {
  return (
    <dl className="flex flex-col items-center">
      {tiers.map((tier) => (
        <div key={tier.key} className={`${tier.width} border-t border-line px-10 py-17 text-center last:border-b`}>
          <dt className="label text-accent-strong">
            {tier.label}
            <span className="sr-only">, {tier.when.toLowerCase()}</span>
          </dt>
          <dd className="font-display pt-6 text-title">{notes[tier.key].map(capitalise).join(", ")}</dd>
          <dd className="pt-4 text-caption text-muted max-sm:hidden" aria-hidden="true">
            {tier.when}
          </dd>
        </div>
      ))}
    </dl>
  );
}

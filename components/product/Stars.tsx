/** Five stroke stars, filled Soot up to the rounded rating. Decorative: callers state the rating in text. */
export function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  const full = Math.round(rating);
  return (
    <span className="inline-flex gap-[2px]" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 12 12" fill={i < full ? "currentColor" : "none"} stroke="currentColor" strokeWidth={0.8}>
          <path d="M6 .9l1.5 3.2 3.5.4-2.6 2.4.7 3.5L6 8.7 2.9 10.4l.7-3.5L1 4.5l3.5-.4z" strokeLinejoin="round" />
        </svg>
      ))}
    </span>
  );
}

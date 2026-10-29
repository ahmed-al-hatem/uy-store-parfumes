import type { Review } from "@/lib/types";
import { ReviewList } from "./ReviewList";
import { Stars } from "./Stars";

/** Average, a 5-to-1 breakdown drawn as hairline bars, then the reviews. */
export function Reviews({ reviews, rating }: { reviews: Review[]; rating: number }) {
  const counts = [5, 4, 3, 2, 1].map((star) => ({ star, count: reviews.filter((r) => r.rating === star).length }));
  const max = Math.max(1, ...counts.map((c) => c.count));

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="scroll-mt-[calc(var(--header-h)+16px)] px-16 pt-section lg:px-32">
      <div className="grid gap-30 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-32">
        <div>
          <h2 id="reviews-title" className="text-subheading tracking-display">
            Reviews
          </h2>
          <p className="flex items-center gap-10 pt-13">
            <span className="text-display tabular-nums">{rating.toFixed(1)}</span>
            <Stars rating={rating} size={14} />
          </p>
          <p className="text-caption text-muted">
            {rating.toFixed(1)} out of 5, from {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
          </p>
          <dl className="max-w-[360px] pt-17">
            {counts.map(({ star, count }) => (
              <div key={star} className="grid grid-cols-[56px_1fr_24px] items-center gap-10 py-4 text-caption">
                <dt>{star} {star === 1 ? "star" : "stars"}</dt>
                <dd className="h-[3px] overflow-hidden rounded-pill bg-line" aria-hidden="true">
                  <span className="block h-full origin-left bg-accent" style={{ transform: `scaleX(${count / max})` }} />
                </dd>
                <dd className="text-end tabular-nums">{count}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ReviewList reviews={reviews} />
      </div>
    </section>
  );
}

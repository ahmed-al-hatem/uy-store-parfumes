"use client";

import { useState } from "react";
import { storeConfig } from "@/lib/config";
import type { Review } from "@/lib/types";
import { Stars } from "./Stars";

const INITIAL = 3;
const dateFormat = new Intl.DateTimeFormat(storeConfig.locale, { day: "numeric", month: "long", year: "numeric" });

export function ReviewList({ reviews }: { reviews: Review[] }) {
  const [all, setAll] = useState(false);
  const shown = all ? reviews : reviews.slice(0, INITIAL);

  return (
    <div>
      <ul className="border-t border-line">
        {shown.map((r) => (
          <li key={r.id} className="border-b border-line py-20">
            <article>
              <div className="flex flex-wrap items-center justify-between gap-x-13 gap-y-4">
                <span className="flex items-center gap-10">
                  <Stars rating={r.rating} />
                  <span className="sr-only">{r.rating} out of 5 stars.</span>
                  <h3 className="text-title">{r.title}</h3>
                </span>
                <time dateTime={r.date} className="text-caption text-muted">
                  {dateFormat.format(new Date(`${r.date}T12:00:00`))}
                </time>
              </div>
              <p className="font-display max-w-[60ch] pt-10 text-[20px] leading-[1.45]">{r.body}</p>
              <p className="label pt-10 text-muted">
                {r.author}, {r.location}
                {r.verified && ", verified purchase"}
              </p>
            </article>
          </li>
        ))}
      </ul>
      {reviews.length > INITIAL && (
        <button
          type="button"
          onClick={() => setAll((v) => !v)}
          aria-expanded={all}
          className="btn btn-secondary mt-20"
        >
          {all ? "Show fewer reviews" : `Show all ${reviews.length} reviews`}
        </button>
      )}
    </div>
  );
}

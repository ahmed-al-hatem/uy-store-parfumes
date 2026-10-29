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
      <ul className="border-t border-soot">
        {shown.map((r) => (
          <li key={r.id} className="border-b border-soot py-20">
            <article>
              <div className="flex flex-wrap items-center justify-between gap-x-13 gap-y-4">
                <span className="flex items-center gap-10">
                  <Stars rating={r.rating} />
                  <span className="sr-only">{r.rating} out of 5 stars.</span>
                  <h3 className="text-body-sm">{r.title}</h3>
                </span>
                <time dateTime={r.date} className="text-caption">
                  {dateFormat.format(new Date(`${r.date}T12:00:00`))}
                </time>
              </div>
              <p className="max-w-[64ch] pt-7 text-body-sm">{r.body}</p>
              <p className="pt-7 text-caption">
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
          className="mt-13 min-h-touch text-caption uppercase underline decoration-1 underline-offset-4"
        >
          {all ? "Show fewer reviews" : `Show all ${reviews.length} reviews`}
        </button>
      )}
    </div>
  );
}

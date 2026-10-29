"use client";

import { useSyncExternalStore } from "react";
import { formatPrice, storeConfig } from "@/lib/config";

const CUTOFF_HOUR = 14;

function addWorkingDays(from: Date, days: number) {
  const d = new Date(from);
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) added += 1;
  }
  return d;
}

const dayFormat = new Intl.DateTimeFormat(storeConfig.locale, { weekday: "long", day: "numeric", month: "long" });

// Re-read once a minute so the cut-off countdown stays honest.
const subscribe = (cb: () => void) => {
  const t = setInterval(cb, 60_000);
  return () => clearInterval(t);
};
const minuteNow = () => Math.floor(Date.now() / 60_000);

/** Computed in the browser: the date depends on when the page is read, not when it was built. */
export function DeliveryEstimate() {
  const minute = useSyncExternalStore(subscribe, minuteNow, () => null);
  if (minute == null) return <p className="min-h-[46px] text-body-sm">Delivered in 2 to 3 working days.</p>;

  const now = new Date(minute * 60_000);
  const isWeekday = now.getDay() !== 0 && now.getDay() !== 6;
  const beforeCutoff = isWeekday && now.getHours() < CUTOFF_HOUR;
  const dispatch = beforeCutoff ? now : addWorkingDays(now, 1);
  const earliest = addWorkingDays(dispatch, 2);
  const latest = addWorkingDays(dispatch, 3);
  const left = beforeCutoff ? (CUTOFF_HOUR - now.getHours()) * 60 - now.getMinutes() : 0;

  return (
    <div className="min-h-[46px] text-body-sm">
      <p>
        Arrives {dayFormat.format(earliest)} to {dayFormat.format(latest)}.
      </p>
      <p className="text-caption">
        {beforeCutoff
          ? `Order within ${Math.floor(left / 60)} h ${left % 60} min to ship today. `
          : "Ships the next working day. "}
        Free over {formatPrice(storeConfig.freeShippingThreshold)}.
      </p>
    </div>
  );
}

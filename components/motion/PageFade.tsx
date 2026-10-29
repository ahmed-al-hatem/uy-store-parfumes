"use client";

import * as m from "motion/react-m";
import { useEffect, type ReactNode } from "react";
import { DURATION, EASE_QUIET } from "@/lib/motion";

// The first page a visitor lands on is shown at once (no delayed LCP); later
// client navigations fade in. Opacity only: a transform here would break the
// fixed and sticky elements inside the page.
let hasNavigated = false;

export function PageFade({ children }: { children: ReactNode }) {
  const animate = hasNavigated;
  useEffect(() => {
    hasNavigated = true;
  }, []);
  return (
    <m.div initial={animate ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: DURATION.base, ease: EASE_QUIET }}>
      {children}
    </m.div>
  );
}

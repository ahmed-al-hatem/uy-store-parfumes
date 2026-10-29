"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { DURATION, EASE_LUXE } from "@/lib/motion";

// Animation features are fetched once the browser is idle after hydration, so
// they never compete with first paint or input. Nothing above the fold waits on them.
const loadFeatures = () =>
  new Promise<void>((resolve) => {
    if (typeof requestIdleCallback === "function") requestIdleCallback(() => resolve(), { timeout: 1500 });
    else setTimeout(resolve, 300);
  }).then(() => import("./features").then((mod) => mod.default));

/**
 * `m` components with lazily loaded features keep motion out of the critical
 * bundle. prefers-reduced-motion is honoured everywhere: transforms are
 * dropped, opacity fades remain.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: DURATION.slow, ease: EASE_LUXE }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}

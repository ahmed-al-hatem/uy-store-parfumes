"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { DURATION, EASE_LUXE } from "@/lib/motion";

const loadFeatures = () => import("./features").then((mod) => mod.default);

/**
 * `m` components with features loaded after hydration keep motion out of the
 * critical bundle. prefers-reduced-motion is honoured everywhere: transforms
 * are dropped, opacity fades remain.
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

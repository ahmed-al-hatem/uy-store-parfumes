"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";
import { DURATION, EASE_LUXE, RISE } from "@/lib/motion";

const item = {
  hidden: { opacity: 0, y: RISE },
  shown: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE_LUXE } },
};

type RevealProps = { children: ReactNode; className?: string; delay?: number; as?: "div" | "section" | "li" };

/**
 * Fades a block up once as it enters the viewport. The server markup starts
 * hidden, so never wrap above-the-fold or LCP content in it.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={item}
      transition={{ delay }}
    >
      {children}
    </Tag>
  );
}

/** Staggers its RevealItem children by 80ms. */
export function RevealGroup({ children, className, as = "div" }: Omit<RevealProps, "delay">) {
  const Tag = m[as === "li" ? "ul" : as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.08 } } }}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({ children, className, as = "div" }: Omit<RevealProps, "delay">) {
  const Tag = m[as];
  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  );
}

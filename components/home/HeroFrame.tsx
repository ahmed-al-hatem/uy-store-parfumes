"use client";

import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { useRef } from "react";
import { ProductFrame } from "@/components/product/ProductFrame";
import type { SourceImage } from "@/lib/types";

/**
 * The hero photograph settles from 1.06 to 1 as the page scrolls: a slow
 * breath, transform only. MotionConfig drops it for reduced motion.
 */
export function HeroFrame({ image, alt }: { image: SourceImage; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  return (
    <div ref={ref} className="overflow-hidden">
      <m.div style={{ scale, y }} className="will-change-transform">
        <ProductFrame image={image} alt={alt} sizes="(min-width: 1024px) 50vw, 100vw" preload matted />
      </m.div>
    </div>
  );
}

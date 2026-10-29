"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import Link from "next/link";
import { useState } from "react";
import { ProductFrame } from "@/components/product/ProductFrame";
import { DURATION, EASE_QUIET } from "@/lib/motion";
import type { SourceImage } from "@/lib/types";

export type FamilyEntry = { slug: string; label: string; description: string; count: number; image: SourceImage; imageAlt: string };

/**
 * Shop by olfactory family: a large typographic index. On desktop the
 * photograph beside it follows the family under the pointer or focus.
 */
export function FamilyIndex({ families }: { families: FamilyEntry[] }) {
  const [active, setActive] = useState(0);
  const current = families[active];

  return (
    <div className="grid border-t border-line lg:grid-cols-2">
      <ul className="lg:border-e lg:border-line">
        {families.map((f, i) => (
          <li key={f.slug} className="border-b border-line last:border-b-0">
            <Link
              href={`/shop?family=${f.slug}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group flex items-baseline justify-between gap-13 px-16 py-17 lg:px-32"
            >
              <span>
                <span className="block text-subheading tracking-display decoration-1 underline-offset-[6px] group-hover:underline group-focus-visible:underline">
                  {f.label}
                </span>
                <span className="block pt-4 text-caption">{f.description}</span>
              </span>
              <span className="text-caption tabular-nums">{f.count}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="relative max-lg:hidden">
        <div className="sticky top-[var(--header-h)]">
          <AnimatePresence mode="popLayout" initial={false}>
            <m.div
              key={current.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DURATION.base, ease: EASE_QUIET }}
            >
              <ProductFrame image={current.image} alt={current.imageAlt} sizes="50vw" />
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

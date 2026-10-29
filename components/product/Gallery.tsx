"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import type { SourceImage } from "@/lib/types";
import { ProductFrame } from "./ProductFrame";

// The zoom viewer is only downloaded the first time someone opens it.
const ZoomDialog = dynamic(() => import("./ZoomDialog").then((m) => m.ZoomDialog), { ssr: false });

type GalleryProps = { images: SourceImage[]; name: string };

/**
 * Phones: a swipeable row with scroll snap and a counter. Desktop: the photos
 * stacked in the start column while the purchase panel stays in view.
 * Every photo opens the zoom viewer. Photos are never cropped (ProductFrame).
 */
export function Gallery({ images, name }: GalleryProps) {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [zoomAt, setZoomAt] = useState<number | null>(null);
  const [zoomLoaded, setZoomLoaded] = useState(false);

  const onScroll = () => {
    const el = track.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  const open = (i: number) => {
    setZoomLoaded(true);
    setZoomAt(i);
  };

  return (
    <section aria-label={`${name} photographs`} className="relative" data-gallery>
      <ul
        ref={track}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] lg:flex-col lg:gap-px lg:overflow-visible lg:bg-soot [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, i) => (
          <li key={image.src} className="w-full shrink-0 snap-center">
            <button
              type="button"
              onClick={() => open(i)}
              className="block w-full cursor-zoom-in focus-visible:outline-offset-[-4px]"
              aria-label={`Zoom photo ${i + 1} of ${images.length}`}
            >
              <ProductFrame
                image={image}
                alt={`${name}, photo ${i + 1} of ${images.length}`}
                sizes="(min-width: 1024px) 50vw, 100vw"
                preload={i === 0}
              />
            </button>
          </li>
        ))}
      </ul>

      {images.length > 1 && (
        <p className="absolute bottom-10 end-16 bg-limestone px-6 py-4 text-caption tabular-nums lg:hidden" aria-live="polite">
          {index + 1} / {images.length}
        </p>
      )}

      {zoomLoaded && (
        <ZoomDialog
          images={images}
          name={name}
          index={zoomAt ?? 0}
          open={zoomAt != null}
          onIndexChange={setZoomAt}
          onClose={() => setZoomAt(null)}
        />
      )}
    </section>
  );
}

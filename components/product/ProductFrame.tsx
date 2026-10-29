import Image from "next/image";
import type { SourceImage } from "@/lib/types";

type ProductFrameProps = {
  image: SourceImage;
  alt: string;
  /** `sizes` for the responsive srcset; must match the frame's rendered width. */
  sizes: string;
  /** Only for the LCP image on a page. */
  preload?: boolean;
  className?: string;
};

/**
 * Fixed 1:1 frame that shows the whole photo (object-fit: contain, never cover).
 * The frame is painted with the photo's own edge colour, so any space around
 * the photo — and the moment before it loads — blends with its background.
 */
export function ProductFrame({ image, alt, sizes, preload = false, className = "" }: ProductFrameProps) {
  return (
    <div className={`relative aspect-square overflow-hidden ${className}`} style={{ backgroundColor: image.frame }}>
      <Image
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        placeholder="blur"
        blurDataURL={image.blurDataURL}
        preload={preload}
        className="h-full w-full object-contain"
      />
    </div>
  );
}

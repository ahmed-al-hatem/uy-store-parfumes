import Image from "next/image";
import type { SourceImage } from "@/lib/types";

type ProductFrameProps = {
  image: SourceImage;
  alt: string;
  /** `sizes` for the responsive srcset; must match the frame's rendered width. */
  sizes: string;
  /** Only for the LCP image on a page. */
  preload?: boolean;
  /**
   * Mount the photo on a sand mat like a framed print. The mat's padding is also
   * what lets the hover zoom run without ever cropping the photo.
   */
  matted?: boolean;
  /** Scale the photo slightly when an ancestor `.group` is hovered (matted frames only). */
  zoom?: boolean;
  className?: string;
};

/**
 * Fixed 1:1 frame that shows the whole photo (object-fit: contain, never cover).
 * Unmatted, the frame is painted with the photo's own edge colour, so the moment
 * before it loads blends with its background.
 */
export function ProductFrame({ image, alt, sizes, preload = false, matted = false, zoom = false, className = "" }: ProductFrameProps) {
  const img = (
    <Image
      src={image.src}
      alt={alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      placeholder="blur"
      blurDataURL={image.blurDataURL}
      // LCP image: preload link plus high fetch priority (preload alone is fetched at low priority).
      preload={preload}
      fetchPriority={preload ? "high" : undefined}
      loading={preload ? "eager" : undefined}
      className={`h-full w-full object-contain ${zoom ? "zoom-on-hover" : ""}`}
    />
  );

  if (!matted) {
    return (
      <div className={`relative aspect-square overflow-hidden ${className}`} style={{ backgroundColor: image.frame }}>
        {img}
      </div>
    );
  }

  return (
    <div className={`relative aspect-square bg-surface p-[7%] ${className}`}>
      <div className="relative h-full w-full" style={{ backgroundColor: image.frame }}>
        {img}
      </div>
    </div>
  );
}

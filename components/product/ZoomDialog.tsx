"use client";

import Image from "next/image";
import { Dialog } from "radix-ui";
import { useRef, useState, type PointerEvent } from "react";
import { CloseIcon } from "@/components/ui/icons";
import type { SourceImage } from "@/lib/types";

type ZoomDialogProps = {
  images: SourceImage[];
  name: string;
  index: number;
  open: boolean;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

/**
 * Full-screen viewer. Tap or click toggles 2× zoom; when zoomed the photo pans
 * with the pointer on desktop and with a finger (native scrolling) on phones.
 */
export function ZoomDialog({ images, name, index, open, onIndexChange, onClose }: ZoomDialogProps) {
  const [zoomed, setZoomed] = useState(false);
  const pane = useRef<HTMLDivElement>(null);
  const image = images[index];

  const go = (step: number) => {
    setZoomed(false);
    onIndexChange((index + step + images.length) % images.length);
  };

  const toggle = (e: PointerEvent<HTMLButtonElement>) => {
    const next = !zoomed;
    setZoomed(next);
    if (!next) return;
    // Centre the zoomed photo on the point that was clicked.
    const rect = e.currentTarget.getBoundingClientRect();
    const fx = (e.clientX - rect.left) / rect.width;
    const fy = (e.clientY - rect.top) / rect.height;
    requestAnimationFrame(() => {
      const el = pane.current;
      if (!el) return;
      el.scrollLeft = fx * (el.scrollWidth - el.clientWidth);
      el.scrollTop = fy * (el.scrollHeight - el.clientHeight);
    });
  };

  const pan = (e: PointerEvent<HTMLDivElement>) => {
    const el = pane.current;
    if (!zoomed || !el || e.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    el.scrollLeft = ((e.clientX - rect.left) / rect.width) * (el.scrollWidth - el.clientWidth);
    el.scrollTop = ((e.clientY - rect.top) / rect.height) * (el.scrollHeight - el.clientHeight);
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          setZoomed(false);
          onClose();
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Content
          className="fixed inset-0 z-50 flex flex-col bg-limestone data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
          }}
        >
          <div className="flex items-center justify-between border-b border-soot px-16 lg:px-32">
            <Dialog.Title className="text-caption">
              {name}, photo {index + 1} of {images.length}
            </Dialog.Title>
            <Dialog.Close className="inline-flex min-h-touch min-w-touch items-center justify-end" aria-label="Close photo viewer">
              <CloseIcon />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">Select the photo to zoom in. Use the arrow keys for the next photo.</Dialog.Description>

          <div ref={pane} onPointerMove={pan} className={`relative flex-1 ${zoomed ? "overflow-auto" : "overflow-hidden"}`}>
            <button
              type="button"
              onPointerUp={toggle}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setZoomed((z) => !z);
                }
              }}
              aria-pressed={zoomed}
              aria-label={zoomed ? "Zoom out" : "Zoom in"}
              className={`flex items-center justify-center ${
                zoomed ? "size-[200vmax] cursor-zoom-out lg:size-[200vmin]" : "size-full cursor-zoom-in"
              }`}
              style={{ backgroundColor: image.frame }}
            >
              <Image
                key={image.src}
                src={image.src}
                alt={`${name}, photo ${index + 1}`}
                width={image.width}
                height={image.height}
                // Never ask for more pixels than the original photo has.
                sizes={zoomed ? `${image.width}px` : "100vmin"}
                placeholder="blur"
                blurDataURL={image.blurDataURL}
                className="h-full w-full object-contain"
              />
            </button>
          </div>

          {images.length > 1 && (
            <div className="flex items-center justify-between border-t border-soot px-16 lg:px-32">
              <button type="button" onClick={() => go(-1)} className="min-h-touch text-caption uppercase decoration-1 underline-offset-4 hover:underline">
                Previous
              </button>
              <span className="text-caption tabular-nums">
                {index + 1} / {images.length}
              </span>
              <button type="button" onClick={() => go(1)} className="min-h-touch text-caption uppercase decoration-1 underline-offset-4 hover:underline">
                Next
              </button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

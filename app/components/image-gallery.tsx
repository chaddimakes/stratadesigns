"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Lightbox from "./lightbox";

interface ImageGalleryProps {
  images: string[];
  alt: string;
  // Controlled mode — pass both to sync with external state
  selectedIndex?: number;
  onSelectIndex?: (i: number) => void;
  // Show a different image in the main slot (e.g. a variant preview not in the array)
  mainImageSrc?: string;
}

const VISIBLE_COUNT = 4;

function isCAD(src: string) {
  return src.toUpperCase().includes("CAD");
}

export default function ImageGallery({
  images,
  alt,
  selectedIndex,
  onSelectIndex,
  mainImageSrc,
}: ImageGalleryProps) {
  const [internalSelected, setInternalSelected] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [thumbOffset, setThumbOffset] = useState(0);

  // Sort images: non-CAD first, CAD last (stable order within each group)
  const sorted = [...images].sort((a, b) => {
    const aCAD = isCAD(a) ? 1 : 0;
    const bCAD = isCAD(b) ? 1 : 0;
    return aCAD - bCAD;
  });

  // Map sorted indices back to original indices for controlled mode
  const sortedToOriginal = sorted.map((src) => images.indexOf(src));
  const originalToSorted = images.map((src) => sorted.indexOf(src));

  const activeOriginal = selectedIndex ?? internalSelected;
  const activeSorted = originalToSorted[activeOriginal] ?? 0;
  const displaySrc = mainImageSrc ?? sorted[activeSorted];

  function handleThumbnailClick(sortedIdx: number) {
    const originalIdx = sortedToOriginal[sortedIdx];
    if (onSelectIndex) {
      onSelectIndex(originalIdx);
    } else {
      setInternalSelected(originalIdx);
    }
  }

  // Auto-scroll thumbnail window to keep the active thumbnail visible
  useEffect(() => {
    if (mainImageSrc !== undefined) return; // variant override, no thumb is "active"
    if (activeSorted < thumbOffset) {
      setThumbOffset(activeSorted);
    } else if (activeSorted >= thumbOffset + VISIBLE_COUNT) {
      setThumbOffset(Math.min(activeSorted - VISIBLE_COUNT + 1, Math.max(0, sorted.length - VISIBLE_COUNT)));
    }
  }, [activeSorted, mainImageSrc, sorted.length, thumbOffset]);

  const maxOffset = Math.max(0, sorted.length - VISIBLE_COUNT);
  const canScrollLeft = thumbOffset > 0;
  const canScrollRight = thumbOffset < maxOffset;
  const visibleThumbs = sorted.slice(thumbOffset, thumbOffset + VISIBLE_COUNT);
  const needsArrows = sorted.length > VISIBLE_COUNT;

  return (
    <>
      <div className="flex flex-col gap-3">
        <div
          className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-[#141414]"
          style={{ cursor: "zoom-in" }}
          onClick={() => setLightboxSrc(displaySrc)}
        >
          <Image
            src={displaySrc}
            alt={alt}
            fill
            className="object-cover"
            priority
          />
        </div>
        {sorted.length > 1 && (
          <div className="flex items-center gap-1">
            {needsArrows && (
              <button
                onClick={() => setThumbOffset((o) => Math.max(0, o - 1))}
                disabled={!canScrollLeft}
                className={`flex-none flex items-center justify-center w-7 h-7 rounded border border-border text-sm transition-colors ${
                  canScrollLeft
                    ? "text-foreground hover:bg-accent/20"
                    : "text-muted-foreground/30 cursor-default"
                }`}
                aria-label="Previous thumbnails"
              >
                ‹
              </button>
            )}
            <div className="flex flex-1 gap-2">
              {visibleThumbs.map((src) => {
                const sortedIdx = sorted.indexOf(src);
                return (
                  <button
                    key={src}
                    onClick={() => handleThumbnailClick(sortedIdx)}
                    className={`relative aspect-[4/3] w-1/4 overflow-hidden rounded border transition-colors ${
                      sortedIdx === activeSorted && mainImageSrc === undefined
                        ? "border-accent"
                        : "border-border opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={src} alt={`${alt} thumbnail ${sortedIdx + 1}`} fill className="object-cover" />
                  </button>
                );
              })}
            </div>
            {needsArrows && (
              <button
                onClick={() => setThumbOffset((o) => Math.min(maxOffset, o + 1))}
                disabled={!canScrollRight}
                className={`flex-none flex items-center justify-center w-7 h-7 rounded border border-border text-sm transition-colors ${
                  canScrollRight
                    ? "text-foreground hover:bg-accent/20"
                    : "text-muted-foreground/30 cursor-default"
                }`}
                aria-label="Next thumbnails"
              >
                ›
              </button>
            )}
          </div>
        )}
      </div>
      {lightboxSrc && (
        <Lightbox src={lightboxSrc} alt={alt} onClose={() => setLightboxSrc(null)} />
      )}
    </>
  );
}

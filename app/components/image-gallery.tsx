"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-[#141414]">
        <Image
          src={images[selected]}
          alt={`${alt} — image ${selected + 1}`}
          fill
          className="object-cover"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setSelected(i)}
              className={`relative aspect-[4/3] w-1/4 overflow-hidden rounded border transition-colors ${
                i === selected ? "border-accent" : "border-border opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={src} alt={`${alt} thumbnail ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

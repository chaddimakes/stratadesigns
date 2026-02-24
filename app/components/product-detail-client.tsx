"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/app/context/cart-context";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/products";
import ImageGallery from "./image-gallery";
import Lightbox from "./lightbox";

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addItem, items } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    product.variants?.[0]?.name,
  );

  const inCart = items.some((i) => i.slug === product.slug);

  const selectedVariantData = product.variants?.find(
    (v) => v.name === selectedVariant,
  );
  const displayImage = selectedVariantData?.previewImage ?? product.image;
  const hasVariantImage = !!selectedVariantData?.previewImage;

  function handleAddToCart() {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      variantName: selectedVariant,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function handleBuyNow() {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      variantName: selectedVariant,
    });
    router.push("/checkout");
  }

  return (
    <>
    <div className="grid gap-12 lg:grid-cols-2">
      {/* Image */}
      {hasVariantImage ? (
        <div
          className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-[#141414]"
          style={{ cursor: "zoom-in" }}
          onClick={() => setLightboxSrc(displayImage)}
        >
          <Image
            src={displayImage}
            alt={`${product.name} — ${selectedVariant}`}
            fill
            className="object-cover"
            priority
          />
        </div>
      ) : product.images && product.images.length > 1 ? (
        <ImageGallery images={product.images} alt={product.name} />
      ) : (
        <div
          className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-[#141414]"
          style={{ cursor: "zoom-in" }}
          onClick={() => setLightboxSrc(product.image)}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Details */}
      <div>
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent">
          {product.category}
        </p>
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {product.name}
        </h1>
        <p className="mb-6 text-2xl font-bold text-foreground">
          ${product.price.toFixed(2)}
        </p>
        <p className="mb-8 leading-relaxed text-muted">{product.longDescription}</p>

        {/* Features */}
        <div className="mb-8">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
            Features
          </h2>
          <ul className="space-y-2">
            {product.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 text-sm text-muted"
              >
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* File Info */}
        <div className="mb-8 rounded-lg border border-border bg-surface p-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
            File Details
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted">Format</p>
              <p className="font-medium text-foreground">STL</p>
            </div>
            <div>
              <p className="text-muted">Print Method</p>
              <p className="font-medium text-foreground">FDM Optimized</p>
            </div>
            <div>
              <p className="text-muted">Supports</p>
              <p className="font-medium text-foreground">Minimal / None</p>
            </div>
            {product.material && (
              <div>
                <p className="text-muted">Recommended Material</p>
                <p className="font-medium text-foreground">{product.material}</p>
              </div>
            )}
          </div>
        </div>

        {/* Variant selector + cart buttons */}
        <div className="flex flex-col gap-3">
          {product.variants && product.variants.length > 0 && (
            <div className="mb-1 flex flex-col gap-2">
              <p className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Variant
              </p>
              <div className="flex gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.name}
                    onClick={() => setSelectedVariant(variant.name)}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                      selectedVariant === variant.name
                        ? "border-accent bg-accent text-white"
                        : "border-border text-muted hover:border-accent hover:text-accent"
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          <button
            onClick={handleBuyNow}
            className="w-full rounded-lg bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Buy Now — ${product.price.toFixed(2)}
          </button>
          <button
            onClick={handleAddToCart}
            className="w-full rounded-lg border border-accent px-7 py-3.5 text-sm font-semibold text-accent transition-colors hover:bg-accent/10"
          >
            {added ? "Added to Cart ✓" : inCart ? "In Cart — Add Another" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
    {lightboxSrc && (
      <Lightbox src={lightboxSrc} alt={product.name} onClose={() => setLightboxSrc(null)} />
    )}
    </>
  );
}

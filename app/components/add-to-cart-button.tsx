"use client";

import { useCart } from "@/app/context/cart-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product } from "@/lib/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem, items } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    product.variants?.[0]?.name,
  );

  const inCart = items.some((i) => i.slug === product.slug);

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
  );
}

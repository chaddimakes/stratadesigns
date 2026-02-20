"use client";

import { useCart } from "@/app/context/cart-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product } from "@/lib/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem, items } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const inCart = items.some((i) => i.slug === product.slug);

  function handleAddToCart() {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
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
    });
    router.push("/checkout");
  }

  return (
    <div className="flex flex-col gap-3">
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

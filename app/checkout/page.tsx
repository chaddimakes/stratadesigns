"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/cart-context";
import Link from "next/link";

export default function CheckoutPage() {
  const { items } = useCart();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const startCheckout = useCallback(async () => {
    if (items.length === 0) return;
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      if (data.url) {
        router.push(data.url);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }, [items, router]);

  useEffect(() => {
    startCheckout();
  }, [startCheckout]);

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6">
        <p className="text-lg text-muted">Your cart is empty.</p>
        <Link
          href="/products"
          className="rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6">
      {error ? (
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
            {error} —{" "}
            <button
              onClick={startCheckout}
              className="underline hover:no-underline"
            >
              try again
            </button>
          </div>
          <Link
            href="/cart"
            className="text-sm text-muted underline hover:text-foreground"
          >
            Return to cart
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          <p className="text-sm text-muted">Redirecting to checkout…</p>
        </div>
      )}
    </div>
  );
}

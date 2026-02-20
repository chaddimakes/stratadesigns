"use client";

import { useEffect, useState, useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useCart } from "@/app/context/cart-context";
import Link from "next/link";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function CheckoutPage() {
  const { items } = useCart();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchClientSecret = useCallback(async () => {
    if (items.length === 0) return;
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      setClientSecret(data.clientSecret);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }, [items]);

  useEffect(() => {
    fetchClientSecret();
  }, [fetchClientSecret]);

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
    <div className="mx-auto max-w-3xl px-6 py-16">
      {/* Header */}
      <div className="mb-8">
        <p className="mb-1 text-sm font-medium uppercase tracking-widest text-accent">
          Secure Checkout
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Complete Your Order
        </h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          {error} —{" "}
          <button
            onClick={fetchClientSecret}
            className="underline hover:no-underline"
          >
            try again
          </button>
        </div>
      )}

      {clientSecret ? (
        <div className="overflow-hidden rounded-xl border border-border bg-white">
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ clientSecret }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      ) : (
        !error && (
          <div className="flex h-64 items-center justify-center rounded-xl border border-border bg-surface">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
              <p className="text-sm text-muted">Loading checkout…</p>
            </div>
          </div>
        )
      )}

      <p className="mt-6 text-center text-xs text-muted">
        Payments are processed securely by{" "}
        <span className="text-foreground">Stripe</span>. Your card details never
        touch our servers.
      </p>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useCart, cartKey } from "@/app/context/cart-context";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeItem, totalPrice, totalItems } =
    useCart();
  const router = useRouter();
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="mb-6 text-6xl opacity-20">🛒</div>
        <h1 className="mb-4 text-2xl font-bold text-foreground">
          Your cart is empty
        </h1>
        <p className="mb-8 text-muted">
          Add some STL files to get started.
        </p>
        <Link
          href="/products"
          className="inline-block rounded-lg bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-10 text-3xl font-bold tracking-tight text-foreground">
        Your Cart
        <span className="ml-3 text-lg font-normal text-muted">
          ({totalItems} {totalItems === 1 ? "item" : "items"})
        </span>
      </h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Items list */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={cartKey(item)}
              className="flex gap-4 rounded-lg border border-border bg-surface p-4"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-border bg-[#141414]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link
                      href={`/products/${item.slug}`}
                      className="font-semibold text-foreground transition-colors hover:text-accent"
                    >
                      {item.name}
                    </Link>
                    {item.variantName && (
                      <p className="mt-0.5 text-xs text-muted">{item.variantName}</p>
                    )}
                  </div>
                  <span className="shrink-0 font-bold text-foreground">
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-end">
                  <button
                    onClick={() => removeItem(cartKey(item))}
                    className="text-xs text-muted transition-colors hover:text-red-400"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="h-fit rounded-lg border border-border bg-surface p-6">
          <h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-foreground">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">
            {items.map((item) => (
              <div key={cartKey(item)} className="flex justify-between text-muted">
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="my-4 border-t border-border" />

          <div className="mb-6 flex justify-between text-base font-bold text-foreground">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <p className="mb-2 text-xs text-muted">
            Digital download only — no physical product will be shipped.
          </p>
          <label className="mb-4 flex cursor-pointer items-start gap-2.5">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded accent-[#ea580c]"
            />
            <span className="text-sm leading-relaxed text-gray-300">
              I agree that all files purchased are for personal use only.
              Redistribution, resale, or commercial use is strictly
              prohibited.{" "}
              <Link
                href="/terms"
                className="text-accent underline transition-colors hover:text-accent-hover"
              >
                Terms of Service
              </Link>
            </span>
          </label>

          <button
            onClick={() => router.push("/checkout")}
            disabled={!agreedToTerms}
            className="w-full rounded-lg bg-accent py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
          >
            Proceed to Checkout
          </button>

          <Link
            href="/products"
            className="mt-3 block text-center text-xs text-muted transition-colors hover:text-accent"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

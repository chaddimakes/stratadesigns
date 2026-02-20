"use client";

import { useCart } from "@/app/context/cart-context";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } =
    useCart();
  const router = useRouter();

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
              key={item.slug}
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
                  <Link
                    href={`/products/${item.slug}`}
                    className="font-semibold text-foreground transition-colors hover:text-accent"
                  >
                    {item.name}
                  </Link>
                  <span className="shrink-0 font-bold text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.slug, item.quantity - 1)
                      }
                      className="flex h-7 w-7 items-center justify-center rounded border border-border text-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-medium text-foreground">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.slug, item.quantity + 1)
                      }
                      className="flex h-7 w-7 items-center justify-center rounded border border-border text-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.slug)}
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
              <div key={item.slug} className="flex justify-between text-muted">
                <span>
                  {item.name}
                  {item.quantity > 1 && (
                    <span className="ml-1 text-xs">×{item.quantity}</span>
                  )}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="my-4 border-t border-border" />

          <div className="mb-6 flex justify-between text-base font-bold text-foreground">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <button
            onClick={() => router.push("/checkout")}
            className="w-full rounded-lg bg-accent py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
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

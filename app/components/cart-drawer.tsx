"use client";

import { useCart, cartKey } from "@/app/context/cart-context";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useCallback, useState } from "react";

export default function CartDrawer() {
  const {
    items,
    removeItem,
    totalPrice,
    totalItems,
    isDrawerOpen,
    closeDrawer,
  } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const close = useCallback(() => closeDrawer(), [closeDrawer]);

  // Close on route change
  useEffect(() => {
    close();
  }, [pathname, close]);

  // Close on Escape
  useEffect(() => {
    if (!isDrawerOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isDrawerOpen, close]);

  // Lock body scroll
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[70] bg-black/60 transition-opacity duration-300 ${
          isDrawerOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
      />

      {/* Drawer panel */}
      <div
        className={`fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-[#0d0d0d] shadow-xl transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white">Cart</h2>
            {totalItems > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={close}
            aria-label="Close cart"
            className="p-1 text-muted transition-colors hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 text-5xl opacity-20">🛒</div>
              <p className="text-muted">Your cart is empty</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={cartKey(item)}
                  className="flex gap-3 rounded-lg border border-border bg-surface p-3"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-border bg-[#141414]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      <p className="truncate text-sm font-semibold text-white">
                        {item.name}
                      </p>
                      {item.variantName && (
                        <p className="mt-0.5 text-xs text-muted">
                          {item.variantName}
                        </p>
                      )}
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-sm font-bold text-white">
                        ${item.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(cartKey(item))}
                        className="text-xs text-muted transition-colors hover:text-red-400"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-4">
            <div className="mb-1 flex justify-between text-base font-bold text-white">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <p className="mb-3 text-xs text-muted">
              Taxes calculated at checkout
            </p>
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
            <div className="flex gap-3">
              <Link
                href="/cart"
                onClick={close}
                className="flex-1 rounded-lg border border-border py-2.5 text-center text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
              >
                View Cart
              </Link>
              <button
                onClick={() => {
                  close();
                  router.push("/checkout");
                }}
                disabled={!agreedToTerms}
                className="flex-1 rounded-lg bg-accent py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

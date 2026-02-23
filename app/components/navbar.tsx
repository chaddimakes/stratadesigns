"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/app/context/cart-context";

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent font-mono text-xs font-bold text-white sm:h-9 sm:w-9 sm:text-sm">
            SD
          </div>
          <div className="leading-tight">
            <span className="block text-sm font-bold tracking-tight text-foreground sm:text-lg">
              Strata Design
            </span>
            <span className="hidden sm:block text-[11px] uppercase tracking-widest text-muted">
              Precision Engineered. Trail Tested.
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3 sm:gap-8">
          <Link
            href="/"
            className={`text-xs font-medium transition-colors hover:text-accent sm:text-sm ${
              pathname === "/" ? "text-accent" : "text-muted"
            }`}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`text-xs font-medium transition-colors hover:text-accent sm:text-sm ${
              pathname.startsWith("/products") ? "text-accent" : "text-muted"
            }`}
          >
            Products
          </Link>
          <Link
            href="/about"
            className={`text-xs font-medium transition-colors hover:text-accent sm:text-sm ${
              pathname === "/about" ? "text-accent" : "text-muted"
            }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`text-xs font-medium transition-colors hover:text-accent sm:text-sm ${
              pathname === "/contact" ? "text-accent" : "text-muted"
            }`}
          >
            Contact
          </Link>

          {/* Cart icon */}
          <Link
            href="/cart"
            aria-label={`Cart (${totalItems} items)`}
            className={`relative flex items-center mr-1 transition-colors hover:text-accent ${
              pathname === "/cart" ? "text-accent" : "text-muted"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold leading-none text-white">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

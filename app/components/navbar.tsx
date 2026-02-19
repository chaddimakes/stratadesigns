"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent font-mono text-sm font-bold text-white">
            SD
          </div>
          <div className="leading-tight">
            <span className="block text-lg font-bold tracking-tight text-foreground">
              Strata Designs
            </span>
            <span className="block text-[11px] uppercase tracking-widest text-muted">
              Precision Engineered. Trail Tested.
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-accent ${
              pathname === "/" ? "text-accent" : "text-muted"
            }`}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`text-sm font-medium transition-colors hover:text-accent ${
              pathname.startsWith("/products") ? "text-accent" : "text-muted"
            }`}
          >
            Products
          </Link>
        </div>
      </div>
    </nav>
  );
}

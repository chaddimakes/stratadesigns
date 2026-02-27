"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/app/context/cart-context";
import { useState, useEffect, useRef, useCallback } from "react";

function CartIcon() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={`Cart (${totalItems} items)`}
      className={`relative flex items-center transition-colors hover:text-accent ${
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
  );
}

const shopLinks = [
  { label: "Toyota Tacoma (3rd Gen)", href: "/products?vehicle=tacoma" },
  { label: "Universal", href: "/products?vehicle=universal" },
];

const companyLinks = [
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeMega = useCallback(() => setMegaOpen(false), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Close menus on route change
  useEffect(() => {
    closeMega();
    closeMobile();
  }, [pathname, closeMega, closeMobile]);

  // Close mega menu on Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeMega();
        closeMobile();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeMega, closeMobile]);

  // Close mega menu on click outside
  useEffect(() => {
    if (!megaOpen) return;
    function onClick(e: MouseEvent) {
      if (
        megaRef.current &&
        !megaRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        closeMega();
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [megaOpen, closeMega]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-3 sm:px-6 sm:py-4">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent font-mono text-xs font-bold text-white sm:h-9 sm:w-9 sm:text-sm">
            PP
          </div>
          <div className="leading-tight">
            <span className="block text-sm font-bold tracking-tight text-foreground sm:text-lg">
              Proper Polymer
            </span>
            <span className="hidden sm:block text-[11px] uppercase tracking-widest text-muted">
              Precision Engineered. Trail Tested.
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <div
            className="relative"
            onMouseLeave={closeMega}
          >
            <button
              ref={triggerRef}
              onClick={() => setMegaOpen((o) => !o)}
              onMouseEnter={() => setMegaOpen(true)}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                pathname.startsWith("/products") ? "text-accent" : "text-muted"
              }`}
            >
              Shop
            </button>

            {megaOpen && (
              <div
                ref={megaRef}
                className="absolute left-1/2 top-full -translate-x-1/2 pt-4"
              >
                <div className="w-56 rounded-lg border border-border bg-surface p-6 shadow-xl">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
                    Shop
                  </h3>
                  <ul className="space-y-2">
                    {shopLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-foreground transition-colors hover:text-accent"
                          onClick={closeMega}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <span className="text-sm text-muted/50 cursor-default">
                        Toyota Sienna (Coming Soon)
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {companyLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                pathname === link.href || pathname.startsWith(link.href + "/")
                  ? "text-accent"
                  : "text-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <CartIcon />
        </div>

        {/* Mobile nav controls */}
        <div className="flex md:hidden items-center gap-4">
          <CartIcon />
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="text-muted hover:text-accent transition-colors"
          >
            {mobileOpen ? (
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
            ) : (
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
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 md:hidden"
            onClick={closeMobile}
          />
          {/* Slide-out panel */}
          <div className="absolute right-0 top-full z-50 w-72 border-l border-b border-border rounded-bl-lg bg-[#0d0d0d] shadow-xl md:hidden">
            <div className="px-6 py-6 space-y-6">
              {/* Shop section */}
              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
                  Shop
                </h3>
                <ul className="space-y-3">
                  {shopLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-foreground transition-colors hover:text-accent"
                        onClick={closeMobile}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <span className="text-sm text-muted/50 cursor-default">
                      Toyota Sienna (Coming Soon)
                    </span>
                  </li>
                </ul>
              </div>

              {/* Standalone links */}
              <ul className="space-y-3 border-t border-border pt-4">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground transition-colors hover:text-accent"
                      onClick={closeMobile}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

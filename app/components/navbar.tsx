"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/app/context/cart-context";
import { useState, useEffect, useRef, useCallback } from "react";

function CartIcon() {
  const { totalItems, isDrawerOpen, openDrawer } = useCart();

  return (
    <button
      onClick={openDrawer}
      aria-label={`Cart (${totalItems} items)`}
      className={`relative flex items-center transition-colors hover:text-accent ${
        isDrawerOpen ? "text-accent" : "text-muted"
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
    </button>
  );
}

const shopLinks = [
  { label: "Toyota Tacoma (3rd Gen)", href: "/products?vehicle=tacoma" },
  { label: "Universal", href: "/products?vehicle=universal" },
  { label: "Toyota Sienna", href: "", comingSoon: true },
];

const companyLinks = [
  { label: "Learn", href: "/learn" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopExpanded, setShopExpanded] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeMega = useCallback(() => setMegaOpen(false), []);
  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setShopExpanded(false);
  }, []);

  // Close menus on route change
  useEffect(() => {
    closeMega();
    closeMobile();
  }, [pathname, closeMega, closeMobile]);

  // Close menus on Escape
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
    <>
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-3 sm:px-6 sm:py-4">
          {/* ── Desktop layout: logo left, nav right ── */}
          <Link href="/" className="hidden lg:flex shrink-0 items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent font-mono text-sm font-bold text-white">
              PP
            </div>
            <div className="leading-tight">
              <span className="block text-lg font-bold tracking-tight text-foreground">
                Proper Polymer
              </span>
              <span className="block text-[11px] uppercase tracking-widest text-muted">
                Precision Engineered. Trail Tested.
              </span>
            </div>
          </Link>

          {/* ── Mobile layout: hamburger | brand | cart ── */}
          <div className="flex lg:hidden w-full items-center justify-between">
            {/* Hamburger — left */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="text-foreground p-1"
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
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            {/* Brand — center */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 text-base font-bold tracking-tight text-foreground"
            >
              Proper Polymer
            </Link>

            {/* Cart — right */}
            <CartIcon />
          </div>

          {/* ── Desktop nav ── */}
          <div className="hidden lg:flex items-center gap-8">
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
                      {shopLinks.map((link) =>
                        link.comingSoon ? (
                          <li key={link.label}>
                            <span className="text-sm text-muted/50 cursor-default">
                              {link.label} (Coming Soon)
                            </span>
                          </li>
                        ) : (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="text-sm text-foreground transition-colors hover:text-accent"
                              onClick={closeMega}
                            >
                              {link.label}
                            </Link>
                          </li>
                        )
                      )}
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
        </div>
      </nav>

      {/* ── Full-screen mobile slide-out menu ── */}
      {/* Rendered outside <nav> to avoid backdrop-blur stacking context issues */}

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300 lg:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobile}
      />

      {/* Panel — slides in from left */}
      <div
        className={`fixed inset-y-0 left-0 z-[60] w-full bg-[#0d0d0d] transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Menu header — close button in same position as hamburger */}
        <div className="flex items-center px-3 py-3">
          <button
            onClick={closeMobile}
            aria-label="Close menu"
            className="text-foreground p-1"
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

        {/* Menu items */}
        <div className="px-8 pt-8">
          <ul className="space-y-7">
            {/* Shop — expandable */}
            <li>
              <button
                onClick={() => setShopExpanded((o) => !o)}
                className="flex w-full items-center justify-between text-2xl font-bold text-white"
              >
                <span>Shop</span>
                <span className="text-xl text-muted">
                  {shopExpanded ? "−" : "+"}
                </span>
              </button>

              {/* Sub-items */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  shopExpanded ? "max-h-60 opacity-100 mt-4" : "max-h-0 opacity-0"
                }`}
              >
                <ul className="space-y-4 pl-4 border-l border-border">
                  {shopLinks.map((link) =>
                    link.comingSoon ? (
                      <li key={link.label}>
                        <span className="text-base text-muted/40 cursor-default">
                          {link.label}{" "}
                          <span className="text-sm italic">Coming Soon</span>
                        </span>
                      </li>
                    ) : (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-base text-white/70 transition-colors hover:text-accent"
                          onClick={closeMobile}
                        >
                          {link.label}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </li>

            {/* Blog, About, Contact */}
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-2xl font-bold text-white transition-colors hover:text-accent"
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
  );
}

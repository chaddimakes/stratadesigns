import Link from "next/link";
import { products } from "@/lib/products";
import ProductCard from "./components/product-card";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-6 py-28 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
            Premium 3D Printable Files
          </p>
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl">
            Built for the
            <br />
            <span className="text-accent">Off-Road Obsessed</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted">
            High-detail STL files for Toyota Tacoma scale accessories. Designed
            for precision FDM printing, tested for accuracy, and ready for your
            next build.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center rounded-lg bg-accent px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Browse Products
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center rounded-lg border border-border px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/40 hover:text-accent"
            >
              View All STLs
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
            Featured
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Latest Releases
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground">
            Ready to Build?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-muted">
            Every STL is optimized for home FDM printers. Download, slice, and
            print — it&apos;s that simple.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center rounded-lg bg-accent px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Shop All Products
          </Link>
        </div>
      </section>
    </>
  );
}

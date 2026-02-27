import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import ProductCard from "./components/product-card";

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Proper Polymer",
    url: "https://www.properpolymer.com",
    image: "https://www.properpolymer.com/og-image.jpg",
    description:
      "Proper Polymer designs and sells premium 3D printable STL files for Toyota Tacoma accessories. Precision engineered and trail tested.",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@properpolymer.com",
      contactType: "customer service",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <Image
          src="/hero.jpg"
          alt="Off-road trail"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Top gradient overlay: black to transparent over top 30% */}
        <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-black to-transparent" />
        {/* Accent gradient tint */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent" />
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
            High-detail STL files for offroad vehicles. Designed for
            precision FDM printing, tested for accuracy, and ready for your
            next build.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center rounded-lg bg-accent px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Browse Products
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

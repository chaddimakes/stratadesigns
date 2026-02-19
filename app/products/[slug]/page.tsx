import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products, getProductBySlug } from "@/lib/products";
import type { Metadata } from "next";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Strata Designs`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-muted">
        <Link href="/" className="transition-colors hover:text-accent">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="transition-colors hover:text-accent">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-[#141414]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Details */}
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent">
            {product.category}
          </p>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {product.name}
          </h1>
          <p className="mb-6 text-2xl font-bold text-foreground">
            ${product.price.toFixed(2)}
          </p>
          <p className="mb-8 leading-relaxed text-muted">
            {product.longDescription}
          </p>

          {/* Features */}
          <div className="mb-8">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Features
            </h2>
            <ul className="space-y-2">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-muted">
                  <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* File Info */}
          <div className="mb-8 rounded-lg border border-border bg-surface p-5">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
              File Details
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted">Format</p>
                <p className="font-medium text-foreground">STL</p>
              </div>
              <div>
                <p className="text-muted">Print Method</p>
                <p className="font-medium text-foreground">FDM Optimized</p>
              </div>
              <div>
                <p className="text-muted">Scale</p>
                <p className="font-medium text-foreground">1:10</p>
              </div>
              <div>
                <p className="text-muted">Supports</p>
                <p className="font-medium text-foreground">Minimal / None</p>
              </div>
            </div>
          </div>

          <button className="w-full rounded-lg bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover">
            Add to Cart — ${product.price.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}

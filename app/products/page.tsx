import { products } from "@/lib/products";
import ProductCard from "../components/product-card";

export const metadata = {
  title: "Shop All Products",
  description:
    "Browse the full catalog of premium 3D printable STL files for Toyota Tacoma accessories. Precision engineered, FDM optimized, and trail tested.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Shop All Products",
    description:
      "Browse the full catalog of premium 3D printable STL files for Toyota Tacoma accessories.",
    url: "/products",
  },
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-12">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
          STL Collection
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          All Products
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          Precision-engineered STL files for Toyota Tacoma scale builds. Every
          file is print-tested and optimized for FDM.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}

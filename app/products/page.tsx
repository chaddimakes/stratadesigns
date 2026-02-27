import Link from "next/link";
import { products, getProductsByVehicle } from "@/lib/products";
import ProductCard from "../components/product-card";

const vehicleLabels: Record<string, string> = {
  tacoma: "Toyota Tacoma (3rd Gen)",
  universal: "Universal",
};

const vehicleDescriptions: Record<string, string> = {
  tacoma:
    "Precision-engineered STL files for Toyota Tacoma. Every file is print-tested and optimized for FDM.",
  universal:
    "Precision-engineered STL files for common offroad accessories. Every file is print-tested and optimized for FDM.",
};

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

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ vehicle?: string }>;
}) {
  const { vehicle } = await searchParams;

  const isFiltered = vehicle && vehicle in vehicleLabels;
  const displayProducts = isFiltered
    ? getProductsByVehicle(vehicle)
    : products;
  const heading = isFiltered ? vehicleLabels[vehicle] : "All Products";

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-12">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
          STL Collection
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          {heading}
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          {isFiltered && vehicleDescriptions[vehicle]
            ? vehicleDescriptions[vehicle]
            : "Precision-engineered STL files for your build. Every file is print-tested and optimized for FDM."}
        </p>
        {isFiltered && (
          <Link
            href="/products"
            className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
          >
            &larr; View All Products
          </Link>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}

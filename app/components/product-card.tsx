import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-lg border border-border bg-surface transition-all hover:border-accent/40 hover:bg-surface-hover"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#141414]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-accent">
          {product.category}
        </p>
        <h3 className="mb-2 text-lg font-semibold text-foreground">
          {product.name}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-muted">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm font-medium text-accent transition-colors group-hover:text-accent-hover">
            View Details &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}

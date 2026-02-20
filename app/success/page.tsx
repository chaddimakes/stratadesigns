import Stripe from "stripe";
import Link from "next/link";
import { getProductBySlug } from "@/lib/products";
import ClearCartOnSuccess from "@/app/components/clear-cart-on-success";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

export const metadata = {
  title: "Order Confirmed — Strata Designs",
};

export default async function SuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return <InvalidSession />;
  }

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(session_id);
  } catch {
    return <InvalidSession />;
  }

  if (session.payment_status !== "paid") {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <p className="text-muted">
          Payment not yet confirmed. If you just paid, please wait a moment and
          refresh.
        </p>
      </div>
    );
  }

  const purchasedSlugs = (session.metadata?.products ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const purchasedProducts = purchasedSlugs
    .map((slug) => getProductBySlug(slug))
    .filter(Boolean);

  return (
    <>
      <ClearCartOnSuccess />
      <div className="mx-auto max-w-xl px-6 py-20">
        {/* Success badge */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-3xl">
            ✓
          </div>
          <p className="mb-1 text-sm font-medium uppercase tracking-widest text-accent">
            Payment Confirmed
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Thanks for your order!
          </h1>
          <p className="mt-3 text-muted">
            Your STL files are ready. Download them below — links are tied to
            this session and always available at this URL.
          </p>
        </div>

        {/* Download cards — one card per product, one row per file */}
        <div className="space-y-4">
          {purchasedProducts.map((product) => {
            if (!product) return null;
            const files = product.stlFiles ?? [];
            return (
              <div
                key={product.slug}
                className="rounded-lg border border-border bg-surface p-4"
              >
                <p className="mb-3 font-semibold text-foreground">
                  {product.name}
                </p>
                <div className="space-y-2">
                  {files.map((filename) => {
                    const downloadUrl = `/api/download?session_id=${session_id}&slug=${product.slug}&file=${encodeURIComponent(filename)}`;
                    return (
                      <div
                        key={filename}
                        className="flex items-center justify-between gap-4"
                      >
                        <span className="truncate text-xs text-muted">
                          {filename}
                        </span>
                        <a
                          href={downloadUrl}
                          download={filename}
                          className="shrink-0 rounded-lg bg-accent px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-accent-hover"
                        >
                          Download
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Info box */}
        <div className="mt-8 rounded-lg border border-border bg-surface p-5 text-sm text-muted">
          <p className="mb-1 font-semibold text-foreground">Save this page</p>
          <p>
            Bookmark this URL to re-download your files any time. A receipt was
            also sent to your email by Stripe.
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    </>
  );
}

function InvalidSession() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="mb-4 text-2xl font-bold text-foreground">
        Invalid Order Link
      </h1>
      <p className="mb-8 text-muted">
        This order link is invalid or has expired.
      </p>
      <Link
        href="/products"
        className="inline-block rounded-lg bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
      >
        Browse Products
      </Link>
    </div>
  );
}

import Stripe from "stripe";
import Link from "next/link";
import SendCustomConfirmationEmail from "@/app/components/send-custom-confirmation-email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const metadata = {
  title: "Custom Order Confirmed — Proper Polymer",
};

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function CustomOrderSuccessPage({ searchParams }: Props) {
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

  const customerName = session.metadata?.customerName || "there";
  const description = session.metadata?.description || "Custom order";
  const amountTotal = session.amount_total ?? 0;
  const formattedPrice = (amountTotal / 100).toFixed(2);

  return (
    <>
      <SendCustomConfirmationEmail sessionId={session_id} />
      <div className="mx-auto max-w-xl px-6 py-20">
        <div className="flex flex-col items-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-3xl">
            ✓
          </div>
          <p className="mb-1 text-sm font-medium uppercase tracking-widest text-accent">
            Payment Confirmed
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Thanks for your order, {customerName}!
          </h1>
          <p className="mt-3 text-muted">
            Your custom order has been received. We&apos;ll reach out if we have
            any questions.
          </p>
        </div>

        <div className="mt-8 rounded-lg border border-border bg-surface p-5">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">
            Order Details
          </p>
          <p className="mt-2 text-sm font-semibold text-foreground">
            {description}
          </p>
          <p className="mt-2 text-sm text-muted">
            Total paid:{" "}
            <span className="font-semibold text-foreground">
              ${formattedPrice}
            </span>
          </p>
        </div>

        <div className="mt-6 rounded-lg border border-border bg-surface p-5 text-sm text-muted">
          <p>
            A confirmation email has been sent to your email address from{" "}
            <span className="text-foreground">hello@properpolymer.com</span>.
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block rounded-lg bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Back to Homepage
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
        href="/"
        className="inline-block rounded-lg bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
      >
        Back to Homepage
      </Link>
    </div>
  );
}

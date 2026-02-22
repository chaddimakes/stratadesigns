export const metadata = {
  title: "Privacy Policy — Strata Designs",
  description: "Privacy Policy for Strata Designs digital products.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <div className="mb-12">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
          Legal
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-muted">Last updated: February 2026</p>
      </div>

      <div className="space-y-10 text-base leading-relaxed text-muted">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            What We Collect
          </h2>
          <p>
            We only collect what&apos;s necessary to process your order: your
            name, email address, and shipping/billing information. Payment
            details are handled entirely by Stripe — we never see or store your
            card number.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            How We Use It
          </h2>
          <p>
            Your information is used to fulfill your order and send you an order
            confirmation email. That&apos;s it. We don&apos;t use your data for
            advertising, analytics platforms, or anything unrelated to your
            purchase.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            We Don&apos;t Sell Your Data
          </h2>
          <p>
            Your personal information is never sold, rented, or shared with
            third parties for marketing purposes. Full stop.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            Payment Processing
          </h2>
          <p>
            All payments are processed securely through{" "}
            <a
              href="https://stripe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-4 hover:opacity-80"
            >
              Stripe
            </a>
            . When you check out, your card details go directly to Stripe — we
            never receive or store them. Stripe&apos;s own privacy policy
            applies to any data they collect during payment.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            Order Emails
          </h2>
          <p>
            After a successful purchase, you&apos;ll receive a confirmation
            email with your order details and download link. We may occasionally
            reach out if there&apos;s an issue with your order. We don&apos;t
            send marketing emails or newsletters unless you specifically opt in.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            Contact
          </h2>
          <p>
            Questions about your data or this policy? Email us at{" "}
            <a
              href="mailto:chaddimakes@gmail.com"
              className="text-accent underline underline-offset-4 hover:opacity-80"
            >
              chaddimakes@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

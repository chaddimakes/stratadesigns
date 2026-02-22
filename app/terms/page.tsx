export const metadata = {
  title: "Terms of Service — Strata Designs",
  description: "Terms of Service for Strata Designs digital products.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <div className="mb-12">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
          Legal
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-muted">Last updated: February 2026</p>
      </div>

      <div className="space-y-10 text-base leading-relaxed text-muted">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            All Sales Are Final
          </h2>
          <p>
            All products sold by Strata Designs are digital files. Once a
            purchase is complete and files have been delivered, the sale is
            final. No refunds or exchanges are offered. Please review product
            descriptions, photos, and compatibility notes carefully before
            purchasing.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            Personal Use Only
          </h2>
          <p>
            Files purchased from Strata Designs are licensed for personal,
            non-commercial use only. You may not resell, redistribute, share,
            or modify and redistribute these files in any form — digital or
            printed — without explicit written permission. Each license covers
            one buyer.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            Print Compatibility Disclaimer
          </h2>
          <p>
            Strata Designs provides STL files as-is. While every design is
            validated on a real 2020 Toyota Tacoma TRD Off-Road, we make no
            guarantees about fit or compatibility with your specific vehicle,
            trim, year, or setup. Print results vary based on printer
            calibration, material, and slicer settings. You are responsible for
            verifying that a part is appropriate for your use case before
            printing or installing it. Strata Designs is not liable for failed
            prints, poor fit, or any damage resulting from use of these files.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            Product Updates & Pricing
          </h2>
          <p>
            Strata Designs reserves the right to update, revise, or discontinue
            any product — including file revisions and pricing changes — at any
            time without prior notice. If a significant update is made to a file
            you&apos;ve already purchased, we&apos;ll make a reasonable effort
            to notify you, but this is not guaranteed.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            Age Requirement
          </h2>
          <p>
            You must be 18 years of age or older to make a purchase on this
            site. By completing a purchase, you confirm that you meet this
            requirement.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            Governing Law
          </h2>
          <p>
            These terms are governed by the laws of the State of Washington,
            without regard to its conflict of law provisions. Any disputes
            arising from a purchase or use of these files will be handled under
            Washington state jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            Questions?
          </h2>
          <p>
            If you have any questions about these terms, reach out at{" "}
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

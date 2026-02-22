import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Strata Designs
            </p>
            <p className="text-xs text-muted">
              Precision Engineered. Trail Tested.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 sm:items-end">
            <p className="text-xs text-muted">
              &copy; {new Date().getFullYear()} Strata Designs. All rights
              reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="/terms"
                className="text-xs text-muted hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-xs text-muted hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

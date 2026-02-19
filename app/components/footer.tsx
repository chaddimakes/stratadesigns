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
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Strata Designs. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

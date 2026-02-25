export const metadata = {
  title: "About",
  description:
    "Proper Polymer is a one-person operation building precision STL files for Toyota Tacoma owners and off-road enthusiasts, based in the Pacific Northwest.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Proper Polymer",
    description:
      "A one-person operation building precision STL files for Toyota Tacoma owners, based in the Pacific Northwest.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      {/* Header */}
      <div className="mb-12">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
          About
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Proper Polymer
        </h1>
      </div>

      {/* Story */}
      <div className="space-y-6 text-lg leading-relaxed text-muted">
        <p>
          Proper Polymer is a one-person operation built around a simple idea:
          make high-quality, functional STL files for Toyota Tacoma owners and
          off-road enthusiasts who want parts that actually fit.
        </p>
        <p>
          Every design starts in CAD and gets validated against a real{" "}
          <span className="text-foreground font-medium">
            2020 Tacoma TRD Off-Road
          </span>
          . If it doesn&apos;t fit in the real world, it doesn&apos;t ship.
          That means accurate mounting points, real-world tolerances, and
          geometry that&apos;s actually optimized for FDM printing — not just
          something that looks good in a render.
        </p>
        <p>
          Based in the{" "}
          <span className="text-foreground font-medium">Pacific Northwest</span>
          , where the trails demand gear that holds up and the weather demands
          materials that last — PETG and ASA are the defaults here for a reason.
        </p>
        <p>
          This isn&apos;t a big brand. It&apos;s one person who loves trucks,
          printing, and solving real problems with well-designed parts. If
          something&apos;s off with a file, I&apos;ll make it right.
        </p>
      </div>

      {/* Stats / highlights */}
      <div className="mt-16 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">
        {[
          { label: "Built on", value: "2020 Tacoma TRD Off-Road" },
          { label: "Based in", value: "Pacific Northwest" },
          { label: "Operation", value: "One person. No shortcuts." },
        ].map(({ label, value }) => (
          <div key={label} className="bg-surface px-6 py-8">
            <p className="mb-1 text-xs font-medium uppercase tracking-widest text-muted">
              {label}
            </p>
            <p className="text-base font-semibold text-foreground">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

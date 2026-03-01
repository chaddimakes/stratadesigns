import type { Metadata } from "next";
import Link from "next/link";
import FilamentGuideTable from "@/app/components/FilamentGuideTable";

export const metadata: Metadata = {
  title: "Which Filament Should You Use for 3D Printed Truck Parts?",
  description:
    "A breakdown of common 3D printing filaments — PLA, PETG, ABS, ASA, Nylon, and more — and how they hold up in real automotive applications like roof racks, interior panels, and underhood mounts.",
  alternates: {
    canonical: "/learn/filament-guide",
  },
  openGraph: {
    title: "Which Filament Should You Use for 3D Printed Truck Parts?",
    description:
      "A breakdown of common 3D printing filaments and how they hold up in real automotive applications.",
    url: "/learn/filament-guide",
  },
};

export default function FilamentGuidePage() {
  return (
    <article className="mx-auto max-w-5xl px-6 py-20">
      {/* Header */}
      <div className="mb-12">
        <Link
          href="/learn"
          className="mb-4 inline-block text-sm text-muted transition-colors hover:text-accent"
        >
          &larr; Back to The Workshop
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Which Filament Should You Use for 3D Printed Truck Parts?
        </h1>
      </div>

      {/* Intro */}
      <div className="mb-12 space-y-6 text-lg leading-relaxed text-muted">
        <p>
          Not all filaments are created equal &mdash; especially when your parts
          live on a roof rack in July or inside a truck cab baking in a parking
          lot. Here&apos;s a breakdown of common filaments and how they hold up
          in real automotive applications, plus what we actually use at Proper
          Polymer and why.
        </p>
      </div>

      {/* Table */}
      <FilamentGuideTable />

      {/* Closing */}
      <div className="mt-12 space-y-6 text-lg leading-relaxed text-muted">
        <p>
          ASA is our default for a reason &mdash; it handles UV, heat, and
          impact better than anything else in the common FDM range without
          needing exotic hardware or a controlled enclosure. If you have
          questions about material selection for a specific application,{" "}
          <Link
            href="/contact"
            className="text-accent underline underline-offset-2 transition-colors hover:text-accent-hover"
          >
            reach out
          </Link>
          .
        </p>
      </div>
    </article>
  );
}

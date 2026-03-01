import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Guides and resources for 3D printing truck parts — filament selection, material science, and real-world testing insights from Proper Polymer.",
  alternates: {
    canonical: "/learn",
  },
};

const guides = [
  {
    href: "/learn/filament-guide",
    title: "Filament Guide for Truck Parts",
    description:
      "Not all filaments hold up the same under the hood or on a roof rack. Here\u2019s what to know before you print.",
  },
];

export default function LearnPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
          Resources
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          The Workshop
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Practical guides on materials, printing, and building parts that
          actually survive life on a truck.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <Link
            key={guide.href}
            href={guide.href}
            className="group rounded-xl border border-border bg-surface p-6 transition-colors hover:bg-surface-hover"
          >
            <h2 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
              {guide.title}
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              {guide.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

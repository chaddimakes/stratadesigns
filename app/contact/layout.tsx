export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Proper Polymer. Questions about STL files, fitment, or custom requests for Toyota Tacoma 3D printable accessories — we're here to help.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Proper Polymer",
    description:
      "Questions about STL files, fitment, or custom requests? Send us a message.",
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

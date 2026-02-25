import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { CartProvider } from "./context/cart-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.properpolymer.com"),
  title: {
    default: "Proper Polymer — Precision Engineered. Trail Tested.",
    template: "%s | Proper Polymer",
  },
  description:
    "Premium 3D printable STL files for Toyota Tacoma accessories. Precision engineered, FDM optimized, and trail tested on a real Tacoma TRD Off-Road.",
  keywords: [
    "3D print",
    "STL files",
    "Toyota Tacoma",
    "Tacoma accessories",
    "3D printed truck parts",
    "FDM",
    "overlanding",
    "off-road accessories",
  ],
  alternates: {
    canonical: "https://www.properpolymer.com",
  },
  openGraph: {
    siteName: "Proper Polymer",
    title: "Proper Polymer — Precision Engineered. Trail Tested.",
    description:
      "Premium 3D printable STL files for Toyota Tacoma accessories. Precision engineered, FDM optimized, and trail tested.",
    url: "https://www.properpolymer.com",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://www.properpolymer.com/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proper Polymer — Precision Engineered. Trail Tested.",
    description:
      "Premium 3D printable STL files for Toyota Tacoma accessories.",
    images: ["https://www.properpolymer.com/og-image.jpg"],
  },
  verification: {
    google: "1mov5pimO_l9BkNVhrq3Ry3ZNR7x8beOYGWExCdvLNI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

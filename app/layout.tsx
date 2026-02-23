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
  title: "Strata Design — Precision Engineered. Trail Tested.",
  description:
    "Premium STL files for Toyota Tacoma off-road accessories. 3D printable scale models, skid plates, roof racks, and more.",
  openGraph: {
    title: "Strata Design",
    description: "Premium 3D printable STL files for Toyota Tacoma accessories.",
    url: "https://stratadesigns.vercel.app",
    type: "website",
    images: [{ url: "https://stratadesigns.vercel.app/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://stratadesigns.vercel.app/og-image.jpg"],
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

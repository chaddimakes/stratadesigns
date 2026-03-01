import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/navbar";
import CartDrawer from "./components/cart-drawer";
import Footer from "./components/footer";
import { CartProvider } from "./context/cart-context";
import Analytics from "./components/analytics";

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
    "Proper Polymer — premium 3D printable STL files for Toyota Tacoma accessories. Precision engineered and trail tested for FDM printing.",
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
      "Proper Polymer — premium 3D printable STL files for Toyota Tacoma accessories. Precision engineered and trail tested for FDM printing.",
    url: "https://www.properpolymer.com",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://www.properpolymer.com/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proper Polymer — Precision Engineered. Trail Tested.",
    description:
      "Proper Polymer — premium 3D printable STL files for Toyota Tacoma accessories. Precision engineered and trail tested for FDM printing.",
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
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <Analytics />
          <Navbar />
          <CartDrawer />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#081F4D",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://roomscholars.com"),
  title: {
    default: "Room Scholars | Premium Student Accommodation in London",
    template: "%s | Room Scholars",
  },
  description:
    "Discover premium student accommodation in London. Verified properties, prime locations, fully furnished rooms with 24/7 support.",
  keywords: [
    "student accommodation",
    "London student housing",
    "premium student stays",
    "Room Scholars",
  ],
  authors: [{ name: "Room Scholars" }],
  creator: "Room Scholars",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://roomscholars.com",
    siteName: "Room Scholars",
    title: "Room Scholars | Premium Student Accommodation in London",
    description:
      "Discover premium student accommodation in London. Verified properties, prime locations, fully furnished rooms with 24/7 support.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Room Scholars",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Room Scholars | Premium Student Accommodation",
    description: "Discover premium student accommodation in London.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "Room Scholars",
              url: "https://roomscholars.com",
              description: "Premium student accommodation across the UK.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Scholar Street",
                addressLocality: "London",
                postalCode: "EC1A 1BB",
                addressCountry: "UK",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+44-1234-567890",
                contactType: "customer service",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-[#0B1F4D] antialiased">
        {children}
      </body>
    </html>
  );
}

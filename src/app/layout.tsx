import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Room Scholars | Premium Student Accommodation in London",
  description:
    "Discover premium student accommodation in London. Verified properties, prime locations, fully furnished rooms with 24/7 support.",
  keywords: [
    "student accommodation",
    "London student housing",
    "premium student stays",
    "Room Scholars",
  ],
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
        data-scroll-behavior="smooth"
      >
        <body
          className="min-h-screen bg-white text-[#0B1F4D] antialiased"
          suppressHydrationWarning
        >
          {children}
        </body>
      </html>
  );
}

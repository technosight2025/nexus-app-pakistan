import type { Metadata } from "next";
import { Poppins, Inter, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/app/components/ClientProviders";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NEXUS — The Modern Standard for Pakistani Events",
  description: "The serious international platform built for Pakistan's premium venues, managers, and hosts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} ${playfair.variable} ${montserrat.variable}`}>
      <body suppressHydrationWarning className="bg-[#FDF8F0] text-[#1A1A1A] antialiased selection:bg-[#0F5B3E] selection:text-white">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}

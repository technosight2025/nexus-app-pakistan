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
  title: "Nexus Heritage | Elite Event Planning Platform",
  description: "The premium digital invitation and management suite for high-net-worth Pakistani weddings, milestones, and elite operators.",
};

import NotificationManager from "@/components/NotificationManager";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} ${playfair.variable} ${montserrat.variable}`}>
      <head>
        {/* Importing a soft luxury Serif font from Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="antialiased selection:bg-[#D4AF37]/20 selection:text-[#D4AF37]">
        <NotificationManager />
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}

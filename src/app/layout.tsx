import type { Metadata } from "next";
import { Inter_Tight, Barlow_Condensed, DM_Sans } from "next/font/google";
import "./globals.css";

// Inter Tight = variant condensé d'Inter, métriques proches de Hisense Alfabet
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

// Barlow Condensed = titres condensés du quiz
const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-barlow",
  display: "swap",
});

// DM Sans = body du quiz
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hisense — Vivez la véritable Expérience Coupe du Monde",
  description:
    "Sponsor officiel FIFA World Cup 2026. Chez vous, à l'Atelier des Lumières et même au stade, vivez une expérience unique grâce à Hisense.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${interTight.variable} ${barlow.variable} ${dmSans.variable}`}
    >
      <body className="bg-cream antialiased">{children}</body>
    </html>
  );
}

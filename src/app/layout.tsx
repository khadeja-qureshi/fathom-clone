import type { Metadata } from "next";
import { Figtree, Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { AppHeader } from "@/components/AppHeader";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Throughline — decisions & follow-through from meetings",
  description:
    "Meeting workspace redesigned around decisions, action items, and evidence-backed search. Capture layer stubbed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${figtree.variable} ${fraunces.variable} ${plexMono.variable} antialiased`}
      >
        <div className="tl-shell">
          <div className="tl-noise" aria-hidden />
          <div className="tl-content">
            <AppHeader />
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}

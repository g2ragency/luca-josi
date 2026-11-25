import type { Metadata } from "next";
import localFont from "next/font/local";
import { EffettiScroll } from "@/components/EffettiScroll";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Loader } from "@/components/Loader";
import { PageTransition } from "@/components/PageTransition";
import { introSeenScript } from "@/lib/intro";
import "lenis/dist/lenis.css";
import "./globals.css";

// BDO Grotesk di Lokal Container, licenza SIL Open Font License 1.1 (testo nei metadati dei file).
// Ridotto ai caratteri latini e convertito in woff2 dai file originali.
const bdoGrotesk = localFont({
  src: [
    { path: "./fonts/BDOGrotesk-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/BDOGrotesk-DemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/BDOGrotesk-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-bdo-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Luca Josi", template: "%s — Luca Josi" },
  description: "Sito di Luca Josi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: introSeenScript può aggiungere data-intro-seen prima di React.
    <html lang="it" className={bdoGrotesk.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introSeenScript }} />
      </head>
      <body>
        {/* Senza JavaScript la schermata di caricamento non si chiuderebbe mai. */}
        <noscript>
          <style>{"[data-loader]{display:none}"}</style>
        </noscript>
        <Loader />
        <PageTransition>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <EffettiScroll />
        </PageTransition>
      </body>
    </html>
  );
}

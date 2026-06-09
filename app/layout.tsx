import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "900"],
  variable: "--font-playfair",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Braincheck | Your Mind Matters",
  description: "Answer 12 questions to see where your mind is today. Get your results in a simple report sent to your email in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body className="bg-bg-base text-text-primary antialiased min-h-screen relative selection:bg-amber/30 selection:text-text-primary font-sans" suppressHydrationWarning>
        {/* Global Noise Overlay */}
        <div className="noise-overlay" />
        
        {/* Main Content */}
        {children}
      </body>
    </html>
  );
}

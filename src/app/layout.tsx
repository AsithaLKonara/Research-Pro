import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Research Pro — AI-Powered Product Intelligence Platform",
  description:
    "Research and compare the world's top products with AI-powered multi-source intelligence. Get evidence-backed rankings, market insights, and export-ready reports.",
  keywords: [
    "product research",
    "product comparison",
    "market intelligence",
    "AI research",
    "product ranking",
  ],
  authors: [{ name: "Research Pro" }],
  openGraph: {
    title: "Research Pro — AI-Powered Product Intelligence",
    description:
      "Evidence-backed product research and comparison powered by Gemini and Groq.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}

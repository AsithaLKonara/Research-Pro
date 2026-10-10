import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}

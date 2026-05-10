import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const instrumentSerif = Fraunces({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const satoshi = localFont({
  variable: "--font-dm-sans",
  src: [
    { path: "./fonts/Satoshi-Light.woff2",   weight: "300", style: "normal" },
    { path: "./fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-Medium.woff2",  weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-Bold.woff2",    weight: "700", style: "normal" },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yaven | Run Your Agent Team",
  description:
    "A workspace where agents are first-class members of your team. A manager-agent watches every session and surfaces only what needs your decision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${satoshi.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

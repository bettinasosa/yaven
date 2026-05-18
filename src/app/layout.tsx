import type { Metadata, Viewport } from "next"
import { Fraunces } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { PageLoader } from "@/components/page-loader"
import "./globals.css"

const instrumentSerif = Fraunces({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"]
})

const satoshi = localFont({
  variable: "--font-dm-sans",
  src: [
    { path: "./fonts/Satoshi-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" }
  ],
  display: "swap"
})

export const viewport: Viewport = {
  viewportFit: "cover"
}

export const metadata: Metadata = {
  metadataBase: new URL("https://www.yaven.us"),
  title: "Yaven | Focus on the tasks only you can do.",
  description:
    "The boring half of your day, handled. Yaven automates the admin, drafts the emails, and keeps you in the loop, so you can focus on the work only you can do.",
  openGraph: {
    images: ["/yaven-og.png"]
  },
  twitter: {
    card: "summary_large_image",
    images: ["/yaven-og.png"]
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${satoshi.variable} h-full antialiased scroll-smooth`}
      style={{ background: "linear-gradient(to right, #2053A5, #036CB0)" }}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ background: "linear-gradient(to right, #2053A5, #036CB0)" }}
      >
        <PageLoader />
        {children}
        <Analytics />
      </body>
    </html>
  )
}

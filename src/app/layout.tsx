import type { Metadata, Viewport } from "next"
import { Rubik, Space_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LoaderDevPanel } from "@/components/loader-dev-panel"
import { SmoothScroll } from "@/components/smooth-scroll"
import "./globals.css"

const rubik = Rubik({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
})

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
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
      className={`${rubik.variable} ${spaceMono.variable} h-full antialiased scroll-smooth`}
      style={{ background: "#267FE5" }}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ background: "transparent" }}
      >
        <LoaderDevPanel />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}

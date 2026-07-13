import type { Metadata, Viewport } from "next"
import { Space_Mono, Bricolage_Grotesque } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { SmoothScroll } from "@/components/smooth-scroll"
import { GradientBackdrop } from "@/components/effects/gradient-backdrop"
import { UtmCapture } from "@/components/utm-capture"
import "./globals.css"

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap"
})

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
})

const satoshi = localFont({
  variable: "--font-satoshi",
  display: "swap",
  src: [
    { path: "../../public/fonts/satoshi/Satoshi-Light.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/satoshi/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/satoshi/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/satoshi/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ]
})

export const viewport: Viewport = {
  viewportFit: "cover"
}

export const metadata: Metadata = {
  metadataBase: new URL("https://www.yaven.ai"),
  title: "Yaven | Less admin. More flow.",
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
      className={`${spaceMono.variable} ${bricolage.variable} ${satoshi.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        <GradientBackdrop />
        <div className="relative z-[1] flex flex-1 flex-col">
          <SmoothScroll>{children}</SmoothScroll>
        </div>
        <UtmCapture />
        <Analytics />
      </body>
    </html>
  )
}

import type { Metadata } from "next"
import { HomeShell } from "@/components/home-shell"

// Hidden from search on purpose. This is the same page as / with different
// words, so letting both compete is the textbook duplicate-content mistake —
// and these links are pasted into DMs and Slack, not found by searching.
export const metadata: Metadata = {
  title: "Yaven | Four clients. One inbox.",
  description:
    "The menu bar assistant for fractional CMOs. Keeps every client's threads, promises and scope straight, and drafts the replies in your voice.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Four clients. One inbox.",
    description:
      "Yaven keeps every client's context straight, and tells you which one actually needs you now."
  }
}

export default function FractionalCmoPage() {
  return <HomeShell variant="fractionalCmo" />
}

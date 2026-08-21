import type { Metadata } from "next"
import { HomeShell } from "@/components/home-shell"

// Hidden from search: same page as / with different words, and these links are
// pasted into DMs rather than found by searching. See /fractional-cmo.
export const metadata: Metadata = {
  title: "Yaven | Forty creators. One deadline.",
  description:
    "The menu bar assistant for influencer marketing agencies. Tracks who owes what to whom across every live campaign, and drafts the chase in your voice.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Forty creators. One deadline.",
    description:
      "Yaven tracks every deliverable and every promise, so nobody goes quiet unnoticed."
  }
}

export default function InfluencerMarketingPage() {
  return <HomeShell variant="influencerMarketing" />
}

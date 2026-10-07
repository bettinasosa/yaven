import type { Metadata } from "next"
import { HomeShell } from "@/components/home-shell"

// Hidden from search on purpose. This is the same page as / with different
// words, so letting both compete is the textbook duplicate-content mistake —
// and these links are pasted into DMs and Slack, not found by searching.
export const metadata: Metadata = {
  title: "Yaven | Every account. Straight.",
  description:
    "The menu bar assistant for marketing agencies. Keeps every account's deadlines, approvals and promises straight, and drafts the replies in your voice.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Every account. Straight.",
    description:
      "Yaven keeps every account's context straight, and tells you which one actually needs you now."
  }
}

export default function MarketingAgencyPage() {
  return <HomeShell variant="marketingAgency" />
}

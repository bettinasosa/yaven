import type { Metadata } from "next"
import { HomeShell } from "@/components/home-shell"

// Hidden from search on purpose. This is the same page as / with different
// words, so letting both compete is the textbook duplicate-content mistake —
// and these links are pasted into DMs and Slack, not found by searching.
export const metadata: Metadata = {
  title: "Yaven | Every enquiry. Answered.",
  description:
    "The menu bar assistant for coaches. Keeps every enquiry, client and follow-up in one place, and drafts the replies in your voice.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Every enquiry. Answered.",
    description:
      "Yaven tells you who is closest to signing, and drafts the follow-up before they go cold."
  }
}

export default function CoachesPage() {
  return <HomeShell variant="coaches" />
}

import type { Metadata } from "next"
import { HomeShell } from "@/components/home-shell"

// Hidden from search on purpose. This is the same page as / with different
// words, so letting both compete is the textbook duplicate-content mistake —
// and these links are pasted into DMs and Slack, not found by searching.
export const metadata: Metadata = {
  title: "Yaven | Outreach. Not slop.",
  description:
    "The outreach assistant that finds the leads and drafts every message in your voice, then sends nothing until you say so. No bots, no automation, no bans.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Outreach. Not slop.",
    description:
      "Finds the leads, drafts every message in your voice, and sends nothing until you approve it."
  }
}

export default function OutreachPage() {
  return <HomeShell variant="outreach" />
}

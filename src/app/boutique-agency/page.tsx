import type { Metadata } from "next"
import { HomeShell } from "@/components/home-shell"

// Hidden from search: same page as / with different words, and these links are
// pasted into DMs rather than found by searching. See /fractional-cmo.
export const metadata: Metadata = {
  title: "Yaven | Run the work. Win the next.",
  description:
    "The menu bar assistant for agency founders. Stops new business getting buried under delivery, and drafts the replies in your voice.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Run the work. Win the next.",
    description:
      "Yaven keeps the enquiry worth answering above the eleventh Slack thread about a font."
  }
}

export default function BoutiqueAgencyPage() {
  return <HomeShell variant="boutiqueAgency" />
}

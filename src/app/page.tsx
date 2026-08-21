import type { Metadata } from "next"
import { HomeShell } from "@/components/home-shell"

// A Server Component purely so this route can export metadata — the page itself
// is a client component and client components cannot. Title and description are
// inherited from the root layout unchanged; the canonical is new, and matters
// now that audience-specific copies of this page exist at their own URLs.
export const metadata: Metadata = {
  alternates: { canonical: "/" }
}

export default function Home() {
  return <HomeShell />
}

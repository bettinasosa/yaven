import type { Metadata } from "next"
import { CrowdPage } from "./studio/crowd-page"
import { crowdHero } from "./studio/_shared/crowd-copy"

export const metadata: Metadata = {
  title: `yaven | ${crowdHero.headline.replace(/\.$/, "")}`,
  description: crowdHero.body,
  alternates: { canonical: "/" },
}

export default function HomePage() {
  return <CrowdPage />
}

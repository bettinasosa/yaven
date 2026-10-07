import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CrowdPage } from "../../crowd-page"
import { crowdHero } from "../../_shared/crowd-copy"

export const dynamicParams = false

export function generateStaticParams() {
  return [{ treatment: "crowd" }]
}

export async function generateMetadata({ params }: { params: Promise<{ treatment: string }> }): Promise<Metadata> {
  const { treatment } = await params
  if (treatment !== "crowd") notFound()
  return {
    title: "yaven | Crowd",
    description: crowdHero.body,
    robots: { index: false, follow: false },
  }
}

export default async function Page({ params }: { params: Promise<{ treatment: string }> }) {
  const { treatment } = await params
  if (treatment !== "crowd") notFound()
  return <CrowdPage />
}

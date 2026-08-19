"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ensureAttribution } from "@/lib/analytics/context"
import { track } from "@/lib/analytics/posthog"
import { EVENTS } from "@/lib/analytics/events"

export default function ReferralPage() {
  const router = useRouter()
  const params = useParams<{ code: string }>()

  useEffect(() => {
    if (params.code) {
      try {
        localStorage.setItem("yv_ref", params.code)
      } catch { /* localStorage unavailable */ }
    }
    // This page's effect runs before the layout's, so attribution has to be
    // registered here or the landing event goes out with no campaign on it.
    ensureAttribution()
    // Before the redirect, otherwise referral traffic is indistinguishable from
    // someone typing yaven.ai. The code itself is never sent — only that one
    // was present. This is a client-side navigation, so the queued event
    // survives it.
    track(EVENTS.REFERRAL_LANDING, { has_code: !!params.code })
    router.replace("/")
  }, [params.code, router])

  return null
}

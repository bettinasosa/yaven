"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { ensureAttribution, hasReferral } from "@/lib/analytics/context"
import { normalizeUrl, track } from "@/lib/analytics/posthog"
import { EVENTS } from "@/lib/analytics/events"

/**
 * Sends `web_page_viewed` on first load and on every client-side route change.
 *
 * PostHog's own `$pageview` is switched off: this one carries first-touch
 * attribution, and keeps every website event under the `web_` prefix in a
 * project shared with the macOS app.
 */
export function WebAnalytics() {
  const pathname = usePathname()
  const lastPath = useRef<string | null>(null)

  useEffect(() => {
    if (pathname === null || pathname === lastPath.current) return
    lastPath.current = pathname

    ensureAttribution()

    track(EVENTS.PAGE_VIEWED, {
      path: normalizeUrl(pathname),
      is_referral_landing: pathname.startsWith("/w/"),
      has_referral: hasReferral()
    })
  }, [pathname])

  return null
}

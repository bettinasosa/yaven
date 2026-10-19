"use client"

import { useEffect, useRef } from "react"
import { hasReferral } from "@/lib/analytics/context"
import { EVENTS } from "@/lib/analytics/events"
import { track } from "@/lib/analytics/posthog"

/**
 * The signup funnel events for the landing's forms, with the same names and
 * properties the blueprint panel sends, so the Website dashboard keeps reading
 * one funnel. The redesign shipped forms that posted to /api/waitlist without
 * any of these, and every signup after 7 October was invisible in PostHog.
 */
export function useSignupTracking(surface: string) {
  const started = useRef(false)

  useEffect(() => {
    track(EVENTS.SIGNUP_FORM_SEEN, { surface })
  }, [surface])

  return {
    emailFocused() {
      if (started.current) return
      started.current = true
      track(EVENTS.SIGNUP_STARTED, { surface })
    },
    submitted() {
      track(EVENTS.SIGNUP_SUBMITTED, { surface, beta_application: false, has_referral: hasReferral() })
    },
    succeeded(alreadyRegistered: boolean) {
      track(EVENTS.SIGNUP_SUCCEEDED, {
        surface,
        already_registered: alreadyRegistered,
        beta_application: false,
        has_referral: hasReferral(),
      })
      try { localStorage.removeItem("yv_ref") } catch { /* localStorage unavailable */ }
    },
    failed(reason: "server" | "rejected" | "network") {
      track(EVENTS.SIGNUP_FAILED, { surface, reason, beta_application: false })
    },
  }
}

/** The referral code a /w/[code] landing stored, so the signup credits whoever sent it. */
export function storedReferral(): string | undefined {
  try {
    return localStorage.getItem("yv_ref") ?? undefined
  } catch {
    return undefined
  }
}

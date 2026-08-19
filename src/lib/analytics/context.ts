import { captureUtmParams, getAttribution } from "@/lib/attribution"
import { normalizeUrl, register } from "./posthog"

/** True if a referral code from /w/[code] is waiting in storage. Never returns the code. */
export function hasReferral(): boolean {
  if (typeof window === "undefined") return false
  try {
    return !!localStorage.getItem("yv_ref")
  } catch {
    return false
  }
}

function domainOf(url: string | undefined): string | undefined {
  if (!url) return undefined
  try {
    return new URL(url).hostname
  } catch {
    return undefined
  }
}

/**
 * First-touch attribution, sourced from the same `src/lib/attribution.ts` that
 * already feeds the Supabase utm_* columns — so a PostHog number and a Supabase
 * number are answering the same question.
 *
 * These get registered as super properties, which means every event carries
 * them, not just the page view. That is what makes "conversion by utm_source"
 * a single group-by instead of a join from a signup back to whichever page view
 * started the session. It also overrides PostHog's own campaign capture, which
 * reads the *current* URL and so reports nothing once the visitor navigates.
 *
 * Only the referrer's domain is sent, not the full referring URL, and the
 * landing page is normalized so a /w/[code] landing never carries the code.
 */
export function firstTouchProps() {
  const { landing_page, referrer, ...utm } = getAttribution()
  return {
    ...utm,
    landing_page: landing_page ? normalizeUrl(landing_page) : undefined,
    referrer_domain: domainOf(referrer)
  }
}

let registered = false

/**
 * Capture first-touch attribution and attach it to every event from here on.
 *
 * Idempotent, and called by anything that fires an event before <WebAnalytics />
 * gets its effect — a page's own effects run before the layout's, so the
 * referral landing event would otherwise go out with no campaign on it.
 */
export function ensureAttribution() {
  if (registered) return
  registered = true
  captureUtmParams()
  register(firstTouchProps())
}

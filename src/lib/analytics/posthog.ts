import posthog from "posthog-js"
import type { CaptureResult } from "posthog-js"
import type { EventName } from "./events"

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com"

let ready = false

/**
 * Rewrite `/w/<code>` to `/w/[code]` anywhere in a URL or path.
 *
 * The referral landing page puts the code in the URL, and PostHog captures
 * `$current_url` on every event by itself. Without this, every event fired on
 * that page would carry the referral code as a property.
 */
export function normalizeUrl(value: string): string {
  return value.replace(/\/w\/[^/?#]+/g, "/w/[code]")
}

const EMAIL = /[^\s@]+@[^\s@]+\.[^\s@]+/

/**
 * Last line of defence before anything leaves the browser: strip referral codes
 * out of URLs, and drop any property that looks like an email address. Nothing
 * here should ever have to fire — it is here so that a future careless
 * `track(..., { email })` fails closed rather than silently shipping PII.
 */
function beforeSend(event: CaptureResult | null): CaptureResult | null {
  if (!event?.properties) return event
  for (const [key, value] of Object.entries(event.properties)) {
    if (typeof value !== "string") continue
    if (EMAIL.test(value)) {
      delete event.properties[key]
      continue
    }
    if (value.includes("/w/")) {
      event.properties[key] = normalizeUrl(value)
    }
  }
  return event
}

/**
 * Start PostHog. Called from instrumentation-client.ts, before hydration.
 *
 * Private by default: no autocapture (which would record the text of every
 * button a visitor clicks), no session recording, no heatmaps, no surveys, no
 * cookies — a single localStorage entry holds the anonymous device id. Person
 * profiles are only created for identified users, and we never identify anyone,
 * so every visitor stays anonymous. Do Not Track and Global Privacy Control are
 * honoured. Page views are sent by hand from <WebAnalytics /> so they can carry
 * attribution and so no unprefixed `$pageview` events land in the shared project.
 */
export function initAnalytics() {
  if (ready || typeof window === "undefined" || !KEY) return
  posthog.init(KEY, {
    api_host: HOST,
    ui_host: "https://us.posthog.com",
    defaults: "2026-01-30",
    // Tags localhost and Vercel preview traffic with `$internal_or_test_user`,
    // so dashboard tiles can exclude our own clicking-about from real numbers.
    internal_or_test_user_hostname: /^(localhost|127\.0\.0\.1|.*\.vercel\.app)$/,
    person_profiles: "identified_only",
    persistence: "localStorage",
    respect_dnt: true,
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: false,
    capture_performance: false,
    capture_heatmaps: false,
    capture_dead_clicks: false,
    capture_exceptions: false,
    disable_session_recording: true,
    disable_surveys: true,
    before_send: beforeSend
  })
  ready = true
}

/**
 * Attach properties to every subsequent event. Used for first-touch attribution,
 * so a signup carries the campaign that brought the visitor in rather than
 * whatever the URL happened to say at the moment they converted.
 */
export function register(properties: Record<string, unknown>) {
  if (!ready) return
  try {
    posthog.register(properties)
  } catch {
    /* analytics must never break the page */
  }
}

/** Send an event. Silently does nothing when PostHog is not configured. */
export function track(event: EventName, properties?: Record<string, unknown>) {
  if (!ready) return
  try {
    posthog.capture(event, properties)
  } catch {
    /* analytics must never break the page */
  }
}

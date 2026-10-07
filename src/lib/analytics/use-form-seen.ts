"use client"

import { useEffect } from "react"
import type { RefObject } from "react"
import { track } from "./posthog"
import { EVENTS } from "./events"
import type { Surface, Placement } from "./events"

/**
 * Fires `web_signup_form_seen` the first time the referenced element is at least
 * half visible — "the user actually had this form on screen", which is what
 * separates a form nobody saw from one they saw and ignored.
 *
 * Takes an existing ref rather than making one, so it can sit alongside whatever
 * else the form already needs that element for.
 *
 * Forms that are revealed rather than scrolled to (the panel's modal) don't use
 * this — they fire the event at the reveal instead.
 */
export function useFormSeen(
  ref: RefObject<HTMLElement | null>,
  surface: Surface,
  placement?: Placement
) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let sent = false
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting || sent) continue
          sent = true
          track(EVENTS.SIGNUP_FORM_SEEN, { surface, placement })
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, surface, placement])
}

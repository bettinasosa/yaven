"use client"

import { useSyncExternalStore } from "react"

const QUERY = "(max-width: 768px)"

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY)
  mql.addEventListener("change", callback)
  return () => mql.removeEventListener("change", callback)
}

/** SSR-safe mobile flag (false on the server, true at <= 768px). */
export function useIsMobile() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false
  )
}

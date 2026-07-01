const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const

const STORAGE_KEY = "yv_utm"

export type UtmParams = Partial<Record<(typeof UTM_KEYS)[number], string>>

/** Capture UTM params from the current URL into localStorage (first-touch wins). */
export function captureUtmParams() {
  if (typeof window === "undefined") return
  try {
    // Don't overwrite existing attribution (first-touch)
    if (localStorage.getItem(STORAGE_KEY)) return

    const params = new URLSearchParams(window.location.search)
    const utm: UtmParams = {}
    let hasAny = false
    for (const key of UTM_KEYS) {
      const val = params.get(key)
      if (val) {
        utm[key] = val
        hasAny = true
      }
    }
    if (hasAny) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(utm))
    }
  } catch {
    /* localStorage unavailable */
  }
}

/** Read stored UTM params (returns empty object if none). */
export function getUtmParams(): UtmParams {
  if (typeof window === "undefined") return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

/** Build the landing page URL (without query string) for attribution. */
export function getLandingPage(): string | undefined {
  if (typeof window === "undefined") return undefined
  try {
    const stored = sessionStorage.getItem("yv_landing")
    if (stored) return stored
    const page = window.location.pathname
    sessionStorage.setItem("yv_landing", page)
    return page
  } catch {
    return undefined
  }
}

/** Get document.referrer if it's from an external domain. */
export function getExternalReferrer(): string | undefined {
  if (typeof window === "undefined") return undefined
  try {
    const ref = document.referrer
    if (!ref) return undefined
    const refHost = new URL(ref).hostname
    if (refHost === window.location.hostname) return undefined
    return ref
  } catch {
    return undefined
  }
}

/** Collect all attribution data for a signup submission. */
export function getAttribution() {
  return {
    ...getUtmParams(),
    landing_page: getLandingPage(),
    referrer: getExternalReferrer(),
  }
}

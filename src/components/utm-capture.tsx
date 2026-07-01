"use client"

import { useEffect } from "react"
import { captureUtmParams, getLandingPage, getExternalReferrer } from "@/lib/attribution"

/** Runs once on mount to persist UTM params, landing page, and referrer. */
export function UtmCapture() {
  useEffect(() => {
    captureUtmParams()
    getLandingPage()
    getExternalReferrer()
  }, [])
  return null
}

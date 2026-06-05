"use client"

import { useEffect } from "react"

export function HeroBlobs() {
  useEffect(() => {
    document.documentElement.style.setProperty("--grain-opacity", "0.04")
    document.documentElement.setAttribute("data-blob-variant", "blue")
    document.documentElement.style.setProperty("--pill-bg",     "rgba(209,228,242,0.38)")
    document.documentElement.style.setProperty("--pill-border", "1.5px solid rgba(255,255,255,0.70)")
    document.documentElement.style.setProperty("--pill-shadow",
      "inset 0 2px 0 rgba(255,255,255,0.80), inset 0 -1px 0 rgba(255,255,255,0.15), inset 1px 0 0 rgba(255,255,255,0.25), inset -1px 0 0 rgba(255,255,255,0.25), 0 6px 28px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.10)")
    document.documentElement.style.setProperty("--pill-color",  "#E3D5BB")
    document.documentElement.style.setProperty("--pill-filter", "blur(18px) saturate(180%)")
  }, [])

  return (
    <div
      className="blob-layer absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}

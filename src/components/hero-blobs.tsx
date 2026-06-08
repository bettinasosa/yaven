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
    >
      {/* Main blob — cream/blue/orange/gold */}
      <div
        className="yv-orb-drift-1"
        style={{
          position: "absolute",
          top: "5%",
          left: "-8%",
          width: "65%",
          height: "70%",
          borderRadius: "42% 58% 64% 36% / 38% 52% 48% 62%"
        }}
      >
        <div className="hero-blob-glass-main" style={{ width: "100%", height: "100%", borderRadius: "inherit" }} />
      </div>

      {/* Accent blob — cream/red/blue/orange */}
      <div
        className="yv-orb-drift-2"
        style={{
          position: "absolute",
          bottom: "0%",
          right: "-10%",
          width: "60%",
          height: "65%",
          borderRadius: "58% 42% 36% 64% / 52% 38% 62% 48%"
        }}
      >
        <div className="hero-blob-glass-accent" style={{ width: "100%", height: "100%", borderRadius: "inherit" }} />
      </div>

      {/* Third blob — lighter blend */}
      <div
        className="yv-orb-drift-3"
        style={{
          position: "absolute",
          top: "-8%",
          left: "25%",
          width: "50%",
          height: "55%",
          borderRadius: "64% 36% 48% 52% / 42% 58% 36% 64%"
        }}
      >
        <div className="hero-blob-glass-main" style={{ width: "100%", height: "100%", borderRadius: "inherit", opacity: 0.6 }} />
      </div>
    </div>
  )
}

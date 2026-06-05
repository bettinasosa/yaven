"use client"

// Fixed butter base — sections with opaque backgrounds scroll over this.
// Blobs themselves live in hero-section and scroll naturally with the page.
export function BlobBackground() {
  return (
    <div
      aria-hidden="true"
      className="hero-grain"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background: "var(--hero-bg-color, var(--primary))",
        transition: "background 0.5s ease",
      }}
    />
  )
}

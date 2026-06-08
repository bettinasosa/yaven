"use client"

import { useEffect, useState } from "react"

const STORAGE_KEY = "dev-heading-font"
const STYLE_ID = "dev-heading-font-override"

const FONTS = [
  { id: "boxing", label: "Boxing", stack: "'Boxing'", weight: "400" },
  {
    id: "clash-display",
    label: "Clash Display",
    stack: "'Clash Display'",
    weight: "600"
  },
  { id: "outfit", label: "Outfit", stack: "'Outfit'", weight: "600" },
  {
    id: "bricolage",
    label: "Bricolage Grotesque",
    stack: "'Bricolage Grotesque'",
    weight: "600"
  },
  {
    id: "familjen",
    label: "Familjen Grotesk",
    stack: "'Familjen Grotesk'",
    weight: "600"
  },
  { id: "urbanist", label: "Urbanist", stack: "'Urbanist'", weight: "600" },
  { id: "vend-sans", label: "Vend Sans", stack: "'Vend Sans'", weight: "600" }
]

let googleFontsLoaded = false
function ensureGoogleFonts() {
  if (googleFontsLoaded || typeof document === "undefined") return
  googleFontsLoaded = true
  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href =
    "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700&family=DM+Serif+Display&family=Familjen+Grotesk:wght@500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,700&family=Outfit:wght@500;600;700&family=Urbanist:wght@500;600;700&family=Vend+Sans:wght@500;600;700&display=swap"
  document.head.appendChild(link)
}

function applyFont(font: (typeof FONTS)[number]) {
  const family = `${font.stack}, sans-serif`

  // Get or create the override style — appended to <body> so it loads AFTER
  // all <head> stylesheets (including Tailwind's @theme)
  let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null
  if (!style) {
    style = document.createElement("style")
    style.id = STYLE_ID
    document.body.appendChild(style)
  }

  // Target: anything using the font-instrument-serif variable via inline style,
  // plus the data-heading-font attribute on hero wordmarks.
  // The [style*=] selector matches elements where React wrote
  // style="font-family: var(--font-instrument-serif)..."
  style.textContent = `
    [data-heading-font],
    [style*="font-instrument-serif"] {
      font-family: ${family} !important;
      font-weight: ${font.weight} !important;
    }
  `
}

export function HeadingFontDevPanel() {
  const [index, setIndex] = useState(0)

  const font = FONTS[index]

  useEffect(() => {
    ensureGoogleFonts()
    const saved = FONTS.findIndex(
      f => f.id === localStorage.getItem(STORAGE_KEY)
    )
    if (saved > 0) setIndex(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, font.id)
    applyFont(font)
  }, [font])

  return (
    <div
      style={{
        position: "fixed",
        bottom: 52,
        left: 16,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: "4px 8px",
        borderRadius: 9999,
        border: "1px solid rgba(255,255,255,0.3)",
        background: "#267FE5",
        color: "#fff",
        fontSize: 12,
        fontFamily: "monospace",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
      }}
    >
      <span style={{ fontSize: 9, opacity: 0.7, marginRight: 2 }}>H</span>
      <button
        onClick={() => setIndex((index + FONTS.length - 1) % FONTS.length)}
        style={{ cursor: "pointer", padding: "2px 6px", color: "inherit" }}
        aria-label="Previous heading font"
      >
        ‹
      </button>
      <span style={{ minWidth: 130, textAlign: "center" }}>{font.label}</span>
      <button
        onClick={() => setIndex((index + 1) % FONTS.length)}
        style={{ cursor: "pointer", padding: "2px 6px", color: "inherit" }}
        aria-label="Next heading font"
      >
        ›
      </button>
    </div>
  )
}

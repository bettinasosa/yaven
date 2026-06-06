"use client"

import { useEffect, useState } from "react"

const STORAGE_KEY = "dev-body-font"

const FONTS = [
  { id: "satoshi", label: "Satoshi", stack: "'Satoshi', sans-serif" },
  {
    id: "general-sans",
    label: "General Sans",
    stack: "'General Sans', sans-serif"
  },
  { id: "switzer", label: "Switzer", stack: "'Switzer', sans-serif" },
  { id: "supreme", label: "Supreme", stack: "'Supreme', sans-serif" },
  { id: "author", label: "Author", stack: "'Author', sans-serif" },
  {
    id: "cabinet-grotesk",
    label: "Cabinet Grotesk",
    stack: "'Cabinet Grotesk', sans-serif"
  }
]

export function FontDevPanel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const saved = FONTS.findIndex((f) => f.id === localStorage.getItem(STORAGE_KEY))
    if (saved <= 0) return
    const id = setTimeout(() => setIndex(saved), 0)
    return () => clearTimeout(id)
  }, [])

  useEffect(() => {
    const font = FONTS[index]
    document.documentElement.style.setProperty("--font-dm-sans", font.stack)
    localStorage.setItem(STORAGE_KEY, font.id)
  }, [index])

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        left: 16,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: "4px 8px",
        borderRadius: 9999,
        border: "1px solid rgba(0,0,0,0.2)",
        background: "#fff",
        color: "#07348B",
        fontSize: 12,
        fontFamily: "monospace",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
      }}
    >
      <button
        onClick={() => setIndex((index + FONTS.length - 1) % FONTS.length)}
        style={{ cursor: "pointer", padding: "2px 6px" }}
        aria-label="Previous font"
      >
        ‹
      </button>
      <span style={{ minWidth: 110, textAlign: "center" }}>
        {FONTS[index].label}
      </span>
      <button
        onClick={() => setIndex((index + 1) % FONTS.length)}
        style={{ cursor: "pointer", padding: "2px 6px" }}
        aria-label="Next font"
      >
        ›
      </button>
    </div>
  )
}

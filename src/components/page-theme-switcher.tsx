"use client"

import { useEffect, useState } from "react"

const THEMES = [
  {
    key: "butter-orange",
    label: "A",
    name: "Butter → Orange",
    heroBg: "#FBE38A",
    ctaBg: "#FF5C2A",
    footerBg: "#1A1A1A",
    cardShadow: "7px 7px 0 #1A1A1A",
    btnBg: "#FF5C2A",
  },
  {
    key: "orange-butter",
    label: "B",
    name: "Orange → Butter",
    heroBg: "#FF5C2A",
    ctaBg: "#FBE38A",
    footerBg: "#1A1A1A",
    cardShadow: "7px 7px 0 #1A1A1A",
    btnBg: "#FBE38A",
  },
  {
    key: "ecru-orange",
    label: "C",
    name: "Ecru → Orange",
    heroBg: "#F0E6D0",
    ctaBg: "#FF5C2A",
    footerBg: "#3D1500",
    cardShadow: "7px 7px 0 #3D1500",
    btnBg: "#FF5C2A",
  },
]

export function PageThemeSwitcher() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = THEMES[active]
    const root = document.documentElement
    root.style.setProperty("--page-hero-bg", t.heroBg)
    root.style.setProperty("--page-cta-bg", t.ctaBg)
    root.style.setProperty("--page-footer-bg", t.footerBg)
    root.style.setProperty("--page-card-shadow", t.cardShadow)
    root.style.setProperty("--page-btn-bg", t.btnBg)
    root.style.setProperty("--page-font-heading", "var(--font-dm-sans), sans-serif")
  }, [active])

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 100,
        background: "#fff",
        border: "var(--bd)",
        borderRadius: "20px",
        boxShadow: "4px 4px 0 var(--ink)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "8px 10px 8px 14px",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-space-mono)",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          color: "var(--ink)",
          opacity: 0.4,
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        Theme
      </span>
      <div style={{ display: "flex", gap: "6px" }}>
        {THEMES.map((t, i) => (
          <button
            key={t.key}
            onClick={() => setActive(i)}
            title={t.name}
            style={{
              width: "30px",
              height: "42px",
              border:
                active === i
                  ? "3px solid var(--ink)"
                  : "2px solid rgba(26,26,26,0.15)",
              borderRadius: "8px",
              boxShadow: active === i ? "2px 2px 0 var(--ink)" : "none",
              cursor: "pointer",
              overflow: "hidden",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              transition: "all 0.1s ease",
            }}
          >
            <div style={{ flex: 2.5, background: t.heroBg }} />
            <div style={{ flex: 1.5, background: t.ctaBg }} />
            <div style={{ flex: 1, background: t.footerBg }} />
          </button>
        ))}
      </div>
    </div>
  )
}

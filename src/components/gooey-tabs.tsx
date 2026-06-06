"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

const TABS = [
  {
    title: "Sales",
    items: [
      "100 qualified leads researched and added to CRM by EOD",
      "Personal opening message drafted for each contact",
      "LinkedIn profiles found, enriched, and deduplicated",
      "Follow-up sequences scheduled in your voice",
    ],
  },
  {
    title: "Meetings",
    items: [
      "Last 3 months of email thread read and digested",
      "LinkedIn activity and recent news pulled",
      "CRM open items and notes surfaced automatically",
      "One-page brief with talking points ready before you dial in",
    ],
  },
  {
    title: "Research",
    items: [
      "Earnings calls and regulatory filings scanned",
      "News filtered by relevance to your brief",
      "Exec summary structured and formatted in minutes",
      "Key risks and opportunities flagged at the top",
    ],
  },
  {
    title: "Comms",
    items: [
      "Context-aware email drafts that match your voice",
      "Calendar scheduling, rescheduling, prep reminders",
      "Networking follow-ups personalised per contact",
      "Slack threads summarised and actioned",
    ],
  },
]

const SANS = "var(--font-dm-sans), sans-serif"
const MONO = "var(--font-space-mono), monospace"
const INK  = "#0a0e1a"

export function GooeyTabs() {
  const [active, setActive] = useState(0)
  const contentRef = useRef<HTMLUListElement>(null)

  // Animate content in when tab changes
  useEffect(() => {
    if (!contentRef.current) return
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" }
    )
  }, [active])

  return (
    <div style={{ width: "100%", maxWidth: "680px" }}>

      {/* Gooey SVG filter */}
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
        <defs>
          <filter id="yaven-gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur" type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Tab bar */}
      <div style={{ position: "relative", height: "52px" }}>

        {/* Shape layer — gooey filter applied here, NO text */}
        <div style={{
          position: "absolute", inset: 0,
          filter: "url(#yaven-gooey)",
          pointerEvents: "none",
        }}>
          <div style={{ position: "absolute", inset: 0, display: "flex" }}>
            {TABS.map((_, i) => (
              <div key={i} style={{ flex: 1, height: "100%", position: "relative" }}>
                {active === i && (
                  <div style={{
                    position: "absolute", inset: 0,
                    background: INK,
                    borderRadius: "10px 10px 0 0",
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Text overlay — outside filter so labels stay sharp */}
        <div style={{ position: "absolute", inset: 0, display: "flex" }}>
          {TABS.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                flex: 1,
                height: "100%",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontFamily: MONO,
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                color: active === i ? "#fff" : "rgba(10,14,26,0.38)",
                transition: "color 0.2s ease",
              }}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content panel */}
      <div style={{
        background: INK,
        borderRadius: "0 0 16px 16px",
        padding: "clamp(24px, 3vw, 36px) clamp(20px, 3vw, 36px)",
        overflow: "hidden",
      }}>
        <ul ref={contentRef} style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {TABS[active].items.map((item, i) => (
            <li key={i} style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "14px",
              padding: "clamp(12px, 1.4vw, 16px) 0",
              borderBottom: i < TABS[active].items.length - 1
                ? "1px solid rgba(255,255,255,0.07)"
                : "none",
            }}>
              {/* Bullet */}
              <span style={{
                flexShrink: 0,
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#267FE5",
                marginTop: "8px",
              }} />
              <span style={{
                fontFamily: SANS,
                fontSize: "clamp(14px, 1.4vw, 16px)",
                fontWeight: 400,
                lineHeight: 1.55,
                color: "rgba(255,255,255,0.80)",
              }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

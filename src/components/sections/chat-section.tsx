"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// 4 cards × ~240px scroll each
const PIN_AMOUNT = 960

// Match ProductPreviewSection tokens
const T1 = "rgba(255,255,255,0.92)"
const T2 = "rgba(255,255,255,0.45)"
const DIV = "rgba(255,255,255,0.08)"

const USE_CASES = [
  {
    tag: "Networking",
    trigger: "You just got back from a conference. You met 20 people.",
    steps: [
      "Logged every contact from your notes and cards",
      "Found their LinkedIn profiles automatically",
      "Drafted a personalised connection request for each",
      "Scheduled context-aware follow-ups"
    ],
    outcome: "20 connections sent. You didn't touch LinkedIn once."
  },
  {
    tag: "Prospecting",
    trigger: "You need 100 contacts that match your ICP, in the CRM by EOD.",
    steps: [
      "Searched LinkedIn and Apollo for your exact criteria",
      "Deduplicated against your existing CRM contacts",
      "Added 100 qualified leads with enriched context",
      "Drafted a personal opening message for each"
    ],
    outcome: "100 leads ready. Each message sounds like you wrote it."
  },
  {
    tag: "Meeting Prep",
    trigger: "You have a client call in 8 minutes.",
    steps: [
      "Read the last 3 months of your email thread",
      "Scanned their LinkedIn for news you should know",
      "Pulled open items and notes from your CRM",
      "Generated a brief with key talking points"
    ],
    outcome: "One-page brief waiting before you dialled in."
  },
  {
    tag: "Research",
    trigger: "Someone just asked for a deep-dive. Needs it by EOD.",
    steps: [
      "Scanned earnings calls and regulatory filings",
      "Filtered news by relevance to the brief",
      "Structured findings into an exec summary",
      "Flagged key risks and opportunities at the top"
    ],
    outcome: "Polished brief delivered. 4 minutes start to finish."
  }
]

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <circle
        cx="6"
        cy="6"
        r="5.5"
        fill="rgba(39,201,63,0.18)"
        stroke="rgba(39,201,63,0.50)"
        strokeWidth="0.75"
      />
      <path
        d="M3.5 6L5.2 7.8L8.5 4.5"
        stroke="#27C93F"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function TaskCard({
  tag,
  trigger,
  steps,
  outcome
}: (typeof USE_CASES)[number]) {
  return (
    <div
      style={{
        background: "rgba(10,14,26,0.82)",
        backdropFilter: "blur(40px) saturate(1.4)",
        WebkitBackdropFilter: "blur(40px) saturate(1.4)",
        border: "1px solid rgba(255,255,255,0.11)",
        borderRadius: "18px",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.32), 0 2px 8px rgba(0,0,0,0.18)"
      }}
    >
      {/* ── Header bar ─────────────────────────────────── */}
      <div
        style={{
          padding: "11px 14px",
          borderBottom: `1px solid ${DIV}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#27C93F",
              boxShadow: "0 0 5px rgba(39,201,63,0.7)"
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "12px",
              fontWeight: 700,
              color: T1
            }}
          >
            yaven
          </span>
        </div>
        <span
          style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            color: "rgba(38,127,229,0.85)",
            background: "rgba(38,127,229,0.12)",
            border: "1px solid rgba(38,127,229,0.22)",
            borderRadius: "6px",
            padding: "2px 7px"
          }}
        >
          {tag}
        </span>
      </div>

      {/* ── Trigger ────────────────────────────────────── */}
      <div style={{ padding: "12px 14px 10px" }}>
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            color: T2,
            margin: 0,
            lineHeight: 1.45
          }}
        >
          {trigger}
        </p>
      </div>

      {/* ── Step log ───────────────────────────────────── */}
      <div
        style={{
          padding: "0 10px 10px",
          display: "flex",
          flexDirection: "column",
          gap: "5px"
        }}
      >
        {steps.map((step, j) => (
          <div
            key={j}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${DIV}`,
              borderRadius: "9px",
              padding: "7px 11px"
            }}
          >
            <CheckIcon />
            <span
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                color: T1,
                lineHeight: 1.4
              }}
            >
              {step}
            </span>
          </div>
        ))}
      </div>

      {/* ── Outcome ────────────────────────────────────── */}
      <div
        style={{
          margin: "0 10px 10px",
          background: "rgba(38,127,229,0.12)",
          border: "1px solid rgba(38,127,229,0.28)",
          borderRadius: "10px",
          padding: "9px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px"
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            color: "rgba(38,127,229,0.95)",
            lineHeight: 1.4
          }}
        >
          {outcome}
        </span>
        <div className="glass-wrap" style={{ flexShrink: 0 }}>
          <div className="glass-shadow" />
          <button className="glass-btn glass-btn-sm">
            <span>View →</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export function ChatSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const revealed = useRef([false, false, false, false])

  useEffect(() => {
    const cards = cardRefs.current
    gsap.set(cards, { opacity: 0, y: 40, scale: 0.95 })

    const pop = (el: HTMLDivElement | null) => {
      if (!el) return
      gsap.to(el, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.52,
        ease: "back.out(1.6)"
      })
    }

    const enterTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 72%",
      onEnter: () => {
        if (!revealed.current[0]) {
          revealed.current[0] = true
          pop(cards[0])
        }
      }
    })

    const pinTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${PIN_AMOUNT}`,
      pin: true,
      pinSpacing: true,
      onUpdate: self => {
        const px = self.progress * PIN_AMOUNT
        ;[240, 520, 800].forEach((t, i) => {
          if (px >= t && !revealed.current[i + 1]) {
            revealed.current[i + 1] = true
            pop(cards[i + 1])
          }
        })
      }
    })

    return () => {
      enterTrigger.kill()
      pinTrigger.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: "linear-gradient(to bottom, transparent 0%, #ffffff 60%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        zIndex: 1,
        overflow: "hidden"
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          width: "100%",
          padding: "0 clamp(20px, 5vw, 60px)",
          position: "relative",
          zIndex: 3
        }}
      >
        {/* Section label */}
        <p
          style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            color: "#267FE5",
            marginBottom: "clamp(18px, 2.5vw, 28px)",
            textAlign: "center"
          }}
        >
          yaven in action
        </p>

        {/* 2×2 card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(12px, 1.8vw, 18px)"
          }}
        >
          {USE_CASES.map((uc, i) => (
            <div
              key={i}
              ref={el => {
                cardRefs.current[i] = el
              }}
            >
              <TaskCard {...uc} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

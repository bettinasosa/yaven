"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollCutReveal } from "@/components/effects/scroll-cut-reveal"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"

gsap.registerPlugin(ScrollTrigger)

const INK = "#0a0e1a"
const GREEN = "#3BA55C"

// Script §4 — The follow-ups. Three pinned phases in the proposals/CRM
// style: copy on one side, the handled card on the other.
const BEATS = [
  {
    label: "Conference",
    headline: "300 badge scans. 4 worth keeping.",
    body: "Yaven finds them and writes the intros before your flight lands.",
    cardTitle: "Tuesday's conference",
    rows: [
      { field: "Scanned", value: "300 contacts" },
      { field: "Worth keeping", value: "4" },
      { field: "Intros", value: "Drafted ✓", done: true },
      { field: "Ready by", value: "Landing" }
    ],
    flip: false
  },
  {
    label: "Payment",
    headline: "Invoice 47 days overdue?",
    body: "The polite nudge is drafted. The firm one is queued behind it.",
    cardTitle: "Invoice #214",
    rows: [
      { field: "Sent", value: "47 days ago" },
      { field: "Status", value: "Overdue" },
      { field: "Polite nudge", value: "Drafted ✓", done: true },
      { field: "Firm nudge", value: "Queued" }
    ],
    flip: true
  },
  {
    label: "Client",
    headline: "Quiet since the kickoff call?",
    body: "Yaven notices on day 6. Not month 6.",
    cardTitle: "Otto's Bakehouse",
    rows: [
      { field: "Kickoff call", value: "Tuesday" },
      { field: "Replies since", value: "0" },
      { field: "Day 6", value: "Check-in drafted ✓", done: true },
      { field: "You", value: "Just hit send" }
    ],
    flip: false
  }
]

const headlineStyle: React.CSSProperties = {
  fontFamily: "var(--font-instrument-serif)",
  fontSize: "clamp(32px, 4.5vw, 64px)",
  fontWeight: 500,
  letterSpacing: "-0.02em",
  lineHeight: 1.08,
  color: "var(--cream)",
  margin: "14px 0 0"
}

const bodyStyle: React.CSSProperties = {
  fontSize: "clamp(16px, 1.9vw, 22px)",
  fontWeight: 500,
  lineHeight: 1.45,
  color: "var(--cream)",
  opacity: 0.85,
  margin: "18px 0 0",
  maxWidth: "480px"
}

const phaseGridStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "0 24px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  alignItems: "center",
  gap: "clamp(40px, 6vw, 80px)"
}

function BeatCard({ beat }: { beat: (typeof BEATS)[number] }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        border: "var(--bd)",
        boxShadow: "var(--shadow)",
        padding: "clamp(18px, 2.5vw, 28px)",
        maxWidth: "460px",
        justifySelf: "center",
        width: "100%"
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-instrument-serif)",
          fontSize: "clamp(18px, 2vw, 22px)",
          lineHeight: 1,
          color: INK,
          opacity: 0.55,
          padding: "0 14px 14px"
        }}
      >
        {beat.cardTitle}
      </div>
      {beat.rows.map(row => (
        <div
          key={row.field}
          style={{
            display: "flex",
            gap: "14px",
            padding: "10px 14px",
            borderRadius: "10px"
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: INK,
              opacity: 0.5,
              width: "110px",
              flexShrink: 0,
              paddingTop: "2px"
            }}
          >
            {row.field}
          </span>
          <span
            style={{
              fontSize: "15px",
              fontWeight: row.done ? 700 : 500,
              color: row.done ? GREEN : INK
            }}
          >
            {row.value}
          </span>
        </div>
      ))}
    </div>
  )
}

function BeatCopy({ beat }: { beat: (typeof BEATS)[number] }) {
  return (
    <div>
      <h3 style={{ ...headlineStyle, margin: 0 }}>{beat.headline}</h3>
      <p style={bodyStyle}>{beat.body}</p>
    </div>
  )
}

function BeatGrid({ beat }: { beat: (typeof BEATS)[number] }) {
  return beat.flip ? (
    <>
      <BeatCard beat={beat} />
      <BeatCopy beat={beat} />
    </>
  ) : (
    <>
      <BeatCopy beat={beat} />
      <BeatCard beat={beat} />
    </>
  )
}

export function FollowUpsSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([])
  const staticLayout = usePrefersReducedMotion()

  useEffect(() => {
    if (staticLayout || !wrapperRef.current) return

    phaseRefs.current.forEach(
      (p, i) =>
        p && gsap.set(p, i === 0 ? { y: 60, opacity: 0 } : { y: "100vh", opacity: 0 })
    )

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2
      }
    })

    BEATS.forEach((_, i) => {
      const phase = phaseRefs.current[i]
      if (!phase) return
      const base = i * 3

      // phase arrives…
      tl.to(
        phase,
        { y: 0, opacity: 1, ease: "power3.out", duration: i === 0 ? 0.8 : 1.2 },
        i === 0 ? 0.3 : base
      )
      // …dwells, then gives way (the last one stays)
      if (i < BEATS.length - 1) {
        tl.to(phase, { y: -60, opacity: 0, ease: "power2.in", duration: 0.8 }, base + 2.4)
      }
    })

    // dwell before unpinning
    tl.to({}, { duration: 1.6 })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [staticLayout])

  const header = (
    <ScrollCutReveal
      style={{
        fontFamily: "var(--font-instrument-serif)",
        fontSize: "clamp(36px, 5.5vw, 76px)",
        fontWeight: 500,
        letterSpacing: "-0.02em",
        lineHeight: 1,
        color: "var(--cream)",
        margin: 0,
        textAlign: "center"
      }}
    >
      The follow-ups, handled.
    </ScrollCutReveal>
  )

  if (staticLayout) {
    return (
      <section
        style={{
          background: "var(--primary)",
          padding: "clamp(80px, 12vh, 140px) 24px",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "72px"
          }}
        >
          {header}
          {BEATS.map(beat => (
            <div
              key={beat.label}
              style={{ ...phaseGridStyle, position: "relative", inset: "auto" }}
            >
              <BeatGrid beat={beat} />
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <div
      ref={wrapperRef}
      style={{ position: "relative", height: "550vh", background: "var(--primary)" }}
    >
      <section
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div style={{ paddingTop: "clamp(48px, 8vh, 90px)" }}>{header}</div>

        {/* Phase stage */}
        <div style={{ position: "relative", flex: 1 }}>
          {BEATS.map((beat, i) => (
            <div
              key={beat.label}
              ref={el => {
                phaseRefs.current[i] = el
              }}
              style={{ ...phaseGridStyle, opacity: 0 }}
            >
              <BeatGrid beat={beat} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

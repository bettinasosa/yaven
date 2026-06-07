"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"

gsap.registerPlugin(ScrollTrigger)

const INK = "#0a0e1a"

// The stream — five inboxes' worth of noise
const STREAM = [
  "Invoice #214, 47 days overdue",
  "Re: contract redlines",
  "Can we move Thursday's call?",
  "AI Weekly: your Tuesday digest",
  "Intro: Maya ↔ you",
  "Your receipt from Figma",
  "Re: proposal timeline?",
  "3 new connection requests",
  "Quick question about pricing",
  "Webinar invite: Q3 outlook"
]

const PILES = [
  {
    label: "Your priority",
    color: "var(--warm)",
    chips: ["Can we move Thursday's call?", "Intro: Maya ↔ you"]
  },
  {
    label: "Your tone",
    color: "var(--primary)",
    chips: ["Re: proposal timeline? Draft ready", "Invoice #214, nudge drafted"]
  },
  {
    label: "Your context",
    color: "rgba(10,14,26,0.45)",
    chips: ["Knows the March quote", "Remembers the kickoff call"]
  }
]

const chipStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "10px 18px",
  borderRadius: "999px",
  background: "#fff",
  boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
  fontSize: "clamp(13px, 1.4vw, 15px)",
  fontWeight: 500,
  color: INK,
  whiteSpace: "nowrap"
}

// Script §6 — Inbound triage. Pinned: the stream pours past, and the three
// sorted piles appear one by one.
export function TriageSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const pileRefs = useRef<(HTMLDivElement | null)[]>([])
  const staticLayout = usePrefersReducedMotion()

  useEffect(() => {
    if (staticLayout || !wrapperRef.current) return

    gsap.set(headerRef.current, { y: 50, opacity: 0 })
    gsap.set(marqueeRef.current, { opacity: 0 })
    pileRefs.current.forEach(p => p && gsap.set(p, { y: 60, opacity: 0 }))

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2
      }
    })

    // header, then the noise starts streaming
    tl.to(headerRef.current, { y: 0, opacity: 1, ease: "power3.out", duration: 1 }, 0)
    tl.to(marqueeRef.current, { opacity: 1, duration: 1 }, 1)

    // the three piles appear one by one, chips and all
    pileRefs.current.forEach((p, i) => {
      if (!p) return
      tl.to(p, { y: 0, opacity: 1, ease: "power3.out", duration: 1 }, 2.4 + i * 1.4)
    })

    // dwell before unpinning
    tl.to({}, { duration: 1.6 })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [staticLayout])

  const header = (
    <div ref={headerRef} style={{ textAlign: "center", padding: "0 24px" }}>
      <h2
        style={{
          fontFamily: "var(--font-instrument-serif)",
          fontSize: "clamp(36px, 5.5vw, 76px)",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          lineHeight: 1,
          color: "var(--cream)",
          margin: 0
        }}
      >
        Five inboxes. One queue.
      </h2>
      <p
        style={{
          fontSize: "clamp(16px, 1.9vw, 22px)",
          fontWeight: 500,
          lineHeight: 1.45,
          color: "var(--cream)",
          opacity: 0.85,
          maxWidth: "560px",
          margin: "20px auto 0"
        }}
      >
        Yaven sorts what needs you now, and drafts replies in one click.
      </p>
    </div>
  )

  const marquee = (
    <div
      ref={marqueeRef}
      className="testimonial-marquee"
      style={{ marginTop: "clamp(28px, 4vh, 48px)", width: "100%" }}
    >
      <div
        className="testimonial-marquee-track"
        style={{
          display: "flex",
          gap: "16px",
          width: "max-content",
          animationDuration: "38s",
          padding: "8px 0"
        }}
      >
        {[...STREAM, ...STREAM].map((msg, i) => (
          <span key={i} style={{ ...chipStyle, opacity: 0.9 }}>
            {msg}
          </span>
        ))}
      </div>
    </div>
  )

  const board = (
    <div
      style={{
        maxWidth: "1040px",
        width: "100%",
        margin: "0 auto",
        padding: "0 24px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "clamp(24px, 3.5vw, 44px)"
      }}
    >
      {PILES.map((pile, pi) => (
        <div
          key={pile.label}
          ref={el => {
            pileRefs.current[pi] = el
          }}
          style={{
            position: "relative",
            padding: "clamp(22px, 2.8vw, 32px)",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            background: "var(--cream)",
            borderRadius: "20px"
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(18px, 2vw, 24px)",
              lineHeight: 1,
              color: pile.color
            }}
          >
            {pile.label}
          </span>
          {pile.chips.map(chip => (
            <span
              key={chip}
              style={{
                ...chipStyle,
                position: "relative",
                whiteSpace: "normal",
                opacity: pile.label === "Your context" ? 0.6 : 1
              }}
            >
              {chip}
            </span>
          ))}
        </div>
      ))}
    </div>
  )

  if (staticLayout) {
    return (
      <section
        style={{
          background: "var(--primary)",
          padding: "clamp(100px, 15vh, 180px) 0",
          overflow: "hidden"
        }}
      >
        {header}
        {marquee}
        <div style={{ height: "24px" }} />
        {board}
      </section>
    )
  }

  return (
    <div
      ref={wrapperRef}
      style={{ position: "relative", height: "400vh", background: "var(--primary)" }}
    >
      <section
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(24px, 4vh, 48px) 0"
        }}
      >
        {header}
        {marquee}
        <div style={{ height: "clamp(24px, 4vh, 48px)" }} />
        {board}
      </section>
    </div>
  )
}

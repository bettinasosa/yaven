"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { Typewriter } from "@/components/effects/typewriter"
import { ScrollCutReveal } from "@/components/effects/scroll-cut-reveal"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"
import { GlassCard } from "@/components/effects/glass-card"

gsap.registerPlugin(ScrollTrigger, SplitText)

const INK = "#0a0e1a"

const headlineStyle: React.CSSProperties = {
  fontFamily: "var(--font-instrument-serif)",
  fontSize: "clamp(32px, 4.5vw, 64px)",
  fontWeight: 500,
  letterSpacing: "-0.02em",
  lineHeight: 1.08,
  color: INK,
  margin: 0
}

const bodyStyle: React.CSSProperties = {
  fontSize: "clamp(16px, 1.9vw, 22px)",
  fontWeight: 500,
  lineHeight: 1.45,
  color: INK,
  opacity: 0.8,
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

// Scattered note fragments that melt into one document (gooey filter)
const FRAGMENTS = [
  { x: -150, y: -120, r: -18, w: 86, h: 54 },
  { x: 160, y: -100, r: 14, w: 70, h: 70 },
  { x: -180, y: 70, r: 10, w: 64, h: 64 },
  { x: 140, y: 120, r: -12, w: 90, h: 50 },
  { x: -40, y: -170, r: 6, w: 56, h: 56 },
  { x: 60, y: 170, r: -8, w: 74, h: 46 }
]

function GooeyStage({
  fragRefs,
  merged
}: {
  fragRefs: React.RefObject<(HTMLDivElement | null)[]>
  merged: boolean
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: "min(380px, 80vw)",
        height: "min(380px, 80vw)",
        margin: "0 auto"
      }}
    >
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="yv-goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="12"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div
        style={{
          position: "absolute",
          inset: 0,
          filter: "url(#yv-goo)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {/* The document the fragments melt into */}
        <div
          style={{
            width: "150px",
            height: "190px",
            borderRadius: "16px",
            background: "var(--primary)"
          }}
        />
        {FRAGMENTS.map((f, i) => (
          <div
            key={i}
            ref={el => {
              fragRefs.current[i] = el
            }}
            style={{
              position: "absolute",
              width: `${f.w}px`,
              height: `${f.h}px`,
              borderRadius: "14px",
              background: "var(--primary)",
              transform: merged
                ? "translate(0, 0) scale(0.6)"
                : `translate(${f.x}px, ${f.y}px) rotate(${f.r}deg)`
            }}
          />
        ))}
      </div>

      {/* Document face — above the filter so it stays crisp */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "150px",
          height: "190px",
          borderRadius: "16px",
          padding: "18px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "9px"
        }}
      >
        {[80, 100, 100, 60, 100, 45].map((w, i) => (
          <div
            key={i}
            style={{
              height: i === 0 ? "10px" : "6px",
              width: `${w}%`,
              borderRadius: "4px",
              background: "rgba(255,255,255,0.75)"
            }}
          />
        ))}
      </div>
    </div>
  )
}

// CRM contact card that fills itself in
const CRM_ROWS = [
  { field: "Matched", value: "Fits your ideal client" },
  { field: "Outreach", value: "Intro drafted in your voice" },
  { field: "Replied", value: "Call booked Thursday" },
  { field: "Logged", value: "Synced after the call" }
]

// Raw signals (tool logos) that gooey-merge into the structured card. Start
// well outside the card so they visibly fly in from beyond its edges.
const SIGNALS = [
  { logo: "linkedin", x: -255, y: -95 },
  { logo: "gmail", x: 255, y: -85 },
  { logo: "gcal", x: -265, y: 100 },
  { logo: "hubspot", x: 255, y: 115 }
]

// Goo blobs sit behind the signal pills so they melt as they converge
const SIGNAL_BLOBS = [
  { x: -255, y: -95, s: 46 },
  { x: 255, y: -85, s: 40 },
  { x: -265, y: 100, s: 44 },
  { x: 255, y: 115, s: 38 }
]

// Presentational row. The value is revealed by the parent's scrubbed
// timeline (via [data-crm-value]) so it reverses smoothly on backscroll.
function CrmRow({
  field,
  value,
  animated
}: {
  field: string
  value: string
  animated: boolean
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "14px",
        padding: "10px 14px",
        borderRadius: "10px",
        minHeight: "42px"
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "13px",
          letterSpacing: "0.02em",
          color: INK,
          opacity: 0.5,
          width: "90px",
          flexShrink: 0,
          paddingTop: "2px"
        }}
      >
        {field}
      </span>
      <span
        data-crm-value
        style={{
          fontSize: "15px",
          fontWeight: 500,
          color: INK,
          opacity: animated ? 0 : 1
        }}
      >
        {value}
      </span>
    </div>
  )
}

// The signal pills/blobs and row values are animated by the parent's
// scrubbed timeline (selected via data attributes), so the whole fill
// scrubs forward and backward smoothly. When not animated (reduced motion)
// the card just renders filled, with no signals.
function CrmCard({ animated }: { animated: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`
  }

  function handleMouseLeave() {
    const card = cardRef.current
    if (!card) return
    card.style.transform =
      "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)"
  }

  return (
    <div style={{ position: "relative", maxWidth: "520px", margin: "0 auto" }}>
      {/* Goo blob layer behind the pills — melts as they converge */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter id="yv-goo-signal">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      {animated && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            filter: "url(#yv-goo-signal)",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 0
          }}
        >
          {SIGNAL_BLOBS.map((b, i) => (
            <div
              key={i}
              data-signal-blob
              style={{
                position: "absolute",
                width: `${b.s}px`,
                height: `${b.s}px`,
                borderRadius: "50%",
                background: "#267FE5",
                opacity: 0,
                transform: `translate(${b.x}px, ${b.y}px)`
              }}
            />
          ))}
        </div>
      )}

      {/* Crisp source pills, on top of the goo */}
      {animated && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2
          }}
        >
          {SIGNALS.map(s => (
            <div
              key={s.logo}
              data-signal-pill
              style={{
                position: "absolute",
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "#fff",
                border: "1px solid rgba(38,127,229,0.18)",
                boxShadow: "0 6px 18px rgba(38,127,229,0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
                transform: `translate(${s.x}px, ${s.y}px)`
              }}
            >
              <Image
                src={`/logos/${s.logo}.png`}
                alt=""
                width={28}
                height={28}
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
      )}

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "520px",
          transition: "transform 0.35s cubic-bezier(0.25,1,0.5,1)",
          transformStyle: "preserve-3d",
          willChange: "transform",
          cursor: "default"
        }}
      >
      <GlassCard
        borderRadius="28px"
        style={{
          maxWidth: "520px",
          background: "rgba(200,220,255,0.18)",
          overflow: "hidden"
        }}
      >
        {/* Header with avatar */}
        <div
          style={{
            padding: "18px clamp(18px, 2.5vw, 28px) 14px",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "linear-gradient(145deg, #267FE5, #4da3f0, #9e8ec8)",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: 600,
              color: "#fff"
            }}
          >
            OB
          </div>
          <div>
            <div
              style={{
                fontSize: "15px",
                fontWeight: 600,
                color: INK,
                lineHeight: 1.2
              }}
            >
              Otto&apos;s Bakehouse
            </div>
            <div
              style={{
                fontSize: "12px",
                fontWeight: 500,
                color: "#267FE5",
                opacity: 0.9,
                marginTop: "1px"
              }}
            >
              1 of 100 Yaven sourced
            </div>
          </div>
        </div>

        {/* Rows */}
        <div
          style={{
            padding: "12px clamp(18px, 2.5vw, 28px) clamp(18px, 2.5vw, 28px)"
          }}
        >
          {CRM_ROWS.map(row => (
            <CrmRow
              key={row.field}
              field={row.field}
              value={row.value}
              animated={animated}
            />
          ))}
        </div>
      </GlassCard>
      </div>
    </div>
  )
}

// All tool logos — 4×3 grid
const TOOL_LOGOS = [
  "gmail", "notion", "linkedin", "hubspot",
  "salesforce", "google", "asana", "excel",
  "googleads", "googleanalytics", "granola", "monday"
]

function ToolGrid() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 52px)",
        gap: "10px",
        justifyContent: "center"
      }}
    >
      {TOOL_LOGOS.map(logo => (
        <div
          key={logo}
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "14px",
            background: "rgba(10,14,26,0.05)",
            border: "1px solid rgba(10,14,26,0.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image
            src={`/logos/${logo}.png`}
            alt={logo}
            width={28}
            height={28}
            style={{ objectFit: "contain" }}
          />
        </div>
      ))}
    </div>
  )
}

function FinaleContent({
  headRef
}: {
  headRef?: React.RefObject<HTMLHeadingElement | null>
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "clamp(28px, 4vh, 44px)",
        maxWidth: "640px",
        margin: "0 auto"
      }}
    >
      <h2
        ref={headRef}
        style={{ ...headlineStyle, textAlign: "center" }}
      >
        And that&apos;s just a few examples
      </h2>

      <ToolGrid />

      <p style={{ ...bodyStyle, margin: 0, textAlign: "center", maxWidth: "480px" }}>
        Yaven connects to all of your tools, handling repetitive tasks, and
        leaving you with less admin; more flow.
      </p>
    </div>
  )
}

// The conference follow-up card — styled as an identity/badge card
// with a hover tilt effect.
const GREEN = "#3BA55C"

function ConferenceCard({ animated }: { animated: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`
  }

  function handleMouseLeave() {
    const card = cardRef.current
    if (!card) return
    card.style.transform =
      "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)"
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        maxWidth: "520px",
        transition: "transform 0.35s cubic-bezier(0.25,1,0.5,1)",
        transformStyle: "preserve-3d",
        willChange: "transform",
        cursor: "default"
      }}
    >
      <GlassCard
        borderRadius="24px"
        style={{ overflow: "hidden", background: "rgba(200,220,255,0.18)" }}
      >
        {/* Badge top strip */}
        <div
          style={{
            background: "linear-gradient(135deg, #057BD5, #4da3f0, #00AFF9)",
            padding: "14px clamp(20px, 3vw, 28px)",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Grain overlay */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.15,
              mixBlendMode: "overlay",
              pointerEvents: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat"
            }}
          />
          <div>
            <div
              style={{
                fontSize: "clamp(17px, 1.8vw, 20px)",
                fontWeight: 600,
                color: "#fff",
                lineHeight: 1.2
              }}
            >
              Sarah Chen
            </div>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "rgba(255,255,255,0.7)",
                marginTop: "2px"
              }}
            >
              Lattice Design
            </div>
          </div>
        </div>

        {/* Badge body */}
        <div
          style={{
            padding:
              "clamp(16px, 2vw, 22px) clamp(20px, 3vw, 28px) clamp(20px, 3vw, 28px)"
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {[
              { label: "Spoke at", value: "Config '26" },
              { label: "Mutual", value: "Maya Rivera" },
              { label: "Talked about", value: "Brand systems" }
            ].map(row => (
              <div
                key={row.label}
                style={{ display: "flex", gap: "12px", alignItems: "baseline" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: INK,
                    opacity: 0.4,
                    width: "100px",
                    flexShrink: 0
                  }}
                >
                  {row.label}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: INK,
                    opacity: 0.85
                  }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Follow-up status — flips from "needs follow-up" to "drafted"
              as a Gmail bubble passes through (driven by the timeline). */}
          <div
            style={{
              position: "relative",
              marginTop: "16px",
              minHeight: "40px"
            }}
          >
            {/* Before: needs follow-up (amber) */}
            <div
              data-fu-before
              style={{
                position: "absolute",
                inset: 0,
                padding: "10px 14px",
                borderRadius: "12px",
                background: "#F8D2CC",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                opacity: animated ? 1 : 0
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#df4f3e",
                  flexShrink: 0
                }}
              />
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#df4f3e" }}>
                Needs follow-up
              </span>
            </div>

            {/* After: follow-up drafted (green) */}
            <div
              data-fu-after
              style={{
                position: "absolute",
                inset: 0,
                padding: "10px 14px",
                borderRadius: "12px",
                background: "rgba(59,165,92,0.08)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                opacity: animated ? 0 : 1
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: GREEN,
                  flexShrink: 0
                }}
              />
              <span style={{ fontSize: "13px", fontWeight: 600, color: GREEN }}>
                Follow-up drafted with Yaven
              </span>
            </div>

            {/* Gmail bubble that flies across as the status flips */}
            {animated && (
              <div
                data-fu-bubble
                aria-hidden="true"
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  marginTop: "-19px",
                  width: "38px",
                  height: "38px",
                  borderRadius: "11px",
                  background: "#fff",
                  border: "1px solid rgba(38,127,229,0.18)",
                  boxShadow: "0 6px 18px rgba(38,127,229,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  zIndex: 2
                }}
              >
                <Image
                  src="/logos/gmail.png"
                  alt=""
                  width={22}
                  height={22}
                  style={{ objectFit: "contain" }}
                />
              </div>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  )
}

// Script §4+§5 — Automations. Pinned three-phase set piece: the gooey
// proposal merge, the self-filling CRM, and the conference follow-up.
export function ProposalsCrmSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const proposalsRef = useRef<HTMLDivElement>(null)
  const crmRef = useRef<HTMLDivElement>(null)
  const confRef = useRef<HTMLDivElement>(null)
  const finaleRef = useRef<HTMLDivElement>(null)
  const finaleHeadRef = useRef<HTMLHeadingElement>(null)
  const headerWrapRef = useRef<HTMLDivElement>(null)
  const fragRefs = useRef<(HTMLDivElement | null)[]>([])
  const staticLayout = usePrefersReducedMotion()

  useEffect(() => {
    if (staticLayout || !wrapperRef.current) return

    gsap.set(proposalsRef.current, { y: 60, opacity: 0 })
    gsap.set(crmRef.current, { y: "100vh", opacity: 0 })
    gsap.set(confRef.current, { y: "100vh", opacity: 0 })
    gsap.set(finaleRef.current, { y: "100vh", opacity: 0 })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let splitInstance: any = null
    fragRefs.current.forEach((f, i) => {
      if (f)
        gsap.set(f, {
          x: FRAGMENTS[i].x,
          y: FRAGMENTS[i].y,
          rotation: FRAGMENTS[i].r
        })
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2
      }
    })

    // Phase 1 — proposals enter, fragments melt into the document
    tl.to(
      proposalsRef.current,
      { y: 0, opacity: 1, ease: "power3.out", duration: 0.8 },
      0
    )
    fragRefs.current.forEach((f, i) => {
      if (!f) return
      tl.to(
        f,
        {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 0.6,
          ease: "power2.inOut",
          duration: 1.6
        },
        0.8 + i * 0.12
      )
    })
    tl.to({}, { duration: 0.8 }) // dwell on the finished document

    // Phase 2 — proposals give way, CRM card slides up and fills in
    tl.to(
      proposalsRef.current,
      { y: -60, opacity: 0, ease: "power2.in", duration: 0.8 },
      ">"
    )
    tl.to(
      crmRef.current,
      { y: 0, opacity: 1, ease: "power3.out", duration: 1.2 },
      "<0.3"
    )

    // Signals converge into the card and the rows fill — all on the scrubbed
    // timeline so it reverses smoothly on backscroll.
    const crm = crmRef.current
    if (crm) {
      const pills = Array.from(
        crm.querySelectorAll<HTMLElement>("[data-signal-pill]")
      )
      const blobs = Array.from(
        crm.querySelectorAll<HTMLElement>("[data-signal-blob]")
      )
      const rowVals = Array.from(
        crm.querySelectorAll<HTMLElement>("[data-crm-value]")
      )

      tl.addLabel("crmIn")

      SIGNALS.forEach((s, i) => {
        const targets = [pills[i], blobs[i]].filter(Boolean)
        if (!targets.length) return
        gsap.set(targets, { x: s.x, y: s.y, scale: 1, opacity: 0 })
        // appear in place
        tl.to(
          targets,
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          `crmIn+=${0.2 + i * 0.35}`
        )
        // fly into the card and dissolve
        tl.to(
          targets,
          { x: 0, y: 0, scale: 0.2, opacity: 0, duration: 1, ease: "power2.in" },
          `crmIn+=${0.8 + i * 0.35}`
        )
      })

      // rows reveal as the signals land
      gsap.set(rowVals, { opacity: 0, x: -6 })
      tl.to(
        rowVals,
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.5, ease: "power2.out" },
        "crmIn+=1.4"
      )
    }

    tl.to({}, { duration: 1.4 }) // dwell on the filled card

    // Phase 3 — the conference follow-up takes the stage
    tl.to(
      crmRef.current,
      { y: -60, opacity: 0, ease: "power2.in", duration: 0.8 },
      ">"
    )
    tl.to(
      confRef.current,
      { y: 0, opacity: 1, ease: "power3.out", duration: 1.2 },
      "<0.3"
    )

    // Follow-up status flips needs-follow-up → drafted as a Gmail bubble
    // passes through. Scrubbed so it reverses on backscroll.
    const conf = confRef.current
    if (conf) {
      const before = conf.querySelector<HTMLElement>("[data-fu-before]")
      const after = conf.querySelector<HTMLElement>("[data-fu-after]")
      const bubble = conf.querySelector<HTMLElement>("[data-fu-bubble]")
      if (before && after && bubble) {
        gsap.set(after, { opacity: 0 })
        gsap.set(bubble, { opacity: 0, x: 60, scale: 0.6 })
        tl.addLabel("confIn")
        // gmail bubble flies in over the status
        tl.to(bubble, { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "power2.out" }, "confIn+=0.5")
        // status swaps as it lands
        tl.to(before, { opacity: 0, duration: 0.4, ease: "power2.in" }, "confIn+=1.1")
        tl.to(after, { opacity: 1, duration: 0.4, ease: "power2.out" }, "confIn+=1.2")
        // bubble dissolves into the card
        tl.to(bubble, { opacity: 0, scale: 0.4, duration: 0.4, ease: "power2.in" }, "confIn+=1.3")
      }
    }

    tl.to({}, { duration: 1.4 }) // dwell

    // Phase 4 — the zoom-out; the header leaves so the line stands alone
    tl.to(
      confRef.current,
      { y: -60, opacity: 0, ease: "power2.in", duration: 0.8 },
      ">"
    )
    tl.to(
      headerWrapRef.current,
      { y: -40, opacity: 0, ease: "power2.in", duration: 0.8 },
      "<"
    )
    tl.to(
      finaleRef.current,
      { y: 0, opacity: 1, ease: "power3.out", duration: 1.2 },
      "<0.3"
    )

    // SplitText char animation on the finale heading
    if (finaleHeadRef.current) {
      const split = new SplitText(finaleHeadRef.current, {
        type: "chars,words"
      })
      tl.from(
        split.chars,
        {
          yPercent: 130,
          opacity: 0,
          stagger: 0.035,
          duration: 0.9,
          ease: "back.out(1.7)"
        },
        "<0.1"
      )
      splitInstance = split
    }

    tl.to({}, { duration: 1.4 }) // dwell before unpinning

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
      splitInstance?.revert?.()
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
        color: INK,
        margin: 0,
        textAlign: "center"
      }}
    >
      Yaven creates your workflows.
    </ScrollCutReveal>
  )

  if (staticLayout) {
    return (
      <section style={{ background: "var(--cream)", overflow: "hidden" }}>
        <div style={{ paddingTop: "clamp(80px, 12vh, 140px)" }}>{header}</div>
        <div
          style={{
            ...phaseGridStyle,
            position: "relative",
            padding: "clamp(60px, 9vh, 110px) clamp(28px, 5vw, 48px)"
          }}
        >
          <div>
            <h2 style={headlineStyle}>Call ended. Proposal ready.</h2>
            <p style={bodyStyle}>
              Built from your notes while the conversation is still warm.
            </p>
          </div>
          <GooeyStage fragRefs={fragRefs} merged />
        </div>
        <div
          style={{
            ...phaseGridStyle,
            position: "relative",
            padding:
              "clamp(60px, 9vh, 110px) clamp(28px, 5vw, 48px) clamp(100px, 15vh, 180px)"
          }}
        >
          <CrmCard animated={false} />
          <div>
            <h2 style={headlineStyle}>A CRM that runs itself.</h2>
            <p style={bodyStyle}>
              It sources clients that fit, drafts the outreach, and logs every reply. No need to type.
            </p>
          </div>
        </div>
        <div
          style={{
            ...phaseGridStyle,
            position: "relative",
            padding:
              "clamp(60px, 9vh, 110px) clamp(28px, 5vw, 48px) clamp(100px, 15vh, 180px)"
          }}
        >
          <div>
            <h2 style={headlineStyle}>
              Conference networking? Yaven handles it.
            </h2>
            <p style={bodyStyle}>
              It finds their work, your mutual connections, and drafts a
              follow-up that has your context and tone.
            </p>
          </div>
          <ConferenceCard animated={false} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "0 clamp(28px, 5vw, 48px)",
            width: "100%"
          }}
        >
          <FinaleContent headRef={finaleHeadRef} />
        </div>
      </section>
    )
  }

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        height: "1050vh",
        background: "var(--cream)"
      }}
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
        <div
          ref={headerWrapRef}
          style={{ paddingTop: "clamp(48px, 8vh, 90px)" }}
        >
          {header}
        </div>

        <div style={{ position: "relative", flex: 1 }}>
          {/* Phase 1 — Proposals */}
          <div ref={proposalsRef} style={phaseGridStyle}>
            <div>
              <h2 style={headlineStyle}>Call ended. Proposal ready.</h2>
              <p style={bodyStyle}>
                Built from your notes, client profile and context while the
                conversation is still warm.
              </p>
            </div>
            <GooeyStage fragRefs={fragRefs} merged={false} />
          </div>

          {/* Phase 2 — CRM */}
          <div ref={crmRef} style={phaseGridStyle}>
            <CrmCard animated />
            <div>
              <h2 style={headlineStyle}>A CRM that runs itself.</h2>
              <p style={bodyStyle}>
                It sources clients that fit, drafts the outreach, and logs every reply. No need to type.
              </p>
            </div>
          </div>

          {/* Phase 3 — Conference follow-up */}
          <div ref={confRef} style={phaseGridStyle}>
            <div>
              <h2 style={headlineStyle}>Conference networking</h2>
              <p style={bodyStyle}>
                It finds their work, your mutual connections, and drafts a
                follow-up that has your context and tone.
              </p>
            </div>
            <ConferenceCard animated />
          </div>

          {/* Phase 4 — the zoom-out */}
        </div>
        <div
          ref={finaleRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 clamp(28px, 5vw, 48px)",
            width: "100%"
          }}
        >
          <FinaleContent headRef={finaleHeadRef} />
        </div>
      </section>
    </div>
  )
}

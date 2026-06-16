"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { Typewriter } from "@/components/effects/typewriter"
import { ScrollCutReveal } from "@/components/effects/scroll-cut-reveal"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"
import { useIsMobile } from "@/components/effects/use-is-mobile"
import { GlassCard } from "@/components/effects/glass-card"
import Image from "next/image"
import {
  FinaleContent,
  ProposalsFinaleSection
} from "./proposals-finale-section"

gsap.registerPlugin(ScrollTrigger, SplitText)

const INK = "#0a0e1a"

const headlineStyle: React.CSSProperties = {
  fontFamily: "var(--font-instrument-serif)",
  fontSize: "var(--fs-display)",
  fontWeight: 500,
  letterSpacing: "-0.02em",
  lineHeight: 1.08,
  color: INK,
  margin: 0
}

// Slide sub-headers use Satoshi bold so they don't clash with the serif
// "and streamlines your workflows" section header above them.
const subHeadingStyle: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans), sans-serif",
  fontSize: "var(--fs-title)",
  fontWeight: 700,
  letterSpacing: "-0.03em",
  lineHeight: 1.12,
  color: INK,
  margin: 0
}

const bodyStyle: React.CSSProperties = {
  fontSize: "var(--fs-body-lg)",
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

// ── Stacked document transition ────────────────────────────────────────────
// Three GlassCards (call notes, past project, pricing) pop in staggered,
// dwell so users can read them, then collapse into a clean proposal doc.
const SOURCE_CARDS = [
  {
    title: "Call notes",
    detail: "Website redesign, 4-week timeline, exhibition catalog",
    rotate: -4,
    x: -80,
    y: -140
  },
  {
    title: "Past project",
    detail: "Gigi's Art Gallery, site + catalog, $6,200",
    rotate: 3,
    x: 65,
    y: 0
  },
  {
    title: "Your pricing",
    detail: "Web + print packages start at $7,500",
    rotate: -2,
    x: -40,
    y: 140
  }
]

// Desktop: absolute-positioned scattered cards with scroll animation
function StackedDocStage({
  fragRefs,
  merged
}: {
  fragRefs: React.RefObject<(HTMLDivElement | null)[]>
  merged: boolean
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "min(560px, 85vw)",
        height: "min(560px, 85vw)",
        margin: "0 auto"
      }}
    >
      {SOURCE_CARDS.map((card, i) => (
        <div
          key={card.title}
          ref={el => {
            fragRefs.current[i] = el
          }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "min(360px, 75vw)",
            transform: merged
              ? "translate(-50%, -50%) rotate(0deg) scale(0)"
              : `translate(calc(-50% + ${card.x}px), calc(-50% + ${card.y}px)) rotate(${card.rotate}deg)`,
            zIndex: i + 1,
            opacity: merged ? 0 : 1
          }}
        >
          <SourceCard title={card.title} detail={card.detail} />
        </div>
      ))}

      {/* Merged result — clean proposal document */}
      <div
        data-merged-proposal
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(380px, 80vw)",
          opacity: merged ? 1 : 0
        }}
      >
        <ProposalResult />
      </div>
    </div>
  )
}

// Mobile: vertical stack showing the full story — sources then result
function StackedDocStageMobile() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "100%",
        maxWidth: "440px",
        margin: "0 auto"
      }}
    >
      {SOURCE_CARDS.map((card, i) => (
        <div
          key={card.title}
          style={{
            marginLeft: i % 2 === 0 ? 0 : "16px",
            marginRight: i % 2 === 0 ? "16px" : 0
          }}
        >
          <SourceCard title={card.title} detail={card.detail} />
        </div>
      ))}

      {/* Arrow / connector hint */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "4px 0",
          opacity: 0.3
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 4v14m0 0l-5-5m5 5l5-5"
            stroke={INK}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <ProposalResult />
    </div>
  )
}

// Shared presentational pieces
function SourceCard({ title, detail }: { title: string; detail: string }) {
  return (
    <GlassCard borderRadius="20px">
      <div
        style={{
          padding: "clamp(16px, 2vw, 24px) clamp(20px, 2.5vw, 28px)",
          display: "flex",
          flexDirection: "column",
          gap: "5px"
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "clamp(11px, 1vw, 13px)",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: INK,
            opacity: 0.35
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "clamp(14px, 1.4vw, 17px)",
            fontWeight: 500,
            color: INK,
            opacity: 0.8,
            lineHeight: 1.45
          }}
        >
          {detail}
        </div>
      </div>
    </GlassCard>
  )
}

function ProposalResult() {
  return (
    <GlassCard borderRadius="24px">
      <div style={{ padding: "clamp(24px, 3vw, 34px) clamp(22px, 2.8vw, 32px)" }}>
        <div
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "clamp(11px, 1vw, 13px)",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: INK,
            opacity: 0.35
          }}
        >
          Proposal
        </div>
        <div
          style={{
            fontSize: "clamp(17px, 1.8vw, 22px)",
            fontWeight: 600,
            color: INK,
            lineHeight: 1.25,
            marginTop: "8px"
          }}
        >
          Website redesign + exhibition catalog
        </div>
        <div
          style={{
            fontSize: "clamp(13px, 1.3vw, 16px)",
            fontWeight: 500,
            color: INK,
            opacity: 0.5,
            marginTop: "3px"
          }}
        >
          Gigi&apos;s Art Gallery
        </div>

        {/* Skeleton lines */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "24px"
          }}
        >
          {[85, 100, 100, 60].map((w, i) => (
            <div
              key={i}
              style={{
                height: i === 0 ? "9px" : "7px",
                width: `${w}%`,
                borderRadius: "4px",
                background: INK,
                opacity: 0.08
              }}
            />
          ))}
        </div>

        {/* Status pill */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "22px" }}>
          <button
            type="button"
            onMouseEnter={e => {
              e.currentTarget.style.background = "#d9a0f7"
              e.currentTarget.style.transform = "translateY(-1px)"
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(235, 193, 255, 0.5)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#ebc1ff"
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(235, 193, 255, 0.35)"
            }}
            style={{
              padding: "10px 16px",
              borderRadius: "11px",
              background: "#ebc1ff",
              boxShadow: "0 4px 14px rgba(235, 193, 255, 0.35)",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                stroke={INK}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{ fontSize: "clamp(12px, 1.1vw, 14px)", fontWeight: 600, color: INK }}
            >
              Ready to send
            </span>
          </button>
        </div>
      </div>
    </GlassCard>
  )
}

// Keep the old FRAGMENTS array shape so the scroll animation refs still work
// (StackedDocStage uses 3 refs, the old gooey used 6 — we just need the first 3)
const FRAGMENTS = [
  { x: -150, y: -120, r: -18, w: 86, h: 54 },
  { x: 160, y: -100, r: 14, w: 70, h: 70 },
  { x: -180, y: 70, r: 10, w: 64, h: 64 },
  { x: 140, y: 120, r: -12, w: 90, h: 50 },
  { x: -40, y: -170, r: 6, w: 56, h: 56 },
  { x: 60, y: 170, r: -8, w: 74, h: 46 }
]

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

// Network slide — layered message-card UI showing Yaven in context
function NetworkStage({ mobile }: { mobile?: boolean }) {
  const avatarGradient = "linear-gradient(145deg, #267FE5, #4da3f0, #9e8ec8)"
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mobile || !stageRef.current) return
    const cards = Array.from(
      stageRef.current.querySelectorAll<HTMLElement>("[data-net-card]")
    )
    gsap.set(cards, { y: 40, opacity: 0, scale: 0.95 })
    const st = ScrollTrigger.create({
      trigger: stageRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.2,
          duration: 0.6,
          ease: "back.out(1.4)"
        })
      },
      onLeaveBack: () => {
        gsap.to(cards, {
          y: 40,
          opacity: 0,
          scale: 0.95,
          stagger: { each: 0.08, from: "end" },
          duration: 0.3,
          ease: "power2.in"
        })
      }
    })
    return () => st.kill()
  }, [mobile])

  // Mobile: stacked vertical cards with staggered pop-in
  if (mobile) {
    return (
      <div
        ref={stageRef}
        aria-hidden="true"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          width: "100%",
          maxWidth: "440px",
          margin: "0 auto"
        }}
      >
        {/* Tjalling card */}
        <div data-net-node data-net-card style={{ marginRight: "24px" }}>
          <GlassCard borderRadius="20px">
            <div
              style={{
                padding: "18px",
                display: "flex",
                gap: "14px",
                alignItems: "flex-start"
              }}
            >
              <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: avatarGradient, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 600, color: "#fff" }}>
                TJ
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "15px", fontWeight: 600, color: INK }}>Tjalling</span>
                  <Image src="/logos/gmail.png" alt="" width={16} height={16} style={{ objectFit: "contain", width: "16px", height: "16px" }} />
                </div>
                <p style={{ fontSize: "13px", color: INK, opacity: 0.7, margin: "4px 0 0", lineHeight: 1.45 }}>
                  Following up on our conversation at Design Expo &apos;26.
                  <br />
                  Do you have <strong>availability this week</strong> for a call?
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Yaven response card */}
        <div data-net-node data-net-card style={{ marginLeft: "24px" }}>
          <GlassCard borderRadius="18px">
            <div
              style={{
                padding: "18px",
                display: "flex",
                gap: "12px",
                alignItems: "flex-start"
              }}
            >
              <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "var(--primary)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <Image src="/yaven-logo.webp" alt="Yaven" width={28} height={52} style={{ objectFit: "contain", width: "auto", height: "28px" }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "15px", fontWeight: 600, color: INK }}>Yaven</span>
                </div>
                <p style={{ fontSize: "13px", color: INK, opacity: 0.8, margin: "4px 0 0", lineHeight: 1.5 }}>
                  Tjalling met you at <strong>Design Expo &apos;26</strong>. He works with
                  a mutual, <strong>Oliver Normand</strong>. I drafted a reply
                  with your <span style={{ color: "#267FE5", fontWeight: 500 }}>calendar link</span>.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    )
  }

  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: "min(480px, 85vw)",
        height: "min(520px, 85vw)",
        margin: "clamp(100px, 16vh, 180px) auto 0"
      }}
    >
      {/* Faded app window backdrop */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "85%",
          height: "60%",
          borderRadius: "14px",
          background: "#f5f5f5",
          border: "1px solid rgba(0,0,0,0.08)",
          overflow: "hidden",
          opacity: 0.7
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: "6px", padding: "10px 14px" }}>
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f57" }} />
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#febc2e" }} />
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28c840" }} />
        </div>
        {/* Search bar */}
        <div style={{ margin: "4px 14px", padding: "8px 14px", borderRadius: "8px", background: "rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "18px", height: "18px", borderRadius: "5px", background: INK, opacity: 0.15 }} />
          <span style={{ fontSize: "12px", color: INK, opacity: 0.35 }}>Start typing to ask or search...</span>
        </div>
      </div>

      {/* Main message card — Tjalling */}
      <div
        data-net-node
        style={{
          position: "absolute",
          top: "18%",
          left: "-8%",
          width: "88%",
          zIndex: 2,
          transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
        }}
        onMouseMove={e => {
          const rect = e.currentTarget.getBoundingClientRect()
          const x = (e.clientX - rect.left) / rect.width - 0.5
          const y = (e.clientY - rect.top) / rect.height - 0.5
          e.currentTarget.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)"
        }}
      >
        <GlassCard borderRadius="20px">
          <div
            style={{
              padding: "clamp(16px, 2vw, 22px)",
              display: "flex",
              gap: "14px",
              alignItems: "flex-start"
            }}
          >
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: avatarGradient, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 600, color: "#fff" }}>
              TJ
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "15px", fontWeight: 600, color: INK }}>Tjalling</span>
                <Image src="/logos/gmail.png" alt="" width={16} height={16} style={{ objectFit: "contain", width: "16px", height: "16px" }} />
              </div>
              <p style={{ fontSize: "13px", color: INK, opacity: 0.7, margin: "4px 0 0", lineHeight: 1.45 }}>
                Following up on our conversation at Config.
                <br />
                Do you have <strong>availability this week</strong> for a call?
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Yaven response card */}
      <div
        data-net-node
        style={{
          position: "absolute",
          top: "42%",
          left: "5%",
          width: "85%",
          zIndex: 3,
          transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
        }}
        onMouseMove={e => {
          const rect = e.currentTarget.getBoundingClientRect()
          const x = (e.clientX - rect.left) / rect.width - 0.5
          const y = (e.clientY - rect.top) / rect.height - 0.5
          e.currentTarget.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)"
        }}
      >
        <GlassCard borderRadius="18px">
          <div
            style={{
              padding: "clamp(14px, 1.8vw, 20px)",
              display: "flex",
              gap: "12px",
              alignItems: "flex-start"
            }}
          >
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "var(--primary)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <Image src="/yaven-logo.webp" alt="Yaven" width={28} height={52} style={{ objectFit: "contain", width: "auto", height: "28px" }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "15px", fontWeight: 600, color: INK }}>Yaven</span>
              </div>
              <p style={{ fontSize: "13px", color: INK, opacity: 0.8, margin: "4px 0 0", lineHeight: 1.5 }}>
                Tjalling met you at <strong>Config &apos;26</strong>. He works with
                a mutual, <strong>Oliver Normand</strong>. I drafted a reply
                with your <span style={{ color: "#267FE5", fontWeight: 500 }}>calendar link</span>.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}


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
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
      >
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
                style={{ objectFit: "contain", width: "28px", height: "28px" }}
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
            background: "#E7F1FD",
            overflow: "hidden"
          }}
        >
          {/* Header with avatar */}
          <div
            style={{
              padding: "clamp(28px, 4vw, 40px) clamp(18px, 2.5vw, 28px) 14px",
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
                background:
                  "linear-gradient(145deg, #267FE5, #4da3f0, #9e8ec8)",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: 600,
                color: "#fff"
              }}
            >
              GA
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
                Gigi&apos;s Art Gallery
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

// The conference follow-up card — styled as an identity/badge card
// with a hover tilt effect.
const DRAFTED_BG = "#ebc1ff"

// The gmail "button" that lives inside the follow-up status pill. It sits in
// the red "Needs follow-up" pill, gets pressed on scroll, and reappears in the
// green "drafted" pill.
const fuIconStyle: React.CSSProperties = {
  marginLeft: "auto",
  width: "30px",
  height: "30px",
  borderRadius: "9px",
  background: "#fff",
  boxShadow: "0 3px 10px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0
}

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
        style={{ overflow: "hidden", background: "#E7F1FD" }}
      >
        {/* Badge top strip */}
        <div
          style={{
            background: "linear-gradient(135deg, #057BD5, #4da3f0, #00AFF9)",
            padding: "clamp(22px, 3vw, 32px) clamp(20px, 3vw, 28px)",
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
                fontSize: "var(--fs-body-lg)",
                fontWeight: 600,
                color: "#fff",
                lineHeight: 1.2
              }}
            >
              Ariel Thomas
            </div>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "rgba(255,255,255,0.7)",
                marginTop: "2px"
              }}
            >
              The Design Co.
            </div>
          </div>
        </div>

        {/* Badge body */}
        <div
          style={{
            padding:
              "clamp(24px, 3.5vw, 36px) clamp(20px, 3vw, 28px) clamp(20px, 3vw, 28px)"
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {[
              { label: "Spoke at", value: "Design Expo '26" },
              { label: "Mutual", value: "Asker K." },
              { label: "Talked about", value: "Brand optimisation" }
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

          {/* Follow-up status — the gmail button sits in the red pill, gets
              pressed on scroll, then reappears in the green "drafted" pill
              (driven by the timeline). */}
          <div
            style={{
              position: "relative",
              marginTop: "16px",
              minHeight: "40px"
            }}
          >
            {/* Before: needs follow-up — gmail button lives here */}
            <div
              data-fu-before
              style={{
                position: "absolute",
                inset: 0,
                padding: "7px 8px 7px 14px",
                borderRadius: "12px",
                background: "var(--red)",
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
                  background: "#fff",
                  flexShrink: 0
                }}
              />
              <span
                style={{ fontSize: "13px", fontWeight: 600, color: "#fff" }}
              >
                Needs follow-up
              </span>
              <span data-fu-icon-before style={fuIconStyle} aria-hidden="true">
                <Image
                  src="/logos/gmail.png"
                  alt=""
                  width={16}
                  height={18}
                  style={{
                    objectFit: "contain",
                    width: "16px",
                    height: "16px"
                  }}
                />
              </span>
            </div>

            {/* After: follow-up drafted */}
            <div
              data-fu-after
              style={{
                position: "absolute",
                inset: 0,
                padding: "10px 14px",
                borderRadius: "12px",
                background: DRAFTED_BG,
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
                  background: INK,
                  opacity: 0.4,
                  flexShrink: 0
                }}
              />
              <span
                style={{ fontSize: "13px", fontWeight: 600, color: INK }}
              >
                Follow-up drafted with Yaven
              </span>
            </div>
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
  // crmRef removed — CRM slide replaced with Conference
  const confRef = useRef<HTMLDivElement>(null)
  const networkRef = useRef<HTMLDivElement>(null)
  const headerWrapRef = useRef<HTMLDivElement>(null)
  const fragRefs = useRef<(HTMLDivElement | null)[]>([])
  const mobileStackRef = useRef<HTMLElement>(null)
  const staticLayout = usePrefersReducedMotion()
  const isMobile = useIsMobile()

  // Mobile: the slides use the stacked static layout, but each one fades up as
  // it scrolls into view (reduced motion gets no animation).
  useEffect(() => {
    if (!isMobile || staticLayout || !mobileStackRef.current) return
    ScrollTrigger.refresh()
    const blocks =
      mobileStackRef.current.querySelectorAll<HTMLElement>("[data-reveal]")
    const anims = Array.from(blocks).map(b =>
      gsap.from(b, {
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: b,
          start: "top 82%",
          toggleActions: "play none none reverse"
        }
      })
    )
    return () =>
      anims.forEach(a => {
        a.scrollTrigger?.kill()
        a.kill()
      })
  }, [isMobile, staticLayout])

  useEffect(() => {
    if (staticLayout || !wrapperRef.current) return

    // ── Initial state ───────────────────────────────────────────────────────
    gsap.set(networkRef.current, { y: 60, opacity: 0 })
    const netNodes = networkRef.current
      ? Array.from(
          networkRef.current.querySelectorAll<HTMLElement>("[data-net-node]")
        )
      : []
    netNodes.forEach(n => gsap.set(n, { scale: 0, opacity: 0 }))

    gsap.set(proposalsRef.current, { y: 60, opacity: 0 })
    gsap.set(confRef.current, { y: 60, opacity: 0 })
    // Source cards start scaled down + invisible, pop in via timeline
    fragRefs.current.forEach(f => {
      if (f) gsap.set(f, { scale: 0, opacity: 0 })
    })
    const mergedEl = proposalsRef.current?.querySelector<HTMLElement>(
      "[data-merged-proposal]"
    )
    if (mergedEl) gsap.set(mergedEl, { opacity: 0, scale: 0.85 })

    // Conference card follow-up animation elements
    const conf = confRef.current
    const confCard = conf?.querySelector<HTMLElement>("[data-conf-card]")
    if (confCard) gsap.set(confCard, { scale: 0, opacity: 0 })
    const fuBefore = conf?.querySelector<HTMLElement>("[data-fu-before]")
    const fuAfter = conf?.querySelector<HTMLElement>("[data-fu-after]")
    const fuIcon = conf?.querySelector<HTMLElement>("[data-fu-icon-before]")
    if (fuAfter) gsap.set(fuAfter, { opacity: 0 })

    // ── Scrubbed timeline — phase transitions only ──────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2
      }
    })

    // Phase 0 — Network mapping
    tl.to(
      networkRef.current,
      { y: 0, opacity: 1, ease: "power3.out", duration: 0.8 },
      0
    )
    netNodes.forEach((node, i) => {
      tl.to(
        node,
        {
          scale: 1,
          opacity: 1,
          ease: "back.out(1.5)",
          duration: 0.6
        },
        0.3 + i * 0.12
      )
    })
    tl.to({}, { duration: 2 }) // dwell on network slide
    tl.to(
      networkRef.current,
      { y: -60, opacity: 0, ease: "power2.in", duration: 0.8 },
      ">"
    )

    tl.addLabel("p1")
    tl.to(
      proposalsRef.current,
      { y: 0, opacity: 1, ease: "power3.out", duration: 0.8 },
      "p1"
    )

    // Pop source cards in with stagger — slow and deliberate
    fragRefs.current.forEach((f, i) => {
      if (!f) return
      tl.to(
        f,
        {
          scale: 1,
          opacity: 1,
          ease: "back.out(1.7)",
          duration: 1.2
        },
        `p1+=${0.8 + i * 0.5}`
      )
    })

    // Dwell — let users read the cards
    tl.to({}, { duration: 3.5 })

    // Collapse source cards to center, reveal merged proposal
    tl.addLabel("collapse")
    const mergedAnimEl = proposalsRef.current?.querySelector<HTMLElement>(
      "[data-merged-proposal]"
    )
    fragRefs.current.forEach((f, i) => {
      if (!f) return
      tl.to(
        f,
        {
          rotation: 0,
          scale: 0,
          opacity: 0,
          ease: "back.in(1.4)",
          duration: 0.8
        },
        `collapse+=${i * 0.1}`
      )
    })
    if (mergedAnimEl) {
      tl.to(
        mergedAnimEl,
        {
          opacity: 1,
          scale: 1,
          ease: "back.out(1.7)",
          duration: 0.8
        },
        "collapse+=0.5"
      )
    }
    tl.to({}, { duration: 1.5 })

    tl.to(
      proposalsRef.current,
      { y: -60, opacity: 0, ease: "power2.in", duration: 0.8 },
      ">"
    )
    tl.to(
      confRef.current,
      { y: 0, opacity: 1, ease: "power3.out", duration: 1.2 },
      "<0.3"
    )
    tl.addLabel("confIn")

    // Pop the card in with scale
    if (confCard) {
      tl.to(
        confCard,
        {
          scale: 1,
          opacity: 1,
          ease: "back.out(1.7)",
          duration: 1.2
        },
        "confIn+=0.3"
      )
    }

    // Gmail icon shrinks and slides right, then pill transitions
    if (fuIcon) {
      tl.to(
        fuIcon,
        { scale: 0.6, x: 20, opacity: 0, duration: 0.5, ease: "power2.in" },
        "confIn+=1.8"
      )
    }
    if (fuBefore && fuAfter) {
      tl.to(
        fuBefore,
        { opacity: 0, duration: 0.6, ease: "power2.inOut" },
        "confIn+=2.3"
      )
      tl.to(
        fuAfter,
        { opacity: 1, duration: 0.6, ease: "power2.inOut" },
        "confIn+=2.35"
      )
    }

    tl.to({}, { duration: 3.5 }) // dwell on conference card

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [staticLayout, isMobile])

  const header = (
    <div style={{ textAlign: "center" }}>
      <ScrollCutReveal
        style={{
          fontFamily: "var(--font-instrument-serif)",
          fontSize: "var(--fs-display)",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          lineHeight: 1,
          color: INK,
          margin: 0,
          textAlign: "center"
        }}
      >
        …and who matters.
      </ScrollCutReveal>
    </div>
  )

  // Mobile uses the stacked, non-pinned layout too: the header reads as a
  // normal block above the slides (no overlay collision) and each slide is
  // text-then-card.
  if (staticLayout || isMobile) {
    return (
      <section
        ref={mobileStackRef}
        style={{ background: "var(--cream)", overflow: "clip" }}
      >
        <div>
          {/* Header scrolls normally on mobile (a sticky header overlapped the
              slides / left the notch strip uncovered on iOS). */}
          <div
            style={{
              paddingTop: isMobile
                ? "clamp(48px, 9vh, 90px)"
                : "clamp(80px, 12vh, 140px)",
              paddingBottom: isMobile ? "clamp(8px, 2vh, 20px)" : undefined
            }}
          >
            {header}
          </div>
          <div
            data-reveal
            style={{
              position: "relative",
              padding: "clamp(40px, 6vh, 80px) clamp(28px, 5vw, 48px)",
              overflow: "hidden"
            }}
          >
            <NetworkStage mobile={isMobile} />
            <div style={{ textAlign: isMobile ? "left" : "center", marginTop: "clamp(24px, 4vh, 40px)" }}>
              <h2
                style={{
                  ...subHeadingStyle,
                  textAlign: isMobile ? "left" : "center",
                  color: INK
                }}
              >
                Yaven knows who you know
              </h2>
              <p
                style={{
                  ...bodyStyle,
                  maxWidth: "480px",
                  margin: isMobile ? "14px 0 0" : "14px auto 0",
                  textAlign: isMobile ? "left" : "center"
                }}
              >
                It remembers everyone you&apos;ve met and what you talked
                about. It spots the old client whose project is coming around
                again, the intro you said you&apos;d make, the person worth a
                hello before they forget you, then drafts your messages and
                proposals proactively.
              </p>
            </div>
          </div>
          <div
            data-reveal
            style={{
              ...phaseGridStyle,
              position: "relative",
              padding: "clamp(60px, 9vh, 110px) clamp(28px, 5vw, 48px)"
            }}
          >
            <div>
              <h2 style={subHeadingStyle}>Call ended, proposal ready</h2>
              <p style={bodyStyle}>
                Yaven pulls notes, context, and pricing from your past work and
                drafts a ready-to-send proposal before you close the call.
              </p>
            </div>
            <StackedDocStageMobile />
          </div>
          <div
            data-reveal
            style={{
              ...phaseGridStyle,
              position: "relative",
              padding: isMobile
                ? "clamp(40px, 6vh, 80px) clamp(28px, 5vw, 48px) clamp(40px, 6vh, 80px)"
                : "clamp(60px, 9vh, 110px) clamp(28px, 5vw, 48px) clamp(100px, 15vh, 180px)"
            }}
          >
            <div>
              <h2 style={subHeadingStyle}>
                Conference follow-ups, handled
              </h2>
              <p style={bodyStyle}>
                It finds their work, your mutual connections, and drafts a
                follow-up in your voice before the connection goes cold.
              </p>
            </div>
            <ConferenceCard animated={false} />
          </div>
        </div>
        <div
          data-reveal
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: isMobile ? "auto" : "100vh",
            padding: isMobile
              ? "clamp(60px, 10vh, 100px) clamp(28px, 5vw, 48px)"
              : "0 clamp(28px, 5vw, 48px)",
            width: "100%"
          }}
        >
          <FinaleContent />
        </div>
      </section>
    )
  }

  return (
    <>
      <div
        ref={wrapperRef}
        style={{
          position: "relative",
          height: "750vh",
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
          {/* Intro header — overlays the top, slides away as examples begin */}
          <div
            ref={headerWrapRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 5,
              paddingTop: "clamp(48px, 8vh, 90px)",
              pointerEvents: "none"
            }}
          >
            {header}
          </div>

          <div style={{ position: "relative", flex: 1 }}>
            {/* Phase 0 — Network mapping (split layout) */}
            <div ref={networkRef} style={phaseGridStyle}>
              <NetworkStage />
              <div>
                <h2 style={subHeadingStyle}>
                  Yaven knows who you know
                </h2>
                <p style={bodyStyle}>
                  It remembers everyone you&apos;ve met and what you talked
                  about. It spots the old client whose project is coming around
                  again, the intro you said you&apos;d make, the person worth a
                  hello before they forget you, then drafts your messages and
                  proposals proactively.
                </p>
              </div>
            </div>

            {/* Phase 1 — Proposals */}
            <div ref={proposalsRef} style={phaseGridStyle}>
              <StackedDocStage fragRefs={fragRefs} merged={false} />
              <div>
                <h2 style={subHeadingStyle}>Call ended, proposal ready</h2>
                <p style={bodyStyle}>
                  Yaven pulls notes, context, and pricing from your past work
                  and drafts a ready-to-send proposal before you close the call.
                </p>
              </div>
            </div>

            {/* Phase 2 — Conference follow-up */}
            <div ref={confRef} style={phaseGridStyle}>
              <div>
                <h2 style={subHeadingStyle}>Conference follow-ups, handled</h2>
                <p style={bodyStyle}>
                  It finds their work, your mutual connections, and drafts a
                  follow-up in your voice before the connection goes cold.
                </p>
              </div>
              <div data-conf-card>
                <ConferenceCard animated />
              </div>
            </div>
          </div>
        </section>
      </div>

      <ProposalsFinaleSection />
    </>
  )
}

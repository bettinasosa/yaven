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
  fontSize: "clamp(32px, 4.5vw, 64px)",
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
  fontSize: "clamp(26px, 3.6vw, 46px)",
  fontWeight: 700,
  letterSpacing: "-0.03em",
  lineHeight: 1.12,
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

// Network slide — layered message-card UI showing Yaven in context
function NetworkStage() {
  const avatarGradient = "linear-gradient(145deg, #267FE5, #4da3f0, #9e8ec8)"

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
          left: 0,
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
          top: "48%",
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
            <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "conic-gradient(from 140deg, #e8956a, #c87dba, #6ab8f8, #e8956a)", flexShrink: 0, opacity: 0.85 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: "13px", color: INK, opacity: 0.8, margin: 0, lineHeight: 1.5 }}>
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
                fontSize: "clamp(17px, 1.8vw, 20px)",
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
              { label: "Spoke at", value: "Config '26" },
              { label: "Mutual", value: "Oliver Normand" },
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

          {/* Follow-up status — flips from "needs follow-up" to "drafted"
              as a Gmail bubble passes through (driven by the timeline). */}
          <div
            style={{
              position: "relative",
              marginTop: "16px",
              minHeight: "40px"
            }}
          >
            {/* Before: needs follow-up */}
            <div
              data-fu-before
              style={{
                position: "absolute",
                inset: 0,
                padding: "10px 14px",
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
            </div>

            {/* After: follow-up drafted (green) */}
            <div
              data-fu-after
              style={{
                position: "absolute",
                inset: 0,
                padding: "10px 14px",
                borderRadius: "12px",
                background: GREEN,
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
                  background: "#fff",
                  flexShrink: 0
                }}
              />
              <span
                style={{ fontSize: "13px", fontWeight: 600, color: "#fff" }}
              >
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
                  right: "5px",
                  top: "50%",
                  marginTop: "-16px",
                  width: "32px",
                  height: "32px",
                  borderRadius: "9px",
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
                  width={16}
                  height={18}
                  style={{
                    objectFit: "contain",
                    width: "16px",
                    height: "16px"
                  }}
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
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
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
    gsap.set(confRef.current, { y: "100vh", opacity: 0 })
    fragRefs.current.forEach((f, i) => {
      if (f)
        gsap.set(f, {
          x: FRAGMENTS[i].x,
          y: FRAGMENTS[i].y,
          rotation: FRAGMENTS[i].r
        })
    })

    const p2Shell = confRef.current?.querySelector<HTMLElement>(
      '[data-card-shell="p2"]'
    )
    if (p2Shell)
      gsap.set(p2Shell, {
        y: "75vh",
        scale: 0.08,
        transformOrigin: "center center"
      })
    const p2Inner = confRef.current?.querySelector<HTMLElement>(
      '[data-card-inner="p2"]'
    )
    if (p2Inner)
      gsap.set(p2Inner, {
        scale: 0.08,
        transformOrigin: "center center",
        backgroundColor: "#fff"
      })

    // Conference card follow-up animation elements
    const conf = confRef.current
    const fuBefore = conf?.querySelector<HTMLElement>("[data-fu-before]")
    const fuAfter = conf?.querySelector<HTMLElement>("[data-fu-after]")
    const fuBubble = conf?.querySelector<HTMLElement>("[data-fu-bubble]")
    if (fuAfter) gsap.set(fuAfter, { opacity: 0 })
    if (fuBubble) gsap.set(fuBubble, { opacity: 0, x: 60, scale: 0.6 })

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
        `p1+=${0.8 + i * 0.12}`
      )
    })
    tl.to({}, { duration: 0.8 })

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

    // Gmail bubble + follow-up status flip — scrubbed
    if (fuBefore && fuAfter && fuBubble) {
      tl.to(
        fuBubble,
        { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: "power2.out" },
        "confIn+=0.9"
      )
      tl.to(
        fuBefore,
        { opacity: 0, duration: 0.6, ease: "power2.in" },
        "confIn+=1.7"
      )
      tl.to(
        fuAfter,
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "confIn+=1.9"
      )
      tl.to(
        fuBubble,
        { opacity: 0, scale: 0.4, duration: 0.5, ease: "power2.in" },
        "confIn+=2.1"
      )
    }

    tl.to({}, { duration: 3.5 }) // dwell on conference card

    // ── Auto-play card-reveal + content animations ──────────────────────────
    const tlDur = tl.duration()
    const wrapperH = wrapperRef.current.scrollHeight

    // Convert a label position (minus an offset so we fire slightly early,
    // as the card starts sliding in rather than after it lands).
    const scrollPx = (label: string, offsetUnits = 0) =>
      Math.round((((tl.labels[label] ?? 0) + offsetUnits) / tlDur) * wrapperH)

    // Prevent/restore scroll-wheel & touch during a card animation so the user
    // must wait for the sequence to finish before continuing down.
    const noop = (e: Event) => e.preventDefault()
    const lockScroll = () => {
      window.addEventListener("wheel", noop, { passive: false })
      window.addEventListener("touchmove", noop, { passive: false })
    }
    const unlockScroll = () => {
      window.removeEventListener("wheel", noop)
      window.removeEventListener("touchmove", noop)
    }

    // Blue rises → white covers → E7F1FD.  Fast — timed to land as the card
    // text finishes sliding in.
    const buildReveal = (shell: HTMLElement, inner: HTMLElement) => {
      const t = gsap.timeline({ paused: true })
      t.to(shell, { y: 0, scale: 1, ease: "back.out(1.4)", duration: 0.48 }, 0)
      t.to(inner, { scale: 1, ease: "back.out(1.7)", duration: 0.38 }, 0.26)
      t.set(shell, { backgroundColor: "rgba(0,0,0,0)" }, 0.64)
      t.to(
        inner,
        { backgroundColor: "#E7F1FD", duration: 0.22, ease: "power2.inOut" },
        0.64
      )
      return t
    }

    let confRevealTl: gsap.core.Timeline | null = null

    const confSt =
      p2Shell && p2Inner
        ? ScrollTrigger.create({
            trigger: wrapperRef.current,
            start: `top+=${scrollPx("confIn", -1.0)}px top`,
            once: true,
            onEnter: () => {
              lockScroll()
              confRevealTl = buildReveal(p2Shell, p2Inner)
              confRevealTl.call(unlockScroll, [], 5.5)
              confRevealTl.play()
            }
          })
        : null

    return () => {
      unlockScroll()
      tl.scrollTrigger?.kill()
      tl.kill()
      confRevealTl?.kill()
      confSt?.kill()
    }
  }, [staticLayout, isMobile])

  const header = (
    <div style={{ textAlign: "center" }}>
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
            <NetworkStage />
            <div style={{ textAlign: "center", marginTop: "clamp(24px, 4vh, 40px)" }}>
              <h2
                style={{
                  ...subHeadingStyle,
                  textAlign: "center",
                  color: INK
                }}
              >
                Yaven remembers everyone you&apos;ve met and what you talked about.
              </h2>
              <p
                style={{
                  ...bodyStyle,
                  maxWidth: "480px",
                  margin: "14px auto 0",
                  textAlign: "center"
                }}
              >
                It spots the old client whose project is coming around again,
                the intro you said you&apos;d make, the person worth a hello
                before they forget you, and drafts the message before
                you&apos;ve thought of it. You stay top of mind without keeping
                a spreadsheet.
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
            <GooeyStage fragRefs={fragRefs} merged />
          </div>
          <div
            data-reveal
            style={{
              ...phaseGridStyle,
              position: "relative",
              padding:
                "clamp(60px, 9vh, 110px) clamp(28px, 5vw, 48px) clamp(100px, 15vh, 180px)"
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
            minHeight: "100vh",
            padding: "0 clamp(28px, 5vw, 48px)",
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
                  Yaven remembers everyone you&apos;ve met and what you talked about.
                </h2>
                <p style={bodyStyle}>
                  It spots the old client whose project is coming around again,
                  the intro you said you&apos;d make, the person worth a hello
                  before they forget you, and drafts the message before
                  you&apos;ve thought of it. You stay top of mind without
                  keeping a spreadsheet.
                </p>
              </div>
            </div>

            {/* Phase 1 — Proposals */}
            <div ref={proposalsRef} style={phaseGridStyle}>
              <GooeyStage fragRefs={fragRefs} merged={false} />
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
              <div
                data-card-shell="p2"
                style={{
                  position: "relative",
                  background: "#267FE5",
                  borderRadius: "32px"
                }}
              >
                <div
                  data-card-inner="p2"
                  style={{ background: "#fff", borderRadius: "32px" }}
                >
                  <ConferenceCard animated />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <ProposalsFinaleSection />
    </>
  )
}

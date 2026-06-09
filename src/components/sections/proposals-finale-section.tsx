"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"
import { useIsMobile } from "@/components/effects/use-is-mobile"

gsap.registerPlugin(ScrollTrigger)

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

function Em({ children }: { children: React.ReactNode }) {
  return (
    <i
      style={{
        fontFamily: "var(--font-instrument-serif)",
        fontWeight: 500,
        fontStyle: "italic"
      }}
    >
      {children}
    </i>
  )
}

function AppIcon({ name, tilt }: { name: string; tilt: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "26px",
        height: "26px",
        borderRadius: "7px",
        background: "rgba(10,14,26,0.07)",
        border: "1px solid rgba(10,14,26,0.08)",
        verticalAlign: "middle",
        margin: "0 6px",
        flexShrink: 0,
        position: "relative",
        top: "-1px",
        transform: `rotate(${tilt}deg) translateY(${hovered ? "-5px" : "0px"})`,
        transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
        cursor: "default"
      }}
    >
      <Image
        src={`/logos/${name}.png`}
        alt={name}
        width={16}
        height={16}
        style={{ objectFit: "contain" }}
      />
    </span>
  )
}

export function FinaleContent({
  underlineDrawn = false
}: {
  underlineDrawn?: boolean
}) {
  const paraStyle: React.CSSProperties = {
    ...bodyStyle,
    margin: 0,
    opacity: 1,
    lineHeight: 1.85,
    textAlign: "left",
    width: "100%",
    maxWidth: "none"
  }

  // Each mask wrapper clips its child; the child slides up from below on enter.
  const clip: React.CSSProperties = { overflow: "clip", width: "100%" }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "min(600px, 90%)",
        margin: "0 auto"
      }}
    >
      <div style={clip}>
        <h2
          data-mask-inner
          style={{ ...headlineStyle, textAlign: "left", margin: 0 }}
        >
          … so you focus on the work{" "}
          <span
            className={`triage-underline triage-underline-lg${underlineDrawn ? " is-visible" : ""}`}
            style={{ backgroundImage: "linear-gradient(#df4f3e, #df4f3e)" }}
          >
            only you can do
          </span>
          .
        </h2>
      </div>

      {/* spacer — outside clip containers so translateY doesn't fight clip height */}
      <div style={{ height: "clamp(20px, 3vh, 32px)", flexShrink: 0 }} />

      <div style={clip}>
        <p data-mask-inner style={paraStyle}>
          That was just a few examples. Yaven <Em>triages</Em> your inbox
          <AppIcon name="gmail" tilt={-8} />
          <Em>clears</Em> your docs
          <AppIcon name="notion" tilt={6} />
          <AppIcon name="excel" tilt={-5} />
          <Em>logs</Em> your calls
          <AppIcon name="granola" tilt={9} />
          <Em>updates</Em> your CRM
          <AppIcon name="hubspot" tilt={-7} />
          <AppIcon name="salesforce" tilt={5} />
          <Em>tracks</Em> your projects
          <AppIcon name="asana" tilt={7} />
          <AppIcon name="monday" tilt={-6} />
          <Em>monitors</Em> your ads
          <AppIcon name="googleads" tilt={8} />
          <AppIcon name="googleanalytics" tilt={-5} />
          and <Em>grows</Em> your network
          <AppIcon name="linkedin" tilt={7} />
          <AppIcon name="google" tilt={-8} />
        </p>
      </div>

      <div style={{ height: "clamp(20px, 3vh, 32px)", flexShrink: 0 }} />

      <div style={clip}>
        <p
          data-mask-inner
          style={{
            ...bodyStyle,
            margin: 0,
            opacity: 0.6,
            textAlign: "left",
            width: "100%",
            maxWidth: "none"
          }}
        >
          Let Yaven handle the noise, while you handle the rest.
        </p>
      </div>
    </div>
  )
}

// Sticky finale panel — sits below the pinned scroll section. Text lines
// reveal with a mask-slide animation as the section scrolls into view.
export function ProposalsFinaleSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const staticLayout = usePrefersReducedMotion()
  const isMobile = useIsMobile()

  useEffect(() => {
    if (staticLayout || !innerRef.current) return

    const inner = innerRef.current
    const lines = Array.from(
      inner.querySelectorAll<HTMLElement>("[data-mask-inner]")
    )
    const underlines = Array.from(
      inner.querySelectorAll<HTMLElement>(".triage-underline")
    )

    gsap.set(lines, { y: "110%" })

    const st = ScrollTrigger.create({
      trigger: inner,
      start: "top 78%",
      onEnter: () => {
        gsap.to(lines, {
          y: "0%",
          stagger: 0.1,
          duration: 0.78,
          ease: "power3.out"
        })
        gsap.delayedCall(0.55, () =>
          underlines.forEach(el => el.classList.add("is-visible"))
        )
      },
      onLeaveBack: () => {
        gsap.to(lines, {
          y: "110%",
          stagger: { each: 0.06, from: "end" },
          duration: 0.42,
          ease: "power2.in"
        })
        underlines.forEach(el => el.classList.remove("is-visible"))
      }
    })

    return () => st.kill()
  }, [staticLayout, isMobile])

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        height: "170vh",
        background: "var(--cream)"
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
          padding: "clamp(80px, 14vh, 160px) clamp(28px, 5vw, 48px)"
        }}
      >
        <div ref={innerRef}>
          <FinaleContent />
        </div>
      </div>
    </div>
  )
}

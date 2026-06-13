"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"
import { useIsMobile } from "@/components/effects/use-is-mobile"

gsap.registerPlugin(ScrollTrigger)

const INK = "#0a0e1a"

const bodyStyle: React.CSSProperties = {
  fontSize: "var(--fs-body-lg)",
  fontWeight: 500,
  lineHeight: 1.45,
  color: INK,
  opacity: 0.8,
  margin: "18px 0 0",
  maxWidth: "480px"
}

function UniBadge({ name, logo }: { name: string; logo: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "3px 9px 3px 5px",
        borderRadius: "16px",
        background: "rgba(10,14,26,0.05)",
        border: "1px solid rgba(10,14,26,0.08)",
        fontSize: "clamp(11px, 1.1vw, 13px)",
        fontWeight: 600,
        color: INK,
        opacity: 0.85,
        verticalAlign: "middle",
        margin: "0 2px",
        transform: `translateY(${hovered ? "-3px" : "0px"})`,
        transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
        cursor: "default"
      }}
    >
      <Image
        src={`/logos/${logo}.png`}
        alt={name}
        width={14}
        height={14}
        style={{
          objectFit: "contain",
          width: "14px",
          height: "14px",
          borderRadius: "2px"
        }}
      />
      {name}
    </span>
  )
}

function Em({ children }: { children: React.ReactNode }) {
  return (
    <em
      style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontStyle: "italic",
        fontWeight: 700,
        color: INK
      }}
    >
      {children}
    </em>
  )
}

export function FinaleContent() {
  const bioStyle: React.CSSProperties = {
    ...bodyStyle,
    margin: 0,
    opacity: 1,
    color: INK,
    lineHeight: 1.7,
    textAlign: "left",
    width: "100%",
    maxWidth: "none",
    fontSize: "var(--fs-body)"
  }

  const clip: React.CSSProperties = { overflow: "clip", width: "100%" }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "min(640px, 90%)",
        margin: "0 auto",
        gap: "clamp(16px, 2.5vh, 24px)"
      }}
    >
      <div style={clip}>
        <h3
          data-mask-inner
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontSize: "var(--fs-display)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: INK,
            margin: "0 0 clamp(8px, 1.5vh, 16px)"
          }}
        >
          ...so, who&apos;s building this?
        </h3>
      </div>

      <div style={clip}>
        <p data-mask-inner style={bioStyle}>
          A small team from{" "}
          <UniBadge name="Imperial" logo="imperial" />,{" "}
          <UniBadge name="MIT" logo="mit" /> and{" "}
          <UniBadge name="Oxford" logo="oxford" />. Between us:{" "}
          <Em>digital twins</Em> running in production from Indian roads to US
          power grids, AI agent infrastructure built for{" "}
          <Em>a hedge fund</Em>, product design awards and work exhibited at
          the <Em>Design Museum London</Em>, two stints as founding engineers,
          and a freelance practice grown from zero to{" "}
          <Em>$20k MRR</Em> in months. We were the customer first. We onboard
          every tester ourselves.
        </p>
      </div>
    </div>
  )
}

// Sticky finale panel with mask-slide animation.
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
    gsap.set(lines, { y: "110%" })

    const st = ScrollTrigger.create({
      trigger: inner,
      start: "top 78%",
      onEnter: () => {
        gsap.to(lines, {
          y: "0%",
          stagger: 0.08,
          duration: 0.72,
          ease: "power3.out"
        })
      },
      onLeaveBack: () => {
        gsap.to(lines, {
          y: "110%",
          stagger: { each: 0.05, from: "end" },
          duration: 0.38,
          ease: "power2.in"
        })
      }
    })

    return () => st.kill()
  }, [staticLayout, isMobile])

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        height: "220vh",
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
          padding: "clamp(60px, 10vh, 120px) clamp(28px, 5vw, 48px)"
        }}
      >
        <div ref={innerRef}>
          <FinaleContent />
        </div>
      </div>
    </div>
  )
}

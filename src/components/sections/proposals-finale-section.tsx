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
  fontSize: "clamp(16px, 1.9vw, 22px)",
  fontWeight: 500,
  lineHeight: 1.45,
  color: INK,
  opacity: 0.8,
  margin: "18px 0 0",
  maxWidth: "480px"
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
        style={{ objectFit: "contain", width: "16px", height: "16px" }}
      />
    </span>
  )
}

function UniBadge({ name, logo }: { name: string; logo: string }) {
  return (
    <span
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
        opacity: 0.6,
        verticalAlign: "middle",
        margin: "0 2px"
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

export function FinaleContent() {
  const paraStyle: React.CSSProperties = {
    ...bodyStyle,
    margin: 0,
    opacity: 1,
    lineHeight: 1.85,
    textAlign: "left",
    width: "100%",
    maxWidth: "none"
  }

  const bioStyle: React.CSSProperties = {
    ...bodyStyle,
    margin: 0,
    opacity: 0.75,
    lineHeight: 1.7,
    textAlign: "left",
    width: "100%",
    maxWidth: "none",
    fontSize: "clamp(15px, 1.6vw, 19px)"
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
      {/* Team heading */}
      <div style={clip}>
        <h3
          data-mask-inner
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontSize: "clamp(24px, 3vw, 40px)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: INK,
            margin: 0
          }}
        >
          ...so who is building Yaven?
        </h3>
      </div>

      {/* Betts */}
      <div style={clip}>
        <p data-mask-inner style={bioStyle}>
          <strong style={{ color: INK, opacity: 0.9 }}>Betts</strong>{" "}
          <a
            href="https://www.bettinasosa.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: INK,
              opacity: 0.4,
              textDecoration: "none",
              fontSize: "clamp(11px, 1vw, 13px)",
              fontWeight: 500,
              borderBottom: "1px solid rgba(10,14,26,0.2)"
            }}
          >
            bettinasosa.com ↗
          </a>
          <br />
          Design engineer. <UniBadge name="Imperial" logo="imperial" /> MEng.
          Creative Conscience Gold + Silver. Founding engineer twice, Head of
          Engineering, then grew her freelance practice to $20k+ MRR in a year.
          Those systems became Yaven. She designed every pixel you&apos;re
          scrolling.
        </p>
      </div>

      {/* Nick */}
      <div style={clip}>
        <p data-mask-inner style={bioStyle}>
          <strong style={{ color: INK, opacity: 0.9 }}>Nick</strong>
          <br />
          AI infrastructure. <UniBadge
            name="Imperial"
            logo="imperial"
          /> then <UniBadge name="MIT" logo="mit" /> (only student selected from
          his year). Digital twins in production across three countries. AI
          agent infra for a hedge fund. Now building a twin of your working
          life.
        </p>
        <p
          data-mask-inner
          style={{ ...bioStyle, marginTop: "8px", opacity: 0.45 }}
        >
          4,000 vinyl records. DJ sets on three continents. We take taste
          seriously.
        </p>
      </div>

      {/* Closing */}
      <div style={clip}>
        <p data-mask-inner style={{ ...bioStyle, opacity: 0.45 }}>
          We were the customer before we were the company. We onboard every
          tester ourselves.
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

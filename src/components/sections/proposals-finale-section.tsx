"use client"

import { useEffect, useRef } from "react"
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

// Big logo strip. The marks are wildly different shapes (Imperial is a wide
// wordmark, MIT a monogram), so they sit bare on the cream — no cards —
// each normalised by its own max-height rather than a shared size.
const UNIS: {
  name: string
  logo: string
  w: number
  h: number
  maxH: string
  radius?: number
}[] = [
  { name: "Imperial", logo: "imperial", w: 1290, h: 142, maxH: "20px" },
  { name: "MIT", logo: "mit", w: 384, h: 199, maxH: "42px" }
]

function UniLogo({ name, logo, w, h, maxH, radius }: (typeof UNIS)[number]) {
  return (
    <div
      onMouseEnter={e => {
        const img = e.currentTarget.querySelector("img")
        if (img) img.style.transform = "translateY(-3px)"
      }}
      onMouseLeave={e => {
        const img = e.currentTarget.querySelector("img")
        if (img) img.style.transform = ""
      }}
      style={{
        flex: "1 1 0",
        minWidth: 0,
        height: "clamp(72px, 10vw, 92px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 clamp(8px, 2vw, 24px)",
        cursor: "default"
      }}
    >
      <Image
        src={`/logos/${logo}.png`}
        alt={name}
        width={w}
        height={h}
        style={{
          objectFit: "contain",
          width: "auto",
          height: "auto",
          maxHeight: maxH,
          maxWidth: "100%",
          borderRadius: radius ? `${radius}px` : undefined,
          transition: "transform 0.28s cubic-bezier(0.34,1.56,0.64,1)"
        }}
      />
    </div>
  )
}

function Em({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="finale-em"
      style={{
        backgroundImage: "linear-gradient(var(--red), var(--red))",
        backgroundSize: "100% 2px",
        backgroundPosition: "0 100%",
        backgroundRepeat: "no-repeat",
        transition: "background-size 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
        paddingBottom: "2px",
        cursor: "default"
      }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundSize = "0% 2px"
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundSize = "100% 2px"
      }}
    >
      {children}
    </span>
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
          So, who&apos;s building this?
        </h3>
      </div>

      <div style={clip}>
        <div
          data-mask-inner
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            margin: "clamp(8px, 1.5vh, 16px) 0"
          }}
        >
          {UNIS.map(u => (
            <UniLogo key={u.name} {...u} />
          ))}
        </div>
      </div>

      <div style={clip}>
        <p data-mask-inner style={bioStyle}>
          We&apos;re a small team of former Imperial and MIT researchers.
          Between us: <i>digital twin research</i> in Q1 journals,{" "}
          <Em>AI agent infrastructure in production</Em> across multiple
          startups and an asset management firm, <b>product design awards</b>{" "}
          and work exhibited at the <i>Design Museum London</i>, two stints as
          founding engineers, and a freelance practice grown from zero
          to <b>$20k MRR</b> in months; <Em>we were the customer first</Em>.
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

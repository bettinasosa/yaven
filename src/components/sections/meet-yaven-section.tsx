"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"

gsap.registerPlugin(ScrollTrigger)

const BODY = [
  "An AI that already knows your work.",
  "Yaven lives in your menu bar, ready whenever you need. It drafts replies, preps for calls, and handles follow-ups before you think to ask. No new tabs, apps, or chat boxes.",
  "Allowing you to focus on work that actually needs you."
]

const SATELLITES = [
  { x: -125, y: -95, w: 58, h: 58, round: true },
  { x: 130, y: -70, w: 72, h: 46, round: false },
  { x: -140, y: 65, w: 48, h: 48, round: true },
  { x: 105, y: 110, w: 80, h: 50, round: false },
  { x: -25, y: -150, w: 40, h: 40, round: true }
]

const CORE_SIZE = 120

const headingStyle: React.CSSProperties = {
  fontFamily: "var(--font-instrument-serif)",
  fontSize: "clamp(40px, 6vw, 80px)",
  fontWeight: 500,
  letterSpacing: "-0.02em",
  lineHeight: 1,
  color: "var(--cream)",
  margin: "0 0 40px"
}

const bodyTextStyle: React.CSSProperties = {
  fontSize: "clamp(18px, 2vw, 24px)",
  fontWeight: 500,
  lineHeight: 1.5,
  color: "var(--cream)"
}

// The SVG filter handles the satellite blobs + proxy core:
//   - Gooey threshold (organic merge)
//   - Glass fill (semi-transparent white tint via feFlood)
//   - Rim highlight (feMorphology edge detection)
// The real glass core is a separate .glass-btn element layered on top.
function GlassGooFilter() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute" }}
      aria-hidden="true"
    >
      <defs>
        <filter
          id="yv-glass-goo"
          x="-40%"
          y="-40%"
          width="180%"
          height="180%"
          colorInterpolationFilters="sRGB"
        >
          {/* Gooey threshold mask from fully-opaque white shapes */}
          <feGaussianBlur in="SourceGraphic" stdDeviation="11" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
            result="goo-mask"
          />
          {/* Glass body: translucent white fill — matches glass-btn background */}
          <feFlood floodColor="white" floodOpacity="0.35" result="body-fill" />
          <feComposite
            in="body-fill"
            in2="goo-mask"
            operator="in"
            result="glass-body"
          />
          {/* Inner glow: soft white core for depth */}
          <feGaussianBlur
            in="goo-mask"
            stdDeviation="6"
            result="inner-glow-blur"
          />
          <feFlood floodColor="white" floodOpacity="0.2" result="glow-fill" />
          <feComposite
            in="glow-fill"
            in2="inner-glow-blur"
            operator="in"
            result="inner-glow"
          />
          {/* Specular sweep: angled light for glass reflection */}
          <feSpecularLighting
            in="goo-mask"
            surfaceScale="5"
            specularConstant="1.8"
            specularExponent="20"
            lightingColor="white"
            result="specular"
          >
            <feDistantLight azimuth="305" elevation="50" />
          </feSpecularLighting>
          <feComposite
            in="specular"
            in2="goo-mask"
            operator="in"
            result="specular-clipped"
          />
          <feColorMatrix
            in="specular-clipped"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.55 0"
            result="specular-dimmed"
          />
          {/* Rim highlight: bright edge ring — thicker for glass feel */}
          <feMorphology
            in="goo-mask"
            operator="erode"
            radius="2"
            result="inner-mask"
          />
          <feComposite
            in="goo-mask"
            in2="inner-mask"
            operator="out"
            result="rim-mask"
          />
          <feFlood floodColor="white" floodOpacity="0.75" result="rim-fill" />
          <feComposite
            in="rim-fill"
            in2="rim-mask"
            operator="in"
            result="glass-rim"
          />
          {/* Shadow beneath for depth */}
          <feGaussianBlur in="goo-mask" stdDeviation="8" result="shadow-blur" />
          <feOffset in="shadow-blur" dx="0" dy="4" result="shadow-offset" />
          <feFlood
            floodColor="black"
            floodOpacity="0.12"
            result="shadow-fill"
          />
          <feComposite
            in="shadow-fill"
            in2="shadow-offset"
            operator="in"
            result="shadow"
          />
          {/* Merge: shadow + body + inner glow + specular + rim */}
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="glass-body" />
            <feMergeNode in="inner-glow" />
            <feMergeNode in="specular-dimmed" />
            <feMergeNode in="glass-rim" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  )
}

function PresenceStage({
  proxyRef,
  satRefs,
  glassRef,
  settled
}: {
  proxyRef: React.RefObject<HTMLDivElement | null>
  satRefs: React.RefObject<(HTMLDivElement | null)[]>
  glassRef: React.RefObject<HTMLDivElement | null>
  settled: boolean
}) {
  const stageStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }

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
      <GlassGooFilter />

      {/* Layer 1: gooey filter — proxy core + satellites (all solid white for threshold) */}
      <div style={{ ...stageStyle, filter: "url(#yv-glass-goo)" }}>
        {/* Proxy core: same size as the glass core, merged with satellites via goo */}
        <div ref={proxyRef}>
          <div
            style={{
              width: `${CORE_SIZE}px`,
              height: `${CORE_SIZE}px`,
              borderRadius: "50%",
              background: "#fff"
            }}
          />
        </div>

        {SATELLITES.map((s, i) => (
          <div
            key={i}
            ref={el => {
              satRefs.current[i] = el
            }}
            style={{
              position: "absolute",
              width: `${s.w}px`,
              height: `${s.h}px`,
              borderRadius: s.round ? "50%" : "14px",
              background: "#fff",
              transform: settled
                ? "translate(0,0) scale(0.4)"
                : `translate(${s.x}px,${s.y}px)`
            }}
          />
        ))}
      </div>

      {/* Layer 2: real glass core using .glass-btn — sits on top of the proxy */}
      <div style={{ ...stageStyle, pointerEvents: "none" }}>
        <div
          ref={glassRef}
          className="glass-btn"
          style={{
            // override pill defaults to be a fixed circle
            width: `${CORE_SIZE}px`,
            height: `${CORE_SIZE}px`,
            borderRadius: "50%",
            fontSize: "14px", // em base for the glass-btn box-shadow values
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "9px",
            flexDirection: "row"
          }}
        >
          {/* Three white dots — the menu-bar presence indicator */}
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="yv-chip-float"
              style={{
                display: "block",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#fff",
                boxShadow: "0 0 6px rgba(255,255,255,0.6)",
                padding: 0,
                animationDelay: `${i * 0.45}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function MeetYavenSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const paraRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const proxyRef = useRef<HTMLDivElement>(null) // gooey proxy core
  const satRefs = useRef<(HTMLDivElement | null)[]>([])
  const glassRef = useRef<HTMLDivElement>(null) // glass-btn core
  const staticLayout = usePrefersReducedMotion()

  useEffect(() => {
    if (staticLayout || !wrapperRef.current) return

    gsap.set(headingRef.current, { y: 50, opacity: 0 })
    paraRefs.current.forEach(p => p && gsap.set(p, { y: 36, opacity: 0 }))
    gsap.set([proxyRef.current, glassRef.current], { scale: 0 })
    satRefs.current.forEach(
      s => s && gsap.set(s, { x: 0, y: 0, scale: 0.4, opacity: 0 })
    )

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2
      }
    })

    tl.to(
      headingRef.current,
      { y: 0, opacity: 1, ease: "power3.out", duration: 1 },
      0
    )

    // P1 — core appears (both layers in sync)
    tl.to(
      paraRefs.current[0],
      { y: 0, opacity: 1, ease: "power3.out", duration: 1.2 },
      1.2
    )
    tl.to(
      [proxyRef.current, glassRef.current],
      { scale: 1, ease: "back.out(1.6)", duration: 1.2 },
      1.4
    )

    // P2 — satellites split out
    tl.to(
      paraRefs.current[1],
      { y: 0, opacity: 1, ease: "power3.out", duration: 1.2 },
      3.2
    )
    satRefs.current.forEach((s, i) => {
      if (!s) return
      const sat = SATELLITES[i]
      tl.to(s, { opacity: 1, duration: 0.1 }, 3.4 + i * 0.25)
      tl.to(
        s,
        { x: sat.x, y: sat.y, scale: 1, ease: "power2.inOut", duration: 1.3 },
        3.45 + i * 0.25
      )
    })

    // P3 — everything melts back
    tl.to(
      paraRefs.current[2],
      { y: 0, opacity: 1, ease: "power3.out", duration: 1.2 },
      5.8
    )
    satRefs.current.forEach((s, i) => {
      if (!s) return
      tl.to(
        s,
        { x: 0, y: 0, scale: 0.4, ease: "power2.inOut", duration: 1.3 },
        6.1 + i * 0.15
      )
    })
    tl.to(
      [proxyRef.current, glassRef.current],
      { scale: 1.12, ease: "power2.out", duration: 0.9 },
      7.2
    )

    tl.to({}, { duration: 1.4 })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [staticLayout])

  const content = (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        alignItems: "center",
        gap: "clamp(40px, 6vw, 80px)",
        width: "100%"
      }}
    >
      <div>
        <h2 ref={headingRef} style={headingStyle}>
          Meet Yaven.
        </h2>
        <div style={bodyTextStyle}>
          {BODY.map((para, pi) => (
            <p
              key={pi}
              ref={el => {
                paraRefs.current[pi] = el
              }}
              style={{ margin: pi === 0 ? 0 : "1.1em 0 0" }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>

      <PresenceStage
        proxyRef={proxyRef}
        satRefs={satRefs}
        glassRef={glassRef}
        settled={!!staticLayout}
      />
    </div>
  )

  if (staticLayout) {
    return (
      <section
        style={{
          position: "relative",
          background: "var(--primary)",
          padding: "clamp(220px, 30vh, 360px) clamp(28px, 5vw, 48px) clamp(120px, 18vh, 220px)",
          overflow: "hidden"
        }}
      >
        {content}
      </section>
    )
  }

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        height: "350vh",
        background: "var(--primary)"
      }}
    >
      <section
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          padding: "0 clamp(28px, 5vw, 48px)"
        }}
      >
        {content}
      </section>
    </div>
  )
}

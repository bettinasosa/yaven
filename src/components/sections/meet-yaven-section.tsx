"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"
import { useIsMobile } from "@/components/effects/use-is-mobile"

gsap.registerPlugin(ScrollTrigger)

// Cream draw-on underline (matches the triage section's treatment)
function U({ children }: { children: React.ReactNode }) {
  // transition:none so the timeline (GSAP) drives the draw frame-by-frame
  // without the CSS transition fighting it.
  return (
    <span className="triage-underline u-cream" style={{ transition: "none" }}>
      {children}
    </span>
  )
}

// Serif italic with shiny light-blue gradient
function BI({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontWeight: 700,
        fontStyle: "italic",
        background:
          "linear-gradient(125deg, #9dd4ff 0%, #7ec8ff 22%, #e0f2ff 46%, #6ab8f8 70%, #8cc8ff 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text"
      }}
    >
      {children}
    </span>
  )
}

const BODY: React.ReactNode[] = [
  <>
    Built for founders, freelancers, and solo operators who{" "}
    <BI>run everything themselves</BI>.
  </>,
  <>
    Yaven understands your context, tone and open tasks, then acts on them{" "}
    <U>with you kept in the loop</U>. No new apps, tabs or empty chat boxes.
  </>,
  <>
    So you can spend your time on <BI>the work only you can do</BI>.
  </>
]

const SATELLITES = [
  { x: -125, y: -95, label: "proposal drafted", pw: 118, ph: 32 },
  { x: 130, y: -70, label: "follow-up sent", pw: 104, ph: 32 },
  { x: -140, y: 65, label: "CRM updated", pw: 90, ph: 32 },
  { x: 105, y: 110, label: "meeting prepped", pw: 112, ph: 32 },
  { x: -25, y: -150, label: "reply drafted", pw: 96, ph: 32 }
]

const CORE_SIZE = 180

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
  fontSize: "clamp(20px, 2.2vw, 26px)",
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
  labelRefs,
  glassRef,
  settled
}: {
  proxyRef: React.RefObject<HTMLDivElement | null>
  satRefs: React.RefObject<(HTMLDivElement | null)[]>
  labelRefs: React.RefObject<(HTMLDivElement | null)[]>
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
        width: "min(460px, 92vw)",
        height: "min(460px, 92vw)",
        margin: "0 auto"
      }}
    >
      <GlassGooFilter />

      {/* Layer 1: gooey filter — proxy core only (label chips stand alone
          as glass pills; a goo blob behind each read as disconnected). */}
      <div style={{ ...stageStyle, filter: "url(#yv-glass-goo)" }}>
        <div ref={proxyRef} />
      </div>

      {/* Layer 2: glass label chips — fly out from center */}
      <div style={{ ...stageStyle, pointerEvents: "none" }}>
        {SATELLITES.map((s, i) => (
          <div
            key={i}
            ref={el => {
              labelRefs.current[i] = el
            }}
            className="glass-btn glass-btn-sm"
            style={{
              position: "absolute",
              fontSize: "22px",
              cursor: "default",
              opacity: 0,
              whiteSpace: "nowrap"
            }}
          >
            <span style={{ paddingBlock: "0.75em", paddingInline: "1.5em" }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Layer 3: glass bubble (backdrop) with the Yaven mark in FRONT */}
      <div style={{ ...stageStyle, pointerEvents: "none" }}>
        <div
          ref={glassRef}
          style={{
            position: "relative",
            width: `${CORE_SIZE}px`,
            height: `${CORE_SIZE}px`,
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {/* Yaven mark */}
          <span
            className="yv-chip-float"
            style={{
              position: "relative",
              zIndex: 2,
              display: "block",
              padding: 0
            }}
          >
            <Image
              src="/yaven-logo.svg"
              alt="Yaven"
              width={56}
              height={97}
              style={{
                display: "block",
                width: "auto",
                height: `${CORE_SIZE * 2.1}px`,
                filter: "drop-shadow(0 3px 10px rgba(0,0,0,0.22))"
              }}
            />
          </span>
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
  const satRefs = useRef<(HTMLDivElement | null)[]>([]) // pill proxies inside goo filter
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]) // glass chips above filter
  const glassRef = useRef<HTMLDivElement>(null) // glass-btn core
  const bodyWrapRef = useRef<HTMLDivElement>(null)
  const staticLayout = usePrefersReducedMotion()
  const isMobile = useIsMobile()

  // Underlines: the animated path (desktop pinned + mobile non-pinned) draws
  // each one via the timeline as its paragraph reveals. Reduced motion has no
  // timeline, so just show them.
  useEffect(() => {
    if (!staticLayout || !bodyWrapRef.current) return
    bodyWrapRef.current
      .querySelectorAll(".triage-underline")
      .forEach(el => el.classList.add("is-visible"))
  }, [staticLayout])

  useEffect(() => {
    if (staticLayout || !wrapperRef.current) return

    gsap.set(headingRef.current, { y: 50, opacity: 0 })
    paraRefs.current.forEach(p => p && gsap.set(p, { y: 36, opacity: 0 }))
    // One draw-on underline per paragraph; start them undrawn.
    const underlines = paraRefs.current.map(
      p => p?.querySelector<HTMLElement>(".triage-underline") ?? null
    )
    underlines.forEach(u => u && gsap.set(u, { backgroundSize: "0% 3.5px" }))
    gsap.set([proxyRef.current, glassRef.current], { scale: 0 })
    satRefs.current.forEach(
      s => s && gsap.set(s, { x: 0, y: 0, opacity: 0, scale: 0.7 })
    )
    labelRefs.current.forEach(
      l => l && gsap.set(l, { x: 0, y: 0, opacity: 0, scale: 0.7 })
    )

    // Desktop pins and scrubs the timeline; mobile plays it once when the
    // (non-pinned) section scrolls into view, so nothing overflows the screen.
    const tl = gsap.timeline({
      scrollTrigger: isMobile
        ? {
            trigger: wrapperRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        : {
            trigger: wrapperRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2
          }
    })
    if (isMobile) tl.timeScale(1.8)

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
    if (underlines[0])
      tl.to(
        underlines[0],
        { backgroundSize: "100% 3.5px", ease: "power2.out", duration: 0.8 },
        1.8
      )
    tl.to(
      [proxyRef.current, glassRef.current],
      { scale: 1, ease: "back.out(1.6)", duration: 1.9 },
      1.4
    )

    // P2 — pill proxies + glass chips fly out from center together
    tl.to(
      paraRefs.current[1],
      { y: 0, opacity: 1, ease: "power3.out", duration: 1.2 },
      3.2
    )
    if (underlines[1])
      tl.to(
        underlines[1],
        { backgroundSize: "100% 3.5px", ease: "power2.out", duration: 0.8 },
        3.8
      )
    SATELLITES.forEach((sat, i) => {
      const s = satRefs.current[i]
      const l = labelRefs.current[i]
      const labelY = sat.y < 0 ? sat.y - sat.ph / 2 - 4 : sat.y + sat.ph / 2 + 4
      if (s)
        tl.to(
          s,
          {
            x: sat.x,
            y: labelY,
            opacity: 1,
            scale: 1,
            ease: "back.out(1.5)",
            duration: 1.3
          },
          3.4 + i * 0.2
        )
      if (l)
        tl.to(
          l,
          {
            x: sat.x,
            y: labelY,
            opacity: 1,
            scale: 1,
            ease: "back.out(1.5)",
            duration: 1.3
          },
          3.4 + i * 0.2
        )
    })

    // P3 — both retract back to center and goo-merge with the core
    tl.to(
      paraRefs.current[2],
      { y: 0, opacity: 1, ease: "power3.out", duration: 1.2 },
      5.8
    )
    if (underlines[2])
      tl.to(
        underlines[2],
        { backgroundSize: "100% 3.5px", ease: "power2.out", duration: 0.8 },
        6.4
      )
    SATELLITES.forEach((sat, i) => {
      const s = satRefs.current[i]
      const l = labelRefs.current[i]
      if (s)
        tl.to(
          s,
          {
            x: 0,
            y: 0,
            opacity: 0,
            scale: 0.7,
            ease: "power2.in",
            duration: 1.0
          },
          6.0 + i * 0.12
        )
      if (l)
        tl.to(
          l,
          {
            x: 0,
            y: 0,
            opacity: 0,
            scale: 0.7,
            ease: "power2.in",
            duration: 1.0
          },
          6.0 + i * 0.12
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
  }, [staticLayout, isMobile])

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
        <div ref={bodyWrapRef} style={bodyTextStyle}>
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
        labelRefs={labelRefs}
        glassRef={glassRef}
        settled={staticLayout}
      />
    </div>
  )

  // Reduced motion: non-pinned, settled, no animation.
  if (staticLayout) {
    return (
      <section
        data-meet-yaven
        style={{
          position: "relative",
          background: "var(--primary)",
          padding:
            "clamp(120px, 20vh, 360px) clamp(28px, 6vw, 48px) clamp(100px, 16vh, 220px)",
          overflow: "hidden"
        }}
      >
        {content}
      </section>
    )
  }

  // Mobile: non-pinned so it can't overflow/clip, but the orb still animates
  // (played once when scrolled into view).
  if (isMobile) {
    return (
      <div
        ref={wrapperRef}
        data-meet-yaven
        style={{
          position: "relative",
          background: "var(--primary)",
          padding:
            "clamp(90px, 14vh, 160px) clamp(28px, 6vw, 48px) clamp(100px, 16vh, 200px)",
          overflow: "hidden"
        }}
      >
        {content}
      </div>
    )
  }

  return (
    <div
      ref={wrapperRef}
      data-meet-yaven
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

"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"

gsap.registerPlugin(ScrollTrigger)


// Script §2 — What it is (cryptic reveal). Body copy verbatim from site-script.md.
const BODY = [
  "Yaven is the future of ambient AI.",
  "Yaven sits with you all day, ready whenever you need. It proactively suggests things it can handle for you, with no new tabs, apps, or chat boxes to switch between.",
  "The work that actually needs you? Get right on it."
]

// Satellite blobs that gooey-split out of the presence, then melt back in.
// Same flat-blue shape language as the proposals merge.
const SATELLITES = [
  { x: -125, y: -95, w: 58, h: 58, round: true },
  { x: 130, y: -70, w: 72, h: 46, round: false },
  { x: -140, y: 65, w: 48, h: 48, round: true },
  { x: 105, y: 110, w: 80, h: 50, round: false },
  { x: -25, y: -150, w: 40, h: 40, round: true }
]

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

// The ambient presence in the proposals-merge visual language: a flat blue
// mass that gooey-splits into satellites (suggesting), then melts back into
// one calm shape (ambient). Yaven without showing Yaven.
function PresenceStage({
  coreRef,
  satRefs,
  settled
}: {
  coreRef: React.RefObject<HTMLDivElement | null>
  satRefs: React.RefObject<(HTMLDivElement | null)[]>
  settled: boolean
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
          <filter id="yv-goo-presence">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
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
          filter: "url(#yv-goo-presence)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {/* The core mass — CSS breathes the inner layer */}
        <div ref={coreRef}>
          <div
            className="yv-orb-breathe"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "var(--cream)"
            }}
          />
        </div>

        {/* Satellites — split out of the core, melt back in */}
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
              background: "var(--cream)",
              transform: settled
                ? "translate(0, 0) scale(0.4)"
                : `translate(${s.x}px, ${s.y}px)`
            }}
          />
        ))}
      </div>

      {/* Crisp face above the filter — quiet listening dots */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          gap: "9px"
        }}
      >
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="yv-chip-float"
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "var(--primary)",
              animationDelay: `${i * 0.45}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}

export function MeetYavenSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const paraRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const coreRef = useRef<HTMLDivElement>(null)
  const satRefs = useRef<(HTMLDivElement | null)[]>([])
  const staticLayout = usePrefersReducedMotion()

  // Pinned reveal — text and the presence stage evolve together
  useEffect(() => {
    if (staticLayout || !wrapperRef.current) return

    gsap.set(headingRef.current, { y: 50, opacity: 0 })
    paraRefs.current.forEach(p => p && gsap.set(p, { y: 36, opacity: 0 }))
    gsap.set(coreRef.current, { scale: 0 })
    // Satellites start hidden inside the core
    satRefs.current.forEach(s => s && gsap.set(s, { x: 0, y: 0, scale: 0.4, opacity: 0 }))

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2
      }
    })

    // Heading
    tl.to(headingRef.current, { y: 0, opacity: 1, ease: "power3.out", duration: 1 }, 0)

    // P1 — the presence appears
    tl.to(paraRefs.current[0], { y: 0, opacity: 1, ease: "power3.out", duration: 1.2 }, 1.2)
    tl.to(coreRef.current, { scale: 1, ease: "back.out(1.6)", duration: 1.2 }, 1.4)

    // P2 — it starts suggesting: satellites gooey-split out of the core
    tl.to(paraRefs.current[1], { y: 0, opacity: 1, ease: "power3.out", duration: 1.2 }, 3.2)
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

    // P3 — ambient: everything melts back into one calm shape
    tl.to(paraRefs.current[2], { y: 0, opacity: 1, ease: "power3.out", duration: 1.2 }, 5.8)
    satRefs.current.forEach((s, i) => {
      if (!s) return
      tl.to(
        s,
        { x: 0, y: 0, scale: 0.4, ease: "power2.inOut", duration: 1.3 },
        6.1 + i * 0.15
      )
    })
    tl.to(coreRef.current, { scale: 1.12, ease: "power2.out", duration: 0.9 }, 7.2)

    // dwell before unpinning
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
        coreRef={coreRef}
        satRefs={satRefs}
        settled={staticLayout}
      />
    </div>
  )

  if (staticLayout) {
    return (
      <section
        style={{
          position: "relative",
          background: "var(--dark)",
          padding: "clamp(220px, 30vh, 360px) 24px clamp(120px, 18vh, 220px)",
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
      style={{ position: "relative", height: "350vh", background: "var(--dark)" }}
    >
      <section
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          padding: "0 24px"
        }}
      >
        {content}
      </section>
    </div>
  )
}

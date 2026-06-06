"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"

gsap.registerPlugin(ScrollTrigger)

const INK = "#0a0e1a"
const GREEN = "#3BA55C"

// Script §1 — The Drop. Pinned: lines appear, then get ticked off as you scroll.
const LINES = [
  "the invoice you forgot to chase.",
  "the leads from Tuesday's conference.",
  "the proposal due Friday.",
  "the 14 unread responses."
]

// Gooey tick: green blob pops in (droplet melts into it), crisp white check
// draws on top — same language as the proposals merge / presence stage.
function GooeyTick({
  blobRef,
  dropRef,
  checkRef,
  settled
}: {
  blobRef: (el: HTMLDivElement | null) => void
  dropRef: (el: HTMLDivElement | null) => void
  checkRef: (el: SVGPathElement | null) => void
  settled: boolean
}) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: "relative",
        width: "clamp(36px, 4vw, 52px)",
        height: "clamp(36px, 4vw, 52px)",
        display: "inline-block",
        flexShrink: 0
      }}
    >
      <span
        style={{
          position: "absolute",
          inset: 0,
          filter: "url(#yv-goo-tick)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {/* main blob */}
        <span
          ref={blobRef}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: GREEN,
            display: "block",
            transform: settled ? "scale(1)" : "scale(0)"
          }}
        />
        {/* droplet that melts into it */}
        <span
          ref={dropRef}
          style={{
            position: "absolute",
            width: "38%",
            height: "38%",
            borderRadius: "50%",
            background: GREEN,
            display: "block",
            transform: settled ? "scale(0)" : "translate(0, -130%) scale(0)"
          }}
        />
      </span>

      {/* crisp check above the filter */}
      <svg
        viewBox="0 0 48 48"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
          pointerEvents: "none"
        }}
      >
        <path
          ref={checkRef}
          d="M14 25 L21 32 L34 17"
          fill="none"
          stroke="#fff"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={settled ? 0 : 1}
        />
      </svg>
    </span>
  )
}

export function TextParallaxSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const lineRefs = useRef<(HTMLDivElement | null)[]>([])
  const blobRefs = useRef<(HTMLDivElement | null)[]>([])
  const dropRefs = useRef<(HTMLDivElement | null)[]>([])
  const checkRefs = useRef<(SVGPathElement | null)[]>([])
  const punchRef = useRef<HTMLDivElement>(null)
  const youRef = useRef<HTMLSpanElement>(null)
  const staticLayout = usePrefersReducedMotion()

  useEffect(() => {
    if (staticLayout || !wrapperRef.current) return

    // Initial states
    lineRefs.current.forEach(l => l && gsap.set(l, { y: 44, opacity: 0 }))
    blobRefs.current.forEach(b => b && gsap.set(b, { scale: 0 }))
    dropRefs.current.forEach(d => d && gsap.set(d, { yPercent: -130, scale: 0 }))
    checkRefs.current.forEach(c => c && gsap.set(c, { strokeDashoffset: 1 }))
    if (punchRef.current) gsap.set(punchRef.current, { y: 40, opacity: 0 })
    if (youRef.current) gsap.set(youRef.current, { backgroundSize: "0% 100%" })

    // One scrubbed timeline over the whole pinned wrapper. Each tick gets a
    // wide window so the pop reads deliberate, not flicked.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2
      }
    })

    LINES.forEach((_, i) => {
      const line = lineRefs.current[i]
      const blob = blobRefs.current[i]
      const drop = dropRefs.current[i]
      const check = checkRefs.current[i]
      if (!line || !blob || !drop || !check) return
      const base = i * 2.4

      // line arrives
      tl.to(line, { y: 0, opacity: 1, ease: "power3.out", duration: 0.8 }, base)

      // gooey tick: droplet falls in and melts as the blob swells
      tl.to(drop, { scale: 1, duration: 0.4, ease: "power2.out" }, base + 1.2)
      tl.to(drop, { yPercent: 0, scale: 0.55, duration: 0.7, ease: "power2.in" }, base + 1.5)
      tl.to(blob, { scale: 1.18, duration: 0.7, ease: "back.out(2.2)" }, base + 1.8)
      tl.to(drop, { scale: 0, duration: 0.3 }, base + 2.1)
      tl.to(blob, { scale: 1, duration: 0.4, ease: "power2.out" }, base + 2.5)

      // crisp check draws on
      tl.to(check, { strokeDashoffset: 0, ease: "power2.inOut", duration: 0.7 }, base + 2.3)

      // dealt with — line settles back
      tl.to(line, { opacity: 0.4, duration: 0.6 }, base + 2.8)
    })

    const punchAt = LINES.length * 2.4 + 1
    tl.to(punchRef.current, { y: 0, opacity: 1, ease: "power3.out", duration: 1 }, punchAt)
    tl.to(youRef.current, { backgroundSize: "100% 100%", ease: "none", duration: 1 }, punchAt + 1)
    // dwell before unpinning
    tl.to({}, { duration: 1.4 })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [staticLayout])

  const lines = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "clamp(20px, 4vh, 40px)"
      }}
    >
      {/* shared gooey filter for the ticks */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter id="yv-goo-tick">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
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

      {LINES.map((text, i) => (
        <div
          key={i}
          ref={el => {
            lineRefs.current[i] = el
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(16px, 2vw, 28px)"
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(28px, 5vw, 64px)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: INK,
              whiteSpace: "nowrap"
            }}
          >
            {text}
          </span>
          <GooeyTick
            blobRef={el => {
              blobRefs.current[i] = el
            }}
            dropRef={el => {
              dropRefs.current[i] = el
            }}
            checkRef={el => {
              checkRefs.current[i] = el
            }}
            settled={staticLayout}
          />
        </div>
      ))}

      {/* Punchline */}
      <div
        ref={punchRef}
        style={{
          textAlign: "center",
          marginTop: "clamp(24px, 5vh, 56px)",
          padding: "0 24px"
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontSize: "clamp(28px, 4.5vw, 60px)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            color: INK,
            margin: 0
          }}
        >
          None of it needs{" "}
          <span
            ref={youRef}
            style={{
              fontStyle: "italic",
              backgroundImage:
                "linear-gradient(to right, rgba(232,163,61,0.4), rgba(232,163,61,0.4))",
              backgroundRepeat: "no-repeat",
              backgroundSize: staticLayout ? "100% 100%" : "0% 100%",
              backgroundPosition: "0 0",
              padding: "0 0.08em"
            }}
          >
            you
          </span>
          . It just needs doing.
        </p>
      </div>
    </div>
  )

  if (staticLayout) {
    return (
      <section
        style={{
          background: "var(--cream)",
          padding: "clamp(100px, 15vh, 180px) 24px",
          overflow: "hidden"
        }}
      >
        {lines}
      </section>
    )
  }

  return (
    <div
      ref={wrapperRef}
      style={{ position: "relative", height: "600vh", background: "var(--cream)" }}
    >
      <section
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 24px"
        }}
      >
        {lines}
      </section>
    </div>
  )
}

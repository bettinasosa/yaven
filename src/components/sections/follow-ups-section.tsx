"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollCutReveal } from "@/components/effects/scroll-cut-reveal"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"

gsap.registerPlugin(ScrollTrigger)

const INK = "#0a0e1a"
const GREEN = "#3BA55C"

// Script §4 — The follow-ups. Goo conveyor: each follow-up splits off the
// pending mass, travels the lane, and lands as a done-tick.
const BEATS = [
  {
    label: "Conference",
    headline: "300 badge scans. 4 worth keeping.",
    body: "Yaven finds them and writes the intros before your flight lands."
  },
  {
    label: "Payment",
    headline: "Invoice 47 days overdue?",
    body: "The polite nudge is drafted. The firm one is queued behind it."
  },
  {
    label: "Client",
    headline: "Quiet since the kickoff call?",
    body: "Yaven notices on day 6. Not month 6."
  }
]

export function FollowUpsSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const massRef = useRef<HTMLDivElement>(null)
  const blobRefs = useRef<(HTMLDivElement | null)[]>([])
  const slotRefs = useRef<(HTMLSpanElement | null)[]>([])
  const checkRefs = useRef<(SVGPathElement | null)[]>([])
  const copyRefs = useRef<(HTMLDivElement | null)[]>([])
  const staticLayout = usePrefersReducedMotion()

  useEffect(() => {
    if (staticLayout || !wrapperRef.current) return

    // Travel distances: from the mass to each blob's landing slot
    const deltas = blobRefs.current.map((b, i) => {
      const slot = slotRefs.current[i]
      if (!b || !slot) return 0
      const br = b.getBoundingClientRect()
      const sr = slot.getBoundingClientRect()
      return sr.left + sr.width / 2 - (br.left + br.width / 2)
    })

    gsap.set(massRef.current, { scale: 0 })
    blobRefs.current.forEach(b => b && gsap.set(b, { x: 0, scale: 0 }))
    checkRefs.current.forEach(c => c && gsap.set(c, { strokeDashoffset: 1 }))
    copyRefs.current.forEach(c => c && gsap.set(c, { y: 36, opacity: 0 }))

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2
      }
    })

    // the pending mass surfaces
    tl.to(massRef.current, { scale: 1, ease: "back.out(1.6)", duration: 1 }, 0.6)

    BEATS.forEach((_, i) => {
      const blob = blobRefs.current[i]
      const check = checkRefs.current[i]
      const copy = copyRefs.current[i]
      const base = 2 + i * 3.4

      // the story for this beat
      if (copy) {
        tl.to(copy, { y: 0, opacity: 1, ease: "power3.out", duration: 0.8 }, base)
      }

      if (blob) {
        // splits off the mass…
        tl.to(blob, { scale: 1, ease: "back.out(2)", duration: 0.5 }, base + 0.5)
        // …travels the lane…
        tl.to(blob, { x: deltas[i], ease: "power1.inOut", duration: 1.3 }, base + 0.9)
        // …and lands as done
        tl.to(blob, { backgroundColor: GREEN, scale: 1.15, duration: 0.35 }, base + 2.2)
        tl.to(blob, { scale: 1, duration: 0.3 }, base + 2.55)
      }
      if (check) {
        tl.to(check, { strokeDashoffset: 0, ease: "power2.inOut", duration: 0.5 }, base + 2.45)
      }

      // current story makes way for the next (the last one stays)
      if (copy && i < BEATS.length - 1) {
        tl.to(copy, { y: -28, opacity: 0, ease: "power2.in", duration: 0.6 }, base + 2.8)
      }
    })

    // dwell before unpinning
    tl.to({}, { duration: 1.5 })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [staticLayout])

  const filterDefs = (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <filter id="yv-goo-followups">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
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
  )

  const header = (
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
      The follow-ups, handled.
    </ScrollCutReveal>
  )

  // The conveyor: pending mass left, landing slots right
  const conveyor = (
    <div
      style={{
        position: "relative",
        width: "min(820px, 100%)",
        height: "120px",
        margin: "clamp(32px, 6vh, 64px) auto 0"
      }}
    >
      {/* goo layer */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          filter: "url(#yv-goo-followups)"
        }}
      >
        {/* pending mass */}
        <div
          ref={massRef}
          style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            marginTop: "-34px",
            width: "92px",
            height: "68px",
            borderRadius: "50%",
            background: "var(--primary)",
            transform: staticLayout ? "none" : undefined
          }}
        />
        {/* travelling blobs — start inside the mass */}
        {BEATS.map((_, i) => (
          <div
            key={i}
            ref={el => {
              blobRefs.current[i] = el
            }}
            style={{
              position: "absolute",
              left: "36px",
              top: "50%",
              marginTop: "-22px",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: staticLayout ? GREEN : "var(--primary)"
            }}
          />
        ))}
      </div>

      {/* landing slots + crisp checks */}
      <div
        style={{
          position: "absolute",
          right: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          gap: "22px"
        }}
      >
        {BEATS.map((_, i) => (
          <span
            key={i}
            ref={el => {
              slotRefs.current[i] = el
            }}
            style={{
              position: "relative",
              width: "44px",
              height: "44px",
              display: "inline-block"
            }}
          >
            <svg
              viewBox="0 0 44 44"
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
                ref={el => {
                  checkRefs.current[i] = el
                }}
                d="M13 23 L19 29 L31 15"
                fill="none"
                stroke="#fff"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={staticLayout ? 0 : 1}
              />
            </svg>
          </span>
        ))}
      </div>

      {/* listening dots on the mass, crisp */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "38px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          gap: "7px"
        }}
      >
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="yv-chip-float"
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.85)",
              animationDelay: `${i * 0.45}s`
            }}
          />
        ))}
      </div>
    </div>
  )

  const copyBlock = (beat: (typeof BEATS)[number], i: number) => (
    <div
      key={beat.label}
      ref={el => {
        copyRefs.current[i] = el
      }}
      style={
        staticLayout
          ? { textAlign: "center", maxWidth: "640px", margin: "0 auto" }
          : {
              position: "absolute",
              inset: 0,
              textAlign: "center",
              maxWidth: "640px",
              margin: "0 auto"
            }
      }
    >
      <span
        style={{
          fontFamily: "var(--font-instrument-serif)",
          fontSize: "clamp(18px, 2vw, 24px)",
          lineHeight: 1,
          color: "var(--warm)"
        }}
      >
        {beat.label}
      </span>
      <h3
        style={{
          fontFamily: "var(--font-instrument-serif)",
          fontSize: "clamp(28px, 4vw, 54px)",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          lineHeight: 1.08,
          color: INK,
          margin: "14px 0 0"
        }}
      >
        {beat.headline}
      </h3>
      <p
        style={{
          fontSize: "clamp(16px, 1.9vw, 22px)",
          fontWeight: 500,
          lineHeight: 1.45,
          color: INK,
          opacity: 0.8,
          margin: "16px auto 0",
          maxWidth: "540px"
        }}
      >
        {beat.body}
      </p>
    </div>
  )

  if (staticLayout) {
    return (
      <section
        style={{ background: "var(--cream)", padding: "clamp(80px, 12vh, 140px) 24px" }}
      >
        {filterDefs}
        <div
          style={{
            maxWidth: "880px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "56px"
          }}
        >
          {header}
          {BEATS.map((beat, i) => copyBlock(beat, i))}
          {conveyor}
        </div>
      </section>
    )
  }

  return (
    <div
      ref={wrapperRef}
      style={{ position: "relative", height: "520vh", background: "var(--cream)" }}
    >
      <section
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 24px"
        }}
      >
        {filterDefs}
        {header}

        {conveyor}

        {/* story area — one beat at a time */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "720px",
            height: "clamp(180px, 26vh, 240px)",
            marginTop: "clamp(24px, 5vh, 48px)"
          }}
        >
          {BEATS.map((beat, i) => copyBlock(beat, i))}
        </div>
      </section>
    </div>
  )
}

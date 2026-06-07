"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { WaitlistInline } from "@/components/waitlist-inline"
import { ScrollCutReveal } from "@/components/effects/scroll-cut-reveal"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"

// Lava-lamp blobs: cream goo drifting on the blue. Paths overlap so they
// melt into each other as they pass.
const BLOBS = [
  { left: "8%", top: "18%", size: 150, dx: 70, dy: 50, dur: 9 },
  { left: "16%", top: "32%", size: 100, dx: -60, dy: 70, dur: 7.5 },
  { left: "78%", top: "14%", size: 120, dx: -80, dy: 60, dur: 8.5 },
  { left: "84%", top: "30%", size: 90, dx: -50, dy: -45, dur: 6.5 },
  { left: "12%", top: "72%", size: 110, dx: 80, dy: -55, dur: 10 },
  { left: "75%", top: "70%", size: 140, dx: -70, dy: -65, dur: 9.5 },
  { left: "84%", top: "82%", size: 80, dx: -90, dy: 40, dur: 7 },
  { left: "20%", top: "84%", size: 70, dx: 60, dy: -70, dur: 8 }
]

// Script §8 — Footer CTA. Full-screen beat before the sticky footer.
export function FooterCTASection() {
  const blobRefs = useRef<(HTMLDivElement | null)[]>([])
  const reduce = usePrefersReducedMotion()

  useEffect(() => {
    if (reduce) return
    const tweens = blobRefs.current.map((b, i) => {
      if (!b) return null
      return gsap.to(b, {
        x: BLOBS[i].dx,
        y: BLOBS[i].dy,
        duration: BLOBS[i].dur,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    })
    return () => tweens.forEach(t => t?.kill())
  }, [reduce])

  return (
    // Pinned for a full extra viewport so the CTA reads as its own page
    // rather than a transition into the footer.
    <div style={{ position: "relative", height: "200vh", background: "var(--primary)" }}>
    <section
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        overflow: "hidden"
      }}
    >
      {/* Gooey lava layer */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter id="yv-goo-cta">
            <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur" />
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
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          filter: "url(#yv-goo-cta)",
          opacity: 0.5,
          pointerEvents: "none"
        }}
      >
        {BLOBS.map((b, i) => (
          <div
            key={i}
            ref={el => {
              blobRefs.current[i] = el
            }}
            style={{
              position: "absolute",
              left: b.left,
              top: b.top,
              width: b.size,
              height: b.size,
              borderRadius: "50%",
              background: "var(--cream)"
            }}
          />
        ))}
      </div>

      <div style={{ position: "relative", textAlign: "center" }}>
        <ScrollCutReveal
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontSize: "clamp(44px, 7vw, 110px)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            color: "var(--cream)",
            margin: "0 auto",
            maxWidth: "900px"
          }}
        >
          Get the boring half handled.
        </ScrollCutReveal>

        <div
          style={{
            marginTop: "clamp(40px, 7vh, 64px)",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <div style={{ width: "min(480px, 100%)" }}>
            <WaitlistInline />
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

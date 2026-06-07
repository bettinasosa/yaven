"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const ROWS = [
  { text: "Focus on what matters", dir: -1 },
  { text: "AI that knows your context", dir: 1 },
  { text: "Less admin. More flow.", dir: -1 },
]

const REPEAT = 6

function Row({ text, rowRef }: { text: string; rowRef: (el: HTMLDivElement | null) => void }) {
  return (
    <div
      ref={rowRef}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "clamp(48px, 6vw, 96px)",
        whiteSpace: "nowrap",
        willChange: "transform",
        padding: "clamp(32px, 4.5vw, 56px) 0",
      }}
    >
      {Array.from({ length: REPEAT }).map((_, i) => (
        <span
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(48px, 6vw, 96px)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "clamp(48px, 7.5vw, 100px)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              color: "#0a0e1a",
              opacity: i % 2 === 0 ? 1 : 0.15,
            }}
          >
            {text}
          </span>
          <span
            aria-hidden
            style={{ flexShrink: 0, display: "inline-flex", alignItems: "center" }}
          >
            <Image
              src="/cloud.png"
              alt=""
              width={72}
              height={36}
              style={{ width: "clamp(48px, 5vw, 72px)", height: "auto", opacity: 0.45 }}
            />
          </span>
        </span>
      ))}
    </div>
  )
}

export function TextParallaxSectionND() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const RANGE = 220

    rowRefs.current.forEach((el, i) => {
      if (!el) return
      const dir = ROWS[i].dir
      gsap.fromTo(
        el,
        { x: dir * RANGE },
        {
          x: dir * -RANGE,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      )
    })

    return () => ScrollTrigger.getAll().forEach(t => {
      if (t.trigger === sectionRef.current) t.kill()
    })
  }, [])

  return (
    <div
      ref={sectionRef}
      style={{
        position: "relative",
        background: "#fff",
        overflow: "hidden",
        paddingTop: "clamp(220px, 30vh, 360px)",
        paddingBottom: "clamp(120px, 16vh, 200px)",
      }}
    >
      {/* Blue-to-white fade that sits over the section top */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "clamp(220px, 30vh, 380px)",
          background: "linear-gradient(to bottom, #267FE5 0%, rgba(255,255,255,0) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      {ROWS.map((row, i) => (
        <Row
          key={i}
          text={row.text}
          rowRef={(el) => { rowRefs.current[i] = el }}
        />
      ))}
    </div>
  )
}

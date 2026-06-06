"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrambleText } from "@/components/scramble-text"
import { yavenGlyph as YavenGlyph } from "@/components/blueprint/yaven-glyph"

gsap.registerPlugin(ScrollTrigger)

const INK = "#0a0e1a"

// Script §7 — The tease. Form factor never revealed.
export function TeaseSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const glyphRef = useRef<HTMLDivElement>(null)

  // Pixel trail — only on this screen, something is present that wasn't before
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const finePointer = window.matchMedia("(pointer: fine)").matches
    if (reduce || !finePointer) return

    let last = 0
    const onMove = (e: MouseEvent) => {
      const now = performance.now()
      if (now - last < 40) return // throttle spawn rate
      last = now

      const rect = section.getBoundingClientRect()
      const px = document.createElement("div")
      const size = 6 + Math.random() * 8
      px.style.cssText = [
        "position:absolute",
        `left:${e.clientX - rect.left - size / 2}px`,
        `top:${e.clientY - rect.top - size / 2}px`,
        `width:${size}px`,
        `height:${size}px`,
        "background:#267FE5",
        "pointer-events:none",
        "z-index:2"
      ].join(";")
      section.appendChild(px)

      gsap.to(px, {
        opacity: 0,
        scale: 0,
        duration: 0.7 + Math.random() * 0.5,
        ease: "power2.out",
        onComplete: () => px.remove()
      })
    }

    section.addEventListener("mousemove", onMove, { passive: true })
    return () => section.removeEventListener("mousemove", onMove)
  }, [])

  // The glyph from §2 rises and exits the top of the viewport — says it
  // without saying it.
  useEffect(() => {
    const glyph = glyphRef.current
    const section = sectionRef.current
    if (!glyph || !section) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const tween = gsap.fromTo(
      glyph,
      { y: 0, opacity: 0.85 },
      {
        y: "-90vh",
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "bottom top",
          scrub: 1.4
        }
      }
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100vh",
        background: "#fff",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "28px",
        padding: "0 24px"
      }}
    >
      <div
        ref={glyphRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "12%",
          right: "clamp(8%, 14vw, 18%)",
          fontSize: "clamp(40px, 5vw, 80px)",
          color: "#267FE5",
          pointerEvents: "none"
        }}
      >
        <YavenGlyph />
      </div>

      <ScrambleText
        as="h2"
        speed={0.8}
        className="font-instrument-serif text-[clamp(36px,5.5vw,76px)] tracking-[-0.02em] leading-none text-[#0a0e1a] font-medium m-0"
      >
        Where does it live?
      </ScrambleText>

      <p
        style={{
          fontSize: "clamp(17px, 2vw, 24px)",
          fontWeight: 500,
          color: INK,
          opacity: 0.6,
          margin: 0
        }}
      >
        Closer than you think.
        {/* ALT (near-giveaway, owner's call): Look up. */}
      </p>
    </section>
  )
}

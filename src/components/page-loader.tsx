"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin"

gsap.registerPlugin(MorphSVGPlugin)

// Paths from the 504×871 viewBox SVGs
const CASING_PATH  = "M203.502 0L0 113L300.498 295V871L504 759V183L203.502 0Z"
const FACE_PATH    = "M0 113L301.146 211.929V522.5L0 688V113Z"
const BOTTOM_PATH  = "M300.498 522.828L0 687.99L300.498 870.99V522.828Z"
const ACCENT_PATH  = "M0 125V113L300.5 295V307L0 125Z"

export function PageLoader({ onDone }: { onDone?: () => void }) {
  const panelRef      = useRef<HTMLDivElement>(null)
  const morphPathRef  = useRef<SVGPathElement>(null)
  const logoGroupRef  = useRef<SVGGElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // 1. Casing fades in
    tl.fromTo(morphPathRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    )

    // 2. Morph casing → left face, full logo cross-fades in underneath
    tl.to(morphPathRef.current, {
      morphSVG: FACE_PATH,
      duration: 0.85,
      ease: "power2.inOut",
    }, "+=0.35")
    tl.to(logoGroupRef.current,  { opacity: 1, duration: 0.85, ease: "power2.inOut" }, "<")
    tl.to(morphPathRef.current,  { opacity: 0, duration: 0.3 }, "-=0.25")

    // 3. Curtain exit
    let exitTl: gsap.core.Timeline | null = null
    const exitTimer = window.setTimeout(() => {
      gsap.set(panelRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%)",
      })
      exitTl = gsap.timeline({
        onStart:    () => window.dispatchEvent(new CustomEvent("yaven:loader:done")),
        onComplete: () => onDone?.(),
      })
      exitTl.to(panelRef.current, {
        yPercent: -100,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 135%, 50% 55%, 0% 135%)",
        duration: 0.9,
        ease: "power3.inOut",
      })
    }, 2400)

    return () => {
      tl.kill()
      window.clearTimeout(exitTimer)
      exitTl?.kill()
    }
  }, [onDone])

  return (
    <div
      ref={panelRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        pointerEvents: "none",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        viewBox="0 0 504 871"
        style={{ width: "clamp(80px, 14vw, 150px)", height: "auto" }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Full logo — fades in as morph completes */}
        <g ref={logoGroupRef} opacity={0}>
          <path d={FACE_PATH}   fill="url(#lg)" />
          <path d={BOTTOM_PATH} fill="#064AA9" />
          <path d={CASING_PATH} fill="#E3D5BB" />
          <path d={ACCENT_PATH} fill="#E3D5BB" />
        </g>

        {/* Morphing shape — starts as casing, morphs to left face */}
        <path
          ref={morphPathRef}
          d={CASING_PATH}
          fill="#E3D5BB"
          opacity={0}
        />

        <defs>
          <linearGradient id="lg" x1="301.146" y1="397.757" x2="0" y2="397.757" gradientUnits="userSpaceOnUse">
            <stop offset="0.1"      stopColor="#267FE5" />
            <stop offset="0.3"      stopColor="#62A7C6" />
            <stop offset="0.5"      stopColor="#AFAA47" />
            <stop offset="0.573899" stopColor="#CB9C41" />
            <stop offset="0.9"      stopColor="#E1402E" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

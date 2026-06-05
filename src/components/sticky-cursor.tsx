"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

// All standard interactive elements get the sticky expand treatment
const STICKY_SEL = "a, button, [role='button'], [data-cursor-sticky]"

export function StickyCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Desktop-only — skip on touch devices
    if (!window.matchMedia("(pointer: fine)").matches) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // GSAP owns all transforms — xPercent/yPercent centre both elements on (x, y)
    gsap.set(dot,  { xPercent: -50, yPercent: -50, opacity: 0 })
    gsap.set(ring, { xPercent: -50, yPercent: -50, opacity: 0 })

    document.documentElement.style.cursor = "none"

    // Dot snaps immediately; ring lags behind
    const moveDotX  = gsap.quickTo(dot,  "x", { duration: 0.08, ease: "none" })
    const moveDotY  = gsap.quickTo(dot,  "y", { duration: 0.08, ease: "none" })
    const moveRingX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" })
    const moveRingY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" })

    let isSticky = false
    let appeared = false

    function onMove(e: MouseEvent) {
      moveDotX(e.clientX)
      moveDotY(e.clientY)
      if (!isSticky) {
        moveRingX(e.clientX)
        moveRingY(e.clientY)
      }
      if (!appeared) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
        appeared = true
      }
    }

    function onWindowLeave() {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 })
    }

    function onWindowEnter() {
      if (appeared) gsap.to([dot, ring], { opacity: 1, duration: 0.2 })
    }

    function onOver(e: MouseEvent) {
      const el = (e.target as HTMLElement).closest<HTMLElement>(STICKY_SEL)
      if (!el) return
      isSticky = true

      const rect = el.getBoundingClientRect()
      const cx   = rect.left + rect.width  / 2
      const cy   = rect.top  + rect.height / 2

      // Mirror the element's border-radius so the ring hugs pill buttons etc.
      const rawBr = window.getComputedStyle(el).borderRadius
      // Clamp huge vw/rem values to a safe pixel cap so GSAP can tween them
      const br = rawBr.includes("vw") || rawBr.includes("rem") || rawBr.includes("em")
        ? "9999px"
        : rawBr

      gsap.to(ring, {
        x: cx,
        y: cy,
        width:        rect.width  + 20,
        height:       rect.height + 20,
        borderRadius: br,
        background:   "rgba(13,27,62,0.05)",
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      })
      gsap.to(dot, { opacity: 0, duration: 0.15 })
    }

    function onOut(e: MouseEvent) {
      const el = (e.target as HTMLElement).closest<HTMLElement>(STICKY_SEL)
      if (!el) return
      // Ignore events where the pointer is still inside the element (child traversal)
      if (el.contains(e.relatedTarget as Node | null)) return

      isSticky = false
      gsap.to(ring, {
        width:        40,
        height:       40,
        borderRadius: "50%",
        background:   "transparent",
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      })
      gsap.to(dot, { opacity: 1, duration: 0.2 })
    }

    function onDown() {
      gsap.to(ring, { scale: 0.82, duration: 0.12 })
    }
    function onUp() {
      gsap.to(ring, { scale: 1, duration: 0.3, ease: "back.out(2)" })
    }

    document.addEventListener("mousemove",  onMove,       { passive: true })
    document.addEventListener("mouseleave", onWindowLeave)
    document.addEventListener("mouseenter", onWindowEnter)
    document.addEventListener("mouseover",  onOver)
    document.addEventListener("mouseout",   onOut)
    document.addEventListener("mousedown",  onDown)
    document.addEventListener("mouseup",    onUp)

    return () => {
      document.documentElement.style.cursor = ""
      document.removeEventListener("mousemove",  onMove)
      document.removeEventListener("mouseleave", onWindowLeave)
      document.removeEventListener("mouseenter", onWindowEnter)
      document.removeEventListener("mouseover",  onOver)
      document.removeEventListener("mouseout",   onOut)
      document.removeEventListener("mousedown",  onDown)
      document.removeEventListener("mouseup",    onUp)
    }
  }, [])

  return (
    <>
      {/* Dot — snaps to cursor */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         8,
          height:        8,
          borderRadius:  "50%",
          background:    "#0D1B3E",
          pointerEvents: "none",
          zIndex:        9999,
          willChange:    "transform",
        }}
      />
      {/* Ring — lags + snaps to interactive elements */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         40,
          height:        40,
          borderRadius:  "50%",
          border:        "2px solid #0D1B3E",
          background:    "transparent",
          pointerEvents: "none",
          zIndex:        9998,
          willChange:    "transform, width, height",
        }}
      />
    </>
  )
}

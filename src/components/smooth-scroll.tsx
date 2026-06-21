"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduceMotion = usePrefersReducedMotion()

  useEffect(() => {
    // Reduced motion: skip Lenis entirely and let the browser scroll natively.
    // Lenis virtualizes scroll on every frame, which fights Safari's native
    // scrolling and is itself motion the user has asked us not to add.
    if (reduceMotion) return

    const lenis = new Lenis({ lerp: 0.1 })

    // Sync ScrollTrigger with every Lenis scroll tick
    lenis.on("scroll", ScrollTrigger.update)

    // Drive Lenis from GSAP ticker (single RAF, no double-loop)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    function onContentChanged() {
      lenis.resize()
    }
    window.addEventListener("content-changed", onContentChanged)

    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener("content-changed", onContentChanged)
      lenis.destroy()
    }
  }, [reduceMotion])

  return <>{children}</>
}

"use client"

import { createContext, useCallback, useContext, useEffect, useRef, type RefObject } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"

gsap.registerPlugin(ScrollTrigger)

const ScrollContext = createContext<RefObject<Lenis | null> | null>(null)

/** Navigation uses the same scroll driver as wheel input. */
export function useSmoothScrollTo() {
  const instance = useContext(ScrollContext)
  return useCallback((top: number, immediate = false) => {
    if (instance?.current) instance.current.scrollTo(top, { duration: 1.15, immediate })
    else window.scrollTo({ top, behavior: "instant" })
  }, [instance])
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduceMotion = usePrefersReducedMotion()
  const instance = useRef<Lenis | null>(null)

  useEffect(() => {
    // Reduced motion: skip Lenis entirely and let the browser scroll natively.
    // Lenis virtualizes scroll on every frame, which fights Safari's native
    // scrolling and is itself motion the user has asked us not to add.
    if (reduceMotion) return

    const lenis = new Lenis({ lerp: 0.1, anchors: true })
    instance.current = lenis

    // Sync ScrollTrigger with every Lenis scroll tick
    lenis.on("scroll", ScrollTrigger.update)

    // Drive Lenis from GSAP ticker (single RAF, no double-loop)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    function onContentChanged() {
      lenis.resize()
      ScrollTrigger.refresh()
    }
    window.addEventListener("content-changed", onContentChanged)

    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener("content-changed", onContentChanged)
      lenis.destroy()
      instance.current = null
    }
  }, [reduceMotion])

  return <ScrollContext value={instance}>{children}</ScrollContext>
}

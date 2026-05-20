"use client"

import { useEffect } from "react"
import Lenis from "lenis"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 })

    function onContentChanged() {
      lenis.resize()
    }
    window.addEventListener("content-changed", onContentChanged)

    let frameId: number
    function raf(time: number) {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }
    frameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener("content-changed", onContentChanged)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}

"use client"

import { useEffect, useRef } from "react"

export function ParallaxCloud({
  children,
  speed = 0.15,
  className,
}: {
  children: React.ReactNode
  speed?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onScroll() {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const viewH = window.innerHeight
      const center = rect.top + rect.height / 2 - viewH / 2
      el.style.transform = `translateY(${center * speed}px)`
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [speed])

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  )
}

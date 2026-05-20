"use client"

import { useEffect, useRef } from "react"

const START = 60
const END = 300

export function ScrollFadeOut({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onScroll() {
      const el = ref.current
      if (!el) return
      const p = Math.max(0, Math.min((window.scrollY - START) / (END - START), 1))
      el.style.opacity = String(1 - p)
      el.style.pointerEvents = p >= 1 ? "none" : ""
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

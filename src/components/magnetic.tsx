"use client"

import { useRef } from "react"

export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
  }

  function handleMouseLeave() {
    const el = ref.current
    if (!el) return
    el.style.transition = "transform 0.5s cubic-bezier(0.16,1,0.3,1)"
    el.style.transform = "translate(0,0)"
    setTimeout(() => {
      if (ref.current) ref.current.style.transition = ""
    }, 500)
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-block" }}
    >
      {children}
    </div>
  )
}

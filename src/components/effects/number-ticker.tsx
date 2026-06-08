"use client"

import { useEffect, useRef, useState } from "react"
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion"

interface Props {
  /** Number counted up to. */
  target: number
  /** Rendered before the number, e.g. "day ". */
  prefix?: string
  /** Rendered after the number, e.g. " days". */
  suffix?: string
  /** Animation length in ms. */
  duration?: number
  className?: string
  style?: React.CSSProperties
}

/** Counts from 0 to `target` when scrolled into view. */
export function NumberTicker({
  target,
  prefix = "",
  suffix = "",
  duration = 900,
  className,
  style
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const reduce = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduce) return

    let rafId = 0
    const io = new IntersectionObserver(
      entries => {
        if (!entries[0].isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1)
          // ease-out cubic
          setValue(Math.round(target * (1 - Math.pow(1 - p, 3))))
          if (p < 1) rafId = requestAnimationFrame(tick)
        }
        rafId = requestAnimationFrame(tick)
      },
      { threshold: 0.6 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(rafId)
    }
  }, [target, duration, reduce])

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {reduce ? target : value}
      {suffix}
    </span>
  )
}

"use client"

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"
import styles from "./flow-chapter.module.css"

/** A short reading hold. Taller content always gets normal document scrolling. */
export function FlowChapter({ enabled = true, hold = .16, children }: { enabled?: boolean; hold?: number; children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!enabled || !track.current || !panel.current) return
    const trackEl = track.current
    const panelEl = panel.current
    let frame = 0
    const measure = () => {
      const hold = !reduced && window.innerWidth >= 960 && window.innerHeight >= 640 && panelEl.offsetHeight <= window.innerHeight + 2
      if (trackEl.dataset.hold === String(hold)) return
      trackEl.dataset.hold = String(hold)
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => window.dispatchEvent(new Event("content-changed")))
    }
    const observer = new ResizeObserver(measure)
    observer.observe(panelEl)
    window.addEventListener("resize", measure)
    measure()
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", measure)
      cancelAnimationFrame(frame)
    }
  }, [enabled, reduced])

  if (!enabled) return children
  return <div ref={track} className={styles.chapter} style={{ "--chapter-hold": `${hold * 100}svh` } as CSSProperties} data-hold="true"><div ref={panel} className={styles.panel}>{children}</div></div>
}

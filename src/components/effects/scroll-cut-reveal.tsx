"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(ScrollTrigger, SplitText)

interface Props {
  children: string
  className?: string
  style?: React.CSSProperties
  /** Tag to render. Defaults to h2. */
  as?: "h2" | "h3" | "p" | "div" | "span"
  /** ScrollTrigger start position. */
  start?: string
  stagger?: number
}

/**
 * Scroll-driven sibling of AnimatedHeadline: SplitText line-mask reveal
 * that fires when the element scrolls into view instead of on loader:done.
 */
export function ScrollCutReveal({
  children,
  className,
  style,
  as: Tag = "h2",
  start = "top 85%",
  stagger = 0.075
}: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const split = new SplitText(el, { type: "lines", mask: "lines" })
    gsap.set(split.lines, { yPercent: 100 })

    const tween = gsap.to(split.lines, {
      yPercent: 0,
      duration: 1,
      stagger,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start, once: true }
    })

    return () => {
      tween.scrollTrigger?.kill()
      split.revert()
    }
  }, [start, stagger])

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={className}
      style={{ ...style, overflow: "hidden", paddingBottom: "0.15em" }}
    >
      {children}
    </Tag>
  )
}

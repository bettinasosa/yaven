"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(SplitText)

interface Props {
  children: string
  className?: string
  style?: React.CSSProperties
  /** Delay in seconds before lines start revealing. */
  delay?: number
  /** Kept for API compatibility — no longer used. */
  highlights?: string[]
}

export function AnimatedHeadline({ children, className, style, delay = 0.9 }: Props) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Text-mask: SplitText splits into lines, each wrapped in overflow:clip mask
    const split = new SplitText(el, { type: "lines", mask: "lines" })

    gsap.fromTo(
      split.lines,
      { yPercent: 100 },
      {
        yPercent: 0,
        duration: 1,
        stagger: 0.075,
        ease: "power3.out",
        delay,
      }
    )

    return () => split.revert()
  }, [delay])

  return (
    <p ref={ref} className={className} style={{ ...style, overflow: "hidden" }}>
      {children}
    </p>
  )
}

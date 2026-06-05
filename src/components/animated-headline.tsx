"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(SplitText)

interface Props {
  children: string
  className?: string
  style?: React.CSSProperties
  /** Seconds after loader:done before this headline starts revealing. */
  delay?: number
  highlights?: string[]
}

export function AnimatedHeadline({ children, className, style, delay = 0 }: Props) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const split = new SplitText(el, { type: "lines", mask: "lines" })
    gsap.set(split.lines, { yPercent: 100 })

    const start = () => {
      gsap.to(split.lines, {
        yPercent: 0,
        duration: 1,
        stagger: 0.075,
        ease: "power3.out",
        delay,
      })
    }

    window.addEventListener("yaven:loader:done", start, { once: true })

    return () => {
      split.revert()
      window.removeEventListener("yaven:loader:done", start)
    }
  }, [delay])

  return (
    <p ref={ref} className={className} style={{ ...style, overflow: "hidden" }}>
      {children}
    </p>
  )
}

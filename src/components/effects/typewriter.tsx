"use client"

import { useEffect, useRef, useState } from "react"
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion"

interface Props {
  /** Text typed character by character. */
  text: string
  /** Already-present text the typing continues from (rendered instantly). */
  startText?: string
  /** Ms per character. */
  speed?: number
  /** Delay before typing starts once visible, in ms. */
  delay?: number
  className?: string
  style?: React.CSSProperties
  /** Show a blinking caret while typing. */
  caret?: boolean
  /** Called once when typing finishes. */
  onComplete?: () => void
}

/**
 * Types `text` char-by-char when the element enters the viewport.
 * With `startText`, the typed text visibly continues a half-written sentence.
 */
export function Typewriter({
  text,
  startText = "",
  speed = 28,
  delay = 0,
  className,
  style,
  caret = true,
  onComplete
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const reduce = usePrefersReducedMotion()

  const onCompleteRef = useRef(onComplete)
  useEffect(() => {
    onCompleteRef.current = onComplete
  })

  // Reduced motion: render the full text, still signal completion
  useEffect(() => {
    if (!reduce) return
    const id = setTimeout(() => onCompleteRef.current?.(), 0)
    return () => clearTimeout(id)
  }, [reduce])

  useEffect(() => {
    const el = ref.current
    if (!el || reduce) return

    const io = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          io.disconnect()
          setTimeout(() => setStarted(true), delay)
        }
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay, reduce])

  useEffect(() => {
    if (reduce || !started) return
    if (count >= text.length) {
      onCompleteRef.current?.()
      return
    }
    const id = setTimeout(() => setCount(c => c + 1), speed)
    return () => clearTimeout(id)
  }, [started, count, text.length, speed, reduce])

  const shown = reduce ? text.length : count
  const typing = !reduce && started && count < text.length

  return (
    <span ref={ref} className={className} style={style}>
      {startText}
      {text.slice(0, shown)}
      {caret && (
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: "2px",
            height: "1em",
            verticalAlign: "text-bottom",
            background: "currentColor",
            marginLeft: "1px",
            opacity: typing ? 1 : 0,
            animation: typing ? "yv-caret-blink 0.9s step-end infinite" : "none"
          }}
        />
      )}
    </span>
  )
}

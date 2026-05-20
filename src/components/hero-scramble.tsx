"use client"

import { useEffect, useRef } from "react"

export function HeroScramble({
  children,
  className,
  style,
}: {
  children: string
  className?: string
  style?: React.CSSProperties
}) {
  const text = children
  const words = text.split(" ")
  const offsets = useRef<{ x: number; y: number; r: number; s: number }[]>([])
  const charRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    // Compute random scatter directions once on the client
    const count = text.replace(/ /g, "").length
    offsets.current = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 800,
      y: (Math.random() - 0.5) * 600,
      r: (Math.random() - 0.5) * 360,
      s: Math.random() * 2.5 + 1,
    }))

    // Use the full hero height (100vh) so scatter lasts until the video is fully scrolled past
    const scrollEnd = window.innerHeight

    function onScroll() {
      const p = Math.min(window.scrollY / scrollEnd, 1)
      charRefs.current.forEach((el, i) => {
        if (!el) return
        const off = offsets.current[i]
        if (!off) return
        el.style.transform =
          p > 0
            ? `translate(${off.x * p}px,${off.y * p}px) rotate(${off.r * p}deg) scale(${1 + (off.s - 1) * p})`
            : ""
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [text])

  // Render: track charIdx for ref assignment — runs synchronously so the
  // index captured in each ref callback matches the offsets array.
  let charIdx = 0

  return (
    <h1 className={className} style={style} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi}>
          <span aria-hidden style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {word.split("").map((char, ci) => {
              const i = charIdx++
              return (
                <span
                  key={ci}
                  ref={el => {
                    charRefs.current[i] = el
                  }}
                  style={{ display: "inline-block" }}
                >
                  {char}
                </span>
              )
            })}
          </span>
          {wi < words.length - 1 && " "}
        </span>
      ))}
    </h1>
  )
}

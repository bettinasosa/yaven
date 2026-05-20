"use client"

import { useEffect, useRef, useState } from "react"

const CHARS = "abcdefghijklmnopqrstuvwxyz"
const WORD = "yaven"
const SCROLL_END = 380

// Each letter exits upward with unique horizontal drift
const EXIT_DIRS = [
  { x: -220, y: -420, r: -28 },
  { x: -75,  y: -400, r: -10 },
  { x:   0,  y: -450, r:   6 },
  { x:  85,  y: -390, r:  14 },
  { x: 230,  y: -410, r:  32 },
]

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

export function ScrambleIntro() {
  const [letters, setLetters] = useState(WORD.split(""))
  const [progress, setProgress] = useState(0)
  const scrambleRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    function onScroll() {
      const p = Math.min(window.scrollY / SCROLL_END, 1)
      setProgress(p)

      if (p > 0.05) {
        if (!scrambleRef.current) {
          scrambleRef.current = setInterval(() => {
            setLetters(WORD.split("").map(() => randomChar()))
          }, 55)
        }
      } else {
        if (scrambleRef.current) {
          clearInterval(scrambleRef.current)
          scrambleRef.current = null
          setLetters(WORD.split(""))
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (scrambleRef.current) clearInterval(scrambleRef.current)
    }
  }, [])

  const opacity = Math.max(0, 1 - progress * 1.4)

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "linear-gradient(to right, #2053A5, #036CB0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        pointerEvents: "none",
        visibility: opacity === 0 ? "hidden" : "visible",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-instrument-serif)",
          fontSize: "clamp(56px, 11vw, 148px)",
          fontStyle: "italic",
          fontWeight: 300,
          color: "white",
          letterSpacing: "-0.02em",
          display: "flex",
        }}
      >
        {letters.map((char, i) => {
          const dir = EXIT_DIRS[i]
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                transform: `translate(${dir.x * progress}px, ${dir.y * progress}px) rotate(${dir.r * progress}deg) scale(${1 + progress * 0.4})`,
                opacity: 1 - progress * 1.2,
              }}
            >
              {char}
            </span>
          )
        })}
      </span>
    </div>
  )
}

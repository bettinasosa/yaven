"use client"

import { useEffect, useState } from "react"

export function PageLoader() {
  const [out,  setOut]  = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    // Short pause so the white screen registers, then slide up
    const t1 = window.setTimeout(() => setOut(true),  220)
    // Unmount after the slide animation completes
    const t2 = window.setTimeout(() => setGone(true), 1100)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (gone) return null

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[200] bg-white flex items-center justify-center pointer-events-none"
      style={{
        transform:  out ? "translateY(-100%)" : "translateY(0)",
        transition: out
          ? "transform 0.82s cubic-bezier(0.76, 0, 0.24, 1)"
          : "none",
      }}
    >
      <span
        className="font-instrument-serif text-4xl tracking-tight text-zinc-900"
        style={{
          opacity:    out ? 0 : 1,
          transition: out ? "opacity 0.2s ease" : "none",
        }}
      >
        yaven
      </span>
    </div>
  )
}

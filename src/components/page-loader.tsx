"use client"

import { useEffect, useState } from "react"

export function PageLoader() {
  const [out,  setOut]  = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const t1 = window.setTimeout(() => setOut(true),  300)
    const t2 = window.setTimeout(() => setGone(true), 1200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (gone) return null

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-200 bg-white flex items-center justify-center pointer-events-none"
      style={{
        opacity:    out ? 0 : 1,
        transition: out ? "opacity 0.85s ease" : "none",
      }}
    >
      <span
        className="font-instrument-serif text-4xl tracking-tight text-zinc-900"
        style={{
          opacity:    out ? 0 : 1,
          transition: out ? "opacity 0.3s ease" : "none",
        }}
      >
        yaven
      </span>
    </div>
  )
}

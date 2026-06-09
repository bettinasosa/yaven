"use client"

import { useEffect, useState } from "react"

type StateProps = {
  onClick: () => void
}

const loadingPuns = [
  "Teaching robots to handle your Mondays...",
  "Finding the meetings that could've been emails...",
  "Interviewing your calendar for suspicious activity...",
  "Building your personal army of quiet helpers...",
  "Turning your chaos into choreography...",
  "Calculating the hours you're about to get back...",
  "Identifying which tasks hate you most..."
]

export function IdleBlueprintState({ onClick }: StateProps) {
  return (
    <div>
      <div className="glass-wrap">
        <div className="glass-shadow" />
        <button type="button" onClick={onClick} className="glass-btn">
          <span className="text-white">Get Yaven</span>
        </button>
      </div>
    </div>
  )
}

export function IntroBlueprintState({ onClick }: StateProps) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 items-center justify-center">
        <div className="space-y-5 max-w-sm text-center">
          <h3
            className="font-bold leading-tight"
            style={{ fontSize: "clamp(32px, 5vw, 52px)", color: "var(--ink)" }}
          >
            Let&apos;s find your time back.
          </h3>
          <p
            className="text-base font-medium leading-relaxed"
            style={{ color: "#1A1A1A" }}
          >
            A few questions about your week. We&apos;ll show you exactly what
            yaven would handle — and hand the hours back to you.
          </p>
        </div>
      </div>
      <div className="flex justify-end pt-6">
        <button type="button" onClick={onClick} className="btn-press-dark">
          Start →
        </button>
      </div>
    </div>
  )
}

export function GeneratingBlueprintState() {
  const [punIndex, setPunIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setPunIndex(prev => (prev + 1) % loadingPuns.length)
        setVisible(true)
      }, 400)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
      <span
        className="inline-flex size-8 rounded-full animate-spin"
        style={{
          border: "3px solid var(--ink)",
          borderTopColor: "transparent"
        }}
      />
      <p
        className="max-w-xs text-base font-medium transition-opacity duration-300"
        style={{ color: "var(--ink)", opacity: visible ? 1 : 0 }}
      >
        {loadingPuns[punIndex]}
      </p>
    </div>
  )
}

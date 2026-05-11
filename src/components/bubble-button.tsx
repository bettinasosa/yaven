"use client"

import React from "react"

const CELLS = Array.from({ length: 20 })

export function BubbleButton({
  onClick,
  children,
  type = "button",
  className,
  style,
}: {
  onClick?: () => void
  children: React.ReactNode
  type?: "button" | "submit" | "reset"
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bubble-btn${className ? ` ${className}` : ""}`}
      style={style}
    >
      <span className="bubble-btn-cells" aria-hidden="true">
        {CELLS.map((_, i) => (
          <span key={i} />
        ))}
      </span>
      <span className="bubble-btn-content">{children}</span>
    </button>
  )
}

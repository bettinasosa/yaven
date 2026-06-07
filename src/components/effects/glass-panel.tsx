"use client"

import React from "react"

/**
 * Reusable glass effect matching the "Show me" button language.
 * Renders the three-layer stack: .glass-wrap > .glass-shadow + .glass-btn.
 * Pass `borderRadius` to override the default pill shape (999vw).
 * Pass `as` to change the inner element ("button" | "div", default "div").
 */
export function GlassPanel({
  children,
  borderRadius,
  className,
  style,
  onClick,
  as = "div"
}: {
  children?: React.ReactNode
  borderRadius?: string
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
  as?: "button" | "div"
}) {
  const radius = borderRadius ?? "999vw"

  const wrapStyle: React.CSSProperties = {
    borderRadius: radius
  }

  const shadowOverride: React.CSSProperties =
    radius !== "999vw"
      ? ({ "--glass-radius": radius } as React.CSSProperties)
      : {}

  const Inner = as

  return (
    <div className={`glass-wrap ${className ?? ""}`} style={{ ...wrapStyle, ...style }}>
      <div className="glass-shadow" style={shadowOverride} />
      <Inner
        className="glass-btn"
        style={{ borderRadius: radius }}
        onClick={onClick}
        type={as === "button" ? "button" : undefined}
      >
        {children}
      </Inner>
    </div>
  )
}

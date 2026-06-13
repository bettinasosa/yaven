"use client"

import React, { forwardRef, useCallback, useRef } from "react"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  borderRadius?: string | number
  className?: string
  style?: React.CSSProperties
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  function GlassCard({ children, borderRadius = "34px", className, style, ...rest }, ref) {
    const radius = typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius
    const shineRef = useRef<HTMLDivElement>(null)

    const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
      if (!shineRef.current) return
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      shineRef.current.style.opacity = "1"
      shineRef.current.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.15) 40%, transparent 65%)`
    }, [])

    const handlePointerLeave = useCallback(() => {
      if (!shineRef.current) return
      shineRef.current.style.opacity = "0"
    }, [])

    const glassStyle: React.CSSProperties = {
      position: "relative",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      background: "linear-gradient(-75deg, rgba(255,255,255,0.12), rgba(255,255,255,0.28), rgba(255,255,255,0.12))",
      borderRadius: radius,
      boxShadow: [
        "inset 0 2px 2px rgba(0,0,0,0.03)",
        "inset 0 -2px 2px rgba(255,255,255,0.5)",
        "0 4px 2px -2px rgba(0,0,0,0.12)",
        "inset 0 0 1.5px 4px rgba(255,255,255,0.2)",
        "0 0 0 rgba(255,255,255,0)",
      ].join(", "),
      overflow: "hidden",
      ...style,
    }

    return (
      <div
        ref={ref}
        className={`glass-card ${className || ""}`}
        style={glassStyle}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        {...rest}
      >
        {/* Conic gradient border — same style as glass-btn */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            top: "-1px",
            left: "-1px",
            width: "calc(100% + 2px)",
            height: "calc(100% + 2px)",
            padding: "1.5px",
            boxSizing: "border-box",
            background: `conic-gradient(from -75deg at 50% 50%, rgba(0,0,0,0.3), transparent 5% 40%, rgba(0,0,0,0.3) 50%, transparent 60% 95%, rgba(0,0,0,0.3)), linear-gradient(180deg, rgba(255,255,255,0.5), rgba(255,255,255,0.5))`,
            boxShadow: "inset 0 0 0 0.75px rgba(255,255,255,0.5)",
            borderRadius: radius,
            WebkitMaskImage: "linear-gradient(#000 0 0), linear-gradient(#000 0 0)",
            maskImage: "linear-gradient(#000 0 0), linear-gradient(#000 0 0)",
            WebkitMaskClip: "content-box, border-box",
            maskClip: "content-box, border-box",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none",
          }}
        />
        {/* Sweep shine overlay — shifts on hover via CSS */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            background: "linear-gradient(-45deg, transparent 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 55%, transparent 100%)",
            backgroundSize: "200% 200%",
            backgroundPosition: "100% 100%",
            mixBlendMode: "screen",
            opacity: 0.6,
            transition: "background-position 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
            pointerEvents: "none",
          }}
          className="glass-card-sweep"
        />
        {/* Mouse-following specular shine */}
        <div
          ref={shineRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            opacity: 0,
            mixBlendMode: "screen",
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative" }}>{children}</div>
      </div>
    )
  }
)

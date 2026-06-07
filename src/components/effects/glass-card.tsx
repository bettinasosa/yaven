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
      shineRef.current.style.background = `radial-gradient(450px circle at ${x}px ${y}px, rgba(255,255,255,0.7) 0%, rgba(200,225,255,0.25) 35%, transparent 65%)`
      // Lift card on hover
      e.currentTarget.style.boxShadow = [
        "0 20px 60px rgba(38, 127, 229, 0.18)",
        "0 8px 20px rgba(0, 0, 0, 0.08)",
        "0 0 0 0.5px rgba(180, 210, 250, 0.6)",
        "inset 0 2px 0 rgba(255, 255, 255, 0.9)",
        "inset 0 0 32px rgba(255, 255, 255, 0.25)",
      ].join(", ")
      e.currentTarget.style.borderColor = "rgba(160, 190, 240, 0.6)"
    }, [])

    const handlePointerLeave = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
      if (!shineRef.current) return
      shineRef.current.style.opacity = "0"
      e.currentTarget.style.boxShadow = ""
      e.currentTarget.style.borderColor = ""
    }, [])

    const glassStyle: React.CSSProperties = {
      position: "relative",
      background: "linear-gradient(135deg, rgba(235, 242, 255, 0.7) 0%, rgba(245, 248, 255, 0.5) 100%)",
      backdropFilter: "blur(40px) saturate(1.4)",
      WebkitBackdropFilter: "blur(40px) saturate(1.4)",
      borderRadius: radius,
      border: "1.5px solid rgba(180, 200, 235, 0.5)",
      boxShadow: [
        "0 12px 40px rgba(38, 127, 229, 0.12)",
        "0 4px 12px rgba(0, 0, 0, 0.06)",
        "0 0 0 0.5px rgba(180, 210, 250, 0.5)",
        "inset 0 2px 0 rgba(255, 255, 255, 0.85)",
        "inset 0 0 32px rgba(255, 255, 255, 0.2)",
      ].join(", "),
      overflow: "hidden",
      transition: "box-shadow 0.3s ease, border-color 0.3s ease",
      ...style,
    }

    return (
      <div
        ref={ref}
        className={className}
        style={glassStyle}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        {...rest}
      >
        {/* Directional light sheen from top-left (-45deg) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)",
            pointerEvents: "none",
          }}
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
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
        />
        {/* Gradient border for refraction edge */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            padding: "1.2px",
            background:
              "linear-gradient(135deg, rgba(180,210,255,0.5) 0%, rgba(200,220,250,0.2) 30%, transparent 50%, rgba(200,220,250,0.15) 80%, rgba(180,210,255,0.4) 100%)",
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative" }}>{children}</div>
      </div>
    )
  }
)

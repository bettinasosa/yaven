"use client"

import { useState, useRef, useEffect, useCallback } from "react"

/**
 * Lightweight popover tooltip for icon pills.
 * Pure CSS positioning, no external deps.
 */
export function IconTooltip({
  label,
  children
}: {
  label: string
  children: React.ReactNode
}) {
  const [show, setShow] = useState(false)
  const [above, setAbove] = useState(true)
  const wrapRef = useRef<HTMLSpanElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(null)

  const open = useCallback(() => {
    timer.current = setTimeout(() => {
      // Flip below if too close to top of viewport
      if (wrapRef.current) {
        const rect = wrapRef.current.getBoundingClientRect()
        setAbove(rect.top > 48)
      }
      setShow(true)
    }, 300)
  }, [])

  const close = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
    setShow(false)
  }, [])

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  return (
    <span
      ref={wrapRef}
      onMouseEnter={open}
      onMouseLeave={close}
      onFocus={open}
      onBlur={close}
      style={{ position: "relative", display: "inline-flex" }}
    >
      {children}
      {show && (
        <span
          role="tooltip"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            ...(above
              ? { bottom: "calc(100% + 8px)" }
              : { top: "calc(100% + 8px)" }),
            whiteSpace: "nowrap",
            fontSize: "12px",
            fontWeight: 600,
            fontFamily: "var(--font-dm-sans), sans-serif",
            letterSpacing: "0.01em",
            color: "var(--cream, #fff8f0)",
            background: "rgba(10, 14, 26, 0.82)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderRadius: "8px",
            padding: "5px 10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            pointerEvents: "none",
            zIndex: 50,
            animation: "yv-tooltip-in 0.15s ease"
          }}
        >
          {label}
        </span>
      )}
    </span>
  )
}

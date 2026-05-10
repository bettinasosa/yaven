"use client"

import React, { useCallback, useRef, useState } from "react"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

export function ScrambleText({
  children,
  className,
  as: Tag = "span",
  speed = 1,
}: {
  children: string
  className?: string
  as?: keyof React.JSX.IntrinsicElements
  speed?: number
}) {
  const text = children.trim()
  const [display, setDisplay] = useState(text)
  const frameRef = useRef<number>(0)
  const Component = Tag as React.ElementType<{
    className?: string
    onMouseEnter?: () => void
    children?: React.ReactNode
  }>

  const scramble = useCallback(() => {
    let iteration = 0
    cancelAnimationFrame(frameRef.current)

    const animate = () => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " " || char === "." || char === "," || char === "—" || char === "'") return char
            if (i < iteration) return text[i]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join("")
      )

      if (iteration < text.length) {
        iteration += speed * 0.6
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setDisplay(text)
      }
    }

    frameRef.current = requestAnimationFrame(animate)
  }, [text, speed])

  return (
    <Component className={className} onMouseEnter={scramble}>
      {display}
    </Component>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"

export function WordReveal({
  children,
  className,
  id,
  as: Tag = "h2",
}: {
  children: string
  className?: string
  id?: string
  as?: "h1" | "h2" | "h3" | "h4" | "p"
}) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const words = children.split(" ")

  return (
    <Tag ref={ref as React.RefObject<HTMLElement & HTMLHeadingElement>} id={id} className={className} aria-label={children}>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            display: "inline-block",
            overflow: "hidden",
            marginRight: "0.25em",
            paddingBottom: "0.2em",
            marginBottom: "-0.2em",
            verticalAlign: "top",
          }}
        >
          <span
            style={{
              display: "inline-block",
              transform: visible ? "translateY(0)" : "translateY(110%)",
              opacity: visible ? 1 : 0,
              transition: `transform 0.65s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms, opacity 0.5s ease ${i * 60}ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  )
}

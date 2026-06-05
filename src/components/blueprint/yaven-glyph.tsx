"use client"

type yavenGlyphProps = {
  className?: string
}

export function yavenGlyph({ className = "" }: yavenGlyphProps) {
  return (
    <span
      aria-hidden="true"
      className={`text-shimmer font-instrument-serif leading-none ${className}`}
    >
      я
    </span>
  )
}

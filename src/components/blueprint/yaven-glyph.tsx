"use client"

type YavenGlyphProps = {
  className?: string
}

export function YavenGlyph({ className = "" }: YavenGlyphProps) {
  return (
    <span
      aria-hidden="true"
      className={`text-shimmer font-instrument-serif leading-none ${className}`}
    >
      я
    </span>
  )
}

"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface LetterExplosionProps {
  text: string
  className?: string
}

export function LetterExplosion({ text, className }: LetterExplosionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const letters = Array.from(
      ref.current.querySelectorAll<HTMLElement>(".letter")
    )

    const tweens = letters.map(letter => {
      const speed = 1.1 + Math.random() * 0.9
      const rotation = Math.random() * 60 - 30

      return gsap.to(letter, {
        y: () => (1 - speed) * window.innerHeight,
        rotation,
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: () => window.innerHeight,
          scrub: 0.5,
          invalidateOnRefresh: true
        }
      })
    })

    return () => {
      tweens.forEach(t => {
        t.scrollTrigger?.kill()
        t.kill()
      })
    }
  }, [])

  return (
    <div ref={ref} className={`flex flex-wrap ${className ?? ""}`}>
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="inline-flex mr-[0.3em] last:mr-0">
          {word.split("").map((char, ci) => (
            <span key={ci} className="letter inline-block">
              {char}
            </span>
          ))}
        </span>
      ))}
    </div>
  )
}

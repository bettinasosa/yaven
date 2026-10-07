"use client"

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react"
import { gsap } from "gsap"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"
import { ArtworkSurface } from "./omega/shader-showcase"
import { yavenPurple } from "./omega/artwork-palette"
import styles from "./crowd-deck.module.css"

const brightPalettes = [
  [yavenPurple, "#267fe5", yavenPurple, "#ffffff"],
  ["#df4f3e", yavenPurple, "#267fe5", "#ffffff"],
  ["#267fe5", "#ffffff", yavenPurple, "#ffffff"],
]

/** Selecting a new example lifts the old front card and brings the next one forward. */
export function CrowdDeck({ active, cards, playing = true, scrollDriven = false }: {
  active: number;
  cards: { id: string; content: ReactNode }[];
  playing?: boolean;
  scrollDriven?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null)
  const previous = useRef(active)
  const initialized = useRef(false)
  const reduced = usePrefersReducedMotion()
  const count = cards.length

  useEffect(() => {
    if (!root.current || scrollDriven) return
    const elements = Array.from(root.current.querySelectorAll<HTMLElement>("[data-deck-card]"))
    const old = previous.current
    previous.current = active
    const timeline = gsap.timeline()
    const outgoing = initialized.current && old !== active ? old : -1
    elements.forEach((element, index) => {
      const depth = (index - active + count) % count
      const destination = { y: depth * 22, scale: 1 - depth * .045, rotation: 0, opacity: 1, zIndex: count - depth }
      if (reduced || !initialized.current) {
        gsap.set(element, destination)
      } else if (index === outgoing) {
        timeline.set(element, { zIndex: count + 1 }, 0)
          .to(element, { y: -root.current!.clientHeight * .65, opacity: 0, duration: .36, ease: "power2.in" }, 0)
          .set(element, { ...destination, opacity: 0 }, .36)
          .to(element, { opacity: 1, duration: .25, ease: "power2.out" }, .4)
      } else {
        timeline.to(element, { ...destination, duration: .65, ease: "power3.out" }, 0)
      }
    })
    initialized.current = true
    return () => { timeline.kill() }
  }, [active, count, reduced, scrollDriven])

  return <div ref={root} className={`${styles.deck} ${styles.showcase}`}>
    {cards.map((card, index) => {
      const depth = scrollDriven ? index : (index - active + count) % count
      return <div key={card.id} id={card.id} data-deck-card className={styles.card}
        aria-hidden={index !== active || undefined} inert={index !== active}
        style={{ "--depth": depth, zIndex: count - depth } as CSSProperties}>
        <ArtworkSurface look="Wash" colors={brightPalettes[index % brightPalettes.length]} animate={playing && index === active} interactive={false} />
        <div className={styles.content}>{card.content}</div>
      </div>
    })}
  </div>
}

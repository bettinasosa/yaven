"use client"

import Link from "next/link"
import { useEffect, useRef, type CSSProperties } from "react"
import { ArrowUpRight } from "lucide-react"
import shared from "./crowd-supporting.module.css"
import styles from "./crowd-statement.module.css"

const walkers = [
  { sprite: 1, duration: 29, delay: -7, position: 12 },
  { sprite: 4, duration: 36, delay: -19, position: 37 },
  { sprite: 6, duration: 25, delay: -21, position: 63 },
  { sprite: 10, duration: 33, delay: -11, position: 84 },
]

function WalkingPeople({ upsideDown = false }: { upsideDown?: boolean }) {
  return <div className={`${styles.lane} ${upsideDown ? styles.ceiling : styles.floor}`} aria-hidden="true">
    {walkers.slice(0, upsideDown ? 3 : 4).map((person, index) => <span key={person.sprite} className={styles.walker} style={{
      "--duration": `${person.duration + (upsideDown ? 4 : 0)}s`,
      "--delay": `${person.delay - (upsideDown ? 9 : 0)}s`,
      "--rest": `${person.position}cqw`,
      "--direction": index % 2 ? "reverse" : "normal",
      "--facing": index % 2 ? -1 : 1,
      "--sprite": `${((person.sprite + (upsideDown ? 2 : 0)) / 14) * 100}%`,
      "--step": `${440 + index * 35}ms`,
    } as CSSProperties}><span className={styles.figure}><span className={styles.sprite} /></span></span>)}
  </div>
}

export function CrowdStatement() {
  const section = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = section.current
    if (!element) return
    let visible = false
    const update = () => { element.dataset.walking = String(visible && !document.hidden) }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update() })
    observer.observe(element)
    document.addEventListener("visibilitychange", update)
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update) }
  }, [])

  return <section ref={section} id="optical-play" className={`${shared.section} ${shared.grid} ${styles.section}`} aria-labelledby="artwork-heading">
    <WalkingPeople upsideDown />
    <div className={styles.intro}>
      <h2 className={shared.heading} id="artwork-heading">The way we work<br />is changing.</h2>
    </div>
    <div className={styles.copy}>
      <p className={shared.body}>The best independent businesses are increasingly built from small core teams, trusted specialists and AI agents. yaven is building the platform that brings them together.</p>
      <Link className={shared.link} href="/manifesto">Read the manifesto<ArrowUpRight size={18} aria-hidden="true" /></Link>
    </div>
    <WalkingPeople />
  </section>
}

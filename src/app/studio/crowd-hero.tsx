"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CrowdWalk } from "./crowd-walk"
import { CrowdHeroActions } from "./crowd-hero-actions"
import { crowdHero } from "./_shared/crowd-copy"
import styles from "./crowd-hero.module.css"

gsap.registerPlugin(ScrollTrigger)

export function CrowdHero() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!root.current) return
    const section = root.current
    const media = gsap.matchMedia()
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const arrival = gsap.timeline({ defaults: { ease: "power3.out" } })
        arrival.from("[data-crowd-heading]", { opacity: 0, y: 24, duration: .8 })
          .from("[data-crowd-copy]", { opacity: 0, y: 16, duration: .55 }, .35)
        gsap.to("[data-crowd-people]", {
          y: -36, scale: .965, ease: "none",
          scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: .6 },
        })
        gsap.to("[data-crowd-people]", {
          clipPath: () => `inset(0% round ${window.innerWidth < 600 ? 72 : 128}px)`, ease: "power1.out",
          scrollTrigger: { trigger: section, start: "top top", end: "top -32%", scrub: .3, invalidateOnRefresh: true },
        })
      }, section)
      return () => context.revert()
    })
    return () => media.revert()
  }, [])
  return <section ref={root} id="studio-content" className={styles.hero} aria-labelledby="studio-heading">
    <div className={styles.lift} data-crowd-people>
    <div className={styles.scene}>
      <CrowdWalk className={styles.canvas} />
      <div className={styles.copy}>
        <h1 id="studio-heading" className={styles.headline} data-crowd-heading>{crowdHero.headline}</h1>
        <div className={styles.message} data-crowd-copy>
        <p className={styles.description}>{crowdHero.body}</p>
        <CrowdHeroActions />
        </div>
      </div>
    </div>
    </div>
  </section>
}

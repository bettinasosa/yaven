"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CrowdWalk } from "./crowd-walk"
import textLink from "@/components/ui/text-link.module.css"
import { CrowdHeroActions } from "./crowd-hero-actions"
import { YavenMark } from "./_shared/yaven-mark"
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
        arrival.from("[data-crowd-letter]", { yPercent: 110, rotation: 7, duration: .9, stagger: .055 })
          .from("[data-crowd-copy]", { opacity: 0, y: 16, duration: .55 }, .35)
          .from("[data-nav-mark]", { opacity: 0, y: -8, duration: .6 }, .1)
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
      <nav className={styles.nav} aria-label="Main navigation">
        <Link href="/" aria-label="yaven home" data-nav-mark><YavenMark className={styles.logo} /></Link>
        <div className={styles.navLinks}>
          <Link className={textLink.link} href="/about"><span className={textLink.label}>About us</span></Link>
          <Link className={textLink.link} href="/manifesto"><span className={textLink.label}>Manifesto</span></Link>
          <span className={styles.talkSpace} aria-hidden="true" />
        </div>
      </nav>
      <div className={styles.copy}>
        <div className={styles.wordmark} aria-hidden="true">{"yaven".split("").map(letter => <span key={letter} data-crowd-letter>{letter}</span>)}</div>
        <div className={styles.message} data-crowd-copy>
        <h1 id="studio-heading">AI agents for running<br /> and growing your agency.</h1>
        <CrowdHeroActions />
        </div>
      </div>
    </div>
    </div>
  </section>
}

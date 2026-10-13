"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { YavenMark } from "@/app/studio/_shared/yaven-mark"
import { CrowdHeroActions } from "@/app/studio/crowd-hero-actions"
import textLink from "./ui/text-link.module.css"
import styles from "./site-header.module.css"

/** Shared brand and navigation for every website route. */
export function SiteHeader() {
  const pathname = usePathname()

  return <header className={styles.header}>
    <Link href="/" className={styles.brand} aria-label="yaven home">
      <YavenMark className={styles.mark} />
      <span className={styles.name}>yaven</span>
    </Link>
    <nav className={styles.links} aria-label="Main navigation">
      <Link className={textLink.link} href="/about" aria-current={pathname === "/about" ? "page" : undefined}><span className={textLink.label}>About us</span></Link>
      <Link className={textLink.link} href="/manifesto" aria-current={pathname === "/manifesto" ? "page" : undefined}><span className={textLink.label}>Manifesto</span></Link>
    </nav>
    <div className={styles.contact}><CrowdHeroActions navigation persistent /></div>
  </header>
}

import Link from "next/link"
import type { ReactNode } from "react"
import { AgencyApplicationButton } from "./agency-application-button"
import styles from "./agency-editorial.module.css"
import textLink from "./ui/text-link.module.css"

export function AgencyEditorial({ title, intro, children, artwork }: { title: string; intro: string; children: ReactNode; artwork?: ReactNode }) {
  return <main id="editorial-content" className={styles.page}>
    <a className={styles.skip} href="#editorial-body">Skip to content</a>
    <nav className={styles.nav} aria-label="Main navigation">
      <Link href="/" className={styles.logo} aria-label="yaven home">yaven</Link>
      <div><Link className={textLink.inline} href="/about">About us</Link><Link className={textLink.inline} href="/manifesto">Manifesto</Link><Link className={textLink.inline} href="/">Back to yaven <span aria-hidden="true">↗</span></Link></div>
    </nav>
    {artwork && <div className={styles.artwork}>{artwork}</div>}
    <header className={styles.hero}><h1>{title}</h1><p>{intro}</p></header>
    <article id="editorial-body" className={styles.body}>{children}</article>
    <div className={styles.closing}><AgencyApplicationButton className={styles.cta} /></div>
    <footer className={styles.footer}><Link href="/" className={styles.logo}>yaven</Link><div><Link className={textLink.inline} href="/about">About us</Link><Link className={textLink.inline} href="/privacy">Privacy</Link><Link className={textLink.inline} href="/terms">Terms</Link><a className={textLink.inline} href="mailto:support@yaven.ai">Talk to us ↗</a></div></footer>
  </main>
}

export function EditorialSection({ title, children }: { title: string; children: ReactNode }) {
  return <section className={styles.section}><h2>{title}</h2>{children}</section>
}

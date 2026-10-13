import type { ReactNode } from "react"
import { NameFooter } from "@/app/studio/flow-b/name-footer"
import styles from "./legal-page.module.css"

/** The agency site's visual language, with a quiet, readable legal document. */
export function LegalPage({ title, lastUpdated, children }: { title: string; lastUpdated: string; children: ReactNode }) {
  return <main className={styles.page}>
    <a className={styles.skip} href="#legal-content">Skip to content</a>
    <div id="legal-content" className={styles.document}>
      <header className={styles.heading}>
        <h1>{title}</h1>
        <p>Last updated: {lastUpdated}</p>
      </header>
      <article className={styles.prose} aria-label={title}>{children}</article>
    </div>
    <NameFooter backToTopHref="#legal-content" />
  </main>
}

export function LegalH2({ children }: { children: ReactNode }) {
  return <h2 className={styles.sectionHeading}>{children}</h2>
}

export function LegalP({ children }: { children: ReactNode }) {
  return <p className={styles.paragraph}>{children}</p>
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return <ul className={styles.list}>{items.map((item, index) => <li key={index}>{item}</li>)}</ul>
}

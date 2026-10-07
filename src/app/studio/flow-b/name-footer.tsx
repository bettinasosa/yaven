import Link from "next/link"
import { CrowdFooterArtwork } from "./crowd-footer-artwork"
import { fillButtonClass } from "@/components/ui/fill-button"
import styles from "./name-footer.module.css"

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/yavenai/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/yaven/" },
  { label: "X", href: "https://x.com/yavenai" },
]

export function NameFooter({ backToTopHref = "#studio-content" }: { backToTopHref?: string }) {
  return <footer id="footer" className={styles.footer} aria-label="yaven footer">
    <div className={styles.details}>
      <nav aria-label="Footer links"><Link className={fillButtonClass} href="/about"><span>About us</span></Link><Link className={fillButtonClass} href="/manifesto"><span>Manifesto</span></Link><Link className={fillButtonClass} href="/privacy"><span>Privacy</span></Link><Link className={fillButtonClass} href="/terms"><span>Terms</span></Link><a className={fillButtonClass} href={backToTopHref}><span>Back to top ↑</span></a></nav>
      <div className={styles.contactRow}>
      <nav aria-label="Social media">{socials.map(social => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">{social.label}<span aria-hidden="true">↗</span></a>)}</nav>
      <a href="mailto:support@yaven.ai">support@yaven.ai</a>
      </div>
      <span>© {new Date().getFullYear()} yaven · Illustrations by <a href="https://www.openpeeps.com/">Open Peeps</a></span>
    </div>
    <div className={styles.reveal}><div className={styles.track}><div className={styles.name}><CrowdFooterArtwork /></div></div></div>
  </footer>
}

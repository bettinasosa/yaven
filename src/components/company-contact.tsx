import styles from "./company-contact.module.css"
import textLink from "./ui/text-link.module.css"

export function CompanyContact() {
  return <address className={styles.contact}>
    <span>169 Madison Ave STE 31950<br />New York, NY 10016</span>
    <a className={textLink.inline} href="tel:+16283383898">+1 (628) 338-3898</a>
  </address>
}

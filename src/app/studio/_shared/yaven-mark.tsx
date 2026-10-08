import Image from "next/image"
import styles from "./yaven-mark.module.css"

/** Display the supplied logo without its transparent outer padding. */
export function YavenMark({ className = "" }: { className?: string }) {
  return <span className={`${styles.mark} ${className}`} aria-hidden="true">
    <Image src="/yaven-agency-mark.png" width={405} height={615} alt="" sizes="200px" className={styles.image} />
  </span>
}

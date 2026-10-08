import type { ComponentProps, ReactNode } from "react"
import styles from "./fill-button.module.css"

type ContentProps = { icon?: ReactNode; primary?: boolean }
export const fillButtonClass = styles.fill

/** Omega's curved fill, without imposing a shape or size on the control. */
export function FillButton({ children, icon, primary = false, className = "", ...props }: ComponentProps<"button"> & ContentProps) {
  return <button {...props} className={`${styles.fill} ${primary ? styles.primary : ""} ${className}`}><span>{children}</span>{icon && <span className={styles.icon}>{icon}</span>}</button>
}

export function FillLink({ children, icon, primary = false, className = "", ...props }: ComponentProps<"a"> & ContentProps) {
  return <a {...props} className={`${styles.fill} ${primary ? styles.primary : ""} ${className}`}><span>{children}</span>{icon && <span className={styles.icon}>{icon}</span>}</a>
}

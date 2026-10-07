"use client"

import { useId } from "react"
import { ElasticWaveMesh } from "@/components/ui/elastic-wave-mesh"
import styles from "./crowd-footer-artwork.module.css"

export function CrowdFooterArtwork() {
  const help = useId()
  return <div className={styles.artwork}>
    <ElasticWaveMesh paused describedBy={help} />
    <div className={styles.wordmark} aria-hidden="true">yaven</div>
    <span id={help} className={styles.srOnly}>Use the arrow keys to move the mesh. Escape resets.</span>
  </div>
}

"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { FillButton } from "@/components/ui/fill-button"
import { useSmoothScrollTo } from "@/components/smooth-scroll"
import { ReadingDialog } from "./omega/reading-dialog"
import shared from "./crowd-supporting.module.css"
import styles from "./crowd-contact.module.css"

export function CrowdContact() {
  const [applicationOpen, setApplicationOpen] = useState(false)
  const scrollTo = useSmoothScrollTo()
  useEffect(() => {
    // The native hash jump can happen before the sticky chapters finish measuring.
    const hash = window.location.hash
    if (hash !== "#early-access") return
    let cancelled = false
    let frame = 0
    document.fonts.ready.then(() => {
      if (cancelled) return
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          if (cancelled) return
          const target = document.getElementById(hash.slice(1))
          if (target) scrollTo(target.getBoundingClientRect().top + window.scrollY, true)
        })
      })
    })
    return () => { cancelled = true; cancelAnimationFrame(frame) }
  }, [scrollTo])

  return <section id="early-access" className={`${shared.section} ${shared.grid} ${styles.section}`} aria-labelledby="access-heading">
        <div className={styles.intro}><h2 className={shared.heading} id="access-heading">Bring yaven<br />into your agency.</h2><p className={shared.body}>We&apos;re only opening a few places. Tell us what you&apos;d like to spend less time on and where you want to grow.</p></div>
        <FillButton primary className={styles.button} type="button" aria-haspopup="dialog" onClick={() => setApplicationOpen(true)} icon={<ArrowUpRight size={40} aria-hidden="true" />}>Work with yaven</FillButton>
    <ReadingDialog article={applicationOpen ? "application" : null} signupSource="studio_crowd_agency_application" onClose={() => setApplicationOpen(false)} />
  </section>
}

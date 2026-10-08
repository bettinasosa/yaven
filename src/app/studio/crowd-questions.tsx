"use client"

import Link from "next/link"
import { useState } from "react"
import { ReadingDialog } from "./omega/reading-dialog"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { crowdQuestions } from "./_shared/crowd-copy"
import styles from "./crowd-questions.module.css"
import shared from "./crowd-supporting.module.css"
import textLink from "@/components/ui/text-link.module.css"

export function CrowdQuestions() {
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  return <section id="questions" className={`${shared.section} ${shared.grid} ${styles.section}`} aria-labelledby="faq-heading">
    <h2 className={shared.heading} id="faq-heading">Questions</h2>
    <div className={styles.list}>{crowdQuestions.map((item, index) => <details key={item.question} name="crowd-questions" open={index === 0} onToggle={() => { ScrollTrigger.refresh(); window.dispatchEvent(new Event("content-changed")) }}>
      <summary>{item.question}<span aria-hidden="true">+</span></summary>
      <p>{item.answer}{"link" in item && <> {item.link.href === "#waitlist" ? <button type="button" className={`${styles.waitlistLink} ${textLink.inline}`} aria-haspopup="dialog" onClick={() => setWaitlistOpen(true)}>{item.link.label}</button> : <Link className={textLink.inline} href={item.link.href}>{item.link.label}</Link>}</>}</p>
    </details>)}</div>
    <ReadingDialog article={waitlistOpen ? "waitlist" : null} onClose={() => setWaitlistOpen(false)} />
  </section>
}

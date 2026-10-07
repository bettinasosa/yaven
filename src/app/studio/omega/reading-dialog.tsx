"use client"

import { useEffect, useRef } from "react"
import { AgencyForm } from "./agency-form"
import { WaitlistForm } from "./waitlist-form"
import styles from "./reading-dialog.module.css"

const setupSteps = [
  { title: "Start with your agency.", body: "We learn how you work and choose where yaven starts." },
  { title: "Set it up.", body: "We connect the tools you choose and configure yaven around your clients." },
  { title: "Test it on real work.", body: "Your team uses it day to day, and we improve it with your feedback." },
  { title: "Grow from there.", body: "Add new jobs for yaven as your team settles in." },
]

export function ReadingDialog({ article, onClose, initialEmail, signupSource }: { article: "waitlist" | "application" | null; onClose: () => void; initialEmail?: string; signupSource?: string }) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (!article) return
    const element = dialog.current
    const returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    element?.showModal()
    const previousOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = "hidden"
    return () => { element?.close(); document.documentElement.style.overflow = previousOverflow; returnFocus?.focus({ preventScroll: true }) }
  }, [article])
  if (!article) return null
  return <dialog ref={dialog} className={`${styles.dialog} ${article === "waitlist" ? styles.waitlist : article === "application" ? styles.application : ""}`} data-lenis-prevent aria-labelledby="omega-reading-title" onCancel={event => { event.preventDefault(); onClose() }} onKeyDown={event => { if (event.key === "Escape") { event.preventDefault(); onClose() } }}>
    <div className={styles.toolbar}>{article === "waitlist" && <span>Waitlist</span>}<button type="button" onClick={onClose} aria-label={`Close ${article}`}>Close <span aria-hidden="true">×</span></button></div>
    {article === "application" ? <div className={styles.article}><h2 id="omega-reading-title">Tell us about you.</h2><AgencyForm initialEmail={initialEmail} signupSource={signupSource} /><details className={styles.setupDetails}><summary>How it works</summary><div className={styles.contactSetup}><ol>{setupSteps.map(step => <li key={step.title}><strong>{step.title}</strong> {step.body}</li>)}</ol></div></details></div> : <div className={styles.article}><h2 id="omega-reading-title">Join the waitlist.</h2><p>If you work solo or want to try yaven on your own first, join the waitlist and we’ll invite you as places open.</p><WaitlistForm /></div>}
  </dialog>
}

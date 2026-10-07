"use client"

import { useEffect, useId, useRef, useState, type ReactNode } from "react"
import { GlassCard } from "@/components/effects/glass-card"
import styles from "./agency-keyboard.module.css"

/** The Option shortcut opens the agency's personal and shared assistant preview. */
export function AgencyKeyboard({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const shortcut = useRef<HTMLButtonElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const id = useId()

  useEffect(() => {
    if (!open) return
    dialog.current?.showModal()
    dialog.current?.querySelector<HTMLTextAreaElement>("[role=tabpanel]:not([hidden]) textarea")?.focus({ preventScroll: true })
  }, [open])

  useEffect(() => {
    let optionOnly = false
    function onDown(event: KeyboardEvent) {
      if (!event.repeat) optionOnly = event.key === "Alt" && !event.metaKey && !event.ctrlKey && !event.shiftKey
    }
    function onUp(event: KeyboardEvent) {
      if (event.key !== "Alt") return
      const launch = optionOnly
      optionOnly = false
      const bounds = root.current?.getBoundingClientRect()
      const editing = event.target instanceof HTMLElement && !!event.target.closest("input, textarea, [contenteditable=true]")
      if (!launch || editing || !bounds || bounds.bottom <= 0 || bounds.top >= window.innerHeight) return
      event.preventDefault()
      setOpen(true)
    }
    function clear() { optionOnly = false }
    window.addEventListener("keydown", onDown)
    window.addEventListener("keyup", onUp)
    window.addEventListener("blur", clear)
    return () => {
      window.removeEventListener("keydown", onDown)
      window.removeEventListener("keyup", onUp)
      window.removeEventListener("blur", clear)
    }
  }, [])

  function close() {
    dialog.current?.close()
    setOpen(false)
    shortcut.current?.focus({ preventScroll: true })
  }

  return <div ref={root} className={styles.demo}>
    <div className={styles.keyboard} role="group" aria-label="yaven shortcut keyboard">
      <div className={styles.letterKeys}>
        {"yaven".split("").map(letter => <span key={letter} className={`${styles.key} ${styles.letterKey}`} aria-hidden="true"><span className={styles.face}>{letter}</span></span>)}
        <button ref={shortcut} type="button" className={`${styles.key} ${styles.launch}`} aria-expanded={open} aria-controls={`${id}-dialog`} aria-keyshortcuts="Alt" aria-label="Open Ask yaven with Option" onClick={() => setOpen(true)}>
          <span className={styles.face}>⌥<span className={styles.keyLabel}>ask anything</span></span>
        </button>
      </div>
    </div>
    <div className={styles.output}>
      {open ? <dialog ref={dialog} id={`${id}-dialog`} className={styles.askPanel} data-lenis-prevent aria-labelledby={`${id}-title`} onCancel={event => { event.preventDefault(); close() }} onKeyDown={event => { if (event.key === "Escape") { event.preventDefault(); close() } }}>
        <GlassCard borderRadius="30px" className={styles.glassBody} style={{
          background: "linear-gradient(155deg,#ffffffed 0%,#f2f5fbe8 52%,#eaeef9e3 100%)",
          backdropFilter: "blur(44px) saturate(1.55)", WebkitBackdropFilter: "blur(44px) saturate(1.55)",
          boxShadow: "inset 0 2px 2px #fff, inset 1px 0 1px #ffffffe6, inset -1px -2px 3px #ffffffb3",
        }}>
          <div className={styles.promptHead}><h2 id={`${id}-title`}>Ask yaven.</h2><button type="button" onClick={close} aria-label="Close example prompt">×</button></div>
          {children}
        </GlassCard>
      </dialog> : <p className={styles.hint}>Press Option or click the ⌥ key to try a task.</p>}
    </div>
  </div>
}

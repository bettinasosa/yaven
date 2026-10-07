"use client"

import Link from "next/link"
import { useId, useRef, useState } from "react"
import { ArrowUpRight, Check, LockKeyhole, Pencil } from "lucide-react"
import shared from "./crowd-supporting.module.css"
import styles from "./crowd-memory.module.css"

const exampleMemory = "For the Juicy project, send a short written summary before each review. Keep Fridays free of meetings."

export function CrowdMemory() {
  const id = useId()
  const [memory, setMemory] = useState(exampleMemory)
  const [draft, setDraft] = useState(exampleMemory)
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  const editButton = useRef<HTMLButtonElement>(null)
  function finishEditing() {
    setEditing(false)
    requestAnimationFrame(() => editButton.current?.focus({ preventScroll: true }))
  }

  return <section id="memory" className={`${shared.section} ${shared.grid} ${styles.section}`} aria-labelledby="crowd-memory-heading">
    <div className={styles.copy}>
      <h2 className={shared.heading} id="crowd-memory-heading">You can see what yaven knows.<span>And decide what it shares.</span></h2>
      <p className={shared.body}>Your personal context stays on your Mac. Inspect and edit its memory, choose what agents can access, and approve what goes to clients.</p>
      <Link className={shared.link} href="/privacy">Read our privacy policy<ArrowUpRight size={18} aria-hidden="true" /></Link>
    </div>
    <div className={styles.preview}>
      <div className={styles.window}>
        <div className={styles.toolbar}><span>yaven</span><span><LockKeyhole size={14} aria-hidden="true" />On your Mac</span></div>
        <div className={styles.memory}>
          <div className={styles.memoryHead}><h3 id={`${id}-label`}>A client preference</h3><span>Juicy</span></div>
          {editing ? <form onSubmit={event => { event.preventDefault(); if (!draft.trim()) return; setMemory(draft.trim()); setSaved(true); finishEditing() }}>
            <textarea aria-labelledby={`${id}-label`} value={draft} maxLength={500} required autoFocus onChange={event => setDraft(event.target.value)} />
            <div className={styles.actions}><button type="submit" disabled={!draft.trim()}>Save change<Check size={15} aria-hidden="true" /></button><button type="button" onClick={finishEditing}>Cancel</button></div>
          </form> : <><p>{memory}</p><button ref={editButton} className={styles.edit} type="button" onClick={() => { setDraft(memory); setEditing(true); setSaved(false) }}>Edit memory<Pencil size={15} aria-hidden="true" /></button></>}
        </div>
        <p className={styles.note} role="status">{saved ? "Saved in this preview. Resets on reload." : "Example memory · changes stay in this preview."}</p>
      </div>
    </div>
  </section>
}

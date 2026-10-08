"use client"

import { useId, useState } from "react"
import { AgencyKeyboard } from "../agency-keyboard"
import { AssistantChat } from "./assistant-chat"
import styles from "./keyboard-team.module.css"

const modes = [
  { label: "Your assistant", heading: "Your own assistant, right where you work." },
  { label: "Shared agents", heading: "Shared agents for the whole agency." },
]

function AssistantExamples() {
  const [active, setActive] = useState(0)
  const id = useId()

  return <div className={styles.examples}>
      <div className={styles.exampleTabs} role="tablist" aria-label="Ways to work with yaven" onKeyDown={event => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return
        event.preventDefault()
        const next = event.key === "Home" ? 0 : event.key === "End" ? modes.length - 1 : (active + (event.key === "ArrowRight" ? 1 : -1) + modes.length) % modes.length
        setActive(next)
        event.currentTarget.querySelectorAll<HTMLButtonElement>("button")[next]?.focus()
      }}>
        {modes.map((item, index) => <button key={item.label} id={`${id}-tab-${index}`} role="tab" type="button" aria-selected={active === index} aria-controls={`${id}-panel-${index}`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)}>{item.label}</button>)}
      </div>
    {modes.map((item, index) => <div key={item.label} id={`${id}-panel-${index}`} role="tabpanel" aria-labelledby={`${id}-tab-${index}`} hidden={active !== index}>
      <AssistantChat shared={index === 1} active={active === index} />
    </div>)}
  </div>
}

export function KeyboardTeam() {
  const id = useId()

  return <section id="agent-keyboard" className={styles.section} aria-labelledby={`${id}-heading`}>
    <header className={styles.header}>
      <h2 id={`${id}-heading`}>yaven is single<br />and multiplayer.</h2>
      <p>Work is fluid. You start with your own agents, then bring others in. yaven understands the boundaries between personal and shared work, and brings everything together in one place.</p>
    </header>
    <div className={styles.modes}>
      {modes.map(item => <h3 key={item.label}>{item.heading}</h3>)}
    </div>
    <div className={styles.keyboard}><AgencyKeyboard><AssistantExamples /></AgencyKeyboard></div>
  </section>
}

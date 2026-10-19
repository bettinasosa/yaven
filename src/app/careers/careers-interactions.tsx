"use client"

import { useState } from "react"
import { FillLink } from "@/components/ui/fill-button"
import styles from "./careers-interactions.module.css"

const prompts = [
  "What have you made just because you wanted it to exist?",
  "What tiny detail in a product do you care an unreasonable amount about?",
  "What rabbit hole have you fallen down recently?",
  "What would you change about the way people work with AI?",
  "What did a completely unrelated interest teach you about your work?",
]

export function ConversationStarter() {
  const [promptIndex, setPromptIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const answer = answers[promptIndex] ?? ""
  const prompt = prompts[promptIndex]
  const body = answer.trim() ? `Hi yaven team,\n\n${prompt}\n\n${answer.trim()}\n\n` : ""
  const href = `mailto:support@yaven.ai?subject=Building%20with%20yaven${body ? `&body=${encodeURIComponent(body)}` : ""}`

  return <div className={styles.starter}>
    <div className={styles.starterHeader}>
      <span>A conversation starter, if you’d like one.</span>
      <button type="button" className={styles.shuffle} onClick={() => setPromptIndex(current => (current + 1) % prompts.length)}>Try another <span aria-hidden="true">↻</span></button>
    </div>
    <h3 className={styles.prompt} aria-live="polite" aria-atomic="true">{prompt}</h3>
    <label className={styles.answer}>
      Your answer (optional)
      <textarea value={answer} onChange={event => setAnswers(current => ({ ...current, [promptIndex]: event.target.value }))} rows={4} maxLength={2000} placeholder="Start anywhere. A few sentences will do." aria-describedby="careers-email-hint" />
    </label>
    <div className={styles.send}>
      <FillLink className={styles.email} href={href}>Say hello to the team ↗</FillLink>
      <span id="careers-email-hint">Your words go into an email draft. You choose when to send.</span>
    </div>
  </div>
}

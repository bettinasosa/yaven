"use client"

import { useState, type FormEvent } from "react"
import { getAttribution } from "@/lib/attribution"
import { FillButton } from "@/components/ui/fill-button"
import styles from "./agency-form.module.css"
import { storedReferral, useSignupTracking } from "./signup-tracking"

export function WaitlistForm() {
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "existing" | "error">("idle")
  const tracking = useSignupTracking("omega_solo_waitlist")

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "saving") return
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim()
    setStatus("saving")
    tracking.submitted()
    const referredBy = storedReferral()
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...getAttribution(), email, signup_source: "omega_solo_waitlist", ...(referredBy && { referredBy }) }),
      })
      if (!response.ok) { tracking.failed(response.status >= 500 ? "server" : "rejected"); setStatus("error"); return }
      const result = await response.json()
      tracking.succeeded(result.existing === true)
      setStatus(result.existing ? "existing" : "success")
    } catch { tracking.failed("network"); setStatus("error") }
  }

  if (status === "success" || status === "existing") return <div className={styles.success} role="status">
    <h3>{status === "existing" ? "You’re already on the list." : "You’re on the list."}</h3>
    <p>We’ll invite you as places open.</p>
  </div>

  return <form className={styles.form} onSubmit={submit}>
    <fieldset disabled={status === "saving"}>
      <label>Your email<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" onFocus={tracking.emailFocused} /></label>
      <FillButton primary type="submit" className={styles.submit} icon={<span aria-hidden="true">↗</span>}>{status === "saving" ? "Joining…" : "Join the waitlist"}</FillButton>
    </fieldset>
    {status === "error" && <p className={styles.error} role="alert">We couldn’t save your email. Please try again, or email <a href="mailto:support@yaven.ai">support@yaven.ai</a>.</p>}
  </form>
}

"use client"

import { useState, type FormEvent } from "react"
import { getAttribution } from "@/lib/attribution"
import { FillButton } from "@/components/ui/fill-button"
import { agencyInquiryPayload } from "./agency-inquiry"
import styles from "./agency-form.module.css"

export function AgencyForm({ initialEmail = "", signupSource = "omega_agency_inquiry" }: { initialEmail?: string; signupSource?: string }) {
  const [signupType, setSignupType] = useState<"individual" | "team">("individual")
  const isTeam = signupType === "team"
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "existing" | "error">("idle")
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "saving") return
    const payload = agencyInquiryPayload(new FormData(event.currentTarget))
    setStatus("saving")
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...getAttribution(), ...payload, signup_source: signupSource }),
      })
      if (!response.ok) throw new Error("Unable to save")
      const result = await response.json()
      if (!result.success) throw new Error("Unable to save")
      setStatus(result.existing ? "existing" : "success")
    } catch { setStatus("error") }
  }
  if (status === "success" || status === "existing") return <div className={styles.success} role="status">
    <h3>{status === "success" ? "Thanks. Let’s talk." : "You’re already on our list."}</h3>
    <p>{status === "success" ? "We’ve received your details and will be in touch to arrange a conversation." : "Your earlier signup is still saved. To share a new brief or update your details, email us."}</p>
    {status === "existing" && <a href="mailto:support@yaven.ai">support@yaven.ai ↗</a>}
  </div>
  return <form className={styles.form} onSubmit={submit} aria-busy={status === "saving"}>
    <fieldset disabled={status === "saving"}>
      <fieldset className={styles.signupType}>
        <legend>Signing up as</legend>
        <div className={styles.typeOptions}>
          <label><input type="radio" name="signupType" value="individual" checked={!isTeam} onChange={() => setSignupType("individual")} /><span>Individual</span></label>
          <label><input type="radio" name="signupType" value="team" checked={isTeam} onChange={() => setSignupType("team")} /><span>Team</span></label>
        </div>
      </fieldset>
      <div className={styles.row}>
        <label>Your email<input name="email" type="email" autoComplete="email" required maxLength={254} defaultValue={initialEmail} placeholder="you@example.com" /></label>
        {isTeam ? <label>Agency / team name<input key="agency" name="agency" autoComplete="organization" required maxLength={160} placeholder="Your team" /></label> : <label>Your name<input key="name" name="name" autoComplete="name" required maxLength={160} placeholder="Your name" /></label>}
      </div>
      {isTeam && <div className={styles.row}>
        <label>Team size<select name="teamSize" required defaultValue=""><option value="" disabled>Select team size</option><option>2–5</option><option>6–15</option><option>16–30</option><option>31–50</option><option>51+</option></select></label>
        <label>Active clients<input name="activeClients" type="number" inputMode="numeric" min="0" max="10000" step="1" required placeholder="e.g. 8" /></label>
      </div>}
      <label>{isTeam ? "Does your team work on Macs?" : "Do you work on a Mac?"}<select key={signupType} name="macSetup" required defaultValue=""><option value="" disabled>Select your setup</option><option value="All Macs">{isTeam ? "Yes, everyone" : "Yes"}</option>{isTeam && <option value="Mixed Mac and PC">Some of us</option>}<option value="No Macs">{isTeam ? "Not currently" : "No"}</option></select></label>
      <label>Website or LinkedIn (optional)<input name="profileUrl" type="url" autoComplete="url" autoCapitalize="none" spellCheck={false} maxLength={2000} placeholder="https://your-site.com or your LinkedIn profile" /></label>
      <FillButton primary className={styles.submit} type="submit" icon={<span aria-hidden="true">↗</span>}>{status === "saving" ? "Sending…" : "Get started"}</FillButton>
    </fieldset>
    {status === "error" && <p className={styles.error} role="alert">We couldn’t save your details. Please try again, or email <a href="mailto:support@yaven.ai">support@yaven.ai</a>.</p>}
  </form>
}

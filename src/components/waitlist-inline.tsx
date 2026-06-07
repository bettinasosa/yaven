"use client"

import { useState } from "react"

// Inline email capture for the closing sections. Posts to the same
// /api/waitlist endpoint as the blueprint flow.
export function WaitlistInline() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      })
      if (!res.ok) throw new Error("Failed")
      setSubmitted(true)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <p
        style={{
          fontSize: "16px",
          fontWeight: 500,
          color: "var(--cream)",
          margin: 0
        }}
      >
        You&apos;re on the list. We&apos;ll be in touch soon.
      </p>
    )
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
      >
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="neu-input"
          style={{
            flex: "1 1 220px",
            minWidth: 0,
            padding: "0.7em 1.2em",
            fontSize: "16px",
            fontWeight: 500,
            color: "var(--ink)"
          }}
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-press-dark"
          style={{ flexShrink: 0, opacity: loading ? 0.5 : 1 }}
        >
          {loading ? "Saving…" : "Join the waitlist"}
        </button>
      </form>
      {error && (
        <p
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: "var(--warm)",
            margin: "8px 0 0"
          }}
        >
          {error}
        </p>
      )}
    </div>
  )
}

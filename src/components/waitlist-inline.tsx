"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"

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
          fontSize: "18px",
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
      {error && (
        <p
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: "var(--secondary)",
            margin: "0 0 12px"
          }}
        >
          {error}
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="waitlist-input-row"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "0",
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.3)",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          padding: "5px",
          alignItems: "center"
        }}
      >
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            flex: 1,
            minWidth: 0,
            padding: "12px 18px",
            borderRadius: "999px",
            border: "none",
            background: "transparent",
            color: "#fff",
            fontSize: "15px",
            fontFamily: "var(--font-dm-sans), sans-serif",
            outline: "none"
          }}
        />
        <div className="glass-wrap waitlist-btn-wrap" style={{ flexShrink: 0 }}>
          <div className="glass-shadow" />
          <button
            type="submit"
            disabled={loading}
            className="glass-btn"
            style={{
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
              whiteSpace: "nowrap"
            }}
          >
            {loading ? (
              <span className="text-white" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <Loader2 style={{ width: "16px", height: "16px", animation: "spin 1s linear infinite" }} />
              </span>
            ) : (
              <span className="text-white">Get Yaven</span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

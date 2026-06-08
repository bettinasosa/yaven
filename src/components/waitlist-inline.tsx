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
        className="waitlist-input-row flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0 rounded-[28px] sm:rounded-full p-[5px]"
        style={{
          border: "1px solid rgba(255,255,255,0.3)",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.3)"
        }}
      >
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="flex-1 min-w-0 py-3 px-5 rounded-full border-none bg-transparent text-white text-[15px] font-[var(--font-dm-sans),sans-serif] outline-none"
        />
        <div className="glass-wrap waitlist-btn-wrap shrink-0 w-full sm:w-auto">
          <div className="glass-shadow" />
          <button
            type="submit"
            disabled={loading}
            className="glass-btn w-full sm:w-auto"
            style={{
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
              whiteSpace: "nowrap"
            }}
          >
            {loading ? (
              <span className="text-white inline-flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
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
